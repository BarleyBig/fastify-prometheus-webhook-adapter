const { default: fetcher, fetchUrl } = require('../fetcher')
const { Adapter } = require('./adapter')

class DingTalk extends Adapter {
    constructor(config) {
        super(config)

        if (config.secret) {
            this.fetche = fetchUrl
            this.fetchTo = this.fetchToV2
        } else {
            this.fetche = fetcher(this.config.url)
            this.fetchTo = this.fetchToV1
        }
    }

    fetchToV1(_, content) {
        return this.fetche(this.createrBoday(content))
    }

    fetchToV2(timestamp, content) {
        return this.fetche(
            `${this.config.url}&timestamp=${timestamp}&sign=${encodeURIComponent(this.createSign(timestamp))}`,
            this.createrBoday(content)
        )
    }

    createrBoday(text) {
        return JSON.stringify({
            msgtype: 'markdown',
            markdown: {
                text,
                title: '监控消息'
            }
        })
    }
}

exports.default = DingTalk