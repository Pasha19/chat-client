'use strict'

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('./app.config.js') || {}

const mode = 'development'
config.host = config.host || '127.0.0.1'
config.port = config.port || 3000
config.api = config.api || `http://${config.host}:${config.port}`

module.exports = {
    mode,
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
        ],
    },
    devServer: {
        hot: true,
        overlay: true,
        host: config.host,
        port: config.port,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(mode),
                API: JSON.stringify(config.api),
            },
        }),
        new VueLoaderPlugin(),
    ],
}
