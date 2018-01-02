'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('reduce', function() {

  eq(typeof S.reduce, 'function');
  eq(S.reduce.length, 3);
  eq(S.reduce.toString(), 'reduce :: Foldable f => (a -> b -> a) -> a -> f b -> a');

  eq(S.reduce(S.concat, 'x', []), 'x');
  eq(S.reduce(S.concat, 'x', ['A', 'B', 'C']), 'xABC');
  eq(S.reduce(S.concat, 'x', {}), 'x');
  eq(S.reduce(S.concat, 'x', {a: 'A', b: 'B', c: 'C'}), 'xABC');
  eq(S.reduce(S.concat, 'x', {c: 'C', b: 'B', a: 'A'}), 'xABC');
  eq(S.reduce(S.concat, 'x', S.Just('A')), 'xA');
  eq(S.reduce(S.lift2(S.concat), S.Just('x'), [S.Just('A'), S.Just('B'), S.Just('C')]), S.Just('xABC'));

});
