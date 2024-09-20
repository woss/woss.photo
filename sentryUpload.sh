#!/usr/bin/env bash

set -ex

VERSION="$SENTRY_RELEASE_VERSION"

# Create a release
sentry-cli releases new -p "$SENTRY_PROJECT" "$VERSION"

# Associate commits with the release
sentry-cli releases set-commits --ignore-missing -p "$SENTRY_PROJECT" "$VERSION" --local

# Add source maps
sentry-cli sourcemaps -p "$SENTRY_PROJECT" inject ./build/ --release "$VERSION"
sentry-cli sourcemaps -p "$SENTRY_PROJECT" upload ./build/ --release "$VERSION"

# finalize the release
sentry-cli releases finalize -p "$SENTRY_PROJECT" "$VERSION"

# deploy release
sentry-cli releases deploys new -p "$SENTRY_PROJECT" -r "$VERSION" -e "$NODE_ENV"
