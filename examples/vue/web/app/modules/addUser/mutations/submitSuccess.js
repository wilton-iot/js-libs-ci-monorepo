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
    "lodash/cloneDeep",
    "lodash/forEach",
    "lodash/keys",
    "vue",
    "../formStates"
], function(cloneDeep, forEach, keys, Vue, formStates) {
    "use strict";

    return function(state, user) {
        // show success badge
        Vue.set(state, "formState", formStates.SUBMIT_SUCCESS);

        // clear fields
        var klist = keys(state.userEmpty);
        forEach(klist, function(key) {
            Vue.set(user, key, cloneDeep(state.userEmpty[key]));
        });
    };
});
