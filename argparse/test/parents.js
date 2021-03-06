define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/*global describe, it, beforeEach*/


'use strict';

var test = require('tape-compat');
var describe = test.describe;
var it = test.it;
var assert = require('assert');

var ArgumentParser = require('argparse/lib/argparse').ArgumentParser;

describe('parents', function () {
  var parent_parser;
  var args;

  var beforeEach = function () {
    parent_parser = new ArgumentParser({ debug: true, addHelp: false });
    parent_parser.addArgument([ '--parent' ]);
  };

  beforeEach();
  it('should parse args from parents parser', function () {
    var parser = new ArgumentParser({
      parents: [ parent_parser ]
    });
    parser.addArgument([ '-f', '--foo' ]);

    args = parser.parseArgs('-f 1 --parent 2'.split(' '));
    assert.equal(args.foo, 1);
    assert.equal(args.parent, 2);

    args = parser.parseArgs('-f 1'.split(' '));
    assert.equal(args.foo, 1);
    assert.strictEqual(args.parent, null);
  });

  beforeEach();
  it('should throw error if has same args as parent', function () {
    var parser = new ArgumentParser({
      parents: [ parent_parser ]
    });
    parser.addArgument([ '-f', '--foo' ]);

    assert.throws(function () {
      parent_parser.addArgument([ '--parent' ]);
    });
  });
});

require = requireOrig;});
