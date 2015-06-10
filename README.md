# fake-fetch [![Build Status](https://travis-ci.org/msn0/fake-fetch.svg?branch=master)](http://travis-ci.org/msn0/fake-fetch)

> fake window.fetch for tests.

## Installation

```sh
$ npm install fake-fetch --save-dev
```

## Usage

```js
var fakeFetch = require('fake-fetch');

beforeEach(function () {
  fakeFetch.install();
});

afterEach(function () {
  fakeFetch.restore();
});

it("should fetch what you need", function (done) {
  fakeFetch.respondWith({"foo": "bar"});

  fetch('/my-service').then(function (data) {
    expect(fakeFetch.getUrl()).toEqual('/my-service');
    expect(fakeFetch.getMethod()).toEqual('get');
    expect(data._bodyText).toEqual('{"foo":"bar"}');
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

#### getMethod

#### getBody

#### respondWith(data, options)

##### data

Type: `object`

The object to be sent as request-body. 

##### options

Type: `object`

The object to be sent as request-body.

## License
MIT &copy; [Michał Jezierski](https://pl.linkedin.com/in/jezierskimichal)
