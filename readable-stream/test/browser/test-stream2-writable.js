define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';
//var common = require('readable-stream/common');
var W = require('readable-stream').Writable;
var D = require('readable-stream').Duplex;
var nextTick = require("process-nextick-args");

var inherits = require('inherits');
inherits(TestWriter, W);

function TestWriter() {
  W.apply(this, arguments);
  this.buffer = [];
  this.written = 0;
}

TestWriter.prototype._write = function(chunk, encoding, cb) {
  // simulate a small unpredictable latency
  setTimeout(function() {
    this.buffer.push(chunk.toString());
    this.written += chunk.length;
    cb();
  }.bind(this), Math.floor(Math.random() * 10));
};
inherits(Processstdout, W);

function Processstdout() {
  W.apply(this, arguments);
  this.buffer = [];
  this.written = 0;
}

Processstdout.prototype._write = function(chunk, encoding, cb) {
  //console.log(chunk.toString());
  cb();
};
var chunks = new Array(50);
for (var i = 0; i < chunks.length; i++) {
  chunks[i] = new Array(i + 1).join('x');
}

module.exports = function (t) {
  var test = t.test;

  if (!process.stdout) {
    process.stdout = new Processstdout();
  }

  test('write fast', function(t) {
    var tw = new TestWriter({
      highWaterMark: 100
    });

    tw.on('finish', function() {
      t.same(tw.buffer, chunks, 'got chunks in the right order');
      t.end();
    });

    forEach(chunks, function(chunk) {
      // screw backpressure.  Just buffer it all up.
      tw.write(chunk);
    });
    tw.end();
  });

  test('write slow', function(t) {
    var tw = new TestWriter({
      highWaterMark: 100
    });

    tw.on('finish', function() {
      t.same(tw.buffer, chunks, 'got chunks in the right order');
      t.end();
    });

    var i = 0;
    (function W() {
      tw.write(chunks[i++]);
      if (i < chunks.length)
        setTimeout(W, 10);
      else
        tw.end();
    })();
  });

  test('write backpressure', function(t) {
    var tw = new TestWriter({
      highWaterMark: 50
    });

    var drains = 0;

    tw.on('finish', function() {
      t.same(tw.buffer, chunks, 'got chunks in the right order');
      t.equal(drains, 17);
      t.end();
    });

    tw.on('drain', function() {
      drains++;
    });

    var i = 0;
    (function W() {
      do {
        var ret = tw.write(chunks[i++]);
      } while (ret !== false && i < chunks.length);

      if (i < chunks.length) {
        t.ok(tw._writableState.length >= 50);
        tw.once('drain', W);
      } else {
        tw.end();
      }
    })();
  });

  test('write bufferize', function(t) {
    var tw = new TestWriter({
      highWaterMark: 100
    });

    var encodings =
        [ 'hex',
          'utf8',
          'utf-8',
          'ascii',
          'binary',
          'base64',
          'ucs2',
          'ucs-2',
          'utf16le',
          'utf-16le',
          undefined ];

    tw.on('finish', function() {
      t.same(tw.buffer, chunks, 'got the expected chunks');
    });

    forEach(chunks, function(chunk, i) {
      var enc = encodings[ i % encodings.length ];
      chunk = new Buffer(chunk);
      tw.write(chunk.toString(enc), enc);
    });
    t.end();
  });

  test('write no bufferize', function(t) {
    var tw = new TestWriter({
      highWaterMark: 100,
      decodeStrings: false
    });

    tw._write = function(chunk, encoding, cb) {
      t.equals(typeof chunk, 'string');
      chunk = new Buffer(chunk, encoding);
      return TestWriter.prototype._write.call(this, chunk, encoding, cb);
    };

    var encodings =
        [ 'hex',
          'utf8',
          'utf-8',
          'ascii',
          'binary',
          'base64',
          'ucs2',
          'ucs-2',
          'utf16le',
          'utf-16le',
          undefined ];

    tw.on('finish', function() {
      t.same(tw.buffer, chunks, 'got the expected chunks');
    });

    forEach(chunks, function(chunk, i) {
      var enc = encodings[ i % encodings.length ];
      chunk = new Buffer(chunk);
      tw.write(chunk.toString(enc), enc);
    });
    t.end();
  });

  test('write callbacks', function(t) {
    var callbacks = chunks.map(function(chunk, i) {
      return [i, function(er) {
        callbacks._called[i] = chunk;
      }];
    }).reduce(function(set, x) {
      set['callback-' + x[0]] = x[1];
      return set;
    }, {});
    callbacks._called = [];

    var tw = new TestWriter({
      highWaterMark: 100
    });

    tw.on('finish', function() {
      process.nextTick(function() {
        t.same(tw.buffer, chunks, 'got chunks in the right order');
        t.same(callbacks._called, chunks, 'called all callbacks');
        t.end();
      });
    });

    forEach(chunks, function(chunk, i) {
      tw.write(chunk, callbacks['callback-' + i]);
    });
    tw.end();
  });

  test('end callback', function(t) {
    var tw = new TestWriter();
    tw.end(function() {
      t.end();
    });
  });

  test('end callback with chunk', function(t) {
    var tw = new TestWriter();
    tw.end(new Buffer('hello world'), function() {
      t.end();
    });
  });

  test('end callback with chunk and encoding', function(t) {
    var tw = new TestWriter();
    tw.end('hello world', 'ascii', function() {
      t.end();
    });
  });

  test('end callback after .write() call', function(t) {
    var tw = new TestWriter();
    tw.write(new Buffer('hello world'));
    tw.end(function() {
      t.end();
    });
  });

  test('end callback called after write callback', function(t) {
    var tw = new TestWriter();
    var writeCalledback = false;
    tw.write(new Buffer('hello world'),  function() {
      writeCalledback = true;
    });
    tw.end(function() {
      t.equal(writeCalledback, true);
      t.end();
    });
  });

  test('encoding should be ignored for buffers', function(t) {
    var tw = new W();
    var hex = '018b5e9a8f6236ffe30e31baf80d2cf6eb';
    tw._write = function(chunk, encoding, cb) {
      t.equal(chunk.toString('hex'), hex);
      t.end();
    };
    var buf = new Buffer(hex, 'hex');
    tw.write(buf, 'binary');
  });

  test('writables are not pipable', function(t) {
    var w = new W();
    w._write = function() {};
    var gotError = false;
    w.on('error', function(er) {
      gotError = true;
    });
    w.pipe(process.stdout);
    t.ok(gotError);
    t.end();
  });

  test('duplexes are pipable', function(t) {
    var d = new D();
    d._read = function() {};
    d._write = function() {};
    var gotError = false;
    d.on('error', function(er) {
      gotError = true;
    });
    d.pipe(process.stdout);
    t.ok(!gotError);
    t.end();
  });

  test('end(chunk) two times is an error', function(t) {
    var w = new W();
    w._write = function() {};
    var gotError = false;
    w.on('error', function(er) {
      gotError = true;
      t.equal(er.message, 'write after end');
    });
    w.end('this is the end');
    w.end('and so is this');
    nextTick(function() {
      t.ok(gotError);
      t.end();
    });
  });

  test('dont end while writing', function(t) {
    var w = new W();
    var wrote = false;
    w._write = function(chunk, e, cb) {
      t.ok(!this.writing);
      wrote = true;
      this.writing = true;
      setTimeout(function() {
        this.writing = false;
        cb();
      });
    };
    w.on('finish', function() {
      t.ok(wrote);
      t.end();
    });
    w.write(Buffer(0));
    w.end();
  });

  test('finish does not come before write cb', function(t) {
    var w = new W();
    var writeCb = false;
    w._write = function(chunk, e, cb) {
      setTimeout(function() {
        writeCb = true;
        cb();
      }, 10);
    };
    w.on('finish', function() {
      t.ok(writeCb);
      t.end();
    });
    w.write(Buffer(0));
    w.end();
  });

  test('finish does not come before sync _write cb', function(t) {
    var w = new W();
    var writeCb = false;
    w._write = function(chunk, e, cb) {
      cb();
    };
    w.on('finish', function() {
      t.ok(writeCb);
      t.end();
    });
    w.write(Buffer(0), function(er) {
      writeCb = true;
    });
    w.end();
  });

  test('finish is emitted if last chunk is empty', function(t) {
    var w = new W();
    w._write = function(chunk, e, cb) {
      nextTick(cb);
    };
    w.on('finish', function() {
      t.end();
    });
    w.write(Buffer(1));
    w.end(Buffer(0));
  });

  function forEach (xs, f) {
    for (var i = 0, l = xs.length; i < l; i++) {
      f(xs[i], i);
    }
  }
}

require = requireOrig;});
