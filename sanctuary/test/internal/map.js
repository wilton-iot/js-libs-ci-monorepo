'use strict';

var Z = require('sanctuary-type-classes');

var curry2 = require('./curry2');

//  map :: Functor f => (a -> b) -> f a -> f b
module.exports = curry2(Z.map);
