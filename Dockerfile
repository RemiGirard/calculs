FROM node:18.16.0

WORKDIR /home/root/

RUN apt update && apt upgrade -y
RUN apt install -y libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

RUN npm install -g pnpm

RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y

COPY . /var/www/app/

WORKDIR /var/www/app/

CMD ["pnpm", "dev"]

EXPOSE 1420