# Calculs

Generate math exercice.

Get it : [Download](https://github.com/RemiGirard/calculs/releases/download/v1.5.1/index-1.5.1.html)

![screenshot configuration](doc/asset/screenshotConfiguration01.png)

![screenshot exercices](doc/asset/screenshotExercice02.png)


## Requirement

- [Docker-compose](https://docs.docker.com/compose/install/)

or use directly with [pnpm](https://pnpm.io/installation) and `package.json` scripts (example: `pnpm dev`)

## Use

### dev

- `docker compose build` build image
- `docker compose -f docker-compose.yml create` build container without volume binding
- `docker compose cp calculs:/srv/app/node_modules/ ./` copy node_modules from container to local folder

- `docker-compose up`
- open browser at http://localhost:1420/

Edit files inside `src/`. Changes will be updated with HMR.

### run unit tests

-`docker-compose exec calculs pnpm test`

vitest runs in watch mode by default

### build html

- `docker-compose exec calculs pnpm build`

Unique html file will be available at `dist/index.html`

### build exe/dmg/deb

[Tauri requirements](https://tauri.app/v1/guides/getting-started/prerequisites)

- `pnpm tauri build`

Executables will be available at `src-tauri/target/release/` , installers `src-tauri/target/release/bundle`.
