'use strict';

var S = require('..');

var eq = require('./internal/eq');
var map = require('./internal/map');


test('A', function() {

  eq(typeof S.A, 'function');
  eq(S.A.length, 2);
  eq(S.A.toString(), 'A :: (a -> b) -> a -> b');

  eq(S.A(S.add(1), 1), 2);
  eq(map(S.A(S.__, 100))([S.add(1), Math.sqrt]), [101, 10]);

});
