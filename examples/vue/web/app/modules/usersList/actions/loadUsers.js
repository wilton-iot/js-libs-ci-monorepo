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
    "lodash/debounce",
    "qs",
    "wilton/web/httpClient",
    "json!/vue/views/config"
], function(debounce, qs, http, conf) {
    "use strict";


    function createUrl(params) {
        var url = "/vue/views/usersList";
        var queries = qs.stringify(params);
        if (queries.length > 0) {
            url += "?";
            url += queries;
        }
        return url;
    }

    return function(context, params) {
        context.commit("startLoading", params);

        http.sendRequest(createUrl(params), {
            meta: {
                timeoutMillis: conf.requestTimeoutMillis
            }
        }, debounce(function(err, resp) {
            if (err) {
                context.commit("loadError", err);
            } else {
                resp.json(function(err1, obj) {
                    if (err1) {
                        context.commit("submitError", err1);
                    } else {
                        context.commit("usersLoaded", obj);
                    }
                });
            }
        }, conf.debounceWaitMillis));
    };
});
