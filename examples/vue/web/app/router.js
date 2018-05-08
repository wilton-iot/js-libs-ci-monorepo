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

define(function(require) {
    "use strict";

    var Vue = require("vue");
    var VueRouter = require("vue-router");

    Vue.use(VueRouter);

    return new VueRouter({
        linkActiveClass: "list-group-item-secondary",
        linkExactActiveClass: "list-group-item-secondary",
        routes: [
            { path: "/", redirect: "/description" },
            { path: "/description", component: require("./modules/description/description") },
            { path: "/addUser", component: require("./modules/addUser/addUser") },
            { path: "/searchUsers", component: require("./modules/usersList/usersList") },
            { path: "/aboutWilton", component: require("./modules/aboutWilton/aboutWilton") }
        ]
    });
});
