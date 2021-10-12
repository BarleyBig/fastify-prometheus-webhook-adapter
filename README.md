# fastify-prometheus-webhook-adapter
- **用于prometheus的alertmanager模块的webhook转发适配器，支持企业微信/钉钉/飞书**
- **使用fastify作为服务端**
- **支持prometheus监听自身的健康状况**

## 镜像地址
`registry.cn-beijing.aliyuncs.com/geovis-service/prometheus-webhook:0.3.0`

    飞书不支持markdown格式，但是支持卡片式的通知
    由于本人没有飞书账号和群，没办法测试，暂时只能支持飞书的txt模式，之后考虑将飞书的默认模板替换为卡片式
