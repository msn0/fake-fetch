'use strict';

var sinon = require('sinon');

module.exports.getOptions = function () {
  return window.fetch.firstCall.args[1] || {};
};

module.exports.install = function () {
  sinon.stub(window, 'fetch');
};

module.exports.restore = function () {
  window.fetch.restore();
};

module.exports.getMethod = function () {
  return this.getOptions().method || 'get';
};

module.exports.getBody = function () {
  return this.getOptions().body || '';
};

module.exports.getUrl = function () {
  return window.fetch.firstCall.args[0];
};

module.exports.getRequestHeaders = function () {
  return this.getOptions().headers || {};
};

module.exports.respondWith = function (data, options) {
  return window.fetch.returns(Promise.resolve(new Response(data, options)));
};
