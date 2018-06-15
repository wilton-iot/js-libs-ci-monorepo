define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
var describe = require('tape-compat').describe;
var it = require('tape-compat').it;
var assert = require('assert'),
    math = require('../../../index');

describe('random', function () {
  // Note: random is a convenience function generated by distribution
  // it is tested in distribution.test.js

  it('should have a function random', function () {
    assert.equal(typeof math.random, 'function');
  })

  it('should LaTeX random', function () {
    var expression = math.parse('random(0,1)');
    assert.equal(expression.toTex(), '\\mathrm{random}\\left(0,1\\right)');
  });
});

require = requireOrig;});