#!/bin/sh

apt update
apt install -y libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y