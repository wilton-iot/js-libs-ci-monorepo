'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('max', function() {

  eq(typeof S.max, 'function');
  eq(S.max.length, 2);
  eq(S.max.toString(), 'max :: Ord a => a -> a -> a');

  eq(S.max(10, 2), 10);
  eq(S.max(2, 10), 10);
  eq(S.max(0.1, 0.01), 0.1);
  eq(S.max(0.01, 0.1), 0.1);
  eq(S.max(Infinity, -Infinity), Infinity);
  eq(S.max(-Infinity, Infinity), Infinity);

  eq(S.max(new Date(10), new Date(2)), new Date(10));
  eq(S.max(new Date(2), new Date(10)), new Date(10));

  eq(S.max('abc', 'xyz'), 'xyz');
  eq(S.max('xyz', 'abc'), 'xyz');
  eq(S.max('10', '2'), '2');
  eq(S.max('2', '10'), '2');
  eq(S.max('A', 'a'), 'a');
  eq(S.max('a', 'A'), 'a');

});
