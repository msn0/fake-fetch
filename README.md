# fake-fetch [![Build Status](https://travis-ci.org/msn0/fake-fetch.svg?branch=master)](http://travis-ci.org/msn0/fake-fetch)

> fake window.fetch for tests.

## Installation

```sh
$ npm install fake-fetch --save-dev
```

## Usage

```js
var fakeFetch = require('fake-fetch');

beforeEach(fakeFetch.install);
afterEach(fakeFetch.restore);

it("should fetch what you need", done => {
  fakeFetch.respondWith({"foo": "bar"});

  fetch('/my-service', {headers: new Headers({accept: 'application/json'})}).then(data => {
    expect(fakeFetch.getUrl()).toEqual('/my-service');
    expect(fakeFetch.getMethod()).toEqual('get');
    expect(data._bodyText).toEqual('{"foo":"bar"}');
    expect(fakeFetch.getRequestHeaders()).toEqual(new Headers({accept: 'application/json'}));
    done();
  });
});
```

### API

#### install

Mock `window.fetch` before doing anything.

#### restore

Restore `window.fetch`.

#### getUrl

Returns request URL.

#### getMethod

Returns request method. Default is 'get'.

#### getBody

Returns message body. Default is '' (empty string).

#### getRequestHeaders

Returns request headers. Default is {} (empty object).

#### getOptions

Returns request options. Default is {} (empty object)

#### called (Boolean getter)

Check whether this instance of fakeFetch was ever called

#### respondWith(data, options)

##### data

Type: `object`

The object to be sent as request-body. 

##### options

Type: `object`

Custom Response options, see [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

## Remarks

You may find necessary to use browserify before using fake-fetch within your specs, e.g.
```js
// karma.conf.js
preprocessors: {
  './node_modules/fake-fetch/index.js': [ 'browserify' ]
}
```
Real-life usage example can be found here [https://github.com/msn0/file-downloader/blob/master/test.js](https://github.com/msn0/file-downloader/blob/master/test.js)

## License
MIT &copy; [Michał Jezierski](https://pl.linkedin.com/in/jezierskimichal)
