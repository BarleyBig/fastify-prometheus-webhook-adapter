const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const config = yaml.load(fs.readFileSync(path.join(__dirname, './config.yml'), 'utf8'))
config.targets = Object.entries(config.targets).map(([k, v]) => {
    v.name = k
    return v
})
module.exports = {
    config
}


