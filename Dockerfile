# thin image that builds the action code on top of the hand-pushed base
# the base (Dockerfile.base) holds node-llama-cpp, the model and scc
ARG BASE_IMAGE=ghcr.io/dsacms/automated-codejson-generator-base:1.0.0@sha256:2759ae06c67900ad95b2be89aaa8321aa67ddac8e0d1040714617b35c7c55aaa

# stage 1: builder
# install deps and build TS
FROM node:20-bookworm AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_LLAMA_CPP_SKIP_DOWNLOAD=true

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci \
    && node -p "require('./package-lock.json').packages['node_modules/node-llama-cpp'].version" > /tmp/node-llama-cpp.version

COPY . .
RUN npm run package

# stage 2: runtime
# final image the action actually runs, only dist/ and package.json on top of the base
FROM ${BASE_IMAGE} AS runtime

WORKDIR /app

# fail if the lockfile moved node-llama-cpp past the version baked into the base,
# otherwise dist/ would silently run against the old native bindings
COPY --from=builder /tmp/node-llama-cpp.version /tmp/node-llama-cpp.version
RUN expected="$(cat /tmp/node-llama-cpp.version)" \
    && installed="$(node -p "require('/app/node_modules/node-llama-cpp/package.json').version")" \
    && rm /tmp/node-llama-cpp.version \
    && if [ "$expected" != "$installed" ]; then \
        echo "node-llama-cpp mismatch: package-lock.json resolves $expected but the base image has $installed." >&2; \
        echo "Rebuild and push the base with NODE_LLAMA_CPP_VERSION=$expected (see CONTRIBUTING.md), then update BASE_IMAGE." >&2; \
        exit 1; \
    fi

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

ENTRYPOINT ["node", "/app/dist/index.js"]
