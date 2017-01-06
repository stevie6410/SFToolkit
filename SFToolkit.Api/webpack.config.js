var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    watch: true,
    output: {
        path: __dirname + '/build',
        filename: 'server.js'
    },
    externals: nodeModules,
    resolve: {
        extensions: ['', '.ts']
    },
    module: {
        loaders: [
            { test: /.ts$/, loader: 'awesome-typescript-loader' }
        ]
    }
};
