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
    // modules
    "lodash/isNil",
    "lodash/isEmpty",
    // app
    "json!/vue/views/config",
    "app/components/Pagination",
    "app/components/StateAlert",
    "./usersListStates",
    "text!./usersList.html"
], function (
        isNil, isEmpty, // modules
        cfg, Pagination, StateAlert, states, template // app
) {
    "use strict";

    function store(thiz) {
        return thiz.$store.state.usersList;
    }

    return {
        template: template,

        components: {
            "state-alert": new StateAlert({
                INITIAL: ["info", "Loading ..."],
                LOADING: ["info", "Loading ..."],
                SUCCESS: ["light", "List of existing users"],
                NO_DATA: ["dark", "No users found"],
                ERROR: ["warning", function() { return store(this).error; }]
            }, function() {
                return store(this).currentState;
            }),
            
            "pagination": new Pagination(cfg.tablePageSize,
                    function() { return this.$parent.currentPage; },
                    function() { return store(this).count; },
                    function(page) { this.$parent.loadPage(page); })
        },

        data: function() {
            return {
                users: store(this).users,

                filters: {
                    nick: "",
                    email: ""
                },

                currentPage: 1,
                sortval: "",
                sortdir: "desc"
            };
        },

        computed: {
            tableCss: function() {
                return {
                    "table": true,
                    "table-sm": true,
                    "table-bordered": true,
                    "table-striped": states.LOADING !== store(this).currentState,
                    "text-muted": states.LOADING === store(this).currentState,
                    "bg-light": states.LOADING === store(this).currentState
                };
            }
        },

        created: function() {
            this.load();
        },

        methods: {

            inState: function(state) {
                return state === store(this).currentState;
            },

            load: function(params) {
                params = params || {};
                // page
                if (isNil(params.page) && this.currentPage > 0) {
                    params.page = this.currentPage;
                }
                // sortval
                if (isNil(params.sortval) && !isEmpty(this.sortval)) {
                    params.sortval = this.sortval;
                }
                // sortdir
                if (isNil(params.sortdir) && !isEmpty(this.sortval) && !isEmpty(this.sortdir)) {
                    params.sortdir = this.sortdir;
                }
                // filters
                if (isNil(params.nick) && !isEmpty(this.filters.nick)) {
                    params.nick = this.filters.nick;
                }
                if (isNil(params.email) && !isEmpty(this.filters.email)) {
                    params.email= this.filters.email;
                }
                // dispatch action
                this.$store.dispatch("usersList/loadUsers", params);
            },

            loadPage: function(page) {
                this.currentPage = page;
                this.load({
                    page: page
                });
            },

            sort: function(field) {
                var curdir = this.sortdir;
                var dir = curdir;
                if (this.sortval === field) {
                    dir = curdir === "asc" ? "desc" : "asc";
                }
                this.sortval = field;
                this.sortdir = dir;
                this.currentPage = 1;
                this.load();
            },

            sortArrow: function(field) {
                if (this.sortval === field) {
                    var dir = this.sortdir;
                    var code = cfg.sortArrow[dir];
                    return String.fromCharCode(code);
                }
                return "";
            },

            filter: function() {
                this.currentPage = 1;
                this.load();
            }
        }

    };
});
