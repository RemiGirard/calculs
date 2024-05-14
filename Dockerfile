FROM node:18.16.0 AS node-with-pnpm

RUN apt update && apt upgrade -y
RUN npm add -g pnpm

FROM node-with-pnpm AS build-node-modules

WORKDIR /srv/app/

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

FROM node-with-pnpm

WORKDIR /srv/app/

COPY . .

COPY --from=build-node-modules /srv/app/node_modules ./node_modules

CMD ["pnpm", "build"]

EXPOSE 1420