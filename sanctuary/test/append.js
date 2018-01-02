'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('append', function() {

  eq(typeof S.append, 'function');
  eq(S.append.length, 2);
  eq(S.append.toString(), 'append :: (Applicative f, Semigroup f) => a -> f a -> f a');

  eq(S.append(3, []), [3]);
  eq(S.append(3, [1, 2]), [1, 2, 3]);
  eq(S.append([5, 6], [[1, 2], [3, 4]]), [[1, 2], [3, 4], [5, 6]]);

  eq(S.append([2], S.Nothing), S.Just([2]));
  eq(S.append([2], S.Just([1])), S.Just([1, 2]));

  eq(S.append([2], S.Left('error')), S.Right([2]));
  eq(S.append([2], S.Right([1])), S.Right([1, 2]));

});
