# Calculs

Generate math exercice.

Get it : [Download](https://github.com/RemiGirard/calculs/releases/download/v1.0.0/index.html)

![screenshot configuration](doc/asset/screenshotConfiguration01.png)

![screenshot exercices](doc/asset/screenshotExercice01.png)


## Requirement

- [Docker-compose](https://docs.docker.com/compose/install/)

or use directly with [pnpm](https://pnpm.io/installation) and package.json scripts (example: `pnpm dev`)

## Use

### dev

- `docker-compose up`
- open browser at [http://localhost:1420/]

Edit files inside `src/`. Changes will be updated with HMR.

### build

- `docker-compose exec calculs bash`
- `pnpm build`

Unique html file will be available at `dist/index.html`
