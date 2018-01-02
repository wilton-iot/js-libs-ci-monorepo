'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('apSecond', function() {

  eq(typeof S.apSecond, 'function');
  eq(S.apSecond.length, 2);
  eq(S.apSecond.toString(), 'apSecond :: Apply f => f a -> f b -> f b');

  eq(S.apSecond([1, 2], [3, 4]), [3, 4, 3, 4]);
  eq(S.apSecond(S.Just(1), S.Just(2)), S.Just(2));

});
