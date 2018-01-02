'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('or', function() {

  eq(typeof S.or, 'function');
  eq(S.or.length, 2);
  eq(S.or.toString(), 'or :: Boolean -> Boolean -> Boolean');

  eq(S.or(false, false), false);
  eq(S.or(false, true), true);
  eq(S.or(true, false), true);
  eq(S.or(true, true), true);

});
