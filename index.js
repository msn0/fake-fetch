'use strict';

var sinon = require('sinon');

function withRequest(arg) {
    return window.Request && arg instanceof window.Request;
}

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
    var firstArg = window.fetch.firstCall.args[0];
    if (withRequest(firstArg)) {
        return firstArg.method;
    }
    return this.getOptions().method || 'get';
};

module.exports.getBody = function () {
    var firstArg = window.fetch.firstCall.args[0];
    if (withRequest(firstArg)) {
        return firstArg.body;
    }
    return this.getOptions().body || '';
};

module.exports.getUrl = function () {
    var firstArg = window.fetch.firstCall.args[0];
    if (withRequest(firstArg)) {
        return firstArg.url;
    }
    return firstArg;
};

module.exports.getRequestHeaders = function () {
    var firstArg = window.fetch.firstCall.args[0];
    if (withRequest(firstArg)) {
        return firstArg.headers;
    }
    return this.getOptions().headers || {};
};

module.exports.respondWith = function (data, options) {
    return window.fetch.returns(Promise.resolve(new Response(data, options)));
};

Object.defineProperty(
    module.exports,
    'called',
    {
        get: () => !!window.fetch.firstCall
    }
);
