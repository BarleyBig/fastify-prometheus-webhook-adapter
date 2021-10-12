const { default: fetcher } = require('../fetcher')
const { Adapter } = require('./adapter')

class Weixin extends Adapter {
    constructor(config) {
        super(config)

        this.fetche = fetcher(this.config.url)
    }

    fetchTo(_, content) {
        return this.fetche(this.createrBoday(content))
    }

    createrBoday(content) {
        return JSON.stringify({
            msgtype: 'markdown',
            markdown: { content }
        })
    }
}

exports.default = Weixin