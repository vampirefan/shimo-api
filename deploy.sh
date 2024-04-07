#!/bin/bash

# 拉取最新代码
git fetch 
git pull

# 编译
rm -f yarn.lock
rm -rf node_modules/
yarn install
yarn build

# 首次启动内网应用
# PORT=8001 pm2 start .output/server/index.mjs --name shimo-api

# 首次启动内网 https 应用
# PORT=8002 NITRO_SSL_CERT="`cat ssl-key/cert.pem`" NITRO_SSL_KEY="`cat ssl-key/key.pem`" pm2 start .output/server/index.mjs --name shimo-api-https

pm2 restart shimo-api
pm2 restart shimo-api-https
