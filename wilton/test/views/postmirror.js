/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(function() {
    "use strict";

    return {
        POST: function(req) {
            req.sendResponse(req.data());
        }
    };
});
