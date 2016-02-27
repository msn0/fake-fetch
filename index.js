import deepEqual from 'deep-equal';

export default class FakeFetch {

  install() {
    this.fetchCopy = window.fetch;
  }

  restore() {
    window.fetch = this.fetchCopy;
  }

  when(expectedUrl, expectedOptions) {
    return new Promise(resolve => {
      window.fetch = function (givenUrl, givenOptions) {
        if (expectedUrl !== givenUrl) {
          return;
        }

        if (!deepEqual(expectedOptions, givenOptions)) {
          return;
        }

        resolve();
      }
    });

  }
}
