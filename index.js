//'use strict';
//
//var sinon = require('sinon');
//
//var getOptions = function () {
//  return window.fetch.firstCall.args[1] || {};
//};
//
//module.exports.install = function () {
//  sinon.stub(window, 'fetch');
//};
//
//module.exports.restore = function () {
//  window.fetch.restore();
//};
//
//module.exports.getMethod = function () {
//  return getOptions().method || 'get';
//};
//
//module.exports.getBody = function () {
//  return getOptions().body || '';
//};
//
//module.exports.getUrl = function () {
//  return window.fetch.firstCall.args[0];
//};
//
//module.exports.respondWith = function (data, options) {
//  return window.fetch.returns(Promise.resolve(new Response(data, options)));
//};
//
//module.exports.when = function (url, options) {
//  return window.fetch.getCalls().find(function (call) {
//    var url = call.args[0];
//    var options = call.args[1];
//  });
//};


var fetchCopy;

module.exports.install = function () {
  fetchCopy = window.fetch;
  window.fetch =  function () {};
}

module.exports.restore = function () {
  window.fetch =  fetchCopy;
}

module.exports.when = function (givenUrl) {
  window.fetch = function (expectedUrl) {
    if (givenUrl === expectedUrl) {
      Promise.resolve();
    }
  }
}






//fakeFetch.get('/test', {method: 'get'}).respondWith('{"foo":"bar"}');
//fakeFetch.post('/test', {
//  headers: {
//    'Content-Type': 'application/json'
//  }
//}).respondWith('{"foo":"bar"}');
