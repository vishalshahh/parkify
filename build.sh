#!/bin/bash

# Install root dependencies
yarn install --ignore-engines

# Install web app dependencies
cd apps/web
yarn install --ignore-engines

# Build the web app
next build 