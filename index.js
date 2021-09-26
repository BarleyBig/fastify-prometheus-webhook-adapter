const fastify = require('fastify')
const dayjs = require('dayjs')
const fs = require('fs')
const fetcher = require('./fetcher').default
const { config } = require('./config-init')
const path = require('path')

const server = fastify()

const adapters = []

config.targets.forEach(p => {
    adapters.push(p.name)
    const tmpl = path.join(__dirname, p.template ?? './tmpls/default.js')
    const adapter = {
        tmpl: fs.readFileSync(tmpl, { encoding: 'utf8' }),
        fetcher: fetcher(p.url),
        bodyCreater: require(`./adapters/${p.type}`).createrBoday
    }
    server.decorate(p.name, adapter)
})

server.get('/*', async (request, reply) => {
    return 'OK'
})
server.post('/*', async function (request, reply) {
    // console.log(request.params['*']);
    let names = adapters
    if (request.params['*']) {
        const specifieds = request.params['*'].split('/').filter(p => p)
        names = names.filter(p => specifieds.some(q => q === p))
    }
    names.length || (names = adapters)
    // return names
    await Promise.all(names.map(p => {
        const adapter = this[p]
        const body = adapter.bodyCreater(eval(`((info, dayjs) => {
            return ${adapter.tmpl}
        })(request.body, dayjs)`))
        console.debug(`adapter ${p} body:`, body);
        return adapter.fetcher(body).then(async res => {
            console.log(`adapter ${p} response:`, res.status, await res.text());
        }).catch(err => {
            console.error(`adapter ${p} error:`, res.status, err)
        })
    }))
    return 'OK'
})

server.listen(config.ports, '0.0.0.0', (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})