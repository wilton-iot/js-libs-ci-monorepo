define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
var baseKarma = require('./base-karma')

module.exports = function(config) {

  var baseConfig = baseKarma(config);

  config.set(Object.assign(baseConfig, {
    browsers: ['FirefoxHeadless'],
    reporters: ['mocha'],
    client: {
      captureConsole: true,
      mocha: {
        reporter: 'html',
      }
    },
  }));

};

require = requireOrig;});
