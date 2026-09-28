ARG MODEL_REPO=unsloth/gemma-4-E2B-it-GGUF
ARG MODEL_FILE=gemma-4-E2B-it-Q4_K_M.gguf
ARG MODEL_REVISION=0314792d7f1f7e229411f620751375812bb9faf2
ARG MODEL_SHA256=740185b21d22ceb83a11c3aa62ad5842ef32c70f6096d756bbee85a1e4ec34b8

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
ARG MODEL_REVISION
ARG MODEL_SHA256

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/models \
    && curl -fSL --retry 3 \
        "https://huggingface.co/${MODEL_REPO}/resolve/${MODEL_REVISION}/${MODEL_FILE}?download=true" \
        -o /opt/models/model.gguf \
    && echo "${MODEL_SHA256}  /opt/models/model.gguf" | sha256sum -c -

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
    && echo "8f812d25c237112ea74a4285f0699b7a2c448d70c5e63e370d2d199d38b13eda  /tmp/scc.tar.gz" | sha256sum -c - \
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