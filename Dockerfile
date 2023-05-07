FROM node:18.16.0

WORKDIR /root/

RUN apt update && apt upgrade -y
RUN npm install -g pnpm

# # uncomment to be able to run `pnpm tauri` (build linux executable)
# RUN apt install -y libwebkit2gtk-4.0-dev \
#     build-essential \
#     curl \
#     wget \
#     libssl-dev \
#     libgtk-3-dev \
#     libayatana-appindicator3-dev \
#     librsvg2-dev

# RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y

WORKDIR /srv/app/

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]

EXPOSE 1420