var assert = require('assert');
var _sinon = require('sinon');
var _fakeFetch = require('./');

describe('Fake window.fetch', function () {

  var fakeFetch, sinon;

  beforeEach(function () {
    fakeFetch = _fakeFetch;
    sinon = _sinon;
    global.window = {
      fetch: function () {
      }
    };
  });

  afterEach(function () {
    global.window = undefined;
    window.fetch.restore();
  });


  it('install should stub window.fetch', function () {
    _sinon.spy(sinon, 'stub');

    fakeFetch.install();

    assert(sinon.stub.calledWith(window, 'fetch'));
  });

  it('should return request url', function () {
    fakeFetch.install();
    window.fetch.firstCall = {args: ['/foo']};

    var expectedUrl = fakeFetch.getUrl();

    assert.equal('/foo', expectedUrl);
  });

  it('should return get method by default', function () {
    fakeFetch.install();
    window.fetch.firstCall = {args: ['/foo']};

    var expectedMethod = fakeFetch.getMethod();

    assert.equal('get', expectedMethod);
  });

  it('should return given request method', function () {
    fakeFetch.install();
    window.fetch.firstCall = {args: ['/foo', {method: 'DELETE'}]};

    var expectedMethod = fakeFetch.getMethod();

    assert.equal('DELETE', expectedMethod);
  });

  it('should return empty request body by default', function () {
    fakeFetch.install();
    window.fetch.firstCall = {args: ['/foo']};

    var expectedBody = fakeFetch.getBody();

    assert.equal('', expectedBody);
  });

  it('should return given request body', function () {
    fakeFetch.install();
    window.fetch.firstCall = {args: ['/foo', {body: 'foo bar'}]};

    var expectedBody = fakeFetch.getBody();

    assert.equal('foo bar', expectedBody);
  });
});
