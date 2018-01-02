'use strict';

var S = require('..');

var eq = require('./internal/eq');
var map = require('./internal/map');


test('T', function() {

  eq(typeof S.T, 'function');
  eq(S.T.length, 2);
  eq(S.T.toString(), 'T :: a -> (a -> b) -> b');

  eq(S.T(42, S.add(1)), 43);
  eq(map(S.T(100))([S.add(1), Math.sqrt]), [101, 10]);

});
