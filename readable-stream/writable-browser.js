define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
module.exports = require('readable-stream/lib/_stream_writable.js');

require = requireOrig;});
