#!/usr/bin/env bash
# Build script for Render deployment
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Create uploads directory
mkdir -p uploads
