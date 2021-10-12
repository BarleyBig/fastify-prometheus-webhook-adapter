const fastify = require('fastify')
const path = require('path')
const { config } = require('./config-init')

const server = fastify()

const getAdapter = (() => {
    const map = new Map()
    return (type) => {
        let a
        if (a = map.get(type)) {
            return a
        }
        a = require(`./adapters/${type}`).default
        map.set(type, a)
        return a
    }
})()

const adapters = config.targets.map(p => {
    p.template = path.join(__dirname, p.template ?? './tmpls/default.js')
    server.decorate(p.name, new (getAdapter(p.type))(p))
    return p.name
})

server.get('/*', async (request, reply) => {
    return `# HELP alertmanager_alerts How many alerts by state.
# TYPE alertmanager_alerts gauge
alertmanager_alerts{state="active"} 1
alertmanager_alerts{state="suppressed"} 0
# HELP alertmanager_alerts_invalid_total The total number of received alerts that were invalid.
# TYPE alertmanager_alerts_invalid_total counter
alertmanager_alerts_invalid_total{version="v1"} 0
alertmanager_alerts_invalid_total{version="v2"} 0`
})
server.post('/*', async function (request, reply) {
    let names = adapters
    if (request.params['*']) {
        const specifieds = request.params['*'].split('/').filter(p => p)
        names = names.filter(p => specifieds.some(q => q === p))
    }
    names.length || (names = adapters)
    // return names
    // console.log(names);
    await Promise.all(names.map(p => {
        // console.log(p);
        const adapter = this[p]
        // console.log(adapter);
        return adapter.send(request.body)
            .then(async res => {
                console.log(`adapter ${p} response:`, res.status, await res.text());
            })
            .catch(err => {
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