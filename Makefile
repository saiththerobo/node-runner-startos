ARCHES := x86 arm
# Prepend local bin/ so our docker→podman shim is found first
export PATH := $(CURDIR)/bin:$(PATH)
# overrides to s9pk.mk must precede the include statement
include s9pk.mk

# Track docker build sources so make rebuilds when they change
node-runner_%.s9pk: entrypoint.sh default-app/index.js Dockerfile.node18 Dockerfile.node20 Dockerfile.node22
