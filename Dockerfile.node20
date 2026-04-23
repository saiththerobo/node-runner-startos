FROM node:20-alpine

# Create mountpoints required by StartOS volume and dependency mounts
RUN mkdir -p /app/work /mnt/filebrowser /app/default

# Entrypoint: try npm start → index.js → server.js → app.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Default placeholder served when no user app is uploaded
COPY default-app/index.js /app/default/index.js

WORKDIR /app/work
