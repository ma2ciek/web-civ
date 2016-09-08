module.exports = {
    entry: './src/app.tsx',

    output: {
        filename: './build/bundle.js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', 'webpack.config.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
}