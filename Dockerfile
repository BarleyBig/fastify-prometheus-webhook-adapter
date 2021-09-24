FROM node:16-alpine
COPY package.json /app/package.json
COPY ./*.js ./*.yml /app/
COPY body-templates /app/body-templates
COPY tmpls /app/tmpls

RUN cd /app && npm install --production --registry=https://registry.npm.taobao.org

EXPOSE 8061

ENTRYPOINT [ "node", "/app/index.js" ]