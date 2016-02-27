import {expect} from 'chai';
import FakeFetch from './index';

global.window = {};

describe('Fake Fetch', () => {

  let fakeFetch;

  it("should store and restore original window.fetch", () => {
    window.fetch = 'original fetch';
    fakeFetch.install();

    window.fetch = "fetch has changed";
    fakeFetch.restore();

    expect(window.fetch).to.equal('original fetch');
  });

  describe('when', () => {

    it("should be thenable", () => {
      expect(fakeFetch.when('foo')).to.have.property('then');
    });

    it("should resolve when url matches", done => {
      fakeFetch.when('foo').then(() => done());

      window.fetch('foo');
    });

    it("should resolve when method matches", done => {
      fakeFetch.when('foo', {method: 'POST'}).then(() => done());

      window.fetch('foo', {method: 'POST'});
    });

    it("should resolve when complex options matches", done => {
      fakeFetch.when('foo', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      }).then(() => done());

      window.fetch('foo', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      });
    });

    it("should resolve when any request matches", done => {
      fakeFetch.when('foo', {method: 'POST'}).then(() => done());

      window.fetch('baz');
      window.fetch('bar', {method: 'POST'});
      window.fetch('foo', {method: 'POST'});
    });

  });

  beforeEach(() => {
    fakeFetch = new FakeFetch();
  });

});
