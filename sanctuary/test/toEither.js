'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('toEither', function() {

  eq(typeof S.toEither, 'function');
  eq(S.toEither.length, 2);
  eq(S.toEither.toString(), 'toEither :: a -> b -> Either a b');

  eq(S.toEither('a', null), S.Left('a'));
  eq(S.toEither('a', undefined), S.Left('a'));
  eq(S.toEither('a', 42), S.Right(42));

});
