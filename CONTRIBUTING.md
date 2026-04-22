# Contributing

## Requirements

- [Node.js + npm](https://nodejs.org/) (for TypeScript build)
- [start-cli](https://docs.start9.com/packaging/) (for packing the s9pk)
- **podman** (Linux) or **Docker** (Mac/Windows)

> **Linux / podman users:** A `bin/docker` shim is included that translates
> `docker buildx build` calls from `start-cli` into equivalent `podman` commands.
> It is automatically used via the `PATH` override in the `Makefile` — no extra
> setup needed.

## Build

```bash
# Install TypeScript dependencies
npm ci

# Build for x86_64
make x86

# Build for aarch64
make arm

# Build for both
make
```

The compiled `.s9pk` file appears in the project root.

## Install to a running StartOS device

Add your server to `~/.startos/config.yaml`:

```yaml
host: http://your-server.local
```

Then:

```bash
make install
```

## Development notes

- `startos/` — all TypeScript source (manifest, main, interfaces, actions, etc.)
- `Dockerfile` — custom image based on `node:20-alpine`
- `entrypoint.sh` — startup logic (entry point priority: `npm start` → `index.js` → `server.js` → `app.js`)
- `default-app/index.js` — placeholder `nodeinfo()` page shown when no user app is deployed

When modifying `Dockerfile`, `entrypoint.sh`, or `default-app/index.js`, the
Makefile tracks these as dependencies and will trigger a full Docker rebuild
automatically.

## How to Contribute

1. Fork the repository and create a branch from `master`
2. Make your changes
3. Open a pull request to `master`
