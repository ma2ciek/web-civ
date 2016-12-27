const webpack = require('webpack');
module.exports = function (config) {
	config.set({
		browsers: ['PhantomJS'],
		frameworks: ['chai', 'mocha'],
		reporters: ['mocha'],

		files: [
			{ pattern: 'src/**/*-spec.ts', watched: false },
		],

		preprocessors: {
			'src/**/*-spec.ts': ['webpack'],
		},

		webpack: {
			devtool: 'source-map',

			resolve: {
				extensions: ['.ts', '.tsx', '.js'],
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
		},

		webpackMiddleware: {
			stats: 'errors-only'
		},

		mochaReporter: {
			showDiff: true
		}

		
	});
};