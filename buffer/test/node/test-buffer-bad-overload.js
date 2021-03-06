define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';
var Buffer = require('buffer/../').Buffer;


var assert = require('assert');

assert.doesNotThrow(function() {
  Buffer.allocUnsafe(10);
});

assert.throws(function() {
  Buffer.from(10, 'hex');
});

assert.doesNotThrow(function() {
  Buffer.from('deadbeaf', 'hex');
});


require = requireOrig;});
