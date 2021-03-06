define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
var parse = require("nth-check/parse.js"),
    compile = require("nth-check/compile.js");

module.exports = function nthCheck(formula){
	return compile(parse(formula));
};

module.exports.parse = parse;
module.exports.compile = compile;

require = requireOrig;});
