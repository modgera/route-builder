/* eslint-disable */
'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: ['src/__tests__/**/*.html', 'src/__tests__/**/*.js'],
    preprocessors: {
      'src/__tests__/**/*.html': ['html2js'],
      'src/__tests__/**/*.js': ['browserify'],
    },
    reporters: ['mocha', 'coverage'],
    port: 9001,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browserify: {
      debug: true,
      transform: [
        'babelify',
        [
          'browserify-css',
          {
            minify: true,
            output: 'bundle.css',
          },
        ],
        'imgurify',
      ],
    },
    coverageReporter: {
      reporters: [
        {
          type: 'html',
        },
        {
          type: 'text',
        },
      ],
      check: {
        global: {
          statements: 80,
        },
      },
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    autoWatch: false,
    concurrency: Infinity,
  });
};
