var webpack = require('webpack'),
    path = require('path');

var APP = __dirname + '/app';

module.exports = {
    context: APP,
    entry: ['webpack/hot/dev-server', './core/bootstrap.js'],
    output: {
        path: APP,
        filename: 'beamer.bundle.js',
    },
    devtool: 'sourcemap',
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    }
};
