#!/bin/bash

VERSION_FILE="src/version.ts"
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)

if [ -z "$LATEST_TAG" ]; then
    echo "No git tags found, using default version 0.0.0"
    VERSION="0.0.0"
else
    # Strip the 'v' prefix from the tag (e.g., v1.2.3 -> 1.2.3)
    VERSION=${LATEST_TAG#v}
    echo "Found git tag: $LATEST_TAG, extracted version: $VERSION"
fi

echo "export const streamAwesomeVersion = '$VERSION'" > "$VERSION_FILE"
echo "Version $VERSION has been written to $VERSION_FILE"
