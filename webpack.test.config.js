const glob = require('glob');
const webpack = require('webpack');

module.exports = {
    entry: glob.sync('src/**/*-spec.ts'),

    output: {
        filename: './build/test.js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        // alias: { 'react$': 'react/lib/ReactWithAddons.js', 'react-dom$': 'react/lib/ReactDOM.js' }
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader?presets[]=es2015!ts-loader'
            },
        ]
    },

    plugins: [
        new webpack.IgnorePlugin(/\.scss$/),
    ],

    externals: {
        'localforage': 'localforage',
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
    },

}
