/*
 * Copyright 2018, alex at staticlibs.net
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
    "module",
    "wilton/Channel",
    "wilton/Logger",
    "wilton/loader",
    "wilton/misc",
    "wilton/Server"
], function(module, Channel, Logger, loader, misc, Server) {
    "use strict";
    var logger = new Logger(module.id);
    var appdir = misc.wiltonConfig().applicationDirectory;

    // should be loaded from config file
    function loadConfig() {
        return {
            dbUrl: "sqlite://" + appdir + "vueExample.db",
            tablePageSize: 8,
            requestTimeoutMillis: 3000,
            debounceWaitMillis: 500,
            sortArrow: {
                asc: 0x2191,
                desc: 0x2193
            },
            logging: {
                appenders: [{
                    appenderType: "CONSOLE",
                    thresholdLevel: "DEBUG"
                }],
                loggers: {
                    "staticlib": "WARN",
                    "wilton": "INFO",
                    "wilton.DBConnection": "INFO",
                    "vue": "DEBUG"
                }
            }
        };
    }

    return {
        main: function() {
            var conf = loadConfig();

            // init logging
            Logger.initialize(conf.logging);

            // share conf for other threads
            new Channel("vue/conf", 1).send(conf);
            // prepare lock for sqlite access
            new Channel(conf.dbUrl, 1);

            // init db using lazy-load deps
            require([
                "vue/db",
                "vue/models/schema",
                "vue/models/user"
            ], function(db, schema, user) {
                schema.create();
                db.doInSyncTransaction(conf.dbUrl, function() {
                    user.insertDummyRecords();
                });
                db.close();
            });

            // start server
            var server = new Server({
                tcpPort: 8080,
                views: [
                    "vue/views/addUser",
                    "vue/views/config",
                    "vue/views/usersList"
                ],
                rootRedirectLocation: "/web/index.html",
                documentRoots: [{
                    resource: "/web",
                    dirPath: loader.findModulePath("vue/web"),
                    cacheMaxAgeSeconds: 0
                },
                {
                    resource: "/stdlib/",
                    zipPath: appdir + "std.wlib",
                    cacheMaxAgeSeconds: 0
                }]
            });
            logger.info("Server started: http://127.0.0.1:8080/" );

            // wait for shutdown
            misc.waitForSignal();

            logger.info("Shutting down ...");
            server.stop();
        }
    };
});
