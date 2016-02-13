var webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path');

var APP = __dirname + '/app';

delete webpack.optimize.DedupePlugin;

module.exports = {
    context: APP,
    entry: ['./core/bootstrap.js'],
    output: {
        path: 'dist',
        filename: 'beamer.bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: APP + '/index.html',
            to: 'index.html'
        },{
            from: APP + '/assets/images/icons/**/*',
            to: '/assets/images/icons'
        }])
    ],
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
