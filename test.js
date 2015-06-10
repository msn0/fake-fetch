var assert = require('assert');
var sinon = require('sinon');

var fakeFetch = require('./');

describe('Fake window.fetch', function () {

  beforeEach(function () {
    global.window = {
      fetch: function () {
      }
    };
  });

  afterEach(function () {
    global.window = undefined;
  });


  it('install should spy on window.fetch', function () {
    sinon.spy(sinon, 'stub');

    fakeFetch.install();

    assert(sinon.stub.calledWith(window, 'fetch'));
  });

  it('should return request url', function () {
    fakeFetch.install();
    window.fetch.firstCall = {
      args: ['/foo']
    };

    assert.equal('/foo', fakeFetch.getUrl());
  });

  it('should return get method by default', function () {
    fakeFetch.install();
    window.fetch.firstCall = {
      args: ['/foo']
    };

    assert.equal('get', fakeFetch.getMethod());
  });

  it('should return given request method', function () {
    fakeFetch.install();
    window.fetch.firstCall = {
      args: ['/foo', {method: 'DELETE'}]
    };

    assert.equal('DELETE', fakeFetch.getMethod());
  });

  it('should return empty request body by default', function () {
    fakeFetch.install();
    window.fetch.firstCall = {
      args: ['/foo']
    };

    assert.equal('', fakeFetch.getBody());
  });

  it('should return given request body', function () {
    fakeFetch.install();
    window.fetch.firstCall = {
      args: ['/foo', {body: 'foo bar'}]
    };

    assert.equal('foo bar', fakeFetch.getBody());
  });
});
