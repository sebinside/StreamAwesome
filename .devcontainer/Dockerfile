FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    unzip \ 
    && rm -rf /var/lib/apt/lists/*

ENV FONTAWESOME_VERSION=6.6.0
EXPOSE 5173
