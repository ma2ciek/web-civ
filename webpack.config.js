const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');

module.exports = {
    entry: {
        app: './src/index.tsx',
        test: glob.sync('./src/**/*-spec.ts')
    },

    output: {
        filename: './build/[name].js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', 'webpack.config.js', '.web.js', '.ts', '.tsx', '.js'],
        // alias: { 'react$': 'react/lib/ReactWithAddons.js', 'react-dom$': 'react/lib/ReactDOM.js' }
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'babel?presets[]=es2015!ts-loader'
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
        new ExtractTextPlugin('./build/[name].css')
    ],

    externals: {
        'localforage': 'localforage',
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    
}
