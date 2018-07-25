'use strict'

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const mode = 'development'

module.exports = {
    mode,
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
        ],
    },
    devServer: {
        hot: true,
        host: process.env.HOST_LISTEN || '0.0.0.0',
        port: process.env.PORT_LISTEN || 8000,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(mode)
            },
        }),
        new VueLoaderPlugin(),
    ],
}
