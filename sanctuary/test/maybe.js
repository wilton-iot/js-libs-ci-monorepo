'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('maybe', function() {

  eq(typeof S.maybe, 'function');
  eq(S.maybe.length, 3);
  eq(S.maybe.toString(), 'maybe :: b -> (a -> b) -> Maybe a -> b');

  eq(S.maybe(0, Math.sqrt, S.Nothing), 0);
  eq(S.maybe(0, Math.sqrt, S.Just(9)), 3);

});
