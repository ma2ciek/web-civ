const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',

    output: {
        filename: './build/app.js',
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
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader'
                }),
            },
            {
                test: /\/json$/,
                loader: 'json-loader',
                include: [
                    /node_modules/
                ]
            }
        ],
    },

    plugins: [
        new ExtractTextPlugin('./build/app.css')
    ],

    externals: {
        'localforage': 'localforage',
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
    },
    
}
