const fetch = require('undici-fetch')
const { Request, Headers } = fetch

const defHeaders = new Headers({
    'Content-Type': 'application/json'
})

exports.default = (url) => {
    const request = new Request(url, {
        headers: defHeaders,
        method: 'POST',
        keepalive: true
    })
    return (body) => {
        return fetch(request, { body })
    }
}

exports.fetchUrl = (url, body) => {
    return fetch(new Request(url, {
        headers: defHeaders,
        method: 'POST',
        keepalive: true
    }), { body })
}