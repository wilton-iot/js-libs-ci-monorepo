define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
var concat = require('concat-stream')
var test = require('tape-compat')
var Uint8Array = "undefined" !== typeof(Uint8Array) ? Uint8Array : require("typedarray").Uint8Array;

test('type inference works as expected', function(t) {
  var stream = concat()
  t.equal(stream.inferEncoding(['hello']), 'array', 'array')
  t.equal(stream.inferEncoding(new Buffer('hello')), 'buffer', 'buffer')
//  t.equal(stream.inferEncoding(undefined), 'buffer', 'buffer')
//  t.equal(stream.inferEncoding(new Uint8Array(1)), 'uint8array', 'uint8array')
  t.equal(stream.inferEncoding('hello'), 'string', 'string')
  t.equal(stream.inferEncoding(''), 'string', 'string')
  t.equal(stream.inferEncoding({hello: "world"}), 'object', 'object')
  t.equal(stream.inferEncoding(1), 'buffer', 'buffer')
  t.end()
})

require = requireOrig;});
