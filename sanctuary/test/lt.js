'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('lt', function() {

  eq(typeof S.lt, 'function');
  eq(S.lt.length, 1);
  eq(S.lt.toString(), 'lt :: Ord a => a -> (a -> Boolean)');

  eq(S.filter(S.lt(3), [1, 2, 3, 4, 5]), [1, 2]);

});
