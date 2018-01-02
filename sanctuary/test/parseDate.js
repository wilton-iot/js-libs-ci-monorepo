'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('parseDate', function() {

  eq(typeof S.parseDate, 'function');
  eq(S.parseDate.length, 1);
  eq(S.parseDate.toString(), 'parseDate :: String -> Maybe Date');

  eq(S.parseDate('2001-02-03T04:05:06Z'), S.Just(new Date('2001-02-03T04:05:06Z')));
  eq(S.parseDate('today'), S.Nothing);

});
