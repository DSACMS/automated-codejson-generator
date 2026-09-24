ARG MODEL_REPO=unsloth/gemma-4-E2B-it-GGUF
ARG MODEL_FILE=gemma-4-E2B-it-Q4_K_M.gguf

# stage 1: builder
# install deps and build TS
FROM node:20-bookworm AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_LLAMA_CPP_SKIP_DOWNLOAD=true

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run package
 
# stage 2: model 
# download the model GGUF and cache
FROM debian:bookworm-slim AS model
ARG MODEL_REPO
ARG MODEL_FILE

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/models \
    && curl -fSL --retry 3 \
        "https://huggingface.co/${MODEL_REPO}/resolve/main/${MODEL_FILE}?download=true" \
        -o /opt/models/model.gguf \
    && test "$(stat -c%s /opt/models/model.gguf)" -gt 100000000

# stage 3: runtime 
# final image the action actually runs 
FROM node:20-bookworm-slim AS runtime

RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        ca-certificates \
        curl \
    && rm -rf /var/lib/apt/lists/*

# scc used for the laborHours estimate
RUN curl -fSL --retry 3 \
        "https://github.com/boyter/scc/releases/download/v3.4.0/scc_Linux_x86_64.tar.gz" \
        -o /tmp/scc.tar.gz \
    && tar -xzf /tmp/scc.tar.gz -C /usr/local/bin scc \
    && rm /tmp/scc.tar.gz \
    && chmod +x /usr/local/bin/scc \
    && scc --version

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

COPY --from=model /opt/models/model.gguf /opt/models/model.gguf

ENV ACG_MODEL_PATH=/opt/models/model.gguf

ENTRYPOINT ["node", "/app/dist/index.js"]