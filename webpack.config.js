const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const outPath = path.resolve(__dirname, 'dist')

function to(t) {
    return path.join(outPath, t)
}

module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: outPath,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./tmpls", to: to('tmpls') },
                { from: "./config.yml", to: to('config.yml') },
                { from: "./node_modules/undici/lib/llhttp/llhttp.wasm", to: to('llhttp/llhttp.wasm') },
            ],
        }),
    ],
    target: ['node', 'es2021'],
    externals: [
        'long',
        'pino-pretty'
    ]
};