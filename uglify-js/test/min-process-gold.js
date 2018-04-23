define(function(e,t,n){function c(){function e(e){return[this[0],U(e,function(e){var t=[e[0]];return e.length>1&&(t[1]=s(e[1])),t})]}function t(e){var t=[this[0]];return e!=null&&t.push(U(e,s)),t}function s(e){if(e==null)return null;try{i.push(e);var t=e[0],s=r[t];if(s){var o=s.apply(e,e.slice(1));if(o!=null)return o}return s=n[t],s.apply(e,e.slice(1))}finally{i.pop()}}function u(e){if(e==null)return null;try{return i.push(e),n[e[0]].apply(e,e.slice(1))}finally{i.pop()}}function a(e,t){var n={},i;for(i in e)R(e,i)&&(n[i]=r[i],r[i]=e[i]);var s=t();for(i in n)R(n,i)&&(n[i]?r[i]=n[i]:delete r[i]);return s}var n={string:function(e){return[this[0],e]},num:function(e){return[this[0],e]},name:function(e){return[this[0],e]},toplevel:function(e){return[this[0],U(e,s)]},block:t,splice:t,"var":e,"const":e,"try":function(e,t,n){return[this[0],U(e,s),t!=null?[t[0],U(t[1],s)]:null,n!=null?U(n,s):null]},"throw":function(e){return[this[0],s(e)]},"new":function(e,t){return[this[0],s(e),U(t,s)]},"switch":function(e,t){return[this[0],s(e),U(t,function(e){return[e[0]?s(e[0]):null,U(e[1],s)]})]},"break":function(e){return[this[0],e]},"continue":function(e){return[this[0],e]},conditional:function(e,t,n){return[this[0],s(e),s(t),s(n)]},assign:function(e,t,n){return[this[0],e,s(t),s(n)]},dot:function(e){return[this[0],s(e)].concat(o(arguments,1))},call:function(e,t){return[this[0],s(e),U(t,s)]},"function":function(e,t,n){return[this[0],e,t.slice(),U(n,s)]},"debugger":function(){return[this[0]]},defun:function(e,t,n){return[this[0],e,t.slice(),U(n,s)]},"if":function(e,t,n){return[this[0],s(e),s(t),s(n)]},"for":function(e,t,n,r){return[this[0],s(e),s(t),s(n),s(r)]},"for-in":function(e,t,n,r){return[this[0],s(e),s(t),s(n),s(r)]},"while":function(e,t){return[this[0],s(e),s(t)]},"do":function(e,t){return[this[0],s(e),s(t)]},"return":function(e){return[this[0],s(e)]},binary:function(e,t,n){return[this[0],e,s(t),s(n)]},"unary-prefix":function(e,t){return[this[0],e,s(t)]},"unary-postfix":function(e,t){return[this[0],e,s(t)]},sub:function(e,t){return[this[0],s(e),s(t)]},object:function(e){return[this[0],U(e,function(e){return e.length==2?[e[0],s(e[1])]:[e[0],s(e[1]),e[2]]})]},regexp:function(e,t){return[this[0],e,t]},array:function(e){return[this[0],U(e,s)]},stat:function(e){return[this[0],s(e)]},seq:function(){return[this[0]].concat(U(o(arguments),s))},label:function(e,t){return[this[0],e,s(t)]},"with":function(e,t){return[this[0],s(e),s(t)]},atom:function(e){return[this[0],e]},directive:function(e){return[this[0],e]}},r={},i=[];return{walk:s,dive:u,with_walkers:a,parent:function(){return i[i.length-2]},stack:function(){return i}}}function h(e){this.names={},this.mangled={},this.rev_mangled={},this.cname=-1,this.refs={},this.uses_with=!1,this.uses_eval=!1,this.directives=[],this.parent=e,this.children=[],e?(this.level=e.level+1,e.children.push(this)):this.level=0}function p(){return typeof DIGITS_OVERRIDE_FOR_TESTING!="undefined"?DIGITS_OVERRIDE_FOR_TESTING:"etnrisouaflchpdvmgybwESxTNCkLAOM_DPHBjFIqRUzWXV$JKQGYZ0516372984"}function v(e){function s(e){t=new h(t),t.labels=new h;var n=t.body=e();return n.scope=t,t=t.parent,n}function o(e,n){return t.define(e,n)}function u(e){t.refs[e]=!0}function a(e,t,n){var i=this[0]=="defun";return[this[0],i?o(e,"defun"):e,t,s(function(){return i||o(e,"lambda"),U(t,function(e){o(e,"arg")}),U(n,r)})]}function f(e){return function(t){U(t,function(t){o(t[0],e),t[1]&&u(t[0])})}}function l(e){e&&(t.labels.refs[e]=!0)}var t=null,n=c(),r=n.walk,i=[];return s(function(){function c(e,t){for(t=e.children.length;--t>=0;)c(e.children[t]);for(t in e.refs)if(R(e.refs,t))for(var n=e.has(t),r=e;r;r=r.parent){r.refs[t]=n;if(r===n)break}}var s=n.with_walkers({"function":a,defun:a,label:function(e,n){t.labels.define(e)},"break":l,"continue":l,"with":function(e,n){for(var r=t;r;r=r.parent)r.uses_with=!0},"var":f("var"),"const":f("const"),"try":function(e,t,n){if(t!=null)return[this[0],U(e,r),[o(t[0],"catch"),U(t[1],r)],n!=null?U(n,r):null]},name:function(e){e=="eval"&&i.push(t),u(e)}},function(){return r(e)});return U(i,function(e){if(!e.has("eval"))while(e)e.uses_eval=!0,e=e.parent}),c(t),s})}function m(e,t){function s(e,n){return t.mangle?!t.toplevel&&!i.parent?e:t.except&&u(e,t.except)?e:t.no_functions&&R(i.names,e)&&(i.names[e]=="defun"||i.names[e]=="lambda")?e:i.get_mangled(e,n):e}function o(e){if(t.defines)return!i.has(e)&&R(t.defines,e)?t.defines[e]:null}function a(e,n,o){if(!t.no_functions&&t.mangle){var u=this[0]=="defun",a;e&&(u?e=s(e):o.scope.references(e)?(a={},!i.uses_eval&&!i.uses_with?e=a[e]=i.next_mangled():a[e]=e):e=null)}return o=f(o.scope,function(){return n=U(n,function(e){return s(e)}),U(o,r)},a),[this[0],e,n,o]}function f(e,t,n){var r=i;i=e;if(n)for(var o in n)R(n,o)&&e.set_mangle(o,n[o]);for(var o in e.names)R(e.names,o)&&s(o,!0);var u=t();return u.scope=e,i=r,u}function l(e){return[this[0],U(e,function(e){return[s(e[0]),r(e[1])]})]}function h(e){if(e)return[this[0],i.labels.get_mangled(e)]}var n=c(),r=n.walk,i;return t=I(t,{mangle:!0,toplevel:!1,defines:null,except:null,no_functions:!1}),n.with_walkers({"function":a,defun:function(){var e=a.apply(this,arguments);switch(n.parent()[0]){case"toplevel":case"function":case"defun":return U.at_top(e)}return e},label:function(e,t){return i.labels.refs[e]?[this[0],i.labels.get_mangled(e,!0),r(t)]:r(t)},"break":h,"continue":h,"var":l,"const":l,name:function(e){return o(e)||[this[0],s(e)]},"try":function(e,t,n){return[this[0],U(e,r),t!=null?[s(t[0]),U(t[1],r)]:null,n!=null?U(n,r):null]},toplevel:function(e){var t=this;return f(t.scope,function(){return[t[0],U(e,r)]})},directive:function(){return U.at_top(this)}},function(){return r(v(e))})}function y(e,t){return B(e).length>B(t[0]=="stat"?t[1]:t).length?t:e}function b(e){return e[0]=="block"&&e[1]&&e[1].length>0?e[1][e[1].length-1]:e}function w(e){if(e)switch(b(e)[0]){case"return":case"break":case"continue":case"throw":return!0}}function E(e){return e[0]=="unary-prefix"&&u(e[1],["!","delete"])||e[0]=="binary"&&u(e[1],["in","instanceof","==","!=","===","!==","<","<=",">=",">"])||e[0]=="binary"&&u(e[1],["&&","||"])&&E(e[2])&&E(e[3])||e[0]=="conditional"&&E(e[2])&&E(e[3])||e[0]=="assign"&&e[1]===!0&&E(e[3])||e[0]=="seq"&&E(e[e.length-1])}function S(e){return!e||e[0]=="block"&&(!e[1]||e[1].length==0)}function x(e){return e[0]=="string"||e[0]=="unary-prefix"&&e[1]=="typeof"||e[0]=="binary"&&e[1]=="+"&&(x(e[2])||x(e[3]))}function N(e){S(e)||g("Dropping unreachable code: "+B(e,!0))}function C(e){function r(e){e=U(e,n);for(var t=0;t<e.length;++t){var i=e[t];if(i[0]!="if")continue;if(i[3])continue;var s=i[2];if(!w(s))continue;var o=n(i[1]),u=r(e.slice(t+1)),a=u.length==1?u[0]:["block",u];return e.slice(0,t).concat([[i[0],o,s,a]])}return e}function i(e,t,n){return n=r(n),[this[0],e,t,n]}function s(e){return[this[0],e!=null?r(e):null]}var t=c(),n=t.walk;return t.with_walkers({defun:i,"function":i,block:s,splice:s,toplevel:function(e){return[this[0],r(e)]},"try":function(e,t,n){return[this[0],r(e),t!=null?[t[0],r(t[1])]:null,n!=null?r(n):null]}},function(){return n(e)})}function k(e,t){function o(){throw i}function u(){throw s}function a(){return t.call(this,this,n,o,u)}function f(e){if(e=="++"||e=="--")return a.apply(this,arguments)}function l(e){if(e=="&&"||e=="||")return a.apply(this,arguments)}var n=c(),r=n.walk,i={},s={};return n.with_walkers({"try":a,"throw":a,"return":a,"new":a,"switch":a,"break":a,"continue":a,assign:a,call:a,"if":a,"for":a,"for-in":a,"while":a,"do":a,"unary-prefix":f,"unary-postfix":f,conditional:a,binary:l,defun:a},function(){for(;;)try{r(e);break}catch(t){if(t===i)break;if(t===s)continue;throw t}})}function L(e){function i(e,t){var i=r;r=t,e=U(e,n);var s={},o=U(t.names,function(e,n){return e!="var"?U.skip:t.references(n)?(s[n]=!0,[n]):U.skip});return o.length>0&&(k(["block",e],function(e,t,n,r){if(e[0]=="assign"&&e[1]===!0&&e[2][0]=="name"&&R(s,e[2][1])){for(var i=o.length;--i>=0;)if(o[i][0]==e[2][1]){o[i][1]&&n(),o[i][1]=e[3],o.push(o.splice(i,1)[0]);break}var u=t.parent();if(u[0]=="seq"){var a=u[2];a.unshift(0,u.length),u.splice.apply(u,a)}else u[0]=="stat"?u.splice(0,u.length,"block"):n();r()}n()}),e.unshift(["var",o])),r=i,e}function s(e){var n=null;for(var r=e.length;--r>=0;){var i=e[r];if(!i[1])continue;i=["assign",!0,["name",i[0]],i[1]],n==null?n=i:n=["seq",i,n]}return n==null&&t.parent()[0]!="for"?t.parent()[0]=="for-in"?["name",e[0][0]]:U.skip:["stat",n]}function o(e){return[this[0],i(e,this.scope)]}var t=c(),n=t.walk,r;return t.with_walkers({"function":function(e,t,n){for(var r=t.length;--r>=0&&!n.scope.references(t[r]);)t.pop();return n.scope.references(e)||(e=null),[this[0],e,t,i(n,n.scope)]},defun:function(e,t,n){if(!r.references(e))return U.skip;for(var s=t.length;--s>=0&&!n.scope.references(t[s]);)t.pop();return[this[0],e,t,i(n,n.scope)]},"var":s,toplevel:o},function(){return n(v(e))})}function A(e,t){return e=O(e,t),e=M(e,t),e}function O(e,t){function s(e){var n=["unary-prefix","!",e];switch(e[0]){case"unary-prefix":return e[1]=="!"&&E(e[2])?e[2]:n;case"seq":return e=o(e),e[e.length-1]=s(e[e.length-1]),e;case"conditional":return y(n,["conditional",e[1],s(e[2]),s(e[3])]);case"binary":var r=e[1],i=e[2],u=e[3];if(!t.keep_comps)switch(r){case"<=":return["binary",">",i,u];case"<":return["binary",">=",i,u];case">=":return["binary","<",i,u];case">":return["binary","<=",i,u]}switch(r){case"==":return["binary","!=",i,u];case"!=":return["binary","==",i,u];case"===":return["binary","!==",i,u];case"!==":return["binary","===",i,u];case"&&":return y(n,["binary","||",s(i),s(u)]);case"||":return y(n,["binary","&&",s(i),s(u)])}}return n}function a(e,t,n){var r=function(){return e[0]=="unary-prefix"&&e[1]=="!"?n?["conditional",e[2],n,t]:["binary","||",e[2],t]:n?y(["conditional",e,t,n],["conditional",s(e),n,t]):["binary","&&",e,t]};return T(e,function(e,r){return N(r?n:t),r?t:n},r)}function f(e){return e!=null&&e[0]=="block"&&e[1]&&(e[1].length==1?e=e[1][0]:e[1].length==0&&(e=["block"])),e}function l(e,t,n){return[this[0],e,t,h(n,"lambda")]}function h(e,n){return e=U(e,r),e=e.reduce(function(e,t){return t[0]=="block"?t[1]&&e.push.apply(e,t[1]):e.push(t),e},[]),e=function(t,n){return e.forEach(function(e){n&&(e[0]=="var"&&n[0]=="var"||e[0]=="const"&&n[0]=="const")?n[1]=n[1].concat(e[1]):(t.push(e),n=e)}),t}([]),t.dead_code&&(e=function(n,r){return e.forEach(function(e){r?e[0]=="function"||e[0]=="defun"?n.push(e):e[0]=="var"||e[0]=="const"?(t.no_warnings||g("Variables declared in unreachable code"),e[1]=U(e[1],function(e){return e[1]&&!t.no_warnings&&N(["assign",!0,["name",e[0]],e[1]]),[e[0]]}),n.push(e)):t.no_warnings||N(e):(n.push(e),u(e[0],["return","throw","break","continue"])&&(r=!0))}),n}([])),t.make_seqs&&(e=function(t,n){return e.forEach(function(e){n&&n[0]=="stat"&&e[0]=="stat"?n[1]=["seq",n[1],e[1]]:(t.push(e),n=e)}),t.length>=2&&t[t.length-2][0]=="stat"&&(t[t.length-1][0]=="return"||t[t.length-1][0]=="throw")&&t[t.length-1][1]&&t.splice(t.length-2,2,[t[t.length-1][0],["seq",t[t.length-2][1],t[t.length-1][1]]]),t}([])),e}function p(e,t,n){return T(e,function(e,i){return i?(t=r(t),N(n),t||["block"]):(n=r(n),N(t),n||["block"])},function(){return v(e,t,n)})}function d(e,t,n){var i=[["if",s(e),n]];return t[0]=="block"?t[1]&&(i=i.concat(t[1])):i.push(t),r(["block",i])}function v(e,t,n){e=r(e),t=r(t),n=r(n);if(S(n)&&S(t))return["stat",e];S(t)?(e=s(e),t=n,n=null):S(n)?n=null:function(){var r=B(e),i=s(e),o=B(i);if(o.length<r.length){var u=t;t=n,n=u,e=i}}();var i=["if",e,t,n];return t[0]=="if"&&S(t[3])&&S(n)?i=y(i,r(["if",["binary","&&",e,t[1]],t[2]])):t[0]=="stat"?n?n[0]=="stat"?i=y(i,["stat",a(e,t[1],n[1])]):w(n)&&(i=d(e,t,n)):i=y(i,["stat",a(e,t[1])]):n&&t[0]==n[0]&&(t[0]=="return"||t[0]=="throw")&&t[1]&&n[1]?i=y(i,[t[0],a(e,t[1],n[1])]):n&&w(t)?(i=[["if",e,t]],n[0]=="block"?n[1]&&(i=i.concat(n[1])):i.push(n),i=r(["block",i])):t&&w(n)&&(i=d(e,t,n)),i}function m(e,t){return T(e,function(e,n){return n?["for",null,null,null,r(t)]:(N(t),["block"])})}t=I(t,{make_seqs:!0,dead_code:!0,no_warnings:!1,keep_comps:!0,unsafe:!1});var n=c(),r=n.walk,i;return n.with_walkers({sub:function(e,t){if(t[0]=="string"){var n=t[1];if(q(n))return["dot",r(e),n];if(/^[1-9][0-9]*$/.test(n)||n==="0")return["sub",r(e),["num",parseInt(n,10)]]}},"if":p,toplevel:function(e){return["toplevel",h(e)]},"switch":function(e,t){var n=t.length-1;return["switch",r(e),U(t,function(e,t){var i=h(e[1]);if(t==n&&i.length>0){var s=i[i.length-1];s[0]=="break"&&!s[1]&&i.pop()}return[e[0]?r(e[0]):null,i]})]},"function":l,defun:l,block:function(e){if(e)return f(["block",h(e)])},binary:function(e,t,n){return T(["binary",e,r(t),r(n)],function(t){return y(r(t),this)},function(){return function(){if(e!="=="&&e!="!=")return;var i=r(t),s=r(n);return i&&i[0]=="unary-prefix"&&i[1]=="!"&&i[2][0]=="num"?t=["num",+!i[2][1]]:s&&s[0]=="unary-prefix"&&s[1]=="!"&&s[2][0]=="num"&&(n=["num",+!s[2][1]]),["binary",e,t,n]}()||this})},conditional:function(e,t,n){return a(r(e),r(t),r(n))},"try":function(e,t,n){return["try",h(e),t!=null?[t[0],h(t[1])]:null,n!=null?h(n):null]},"unary-prefix":function(e,t){t=r(t);var n=["unary-prefix",e,t];return e=="!"&&(n=y(n,s(t))),T(n,function(e,t){return r(e)},function(){return n})},name:function(e){switch(e){case"true":return["unary-prefix","!",["num",0]];case"false":return["unary-prefix","!",["num",1]]}},"while":m,assign:function(e,t,n){t=r(t),n=r(n);var i=["+","-","/","*","%",">>","<<",">>>","|","^","&"];return e===!0&&t[0]==="name"&&n[0]==="binary"&&~i.indexOf(n[1])&&n[2][0]==="name"&&n[2][1]===t[1]?[this[0],n[1],t,n[3]]:[this[0],e,t,n]},call:function(e,n){return e=r(e),t.unsafe&&e[0]=="dot"&&e[1][0]=="string"&&e[2]=="toString"?e[1]:[this[0],e,U(n,r)]},num:function(e){return isFinite(e)?[this[0],e]:["binary","/",e===1/0?["num",1]:e===-1/0?["unary-prefix","-",["num",1]]:["num",0],["num",0]]}},function(){return r(C(r(C(e))))})}function M(e,t){function o(e,t){var n=i,r;return i=e,r=t(),i=n,r}function u(e,t,n){return[this[0],e,t,o(n.scope,s(U,n,r))]}var n=c(),r=n.walk,i;return n.with_walkers({directive:function(e){if(i.active_directive(e))return["block"];i.directives.push(e)},toplevel:function(e){return[this[0],o(this.scope,s(U,e,r))]},"function":u,defun:u},function(){return r(v(e))})}function D(e,t){var n=0,r=0;return e=e.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g,function(e){switch(e){case"\\":return"\\\\";case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029";case'"':return++n,'"';case"'":return++r,"'";case"\0":return"\\0"}return e}),t&&(e=P(e)),n>r?"'"+e.replace(/\x27/g,"\\'")+"'":'"'+e.replace(/\x22/g,'\\"')+'"'}function P(e){return e.replace(/[\u0080-\uffff]/g,function(e){var t=e.charCodeAt(0).toString(16);while(t.length<4)t="0"+t;return"\\u"+t})}function B(e,t){function p(e){var n=D(e,t.ascii_only);return t.inline_script&&(n=n.replace(/<\x2fscript([>\/\t\n\f\r ])/gi,"<\\/script$1")),n}function d(e){return e=e.toString(),t.ascii_only&&(e=P(e)),e}function v(e){return e==null&&(e=""),n&&(e=F(" ",t.indent_start+r*t.indent_level)+e),e}function m(e,t){t==null&&(t=1),r+=t;try{return e.apply(null,o(arguments,1))}finally{r-=t}}function g(e){return e=e.toString(),e.charAt(e.length-1)}function y(e){return e.toString().charAt(0)}function b(e){if(n)return e.join(" ");var t=[];for(var r=0;r<e.length;++r){var i=e[r+1];t.push(e[r]),i&&(a(g(e[r]))&&(a(y(i))||y(i)=="\\")||/[\+\-]$/.test(e[r].toString())&&/^[\+\-]/.test(i.toString())||g(e[r])=="/"&&y(i)=="/")&&t.push(" ")}return t.join("")}function w(e){return e.join(","+h)}function E(e){var t=k(e);for(var n=1;n<arguments.length;++n){var r=arguments[n];if(r instanceof Function&&r(e)||e[0]==r)return"("+t+")"}return t}function x(e){if(e.length==1)return e[0];if(e.length==2){var t=e[1];return e=e[0],e.length<=t.length?e:t}return x([e[0],x(e.slice(1))])}function T(e){if(e[0]=="function"||e[0]=="object"){var t=o(C.stack()),n=t.pop(),r=t.pop();while(r){if(r[0]=="stat")return!0;if((r[0]!="seq"&&r[0]!="call"&&r[0]!="dot"&&r[0]!="sub"&&r[0]!="conditional"||r[1]!==n)&&(r[0]!="binary"&&r[0]!="assign"&&r[0]!="unary-postfix"||r[2]!==n))return!1;n=r,r=t.pop()}}return!R(_,e[0])}function N(e){var t=e.toString(10),n=[t.replace(/^0\./,".").replace("e+","e")],r;return Math.floor(e)===e?(e>=0?n.push("0x"+e.toString(16).toLowerCase(),"0"+e.toString(8)):n.push("-0x"+(-e).toString(16).toLowerCase(),"-0"+(-e).toString(8)),(r=/^(.*?)(0+)$/.exec(e))&&n.push(r[1]+"e"+r[2].length)):(r=/^0?\.(0+)(.*)$/.exec(e))&&n.push(r[2]+"e-"+(r[1].length+r[2].length),t.substr(t.indexOf("."))),x(n)}function L(e){if(e==null)return";";if(e[0]=="do")return j([e]);var t=e;for(;;){var n=t[0];if(n=="if"){if(!t[3])return k(["block",[e]]);t=t[3]}else if(n=="while"||n=="do")t=t[2];else{if(n!="for"&&n!="for-in")break;t=t[4]}}return k(e)}function A(e,t,n,r,i){var s=r||"function";return e&&(s+=" "+d(e)),s+="("+w(U(t,d))+")",s=b([s,j(n)]),!i&&T(this)?"("+s+")":s}function O(e){switch(e[0]){case"with":case"while":return S(e[2])||O(e[2]);case"for":case"for-in":return S(e[4])||O(e[4]);case"if":if(S(e[2])&&!e[3])return!0;if(e[3])return S(e[3])?!0:O(e[3]);return O(e[2]);case"directive":return!0}}function M(e,t){for(var r=[],i=e.length-1,s=0;s<=i;++s){var o=e[s],u=k(o);u!=";"&&(!n&&s==i&&!O(o)&&(u=u.replace(/;+\s*$/,"")),r.push(u))}return t?r:U(r,v)}function B(e){var t=e.length;return t==0?"{}":"{"+s+U(e,function(e,r){var i=e[1].length>0,o=m(function(){return v(e[0]?b(["case",k(e[0])+":"]):"default:")},.5)+(i?s+m(function(){return M(e[1]).join(s)}):"");return!n&&i&&r<t-1&&(o+=";"),o}).join(s)+s+v("}")}function j(e){return e?e.length==0?"{}":"{"+s+m(function(){return M(e).join(s)})+s+v("}"):";"}function z(e){var t=e[0],n=e[1];return n!=null&&(t=b([d(t),"=",E(n,"seq")])),t}t=I(t,{indent_start:0,indent_level:4,quote_keys:!1,space_colon:!1,beautify:!1,ascii_only:!1,inline_script:!1});var n=!!t.beautify,r=0,s=n?"\n":"",h=n?" ":"",C=c(),k=C.walk;return C.with_walkers({string:p,num:N,name:d,"debugger":function(){return"debugger;"},toplevel:function(e){return M(e).join(s+s)},splice:function(e){var t=C.parent();return R(H,t)?j.apply(this,arguments):U(M(e,!0),function(e,t){return t>0?v(e):e}).join(s)},block:j,"var":function(e){return"var "+w(U(e,z))+";"},"const":function(e){return"const "+w(U(e,z))+";"},"try":function(e,t,n){var r=["try",j(e)];return t&&r.push("catch","("+t[0]+")",j(t[1])),n&&r.push("finally",j(n)),b(r)},"throw":function(e){return b(["throw",k(e)])+";"},"new":function(e,t){return t=t.length>0?"("+w(U(t,function(e){return E(e,"seq")}))+")":"",b(["new",E(e,"seq","binary","conditional","assign",function(e){var t=c(),n={};try{t.with_walkers({call:function(){throw n},"function":function(){return this}},function(){t.walk(e)})}catch(r){if(r===n)return!0;throw r}})+t])},"switch":function(e,t){return b(["switch","("+k(e)+")",B(t)])},"break":function(e){var t="break";return e!=null&&(t+=" "+d(e)),t+";"},"continue":function(e){var t="continue";return e!=null&&(t+=" "+d(e)),t+";"},conditional:function(e,t,n){return b([E(e,"assign","seq","conditional"),"?",E(t,"seq"),":",E(n,"seq")])},assign:function(e,t,n){return e&&e!==!0?e+="=":e="=",b([k(t),e,E(n,"seq")])},dot:function(e){var t=k(e),n=1;e[0]=="num"?/[a-f.]/i.test(t)||(t+="."):e[0]!="function"&&T(e)&&(t="("+t+")");while(n<arguments.length)t+="."+d(arguments[n++]);return t},call:function(e,t){var n=k(e),r=e[0]=="function"&&n.charAt(0)=="(";return!r&&T(e)&&(n="("+n+")"),n+"("+w(U(t,function(e){return E(e,"seq")}))+")"},"function":A,defun:A,"if":function(e,t,n){var r=["if","("+k(e)+")",n?L(t):k(t)];return n&&r.push("else",k(n)),b(r)},"for":function(e,t,n,r){var i=["for"];e=(e!=null?k(e):"").replace(/;*\s*$/,";"+h),t=(t!=null?k(t):"").replace(/;*\s*$/,";"+h),n=(n!=null?k(n):"").replace(/;*\s*$/,"");var s=e+t+n;return s=="; ; "&&(s=";;"),i.push("("+s+")",k(r)),b(i)},"for-in":function(e,t,n,r){return b(["for","("+(e?k(e).replace(/;+$/,""):k(t)),"in",k(n)+")",k(r)])},"while":function(e,t){return b(["while","("+k(e)+")",k(t)])},"do":function(e,t){return b(["do",k(t),"while","("+k(e)+")"])+";"},"return":function(e){var t=["return"];return e!=null&&t.push(k(e)),b(t)+";"},binary:function(e,r,i){var s=k(r),o=k(i);if(u(r[0],["assign","conditional","seq"])||r[0]=="binary"&&f[e]>f[r[1]]||r[0]=="function"&&T(this))s="("+s+")";return u(i[0],["assign","conditional","seq"])||i[0]=="binary"&&f[e]>=f[i[1]]&&(i[1]!=e||!u(e,["&&","||","*"]))?o="("+o+")":!n&&t.inline_script&&(e=="<"||e=="<<")&&i[0]=="regexp"&&/^script/i.test(i[1])&&(o=" "+o),b([s,e,o])},"unary-prefix":function(e,t){var n=k(t);return t[0]=="num"||t[0]=="unary-prefix"&&!R(l,e+t[1])||!T(t)||(n="("+n+")"),e+(i.is_alphanumeric_char(e.charAt(0))?" ":"")+n},"unary-postfix":function(e,t){var n=k(t);return t[0]=="num"||t[0]=="unary-postfix"&&!R(l,e+t[1])||!T(t)||(n="("+n+")"),n+e},sub:function(e,t){var n=k(e);return T(e)&&(n="("+n+")"),n+"["+k(t)+"]"},object:function(e){var r=T(this);if(e.length==0)return r?"({})":"{}";var i="{"+s+m(function(){return U(e,function(e){if(e.length==3)return v(A(e[0],e[1][2],e[1][3],e[2],!0));var r=e[0],i=E(e[1],"seq");return t.quote_keys?r=p(r):(typeof r=="number"||!n&&+r+""==r)&&parseFloat(r)>=0?r=N(+r):q(r)||(r=p(r)),v(b(n&&t.space_colon?[r,":",i]:[r+":",i]))}).join(","+s)})+s+v("}");return r?"("+i+")":i},regexp:function(e,n){return t.ascii_only&&(e=P(e)),"/"+e+"/"+n},array:function(e){return e.length==0?"[]":b(["[",w(U(e,function(t,r){return!n&&t[0]=="atom"&&t[1]=="undefined"?r===e.length-1?",":"":E(t,"seq")})),"]"])},stat:function(e){return e!=null?k(e).replace(/;*\s*$/,";"):";"},seq:function(){return w(U(o(arguments),k))},label:function(e,t){return b([d(e),":",k(t)])},"with":function(e,t){return b(["with","("+k(e)+")",k(t)])},atom:function(e){return d(e)},directive:function(e){return D(e)+";"}},function(){return k(e)})}function j(e,t){var n=[0];return i.parse(function(){function u(e){return e.pos-s}function a(e){s=e.pos,n.push(s)}function f(){var e=r.apply(this,arguments);e:{if(o&&o.type=="keyword")break e;if(u(e)>t)switch(e.type){case"keyword":case"atom":case"name":case"punc":a(e);break e}}return o=e,e}var r=i.tokenizer(e),s=0,o;return f.context=function(){return r.context.apply(this,arguments)},f}()),n.map(function(t,r){return e.substring(t,n[r+1]||e.length)}).join("\n")}function F(e,t){if(t<=0)return"";if(t==1)return e;var n=F(e,t>>1);return n+=n,t&1&&(n+=e),n}function I(e,t){var n={};e===!0&&(e={});for(var r in t)R(t,r)&&(n[r]=e&&R(e,r)?e[r]:t[r]);return n}function q(e){return/^[a-z_$][a-z0-9_$]*$/i.test(e)&&e!="this"&&!R(i.KEYWORDS_ATOM,e)&&!R(i.RESERVED_WORDS,e)&&!R(i.KEYWORDS,e)}function R(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var r=require;require=e;var i=require("./parse-js"),s=i.curry,o=i.slice,u=i.member,a=i.is_identifier_char,f=i.PRECEDENCE,l=i.OPERATORS,d=function(){var e=p();return function(t){var n="",r=54;do n+=e.charAt(t%r),t=Math.floor(t/r),r=64;while(t>0);return n}}();h.prototype={has:function(e){for(var t=this;t;t=t.parent)if(R(t.names,e))return t},has_mangled:function(e){for(var t=this;t;t=t.parent)if(R(t.rev_mangled,e))return t},toJSON:function(){return{names:this.names,uses_eval:this.uses_eval,uses_with:this.uses_with}},next_mangled:function(){for(;;){var e=d(++this.cname),t;t=this.has_mangled(e);if(t&&this.refs[t.rev_mangled[e]]===t)continue;t=this.has(e);if(t&&t!==this&&this.refs[e]===t&&!t.has_mangled(e))continue;if(R(this.refs,e)&&this.refs[e]==null)continue;if(!q(e))continue;return e}},set_mangle:function(e,t){return this.rev_mangled[t]=e,this.mangled[e]=t},get_mangled:function(e,t){if(this.uses_eval||this.uses_with)return e;var n=this.has(e);return n?R(n.mangled,e)?n.mangled[e]:t?n.set_mangle(e,n.next_mangled()):e:e},references:function(e){return e&&!this.parent||this.uses_with||this.uses_eval||this.refs[e]},define:function(e,t){if(e!=null){if(t=="var"||!R(this.names,e))this.names[e]=t||"var";return e}},active_directive:function(e){return u(e,this.directives)||this.parent&&this.parent.active_directive(e)}};var g=function(){},T=function(){function t(n){switch(n[0]){case"string":case"num":return n[1];case"name":case"atom":switch(n[1]){case"true":return!0;case"false":return!1;case"null":return null}break;case"unary-prefix":switch(n[1]){case"!":return!t(n[2]);case"typeof":return typeof t(n[2]);case"~":return~t(n[2]);case"-":return-t(n[2]);case"+":return+t(n[2])}break;case"binary":var r=n[2],i=n[3];switch(n[1]){case"&&":return t(r)&&t(i);case"||":return t(r)||t(i);case"|":return t(r)|t(i);case"&":return t(r)&t(i);case"^":return t(r)^t(i);case"+":return t(r)+t(i);case"*":return t(r)*t(i);case"/":return t(r)/t(i);case"%":return t(r)%t(i);case"-":return t(r)-t(i);case"<<":return t(r)<<t(i);case">>":return t(r)>>t(i);case">>>":return t(r)>>>t(i);case"==":return t(r)==t(i);case"===":return t(r)===t(i);case"!=":return t(r)!=t(i);case"!==":return t(r)!==t(i);case"<":return t(r)<t(i);case"<=":return t(r)<=t(i);case">":return t(r)>t(i);case">=":return t(r)>=t(i);case"in":return t(r)in t(i);case"instanceof":return t(r)instanceof t(i)}}throw e}var e={};return function(n,r,i){try{var s=t(n),o;switch(typeof s){case"string":o=["string",s];break;case"number":o=["num",s];break;case"boolean":o=["name",String(s)];break;default:if(s===null){o=["atom","null"];break}throw new Error("Can't handle constant of type: "+typeof s)}return r.call(n,o,s)}catch(u){if(u===e){if(n[0]!="binary"||n[1]!="==="&&n[1]!="!=="||!(x(n[2])&&x(n[3])||E(n[2])&&E(n[3]))){if(i&&n[0]=="binary"&&(n[1]=="||"||n[1]=="&&"))try{var a=t(n[2]);n=n[1]=="&&"&&(a?n[3]:a)||n[1]=="||"&&(a?a:n[3])||n}catch(f){}}else n[1]=n[1].substr(0,2);return i?i.call(n,n):null}throw u}}}(),_=i.array_to_hash(["name","array","object","string","dot","sub","call","regexp","defun"]),H=i.array_to_hash(["if","while","do","for","for-in","with"]),U;(function(){function t(e){this.v=e}function n(e){this.v=e}U=function(r,i,s){function f(){var f=i.call(s,r[a],a);f instanceof t?(f=f.v,f instanceof n?u.push.apply(u,f.v):u.push(f)):f!=e&&(f instanceof n?o.push.apply(o,f.v):o.push(f))}var o=[],u=[],a;if(r instanceof Array)for(a=0;a<r.length;++a)f();else for(a in r)R(r,a)&&f();return u.concat(o)},U.at_top=function(e){return new t(e)},U.splice=function(e){return new n(e)};var e=U.skip={}})(),t.ast_walker=c,t.ast_mangle=m,t.ast_squeeze=A,t.ast_lift_variables=L,t.gen_code=B,t.ast_add_scope=v,t.set_logger=function(e){g=e},t.make_string=D,t.split_lines=j,t.MAP=U,t.ast_squeeze_more=require("./squeeze-more").ast_squeeze_more,require=r})