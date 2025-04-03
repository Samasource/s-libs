#! /bin/bash
set -eu

# Update Google Chrome to latest stable version
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list
apt-get update -y
apt-get install -y google-chrome-stable