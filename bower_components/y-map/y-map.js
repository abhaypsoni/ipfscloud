/**
 * yjs - A framework for real-time p2p shared editing on any data
 * @version v12.3.2
 * @link http://y-js.org
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.yMap=e()}}(function(){return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return o(n||e)},c,c.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=function(t){function n(t,i,s,a){r(this,n);var u=o(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));return u._model=i.id,u._parent=null,u._deepEventHandler=new e.utils.EventListenerHandler,u.os=t,u.map=e.utils.copyObject(i.map),u.contents=s,u.opContents=a,u.eventHandler=new e.utils.EventHandler(function(t){var n,r="Delete"===t.struct?t.key:t.parentSub;if(n=null!=u.opContents[r]?u.os.getType(u.opContents[r]):u.contents[r],"Insert"===t.struct){if(null===t.left&&!e.utils.compareIds(t.id,u.map[r])){var o;null!=t.opContent?(o=u.os.getType(t.opContent),o._parent=u._model,delete u.contents[r],t.deleted?delete u.opContents[r]:u.opContents[r]=t.opContent):(o=t.content[0],delete u.opContents[r],t.deleted?delete u.contents[r]:u.contents[r]=t.content[0]),u.map[r]=t.id,void 0===n?e.utils.bubbleEvent(u,{name:r,object:u,type:"add",value:o}):e.utils.bubbleEvent(u,{name:r,object:u,oldValue:n,type:"update",value:o})}}else{if("Delete"!==t.struct)throw new Error("Unexpected Operation!");e.utils.compareIds(u.map[r],t.target)&&(delete u.opContents[r],delete u.contents[r],e.utils.bubbleEvent(u,{name:r,object:u,oldValue:n,type:"delete"}))}}),u}return i(n,t),a(n,[{key:"_getPathToChild",value:function(t){var n=this;return Object.keys(this.opContents).find(function(r){return e.utils.compareIds(n.opContents[r],t)})}},{key:"_destroy",value:function(){this.eventHandler.destroy(),this.eventHandler=null,this.contents=null,this.opContents=null,this._model=null,this._parent=null,this.os=null,this.map=null}},{key:"get",value:function(e){if(null==e||"string"!=typeof e)throw new Error("You must specify a key (as string)!");return null==this.opContents[e]?this.contents[e]:this.os.getType(this.opContents[e])}},{key:"keys",value:function(){return Object.keys(this.contents).concat(Object.keys(this.opContents))}},{key:"keysPrimitives",value:function(){return Object.keys(this.contents)}},{key:"keysTypes",value:function(){return Object.keys(this.opContents)}},{key:"getPrimitive",value:function(t){if(null==t)return e.utils.copyObject(this.contents);if("string"!=typeof t)throw new Error("Key is expected to be a string!");return this.contents[t]}},{key:"getType",value:function(e){if(null==e||"string"!=typeof e)throw new Error("You must specify a key (as string)!");return null!=this.opContents[e]?this.os.getType(this.opContents[e]):null}},{key:"delete",value:function(t){var n=this.map[t];if(null!=n){var r={target:n,struct:"Delete"},o=this.eventHandler,i=e.utils.copyObject(r);i.key=t,this.os.requestTransaction(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.delegateYield(o.awaitOps(this,this.applyCreatedOperations,[[r]]),"t0",1);case 1:case"end":return e.stop()}},e,this)})),o.awaitAndPrematurelyCall([i])}}},{key:"set",value:function(t,n){var r=this.map[t]||null,o={id:this.os.getNextOpId(1),left:null,right:r,origin:null,parent:this._model,parentSub:t,struct:"Insert"},i=this.eventHandler,s=e.utils.isTypeDefinition(n);if(!1!==s){var a=this.os.createType(s);return o.opContent=a._model,this.os.requestTransaction(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.delegateYield(i.awaitOps(this,this.applyCreatedOperations,[[o]]),"t0",1);case 1:case"end":return e.stop()}},e,this)})),i.awaitAndPrematurelyCall([o]),a}return o.content=[n],this.os.requestTransaction(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.delegateYield(i.awaitOps(this,this.applyCreatedOperations,[[o]]),"t0",1);case 1:case"end":return e.stop()}},e,this)})),i.awaitAndPrematurelyCall([o]),n}},{key:"observe",value:function(e){this.eventHandler.addEventListener(e)}},{key:"observeDeep",value:function(e){this._deepEventHandler.addEventListener(e)}},{key:"unobserve",value:function(e){this.eventHandler.removeEventListener(e)}},{key:"unobserveDeep",value:function(e){this._deepEventHandler.removeEventListener(e)}},{key:"observePath",value:function(t,r){function o(e){e.name===i&&r(s.get(i))}var i,s=this;if(t.length<1)return r(this),function(){};if(1===t.length)return i=t[0],r(s.get(i)),this.observe(o),function(){s.unobserve(r)};var a,u=function(){var o=s.get(t[0]);o instanceof n||(o=s.set(t[0],e.Map)),a=o.observePath(t.slice(1),r)},l=function(e){e.name===t[0]&&(null!=a&&a(),"add"!==e.type&&"update"!==e.type||u())};return s.observe(l),u(),function(){null!=a&&a(),s.unobserve(l)}}},{key:"_changed",value:regeneratorRuntime.mark(function e(t,n){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("Delete"!==n.struct){e.next=7;break}if(null!=n.key){e.next=5;break}return e.delegateYield(t.getOperation(n.target),"t0",3);case 3:r=e.t0,n.key=r.parentSub;case 5:e.next=9;break;case 7:if(null==n.opContent){e.next=9;break}return e.delegateYield(t.store.initType.call(t,n.opContent),"t1",9);case 9:this.eventHandler.receivedOp(n);case 10:case"end":return e.stop()}},e,this)})}]),n}(e.utils.CustomType);e.extend("Map",new e.utils.CustomTypeDefinition({name:"Map",class:t,struct:"Map",initType:regeneratorRuntime.mark(function e(n,r){var o,i,s,a,u,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o={},i={},s=r.map,e.t0=regeneratorRuntime.keys(s);case 4:if((e.t1=e.t0()).done){e.next=20;break}return a=e.t1.value,e.delegateYield(this.getOperation(s[a]),"t2",7);case 7:if(u=e.t2,!u.deleted){e.next=10;break}return e.abrupt("continue",4);case 10:if(null==u.opContent){e.next=17;break}return i[a]=u.opContent,e.delegateYield(this.store.initType.call(this,u.opContent),"t3",13);case 13:l=e.t3,l._parent=r.id,e.next=18;break;case 17:o[a]=u.content[0];case 18:e.next=4;break;case 20:return e.abrupt("return",new t(n,r,o,i));case 21:case"end":return e.stop()}},e,this)}),createType:function(e,n){return new t(e,n,{},{})}}))}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.exports=s,"undefined"!=typeof Y&&s(Y)},{}]},{},[1])(1)});
//# sourceMappingURL=y-map.js.map
