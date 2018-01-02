'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('lte_', function() {

  eq(typeof S.lte_, 'function');
  eq(S.lte_.length, 2);
  eq(S.lte_.toString(), 'lte_ :: Ord a => a -> a -> Boolean');

  eq(S.lte_(0, 1), true);
  eq(S.lte_(1, 1), true);
  eq(S.lte_(2, 1), false);

  eq(S.lte_(S.Just(0), S.Just(1)), true);
  eq(S.lte_(S.Just(1), S.Just(1)), true);
  eq(S.lte_(S.Just(2), S.Just(1)), false);

});
