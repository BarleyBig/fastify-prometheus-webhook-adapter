const crypto = require('crypto')
const fs = require('fs')
const dayjs = require('dayjs')

class Adapter {
    constructor(config) {
        this.config = config
        // 加载消息模板
        const tmpl = fs.readFileSync(config.template, { encoding: 'utf8' })

        this.tmpl = Function(`return (dayjs,info)=>{return ${tmpl}}`)()
    }

    async send(body) {
        // 1获取时间戳
        const timestamp = this.getTimestamp()
        // 2生成内容        
        const content = this.createContent(body)
        // 3fetchTo
        return this.fetchTo(timestamp, content)
    }

    fetchTo() {
        throw new Error('you need to create fetchTo function')
    }

    getUrl() {
        return this.config.url
    }

    getTimestamp() {
        return Date.now()
    }

    createContent(info) {
        // 生成消息content
        const content = this.tmpl(dayjs, info)
        log.info({ [this.config.name]: content });
        return content
    }

    createSign(timestamp) {
        const { secret } = this.config
        if (!secret) {
            return undefined
        }
        const hmac = crypto.createHmac('sha256', secret, { encoding: 'utf8' })
        hmac.update(`${timestamp}\n${secret}`)
        return hmac.digest('base64')
    }
}

module.exports = {
    Adapter
}