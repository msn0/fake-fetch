'use strict';

var sinon = require('sinon');

var getOptions = function () {
  return window.fetch.firstCall.args[1] || {};
};

module.exports.install = function () {
  sinon.stub(window, 'fetch');
};

module.exports.restore = function () {
  window.fetch.restore();
};

module.exports.getMethod = function () {
  return getOptions().method || 'get';
};

module.exports.getBody = function () {
  return getOptions().body || '';
};

module.exports.getUrl = function () {
  return window.fetch.firstCall.args[0];
};

module.exports.respondWith = function (data, options) {
  return window.fetch.returns(Promise.resolve(new Response(JSON.stringify(data), options)));
};
