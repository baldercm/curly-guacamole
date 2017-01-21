#
# baldercm/curly-guacamole Dockerfile
# https://github.com/klikin-labs/curly-guacamole
#

# Pull base image
FROM node:6.9

MAINTAINER Bálder Carraté <baldercm@gmail.com>

# Install dependencies:
#   - Kerberos (used by mongoose)
# and create working dir
RUN \
  apt-get update \
  && apt-get install -y --no-install-recommends libkrb5-dev \
  && mkdir -p /usr/src/app

# Set working dir
WORKDIR /usr/src/app

# Default command
CMD [ "node", "index.js" ]

# Expose ports
EXPOSE 8080

# Copy and install node app
COPY package.json /usr/src/app/
RUN  npm install --no-color --quiet --production
COPY dist /usr/src/app
