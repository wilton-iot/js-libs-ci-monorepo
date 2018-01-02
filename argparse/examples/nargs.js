define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';

var ArgumentParser = require('argparse/lib/argparse').ArgumentParser;
var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Argparse examples: nargs'
});
parser.addArgument(
  [ '-f', '--foo' ],
  {
    help: 'foo bar',
    nargs: 1
  }
);
parser.addArgument(
  [ '-b', '--bar' ],
  {
    help: 'bar foo',
    nargs: '*'
  }
);

parser.printHelp();
console.log('-----------');

var args;
args = parser.parseArgs('--foo a --bar c d'.split(' '));
console.dir(args);
console.log('-----------');
args = parser.parseArgs('--bar b c f --foo a'.split(' '));
console.dir(args);

require = requireOrig;});
