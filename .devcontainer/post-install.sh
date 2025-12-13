#!/usr/bin/env bash

FONTAWESOME_VERSION=${FONTAWESOME_VERSION}
DEST="/workspaces/StreamAwesome/StreamAwesome/fonts/fontawesome"

if [ -d "$DEST" ]; then
    echo "FontAwesome is already installed in ${DEST}"
else
    echo "Installing FontAwesome v${FONTAWESOME_VERSION} to ${DEST}"
    
    mkdir -p "$DEST"
    TMP_DIR="$(mktemp -d)"
    cd "$TMP_DIR"

    wget "https://use.fontawesome.com/releases/v${FONTAWESOME_VERSION}/fontawesome-free-${FONTAWESOME_VERSION}-web.zip" -O fontawesome.zip
    unzip "fontawesome.zip"
    cp -r fontawesome-free-${FONTAWESOME_VERSION}-web/css/ "$DEST/"
    cp -r fontawesome-free-${FONTAWESOME_VERSION}-web/webfonts "$DEST/"
    rm -rf "$TMP_DIR"
    echo "FontAwesome v${FONTAWESOME_VERSION} installed to ${DEST}"
fi

cd /workspaces/StreamAwesome/StreamAwesome
npm install
npm run dev