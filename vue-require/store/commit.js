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
    "../utils/moduleName",
    "./storeHolder"
], function(moduleName, storeHolder) {
    "use strict";

    return function(module, mutation, params) {
        if ("undefined" === typeof(mutation)) {
            throw new Error("Required parameter 'mutation' not specified");
        }
        var name = mutation;
        var modname = moduleName(module);
        if (null !== modname) {
            name = modname + "/" + name;
        }
        var store = storeHolder.get();
        return store.commit(name, params);
    };
});
