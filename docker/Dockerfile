FROM registry.cn-beijing.aliyuncs.com/geovis-service/prometheus-webhook:1.0.4

COPY config.yml /app/config.yml
# COPY tmpls /app/tmpls

EXPOSE 8061

ENTRYPOINT [ "node", "/app/index.js" ]