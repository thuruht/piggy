#!/bin/bash
# Exit on error
set -e

# Create the dist directory if it doesn't exist
mkdir -p dist

# Copy public files to dist
cp -r public/* dist/