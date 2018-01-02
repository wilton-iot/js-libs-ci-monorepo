define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
import assertString from './util/assertString';

export default function isJSON(str) {
  assertString(str);
  try {
    const obj = JSON.parse(str);
    return !!obj && typeof obj === 'object';
  } catch (e) { /* ignore */ }
  return false;
}

require = requireOrig;});
