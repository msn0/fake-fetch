let fetchCopy;

export function install() {
  fetchCopy = window.fetch;
  window.fetch = function () {
  };
}

export function restore() {
  window.fetch = fetchCopy;
}

export function when(givenUrl) {
  window.fetch = function (expectedUrl) {
    if (givenUrl === expectedUrl) {
      Promise.resolve();
    }
  }
}

class FakeFetch {
  constructor() {

  }
}


//fakeFetch.get('/test', {method: 'get'}).respondWith('{"foo":"bar"}');
//fakeFetch.post('/test', {
//  headers: {
//    'Content-Type': 'application/json'
//  }
//}).respondWith('{"foo":"bar"}');
