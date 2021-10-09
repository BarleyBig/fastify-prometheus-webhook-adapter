const crypto = require('crypto')

exports.createrBoday = function (text) {
    return JSON.stringify({
        msgtype: 'markdown',
        markdown: {
            text,
            title: '监控消息'
        }
    })
}

exports.createSign = function ({ secret, url }) {
    return () => {
        const now = Date.now()
        const hmac = crypto.createHmac('sha256', secret, { encoding: 'utf8' })
        hmac.update(`${now}\n${secret}`)
        const str = hmac.digest('base64')
        return `${url}&timestamp=${now}&sign=${encodeURIComponent(str)}`
    }
}