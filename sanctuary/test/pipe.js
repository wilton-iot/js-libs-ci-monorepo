'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('pipe', function() {

  eq(typeof S.pipe, 'function');
  eq(S.pipe.length, 2);
  eq(S.pipe.toString(), 'pipe :: Array Function -> a -> b');

  eq(S.pipe([], '99'), '99');
  eq(S.pipe([parseInt], '99'), 99);
  eq(S.pipe([parseInt, S.add(1)], '99'), 100);
  eq(S.pipe([parseInt, S.add(1), Math.sqrt], '99'), 10);
  eq(S.pipe([parseInt, S.add(1), Math.sqrt, S.sub(1)], '99'), 9);

});
