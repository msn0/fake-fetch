import 'promise-polyfill';
import deepEqual from 'deep-equal';

export default class FakeFetch {

  install() {
    this.fetchCopy = window.fetch;
  }

  restore() {
    window.fetch = this.fetchCopy;
  }

  when(expectedUrl, expectedOptions) {
    return new Promise((resolveWhen, rejectWhen) => {
      window.fetch = function (givenUrl, givenOptions) {
        return new Promise((resolveFetch, rejectFetch) => {
          if (expectedUrl !== givenUrl) {
            return;// rejectWhen(rejectFetch);
          }

          if (!deepEqual(expectedOptions, givenOptions)) {
            return;// rejectWhen(rejectFetch);
          }

          let resolveFetchCopy = resolveFetch;
          resolveFetch = function (responseBody) {
            resolveFetchCopy(new Response(responseBody));
          };
          return resolveWhen(resolveFetch);

        });
      }
    });

  }
}
