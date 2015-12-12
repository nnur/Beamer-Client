var webpack = require('webpack'),
    path = require('path');

var APP = __dirname + '/app';

module.exports = {
    context: APP,
    entry: ['webpack/hot/dev-server', './core/bootstrap.js'],
    output: {
        path: APP,
        filename: 'bundle.js',
    },
    devtool: 'sourcemap',
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!sass'
        }]
    }
};
