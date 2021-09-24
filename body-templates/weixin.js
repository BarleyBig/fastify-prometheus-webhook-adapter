exports.creater = function (content) {
    return JSON.stringify({
        msgtype: 'markdown',
        markdown: { content }
    })
}