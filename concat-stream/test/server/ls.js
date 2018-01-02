define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
var concat = require('concat-stream/../')
var spawn = require('child_process').spawn
var exec = require('child_process').exec
var test = require('tape')

test('ls command', function (t) {
  t.plan(1)
  var cmd = spawn('ls', [ __dirname ])
  cmd.stdout.pipe(
    concat(function(out) {
      exec('ls ' + __dirname, function (err, body) {
        t.equal(out.toString('utf8'), body.toString('utf8'))
      })
    })
  )
})

require = requireOrig;});
