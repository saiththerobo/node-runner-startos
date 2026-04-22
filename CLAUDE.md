## How the upstream version is pulled
- dockerTag in `startos/manifest/index.ts`: `node:20-alpine`
- Node.js LTS version — update the tag to bump Node versions

## Package overview
- Mounts FileBrowser `data` volume read-only at `/mnt/filebrowser`
- On every start: copies app source from FileBrowser → `/app/work`, runs `npm install`, then starts the app
- User configures which FileBrowser subfolder to use via the "Set App Path" action
- App must listen on `process.env.PORT` (set to 3000)
- Entry point priority: `npm start` (package.json) → `index.js` → `server.js` → `app.js`
