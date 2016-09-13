const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.tsx',
    },

    output: {
        filename: './build/app.js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', 'webpack.config.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: { 'react$': 'react/lib/ReactWithAddons.js', 'react-dom$': 'react/lib/ReactDOM.js' }
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            }
        ],

        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    plugins: [
        new ExtractTextPlugin('./build/app.css')
    ],

    externals: {
        localforage: 'localforage'
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    },
    
}
