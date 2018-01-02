'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('unwords', function() {

  eq(typeof S.unwords, 'function');
  eq(S.unwords.length, 1);
  eq(S.unwords.toString(), 'unwords :: Array String -> String');

  eq(S.unwords([]), '');
  eq(S.unwords(['']), '');
  eq(S.unwords(['', '']), ' ');
  eq(S.unwords([' ']), ' ');
  eq(S.unwords([' ', ' ']), '   ');
  eq(S.unwords(['foo', 'bar', 'baz']), 'foo bar baz');
  eq(S.unwords([' foo ', ' bar ', ' baz ']), ' foo   bar   baz ');

});
