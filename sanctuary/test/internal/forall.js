'use strict';

var jsc = require('jsverify');

//  forall :: StrMap Function -> StrMap Function
module.exports = function forall(laws) {
  return Object.keys(laws).reduce(function(result, name) {
    var pred = laws[name];
    result[name] = function() {
      var arbs = Array.prototype.slice.call(arguments);
      var args = arbs.concat([pred]);
      test(name, function() { jsc.assert(jsc.forall.apply(jsc, args)); });
    };
    return result;
  }, {});
};
