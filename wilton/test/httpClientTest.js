/*
 * Copyright 2017, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "assert",
    "wilton/Channel",
    "wilton/crypto",
    "wilton/fs",
    "wilton/httpClient",
    "wilton/Server",
    "wilton/thread",
    "wilton/utils",
    "./_scratchDir"
], function(assert, Channel, crypto, fs, http, Server, thread, utils, scratchDir) {
    "use strict";

    print("test: wilton/httpClient");
    var dir = scratchDir + "httpClientTest/";
    fs.mkdir(dir);

    var server = new Server({
        tcpPort: 8080,
        views: [
            "wilton/test/views/hi",
            "wilton/test/views/savefile",
            "wilton/test/views/postmirror",
            "wilton/test/views/bigfile"
        ],
        requestPayload: {
            tmpDirPath: dir,
            memoryLimitBytes: 20000
        }
    });

    var resp = http.sendRequest("http://127.0.0.1:8080/wilton/test/views/hi", {
        meta: {
            forceHttp10: true,
            timeoutMillis: 60000
        }
    });
    assert.equal(resp.data, "Hi from wilton_test!");
    assert.equal(resp.headers.Connection, "close");
    assert(resp.requestId > 0);
    
    var resp = http.sendRequest("http://127.0.0.1:8080/wilton/test/views/postmirror", {
        data: "foobar",
        meta: {
            timeoutMillis: 60000
        }
    });
    assert.equal(resp.data, "foobar");

    // hex
    var respHex = http.sendRequest("http://127.0.0.1:8080/wilton/test/views/postmirror", {
        data: "foobar",
        meta: {
            timeoutMillis: 60000,
            responseDataHex: true
        }
    });
    assert.equal(respHex.data, "666f6f626172");

    // threads

    var chan = new Channel("clientTest", 64);
    
    var num_workers = 2;
    var target = num_workers * 10;

    var threadChans = [];
    for (var i = 0; i < num_workers; i++) {
        var tc = thread.run({
            callbackScript: {
                module: "wilton/test/helpers/httpClientHelper",
                func: "postAndIncrement"
            },
            shutdownChannelName: "clientTest/" + i
        });
        threadChans.push(tc);
    }

    for(var count = 0; count < target; count++) {
        var msg = chan.receive();
        assert.deepEqual(msg, {
            data: "foobar"
        });
        //print("test: wilton/httpClient, waiting, count: [" + count + "] of: [" + target + "]");
    }
    chan.close();
    for (var i = 0; i < threadChans.length; i++) {
        threadChans[i].receiveAndClose();
    }

    // response data to file
    var resp = http.sendRequest("http://127.0.0.1:8080/wilton/test/views/postmirror", {
        data: "foobaz",
        meta: {
            timeoutMillis: 60000,
            responseDataFilePath: dir + "httpClientTest.response"
        }
    });
    var data_obj = JSON.parse(resp.data);
    assert.equal(data_obj.responseDataFilePath, dir + "httpClientTest.response");
    var contents = fs.readFile(dir + "httpClientTest.response");
    assert.equal(contents, "foobaz");

    // send file
    fs.writeFile(dir + "clientTestSend.txt", "foobaf");
    var respFile = http.sendFile("http://127.0.0.1:8080/wilton/test/views/postmirror", {
        filePath: dir + "clientTestSend.txt",
        meta: {
            timeoutMillis: 60000
        }
    });
    assert.equal(respFile.data, "foobaf");
    assert(fs.exists(dir + "clientTestSend.txt"));
    fs.unlink(dir + "clientTestSend.txt");
    assert(!fs.exists(dir + "clientTestSend.txt"));

    // send file by parts
    var tmp_dir = dir + "tmp/";
    if (fs.exists(tmp_dir)) {
        fs.rmdir(tmp_dir);
    }
    fs.mkdir(tmp_dir);
    fs.writeFile(tmp_dir + "test_part_send.txt", "foobar");
    var respFileSend = "none";
    respFileSend = http.sendFileByParts("http://127.0.0.1:8080/wilton/test/views/savefile", {
        filePath: tmp_dir + "test_part_send.txt",
        meta: {
            timeoutMillis: 60000,
            method: "POST",
            headers: {
                "X-Scratch-Dir": dir
            }
        },
        sendOptions: {
            fileName: "part_file.txt",
            fullTimeoutMillis: 140000,
            maxChunkSize: 3
        }
    });
    var saved_file = tmp_dir + "part_file.txt";
    assert(fs.exists(saved_file));
    var stat = fs.stat(saved_file);
    assert.equal(stat.size, 6);
    assert.equal(fs.readFile(saved_file), "foobar");
    fs.rmdir(tmp_dir);

    // queue
    // check no throw
    http.closeQueue();
    http.initQueue();
    var idObj = {};
    assert.throws(function() { http.initQueue(); });
    for (var i = 0; i < 8; i++) {
        var enqueued = http.enqueueRequest("http://127.0.0.1:8080/wilton/test/views/postmirror", {
            data: "foo",
            meta: {
                timeoutMillis: 60000
            }
        });
        assert(enqueued.requestId > 0);
        idObj[enqueued.requestId] = true;
    }
    var listFromQueue = http.pollQueue({
        minResponsesCount: 8
    });
    assert.equal(listFromQueue.length, 8);
    for (var i = 0; i < listFromQueue.length; i++) {
        var resp = listFromQueue[i];
        assert.equal(resp.responseCode, 200);
        assert.equal(resp.data, "foo");
        assert(resp.requestId > 0);
        assert.equal(idObj[resp.requestId], true);
        delete idObj[resp.requestId];
    }
    assert.equal(utils.listProperties(idObj).length, 0);

    // send file
    fs.writeFile(dir + "queueTestSend.txt", "foobaf");
    var enqueuedSend = http.enqueueRequest("http://127.0.0.1:8080/wilton/test/views/postmirror", {
        meta: {
            timeoutMillis: 60000,
            requestDataFilePath: dir + "queueTestSend.txt"
        }
    });
    assert(enqueuedSend.requestId > 0);
    var polledSendFile = http.pollQueue({
        minResponsesCount: 1
    });
    assert.equal(polledSendFile.length, 1);
    assert(polledSendFile[0].requestId > 0);
    assert.equal(polledSendFile[0].requestId, enqueuedSend.requestId);
    assert.equal(polledSendFile[0].data, "foobaf");

    // receive file
    var enqueuedReceive = http.enqueueRequest("http://127.0.0.1:8080/wilton/test/views/postmirror", {
        data: "foobaz",
        meta: {
            timeoutMillis: 60000,
            responseDataFilePath: dir + "queueTestReceive.txt"
        }
    });
    assert(enqueuedReceive.requestId > 0);
    var polledReceiveFile = http.pollQueue({
        minResponsesCount: 1
    });
    assert.equal(polledReceiveFile.length, 1);
    assert(polledReceiveFile[0].requestId > 0);
    assert.equal(polledReceiveFile[0].requestId, enqueuedReceive.requestId);
    assert.equal(polledReceiveFile[0].json().responseDataFilePath, dir + "queueTestReceive.txt");
    assert(fs.exists(dir + "queueTestReceive.txt"));
    assert.equal(fs.readFile(dir + "queueTestReceive.txt"), "foobaz");

    // size limit
    var enqueuedLimit = http.enqueueRequest("http://127.0.0.1:8080/wilton/test/views/postmirror", {
        data: "foobar",
        meta: {
            timeoutMillis: 60000,
            queueResponseMaxSizeBytes: 5
        }
    });
    var polledSizeLimit = http.pollQueue({
        minResponsesCount: 1
    });
    assert.equal(polledSizeLimit.length, 1);
    assert.equal(polledSizeLimit[0].requestId, enqueuedLimit.requestId);
    assert.equal(polledSizeLimit[0].responseCode, 0);
    assert(polledSizeLimit[0].error.length > 0);

    // big file
    var bigFile = dir + "bigfile.txt";
    var bigSt = "";
    var bigLen = 0;
    fs.writeFile(bigFile, "");
    for (var i = 0; ; i++) {
        bigSt += String(i) + "_";
        if (bigSt.length > (1 << 12)) {
            bigSt += "\n";
            fs.appendFile(bigFile, bigSt);
            bigLen += bigSt.length;
            bigSt = "";
        }
        if (bigLen > (1<<15)) {
            break;
        }
    }
    var bigHash = crypto.hashFile({
        filePath: bigFile
    });
    var enqueuedBig = http.enqueueRequest("http://127.0.0.1:8080/wilton/test/views/bigfile", {
        meta: {
            timeoutMillis: 60000,
            headers: {
                "X-httpClientTest-bigfile": bigFile
            }
        }
    });
    var polledBig = http.pollQueue({
        minResponsesCount: 1
    });
    assert.equal(polledBig[0].requestId, enqueuedBig.requestId);
    var bigFileReceived = dir + "bigReceived.txt";
    fs.writeFile(bigFileReceived, polledBig[0].data);
    var hashReceived = crypto.hashFile({
        filePath: bigFileReceived
    });
    assert.equal(fs.stat(bigFileReceived).size, bigLen);
    assert.equal(hashReceived, bigHash);

    server.stop();

    // connection invalid
    var enqueuedInvalid = http.enqueueRequest("http://127.0.0.1:8080/wilton/test/views/hi", {
        meta: {
            connecttimeoutMillis: 500
        }
    });
    var polledNoConnection = http.pollQueue({
        minResponsesCount: 1
    });
    assert.equal(polledNoConnection[0].requestId, enqueuedInvalid.requestId);
    assert.equal(polledNoConnection[0].responseCode, 0);
    assert.equal(polledNoConnection[0].connectionSuccess, false);
    assert.equal(polledNoConnection[0].error, "Connection error");

    fs.rmdir(dir);
});
