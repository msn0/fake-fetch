module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['browserify', 'jasmine'],
		files: [
      'node_modules/whatwg-fetch/fetch.js',
      'index.js',
      'test.js'
		],
		exclude: [],
    preprocessors: {
      'index.js': [ 'browserify' ],
      'test.js': [ 'browserify' ]
    },
		coverageReporter: {},
		reporters: ['mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['PhantomJS'],
		plugins: [
			'karma-phantomjs-launcher',
			'karma-mocha-reporter',
			'karma-jasmine',
      'karma-browserify'
		],
		singleRun: true
	});
};
