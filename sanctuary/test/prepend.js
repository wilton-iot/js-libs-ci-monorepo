'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('prepend', function() {

  eq(typeof S.prepend, 'function');
  eq(S.prepend.length, 2);
  eq(S.prepend.toString(), 'prepend :: (Applicative f, Semigroup f) => a -> f a -> f a');

  eq(S.prepend(1, []), [1]);
  eq(S.prepend(1, [2, 3]), [1, 2, 3]);
  eq(S.prepend([1, 2], [[3, 4], [5, 6]]), [[1, 2], [3, 4], [5, 6]]);

  eq(S.prepend([1], S.Nothing), S.Just([1]));
  eq(S.prepend([1], S.Just([2])), S.Just([1, 2]));

  eq(S.prepend([1], S.Left('error')), S.Right([1]));
  eq(S.prepend([1], S.Right([2])), S.Right([1, 2]));

});
