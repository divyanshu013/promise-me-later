(function(global,factory){if(typeof define==="function"&&define.amd){define(["module"],factory)}else if(typeof exports!=="undefined"){factory(module)}else{var mod={exports:{}};factory(mod);global.index=mod.exports}})(this,function(module){"use strict";var _arguments=arguments;var PromiseMeLater=function PromiseMeLater(fn,limit,time){var requestQueue=[];var completionQueue=[];var inProgress=0;// gets current request and mutates the requestQueue
var getCurrentRequest=function getCurrentRequest(){return requestQueue.shift()};var initQueue=function initQueue(){var now=Date.now();// remove requests from completionQueue if time limit has reset
while(completionQueue.length&&now-completionQueue[0]>time){completionQueue.shift()}var _loop=function _loop(){var current=getCurrentRequest();inProgress+=1;var req=fn(current.args);Promise.resolve(req).then(function(res){return current.resolve(res)},function(err){return current.reject(err)}).then(function(){completionQueue.push(Date.now());inProgress-=1;if(requestQueue.length){setTimeout(initQueue,time-(Date.now()-now))}})};while(requestQueue.length&&inProgress+completionQueue.length<limit){_loop()}if(requestQueue.length&&completionQueue.length){setTimeout(initQueue,time-(now-completionQueue[0]))}};return function(){return new Promise(function(resolve,reject){requestQueue.push({args:_arguments,resolve:resolve,reject:reject});initQueue()})}};module.exports=PromiseMeLater});