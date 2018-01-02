'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('toUpper', function() {

  eq(typeof S.toUpper, 'function');
  eq(S.toUpper.length, 1);
  eq(S.toUpper.toString(), 'toUpper :: String -> String');

  eq(S.toUpper(''), '');
  eq(S.toUpper('ABC def 123'), 'ABC DEF 123');

});
