'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./app.config.js') || {}

config.host = config.host || '127.0.0.1'
config.port = config.port || 3000
config.api = config.api || `http://${config.host}:${config.port}`

module.exports = (env) => {
    const devmode = env === 'development'

    return {
        mode: env,
        devtool: devmode ? 'eval-source-map' : 'source-map',
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader',
                },
                {
                    test: /\.css$/,
                    use: [
                        devmode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { sourceMap: true } },
                    ],
                },
            ],
        },
        entry: {
            'event-source': 'event-source-polyfill',
            main: './src/index.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                title: 'SSE chat',
                favicon: 'src/favicon.ico',
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    API: JSON.stringify(config.api),
                    NODE_ENV: JSON.stringify(env)
                },
            }),
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin(),
        ],
    }
}
