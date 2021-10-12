const { default: fetcher, fetchUrl } = require('../fetcher')
const { Adapter } = require('./adapter')

class Feishu extends Adapter {
    constructor(config) {
        super(config)

        this.fetche = fetcher(this.config.url)
    }

    fetchTo(timestamp, content) {
        return this.fetche(
            this.createrBoday(
                timestamp.toString(),
                content,
                this.createSign(timestamp)
            )
        )
    }

    getTimestamp() {
        return Math.floor(Date.now() / 1000)
    }

    createrBoday(timestamp, text, sign) {
        const obj = {
            timestamp,
            sign,
            msg_type: 'text',
            content: { text }
        }
        return JSON.stringify(obj)
    }
}

exports.default = Feishu