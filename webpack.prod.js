'use strict'

const merge = require('webpack-merge')
const common = require('./webpack.common')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common('production'), {
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
})
