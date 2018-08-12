'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const config = require('./app.config.js') || {}

config.host = config.host || '127.0.0.1'
config.port = config.port || 3000
config.api = config.api || `http://${config.host}:${config.port}`

module.exports = merge(common('development'), {
    devServer: {
        hot: true,
        overlay: true,
        host: config.host,
        port: config.port,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
})
