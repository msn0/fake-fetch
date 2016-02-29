/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(1);

	var _deepEqual = __webpack_require__(4);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FakeFetch = function () {
	  function FakeFetch() {
	    _classCallCheck(this, FakeFetch);
	  }

	  _createClass(FakeFetch, [{
	    key: 'install',
	    value: function install() {
	      this.fetchCopy = window.fetch;
	    }
	  }, {
	    key: 'restore',
	    value: function restore() {
	      window.fetch = this.fetchCopy;
	    }
	  }, {
	    key: 'when',
	    value: function when(expectedUrl, expectedOptions) {
	      return new Promise(function (resolveWhen, rejectWhen) {
	        window.fetch = function (givenUrl, givenOptions) {
	          return new Promise(function (resolveFetch, rejectFetch) {
	            if (expectedUrl !== givenUrl) {
	              return; // rejectWhen(rejectFetch);
	            }

	            if (!(0, _deepEqual2.default)(expectedOptions, givenOptions)) {
	              return; // rejectWhen(rejectFetch);
	            }

	            var resolveFetchCopy = resolveFetch;
	            resolveFetch = function resolveFetch(responseBody) {
	              resolveFetchCopy(new Response(responseBody));
	            };
	            return resolveWhen(resolveFetch);
	          });
	        };
	      });
	    }
	  }]);

	  return FakeFetch;
	}();

	exports.default = FakeFetch;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (root) {

		// Store setTimeout reference so promise-polyfill will be unaffected by
		// other code modifying setTimeout (like sinon.useFakeTimers())
		var setTimeoutFunc = setTimeout;

		// Use polyfill for setImmediate for performance gains
		var asap = typeof setImmediate === 'function' && setImmediate || function (fn) {
			setTimeoutFunc(fn, 1);
		};

		// Polyfill for Function.prototype.bind
		function bind(fn, thisArg) {
			return function () {
				fn.apply(thisArg, arguments);
			};
		}

		var isArray = Array.isArray || function (value) {
			return Object.prototype.toString.call(value) === "[object Array]";
		};

		function Promise(fn) {
			if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
			if (typeof fn !== 'function') throw new TypeError('not a function');
			this._state = null;
			this._value = null;
			this._deferreds = [];

			doResolve(fn, bind(resolve, this), bind(reject, this));
		}

		function handle(deferred) {
			var me = this;
			if (this._state === null) {
				this._deferreds.push(deferred);
				return;
			}
			asap(function () {
				var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
				if (cb === null) {
					(me._state ? deferred.resolve : deferred.reject)(me._value);
					return;
				}
				var ret;
				try {
					ret = cb(me._value);
				} catch (e) {
					deferred.reject(e);
					return;
				}
				deferred.resolve(ret);
			});
		}

		function resolve(newValue) {
			try {
				//Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
				if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
				if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
					var then = newValue.then;
					if (typeof then === 'function') {
						doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
						return;
					}
				}
				this._state = true;
				this._value = newValue;
				finale.call(this);
			} catch (e) {
				reject.call(this, e);
			}
		}

		function reject(newValue) {
			this._state = false;
			this._value = newValue;
			finale.call(this);
		}

		function finale() {
			for (var i = 0, len = this._deferreds.length; i < len; i++) {
				handle.call(this, this._deferreds[i]);
			}
			this._deferreds = null;
		}

		function Handler(onFulfilled, onRejected, resolve, reject) {
			this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
			this.onRejected = typeof onRejected === 'function' ? onRejected : null;
			this.resolve = resolve;
			this.reject = reject;
		}

		/**
	  * Take a potentially misbehaving resolver function and make sure
	  * onFulfilled and onRejected are only called once.
	  *
	  * Makes no guarantees about asynchrony.
	  */
		function doResolve(fn, onFulfilled, onRejected) {
			var done = false;
			try {
				fn(function (value) {
					if (done) return;
					done = true;
					onFulfilled(value);
				}, function (reason) {
					if (done) return;
					done = true;
					onRejected(reason);
				});
			} catch (ex) {
				if (done) return;
				done = true;
				onRejected(ex);
			}
		}

		Promise.prototype['catch'] = function (onRejected) {
			return this.then(null, onRejected);
		};

		Promise.prototype.then = function (onFulfilled, onRejected) {
			var me = this;
			return new Promise(function (resolve, reject) {
				handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
			});
		};

		Promise.all = function () {
			var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

			return new Promise(function (resolve, reject) {
				if (args.length === 0) return resolve([]);
				var remaining = args.length;
				function res(i, val) {
					try {
						if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
							var then = val.then;
							if (typeof then === 'function') {
								then.call(val, function (val) {
									res(i, val);
								}, reject);
								return;
							}
						}
						args[i] = val;
						if (--remaining === 0) {
							resolve(args);
						}
					} catch (ex) {
						reject(ex);
					}
				}
				for (var i = 0; i < args.length; i++) {
					res(i, args[i]);
				}
			});
		};

		Promise.resolve = function (value) {
			if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
				return value;
			}

			return new Promise(function (resolve) {
				resolve(value);
			});
		};

		Promise.reject = function (value) {
			return new Promise(function (resolve, reject) {
				reject(value);
			});
		};

		Promise.race = function (values) {
			return new Promise(function (resolve, reject) {
				for (var i = 0, len = values.length; i < len; i++) {
					values[i].then(resolve, reject);
				}
			});
		};

		/**
	  * Set the immediate function to execute callbacks
	  * @param fn {function} Function to execute
	  * @private
	  */
		Promise._setImmediateFn = function _setImmediateFn(fn) {
			asap = fn;
		};

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = Promise;
		} else if (!root.Promise) {
			root.Promise = Promise;
		}
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {"use strict";

	var nextTick = __webpack_require__(3).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  timeout.close();
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(5);
	var isArguments = __webpack_require__(6);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	    // 7.3. Other pairs that do not both pass typeof value == 'object',
	    // equivalence is determined by ==.
	  } else if (!actual || !expected || (typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) != 'object' && (typeof expected === 'undefined' ? 'undefined' : _typeof(expected)) != 'object') {
	      return opts.strict ? actual === expected : actual == expected;

	      // 7.4. For all other Object pairs, including Array objects, equivalence is
	      // determined by having the same number of owned properties (as verified
	      // with Object.prototype.hasOwnProperty.call), the same set of keys
	      // (although not necessarily the same order), equivalent values for every
	      // corresponding key, and an identical 'prototype' property. Note: this
	      // accounts for both named and indexed properties on Arrays.
	    } else {
	        return objEquiv(actual, expected, opts);
	      }
	};

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer(x) {
	  if (!x || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {
	    //happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length) return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i]) return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b));
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

	exports.shim = shim;
	function shim(obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var supportsArgumentsClass = function () {
	  return Object.prototype.toString.call(arguments);
	}() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object) {
	  return object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
	};

/***/ }
/******/ ]);