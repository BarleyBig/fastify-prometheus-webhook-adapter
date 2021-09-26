exports.createrBoday = function (content) {
    return JSON.stringify({
        msgtype: 'markdown',
        markdown: { content }
    })
}