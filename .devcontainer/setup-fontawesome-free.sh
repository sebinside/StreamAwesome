#!/bin/bash

FONTAWESOME_VERSION=${FONTAWESOME_VERSION}
DEST="./StreamAwesome/fonts/fontawesome"

if [ -d "$DEST" ]; then
    echo "FontAwesome is already installed in ${DEST}"
else
    echo "Installing FontAwesome v${FONTAWESOME_VERSION} to ${DEST}"
    
    mkdir -p "$DEST"
    wget "https://use.fontawesome.com/releases/v${FONTAWESOME_VERSION}/fontawesome-free-${FONTAWESOME_VERSION}-web.zip" -O fontawesome.zip
    unzip "fontawesome.zip"
    cp -r fontawesome-free-${FONTAWESOME_VERSION}-web/css/ "$DEST/"
    cp -r fontawesome-free-${FONTAWESOME_VERSION}-web/webfonts "$DEST/"
    rm -rf fontawesome-free-${FONTAWESOME_VERSION}-web fontawesome.zip
    echo "FontAwesome v${FONTAWESOME_VERSION} installed to ${DEST}"
fi