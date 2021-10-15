FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY ./*.js ./*.yml  ./
COPY adapters ./adapters
COPY tmpls ./tmpls

RUN npm install --production --registry=https://registry.npm.taobao.org && npm run build

FROM node:16-alpine
COPY --from=builder /app/dist/*.js /app/dist/*.yml /app/
COPY --from=builder /app/dist/tmpls /app/tmpls 
COPY --from=builder /app/dist/llhttp /app/llhttp
EXPOSE 8061
ENTRYPOINT [ "node", "/app/index.js" ]
