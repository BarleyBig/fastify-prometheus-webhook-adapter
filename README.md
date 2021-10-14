# fastify-prometheus-webhook-adapter
- **用于prometheus的alertmanager模块的webhook转发适配器，支持企业微信/钉钉/飞书**
- **使用fastify作为服务端**
- **支持prometheus监听自身的健康状况**


# 使用方法
## config介绍
1.参考config.yml的文件格式编写你自己的config文件    
2.适配器支持命名调用及分组调用  
适配器会自行从config设置的webhook中寻找同名目标     
如果指定的目标名称不存在，适配器会忽略此目标    
如果此次请求指定的所有目标都不存在，适配器会自动转发给config中的所有目标    
例
```yml
receivers:
  - name: webhook-dingding1
    webhook_configs:
      - url: http://127.0.0.1:8061/dingding1
        send_resolved: true
  - name: webhook-weixins
    webhook_configs:
      - url: http://127.0.0.1:8061/weixin1/weixin2/weixin3
        send_resolved: true
  - name: webhook-feishu1
    webhook_configs:
      - url: http://127.0.0.1:8061/feishu1
        send_resolved: true
```
3.在tmpls文件中可定制编写你自己的提醒消息输出格式，这是一个标准的js字符串模板语法   
在模板中支持使用dayjs时间处理包         
如果字符串模板无法满足你比较复杂的消息生成逻辑，你也可以用定义自执行方法的方式来进行扩展       
例：        
```javascript
// tmpls/myTmpl.js
(() => {
    const line1 = () => {
        return 'line 1\n'
    }
    return line1() + 'line 2'
})()
```
4.可以在config中指定监听的端口号    
5.get请求支持prometheus的健康检查，仅支持服务是否还存活，不提供其他信息


## 使用镜像
1.在docker文件夹下编写你自己的config.yml文件及tmpls文件     
2.编辑并使用docker文件夹下的Dockerfile生成你自己的docker镜像

# other

    飞书不支持markdown格式，但是支持卡片式的通知
    由于本人没有飞书账号和群，没办法测试，暂时只能支持飞书的txt模式，之后考虑将飞书的默认模板替换为卡片式
