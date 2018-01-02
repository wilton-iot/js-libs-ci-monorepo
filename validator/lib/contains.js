define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

var _assertString = require('validator/lib/util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);

var _toString = require('validator/lib/util/toString');

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function contains(str, elem) {
  (0, _assertString2.default)(str);
  return str.indexOf((0, _toString2.default)(elem)) >= 0;
}
module.exports = exports['default'];

require = requireOrig;});
