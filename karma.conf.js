const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    customLaunchers: {
      FirefoxPrivate: {
        base: 'Firefox',
        flags: ['-private-window']
      },
      ChromeIncognito: {
        base: 'Chrome',
        flags: ['--incognito']
      }
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],

    client: {
      clearContext: false // Show results in browser
    },

    coverageReporter: {
      dir: path.join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'], // Default browser
    autoWatch: false,
    restartOnFileChange: false,
    singleRun: true,

  });
};
