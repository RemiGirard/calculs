FROM node:18.16.0 AS buildNodeModules

RUN apt update && apt upgrade -y
RUN npm add -g pnpm

WORKDIR /srv/app/

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

FROM node:18.16.0

RUN npm add -g pnpm

WORKDIR /srv/app/

COPY . . 

COPY --from=buildNodeModules /srv/app/node_modules ./node_modules

CMD ["pnpm", "dev"]

EXPOSE 1420