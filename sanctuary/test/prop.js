'use strict';

var S = require('..');

var eq = require('./internal/eq');
var throws = require('./internal/throws');


test('prop', function() {

  eq(typeof S.prop, 'function');
  eq(S.prop.length, 2);
  eq(S.prop.toString(), 'prop :: Accessible a => String -> a -> b');

  throws(function() { S.prop('xxx', [1, 2, 3]); },
         TypeError,
         '‘prop’ expected object to have a property named ‘xxx’; [1, 2, 3] does not');

  eq(S.prop('a', {a: 0, b: 1}), 0);
  eq(S.prop('0', [1, 2, 3]), 1);
  eq(S.prop('length', 'abc'), 3);
  eq(S.prop('x', Object.create({x: 1, y: 2})), 1);
  eq(S.prop('global', /x/g), true);

});
