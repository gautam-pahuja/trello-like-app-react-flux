const path = require('path');
const webpack = require('webpack');


module.exports = {
    devtool:'eval', // Use eval for Dev cheap-source-map cheap-module-source-map cheap-source-map
    entry: "./src/js/main.js",
    output: {
        path: './prod',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            include: __dirname,
            env: {
                development: {
                    presets: ['react-hmre']
                }
            },
            query: {
                presets: [ "es2015", "react"]
            },

        },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(woff2|woff|ttf|svg|eot)$/,
                loader: 'file'
            },
            {
                test: /\.(jpg|png|woff2|woff|ttf|svg|eot|gif)$/,
                loader: 'url?limit=25000'
            }

        ],

    },
    // Step 2: prod environment
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
}
