/*
 * Copyright 2019, alex at staticlibs.net
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
    "vue-require/store/dispatch",
    "text!./landing.html"
], function (module, dispatch, template) {
    "use strict";

    return {
        template: template,

        data: function() {
            return {
                gitUrl: "git+ssh://username@hostname/path/to/repo"
//                gitUrl: "git+ssh://alex@192.168.1.1/home/alex/projects/wilton_other/launcher_apps/vueapp"
            };
        },

        methods: {
            launch: function() {
                dispatch("cloneGitRepo", this.gitUrl);
            }
        }
    };
});
