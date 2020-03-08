
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es.array.map'), require('core-js/modules/es.array.slice'), require('core-js/modules/es.number.constructor'), require('core-js/modules/es.object.set-prototype-of'), require('core-js/modules/es.array.index-of'), require('core-js/modules/es.array.for-each'), require('core-js/modules/es.array.reduce'), require('core-js/modules/es.object.keys'), require('core-js/modules/es.object.to-string'), require('core-js/modules/es.regexp.to-string'), require('core-js/modules/web.dom-collections.for-each'), require('core-js/modules/es.regexp.exec'), require('core-js/modules/es.string.replace'), require('core-js/modules/es.array.filter'), require('core-js/modules/es.string.trim'), require('core-js/modules/es.symbol'), require('core-js/modules/es.symbol.description'), require('core-js/modules/es.symbol.to-string-tag'), require('core-js/modules/es.array.join'), require('core-js/modules/es.json.to-string-tag'), require('core-js/modules/es.math.to-string-tag')) :
	typeof define === 'function' && define.amd ? define(['core-js/modules/es.array.map', 'core-js/modules/es.array.slice', 'core-js/modules/es.number.constructor', 'core-js/modules/es.object.set-prototype-of', 'core-js/modules/es.array.index-of', 'core-js/modules/es.array.for-each', 'core-js/modules/es.array.reduce', 'core-js/modules/es.object.keys', 'core-js/modules/es.object.to-string', 'core-js/modules/es.regexp.to-string', 'core-js/modules/web.dom-collections.for-each', 'core-js/modules/es.regexp.exec', 'core-js/modules/es.string.replace', 'core-js/modules/es.array.filter', 'core-js/modules/es.string.trim', 'core-js/modules/es.symbol', 'core-js/modules/es.symbol.description', 'core-js/modules/es.symbol.to-string-tag', 'core-js/modules/es.array.join', 'core-js/modules/es.json.to-string-tag', 'core-js/modules/es.math.to-string-tag'], factory) :
	(global = global || self, global.FusionGrid = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.4',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var f$6 = wellKnownSymbol;

	var wellKnownSymbolWrapped = {
		f: f$6
	};

	var defineProperty = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty$3 = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty$3(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;



	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var nativeAssign = Object.assign;
	var defineProperty$4 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$4({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$4(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


	var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
	var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	_export({ target: 'Object', stat: true, forced: FORCED$1, sham: !descriptors }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
	  }
	});

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	_export({ target: 'Object', stat: true }, {
	  setPrototypeOf: objectSetPrototypeOf
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$2 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$2]) {
	    defineProperty(Constructor, SPECIES$2, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, next, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$4] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$4] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var SPECIES$3 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$1 = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (classofRaw(process$1) == 'process') {
	    defer = function (id) {
	      process$1.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$1,
	  clear: clear
	};

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

	var macrotask = task.set;


	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$2 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$2) == 'process';
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (IS_NODE) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  } else if (MutationObserver && !engineIsIos) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$7
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task$1 = task.set;










	var SPECIES$4 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$2 = internalState.get;
	var setInternalState$2 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$3) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED$2 = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
	  }
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$4] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION = FORCED$2 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (promise, state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$2) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$2(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState$2(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$2(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED$2 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED$2 }, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED$2 }, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$3 = internalState.set;
	var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$3(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$3(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function ownKeys$1(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys$1(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys$1(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    _construct = Reflect.construct;
	  } else {
	    _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) _setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !_isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return _setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
	    return;
	  }

	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	var _assign = function __assign() {
	  _assign = Object.assign || function __assign(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	      s = arguments[i];

	      for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	      }
	    }

	    return t;
	  };

	  return _assign.apply(this, arguments);
	};
	function __spreadArrays() {
	  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
	    s += arguments[i].length;
	  }

	  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
	    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
	      r[k] = a[j];
	    }
	  }

	  return r;
	}

	var ColumnType;
	(function (ColumnType) {
	    ColumnType["String"] = "string";
	    ColumnType["Number"] = "number";
	    ColumnType["DateTime"] = "datetime";
	    ColumnType["HTML"] = "html";
	    ColumnType["Chart"] = "chart";
	})(ColumnType || (ColumnType = {}));
	var ValueTextPositionType;
	(function (ValueTextPositionType) {
	    ValueTextPositionType["top"] = "top";
	    ValueTextPositionType["bottom"] = "bottom";
	    ValueTextPositionType["left"] = "left";
	    ValueTextPositionType["right"] = "right";
	    ValueTextPositionType["inside"] = "inside";
	})(ValueTextPositionType || (ValueTextPositionType = {}));
	var ValueTextAlignmentType;
	(function (ValueTextAlignmentType) {
	    ValueTextAlignmentType["start"] = "start";
	    ValueTextAlignmentType["end"] = "end";
	    ValueTextAlignmentType["middle"] = "middle";
	})(ValueTextAlignmentType || (ValueTextAlignmentType = {}));
	var LayoutType;
	(function (LayoutType) {
	    LayoutType["Row"] = "row";
	    LayoutType["Card"] = "card";
	})(LayoutType || (LayoutType = {}));
	var LayoutDensityType;
	(function (LayoutDensityType) {
	    LayoutDensityType["Default"] = "default";
	    LayoutDensityType["Compact"] = "compact";
	    LayoutDensityType["Comfortable"] = "comfortable";
	})(LayoutDensityType || (LayoutDensityType = {}));
	//# sourceMappingURL=interfaces.js.map

	function interpolateNumber(_min, _max) {
	  var min = Number(_min),
	      max = Number(_max),
	      diff = max - min;
	  return function (ratio) {
	    return diff * ratio + min;
	  };
	}

	var constant = function constant(x) {
	  return function () {
	    return x;
	  };
	};

	function isValid(num) {
	  if (num === null || typeof num === 'undefined') {
	    return false;
	  }

	  return true;
	}

	function interpolateRound(_min, _max) {
	  var min = Number(_min),
	      max = Number(_max),
	      diff = max - min;
	  return function (ratio) {
	    return Math.round(diff * ratio + min);
	  };
	}

	function interpolateValue(from, to) {
	  var interpolator = interpolateNumber;

	  if (!isValid(to) || !isValid(from) || typeof to === 'boolean') {
	    return constant(to);
	  }

	  return interpolator(from, to);
	}

	function deInterpolateLinear(_min, _max) {
	  var min = Number(_min),
	      max = Number(_max),
	      diff = max - min;

	  if (!diff) {
	    return constant(diff);
	  }

	  return function (value) {
	    return (value - min) / diff;
	  };
	}

	var UNDEF;
	var UNIT = [0, 1];

	function bimap(domain, range, deInterpolate, reInterpolate) {
	  var deInterpolator, reInterpolator;

	  if (domain[0] > domain[1]) {
	    deInterpolator = deInterpolate(domain[1], domain[0]);
	    reInterpolator = reInterpolate(range[1], range[0]);
	  } else {
	    deInterpolator = deInterpolate(domain[0], domain[1]);
	    reInterpolator = reInterpolate(range[0], range[1]);
	  }

	  return function (value) {
	    return reInterpolator(deInterpolator(value));
	  };
	}

	function deInterpolateLinear$1(_min, _max) {
	  var min = Number(_min),
	      max = Number(_max),
	      diff = max - min;

	  if (!diff) {
	    return constant(diff);
	  }

	  return function (value) {
	    return (value - min) / diff;
	  };
	}

	function deInterpolateClamp(deInterpolate) {
	  return function (_min, _max) {
	    var min = Number(_min),
	        max = Number(_max),
	        interpolator = deInterpolate(min, max);
	    return function (value) {
	      if (value <= min) {
	        return 0;
	      } else if (value >= max) {
	        return 1;
	      }

	      return interpolator(value);
	    };
	  };
	}

	function reInterpolateClamp(reInterpolate) {
	  return function (_min, _max) {
	    var min = Number(_min),
	        max = Number(_max),
	        interpolator = reInterpolate(min, max);
	    return function (ratio) {
	      if (ratio <= 0) {
	        return min;
	      } else if (ratio >= 1) {
	        return max;
	      }

	      return interpolator(ratio);
	    };
	  };
	}

	var ScaleContinuous = function () {
	  function ScaleContinuous(deInterpolate, reInterpolate) {
	    this.domain = UNIT;
	    this.range = UNIT;
	    this.deInterpolate = deInterpolate;
	    this.reInterpolate = reInterpolate;
	    this.interpolate = interpolateValue;
	    this.clamp = false;
	    this.input = null;
	    this.output = null;

	    this._rescale();
	  }

	  ScaleContinuous.prototype._rescale = function () {
	    this.input = null;
	    this.output = null;
	    return this;
	  };

	  ScaleContinuous.prototype.setDomain = function (inputArr) {
	    if (inputArr === void 0) {
	      inputArr = UNIT;
	    }

	    this.domain = inputArr.map(Number);
	    return this._rescale();
	  };

	  ScaleContinuous.prototype.getDomain = function () {
	    return this.domain.slice();
	  };

	  ScaleContinuous.prototype.setRange = function (inputArr) {
	    if (inputArr === void 0) {
	      inputArr = UNIT;
	    }

	    this.range = inputArr.slice();
	    return this._rescale();
	  };

	  ScaleContinuous.prototype.getRange = function () {
	    return this.range.slice();
	  };

	  ScaleContinuous.prototype.setInterpolate = function (interpolate) {
	    if (interpolate === void 0) {
	      interpolate = interpolateValue;
	    }

	    this.interpolate = interpolate;
	    return this._rescale();
	  };

	  ScaleContinuous.prototype.getInterpolate = function () {
	    return this.interpolate;
	  };

	  ScaleContinuous.prototype.setClamp = function (clamp) {
	    if (clamp === void 0) {
	      clamp = false;
	    }

	    this.clamp = !!clamp;
	    return this._rescale();
	  };

	  ScaleContinuous.prototype.getClamp = function () {
	    return this.clamp;
	  };

	  ScaleContinuous.prototype.rangeRound = function (inputArr) {
	    if (inputArr === void 0) {
	      inputArr = UNIT;
	    }

	    this.range = inputArr.slice();
	    this.interpolate = interpolateRound;
	    return this._rescale();
	  };

	  ScaleContinuous.prototype.getRangeValue = function (_domainValue) {
	    var domainValue = _domainValue !== null ? _domainValue : UNDEF,
	        clamp = this.getClamp(),
	        deInterpolate = clamp ? deInterpolateClamp(this.deInterpolate) : this.deInterpolate;

	    if (!this.output) {
	      this.output = bimap(this.getDomain(), this.getRange(), deInterpolate, this.interpolate);
	    }

	    return this.output(Number(domainValue));
	  };

	  ScaleContinuous.prototype.getDomainValue = function (rangeValue) {
	    var clamp = this.getClamp(),
	        reInterpolate = clamp ? reInterpolateClamp(this.reInterpolate) : this.reInterpolate;

	    if (!this.input) {
	      this.input = bimap(this.getRange(), this.getDomain(), deInterpolateLinear$1, reInterpolate);
	    }

	    return this.input(Number(rangeValue));
	  };

	  return ScaleContinuous;
	}();

	var __extends = undefined && undefined.__extends || function () {
	  var _extendStatics = function extendStatics(d, b) {
	    _extendStatics = Object.setPrototypeOf || {
	      __proto__: []
	    } instanceof Array && function (d, b) {
	      d.__proto__ = b;
	    } || function (d, b) {
	      for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	      }
	    };

	    return _extendStatics(d, b);
	  };

	  return function (d, b) {
	    _extendStatics(d, b);

	    function __() {
	      this.constructor = d;
	    }

	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	  };
	}();

	var ScaleLinear = function (_super) {
	  __extends(ScaleLinear, _super);

	  function ScaleLinear() {
	    return _super.call(this, deInterpolateLinear, interpolateNumber) || this;
	  }

	  return ScaleLinear;
	}(ScaleContinuous);

	var $map = arrayIteration.map;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('map');

	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

	var max$1 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$2 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$1(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	// `Array.prototype.fill` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.fill
	var arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	// `Array.prototype.fill` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.fill
	_export({ target: 'Array', proto: true }, {
	  fill: arrayFill
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('fill');

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('filter');

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$3 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $forEach$1 = arrayIteration.forEach;



	var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD$1 || !USES_TO_LENGTH$4) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	// `Array.from` method implementation
	// https://tc39.github.io/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var INCORRECT_ITERATION$1 = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.github.io/ecma262/#sec-array.from
	_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION$1 }, {
	  from: arrayFrom
	});

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$2 = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

	var SPECIES$5 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$2 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$5 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$5];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var defineProperty$5 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$5(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	  return it;
	};

	var meta = module.exports = {
	  REQUIRED: false,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY,
	      KEY == 'add' ? function add(value) {
	        nativeMethod.call(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY == 'delete' ? function (key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'get' ? function get(key) {
	        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'has' ? function has(key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        nativeMethod.call(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  // eslint-disable-next-line max-len
	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var defineProperty$6 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$4 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$4(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$6(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$4(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Map` constructor
	// https://tc39.github.io/ecma262/#sec-map-objects
	var es_map = collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var FAILS_ON_PRIMITIVES$1 = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	// `Set` constructor
	// https://tc39.github.io/ecma262/#sec-set-objects
	var es_set = collection('Set', function (init) {
	  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	// TODO: Remove from `core-js@4` since it's moved to entry points







	var SPECIES$6 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	var REPLACE = wellKnownSymbol('replace');
	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$6] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(
	      REPLACE_SUPPORTS_NAMED_GROUPS &&
	      REPLACE_KEEPS_$0 &&
	      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    )) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var max$3 = Math.max;
	var min$3 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      if (
	        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
	        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
	      ) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(regexp);
	      var S = String(this);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$3(min$3(toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var arrayPush = [].push;
	var min$4 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	var quot = /"/g;

	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	// https://tc39.github.io/ecma262/#sec-createhtml
	var createHtml = function (string, tag, attribute, value) {
	  var S = String(requireObjectCoercible(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	// check the existence of a method, lowercase
	// of a tag and escaping quotes in arguments
	var stringHtmlForced = function (METHOD_NAME) {
	  return fails(function () {
	    var test = ''[METHOD_NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  });
	};

	// `String.prototype.anchor` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.anchor
	_export({ target: 'String', proto: true, forced: stringHtmlForced('anchor') }, {
	  anchor: function anchor(name) {
	    return createHtml(this, 'a', 'name', name);
	  }
	});

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype$1.forEach = arrayForEach;
	  }
	}

	function noop() {}

	function run$1(fn) {
	  return fn();
	}

	function blank_object() {
	  return Object.create(null);
	}

	function run_all(fns) {
	  fns.forEach(run$1);
	}

	function is_function(thing) {
	  return typeof thing === 'function';
	}

	function safe_not_equal(a, b) {
	  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
	}

	function append(target, node) {
	  target.appendChild(node);
	}

	function insert(target, node, anchor) {
	  target.insertBefore(node, anchor || null);
	}

	function detach(node) {
	  node.parentNode.removeChild(node);
	}

	function destroy_each(iterations, detaching) {
	  for (var i = 0; i < iterations.length; i += 1) {
	    if (iterations[i]) iterations[i].d(detaching);
	  }
	}

	function element(name) {
	  return document.createElement(name);
	}

	function svg_element(name) {
	  return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	function text(data) {
	  return document.createTextNode(data);
	}

	function space() {
	  return text(' ');
	}

	function empty() {
	  return text('');
	}

	function listen(node, event, handler, options) {
	  node.addEventListener(event, handler, options);
	  return function () {
	    return node.removeEventListener(event, handler, options);
	  };
	}

	function attr(node, attribute, value) {
	  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	function children(element) {
	  return Array.from(element.childNodes);
	}

	function set_data(text, data) {
	  data = '' + data;
	  if (text.data !== data) text.data = data;
	}

	function set_style(node, key, value, important) {
	  node.style.setProperty(key, value, important ? 'important' : '');
	}

	function custom_event(type, detail) {
	  var e = document.createEvent('CustomEvent');
	  e.initCustomEvent(type, false, false, detail);
	  return e;
	}

	var HtmlTag =
	/*#__PURE__*/
	function () {
	  function HtmlTag(html) {
	    var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    _classCallCheck(this, HtmlTag);

	    this.e = element('div');
	    this.a = anchor;
	    this.u(html);
	  }

	  _createClass(HtmlTag, [{
	    key: "m",
	    value: function m(target) {
	      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	      for (var i = 0; i < this.n.length; i += 1) {
	        insert(target, this.n[i], anchor);
	      }

	      this.t = target;
	    }
	  }, {
	    key: "u",
	    value: function u(html) {
	      this.e.innerHTML = html;
	      this.n = Array.from(this.e.childNodes);
	    }
	  }, {
	    key: "p",
	    value: function p(html) {
	      this.d();
	      this.u(html);
	      this.m(this.t, this.a);
	    }
	  }, {
	    key: "d",
	    value: function d() {
	      this.n.forEach(detach);
	    }
	  }]);

	  return HtmlTag;
	}();

	var current_component;

	function set_current_component(component) {
	  current_component = component;
	}

	function get_current_component() {
	  if (!current_component) throw new Error("Function called outside component initialization");
	  return current_component;
	}

	function onMount(fn) {
	  get_current_component().$$.on_mount.push(fn);
	}

	function createEventDispatcher() {
	  var component = get_current_component();
	  return function (type, detail) {
	    var callbacks = component.$$.callbacks[type];

	    if (callbacks) {
	      // TODO are there situations where events could be dispatched
	      // in a server (non-DOM) environment?
	      var event = custom_event(type, detail);
	      callbacks.slice().forEach(function (fn) {
	        fn.call(component, event);
	      });
	    }
	  };
	}

	function setContext(key, context) {
	  get_current_component().$$.context.set(key, context);
	}

	function getContext(key) {
	  return get_current_component().$$.context.get(key);
	} // TODO figure out if we still want to support
	// shorthand events, or if we want to implement
	// a real bubbling mechanism


	function bubble(component, event) {
	  var callbacks = component.$$.callbacks[event.type];

	  if (callbacks) {
	    callbacks.slice().forEach(function (fn) {
	      return fn(event);
	    });
	  }
	}

	var dirty_components = [];
	var binding_callbacks = [];
	var render_callbacks = [];
	var flush_callbacks = [];
	var resolved_promise = Promise.resolve();
	var update_scheduled = false;

	function schedule_update() {
	  if (!update_scheduled) {
	    update_scheduled = true;
	    resolved_promise.then(flush$1);
	  }
	}

	function add_render_callback(fn) {
	  render_callbacks.push(fn);
	}

	var seen_callbacks = new Set();

	function flush$1() {
	  do {
	    // first, call beforeUpdate functions
	    // and update components
	    while (dirty_components.length) {
	      var component = dirty_components.shift();
	      set_current_component(component);
	      update(component.$$);
	    }

	    while (binding_callbacks.length) {
	      binding_callbacks.pop()();
	    } // then, once components are updated, call
	    // afterUpdate functions. This may cause
	    // subsequent updates...


	    for (var i = 0; i < render_callbacks.length; i += 1) {
	      var callback = render_callbacks[i];

	      if (!seen_callbacks.has(callback)) {
	        // ...so guard against infinite loops
	        seen_callbacks.add(callback);
	        callback();
	      }
	    }

	    render_callbacks.length = 0;
	  } while (dirty_components.length);

	  while (flush_callbacks.length) {
	    flush_callbacks.pop()();
	  }

	  update_scheduled = false;
	  seen_callbacks.clear();
	}

	function update($$) {
	  if ($$.fragment !== null) {
	    $$.update();
	    run_all($$.before_update);
	    var dirty = $$.dirty;
	    $$.dirty = [-1];
	    $$.fragment && $$.fragment.p($$.ctx, dirty);
	    $$.after_update.forEach(add_render_callback);
	  }
	}

	var outroing = new Set();
	var outros;

	function group_outros() {
	  outros = {
	    r: 0,
	    c: [],
	    p: outros // parent group

	  };
	}

	function check_outros() {
	  if (!outros.r) {
	    run_all(outros.c);
	  }

	  outros = outros.p;
	}

	function transition_in(block, local) {
	  if (block && block.i) {
	    outroing.delete(block);
	    block.i(local);
	  }
	}

	function transition_out(block, local, detach, callback) {
	  if (block && block.o) {
	    if (outroing.has(block)) return;
	    outroing.add(block);
	    outros.c.push(function () {
	      outroing.delete(block);

	      if (callback) {
	        if (detach) block.d(1);
	        callback();
	      }
	    });
	    block.o(local);
	  }
	}

	function create_component(block) {
	  block && block.c();
	}

	function mount_component(component, target, anchor) {
	  var _component$$$ = component.$$,
	      fragment = _component$$$.fragment,
	      on_mount = _component$$$.on_mount,
	      on_destroy = _component$$$.on_destroy,
	      after_update = _component$$$.after_update;
	  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

	  add_render_callback(function () {
	    var new_on_destroy = on_mount.map(run$1).filter(is_function);

	    if (on_destroy) {
	      on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
	    } else {
	      // Edge case - component was destroyed immediately,
	      // most likely as a result of a binding initialising
	      run_all(new_on_destroy);
	    }

	    component.$$.on_mount = [];
	  });
	  after_update.forEach(add_render_callback);
	}

	function destroy_component(component, detaching) {
	  var $$ = component.$$;

	  if ($$.fragment !== null) {
	    run_all($$.on_destroy);
	    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
	    // preserve final state?)

	    $$.on_destroy = $$.fragment = null;
	    $$.ctx = [];
	  }
	}

	function make_dirty(component, i) {
	  if (component.$$.dirty[0] === -1) {
	    dirty_components.push(component);
	    schedule_update();
	    component.$$.dirty.fill(0);
	  }

	  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
	}

	function init(component, options, instance, create_fragment, not_equal, props) {
	  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
	  var parent_component = current_component;
	  set_current_component(component);
	  var prop_values = options.props || {};
	  var $$ = component.$$ = {
	    fragment: null,
	    ctx: null,
	    // state
	    props: props,
	    update: noop,
	    not_equal: not_equal,
	    bound: blank_object(),
	    // lifecycle
	    on_mount: [],
	    on_destroy: [],
	    before_update: [],
	    after_update: [],
	    context: new Map(parent_component ? parent_component.$$.context : []),
	    // everything else
	    callbacks: blank_object(),
	    dirty: dirty
	  };
	  var ready = false;
	  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
	    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

	    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	      if ($$.bound[i]) $$.bound[i](value);
	      if (ready) make_dirty(component, i);
	    }

	    return ret;
	  }) : [];
	  $$.update();
	  ready = true;
	  run_all($$.before_update); // `false` as a special case of no DOM component

	  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

	  if (options.target) {
	    if (options.hydrate) {
	      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	      $$.fragment && $$.fragment.l(children(options.target));
	    } else {
	      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	      $$.fragment && $$.fragment.c();
	    }

	    if (options.intro) transition_in(component.$$.fragment);
	    mount_component(component, options.target, options.anchor);
	    flush$1();
	  }

	  set_current_component(parent_component);
	}

	var SvelteElement;

	if (typeof HTMLElement === 'function') {
	  SvelteElement =
	  /*#__PURE__*/
	  function (_HTMLElement) {
	    _inherits(SvelteElement, _HTMLElement);

	    function SvelteElement() {
	      var _this;

	      _classCallCheck(this, SvelteElement);

	      _this = _possibleConstructorReturn(this, _getPrototypeOf(SvelteElement).call(this));

	      _this.attachShadow({
	        mode: 'open'
	      });

	      return _this;
	    }

	    _createClass(SvelteElement, [{
	      key: "connectedCallback",
	      value: function connectedCallback() {
	        // @ts-ignore todo: improve typings
	        for (var key in this.$$.slotted) {
	          // @ts-ignore todo: improve typings
	          this.appendChild(this.$$.slotted[key]);
	        }
	      }
	    }, {
	      key: "attributeChangedCallback",
	      value: function attributeChangedCallback(attr, _oldValue, newValue) {
	        this[attr] = newValue;
	      }
	    }, {
	      key: "$destroy",
	      value: function $destroy() {
	        destroy_component(this, 1);
	        this.$destroy = noop;
	      }
	    }, {
	      key: "$on",
	      value: function $on(type, callback) {
	        // TODO should this delegate to addEventListener?
	        var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
	        callbacks.push(callback);
	        return function () {
	          var index = callbacks.indexOf(callback);
	          if (index !== -1) callbacks.splice(index, 1);
	        };
	      }
	    }, {
	      key: "$set",
	      value: function $set() {// overridden by instance, if it has props
	      }
	    }]);

	    return SvelteElement;
	  }(_wrapNativeSuper(HTMLElement));
	}

	var SvelteComponent =
	/*#__PURE__*/
	function () {
	  function SvelteComponent() {
	    _classCallCheck(this, SvelteComponent);
	  }

	  _createClass(SvelteComponent, [{
	    key: "$destroy",
	    value: function $destroy() {
	      destroy_component(this, 1);
	      this.$destroy = noop;
	    }
	  }, {
	    key: "$on",
	    value: function $on(type, callback) {
	      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
	      callbacks.push(callback);
	      return function () {
	        var index = callbacks.indexOf(callback);
	        if (index !== -1) callbacks.splice(index, 1);
	      };
	    }
	  }, {
	    key: "$set",
	    value: function $set() {// overridden by instance, if it has props
	    }
	  }]);

	  return SvelteComponent;
	}();

	var subscriber_queue = [];
	/**
	 * Create a `Writable` store that allows both updating and reading by subscription.
	 * @param {*=}value initial value
	 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
	 */


	function writable(value) {
	  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	  var stop;
	  var subscribers = [];

	  function set(new_value) {
	    if (safe_not_equal(value, new_value)) {
	      value = new_value;

	      if (stop) {
	        // store is ready
	        var run_queue = !subscriber_queue.length;

	        for (var i = 0; i < subscribers.length; i += 1) {
	          var s = subscribers[i];
	          s[1]();
	          subscriber_queue.push(s, value);
	        }

	        if (run_queue) {
	          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
	            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
	          }

	          subscriber_queue.length = 0;
	        }
	      }
	    }
	  }

	  function update(fn) {
	    set(fn(value));
	  }

	  function subscribe(run) {
	    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	    var subscriber = [run, invalidate];
	    subscribers.push(subscriber);

	    if (subscribers.length === 1) {
	      stop = start(set) || noop;
	    }

	    run(value);
	    return function () {
	      var index = subscribers.indexOf(subscriber);

	      if (index !== -1) {
	        subscribers.splice(index, 1);
	      }

	      if (subscribers.length === 0) {
	        stop();
	        stop = null;
	      }
	    };
	  }

	  return {
	    set: set,
	    update: update,
	    subscribe: subscribe
	  };
	}

	var utils = {};
	var visualUtils = writable(utils);
	//# sourceMappingURL=stores.js.map

	var UNDEF$1;
	var GridData = (function () {
	    function GridData(gridDataTable, gridConfig, ctx) {
	        var _this = this;
	        this._gridDataTable = gridDataTable;
	        this._gridConfig = gridConfig;
	        this._fnContext = ctx;
	        this._globalSelectedState = false;
	        this._buildColumnIndexMap();
	        this._buildInlineChartExtents();
	        this._rowSelectedState = new Array(this._gridDataTable.gridData.length).fill(false);
	        visualUtils.subscribe(function (tmpVisualUtils) {
	            _this._dispatchEvent = tmpVisualUtils.dispatchEvent;
	        });
	    }
	    Object.defineProperty(GridData.prototype, "gridDataTable", {
	        get: function () {
	            return this._gridDataTable;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GridData.prototype, "gridConfig", {
	        get: function () {
	            return this._gridConfig;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GridData.prototype.setDataTable = function (dataTable) {
	        this._gridDataTable.setDataTable(dataTable);
	        this._buildInlineChartExtents();
	        this._rowSelectedState = new Array(this._gridDataTable.gridData.length).fill(false);
	    };
	    GridData.prototype.setColumns = function (columns) {
	        this._gridConfig.columns = columns;
	        this._buildColumnIndexMap();
	        this._buildInlineChartExtents();
	    };
	    GridData.prototype.getGlobalSelectedState = function () {
	        return this._globalSelectedState;
	    };
	    GridData.prototype.setGlobalSelectedState = function (isSelected) {
	        this._globalSelectedState = isSelected;
	    };
	    GridData.prototype._buildColumnIndexMap = function () {
	        var _this = this;
	        this._columnIndexMap = this._gridConfig.columns.map(function (val) {
	            if (typeof val.field !== 'undefined') {
	                return _this._gridDataTable.dataTable.indexOf(val.field);
	            }
	            return -1;
	        });
	    };
	    GridData.prototype._buildInlineChartExtents = function () {
	        var columns = this._gridConfig.columns;
	        var columnExtents, currentColumn;
	        for (var i = 0; i < columns.length; i++) {
	            currentColumn = columns[i];
	            if (currentColumn.type === ColumnType.Chart) {
	                columnExtents = this._gridDataTable.dataTable.extents(currentColumn.field || '');
	                currentColumn.minContent = columnExtents.min;
	                currentColumn.maxContent = columnExtents.max;
	                if (typeof currentColumn.chartconfig !== 'undefined') {
	                    if (typeof currentColumn.chartconfig.minvalue === 'number' && currentColumn.chartconfig.minvalue < columnExtents.min) {
	                        currentColumn.minContent = currentColumn.chartconfig.minvalue;
	                    }
	                    if (typeof currentColumn.chartconfig.maxvalue === 'number' && currentColumn.chartconfig.maxvalue > columnExtents.max) {
	                        currentColumn.maxContent = currentColumn.chartconfig.maxvalue;
	                    }
	                }
	                currentColumn.scale = new ScaleLinear();
	            }
	        }
	    };
	    GridData.prototype.getCurrentRowData = function (rowIndex) {
	        if (!(this._currentRowData && this._currentRowData.rowIndex === rowIndex)) {
	            var data = this._gridDataTable.gridData[rowIndex], schema = this._gridDataTable.gridSchema, rowData = {
	                rowIndex: rowIndex,
	                values: {}
	            };
	            for (var i = 0; i < schema.length; i++) {
	                rowData.values[schema[i].name] = data[i];
	            }
	            this._currentRowData = rowData;
	        }
	        return this._currentRowData;
	    };
	    GridData.prototype.toggleRowSelectedState = function (rowIndex, e) {
	        if (rowIndex < this._rowSelectedState.length) {
	            this.setRowSelection(rowIndex, !this.getRowSelection(rowIndex), e);
	        }
	    };
	    GridData.prototype.syncAllRowSelectedStateWithGlobalSelection = function (e) {
	        var _this = this;
	        var updatedGlobalSelectedState = this.getGlobalSelectedState(), dispatchEvent = this._dispatchEvent, rowsSelectedArr = [];
	        for (var index = 0; index < this._rowSelectedState.length; index++) {
	            this.setRowSelection(index, updatedGlobalSelectedState);
	            (this._rowSelectedState[index] === updatedGlobalSelectedState) && rowsSelectedArr.push(index);
	        }
	        if (dispatchEvent) {
	            (updatedGlobalSelectedState) ? dispatchEvent('allrowsselected', rowsSelectedArr, e) : dispatchEvent('allrowsdeselected', rowsSelectedArr, e);
	        }
	        visualUtils.update(function (tmpVisualUtils) {
	            if (tmpVisualUtils.gridData)
	                tmpVisualUtils.gridData._rowSelectedState = _this._rowSelectedState;
	            return tmpVisualUtils;
	        });
	    };
	    GridData.prototype._getClasAndStyle = function (cellFnParams, cssClass, cssStyle) {
	        var fnContext = this._fnContext;
	        var cssClassArr = [], cssStyleObj;
	        if (typeof cssClass === 'function') {
	            cssClassArr = cssClassArr.concat(cssClass.call(fnContext, cellFnParams));
	        }
	        else {
	            cssClassArr = typeof cssClass === 'undefined' ? [] : cssClassArr.concat(cssClass);
	        }
	        if (typeof cssStyle === 'function') {
	            cssStyleObj = _assign({}, cssStyle.call(fnContext, cellFnParams));
	        }
	        else {
	            cssStyleObj = typeof cssStyle === 'undefined' ? {} : cssStyle;
	        }
	        return {
	            class: cssClassArr,
	            style: cssStyleObj
	        };
	    };
	    GridData.prototype._getRowClassAndStyle = function (rowFnParams, cssClass, cssStyle) {
	        var fnContext = this._fnContext;
	        var cssClassArr = [], cssStyleObj;
	        if (typeof cssClass === 'function') {
	            cssClassArr = cssClassArr.concat(cssClass.call(fnContext, rowFnParams));
	        }
	        else {
	            cssClassArr = typeof cssClass === 'undefined' ? [] : cssClassArr.concat(cssClass);
	        }
	        if (typeof cssStyle === 'function') {
	            cssStyleObj = _assign({}, cssStyle.call(fnContext, rowFnParams));
	        }
	        else {
	            cssStyleObj = typeof cssStyle === 'undefined' ? {} : cssStyle;
	        }
	        return {
	            class: cssClassArr,
	            style: cssStyleObj
	        };
	    };
	    GridData.prototype.getCellMetaInfo = function (rowIndex, cellIndex) {
	        var cellContent = '', inlineChartStyle, hoverCssClassStyle, hoverClassArr = [], hoverStyleObj = {}, tooltipContent = [], showTooltipInHelper = false;
	        var fnContext = this._fnContext, gridColumn = this._gridConfig.columns[cellIndex], dtColIndex = this._columnIndexMap[cellIndex], dtColSchema = this._gridDataTable.gridSchema[dtColIndex], cellValue = this._gridDataTable.gridData[rowIndex][dtColIndex], values = this.getCurrentRowData(rowIndex).values, cellFnParams = {
	            cellIndex: cellIndex,
	            cellValue: cellValue,
	            rowIndex: rowIndex,
	            values: values
	        }, genericCssClassStyle = this._getClasAndStyle(cellFnParams, gridColumn["class"], gridColumn.style), genericClassArr = genericCssClassStyle["class"] || [], genericStyleObj = genericCssClassStyle.style || {}, cellCssClassStyle = this._getClasAndStyle(cellFnParams, gridColumn.cellclass, gridColumn.cellstyle), cellClassArr = cellCssClassStyle["class"] || [], cellStyleObj = cellCssClassStyle.style || {}, mergedClassArr = genericClassArr.concat(cellClassArr), mergedStyleObj = _assign(_assign({}, genericStyleObj), cellStyleObj), hoverOptions = gridColumn.hover, tooltipOptions = gridColumn.tooltip;
	        if (typeof hoverOptions === 'object') {
	            hoverCssClassStyle = this._getClasAndStyle(cellFnParams, hoverOptions["class"], hoverOptions.style),
	                hoverClassArr = hoverCssClassStyle["class"] || [],
	                hoverStyleObj = hoverCssClassStyle.style || {};
	        }
	        if (gridColumn.type !== ColumnType.HTML) {
	            if (typeof gridColumn.formatter === 'undefined') {
	                if (typeof cellValue === 'undefined' || cellValue === null) {
	                    cellContent = '';
	                }
	                else {
	                    if (dtColSchema.type === 'datetime') {
	                        cellContent = new Intl.DateTimeFormat('en-US').format(new Date(cellValue));
	                    }
	                    else {
	                        cellContent = cellValue;
	                    }
	                }
	            }
	            else {
	                cellContent = gridColumn.formatter.call(fnContext, cellFnParams);
	            }
	        }
	        if (gridColumn.type === ColumnType.HTML && typeof gridColumn.template !== 'undefined') {
	            cellContent = gridColumn.template.call(fnContext, cellFnParams);
	        }
	        if (gridColumn.type === ColumnType.Chart && typeof gridColumn.chartconfig !== 'undefined') {
	            if (typeof gridColumn.chartconfig.style === 'function') {
	                inlineChartStyle = gridColumn.chartconfig.style.call(fnContext, cellFnParams);
	            }
	            else {
	                inlineChartStyle = gridColumn.chartconfig.style;
	            }
	        }
	        if (typeof tooltipOptions === 'object' && tooltipOptions.enablecelltooltip === true) {
	            if (typeof tooltipOptions.celltooltip === 'function') {
	                tooltipContent = tooltipOptions.celltooltip.call(fnContext, cellFnParams);
	            }
	            else {
	                tooltipContent = cellContent;
	            }
	            if (typeof tooltipOptions.enablecellhelpericon === 'boolean' && gridColumn.type !== ColumnType.Chart) {
	                showTooltipInHelper = tooltipOptions.enablecellhelpericon;
	            }
	        }
	        return {
	            content: cellContent,
	            class: mergedClassArr,
	            style: mergedStyleObj,
	            hoverClass: hoverClassArr,
	            hoverStyle: hoverStyleObj,
	            params: cellFnParams,
	            tooltipContent: tooltipContent,
	            showTooltipInHelper: showTooltipInHelper,
	            inlineChartStyle: inlineChartStyle
	        };
	    };
	    GridData.prototype.getHeaderMetaInfo = function (headerIndex) {
	        var hoverCssClassStyle, hoverClassArr = [], hoverStyleObj = {}, tooltipContent = [], showTooltipInHelper = false;
	        var gridColumn = this._gridConfig.columns[headerIndex], headerCellValue = typeof gridColumn.headertext === 'undefined' ? '' : gridColumn.headertext, headerFnParams = {
	            cellIndex: headerIndex,
	            rowIndex: -1,
	            cellValue: headerCellValue,
	            values: {}
	        }, genericCssClassStyle = this._getClasAndStyle(headerFnParams, gridColumn["class"], gridColumn.style), genericClassArr = genericCssClassStyle["class"] || [], genericStyleObj = genericCssClassStyle.style || {}, headerCssClassStyle = this._getClasAndStyle(headerFnParams, gridColumn.headerclass, gridColumn.headerstyle), headerClassArr = headerCssClassStyle["class"] || [], headerStyleObj = headerCssClassStyle.style || {}, mergedClassArr = genericClassArr.concat(headerClassArr), mergedStyleObj = _assign(_assign({}, genericStyleObj), headerStyleObj), hoverOptions = gridColumn.hover, tooltipOptions = gridColumn.tooltip;
	        if (typeof hoverOptions === 'object') {
	            hoverCssClassStyle = this._getClasAndStyle(headerFnParams, hoverOptions["class"], hoverOptions.style),
	                hoverClassArr = hoverCssClassStyle["class"] || [],
	                hoverStyleObj = hoverCssClassStyle.style || {};
	        }
	        if (typeof tooltipOptions === 'object' && tooltipOptions.enableheadertooltip === true) {
	            tooltipContent = tooltipOptions.headertooltip || headerCellValue;
	            if (typeof tooltipOptions.enableheaderhelpericon === 'boolean') {
	                showTooltipInHelper = tooltipOptions.enableheaderhelpericon;
	            }
	        }
	        return {
	            content: headerCellValue,
	            class: mergedClassArr,
	            style: mergedStyleObj,
	            hoverClass: hoverClassArr,
	            hoverStyle: hoverStyleObj,
	            tooltipContent: tooltipContent,
	            showTooltipInHelper: showTooltipInHelper,
	            params: headerFnParams
	        };
	    };
	    GridData.prototype.getRowMetaInfo = function (rowIndex) {
	        var rowOptions = this._gridConfig.rowoptions;
	        if (typeof rowOptions !== 'undefined') {
	            var values = this.getCurrentRowData(rowIndex).values, rowFnParams = {
	                rowIndex: rowIndex,
	                values: values
	            }, cssClassStyle = this._getRowClassAndStyle(rowFnParams, rowOptions["class"], rowOptions.style), classArr = cssClassStyle["class"] || [], styleObj = cssClassStyle.style || {}, hoverOptions = rowOptions.hover, rowSelection = rowOptions.rowselection;
	            var hoverCssClassStyle = void 0, hoverClassArr = [], hoverStyleObj = {}, selectedClassStyle = void 0, selectedClassArr = [], selectedStyleObj = {};
	            if (typeof hoverOptions === 'object') {
	                hoverCssClassStyle = this._getRowClassAndStyle(rowFnParams, hoverOptions["class"], hoverOptions.style),
	                    hoverClassArr = hoverCssClassStyle["class"] || [],
	                    hoverStyleObj = hoverCssClassStyle.style || {};
	            }
	            if (typeof rowSelection === 'object') {
	                selectedClassStyle = this._getRowClassAndStyle(rowFnParams, rowSelection.selectedrowclass, rowSelection.selectedrowstyle),
	                    selectedClassArr = selectedClassStyle["class"] || [],
	                    selectedStyleObj = selectedClassStyle.style || {};
	            }
	            return {
	                class: classArr,
	                style: styleObj,
	                hoverClass: hoverClassArr,
	                hoverStyle: hoverStyleObj,
	                selectedClass: selectedClassArr,
	                selectedStyle: selectedStyleObj,
	                selected: this._rowSelectedState[rowIndex],
	                params: rowFnParams
	            };
	        }
	        return;
	    };
	    GridData.prototype.getCardHtml = function (recordIndex, template) {
	        var values = this.getCurrentRowData(recordIndex).values, cardFnParams = {
	            recordIndex: recordIndex,
	            values: values
	        };
	        return {
	            content: template.call(this._fnContext, cardFnParams),
	            params: cardFnParams
	        };
	    };
	    GridData.prototype.getMinMaxContent = function (fieldName) {
	        return this.gridDataTable.getColumnExtents(fieldName);
	    };
	    GridData.prototype.setRowSelection = function (rowIndex, isSelect, e) {
	        var _this = this;
	        var dispatchEvent = this._dispatchEvent;
	        this._rowSelectedState[rowIndex] = isSelect;
	        if (dispatchEvent) {
	            (isSelect) ? dispatchEvent('rowselected', rowIndex, e) : dispatchEvent('rowdeselected', rowIndex, e);
	        }
	        visualUtils.update(function (tmpVisualUtils) {
	            if (tmpVisualUtils.gridData)
	                tmpVisualUtils.gridData._rowSelectedState[rowIndex] = _this._rowSelectedState[rowIndex];
	            return tmpVisualUtils;
	        });
	    };
	    GridData.prototype.getRowSelection = function (rowIndex) {
	        return this._rowSelectedState[rowIndex];
	    };
	    GridData.prototype.getRowSelectedState = function () {
	        return this._rowSelectedState;
	    };
	    GridData.prototype.resetRowSelectedState = function () {
	        for (var index = 0; index < this._rowSelectedState.length; index++) {
	            this._rowSelectedState[index] = false;
	        }
	    };
	    GridData.prototype.getLatestSelectedRow = function () {
	        return this._latestSelectedRow;
	    };
	    GridData.prototype.setLatestSelectedRow = function (rowIndex) {
	        this._latestSelectedRow = rowIndex;
	    };
	    GridData.prototype.setRowsSelected = function (rowIndexArr, isSelected) {
	        var validRowArr = [], inValidRowArr = [], gridDataLen = this._rowSelectedState.length;
	        if (typeof rowIndexArr === 'number') {
	            validRowArr.push(rowIndexArr);
	        }
	        else {
	            for (var index = 0; index < rowIndexArr.length; index++) {
	                var element = rowIndexArr[index];
	                if (element === parseInt(element, 10) && (element >= 0 && element < gridDataLen)) {
	                    validRowArr.push(element);
	                }
	                else {
	                    inValidRowArr.push(element);
	                }
	            }
	        }
	        for (var index = 0; index < validRowArr.length; index++) {
	            var validRowIndex = validRowArr[index];
	            this.setRowSelection(validRowIndex, isSelected, UNDEF$1);
	        }
	        if (validRowArr.length)
	            this.reEvaluateGlobalSelectedState();
	        return {
	            validRowArray: validRowArr,
	            inValidRowArray: inValidRowArr
	        };
	    };
	    GridData.prototype.reEvaluateGlobalSelectedState = function () {
	        var _this = this;
	        var selectedState = this._rowSelectedState, selectGlobalState = true;
	        for (var index = 0; index < selectedState.length; index++) {
	            if (!selectedState[index]) {
	                selectGlobalState = false;
	                break;
	            }
	        }
	        if (this.getGlobalSelectedState() !== selectGlobalState) {
	            this.setGlobalSelectedState(selectGlobalState);
	            visualUtils.update(function (tmpVisualUtils) {
	                if (tmpVisualUtils.gridData)
	                    tmpVisualUtils.gridData._globalSelectedState = _this._globalSelectedState;
	                return tmpVisualUtils;
	            });
	        }
	    };
	    return GridData;
	}());

	function deriveColumnTypeFromSchema(colType) {
	    if (typeof colType === 'undefined') {
	        return ColumnType.String;
	    }
	    switch (colType) {
	        case 'datetime':
	            return ColumnType.DateTime;
	        case 'number':
	            return ColumnType.Number;
	        default:
	            return ColumnType.String;
	    }
	}
	//# sourceMappingURL=column-type.js.map

	var GridDataTable = (function () {
	    function GridDataTable(dataTable) {
	        this.setDataTable(dataTable);
	    }
	    Object.defineProperty(GridDataTable.prototype, "gridSchema", {
	        get: function () {
	            return this._schema;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GridDataTable.prototype, "gridData", {
	        get: function () {
	            return this._data;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GridDataTable.prototype, "dataTable", {
	        get: function () {
	            return this._dataTable;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GridDataTable.prototype.setDataTable = function (dataTable) {
	        this._dataTable = dataTable;
	        var dataSchema = this._dataTable.getData();
	        this._data = dataSchema.data;
	        this._schema = dataSchema.schema;
	    };
	    GridDataTable.prototype.getRowData = function (offset, numberOfItems) {
	        return this._dataTable.getData(offset, numberOfItems).data;
	    };
	    GridDataTable.prototype.getTotalRowCount = function () {
	        return this._dataTable.count();
	    };
	    GridDataTable.prototype.getColumnType = function (fieldName) {
	        for (var i = 0; i < this._schema.length; i++) {
	            var val = this._schema[i];
	            if (val.name === fieldName) {
	                return deriveColumnTypeFromSchema(val.type || 'text');
	            }
	        }
	        return;
	    };
	    GridDataTable.prototype.getColumnSchema = function (fieldName) {
	        for (var i = 0; i < this._schema.length; i++) {
	            if (this._schema[i].name === fieldName) {
	                return Object.assign({}, this._schema[i], { index: i });
	            }
	        }
	        return;
	    };
	    GridDataTable.prototype.getColumnExtents = function (fieldName) {
	        var colSchema = this.getColumnSchema(fieldName);
	        if (typeof colSchema !== 'undefined') {
	            if (colSchema.type === 'number' || colSchema.type === 'datetime') {
	                var columnExtents = this._dataTable.extents(fieldName);
	                return {
	                    min: columnExtents.min,
	                    max: columnExtents.max
	                };
	            }
	            var data = this._data;
	            var cellContent = void 0, minContent = void 0, maxContent = void 0, minLength = void 0, maxLength = void 0, cellLength = void 0;
	            minContent = maxContent = data[0][colSchema.index];
	            minLength = maxLength = maxContent.length;
	            for (var i = 1; i < data.length; i++) {
	                cellContent = data[i][colSchema.index];
	                if (cellContent != null) {
	                    cellLength = cellContent.length;
	                    if (cellLength > maxLength) {
	                        maxContent = cellContent;
	                        maxLength = cellLength;
	                    }
	                    else if (cellLength < minLength) {
	                        minContent = cellContent;
	                        minLength = cellLength;
	                    }
	                }
	            }
	            return {
	                min: minContent || '',
	                max: maxContent || ''
	            };
	        }
	        return;
	    };
	    return GridDataTable;
	}());
	//# sourceMappingURL=grid-datatable.js.map

	var GridException = {
	    parameterMissing: 'Unable to render grid. DOM Container or data is missing in grid initialization.',
	    containerNotElement: 'Grid conatiner must be HTML element',
	    dataNotDataTable: 'Data must be passed to grid as DataTable object',
	    fieldNotFound: 'Except an HTML type column, all columns must define a field property. This denotes the column/field of data table with which this column is bound to.',
	    fieldError: 'The field property of a columm must refer to an existing column of DataTable. Field: {0} is not found in DataTable',
	    inlineChartTypeMismatch: '{0} is not a number type field and can not be used for inline charts.',
	    noColumnFound: 'No columns to show. Column definition do not match with schema provided',
	    minGreaterMaxWidth: 'Both minimum and maximum width value is ignored for column {0} as minimum value is greater than maximum value',
	    viewportAdditionFail: 'Failed to add one or more viewports due lack of mandatory information(s)',
	    invalidDefaultPageSize: 'Provided default page size is not valid, hence the first value from "options" is set as default page size',
	    invalidPageSizeOptionsArr: 'All page size options in the provided array is non numeric or invalid',
	    invalidPageSizeOptions: 'Options array for page size can only be a boolean value or numeric array',
	    sizeColumnsToFitFailed: 'Columns can not be fit inside viewing area maintaining the minimum width of column.',
	    sizeColumnsToContentFailedForColumn: 'Unable to apply fit to content behavior for invalid column indices.',
	    invalidRowHeight: 'Value provied for attribute rowHeight is not a valid number',
	    invalidHeaderRowHeight: 'Value provied for attribute headerRowHeight is not a valid number',
	    inValidColumnIndex: 'Value provided as columnIndex is not a valid whole number',
	    acceptsOnlyArrayAsInput: 'Invalid value provided, the API accepts only array as input'
	};
	//# sourceMappingURL=grid-core.js.map

	var PaginationException = {
	    invalidPageNumber: 'Invalid page number'
	};
	//# sourceMappingURL=pagination.js.map

	var ROW_SELECTION_ERROR_MESSAGE = {
	    invalidRowIndexs: 'Values passed as row indexes are invalid.',
	    enableSelection: 'Selection feature is not enabled, please set enable: true in rowSelection configuration',
	    enableMultiRowSelectionForRowIndicesSelection: 'To select mentioned rows, enable multiple row selection feature by setting showSelectionFeature: true in rowSelection configuration',
	    enableMultiRowSelectionForRowIndicesDeselection: 'To deselect mentioned rows, enable multiple row selection feature by setting showSelectionFeature: true in rowSelection configuration',
	    enableMultiRowSelectionForAllRowsSelection: 'To select all rows, enable multiple row selection feature by setting showSelectionFeature: true in rowSelection configuration',
	    enableMultiRowSelectionForAllRowsDeselection: 'To dselect all rows, enable multiple row selection feature by setting showSelectionFeature: true in rowSelection configuration'
	};
	//# sourceMappingURL=row-selection.js.map

	var GridWarningMessage = {
	    columnsBuiltFromSchema: 'Columns are not mentioned in grid configuration. Hence, all columns are picked from DataTable schema.'
	};
	//# sourceMappingURL=grid-core.js.map

	var autoHeight = writable(false), vizRecordDomain = writable({}), paginationState = writable({}), layoutObject = writable({}), gridDimensions = writable({});
	//# sourceMappingURL=grid-state.js.map

	function convertKeysToLowerCase(obj, ignorableProps, valsToConvert, willIgnore) {
	  if (willIgnore === void 0) {
	    willIgnore = false;
	  }

	  var type = _typeof(obj);

	  if (obj === null || type === 'undefined') {
	    return obj;
	  }

	  if (Array.isArray(obj)) {
	    var arr = [];

	    for (var i = 0; i < obj.length; i++) {
	      arr.push(convertKeysToLowerCase(obj[i], ignorableProps, valsToConvert));
	    }

	    return arr;
	  }

	  if (type === 'object') {
	    var clonedObj = {};

	    for (var prop in obj) {
	      var lowerCaseProp = willIgnore ? prop : prop.toLowerCase();

	      if (lowerCaseProp === 'data') {
	        if (obj[prop] && obj[prop]._dataStore) {
	          clonedObj[lowerCaseProp] = obj[prop];
	        } else {
	          clonedObj[lowerCaseProp] = convertKeysToLowerCase(obj[prop], ignorableProps, valsToConvert);
	        }

	        continue;
	      }

	      clonedObj[lowerCaseProp] = convertKeysToLowerCase(obj[prop], ignorableProps, valsToConvert, ignorableProps ? ignorableProps.indexOf(lowerCaseProp) > -1 : false);

	      if (valsToConvert && valsToConvert.indexOf(lowerCaseProp) > -1 && typeof clonedObj[lowerCaseProp] === 'string') {
	        clonedObj[lowerCaseProp] = clonedObj[lowerCaseProp].toLowerCase();
	      }
	    }

	    return clonedObj;
	  }

	  return obj;
	}

	function isMergeableObject(obj) {
	  var isObject = obj && _typeof(obj) === 'object';
	  return isObject && Object.prototype.toString.call(obj) !== '[object RegExp]' && Object.prototype.toString.call(obj) !== '[object Date]';
	}

	function clone(obj) {
	  var blankValue = Array.isArray(obj) ? [] : {};
	  return isMergeableObject(obj) ? mergeDeep(blankValue, obj) : obj;
	}

	function mergeArray(target, source) {
	  var output = target.slice();
	  source.forEach(function (value, index) {
	    if (typeof output[index] === 'undefined') {
	      output[index] = clone(value);
	    } else if (isMergeableObject(value)) {
	      output[index] = mergeDeep(target[index], value);
	    } else if (target.indexOf(value) === -1) {
	      output.push(clone(value));
	    }
	  });
	  return output;
	}

	function mergeObject(target, source) {
	  var output = {};

	  if (isMergeableObject(target)) {
	    Object.keys(target).forEach(function (attr) {
	      output[attr] = clone(target[attr]);
	    });
	  }

	  Object.keys(source).forEach(function (attr) {
	    if (!isMergeableObject(source[attr]) || !target[attr]) {
	      output[attr] = clone(source[attr]);
	    } else {
	      output[attr] = mergeDeep(target[attr], source[attr]);
	    }
	  });
	  return output;
	}

	function mergeDeep() {
	  var objects = [];

	  for (var _i = 0; _i < arguments.length; _i++) {
	    objects[_i] = arguments[_i];
	  }

	  return objects.reduce(function (prev, obj) {
	    if (Array.isArray(obj)) {
	      return Array.isArray(prev) ? mergeArray(prev, obj) : clone(obj);
	    }

	    return mergeObject(prev, obj);
	  });
	}

	function formatString() {
	  var format = [];

	  for (var _i = 0; _i < arguments.length; _i++) {
	    format[_i] = arguments[_i];
	  }

	  var args = format.slice(1);
	  var mainStr = format[0];
	  return mainStr.replace(/{(\d+)}/g, function (match, index) {
	    return typeof args[index] !== 'undefined' ? args[index] : match;
	  });
	}

	function captalizeFirstLetter(str) {
	  return typeof str === 'undefined' ? str : str.charAt(0).toLocaleUpperCase() + str.slice(1);
	}

	var preventDefaultHandler = function preventDefaultHandler() {
	  this.originalEvent && this.originalEvent.preventDefault();
	},
	    stopPropagationHandler = function stopPropagationHandler() {
	  this.originalEvent && this.originalEvent.stopPropagation();
	};

	var EventManager = function () {
	  function EventManager(config) {
	    this._evtListeners = {};
	    var evtManager = this,
	        events = config.events,
	        evtListener,
	        lowerCaseEvtName;
	    this._context = config.context;

	    if (events) {
	      for (var key in events) {
	        lowerCaseEvtName = key.toLocaleLowerCase();

	        if (!(evtListener = evtManager._evtListeners[lowerCaseEvtName])) {
	          evtListener = evtManager._evtListeners[lowerCaseEvtName] = [];
	        }

	        if (typeof events[key] === 'function') {
	          evtListener.push({
	            handlerFn: events[key],
	            context: this._context
	          });
	        }
	      }
	    }

	    this.dispatchEvent = function (eventName, payload, eventObj, explicitContext) {
	      var sender = this,
	          eventListeners = evtManager._evtListeners[eventName],
	          eventData;

	      if (eventListeners && eventListeners.length) {
	        eventData = {
	          type: eventName,
	          originalEvent: eventObj,
	          data: payload,
	          sender: sender,
	          preventDefault: preventDefaultHandler,
	          stopPropagation: stopPropagationHandler
	        };
	        eventListeners.forEach(function (eventListener) {
	          eventListener.handlerFn && eventListener.handlerFn.call(explicitContext || eventListener.context, eventData, payload);
	        });
	      }
	    };
	  }

	  EventManager.prototype.addEventListener = function (eventName, handler) {
	    var _evtListeners = this._evtListeners,
	        evtListener,
	        evtName = eventName.toLowerCase();

	    if (!(evtListener = _evtListeners[evtName])) {
	      evtListener = _evtListeners[evtName] = [];
	    }

	    if (typeof handler === 'function') {
	      evtListener.push({
	        handlerFn: handler,
	        context: this._context
	      });
	    }
	  };

	  EventManager.prototype.removeEventListener = function (eventName, handler) {
	    var _evtListeners = this._evtListeners,
	        evtListener = _evtListeners[eventName] || [],
	        evtName = eventName.toLowerCase();
	    _evtListeners[evtName] = evtListener.filter(function (evtObj) {
	      return evtObj.handlerFn !== handler;
	    });
	  };

	  EventManager.prototype.getAllListeners = function () {
	    return this._evtListeners;
	  };

	  return EventManager;
	}();

	function syncScroll(listener, listenTo, direction, listenRecursively) {
	  if (listenRecursively === void 0) {
	    listenRecursively = true;
	  }

	  var donotScrollListenTo = false,
	      donotScrollListener = false,
	      scrollProp = direction === 'horizontal' ? 'scrollLeft' : 'scrollTop';

	  listenTo.onscroll = function () {
	    if (!donotScrollListenTo) {
	      donotScrollListener = true;
	      listener[scrollProp] = listenTo[scrollProp];
	    }

	    donotScrollListenTo = false;
	  };

	  if (listenRecursively) {
	    listener.onscroll = function () {
	      if (!donotScrollListener) {
	        donotScrollListenTo = true;
	        listenTo[scrollProp] = listener[scrollProp];
	      }

	      donotScrollListener = false;
	    };
	  }
	}

	var UnitType;

	(function (UnitType) {
	  UnitType["px"] = "px";
	  UnitType["em"] = "em";
	  UnitType["rem"] = "rem";
	  UnitType["pt"] = "pt";
	  UnitType["percentage"] = "%";
	})(UnitType || (UnitType = {}));
	function getSpanDimension(document, container, styleObj, value) {
	  if (styleObj === void 0) {
	    styleObj = {};
	  }

	  if (value === void 0) {
	    value = 'WHOM';
	  }

	  var spanhEle = document.createElement('span'),
	      dim,
	      styleStr = '';
	  spanhEle.innerHTML = value;

	  if (styleObj) {
	    for (var key in styleObj) {
	      styleStr += key + ":" + styleObj[key] + ";";
	    }
	  }

	  spanhEle.setAttribute('style', styleStr);
	  container.appendChild(spanhEle);
	  dim = {
	    width: spanhEle.offsetWidth,
	    height: spanhEle.offsetHeight
	  };
	  container.removeChild(spanhEle);
	  return dim;
	}

	function parseLengthUnit(val, lengthUnitsObject, lengthType) {
	  var parsedNum,
	      tmpVal = val,
	      regToCheckValidInput = /^([+]?(\d+|\.\d+|\d+\.\d+|\d+\.)(px|em|rem|%|pt))$/i,
	      regToReplaceUnits = /px|em|rem|%|pt/gi;

	  if (typeof tmpVal === 'number' && tmpVal > 0) {
	    parsedNum = tmpVal;
	  } else if (typeof tmpVal === 'string') {
	    tmpVal = tmpVal.trim();

	    if (regToCheckValidInput.test(tmpVal)) {
	      parsedNum = Number(tmpVal.replace(regToReplaceUnits, ''));
	      var matchedUnit = regToReplaceUnits.exec(tmpVal);

	      if (matchedUnit) {
	        if (matchedUnit[0] === '%') {
	          lengthType === 'height' && (parsedNum *= lengthUnitsObject.hPercentage);
	          lengthType === 'width' && (parsedNum *= lengthUnitsObject.wPercentage);
	        } else {
	          parsedNum *= lengthUnitsObject[matchedUnit[0]];
	        }
	      }
	    } else if (Number(tmpVal) > 0) {
	      parsedNum = Number(tmpVal);
	    }
	  }

	  return parsedNum;
	}

	var Logger = function () {
	  function Logger(resolver, sender) {
	    this.ErrorEventName = 'error';
	    this.WarningEventName = 'warning';
	    this.InfoEventName = 'info';
	    this._resolver = resolver;
	    this._sender = sender || this;
	  }

	  Logger.prototype.error = function (msg, payload) {
	    this._resolver.call(this._sender, this.ErrorEventName, {
	      msg: msg,
	      info: payload
	    });
	  };

	  Logger.prototype.warn = function (msg, payload) {
	    this._resolver.call(this._sender, this.WarningEventName, {
	      msg: msg,
	      info: payload
	    });
	  };

	  Logger.prototype.info = function (msg, payload) {
	    this._resolver.call(this._sender, this.InfoEventName, {
	      msg: msg,
	      info: payload
	    });
	  };

	  return Logger;
	}();

	var isNaturalNumber = function isNaturalNumber(x) {
	  return typeof x === 'number' && !isNaN(x - x) && x > 0 && Math.floor(x) === x;
	},
	    isWholeNumber = function isWholeNumber(x) {
	  return typeof x === 'number' && !isNaN(x - x) && x >= 0 && Math.floor(x) === x;
	};

	var MIN_COLUMN_WIDTH = 0;
	var DENSITY_TO_PX_MAP = {
	    default: 10,
	    compact: 8,
	    comfortable: 12
	}, DEFAULT_CHECKBOX_LEFT_PADDING = 16, DEFAULT_CHECKBOX_RIGHT_PADDING = 16, DEFAULT_CHECKBOX_WIDTH = 16, DEFAULT_CHECKBOX_COLUMN_WIDTH = DEFAULT_CHECKBOX_LEFT_PADDING + DEFAULT_CHECKBOX_WIDTH + DEFAULT_CHECKBOX_RIGHT_PADDING, DEFAULT_ROW_HEIGHT = 12, DEFAULT_INLINE_CHART_FONT_SIZE = 12, DEFAULT_COLUMN_WIDTH = 200, DEFAULT_ROW_LEFT_MARGIN = 30, DEFAULT_ROW_RIGHT_MARGIN = 30, DEFAULT_DENSED_ROW_HEIGHT = DEFAULT_ROW_HEIGHT + 2 * DENSITY_TO_PX_MAP[LayoutDensityType.Default], DEFAULT_VALUE_TEXT_POSITION = ValueTextPositionType.right, DEFAULT_VALUE_TEXT_ALIGNMENT = ValueTextAlignmentType.end, DEFAULT_CARD_PADDING = 15, DEFAULT_CARD_WIDTH = 300, DEFAULT_CARD_CONTAINER_TOP_BORDER = 1, DEFAULT_CARD_CONTAINER_BOTTOM_BORDER = 1, DEFAULT_CARD_CONTAINER_LEFT_BORDER = 1, DEFAULT_CARD_CONTAINER_RIGHT_BORDER = 1, DEFAULT_CARD_INFO_ROW_HEIGHT_CARD = 20, DEFAULT_CARD_CONTAINER_TOP_PADDING = 16.5, DEFAULT_CARD_CONTAINER_BOTTOM_PADDING = 16.5, DEFAULT_CARD_CONTAINER_LEFT_PADDING = 16.5, DEFAULT_CARD_CONTAINER_RIGHT_PADDING = 16.5, DEFAULT_CARD_INFO_ROW_TOP_PADDING = 0, DEFAULT_CARD_INFO_ROW_BOTTOM_PADDING = 0, DEFAULT_CARD_INFO_ROW_LEFT_PADDING = 0, DEFAULT_CARD_INFO_ROW_RIGHT_PADDING = 0, DEFAULT_CREDIT_LABEL_HEIGHT = 25, DEFAULT_PAGINATION_ROW_HEIGHT = 35, CARD_TEMPLATE_ONE_CONFIG = {
	    cardBorderTop: DEFAULT_CARD_CONTAINER_TOP_BORDER,
	    cardBorderBottom: DEFAULT_CARD_CONTAINER_BOTTOM_BORDER,
	    cardBorderLeft: DEFAULT_CARD_CONTAINER_LEFT_BORDER,
	    cardBorderRight: DEFAULT_CARD_CONTAINER_RIGHT_BORDER,
	    cardTopPadding: DEFAULT_CARD_CONTAINER_TOP_PADDING,
	    cardBottomPadding: DEFAULT_CARD_CONTAINER_BOTTOM_PADDING,
	    cardLeftPadding: DEFAULT_CARD_CONTAINER_LEFT_PADDING,
	    cardRightPadding: DEFAULT_CARD_CONTAINER_RIGHT_PADDING,
	    cardInfoRowTopPadding: DEFAULT_CARD_INFO_ROW_TOP_PADDING,
	    cardInfoRowBottomPadding: DEFAULT_CARD_INFO_ROW_BOTTOM_PADDING,
	    cardInfoRowLeftPadding: DEFAULT_CARD_INFO_ROW_LEFT_PADDING,
	    cardInfoRowRightPadding: DEFAULT_CARD_INFO_ROW_RIGHT_PADDING,
	    cardInfoRowHeight: DEFAULT_CARD_INFO_ROW_HEIGHT_CARD
	}, setMinColumnWidth = function (container) {
	    var fontSize = '' + window.getComputedStyle(container).fontSize, styleObject = {
	        'font-size': fontSize
	    };
	    MIN_COLUMN_WIDTH = 32 + getSpanDimension(document, container, styleObject, 'W...').width;
	}, getMinColumnWidth = function () { return MIN_COLUMN_WIDTH; }, dummyFunc = function () { return; }, parseBoolean = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (typeof arguments[i] === 'boolean') {
	            return arguments[i];
	        }
	    }
	    return false;
	}, parseNumber = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (typeof arguments[i] === 'number' && !isNaN(arguments[i])) {
	            return arguments[i];
	        }
	    }
	    return;
	};
	//# sourceMappingURL=helpers.js.map

	var nav = window.navigator,
	    isIE11 = /trident/i.test(nav.userAgent) && /rv:11/i.test(nav.userAgent),
	    isEdge = /Edg/.test(nav.userAgent),
	    isIOS = /iPad|iPhone|iPod/.test(nav.platform) || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1;

	function isEqualObject(obj1, obj2) {
	    return JSON.stringify(obj1) === JSON.stringify(obj2);
	}
	//# sourceMappingURL=obj-eq-ckeck.js.map

	var _a;
	var DeviceType;
	(function (DeviceType) {
	    DeviceType["MOBILE"] = "mobile";
	    DeviceType["TABLET_PORTRAIT"] = "tablet-portrait";
	    DeviceType["TABLET_LANDCSAPE"] = "tablet-landscape";
	    DeviceType["DESKTOP"] = "desktop";
	    DeviceType["LARGE_DESKTOP"] = "large-desktop";
	})(DeviceType || (DeviceType = {}));
	var OrientationEvents;
	(function (OrientationEvents) {
	    OrientationEvents["Resize"] = "resize";
	    OrientationEvents["OrientationChange"] = "orientationchange";
	})(OrientationEvents || (OrientationEvents = {}));
	var DEFAULT_VIEWPORTS = [
	    {
	        name: DeviceType.MOBILE,
	        minscreenwidth: 0,
	        maxscreenwidth: 550,
	        config: {
	            columns: [],
	            layout: {
	                type: LayoutType.Card
	            }
	        }
	    },
	    {
	        name: DeviceType.TABLET_PORTRAIT,
	        minscreenwidth: 551,
	        maxscreenwidth: 1023,
	        config: {
	            columns: [],
	            layout: {
	                type: LayoutType.Card
	            }
	        }
	    },
	    {
	        name: DeviceType.TABLET_LANDCSAPE,
	        minscreenwidth: 1024,
	        maxscreenwidth: 1199,
	        config: {
	            columns: [],
	            layout: {
	                type: LayoutType.Row,
	                density: LayoutDensityType.Compact
	            }
	        }
	    },
	    {
	        name: DeviceType.DESKTOP,
	        minscreenwidth: 1200,
	        maxscreenwidth: 1399,
	        config: {
	            columns: [],
	            layout: {
	                type: LayoutType.Row,
	                density: LayoutDensityType.Default
	            }
	        }
	    },
	    {
	        name: DeviceType.LARGE_DESKTOP,
	        minscreenwidth: 1400,
	        config: {
	            columns: [],
	            layout: {
	                type: LayoutType.Row,
	                density: LayoutDensityType.Comfortable
	            }
	        }
	    }
	], isDefined = function (value) {
	    return !isNaN(+value) && value !== null && +value !== Infinity;
	}, getScreenWidth = function () {
	    return !isIOS
	        ? window.screen.width
	        : window.orientation === 90 || window.orientation === -90
	            ? window.screen.height : window.screen.width;
	}, extViewportValidateQuery = function (conf) {
	    if (!(isDefined(conf.minscreenwidth) || isDefined(conf.maxscreenwidth))) {
	        return false;
	    }
	    else if (isDefined(conf.minscreenwidth) &&
	        isDefined(conf.maxscreenwidth)) {
	        return conf.minscreenwidth < conf.maxscreenwidth;
	    }
	    return true;
	}, isModifiedViewport = function (viewport) {
	    var name = viewport.name || "";
	    return (name === DeviceType.MOBILE ||
	        name === DeviceType.TABLET_PORTRAIT ||
	        name === DeviceType.TABLET_LANDCSAPE ||
	        name === DeviceType.DESKTOP ||
	        name === DeviceType.LARGE_DESKTOP);
	}, isCustomViewport = function (viewport) {
	    var name = viewport.name || "";
	    return (name !== DeviceType.MOBILE &&
	        name !== DeviceType.TABLET_PORTRAIT &&
	        name !== DeviceType.TABLET_LANDCSAPE &&
	        name !== DeviceType.DESKTOP &&
	        name !== DeviceType.LARGE_DESKTOP);
	}, getUniqueViewports = function (viewports) {
	    var revViewports = viewports.reverse(), uniqueViewports, entryFlags = {};
	    uniqueViewports = revViewports.filter(function (viewport) {
	        if (!entryFlags[viewport.name]) {
	            return (entryFlags[viewport.name] = true);
	        }
	        return false;
	    });
	    return uniqueViewports.reverse();
	}, getContainingViewport = function (value, viewports) {
	    var i, viewport, containingViewport;
	    for (i = viewports.length - 1; i >= 0; i--) {
	        viewport = viewports[i];
	        if (!viewport.maxscreenwidth && value >= viewport.minscreenwidth) {
	            containingViewport = viewport;
	            break;
	        }
	        else if (value >= viewport.minscreenwidth &&
	            value <= viewport.maxscreenwidth) {
	            containingViewport = viewport;
	            break;
	        }
	    }
	    return containingViewport;
	}, defaultViewportMap = (_a = {},
	    _a[DeviceType.MOBILE] = {
	        index: 0,
	        prev: null,
	        next: DeviceType.TABLET_PORTRAIT
	    },
	    _a[DeviceType.TABLET_PORTRAIT] = {
	        index: 1,
	        prev: DeviceType.MOBILE,
	        next: DeviceType.TABLET_LANDCSAPE
	    },
	    _a[DeviceType.TABLET_LANDCSAPE] = {
	        index: 2,
	        prev: DeviceType.TABLET_PORTRAIT,
	        next: DeviceType.DESKTOP
	    },
	    _a[DeviceType.DESKTOP] = {
	        index: 3,
	        prev: DeviceType.TABLET_LANDCSAPE,
	        next: DeviceType.LARGE_DESKTOP
	    },
	    _a[DeviceType.LARGE_DESKTOP] = {
	        index: 4,
	        prev: DeviceType.DESKTOP,
	        next: null
	    },
	    _a);
	var ViewportManager = (function () {
	    function ViewportManager(input) {
	        var _this = this;
	        this.currentLayout = {};
	        this._followers = {};
	        this._allowSwitch = true;
	        this._dispatchEvent = dummyFunc;
	        this._extLayout = {};
	        this.config = {
	            viewportChanged: false,
	            defaultLayout: {
	                type: LayoutType.Row
	            }
	        };
	        this._logger = input.logger;
	        this.config.externalViewports = getUniqueViewports(input.externalViewports);
	        this._extLayout = input.extLayout;
	        this._setDefaults();
	        this.currentScreenWidth = getScreenWidth();
	        this.orientationHandler = function () {
	            _this._allowSwitch && _this._calculateViewport(_this.currentScreenWidth = getScreenWidth());
	        };
	        visualUtils.subscribe(function (util) {
	            _this._dispatchEvent = util.dispatchEvent;
	        });
	        this._configure();
	    }
	    ViewportManager.prototype.setSwitch = function (allow) {
	        if (allow === void 0) { allow = true; }
	        this._allowSwitch = allow;
	    };
	    ViewportManager.prototype._setDefaults = function () {
	        var config = this.config;
	        config.defaultViewports = DEFAULT_VIEWPORTS;
	        config.disableSwitch = false;
	        config.enableSwitch = true;
	    };
	    ViewportManager.prototype._configure = function () {
	        var config = this.config;
	        config.rawCustomViewports = config.externalViewports.filter(isCustomViewport);
	        config.rawModifiedViewports = config.externalViewports.filter(isModifiedViewport);
	        config.sanitizedDefaultViewports = this._sanitizeDefaultViewports(this._extLayout);
	        config.sanitizedCustomViewports = this._sanitizeCustomViewports(config.rawCustomViewports);
	        config.sanitizedModifiedViewports = this._sanitizeModifiedViewports(config.rawModifiedViewports);
	        this._calculateViewport(this.currentScreenWidth);
	    };
	    ViewportManager.prototype._sanitizeDefaultViewports = function (extLayout) {
	        if (extLayout === void 0) { extLayout = {}; }
	        var sanitizedDefaultViewports = [], defaultViewports = this.config.defaultViewports, viewport;
	        for (var i = 0; i < defaultViewports.length; i++) {
	            viewport = clone(defaultViewports[i]);
	            viewport.config.layout = _assign(_assign({}, viewport.config.layout), extLayout);
	            sanitizedDefaultViewports.push(viewport);
	        }
	        return sanitizedDefaultViewports;
	    };
	    ViewportManager.prototype._sanitizeCustomViewports = function (customViewports) {
	        var config = this.config, defaultViewports = config.defaultViewports || [], layout, sanitizedCustomViewports;
	        sanitizedCustomViewports = customViewports.filter(extViewportValidateQuery);
	        if (sanitizedCustomViewports.length < customViewports.length) {
	            this._logger.error(GridException.viewportAdditionFail);
	        }
	        sanitizedCustomViewports.forEach(function (viewport) {
	            if (!isDefined(viewport.minscreenwidth) ||
	                !isDefined(viewport.maxscreenwidth)) {
	                if (isDefined(viewport.minscreenwidth)) {
	                    viewport.maxscreenwidth = getContainingViewport(viewport.minscreenwidth, defaultViewports).maxscreenwidth;
	                }
	                else {
	                    viewport.minscreenwidth = getContainingViewport(viewport.maxscreenwidth, defaultViewports).minscreenwidth;
	                }
	            }
	            layout = (viewport.config && viewport.config.layout) || {};
	            if (layout.type === LayoutType.Row && !layout.density) {
	                layout.density = LayoutDensityType.Default;
	            }
	            else if (layout.density && !layout.type) {
	                layout.type = LayoutType.Row;
	            }
	            else if (layout.cardtemplate && !layout.type) {
	                layout.type = LayoutType.Card;
	            }
	        });
	        return sanitizedCustomViewports;
	    };
	    ViewportManager.prototype._sanitizeModifiedViewports = function (modifiedViewports) {
	        var config = this.config, defaultViewports = config.defaultViewports, defaultConfig, viewportMeta, prevModifiedViewport, nextModifiedViewport, prevDefaultViewport, nextDefaultViewport, finalModifiedViewports = [], sortedModifiedViewports;
	        if (!modifiedViewports.length) {
	            return [];
	        }
	        sortedModifiedViewports = modifiedViewports.sort(function (viewport1, viewport2) {
	            return (defaultViewportMap[viewport1.name].index -
	                defaultViewportMap[viewport2.name].index);
	        });
	        sortedModifiedViewports.forEach(function (viewport, i) {
	            viewportMeta = defaultViewportMap[viewport.name];
	            defaultConfig = defaultViewports[viewportMeta.index];
	            prevDefaultViewport =
	                defaultViewports[viewportMeta.index - 1] &&
	                    defaultViewports[viewportMeta.index - 1];
	            nextDefaultViewport =
	                defaultViewports[viewportMeta.index + 1] &&
	                    defaultViewports[viewportMeta.index + 1];
	            prevModifiedViewport =
	                sortedModifiedViewports[i - 1] &&
	                    sortedModifiedViewports[i - 1].name === prevDefaultViewport.name
	                    && sortedModifiedViewports[i - 1];
	            nextModifiedViewport =
	                sortedModifiedViewports[i + 1] &&
	                    sortedModifiedViewports[i + 1].name === nextDefaultViewport.name
	                    && sortedModifiedViewports[i + 1];
	            viewport.config = viewport.config || {};
	            if (!isDefined(viewport.minscreenwidth)) {
	                if (prevModifiedViewport && prevModifiedViewport.maxscreenwidth) {
	                    viewport.minscreenwidth = prevModifiedViewport.maxscreenwidth + 1;
	                }
	                else {
	                    viewport.minscreenwidth = defaultConfig.minscreenwidth;
	                }
	                viewport.config.layout = _assign(_assign({}, defaultConfig.config.layout), viewport.config.layout);
	                finalModifiedViewports.push(viewport);
	                if (!nextModifiedViewport &&
	                    nextDefaultViewport &&
	                    Math.abs(nextDefaultViewport.minscreenwidth - viewport.maxscreenwidth) > 1) {
	                    finalModifiedViewports.push({
	                        name: nextDefaultViewport.name,
	                        minscreenwidth: viewport.maxscreenwidth + 1,
	                        maxscreenwidth: nextDefaultViewport.maxscreenwidth,
	                        config: {
	                            columns: [],
	                            layout: nextDefaultViewport.config.layout
	                        }
	                    });
	                }
	            }
	            else if (!isDefined(viewport.maxscreenwidth)) {
	                if (nextModifiedViewport && nextModifiedViewport.minscreenwidth) {
	                    viewport.maxscreenwidth = nextModifiedViewport.minscreenwidth - 1;
	                }
	                else {
	                    viewport.maxscreenwidth = defaultConfig.maxscreenwidth;
	                }
	                viewport.config.layout = _assign(_assign({}, defaultConfig.config.layout), viewport.config.layout);
	                if (!prevModifiedViewport &&
	                    prevDefaultViewport &&
	                    Math.abs(viewport.minscreenwidth - prevDefaultViewport.maxscreenwidth) > 1) {
	                    finalModifiedViewports.push({
	                        name: prevDefaultViewport.name,
	                        minscreenwidth: prevDefaultViewport.minscreenwidth,
	                        maxscreenwidth: viewport.minscreenwidth - 1,
	                        config: {
	                            columns: [],
	                            layout: prevDefaultViewport.config.layout
	                        }
	                    });
	                }
	                finalModifiedViewports.push(viewport);
	            }
	            else {
	                viewport.config.layout = _assign(_assign({}, defaultConfig.config.layout), viewport.config.layout);
	                if (!prevModifiedViewport &&
	                    prevDefaultViewport &&
	                    Math.abs(viewport.minscreenwidth - prevDefaultViewport.maxscreenwidth) > 1) {
	                    finalModifiedViewports.push({
	                        name: prevDefaultViewport.name,
	                        minscreenwidth: prevDefaultViewport.minscreenwidth,
	                        maxscreenwidth: viewport.minscreenwidth - 1,
	                        config: {
	                            columns: [],
	                            layout: prevDefaultViewport.config.layout
	                        }
	                    });
	                }
	                finalModifiedViewports.push(viewport);
	                if (!nextModifiedViewport &&
	                    nextDefaultViewport &&
	                    Math.abs(nextDefaultViewport.minscreenwidth - viewport.maxscreenwidth) > 1) {
	                    finalModifiedViewports.push({
	                        name: nextDefaultViewport.name,
	                        minscreenwidth: viewport.maxscreenwidth + 1,
	                        maxscreenwidth: nextDefaultViewport.maxscreenwidth,
	                        config: {
	                            columns: [],
	                            layout: nextDefaultViewport.config.layout
	                        }
	                    });
	                }
	            }
	        });
	        return finalModifiedViewports;
	    };
	    ViewportManager.prototype.addViewport = function (viewport) {
	        var config = this.config, existingConfig, atIndex;
	        if (isCustomViewport(viewport) && extViewportValidateQuery(viewport)) {
	            if ((existingConfig = config.rawCustomViewports.filter(function (currViewport, index) {
	                if (currViewport.name === viewport.name) {
	                    atIndex = index;
	                    return true;
	                }
	                return false;
	            })[0])) {
	                config.rawCustomViewports[atIndex] = _assign(_assign({}, existingConfig), viewport);
	            }
	            else {
	                config.rawCustomViewports.push(viewport);
	            }
	            config.sanitizedCustomViewports = this._sanitizeCustomViewports(config.rawCustomViewports);
	        }
	        else {
	            if ((existingConfig = config.rawModifiedViewports.filter(function (currViewport, index) {
	                if (currViewport.name === viewport.name) {
	                    atIndex = index;
	                    return true;
	                }
	                return false;
	            })[0])) {
	                config.rawModifiedViewports[atIndex] = _assign(_assign({}, existingConfig), viewport);
	            }
	            else {
	                config.rawModifiedViewports.push(viewport);
	            }
	            config.sanitizedModifiedViewports = this._sanitizeCustomViewports(config.rawModifiedViewports);
	        }
	        this._calculateViewport(this.currentScreenWidth);
	    };
	    ViewportManager.prototype.getAllViewports = function () {
	        var config = this.config;
	        return __spreadArrays(config.rawModifiedViewports, config.defaultViewports.filter(function (defaultViewport) {
	            return !config.rawModifiedViewports.filter(function (modifiedViewport) {
	                return modifiedViewport.name === defaultViewport.name;
	            }).length;
	        }), config.rawCustomViewports);
	    };
	    ViewportManager.prototype.addFollower = function (childName, childClass, childConfig, callback) {
	        var manager = this, currenViewport = manager.getCurrentViewport(), _clildClass = childClass, child;
	        manager._followers[childName] = child = new _clildClass(_assign({ layoutConfig: _assign({}, currenViewport.config.layout) }, childConfig));
	        callback && callback.call(child);
	    };
	    ViewportManager.prototype._calculateViewport = function (screenWidth) {
	        var config = this.config, sanitizedDefaultViewports = config.sanitizedDefaultViewports, sanitizedCustomViewports = config.sanitizedCustomViewports, sanitizedModifiedViewports = config.sanitizedModifiedViewports, currViewportObject = config.currViewportObject, viewportChanged = false, followers = this._followers, derivedViewport, dispatchEvent = this._dispatchEvent;
	        visualUtils.subscribe(function (util) {
	            dispatchEvent = util.dispatchEvent;
	        });
	        derivedViewport = (getContainingViewport(screenWidth, sanitizedCustomViewports) ||
	            getContainingViewport(screenWidth, sanitizedModifiedViewports) ||
	            getContainingViewport(screenWidth, sanitizedDefaultViewports));
	        if (currViewportObject) {
	            viewportChanged = !isEqualObject(currViewportObject, derivedViewport);
	            viewportChanged &&
	                (config.prevViewportObject = config.currViewportObject);
	        }
	        else {
	            this.currentLayout = Object.assign({}, config.defaultLayout, derivedViewport.config && derivedViewport.config.layout);
	        }
	        config.currViewportObject = derivedViewport;
	        if (viewportChanged) {
	            this.currentLayout = Object.assign({}, config.defaultLayout, derivedViewport.config && derivedViewport.config.layout, config.defaultLayout);
	            dispatchEvent.call(this, 'layoutChanged', {
	                layout: this.currentLayout,
	                viewport: derivedViewport
	            });
	            if (this.currentLayout !== config.prevViewportObject.config.layout.type) {
	                dispatchEvent.call(this, 'layoutTypeChanged', {
	                    layoutType: this.currentLayout.type,
	                    prevLayoutType: config.prevViewportObject.config.layout.type,
	                    layout: this.currentLayout,
	                    viewport: derivedViewport
	                });
	            }
	            for (var key in followers) {
	                followers[key].recalculateLayout(this.currentLayout);
	            }
	        }
	        config.viewportChanged = viewportChanged;
	    };
	    ViewportManager.prototype.getCurrentViewport = function () {
	        return this.config.currViewportObject;
	    };
	    ViewportManager.prototype.getScreenCurrentWidth = function () {
	        return this.currentScreenWidth;
	    };
	    return ViewportManager;
	}());
	//# sourceMappingURL=viewport-manager.js.map

	function getInlineChartDimension(columnConfig, currColWidth, rowHeight) {
	    var scale = columnConfig.scale, inlinechartDim = {}, chartConf = columnConfig.derivedChartConfig || {}, barHeight = chartConf.pxBarHeight, fontSize = DEFAULT_INLINE_CHART_FONT_SIZE, valueTextPos = chartConf.valuetextposition || DEFAULT_VALUE_TEXT_POSITION, chartLeftPadding = currColWidth * 0.05, chartRightPadding = currColWidth * 0.05, chartTopPadding = rowHeight * 0.15, showValue = chartConf && chartConf.showvalue, chartWidth = currColWidth * 0.9, chartHeight = rowHeight * 0.7, labelWidth = chartWidth * 0.2, datasetWidth = chartWidth * 0.75, labelDataSetHGap = chartWidth * 0.05, labelDataSetVGap = chartHeight * 0.10, dataSetHeight = barHeight || chartHeight, labelLeft = chartLeftPadding, datasetLeft = chartLeftPadding, labelTop = chartTopPadding, datasetTop = chartTopPadding;
	    if (showValue) {
	        if (valueTextPos === ValueTextPositionType.left) {
	            labelTop += chartHeight * 0.5 + fontSize * 0.3;
	            datasetLeft = labelLeft + labelWidth + labelDataSetHGap;
	        }
	        else if (valueTextPos === ValueTextPositionType.right) {
	            labelTop += chartHeight * 0.5 + fontSize * 0.3;
	        }
	        else if (valueTextPos === ValueTextPositionType.bottom || valueTextPos === ValueTextPositionType.top || valueTextPos === ValueTextPositionType.inside) {
	            dataSetHeight = barHeight || chartHeight * 0.3;
	            fontSize = Math.min(chartHeight * 0.6, 12);
	            datasetWidth = chartWidth * 0.9;
	            if (valueTextPos === ValueTextPositionType.top) {
	                labelTop += fontSize;
	                datasetTop = labelTop + labelDataSetVGap;
	            }
	            else if (valueTextPos === ValueTextPositionType.bottom) {
	                labelTop = datasetTop + dataSetHeight + fontSize;
	            }
	            else {
	                dataSetHeight = barHeight || chartHeight;
	                fontSize = DEFAULT_INLINE_CHART_FONT_SIZE;
	                labelTop = datasetTop + dataSetHeight * 0.5 + fontSize * 0.3;
	            }
	        }
	    }
	    else {
	        datasetWidth = chartWidth * 0.9;
	    }
	    scale.setRange([datasetLeft, datasetLeft + datasetWidth]);
	    scale.setDomain([Math.min(Number(columnConfig.minContent) || 0, 0), Number(columnConfig.maxContent) || 0]);
	    inlinechartDim.dataSetDimention = {
	        top: datasetTop,
	        height: dataSetHeight,
	        width: datasetWidth
	    };
	    inlinechartDim.labelDimention = {
	        top: labelTop,
	        width: labelWidth,
	        fontSize: fontSize
	    };
	    inlinechartDim.chartDimention = {
	        leftPadding: chartLeftPadding,
	        rightPadding: chartRightPadding,
	        topPadding: chartTopPadding,
	        width: chartWidth,
	        height: chartHeight,
	        labelDataSetHGap: labelDataSetHGap
	    };
	    return inlinechartDim;
	}
	//# sourceMappingURL=inline-chart-space-manager.js.map

	function parseLayout(type) {
	    var layoutInput = type.toLowerCase();
	    if (layoutInput === LayoutType.Card) {
	        return LayoutType.Card;
	    }
	    return LayoutType.Row;
	}
	function parseDensity(density) {
	    var density_lower = density.toLowerCase();
	    if (DENSITY_TO_PX_MAP[density_lower]) {
	        return density_lower;
	    }
	    return LayoutDensityType.Default;
	}
	var LayoutManager = (function () {
	    function LayoutManager(config) {
	        var _this = this;
	        this.layout = {};
	        this.rowConfig = {};
	        this.density = LayoutDensityType.Default;
	        this.cardConfig = {};
	        this.storeUnsubscribeFn = {};
	        this.vizRecDomain = {};
	        this.shouldRecalculateLayout = false;
	        var layoutConf = config.layoutConfig || {}, rowOptionsConf = config.rowOptionsConfig || {}, rowConf = this.rowConfig, cardConf = this.cardConfig;
	        this._layoutObject = layoutConf;
	        this.columnsConfig = config.columnsConfig || [];
	        this.selectionConfig = config.selectionConfig || {};
	        this.defaultDensityToPxMap = DENSITY_TO_PX_MAP;
	        this.defaultColumnWidth = DEFAULT_COLUMN_WIDTH;
	        this.currentLayoutType = layoutConf.type ? parseLayout(layoutConf.type) : LayoutType.Row;
	        this.domContainerDim = config.domContainerDim;
	        rowConf.defaultRowHeight = DEFAULT_ROW_HEIGHT;
	        this.density = layoutConf.density ? parseDensity(layoutConf.density) : LayoutDensityType.Default;
	        rowConf.headerRowHeight = rowOptionsConf.pxHeaderRowHeight ? rowOptionsConf.pxHeaderRowHeight : rowConf.defaultRowHeight;
	        rowConf.rowHeight = rowOptionsConf.pxRowHeight ? rowOptionsConf.pxRowHeight : rowConf.defaultRowHeight;
	        rowConf.densedHeaderRowHeight = this.calculateRowHeight(rowConf.headerRowHeight);
	        rowConf.densedRowHeight = this.calculateRowHeight(rowConf.rowHeight);
	        cardConf.defaultCardWidth = DEFAULT_CARD_WIDTH;
	        cardConf.defaultRowLeftMargin = DEFAULT_ROW_LEFT_MARGIN;
	        cardConf.defaultRowRightMargin = DEFAULT_ROW_RIGHT_MARGIN;
	        cardConf.defaultCardPadding = DEFAULT_CARD_PADDING;
	        cardConf.numCards = parseNumber(layoutConf.numcards, this.cardConfig.defaultNumCards);
	        cardConf.cardtemplate = layoutConf.cardtemplate;
	        cardConf.rowLeftMargin = this.cardConfig.defaultRowLeftMargin;
	        cardConf.rowRightMargin = this.cardConfig.defaultRowRightMargin;
	        cardConf.cardPadding = this.cardConfig.defaultCardPadding;
	        cardConf.cardTempPlateConfig = CARD_TEMPLATE_ONE_CONFIG;
	        this.storeUnsubscribeFn.vizRecDomainUnsub = vizRecordDomain.subscribe(function (tmpVizRecDom) {
	            _this.vizRecDomain = tmpVizRecDom;
	            _this.calculatelayout();
	        });
	        parseBoolean(layoutConf.autoheight) ? autoHeight.set(true) : autoHeight.set(false);
	    }
	    LayoutManager.prototype.calculateRowHeight = function (rowHeight) {
	        return this.density ? rowHeight + (2 * this.defaultDensityToPxMap[this.density]) : rowHeight;
	    };
	    LayoutManager.prototype.setHeaderRowHeight = function (headerRowHeight) {
	        if (headerRowHeight !== this.rowConfig.headerRowHeight) {
	            this.shouldRecalculateLayout = true;
	            this.rowConfig.headerRowHeight = headerRowHeight;
	            this.setDensedHeaderRowHeight();
	        }
	    };
	    LayoutManager.prototype.setBodyRowHeight = function (bodyRowHeight) {
	        if (bodyRowHeight !== this.rowConfig.rowHeight) {
	            this.shouldRecalculateLayout = true;
	            this.rowConfig.rowHeight = bodyRowHeight;
	            this.setDensedBodyRowHeight();
	        }
	    };
	    LayoutManager.prototype.setRowHeight = function (rowHeight) {
	        this.setHeaderRowHeight(rowHeight);
	        this.setBodyRowHeight(rowHeight);
	    };
	    LayoutManager.prototype.setDensedHeaderRowHeight = function () {
	        var headerRowHeight = this.getHeaderRowHeight();
	        this.rowConfig.densedHeaderRowHeight = this.calculateRowHeight(headerRowHeight);
	    };
	    LayoutManager.prototype.getDensedHeaderRowHeight = function () {
	        return this.rowConfig.densedHeaderRowHeight;
	    };
	    LayoutManager.prototype.getHeaderRowHeight = function () {
	        return this.rowConfig.headerRowHeight;
	    };
	    LayoutManager.prototype.setDensedBodyRowHeight = function () {
	        var rowHeight = this.getRowHeight();
	        this.rowConfig.densedRowHeight = this.calculateRowHeight(rowHeight);
	    };
	    LayoutManager.prototype.getDensedBodyRowHeight = function () {
	        return this.rowConfig.densedRowHeight;
	    };
	    LayoutManager.prototype.setSelectionConfig = function (configObj) {
	        var selectionConfig = this.selectionConfig, prevConfig = _assign({}, selectionConfig), isEnableChanged, isShowCheckBoxChanged, shouldRecalculateLayout = false;
	        Object.assign(selectionConfig, configObj);
	        isEnableChanged = prevConfig.enable !== selectionConfig.enable;
	        isShowCheckBoxChanged = prevConfig.showselectioncheckbox !== selectionConfig.showselectioncheckbox;
	        if (isEnableChanged) {
	            if (selectionConfig.enable && selectionConfig.showselectioncheckbox) {
	                shouldRecalculateLayout = true;
	            }
	            else if (!selectionConfig.enable && prevConfig.showselectioncheckbox) {
	                shouldRecalculateLayout = true;
	            }
	        }
	        else {
	            if (selectionConfig.enable && isShowCheckBoxChanged) {
	                shouldRecalculateLayout = true;
	            }
	        }
	        this.shouldRecalculateLayout = shouldRecalculateLayout;
	    };
	    LayoutManager.prototype.getRowHeight = function () {
	        return this.rowConfig.rowHeight;
	    };
	    LayoutManager.prototype.getRowConfig = function () {
	        return this.rowConfig;
	    };
	    LayoutManager.prototype.getCardConfig = function () {
	        return this.cardConfig;
	    };
	    LayoutManager.prototype.setRowOptions = function (option, value) {
	        switch (option) {
	            case 'pxRowHeight':
	                this.setBodyRowHeight(value);
	                break;
	            case 'pxHeaderRowHeight':
	                this.setHeaderRowHeight(value);
	                break;
	            case 'rowselection':
	                this.setSelectionConfig(value);
	                break;
	            default:
	                return;
	        }
	        if (this.shouldRecalculateLayout) {
	            this.calculatelayout();
	            this.shouldRecalculateLayout = false;
	        }
	    };
	    LayoutManager.prototype.getRowOption = function (option) {
	        switch (option) {
	            case 'rowheight':
	                return this.getRowHeight();
	            case 'headerrowheight':
	                return this.getHeaderRowHeight();
	            case 'rowselection':
	                return this.selectionConfig;
	            default:
	                return;
	        }
	    };
	    LayoutManager.prototype.getCurrentLayoutType = function () {
	        return this.currentLayoutType;
	    };
	    LayoutManager.prototype.setCurrentLayoutType = function (layoutType) {
	        this.currentLayoutType = layoutType;
	    };
	    LayoutManager.prototype.setNumCards = function (numcards) {
	        this.cardConfig.numCards = parseNumber(numcards, this.cardConfig.defaultNumCards);
	    };
	    LayoutManager.prototype.getNumCards = function () {
	        return this.cardConfig.numCards;
	    };
	    LayoutManager.prototype.setCardTemplate = function (templeFn) {
	        this.cardConfig.cardtemplate = templeFn;
	    };
	    LayoutManager.prototype.getCardTemplate = function () {
	        return this.cardConfig.cardtemplate;
	    };
	    LayoutManager.prototype.setLayout = function (layoutObj) {
	        var currentLayOutObj = this._layoutObject;
	        Object.assign(currentLayOutObj, layoutObj);
	        this.setCurrentLayoutType(currentLayOutObj.type);
	        this.setDensity(currentLayOutObj.density);
	        this.recalculateDensedRowHeights();
	        this.setNumCards(currentLayOutObj.numcards);
	        this.setCardTemplate(currentLayOutObj.cardtemplate);
	        this.calculatelayout();
	    };
	    LayoutManager.prototype.getLayout = function () {
	        return this._layoutObject;
	    };
	    LayoutManager.prototype.getDensity = function () {
	        return this.density;
	    };
	    LayoutManager.prototype.recalculateDensedRowHeights = function () {
	        this.setDensedHeaderRowHeight();
	        this.setDensedBodyRowHeight();
	    };
	    LayoutManager.prototype.setDensity = function (density) {
	        if (DENSITY_TO_PX_MAP[density]) {
	            this.density = density;
	        }
	    };
	    LayoutManager.prototype.getDomContainerDim = function () {
	        return this.domContainerDim;
	    };
	    LayoutManager.prototype.setDomContainerDim = function (dim) {
	        this.domContainerDim = dim;
	    };
	    LayoutManager.prototype.getColumnsConfig = function () {
	        return this.columnsConfig;
	    };
	    LayoutManager.prototype.setColumnsConfig = function (columnsConfig) {
	        this.columnsConfig = columnsConfig;
	    };
	    LayoutManager.prototype.calculatelayout = function () {
	        var _this = this;
	        var columnsConfig = this.columnsConfig, selectionConf = this.selectionConfig, rowHeight = this.rowConfig.rowHeight, cellLeft = 0, cellDimState = [], rowDimState = [], totalBodyHeight = 0;
	        if (this.currentLayoutType !== LayoutType.Card) {
	            if (selectionConf.enable && selectionConf.showselectioncheckbox) {
	                cellDimState.push({
	                    left: 0,
	                    width: DEFAULT_CHECKBOX_COLUMN_WIDTH
	                });
	                cellLeft += DEFAULT_CHECKBOX_COLUMN_WIDTH;
	            }
	            for (var index = 0; index < columnsConfig.length; index++) {
	                var columnConfig = columnsConfig[index];
	                var currColWidth = columnConfig.pxWidth || this.defaultColumnWidth, cellDim = void 0;
	                cellDim = {
	                    left: cellLeft,
	                    width: currColWidth
	                };
	                if (columnConfig.type === ColumnType.Chart) {
	                    cellDim.inlinechartDim = getInlineChartDimension(columnConfig, currColWidth, this.rowConfig.densedRowHeight);
	                }
	                cellDimState.push(cellDim);
	                cellLeft += currColWidth;
	            }
	            for (var index = 0; index <= this.vizRecDomain.end - this.vizRecDomain.start; index++) {
	                rowDimState.push({
	                    top: (rowDimState.length === 0) ? 0 : rowDimState[index - 1].top + rowDimState[index - 1].height,
	                    height: this.rowConfig.densedRowHeight
	                });
	                totalBodyHeight += this.rowConfig.densedRowHeight;
	            }
	            this.layout = {
	                rowLayout: {
	                    headerDimState: {
	                        height: this.rowConfig.densedHeaderRowHeight,
	                        cell: cellDimState
	                    },
	                    totalBodyHeight: totalBodyHeight,
	                    totalWidth: cellLeft,
	                    rowDimState: rowDimState
	                }
	            };
	        }
	        else {
	            var cardConf = this.cardConfig, cardTempPlateConfig = cardConf.cardTempPlateConfig, finalNoOfCards = void 0, finalCardWidth = void 0, finalCardHeight = void 0, cardCellState = [], remainingContainerWidth = this.domContainerDim.width - cardConf.rowLeftMargin - cardConf.rowRightMargin - ((isIE11 || isEdge) ? 19 : 0);
	            if (cardConf.numCards) {
	                remainingContainerWidth = remainingContainerWidth - cardConf.cardPadding * (cardConf.numCards - 1);
	                finalNoOfCards = cardConf.numCards;
	            }
	            else if (remainingContainerWidth <= cardConf.defaultCardWidth) {
	                finalNoOfCards = 1;
	            }
	            else {
	                var tmpCardCount = remainingContainerWidth / cardConf.defaultCardWidth, cardRoundOf = Math.round(tmpCardCount), remainingWidhExcludingPadding = remainingContainerWidth - ((cardRoundOf - 1) * cardConf.cardPadding), tmpCardCountExcludingPadding = remainingWidhExcludingPadding / cardConf.defaultCardWidth;
	                if ((tmpCardCount % 1) >= 0.5 && (tmpCardCountExcludingPadding % 1) < 0.5) {
	                    finalNoOfCards = Math.round(tmpCardCountExcludingPadding);
	                    remainingContainerWidth -= ((Math.round(tmpCardCountExcludingPadding) - 1) * cardConf.cardPadding);
	                }
	                else {
	                    remainingContainerWidth = remainingWidhExcludingPadding;
	                    finalNoOfCards = cardRoundOf;
	                }
	            }
	            finalCardWidth = remainingContainerWidth / finalNoOfCards;
	            for (var index = 0; index < columnsConfig.length; index++) {
	                var inlinechartDim = {};
	                var columnConfig = columnsConfig[index];
	                if (columnConfig.type === 'chart') {
	                    inlinechartDim = getInlineChartDimension(columnConfig, (finalCardWidth - DEFAULT_CARD_CONTAINER_LEFT_PADDING - DEFAULT_CARD_CONTAINER_RIGHT_PADDING) * 0.6, DEFAULT_CARD_INFO_ROW_HEIGHT_CARD);
	                }
	                cardCellState.push({
	                    width: finalCardWidth * 0.6,
	                    height: DEFAULT_CARD_INFO_ROW_HEIGHT_CARD,
	                    inlinechartDim: inlinechartDim
	                });
	            }
	            finalCardHeight = cardTempPlateConfig.cardTopPadding + cardTempPlateConfig.cardBottomPadding + cardTempPlateConfig.cardBorderTop + cardTempPlateConfig.cardBorderBottom
	                + ((cardTempPlateConfig.cardInfoRowTopPadding + cardTempPlateConfig.cardInfoRowBottomPadding + cardTempPlateConfig.cardInfoRowHeight) * columnsConfig.length);
	            this.layout = {
	                cardLayout: {
	                    width: finalCardWidth,
	                    height: finalCardHeight,
	                    numCards: finalNoOfCards,
	                    paddingBetweenCards: cardConf.cardPadding,
	                    startPadding: cardConf.rowLeftMargin,
	                    cardtemplate: cardConf.cardtemplate,
	                    cellState: cardCellState
	                }
	            };
	        }
	        layoutObject.update(function (tmpLayoutObject) {
	            tmpLayoutObject.layout = _this._layoutObject;
	            tmpLayoutObject.layoutState = _this.getLayoutState();
	            return tmpLayoutObject;
	        });
	    };
	    LayoutManager.prototype.getLayoutState = function () {
	        return this.layout;
	    };
	    LayoutManager.prototype.sizeColumnsToFit = function (columnIndex, length, remainingWidth) {
	        if (columnIndex === void 0) { columnIndex = 0; }
	        if (remainingWidth === void 0) { remainingWidth = 0; }
	        var tmpRemainingWidth = remainingWidth, columnsConfig = mergeDeep(this.columnsConfig);
	        for (var index = columnIndex; index < length; index++) {
	            var columnConfig = columnsConfig[index], currColWidth = void 0, currColumnMinWidth = void 0, currColumnMaxWidth = void 0;
	            if (tmpRemainingWidth < getMinColumnWidth())
	                return false;
	            currColWidth = tmpRemainingWidth / (length - index);
	            currColumnMinWidth = columnConfig.pxMinWidth,
	                currColumnMaxWidth = columnConfig.pxMaxWidth;
	            currColWidth = Math.min(Math.max(currColWidth, currColumnMinWidth || -Infinity), currColumnMaxWidth || Infinity);
	            columnConfig.pxWidth = currColWidth;
	            tmpRemainingWidth -= currColWidth;
	        }
	        this.setColumnsConfig(columnsConfig);
	        this.calculatelayout();
	        return true;
	    };
	    LayoutManager.prototype.sizeColumnsToContent = function (columnsOptions, document, container) {
	        var columnsConfig = mergeDeep(this.columnsConfig), shouldCalculateLayout = false;
	        for (var index = 0; index < columnsOptions.length; index++) {
	            var inputColumn = columnsOptions[index], maxWidth = getSpanDimension(document, container, {}, inputColumn.content.max).width;
	            if (maxWidth) {
	                columnsConfig[inputColumn.columnIndex].pxWidth = maxWidth + 32;
	                shouldCalculateLayout = true;
	            }
	        }
	        if (shouldCalculateLayout) {
	            this.setColumnsConfig(columnsConfig);
	            this.calculatelayout();
	        }
	    };
	    return LayoutManager;
	}());
	//# sourceMappingURL=layout-manager.js.map

	var scrollCounter = 0;
	var InfiniteScrollManager = (function () {
	    function InfiniteScrollManager(config) {
	        var _this = this;
	        this.storeUnsubscribeFn = {};
	        this.vizRecDomain = {};
	        this.updateHScrollProps = function (e) {
	            var hScrollConf = _this.hScrollConfig, prevDomUpdateState = hScrollConf.prevDomUpdateState;
	            scrollCounter++;
	            if (e.target) {
	                var targtEle = e.target;
	                hScrollConf.vizStartRowPx = targtEle.scrollTop;
	                hScrollConf.vizEndRowPx = targtEle.scrollTop + hScrollConf.lazyRenderingHeight;
	                hScrollConf.vizStartRowBufferPx = (hScrollConf.vizStartRowPx - hScrollConf.lazyRenderingHeight > 0) ?
	                    hScrollConf.vizStartRowPx - hScrollConf.lazyRenderingHeight : 0;
	                hScrollConf.vizEndRowBufferPx = hScrollConf.vizEndRowPx + (2 * hScrollConf.lazyRenderingHeight);
	                scrollCounter--;
	            }
	            if (hScrollConf.layoutObject.layout.type !== 'card' && hScrollConf.rowConfig) {
	                if ((hScrollConf.vizStartRowPx >= prevDomUpdateState.prevVizEndPx) ||
	                    (hScrollConf.vizEndRowPx <= prevDomUpdateState.prevVizStartPx)) {
	                    hScrollConf.prevDomUpdateState = {
	                        prevVizStartPx: hScrollConf.vizStartRowPx,
	                        prevVizEndPx: hScrollConf.vizEndRowPx
	                    };
	                    if (scrollCounter === 0 && !_this._paginationEnabled)
	                        _this.calculateStartEndRow();
	                }
	            }
	            else {
	                if (hScrollConf.vizStartRowPx >= prevDomUpdateState.prevVizEndPx) {
	                    prevDomUpdateState.prevVizStartPx = hScrollConf.vizStartRowPx;
	                    prevDomUpdateState.prevVizEndPx = hScrollConf.vizEndRowPx;
	                    if (scrollCounter === 0 && !_this._paginationEnabled)
	                        _this.calculateStartEndRow();
	                }
	            }
	        };
	        var hScrollConf = this.hScrollConfig = { prevDomUpdateState: {} }, rowConf = config.rowConfig, rowHeight = (rowConf.pxRowHeight || DEFAULT_ROW_HEIGHT) + 2 * DENSITY_TO_PX_MAP[LayoutDensityType.Default], headerHeight = (rowConf.pxHeaderRowHeight || DEFAULT_ROW_HEIGHT) + 2 * DENSITY_TO_PX_MAP[LayoutDensityType.Default], rowConfig = {
	            pxRowHeight: rowHeight,
	            pxHeaderRowHeight: headerHeight
	        };
	        this._paginationEnabled = false;
	        this.vizRecDomain = {
	            start: 0,
	            end: 0,
	            bodyTransLateY: 0
	        };
	        paginationState.subscribe(function (state) {
	            _this._paginationEnabled = state.enable;
	            if (typeof _this._paginationEnabled !== 'undefined' && !_this._paginationEnabled) {
	                vizRecordDomain.update(function (tmpVizRecDomain) {
	                    tmpVizRecDomain.start = 0;
	                    tmpVizRecDomain.end = _this.getEndRow();
	                    return tmpVizRecDomain;
	                });
	            }
	        });
	        this.storeUnsubscribeFn.vizRecDomainUnsub = vizRecordDomain.subscribe(function (tmpVizRecDom) {
	            _this.vizRecDomain = tmpVizRecDom;
	        });
	        this.storeUnsubscribeFn.autoHeightUnsub = autoHeight.subscribe(function (tmpAutoHeight) {
	            _this.hScrollConfig.autoHeight = tmpAutoHeight;
	        });
	        this.storeUnsubscribeFn.layoutObjectUnsub = layoutObject.subscribe(function (tmpLayoutObject) {
	            hScrollConf.layoutObject = tmpLayoutObject;
	            if (tmpLayoutObject.layout.type !== 'card') {
	                if (tmpLayoutObject.layout.density && tmpLayoutObject.layout.density !== LayoutDensityType.Default) {
	                    rowConfig = {
	                        pxRowHeight: (rowConf.pxRowHeight || DEFAULT_ROW_HEIGHT) + 2 * DENSITY_TO_PX_MAP[tmpLayoutObject.layout.density],
	                        pxHeaderRowHeight: (rowConf.pxHeaderRowHeight || DEFAULT_ROW_HEIGHT) + 2 * DENSITY_TO_PX_MAP[tmpLayoutObject.layout.density]
	                    };
	                }
	                hScrollConf.rowConfig = rowConfig;
	            }
	            else {
	                hScrollConf.cardConfig = tmpLayoutObject.layoutState.cardLayout;
	            }
	            if ((hScrollConf.layoutType !== tmpLayoutObject.layout.type) && !_this._paginationEnabled) {
	                if ((tmpLayoutObject.layout.type !== 'card' && tmpLayoutObject.layoutState.rowLayout) ||
	                    tmpLayoutObject.layoutState.cardLayout) {
	                    hScrollConf.layoutType = tmpLayoutObject.layout.type;
	                    hScrollConf.dataLength = config.dataLength || 1;
	                    hScrollConf.lazyRendering = config.lazyRendering;
	                    hScrollConf.vizStartRowBufferPx = hScrollConf.vizStartRowPx = 0;
	                    hScrollConf.lazyRenderingHeight = config.domContainer.height - (rowConfig.pxHeaderRowHeight || headerHeight);
	                    hScrollConf.vizEndRowPx = 2 * hScrollConf.lazyRenderingHeight;
	                    if (hScrollConf.lazyRendering && !hScrollConf.autoHeight) {
	                        hScrollConf.vizEndRowBufferPx = hScrollConf.vizEndRowPx + config.domContainer.height;
	                        hScrollConf.prevDomUpdateState = {
	                            prevVizStartPx: hScrollConf.vizStartRowPx,
	                            prevVizEndPx: hScrollConf.vizEndRowPx
	                        };
	                    }
	                    else {
	                        hScrollConf.vizEndRowBufferPx = hScrollConf.dataLength * (rowConfig.pxHeaderRowHeight || rowHeight);
	                        _this.calculateStartEndRow();
	                    }
	                    vizRecordDomain.update(function (tmpVizRecDomain) {
	                        tmpVizRecDomain.bodyTransLateY = 0;
	                        tmpVizRecDomain.start = 0;
	                        tmpVizRecDomain.end = _this.getEndRow();
	                        return tmpVizRecDomain;
	                    });
	                }
	            }
	        });
	    }
	    InfiniteScrollManager.prototype.getEndRow = function () {
	        var hScrollConf = this.hScrollConfig;
	        if (hScrollConf.layoutObject.layout.type !== 'card') {
	            if (hScrollConf.rowConfig && hScrollConf.rowConfig.pxRowHeight) {
	                return Math.min(Math.floor(hScrollConf.vizEndRowBufferPx / hScrollConf.rowConfig.pxRowHeight), hScrollConf.dataLength - 1);
	            }
	        }
	        else if (hScrollConf.layoutObject.layout.type === 'card' && hScrollConf.cardConfig) {
	            return Math.min(Math.floor((hScrollConf.vizEndRowBufferPx / hScrollConf.cardConfig.height) * hScrollConf.cardConfig.numCards), hScrollConf.dataLength - 1);
	        }
	        return (hScrollConf.dataLength - 1);
	    };
	    InfiniteScrollManager.prototype.calculateStartEndRow = function () {
	        var _this = this;
	        var hScrollConf = this.hScrollConfig;
	        if (hScrollConf.layoutObject.layout.type !== 'card') {
	            if (hScrollConf.rowConfig && hScrollConf.rowConfig.pxRowHeight) {
	                this.vizRecDomain.end = Math.min(Math.floor(hScrollConf.vizEndRowBufferPx / hScrollConf.rowConfig.pxRowHeight), hScrollConf.dataLength - 1);
	                if (this.vizRecDomain.end < hScrollConf.dataLength - 1) {
	                    this.vizRecDomain.hiddenDivHeight = hScrollConf.vizEndRowBufferPx;
	                    this.vizRecDomain.bodyTransLateY = hScrollConf.vizStartRowBufferPx;
	                    this.vizRecDomain.start = Math.max(Math.floor(hScrollConf.vizStartRowBufferPx / hScrollConf.rowConfig.pxRowHeight), 0);
	                }
	            }
	        }
	        else {
	            if (hScrollConf.cardConfig) {
	                this.vizRecDomain.start = 0;
	                this.vizRecDomain.end = Math.min(Math.floor((hScrollConf.vizEndRowBufferPx / hScrollConf.cardConfig.height) * hScrollConf.cardConfig.numCards), hScrollConf.dataLength - 1);
	            }
	        }
	        vizRecordDomain.update(function (tmpVizRecDomain) { return _this.vizRecDomain; });
	    };
	    InfiniteScrollManager.prototype.setDatalength = function (val) {
	        this.hScrollConfig.dataLength = val;
	    };
	    return InfiniteScrollManager;
	}());
	//# sourceMappingURL=infinite-scroll-manager.js.map

	var optionsFilterOperation = function (totalRows, optionsArr, insert) {
	    var firstMax = true;
	    return appendAndSort(optionsArr.filter(function (pageSize) {
	        if (pageSize < totalRows) {
	            return true;
	        }
	        else if (pageSize === totalRows) {
	            firstMax = false;
	            return true;
	        }
	        else if (firstMax) {
	            firstMax = false;
	            return true;
	        }
	        return false;
	    }), insert);
	}, appendAndSort = function (arrayToMutate, insert) {
	    if (!insert) {
	        return arrayToMutate.filter(function (val, index, self) { return self.indexOf(val) === index; });
	    }
	    arrayToMutate.indexOf(insert) === -1 && arrayToMutate.push(insert);
	    return arrayToMutate.sort(function (a, b) { return a - b; });
	};
	var Pagination = (function () {
	    function Pagination(input) {
	        this._extPaginationInput = input.pagination;
	        this._dispatchEvent = input.dispatchEvent;
	        this._logger = input.logger;
	        this._screenWidth = input.currentScreenWidth;
	        this._bodyHeight = input.bodyHeight;
	        this._rowHeight = input.rowHeight;
	        this._gridDataTable = input.gridDataTable;
	        this._totalRows = this._gridDataTable.getTotalRowCount();
	        this.paginationHeight = input.paginationHeight;
	        this.shouldMutateStore = false;
	        this.config = {
	            enable: false,
	            showRecordCount: false,
	            showJumpToEndButtons: false,
	            showJumpToLastPageButton: false,
	            showJumpToFirstPageButton: false,
	            defaultPageOptions: [10, 20, 50, 100, 200, 500, 1000],
	            showPagesConfig: {
	                enable: false,
	                showtotal: false,
	                userinput: false
	            },
	            calculatedPageSize: this._calculatePageSize(),
	            currentPage: 1
	        };
	        this._configure();
	    }
	    Pagination.prototype._calculatePageSize = function () {
	        var rowHeight = this._rowHeight, bodyHeight = this._bodyHeight, numberOfRows = bodyHeight / rowHeight, fractionOfRows = numberOfRows - Math.floor(numberOfRows), totalRows = this._totalRows, rounder = fractionOfRows > 0.4 ? Math.ceil : Math.floor;
	        return Math.min(rounder(numberOfRows), totalRows);
	    };
	    Pagination.prototype._configure = function () {
	        var config = this.config, extPaginationInput = this._extPaginationInput, pageSizeConfig, showPagesConfig = extPaginationInput.showpages || {}, totalRows = this._totalRows, options;
	        config.enable = parseBoolean(extPaginationInput.enable, config.enable);
	        config.showRecordCount = parseBoolean(extPaginationInput.showrecordcount, config.showRecordCount);
	        config.showJumpToEndButtons = parseBoolean(extPaginationInput.showjumptoendbuttons, config.showJumpToEndButtons);
	        config.showJumpToLastPageButton = parseBoolean(extPaginationInput.showjumptolastpagebutton, config.showJumpToEndButtons);
	        config.showJumpToFirstPageButton = parseBoolean(extPaginationInput.showjumptofirstpagebutton, config.showJumpToEndButtons);
	        config.showPagesConfig.enable = parseBoolean(showPagesConfig.enable, config.showPagesConfig.enable);
	        config.showPagesConfig.showtotal = parseBoolean(showPagesConfig.showtotal, config.showPagesConfig.showtotal);
	        config.showPagesConfig.userinput = parseBoolean(showPagesConfig.userinput, config.showPagesConfig.userinput);
	        config.pageSizeConfig = pageSizeConfig = extPaginationInput.pagesize || {};
	        if (!Object.keys(pageSizeConfig).length) {
	            config.appliedPageSize = config.calculatedPageSize;
	        }
	        else if (options = pageSizeConfig.options) {
	            this.calculatePageOptions(options);
	        }
	        else {
	            config.appliedPageSize = parseNumber(pageSizeConfig['default'], config.calculatedPageSize);
	        }
	        config.totalPages = Math.ceil(totalRows / config.appliedPageSize);
	        paginationState.set({
	            enable: this.config.enable,
	            showPages: {
	                enable: this.config.showPagesConfig.enable,
	                showTotal: this.config.showPagesConfig.showtotal,
	                userInput: this.config.showPagesConfig.userinput
	            },
	            showRecordCount: this.config.showRecordCount,
	            pageSize: {
	                options: this.config.calculatedPageOptions,
	                applied: this.config.appliedPageSize
	            },
	            showJumptoFirstPage: this.config.showJumpToFirstPageButton,
	            showJumpToLastPage: this.config.showJumpToLastPageButton,
	            currentPage: this.getCurrentPage(),
	            paginationHeight: this.paginationHeight,
	            numRows: this.paginationHeight / DEFAULT_PAGINATION_ROW_HEIGHT,
	            totalPages: config.totalPages,
	            totalRecords: this._totalRows
	        });
	        this._updateVisibleRecords();
	    };
	    Pagination.prototype._updateVisibleRecords = function () {
	        var currentPage = this.getCurrentPage(), pageSize = this.getPageSize(), startIndex = pageSize * (currentPage - 1), totalRows = this._totalRows, enable = this.config.enable;
	        enable && vizRecordDomain.set({
	            start: startIndex,
	            end: Math.min(startIndex + (pageSize - 1), totalRows - 1)
	        });
	    };
	    Pagination.prototype.setPageSize = function (size) {
	        var config = this.config, totalRows = this._totalRows, previousPageSize = config.appliedPageSize, options = config.pageSizeConfig.options;
	        if (config.calculatedPageOptions.length) {
	            if (options && Array.isArray(options) && options.length) {
	                config.appliedPageSize = size;
	                config.calculatedPageOptions = optionsFilterOperation(totalRows, config.calculatedPageOptions, config.appliedPageSize);
	                if (previousPageSize !== config.appliedPageSize) {
	                    this._dispatchEvent.call(this, 'pagesizechanged', {
	                        previousPageSize: previousPageSize,
	                        newPageSize: config.appliedPageSize
	                    });
	                    config.currentPage = 1;
	                }
	            }
	            else {
	                config.appliedPageSize = size;
	                config.calculatedPageOptions = optionsFilterOperation(totalRows, config.calculatedPageOptions, config.appliedPageSize);
	                if (previousPageSize !== config.appliedPageSize) {
	                    this._dispatchEvent.call(this, 'pagesizechanged', {
	                        previousPageSize: previousPageSize,
	                        newPageSize: config.appliedPageSize
	                    });
	                    config.currentPage = 1;
	                }
	            }
	        }
	        else {
	            config.appliedPageSize = size;
	            if (previousPageSize !== config.appliedPageSize) {
	                this._dispatchEvent.call(this, 'pagesizechanged', {
	                    previousPageSize: previousPageSize,
	                    newPageSize: config.appliedPageSize
	                });
	                config.currentPage = 1;
	            }
	        }
	        config.totalPages = Math.ceil(totalRows / config.appliedPageSize);
	        paginationState.update(function (stateObj) {
	            stateObj.pageSize.applied = config.appliedPageSize;
	            stateObj.pageSize.options = config.calculatedPageOptions;
	            stateObj.totalPages = config.totalPages;
	            stateObj.currentPage = config.currentPage;
	            return stateObj;
	        });
	        this._updateVisibleRecords();
	    };
	    Pagination.prototype.getPageSize = function () {
	        return this.config.appliedPageSize;
	    };
	    Pagination.prototype.getCurrentPage = function () {
	        return this.config.currentPage;
	    };
	    Pagination.prototype.getTotalPages = function () {
	        return this.config.totalPages;
	    };
	    Pagination.prototype.getRowCount = function () {
	        return this._totalRows;
	    };
	    Pagination.prototype.jumpToPage = function (pageNumber) {
	        var config = this.config, totalPages = config.totalPages, previousPage = config.currentPage, formattedPageNumber = +pageNumber;
	        if (formattedPageNumber >= 1 && formattedPageNumber <= totalPages) {
	            config.currentPage = formattedPageNumber;
	        }
	        else {
	            this._logger.error(PaginationException.invalidPageNumber);
	        }
	        paginationState.update(function (stateObj) {
	            stateObj.currentPage = config.currentPage;
	            return stateObj;
	        });
	        if (previousPage !== config.currentPage) {
	            this._dispatchEvent.call(this, 'pagechanged', {
	                previousPageNumber: previousPage,
	                newPageNumber: config.currentPage
	            });
	        }
	        this._updateVisibleRecords();
	    };
	    Pagination.prototype.jumpToNextPage = function () {
	        var config = this.config, totalPages = config.totalPages, previousPage = config.currentPage;
	        config.currentPage = Math.min(config.currentPage + 1, totalPages);
	        paginationState.update(function (stateObj) {
	            stateObj.currentPage = config.currentPage;
	            return stateObj;
	        });
	        if (previousPage !== config.currentPage) {
	            this._dispatchEvent.call(this, 'pagechanged', {
	                previousPageNumber: previousPage,
	                newPageNumber: config.currentPage
	            });
	        }
	        this._updateVisibleRecords();
	    };
	    Pagination.prototype.jumpToPreviousPage = function () {
	        var config = this.config, previousPage = config.currentPage;
	        config.currentPage = Math.max(config.currentPage - 1, 1);
	        paginationState.update(function (stateObj) {
	            stateObj.currentPage = config.currentPage;
	            return stateObj;
	        });
	        if (previousPage !== config.currentPage) {
	            this._dispatchEvent.call(this, 'pagechanged', {
	                previousPageNumber: previousPage,
	                newPageNumber: config.currentPage
	            });
	        }
	        this._updateVisibleRecords();
	    };
	    Pagination.prototype.jumpToFirstPage = function () {
	        var config = this.config, previousPage = config.currentPage;
	        config.currentPage = 1;
	        paginationState.update(function (stateObj) {
	            stateObj.currentPage = 1;
	            return stateObj;
	        });
	        if (previousPage !== config.currentPage) {
	            this._dispatchEvent.call(this, 'pagechanged', {
	                previousPageNumber: previousPage,
	                newPageNumber: config.currentPage
	            });
	        }
	        this._updateVisibleRecords();
	    };
	    Pagination.prototype.jumpToLastPage = function () {
	        var _this = this;
	        var config = this.config, previousPage = config.currentPage;
	        config.currentPage = this.config.totalPages;
	        paginationState.update(function (stateObj) {
	            stateObj.currentPage = _this.config.totalPages;
	            return stateObj;
	        });
	        if (previousPage !== config.currentPage) {
	            this._dispatchEvent.call(this, 'pagechanged', {
	                previousPageNumber: previousPage,
	                newPageNumber: config.currentPage
	            });
	        }
	        this._updateVisibleRecords();
	    };
	    Pagination.prototype.setPagination = function (param, value) {
	        var config = this.config;
	        switch (param) {
	            case 'enable':
	                if (config.enable !== value) {
	                    config.enable = value;
	                    this.shouldMutateStore = true;
	                }
	                break;
	            case 'showpages':
	                this.setShowPagesProperties(value);
	                break;
	            case 'showrecordcount':
	                if (config.showRecordCount !== value) {
	                    config.showRecordCount = value;
	                    this.shouldMutateStore = true;
	                }
	                break;
	            case 'pagesize':
	                this.setPageSizeProperties(value);
	                break;
	            case 'showjumptoendbutton':
	                if (config.showJumpToEndButtons !== value) {
	                    config.showJumpToEndButtons = config.showJumpToFirstPageButton = config.showJumpToLastPageButton = value;
	                    this.shouldMutateStore = true;
	                }
	                break;
	            case 'showjumptofirstpagebutton':
	                if (config.showJumpToFirstPageButton !== value) {
	                    config.showJumpToFirstPageButton = value;
	                    this.shouldMutateStore = true;
	                }
	                break;
	            case 'showjumptolastpagebutton':
	                if (config.showJumpToLastPageButton !== value) {
	                    config.showJumpToLastPageButton = value;
	                    this.shouldMutateStore = true;
	                }
	                break;
	            default:
	                return;
	        }
	    };
	    Pagination.prototype.setShowPagesProperties = function (props) {
	        var config = this.config;
	        for (var key in props) {
	            switch (key) {
	                case 'enable':
	                    if (config.showPagesConfig.enable !== props[key]) {
	                        config.showPagesConfig.enable = props[key];
	                        this.shouldMutateStore = true;
	                    }
	                    break;
	                case 'showtotal':
	                    if (config.showPagesConfig.showtotal !== props[key]) {
	                        config.showPagesConfig.showtotal = props[key];
	                        this.shouldMutateStore = true;
	                    }
	                    break;
	                case 'userinput':
	                    if (config.showPagesConfig.userinput !== props[key]) {
	                        config.showPagesConfig.userinput = props[key];
	                        this.shouldMutateStore = true;
	                    }
	                    break;
	                default:
	                    return;
	            }
	        }
	    };
	    Pagination.prototype.calculatePageOptions = function (options) {
	        var config = this.config, pageSizeConfig = config.pageSizeConfig || {}, totalRows = this._totalRows, defaultPageOptions = config.defaultPageOptions;
	        config.calculatedPageOptions = [];
	        if (typeof options === 'boolean' || (Array.isArray(options) && !options.length)) {
	            config.appliedPageSize = parseNumber(pageSizeConfig['default'], defaultPageOptions[0]);
	            config.calculatedPageOptions = optionsFilterOperation(totalRows, defaultPageOptions, config.appliedPageSize);
	        }
	        else {
	            config.appliedPageSize = parseNumber(pageSizeConfig['default'], options[0]);
	            config.calculatedPageOptions = optionsFilterOperation(totalRows, options.sort(function (a, b) { return a - b; }));
	        }
	    };
	    Pagination.prototype.setPageSizeProperties = function (props) {
	        var config = this.config;
	        for (var key in props) {
	            switch (key) {
	                case 'default':
	                    if (config.appliedPageSize !== props[key]) {
	                        config.appliedPageSize = props[key];
	                        config.calculatedPageOptions = optionsFilterOperation(this._totalRows, config.calculatedPageOptions, config.appliedPageSize);
	                        config.currentPage = 1;
	                        config.totalPages = Math.ceil(this._totalRows / config.appliedPageSize);
	                        this.shouldMutateStore = true;
	                    }
	                    break;
	                case 'options':
	                    if (config.pageSizeConfig.options !== props[key]) {
	                        this.calculatePageOptions(props[key]);
	                        config.appliedPageSize = config.calculatedPageOptions[0];
	                        config.currentPage = 1;
	                        config.totalPages = Math.ceil(this._totalRows / config.appliedPageSize);
	                        this.shouldMutateStore = true;
	                    }
	                    break;
	                default:
	                    return;
	            }
	        }
	    };
	    Pagination.prototype.reconfigureState = function () {
	        paginationState.set({
	            enable: this.config.enable,
	            showPages: {
	                enable: this.config.showPagesConfig.enable,
	                showTotal: this.config.showPagesConfig.showtotal,
	                userInput: this.config.showPagesConfig.userinput
	            },
	            showRecordCount: this.config.showRecordCount,
	            pageSize: {
	                options: this.config.calculatedPageOptions,
	                applied: this.config.appliedPageSize
	            },
	            showJumptoFirstPage: this.config.showJumpToFirstPageButton,
	            showJumpToLastPage: this.config.showJumpToLastPageButton,
	            currentPage: this.getCurrentPage(),
	            paginationHeight: this.paginationHeight,
	            numRows: this.paginationHeight / DEFAULT_PAGINATION_ROW_HEIGHT,
	            totalPages: this.config.totalPages,
	            totalRecords: this._totalRows
	        });
	        this.shouldMutateStore = false;
	        this._updateVisibleRecords();
	    };
	    Pagination.prototype.getPagination = function (param) {
	        var _a;
	        var returnObj = {}, config = this.config, getConfig = function (prop) {
	            switch (prop) {
	                case 'enable':
	                    return config.enable;
	                case 'showpages':
	                    return config.showPagesConfig;
	                case 'showrecordcount':
	                    return config.showRecordCount;
	                case 'pagesize':
	                    return config.pageSizeConfig;
	                case 'showjumptoendbutton':
	                    return config.showJumpToEndButtons;
	                case 'showjumptofirstpagebutton':
	                    return config.showJumpToFirstPageButton;
	                case 'showjumptolastpagebutton':
	                    return config.showJumpToLastPageButton;
	                default:
	                    return;
	            }
	        };
	        if (typeof param === 'undefined') {
	            returnObj = {
	                enable: config.enable,
	                showpages: config.showPagesConfig,
	                showrecordcount: config.showRecordCount,
	                pagesize: config.pageSizeConfig,
	                showjumptoendbuttons: config.showJumpToEndButtons,
	                showjumptofirstpagebutton: config.showJumpToFirstPageButton,
	                showjumptolastpagebutton: config.showJumpToLastPageButton
	            };
	        }
	        else if (typeof param === 'string') {
	            returnObj = (_a = {},
	                _a[param] = getConfig(param.toLowerCase()),
	                _a);
	        }
	        else if (Array.isArray(param)) {
	            for (var i = 0; i < param.length; i++) {
	                returnObj[param[i]] = getConfig(param[i].toLowerCase());
	            }
	        }
	        return returnObj;
	    };
	    return Pagination;
	}());
	//# sourceMappingURL=pagination.js.map

	function lengthUnitGenerator(document, container, containerProps) {
	    var unitLengthsObj = {
	        'em': getSpanDimension(document, container, { 'display': 'inline-block', 'visibility': 'hidden', 'font-size': '1' + UnitType.em, 'line-height': '1' + UnitType.em }).height,
	        'rem': getSpanDimension(document, document.body, { 'display': 'inline-block', 'visibility': 'hidden', 'font-size': '1' + UnitType.rem, 'line-height': '1' + UnitType.rem }).height,
	        'px': getSpanDimension(document, container, { 'display': 'inline-block', 'visibility': 'hidden', 'font-size': '1' + UnitType.px, 'line-height': '1' + UnitType.px }).height,
	        'pt': getSpanDimension(document, container, { 'display': 'inline-block', 'visibility': 'hidden', 'font-size': '1' + UnitType.pt, 'line-height': '1' + UnitType.pt }).height,
	        'hPercentage': containerProps.height / 100,
	        'wPercentage': containerProps.width / 100
	    };
	    return unitLengthsObj;
	}
	//# sourceMappingURL=length-unit-generator.js.map

	function getAllValuesofObj(obj) {
	    var values = Object.keys(obj).map(function (key) {
	        return obj[key];
	    });
	    return values;
	}
	//# sourceMappingURL=index.js.map

	function create_fragment(ctx) {
	  var input;
	  var input_checked_value;
	  var dispose;
	  return {
	    c: function c() {
	      input = element("input");
	      attr(input, "class", "fg-input-type-checkbox");
	      attr(input, "type", "checkbox");
	      input.checked = input_checked_value =
	      /*headerRowSelected*/
	      ctx[1] ? true : false;
	    },
	    m: function m(target, anchor) {
	      insert(target, input, anchor);
	      dispose = listen(input, "click",
	      /*onGlobalSelect*/
	      ctx[0]);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*headerRowSelected*/
	      2 && input_checked_value !== (input_checked_value =
	      /*headerRowSelected*/
	      ctx[1] ? true : false)) {
	        input.checked = input_checked_value;
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(input);
	      dispose();
	    }
	  };
	}

	function instance($$self, $$props, $$invalidate) {
	  var onGlobalSelect = $$props.onGlobalSelect;
	  var headerRowSelected = $$props.headerRowSelected;

	  $$self.$set = function ($$props) {
	    if ("onGlobalSelect" in $$props) $$invalidate(0, onGlobalSelect = $$props.onGlobalSelect);
	    if ("headerRowSelected" in $$props) $$invalidate(1, headerRowSelected = $$props.headerRowSelected);
	  };

	  return [onGlobalSelect, headerRowSelected];
	}

	var Checkbox =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Checkbox, _SvelteComponent);

	  function Checkbox(options) {
	    var _this;

	    _classCallCheck(this, Checkbox);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).call(this));
	    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
	      onGlobalSelect: 0,
	      headerRowSelected: 1
	    });
	    return _this;
	  }

	  return Checkbox;
	}(SvelteComponent);

	function create_fragment$1(ctx) {
	  var svg;
	  var g1;
	  var g0;
	  var circle0;
	  var path0;
	  var path1;
	  var circle1;
	  var dispose;
	  return {
	    c: function c() {
	      svg = svg_element("svg");
	      g1 = svg_element("g");
	      g0 = svg_element("g");
	      circle0 = svg_element("circle");
	      path0 = svg_element("path");
	      path1 = svg_element("path");
	      circle1 = svg_element("circle");
	      attr(circle0, "id", "Oval");
	      attr(circle0, "cx", "6");
	      attr(circle0, "cy", "3.56");
	      attr(circle0, "r", "1");
	      attr(path0, "d", "M6.69333333,5.8432 L6.69333333,8.58986667 C6.69333333,8.97278409 6.38291743,9.2832 6,9.2832 C5.61708257,9.2832 5.30666667,8.97278409 5.30666667,8.58986667 L5.30666667,5.8432 C5.30666667,5.46028257 5.61708257,5.14986667 6,5.14986667 C6.38291743,5.14986667 6.69333333,5.46028257 6.69333333,5.8432 L6.69333333,5.8432 Z");
	      attr(path0, "id", "Path");
	      attr(path1, "d", "M6,0 C2.6864,0 0,2.6864 0,6 C0,9.3136 2.6864,12 6,12 C9.3136,12 12,9.3136 12,6 C12,2.6864 9.3136,0 6,0 Z M9.48826667,9.48826667 C8.24562877,10.7522766 6.42039718,11.2524824 4.70696578,10.798585 C2.99353438,10.3446876 1.6553124,9.00646562 1.20141502,7.29303422 C0.747517648,5.57960282 1.24772343,3.75437123 2.51173333,2.51173333 C3.75437123,1.24772343 5.57960282,0.747517648 7.29303422,1.20141502 C9.00646562,1.6553124 10.3446876,2.99353438 10.798585,4.70696578 C11.2524824,6.42039718 10.7522766,8.24562877 9.48826667,9.48826667 Z");
	      attr(path1, "id", "Shape");
	      attr(circle1, "id", "Tracker");
	      attr(circle1, "cx", "6");
	      attr(circle1, "cy", "6");
	      attr(circle1, "r", "6");
	      attr(circle1, "fill", "#c0c0c0");
	      attr(circle1, "fill-opacity", "0.000001");
	      attr(g0, "id", "Info-Icon");
	      attr(g0, "fill", "#60728B");
	      attr(g0, "fill-rule", "nonzero");
	      attr(g1, "id", "Symbols");
	      attr(g1, "stroke", "none");
	      attr(g1, "stroke-width", "1");
	      attr(g1, "fill", "none");
	      attr(svg, "width", "12px");
	      attr(svg, "height", "12px");
	      attr(svg, "viewBox", "0 0 12 12");
	      attr(svg, "version", "1.1");
	      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
	      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
	    },
	    m: function m(target, anchor) {
	      insert(target, svg, anchor);
	      append(svg, g1);
	      append(g1, g0);
	      append(g0, circle0);
	      append(g0, path0);
	      append(g0, path1);
	      append(g0, circle1);
	      dispose = [listen(circle1, "mouseover",
	      /*handleMouseOver*/
	      ctx[0]), listen(circle1, "mousemove",
	      /*handleMouseMove*/
	      ctx[1]), listen(circle1, "mouseout",
	      /*handleMouseOut*/
	      ctx[2])];
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(svg);
	      run_all(dispose);
	    }
	  };
	}

	function instance$1($$self, $$props, $$invalidate) {
	  var tooltext = $$props.tooltext,
	      _$$props$tooltipRef = $$props.tooltipRef,
	      tooltipRef = _$$props$tooltipRef === void 0 ? getContext("tooltipRef") : _$$props$tooltipRef;

	  function handleMouseOver(e) {
	    tooltipRef.tooltip.show(tooltext, e.pageX, e.pageY);
	  }

	  function handleMouseMove(e) {
	    tooltipRef.tooltip.update(e.pageX, e.pageY);
	  }

	  function handleMouseOut() {
	    tooltipRef.tooltip.hide();
	  }

	  $$self.$set = function ($$props) {
	    if ("tooltext" in $$props) $$invalidate(3, tooltext = $$props.tooltext);
	    if ("tooltipRef" in $$props) $$invalidate(4, tooltipRef = $$props.tooltipRef);
	  };

	  return [handleMouseOver, handleMouseMove, handleMouseOut, tooltext, tooltipRef];
	}

	var HelperIcon =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(HelperIcon, _SvelteComponent);

	  function HelperIcon(options) {
	    var _this;

	    _classCallCheck(this, HelperIcon);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(HelperIcon).call(this));
	    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
	      tooltext: 3,
	      tooltipRef: 4
	    });
	    return _this;
	  }

	  return HelperIcon;
	}(SvelteComponent);

	function create_else_block(ctx) {
	  var div;
	  var t;
	  var if_block_anchor;
	  var current;
	  var if_block =
	  /*showHelperIcon*/
	  ctx[3] && create_if_block_1(ctx);
	  return {
	    c: function c() {
	      div = element("div");
	      t = space();
	      if (if_block) if_block.c();
	      if_block_anchor = empty();
	      attr(div, "class", "fg-header-cell-content");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      div.innerHTML =
	      /*cellContent*/
	      ctx[5];
	      insert(target, t, anchor);
	      if (if_block) if_block.m(target, anchor);
	      insert(target, if_block_anchor, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      if (!current || dirty[0] &
	      /*cellContent*/
	      32) div.innerHTML =
	      /*cellContent*/
	      ctx[5];

	      if (
	      /*showHelperIcon*/
	      ctx[3]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	          transition_in(if_block, 1);
	        } else {
	          if_block = create_if_block_1(ctx);
	          if_block.c();
	          transition_in(if_block, 1);
	          if_block.m(if_block_anchor.parentNode, if_block_anchor);
	        }
	      } else if (if_block) {
	        group_outros();
	        transition_out(if_block, 1, 1, function () {
	          if_block = null;
	        });
	        check_outros();
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      if (detaching) detach(t);
	      if (if_block) if_block.d(detaching);
	      if (detaching) detach(if_block_anchor);
	    }
	  };
	} // (103:2) {#if isSelectionCell}


	function create_if_block(ctx) {
	  var div;
	  var current;
	  var checkbox = new Checkbox({
	    props: {
	      headerRowSelected:
	      /*headerRowSelected*/
	      ctx[2],
	      onGlobalSelect:
	      /*onGlobalSelect*/
	      ctx[1]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(checkbox.$$.fragment);
	      attr(div, "class", "fg-header-cell-checkbox");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(checkbox, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var checkbox_changes = {};
	      if (dirty[0] &
	      /*headerRowSelected*/
	      4) checkbox_changes.headerRowSelected =
	      /*headerRowSelected*/
	      ctx[2];
	      if (dirty[0] &
	      /*onGlobalSelect*/
	      2) checkbox_changes.onGlobalSelect =
	      /*onGlobalSelect*/
	      ctx[1];
	      checkbox.$set(checkbox_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(checkbox.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(checkbox.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(checkbox);
	    }
	  };
	} // (111:4) {#if showHelperIcon}


	function create_if_block_1(ctx) {
	  var div;
	  var current;
	  var helpericon = new HelperIcon({
	    props: {
	      tooltext:
	      /*tooltipContent*/
	      ctx[6]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(helpericon.$$.fragment);
	      attr(div, "class", "fg-header-helper-icon");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(helpericon, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var helpericon_changes = {};
	      if (dirty[0] &
	      /*tooltipContent*/
	      64) helpericon_changes.tooltext =
	      /*tooltipContent*/
	      ctx[6];
	      helpericon.$set(helpericon_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(helpericon.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(helpericon.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(helpericon);
	    }
	  };
	}

	function create_fragment$2(ctx) {
	  var div;
	  var current_block_type_index;
	  var if_block;
	  var div_class_value;
	  var div_style_value;
	  var current;
	  var dispose;
	  var if_block_creators = [create_if_block, create_else_block];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*isSelectionCell*/
	    ctx[10]) return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  return {
	    c: function c() {
	      div = element("div");
	      if_block.c();
	      attr(div, "class", div_class_value = "fg-header-cell " +
	      /*extClassNames*/
	      ctx[4] + "\n  " +
	      /*hoverClass*/
	      ctx[7]);
	      attr(div, "style", div_style_value = "" + (
	      /*style*/
	      ctx[0] +
	      /*extInlineStyleStr*/
	      ctx[8]));
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      if_blocks[current_block_type_index].m(div, null);
	      /*div_binding*/

	      ctx[34](div);
	      current = true;
	      dispose = [listen(div, "mouseover",
	      /*handleMouseOver*/
	      ctx[11]), listen(div, "mousemove",
	      /*handleMouseMove*/
	      ctx[12]), listen(div, "mouseout",
	      /*handleMouseOut*/
	      ctx[13]), listen(div, "click",
	      /*handleClick*/
	      ctx[14])];
	    },
	    p: function p(ctx, dirty) {
	      var previous_block_index = current_block_type_index;
	      current_block_type_index = select_block_type(ctx);

	      if (current_block_type_index === previous_block_index) {
	        if_blocks[current_block_type_index].p(ctx, dirty);
	      } else {
	        group_outros();
	        transition_out(if_blocks[previous_block_index], 1, 1, function () {
	          if_blocks[previous_block_index] = null;
	        });
	        check_outros();
	        if_block = if_blocks[current_block_type_index];

	        if (!if_block) {
	          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	          if_block.c();
	        }

	        transition_in(if_block, 1);
	        if_block.m(div, null);
	      }

	      if (!current || dirty[0] &
	      /*extClassNames, hoverClass*/
	      144 && div_class_value !== (div_class_value = "fg-header-cell " +
	      /*extClassNames*/
	      ctx[4] + "\n  " +
	      /*hoverClass*/
	      ctx[7])) {
	        attr(div, "class", div_class_value);
	      }

	      if (!current || dirty[0] &
	      /*style, extInlineStyleStr*/
	      257 && div_style_value !== (div_style_value = "" + (
	      /*style*/
	      ctx[0] +
	      /*extInlineStyleStr*/
	      ctx[8]))) {
	        attr(div, "style", div_style_value);
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      if_blocks[current_block_type_index].d();
	      /*div_binding*/

	      ctx[34](null);
	      run_all(dispose);
	    }
	  };
	}

	function instance$2($$self, $$props, $$invalidate) {
	  var cellIndex = $$props.cellIndex;
	  var style = $$props.style;
	  var hovered = $$props.hovered;
	  var onGlobalSelect = $$props.onGlobalSelect;
	  var headerRowSelected = $$props.headerRowSelected;
	  var gridData = $$props.gridData;
	  var checkBoxEnabled = $$props.checkBoxEnabled;
	  var selectionFeature,
	      dispatch = createEventDispatcher(),
	      showHelperIcon,
	      tooltipRef = getContext("tooltipRef"),
	      dispatchEvent = getContext("dispatchEvent");
	  var cellInfo,
	      extClassNames,
	      extInlineStyle,
	      cellContent,
	      tooltipContent = "",
	      hoverClass,
	      extInlineStyleStr = "",
	      extHoverClasses,
	      extHoverStyle,
	      cellElem,
	      colindex,
	      rowindex,
	      showTooltip,
	      columnType,
	      reduceColumnIndexBy,
	      isSelectionCell,
	      parsedGridConfig = getContext("parsedGridConfig"),
	      mergedExtStyle;

	  function handleMouseOver(e) {
	    !isSelectionCell && dispatch("cellHoverIn", {
	      visualColIndex: colindex + reduceColumnIndexBy,
	      rowindex: rowindex,
	      actualColIndex: colindex
	    });
	    showTooltip && tooltipRef.tooltip.show(tooltipContent, e.pageX, e.pageY);
	  }

	  function handleMouseMove(e) {
	    showTooltip && tooltipRef.tooltip.update(e.pageX, e.pageY);
	  }

	  function handleMouseOut() {
	    !isSelectionCell && dispatch("cellHoverOut", {
	      visualColIndex: colindex + reduceColumnIndexBy,
	      rowindex: rowindex,
	      actualColIndex: colindex
	    });
	    showTooltip && tooltipRef.tooltip.hide();
	  }

	  function handleClick(e) {
	    var rowConfig = getContext("parsedRowConfig");
	    dispatchEvent("headerclicked", {
	      columnType: columnType,
	      cellIndex: cellIndex,
	      rowHeight: rowConfig.headerRowHeight,
	      filterEnabled: undefined,
	      // @todo: need to set proper value after implementing filter feature
	      sortEnabled: undefined // @todo: need to set proper value after implementing column feature

	    }, e);
	  }

	  function div_binding($$value) {
	    binding_callbacks[$$value ? "unshift" : "push"](function () {
	      $$invalidate(9, cellElem = $$value);
	    });
	  }

	  $$self.$set = function ($$props) {
	    if ("cellIndex" in $$props) $$invalidate(15, cellIndex = $$props.cellIndex);
	    if ("style" in $$props) $$invalidate(0, style = $$props.style);
	    if ("hovered" in $$props) $$invalidate(16, hovered = $$props.hovered);
	    if ("onGlobalSelect" in $$props) $$invalidate(1, onGlobalSelect = $$props.onGlobalSelect);
	    if ("headerRowSelected" in $$props) $$invalidate(2, headerRowSelected = $$props.headerRowSelected);
	    if ("gridData" in $$props) $$invalidate(17, gridData = $$props.gridData);
	    if ("checkBoxEnabled" in $$props) $$invalidate(18, checkBoxEnabled = $$props.checkBoxEnabled);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty[0] &
	    /*checkBoxEnabled, cellIndex, gridData, reduceColumnIndexBy, cellInfo, hovered, colindex, showHelperIcon, tooltipContent, extInlineStyle, extHoverStyle, mergedExtStyle, extInlineStyleStr, extHoverClasses*/
	    419397960) {
	       {
	        $$invalidate(27, reduceColumnIndexBy = 0);

	        if (checkBoxEnabled && cellIndex) {
	          $$invalidate(27, reduceColumnIndexBy = 1);
	        }

	        $$invalidate(10, isSelectionCell = checkBoxEnabled && cellIndex == 0);
	        $$invalidate(19, cellInfo = gridData.getHeaderMetaInfo(cellIndex - reduceColumnIndexBy));
	        $$invalidate(4, extClassNames = (cellInfo.class || []).join(" "));
	        $$invalidate(20, extInlineStyle = cellInfo.style);
	        $$invalidate(5, cellContent = cellInfo.content);
	        $$invalidate(21, extHoverClasses = cellInfo.hoverClass);
	        $$invalidate(23, colindex = cellInfo.params.cellIndex);
	        $$invalidate(22, extHoverStyle = hovered && cellInfo.hoverStyle);
	        rowindex = cellInfo.params.rowIndex;
	        $$invalidate(3, showHelperIcon = cellInfo.showTooltipInHelper);
	        columnType = parsedGridConfig.columns[colindex].type, showTooltip = !showHelperIcon && cellInfo.tooltipContent.length;

	        if (Array.isArray(cellInfo.tooltipContent)) {
	          cellInfo.tooltipContent.forEach(function (content) {
	            return $$invalidate(6, tooltipContent += content);
	          });
	        } else {
	          $$invalidate(6, tooltipContent = cellInfo.tooltipContent);
	        }

	        $$invalidate(8, extInlineStyleStr = "");
	        $$invalidate(28, mergedExtStyle = _objectSpread2({}, extInlineStyle, {}, extHoverStyle));

	        for (var key in mergedExtStyle) {
	          $$invalidate(8, extInlineStyleStr += key + ":" + mergedExtStyle[key] + ";");
	        }

	        $$invalidate(7, hoverClass = hovered ? extHoverClasses.join(" ") || "fg-column-header-hover " : "");
	      }
	    }
	  };

	  return [style, onGlobalSelect, headerRowSelected, showHelperIcon, extClassNames, cellContent, tooltipContent, hoverClass, extInlineStyleStr, cellElem, isSelectionCell, handleMouseOver, handleMouseMove, handleMouseOut, handleClick, cellIndex, hovered, gridData, checkBoxEnabled, cellInfo, extInlineStyle, extHoverClasses, extHoverStyle, colindex, rowindex, showTooltip, columnType, reduceColumnIndexBy, mergedExtStyle, selectionFeature, dispatch, tooltipRef, dispatchEvent, parsedGridConfig, div_binding];
	}

	var Cell =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Cell, _SvelteComponent);

	  function Cell(options) {
	    var _this;

	    _classCallCheck(this, Cell);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cell).call(this));
	    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
	      cellIndex: 15,
	      style: 0,
	      hovered: 16,
	      onGlobalSelect: 1,
	      headerRowSelected: 2,
	      gridData: 17,
	      checkBoxEnabled: 18
	    }, [-1, -1]);
	    return _this;
	  }

	  return Cell;
	}(SvelteComponent);

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
	};

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;


	// `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim
	_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	function create_if_block$1(ctx) {
	  var svg;
	  var rect;
	  var rect_x_value;
	  var rect_y_value;
	  var rect_width_value;
	  var rect_height_value;
	  var rect_class_value;
	  var rect_style_value;
	  var svg_height_value;
	  var svg_width_value;
	  var if_block0 =
	  /*showHundrePercentBar*/
	  ctx[18] && create_if_block_2(ctx);
	  var if_block1 =
	  /*showValue*/
	  ctx[17] == true && create_if_block_1$1(ctx);
	  return {
	    c: function c() {
	      svg = svg_element("svg");
	      if (if_block0) if_block0.c();
	      rect = svg_element("rect");
	      if (if_block1) if_block1.c();
	      attr(rect, "x", rect_x_value = "" + (
	      /*plotLeft*/
	      ctx[4] + "px"));
	      attr(rect, "y", rect_y_value = "" + (
	      /*plotDim*/
	      ctx[8].top + "px"));
	      attr(rect, "width", rect_width_value = "" + (
	      /*plotWidth*/
	      ctx[5] + "px"));
	      attr(rect, "height", rect_height_value = "" + (
	      /*plotDim*/
	      ctx[8].height + "px"));
	      attr(rect, "fill",
	      /*plotColor*/
	      ctx[6]);
	      attr(rect, "class", rect_class_value =
	      /*barClass*/
	      ctx[13] ?
	      /*barClass*/
	      ctx[13] : "");
	      attr(rect, "style", rect_style_value =
	      /*inlineBarStyle*/
	      ctx[14] ?
	      /*inlineBarStyle*/
	      ctx[14] : "");
	      attr(svg, "height", svg_height_value = "" + (
	      /*rowHeight*/
	      ctx[1] + "px"));
	      attr(svg, "width", svg_width_value = "" + (
	      /*cellState*/
	      ctx[2].width + "px"));
	      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
	    },
	    m: function m(target, anchor) {
	      insert(target, svg, anchor);
	      if (if_block0) if_block0.m(svg, null);
	      append(svg, rect);
	      if (if_block1) if_block1.m(svg, null);
	    },
	    p: function p(ctx, dirty) {
	      if (
	      /*showHundrePercentBar*/
	      ctx[18]) if_block0.p(ctx, dirty);

	      if (dirty[0] &
	      /*plotLeft*/
	      16 && rect_x_value !== (rect_x_value = "" + (
	      /*plotLeft*/
	      ctx[4] + "px"))) {
	        attr(rect, "x", rect_x_value);
	      }

	      if (dirty[0] &
	      /*plotDim*/
	      256 && rect_y_value !== (rect_y_value = "" + (
	      /*plotDim*/
	      ctx[8].top + "px"))) {
	        attr(rect, "y", rect_y_value);
	      }

	      if (dirty[0] &
	      /*plotWidth*/
	      32 && rect_width_value !== (rect_width_value = "" + (
	      /*plotWidth*/
	      ctx[5] + "px"))) {
	        attr(rect, "width", rect_width_value);
	      }

	      if (dirty[0] &
	      /*plotDim*/
	      256 && rect_height_value !== (rect_height_value = "" + (
	      /*plotDim*/
	      ctx[8].height + "px"))) {
	        attr(rect, "height", rect_height_value);
	      }

	      if (dirty[0] &
	      /*plotColor*/
	      64) {
	        attr(rect, "fill",
	        /*plotColor*/
	        ctx[6]);
	      }

	      if (dirty[0] &
	      /*barClass*/
	      8192 && rect_class_value !== (rect_class_value =
	      /*barClass*/
	      ctx[13] ?
	      /*barClass*/
	      ctx[13] : "")) {
	        attr(rect, "class", rect_class_value);
	      }

	      if (dirty[0] &
	      /*inlineBarStyle*/
	      16384 && rect_style_value !== (rect_style_value =
	      /*inlineBarStyle*/
	      ctx[14] ?
	      /*inlineBarStyle*/
	      ctx[14] : "")) {
	        attr(rect, "style", rect_style_value);
	      }

	      if (
	      /*showValue*/
	      ctx[17] == true) if_block1.p(ctx, dirty);

	      if (dirty[0] &
	      /*rowHeight*/
	      2 && svg_height_value !== (svg_height_value = "" + (
	      /*rowHeight*/
	      ctx[1] + "px"))) {
	        attr(svg, "height", svg_height_value);
	      }

	      if (dirty[0] &
	      /*cellState*/
	      4 && svg_width_value !== (svg_width_value = "" + (
	      /*cellState*/
	      ctx[2].width + "px"))) {
	        attr(svg, "width", svg_width_value);
	      }
	    },
	    d: function d(detaching) {
	      if (detaching) detach(svg);
	      if (if_block0) if_block0.d();
	      if (if_block1) if_block1.d();
	    }
	  };
	} // (181:4) {#if showHundrePercentBar}


	function create_if_block_2(ctx) {
	  var rect;
	  var rect_x_value;
	  var rect_y_value;
	  var rect_width_value;
	  var rect_height_value;
	  var rect_class_value;
	  var rect_style_value;
	  return {
	    c: function c() {
	      rect = svg_element("rect");
	      attr(rect, "x", rect_x_value = "" + (
	      /*progressBackgroundLeft*/
	      ctx[10] + "px"));
	      attr(rect, "y", rect_y_value = "" + (
	      /*plotDim*/
	      ctx[8].top + "px"));
	      attr(rect, "width", rect_width_value = "" + (
	      /*progressBackgroundWidth*/
	      ctx[11] + "px"));
	      attr(rect, "height", rect_height_value = "" + (
	      /*plotDim*/
	      ctx[8].height + "px"));
	      attr(rect, "fill",
	      /*plotColor*/
	      ctx[6]);
	      attr(rect, "opacity",
	      /*progressBarOpacity*/
	      ctx[19]);
	      attr(rect, "class", rect_class_value =
	      /*hundredPercentBarClass*/
	      ctx[20] ?
	      /*hundredPercentBarClass*/
	      ctx[20] : "");
	      attr(rect, "style", rect_style_value =
	      /*inlineBackgroundStyle*/
	      ctx[16] ?
	      /*inlineBackgroundStyle*/
	      ctx[16] : "");
	    },
	    m: function m(target, anchor) {
	      insert(target, rect, anchor);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty[0] &
	      /*progressBackgroundLeft*/
	      1024 && rect_x_value !== (rect_x_value = "" + (
	      /*progressBackgroundLeft*/
	      ctx[10] + "px"))) {
	        attr(rect, "x", rect_x_value);
	      }

	      if (dirty[0] &
	      /*plotDim*/
	      256 && rect_y_value !== (rect_y_value = "" + (
	      /*plotDim*/
	      ctx[8].top + "px"))) {
	        attr(rect, "y", rect_y_value);
	      }

	      if (dirty[0] &
	      /*progressBackgroundWidth*/
	      2048 && rect_width_value !== (rect_width_value = "" + (
	      /*progressBackgroundWidth*/
	      ctx[11] + "px"))) {
	        attr(rect, "width", rect_width_value);
	      }

	      if (dirty[0] &
	      /*plotDim*/
	      256 && rect_height_value !== (rect_height_value = "" + (
	      /*plotDim*/
	      ctx[8].height + "px"))) {
	        attr(rect, "height", rect_height_value);
	      }

	      if (dirty[0] &
	      /*plotColor*/
	      64) {
	        attr(rect, "fill",
	        /*plotColor*/
	        ctx[6]);
	      }

	      if (dirty[0] &
	      /*inlineBackgroundStyle*/
	      65536 && rect_style_value !== (rect_style_value =
	      /*inlineBackgroundStyle*/
	      ctx[16] ?
	      /*inlineBackgroundStyle*/
	      ctx[16] : "")) {
	        attr(rect, "style", rect_style_value);
	      }
	    },
	    d: function d(detaching) {
	      if (detaching) detach(rect);
	    }
	  };
	} // (200:4) {#if showValue == true}


	function create_if_block_1$1(ctx) {
	  var text_1;
	  var t;
	  var text_1_x_value;
	  var text_1_y_value;
	  var text_1_font_size_value;
	  var text_1_class_value;
	  var text_1_style_value;
	  return {
	    c: function c() {
	      text_1 = svg_element("text");
	      t = text(
	      /*cellContent*/
	      ctx[0]);
	      attr(text_1, "x", text_1_x_value = "" + (
	      /*labelLeft*/
	      ctx[7] + "px"));
	      attr(text_1, "y", text_1_y_value = "" + (
	      /*labelDim*/
	      ctx[9].top + "px"));
	      attr(text_1, "fill", "#5f5f5f");
	      attr(text_1, "font-size", text_1_font_size_value =
	      /*labelDim*/
	      ctx[9].fontSize);
	      attr(text_1, "class", text_1_class_value =
	      /*valueTextClass*/
	      ctx[21] ?
	      /*valueTextClass*/
	      ctx[21] : "");
	      attr(text_1, "style", text_1_style_value =
	      /*inlineTextStyle*/
	      ctx[15] ?
	      /*inlineTextStyle*/
	      ctx[15] : "");
	      attr(text_1, "text-anchor",
	      /*textAnchorProp*/
	      ctx[12]);
	    },
	    m: function m(target, anchor) {
	      insert(target, text_1, anchor);
	      append(text_1, t);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty[0] &
	      /*cellContent*/
	      1) set_data(t,
	      /*cellContent*/
	      ctx[0]);

	      if (dirty[0] &
	      /*labelLeft*/
	      128 && text_1_x_value !== (text_1_x_value = "" + (
	      /*labelLeft*/
	      ctx[7] + "px"))) {
	        attr(text_1, "x", text_1_x_value);
	      }

	      if (dirty[0] &
	      /*labelDim*/
	      512 && text_1_y_value !== (text_1_y_value = "" + (
	      /*labelDim*/
	      ctx[9].top + "px"))) {
	        attr(text_1, "y", text_1_y_value);
	      }

	      if (dirty[0] &
	      /*labelDim*/
	      512 && text_1_font_size_value !== (text_1_font_size_value =
	      /*labelDim*/
	      ctx[9].fontSize)) {
	        attr(text_1, "font-size", text_1_font_size_value);
	      }

	      if (dirty[0] &
	      /*inlineTextStyle*/
	      32768 && text_1_style_value !== (text_1_style_value =
	      /*inlineTextStyle*/
	      ctx[15] ?
	      /*inlineTextStyle*/
	      ctx[15] : "")) {
	        attr(text_1, "style", text_1_style_value);
	      }

	      if (dirty[0] &
	      /*textAnchorProp*/
	      4096) {
	        attr(text_1, "text-anchor",
	        /*textAnchorProp*/
	        ctx[12]);
	      }
	    },
	    d: function d(detaching) {
	      if (detaching) detach(text_1);
	    }
	  };
	}

	function create_fragment$3(ctx) {
	  var if_block_anchor;
	  var if_block =
	  /*cellOrinalVal*/
	  ctx[3] != null && create_if_block$1(ctx);
	  return {
	    c: function c() {
	      if (if_block) if_block.c();
	      if_block_anchor = empty();
	    },
	    m: function m(target, anchor) {
	      if (if_block) if_block.m(target, anchor);
	      insert(target, if_block_anchor, anchor);
	    },
	    p: function p(ctx, dirty) {
	      if (
	      /*cellOrinalVal*/
	      ctx[3] != null) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	        } else {
	          if_block = create_if_block$1(ctx);
	          if_block.c();
	          if_block.m(if_block_anchor.parentNode, if_block_anchor);
	        }
	      } else if (if_block) {
	        if_block.d(1);
	        if_block = null;
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (if_block) if_block.d(detaching);
	      if (detaching) detach(if_block_anchor);
	    }
	  };
	}

	function instance$3($$self, $$props, $$invalidate) {
	  var cellContent = $$props.cellContent;
	  var scale = $$props.scale;
	  var rowHeight = $$props.rowHeight;
	  var cellState = $$props.cellState,
	      cellIndex = $$props.cellIndex,
	      cellOrinalVal = $$props.cellOrinalVal,
	      inlineChartStyle = $$props.inlineChartStyle;

	  var parsedGridConfig = getContext("parsedGridConfig"),
	      gridContainer = getContext("gridContainer"),
	      currColumnConfig = parsedGridConfig.columns[cellIndex].derivedChartConfig,
	      showValue = currColumnConfig.showvalue,
	      valueTextAlignment = currColumnConfig.valuetextalignment,
	      valueTextPosition = currColumnConfig.valuetextposition,
	      showHundrePercentBar = currColumnConfig.showhundredpercentbar,
	      plotLeft,
	      plotWidth,
	      plotColor,
	      labelLeft,
	      plotDim,
	      labelDim,
	      barWidth,
	      chartDim,
	      contentApproximateWidth,
	      zeroValuePos,
	      progressBackgroundLeft,
	      _ref = _toConsumableArray(scale.getRange()),
	      progressBackgroundNegative = _ref[0],
	      progressBackgroundPositive = _ref[1],
	      progressBackgroundWidth,
	      textAnchorProp = ValueTextAlignmentType.start,
	      progressBarOpacity = 0.35,
	      positiveBarClass = inlineChartStyle.positiveBarClass && [].concat(inlineChartStyle.positiveBarClass).join(" "),
	      positiveBarStyle = inlineChartStyle.positiveBarStyle,
	      negativeBarClass = inlineChartStyle.negativeBarClass && [].concat(inlineChartStyle.negativeBarClass).join(" "),
	      negativeBarStyle = inlineChartStyle.negativeBarStyle,
	      hundredPercentBarClass = inlineChartStyle.hundredPercentBarClass && [].concat(inlineChartStyle.hundredPercentBarClass).join(" "),
	      hundredPercentBarStyle = inlineChartStyle.hundredPercentBarStyle,
	      barClass,
	      inlineBarStyle,
	      inlineTextStyle = "",
	      inlineBackgroundStyle = "",
	      valueTextClass = inlineChartStyle.valueTextClass && [].concat(inlineChartStyle.valueTextClass).join(" "),
	      valueTextStyle = inlineChartStyle.valueTextStyle;

	  for (var key in hundredPercentBarStyle) {
	    inlineBackgroundStyle += key + ":" + hundredPercentBarStyle[key] + ";";
	  }

	  for (var _key in valueTextStyle) {
	    inlineTextStyle += _key + ":" + valueTextStyle[_key] + ";";
	  }

	  $$self.$set = function ($$props) {
	    if ("cellContent" in $$props) $$invalidate(0, cellContent = $$props.cellContent);
	    if ("scale" in $$props) $$invalidate(22, scale = $$props.scale);
	    if ("rowHeight" in $$props) $$invalidate(1, rowHeight = $$props.rowHeight);
	    if ("cellState" in $$props) $$invalidate(2, cellState = $$props.cellState);
	    if ("cellIndex" in $$props) $$invalidate(23, cellIndex = $$props.cellIndex);
	    if ("cellOrinalVal" in $$props) $$invalidate(3, cellOrinalVal = $$props.cellOrinalVal);
	    if ("inlineChartStyle" in $$props) $$invalidate(24, inlineChartStyle = $$props.inlineChartStyle);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty[0] &
	    /*cellOrinalVal, scale, cellState, labelDim, cellContent, zeroValuePos, inlineBarStyle, barWidth, plotWidth, plotLeft, progressBackgroundWidth, chartDim, contentApproximateWidth, labelLeft*/
	    507529917) {
	       if (cellOrinalVal != null) {
	        $$invalidate(14, inlineBarStyle = "");
	        $$invalidate(7, labelLeft = 0);
	        $$invalidate(25, barWidth = scale.getRangeValue(cellOrinalVal));
	        $$invalidate(8, plotDim = cellState.inlinechartDim.dataSetDimention);
	        $$invalidate(9, labelDim = cellState.inlinechartDim.labelDimention);
	        $$invalidate(26, chartDim = cellState.inlinechartDim.chartDimention);
	        $$invalidate(27, contentApproximateWidth = getSpanDimension(document, gridContainer, {
	          "font-size": labelDim.fontSize + "px"
	        }, cellContent).width);
	        $$invalidate(28, zeroValuePos = scale.getRangeValue(0));

	        if (cellOrinalVal >= 0) {
	          $$invalidate(10, progressBackgroundLeft = $$invalidate(4, plotLeft = zeroValuePos));
	          $$invalidate(13, barClass = positiveBarClass);

	          for (var _key2 in positiveBarStyle) {
	            $$invalidate(14, inlineBarStyle += _key2 + ":" + positiveBarStyle[_key2] + ";");
	          }

	          $$invalidate(5, plotWidth = barWidth - zeroValuePos);
	          $$invalidate(6, plotColor = "#00b7e4");
	          $$invalidate(5, plotWidth = plotWidth > 0 && plotWidth < 1 ? 1 : plotWidth);
	          $$invalidate(11, progressBackgroundWidth = progressBackgroundPositive - zeroValuePos);

	          if (valueTextAlignment === ValueTextAlignmentType.start) {
	            $$invalidate(7, labelLeft = valueTextPosition === ValueTextPositionType.inside ? plotLeft + 5 : zeroValuePos);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.start);
	          } else if (valueTextAlignment === ValueTextAlignmentType.middle) {
	            $$invalidate(7, labelLeft = valueTextPosition === ValueTextPositionType.inside ? plotLeft + plotWidth * 0.5 : plotLeft + progressBackgroundWidth * 0.5);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.middle);
	          } else if (valueTextAlignment === ValueTextAlignmentType.end) {
	            $$invalidate(7, labelLeft = valueTextPosition === ValueTextPositionType.inside ? plotLeft + plotWidth - 5 : progressBackgroundPositive);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.end);
	          }

	          if (valueTextPosition === ValueTextPositionType.right) {
	            $$invalidate(7, labelLeft = progressBackgroundPositive + chartDim.labelDataSetHGap + labelDim.width - progressBackgroundNegative);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.end);
	          } else if (valueTextPosition === ValueTextPositionType.left) {
	            $$invalidate(7, labelLeft = chartDim.leftPadding);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.start);
	          } // special check added, when text nodes with positive values are getting out of available width, updating labelLeft to position within cell


	          if (valueTextPosition !== ValueTextPositionType.left && valueTextPosition !== ValueTextPositionType.right) {
	            if (contentApproximateWidth > cellState.width) {
	              $$invalidate(7, labelLeft = chartDim.leftPadding);
	              $$invalidate(12, textAnchorProp = ValueTextAlignmentType.start);
	            } else if (valueTextAlignment === ValueTextAlignmentType.start && contentApproximateWidth + labelLeft > cellState.width) {
	              $$invalidate(7, labelLeft -= contentApproximateWidth + labelLeft + chartDim.rightPadding - cellState.width);
	            } else if (valueTextAlignment === ValueTextAlignmentType.middle && contentApproximateWidth / 2 + labelLeft > cellState.width) {
	              // adding half of the contentApproximateWidth as textanchor set as middle
	              $$invalidate(7, labelLeft -= contentApproximateWidth / 2 + labelLeft + chartDim.rightPadding - cellState.width);
	            } else if (valueTextAlignment === ValueTextAlignmentType.end && labelLeft - contentApproximateWidth < 0) {
	              $$invalidate(7, labelLeft += contentApproximateWidth - labelLeft + chartDim.leftPadding);
	            }
	          }
	        } else {
	          $$invalidate(10, progressBackgroundLeft = progressBackgroundNegative);
	          $$invalidate(13, barClass = negativeBarClass);

	          for (var _key3 in negativeBarStyle) {
	            $$invalidate(14, inlineBarStyle += _key3 + ":" + negativeBarStyle[_key3] + ";");
	          }

	          $$invalidate(5, plotWidth = zeroValuePos - barWidth);
	          $$invalidate(5, plotWidth = plotWidth > 0 && plotWidth < 1 ? 1 : plotWidth);
	          $$invalidate(4, plotLeft = barWidth);
	          $$invalidate(11, progressBackgroundWidth = zeroValuePos - progressBackgroundNegative);
	          $$invalidate(6, plotColor = "#ffa75c");

	          if (valueTextAlignment === ValueTextAlignmentType.start) {
	            $$invalidate(7, labelLeft = valueTextPosition === ValueTextPositionType.inside ? zeroValuePos - 5 : zeroValuePos);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.end);
	          } else if (valueTextAlignment === ValueTextAlignmentType.middle) {
	            $$invalidate(7, labelLeft = valueTextPosition === ValueTextPositionType.inside ? plotLeft + plotWidth * 0.5 : zeroValuePos * 0.5);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.middle);
	          } else if (valueTextAlignment === ValueTextAlignmentType.end) {
	            $$invalidate(7, labelLeft = valueTextPosition === ValueTextPositionType.inside ? plotLeft + 5 : progressBackgroundNegative);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.start);
	          }

	          if (valueTextPosition === ValueTextPositionType.right) {
	            $$invalidate(7, labelLeft = progressBackgroundPositive + chartDim.labelDataSetHGap + labelDim.width - progressBackgroundNegative);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.end);
	          } else if (valueTextPosition === ValueTextPositionType.left) {
	            $$invalidate(7, labelLeft = chartDim.leftPadding);
	            $$invalidate(12, textAnchorProp = ValueTextAlignmentType.start);
	          } // special check added, when text nodes with -ve values are getting out of available width, updating labelLeft to position within cell


	          if (valueTextPosition !== ValueTextPositionType.left && valueTextPosition !== ValueTextPositionType.right) {
	            if (contentApproximateWidth > cellState.width) {
	              $$invalidate(7, labelLeft = chartDim.leftPadding);
	              $$invalidate(12, textAnchorProp = ValueTextAlignmentType.start);
	            } else if (valueTextAlignment === ValueTextAlignmentType.start && labelLeft - contentApproximateWidth < 0) {
	              $$invalidate(7, labelLeft += contentApproximateWidth - labelLeft + chartDim.leftPadding);
	            } else if (valueTextAlignment === ValueTextAlignmentType.middle && labelLeft - contentApproximateWidth / 2 < 0) {
	              // adding half of the contentApproximateWidth as textanchor set as middle
	              $$invalidate(7, labelLeft += contentApproximateWidth / 2 - labelLeft + chartDim.leftPadding);
	            } else if (valueTextAlignment === ValueTextAlignmentType.end && contentApproximateWidth + labelLeft + chartDim.rightPadding > cellState.width) {
	              $$invalidate(7, labelLeft -= contentApproximateWidth + labelLeft + chartDim.rightPadding - cellState.width);
	            }
	          }
	        }
	      }
	    }
	  };

	  return [cellContent, rowHeight, cellState, cellOrinalVal, plotLeft, plotWidth, plotColor, labelLeft, plotDim, labelDim, progressBackgroundLeft, progressBackgroundWidth, textAnchorProp, barClass, inlineBarStyle, inlineTextStyle, inlineBackgroundStyle, showValue, showHundrePercentBar, progressBarOpacity, hundredPercentBarClass, valueTextClass, scale, cellIndex, inlineChartStyle];
	}

	var Bar =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Bar, _SvelteComponent);

	  function Bar(options) {
	    var _this;

	    _classCallCheck(this, Bar);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bar).call(this));
	    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
	      cellContent: 0,
	      scale: 22,
	      rowHeight: 1,
	      cellState: 2,
	      cellIndex: 23,
	      cellOrinalVal: 3,
	      inlineChartStyle: 24
	    }, [-1, -1]);
	    return _this;
	  }

	  return Bar;
	}(SvelteComponent);

	function create_fragment$4(ctx) {
	  var input;
	  var input_checked_value;
	  return {
	    c: function c() {
	      input = element("input");
	      attr(input, "class", "fg-input-type-checkbox");
	      attr(input, "type", "checkbox");
	      input.checked = input_checked_value =
	      /*rowSelectionState*/
	      ctx[0] ? true : false;
	    },
	    m: function m(target, anchor) {
	      insert(target, input, anchor);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*rowSelectionState*/
	      1 && input_checked_value !== (input_checked_value =
	      /*rowSelectionState*/
	      ctx[0] ? true : false)) {
	        input.checked = input_checked_value;
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(input);
	    }
	  };
	}

	function instance$4($$self, $$props, $$invalidate) {
	  var rowSelectionState = $$props.rowSelectionState;

	  $$self.$set = function ($$props) {
	    if ("rowSelectionState" in $$props) $$invalidate(0, rowSelectionState = $$props.rowSelectionState);
	  };

	  return [rowSelectionState];
	}

	var Checkbox$1 =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Checkbox, _SvelteComponent);

	  function Checkbox(options) {
	    var _this;

	    _classCallCheck(this, Checkbox);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).call(this));
	    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
	      rowSelectionState: 0
	    });
	    return _this;
	  }

	  return Checkbox;
	}(SvelteComponent);

	function create_else_block$1(ctx) {
	  var div;
	  var div_class_value;
	  var t;
	  var if_block1_anchor;
	  var current;

	  function select_block_type_1(ctx, dirty) {
	    if (
	    /*columnType*/
	    ctx[8] === "html") return create_if_block_3;
	    return create_else_block_1;
	  }

	  var current_block_type = select_block_type_1(ctx);
	  var if_block0 = current_block_type(ctx);
	  var if_block1 =
	  /*showHelperIcon*/
	  ctx[15] && create_if_block_2$1(ctx);
	  return {
	    c: function c() {
	      div = element("div");
	      if_block0.c();
	      t = space();
	      if (if_block1) if_block1.c();
	      if_block1_anchor = empty();
	      attr(div, "class", div_class_value = "fg-cell-content " + (
	      /*columnType*/
	      ctx[8] === "number" ? "fg-cell-content-number" : "fg-cell-content-string"));
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      if_block0.m(div, null);
	      insert(target, t, anchor);
	      if (if_block1) if_block1.m(target, anchor);
	      insert(target, if_block1_anchor, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block0) {
	        if_block0.p(ctx, dirty);
	      } else {
	        if_block0.d(1);
	        if_block0 = current_block_type(ctx);

	        if (if_block0) {
	          if_block0.c();
	          if_block0.m(div, null);
	        }
	      }

	      if (!current || dirty[0] &
	      /*columnType*/
	      256 && div_class_value !== (div_class_value = "fg-cell-content " + (
	      /*columnType*/
	      ctx[8] === "number" ? "fg-cell-content-number" : "fg-cell-content-string"))) {
	        attr(div, "class", div_class_value);
	      }

	      if (
	      /*showHelperIcon*/
	      ctx[15]) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);
	          transition_in(if_block1, 1);
	        } else {
	          if_block1 = create_if_block_2$1(ctx);
	          if_block1.c();
	          transition_in(if_block1, 1);
	          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
	        }
	      } else if (if_block1) {
	        group_outros();
	        transition_out(if_block1, 1, 1, function () {
	          if_block1 = null;
	        });
	        check_outros();
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block1);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block1);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      if_block0.d();
	      if (detaching) detach(t);
	      if (if_block1) if_block1.d(detaching);
	      if (detaching) detach(if_block1_anchor);
	    }
	  };
	} // (126:35) 


	function create_if_block_1$2(ctx) {
	  var div;
	  var current;
	  var inlinechartbar = new Bar({
	    props: {
	      cellIndex:
	      /*updatedColIndex*/
	      ctx[13],
	      cellContent:
	      /*cellContent*/
	      ctx[10],
	      scale:
	      /*scale*/
	      ctx[14],
	      rowHeight:
	      /*rowHeight*/
	      ctx[2],
	      cellState:
	      /*cellState*/
	      ctx[3],
	      cellOrinalVal:
	      /*cellOrinalVal*/
	      ctx[11],
	      inlineChartStyle:
	      /*inlineChartStyle*/
	      ctx[18]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(inlinechartbar.$$.fragment);
	      attr(div, "class", "fg-cell-content fg-cell-content-chart");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(inlinechartbar, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var inlinechartbar_changes = {};
	      if (dirty[0] &
	      /*updatedColIndex*/
	      8192) inlinechartbar_changes.cellIndex =
	      /*updatedColIndex*/
	      ctx[13];
	      if (dirty[0] &
	      /*cellContent*/
	      1024) inlinechartbar_changes.cellContent =
	      /*cellContent*/
	      ctx[10];
	      if (dirty[0] &
	      /*scale*/
	      16384) inlinechartbar_changes.scale =
	      /*scale*/
	      ctx[14];
	      if (dirty[0] &
	      /*rowHeight*/
	      4) inlinechartbar_changes.rowHeight =
	      /*rowHeight*/
	      ctx[2];
	      if (dirty[0] &
	      /*cellState*/
	      8) inlinechartbar_changes.cellState =
	      /*cellState*/
	      ctx[3];
	      if (dirty[0] &
	      /*cellOrinalVal*/
	      2048) inlinechartbar_changes.cellOrinalVal =
	      /*cellOrinalVal*/
	      ctx[11];
	      if (dirty[0] &
	      /*inlineChartStyle*/
	      262144) inlinechartbar_changes.inlineChartStyle =
	      /*inlineChartStyle*/
	      ctx[18];
	      inlinechartbar.$set(inlinechartbar_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(inlinechartbar.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(inlinechartbar.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(inlinechartbar);
	    }
	  };
	} // (122:2) {#if checkBoxEnabled && cellIndex == 0}


	function create_if_block$2(ctx) {
	  var div;
	  var current;
	  var checkbox = new Checkbox$1({
	    props: {
	      rowSelectionState:
	      /*rowSelectionState*/
	      ctx[4]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(checkbox.$$.fragment);
	      attr(div, "class", "fg-cell-content fg-cell-content-checkbox");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(checkbox, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var checkbox_changes = {};
	      if (dirty[0] &
	      /*rowSelectionState*/
	      16) checkbox_changes.rowSelectionState =
	      /*rowSelectionState*/
	      ctx[4];
	      checkbox.$set(checkbox_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(checkbox.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(checkbox.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(checkbox);
	    }
	  };
	} // (142:6) {:else}


	function create_else_block_1(ctx) {
	  var t;
	  return {
	    c: function c() {
	      t = text(
	      /*cellContent*/
	      ctx[10]);
	    },
	    m: function m(target, anchor) {
	      insert(target, t, anchor);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty[0] &
	      /*cellContent*/
	      1024) set_data(t,
	      /*cellContent*/
	      ctx[10]);
	    },
	    d: function d(detaching) {
	      if (detaching) detach(t);
	    }
	  };
	} // (140:6) {#if columnType === 'html'}


	function create_if_block_3(ctx) {
	  var html_tag;
	  return {
	    c: function c() {
	      html_tag = new HtmlTag(
	      /*cellContent*/
	      ctx[10], null);
	    },
	    m: function m(target, anchor) {
	      html_tag.m(target, anchor);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty[0] &
	      /*cellContent*/
	      1024) html_tag.p(
	      /*cellContent*/
	      ctx[10]);
	    },
	    d: function d(detaching) {
	      if (detaching) html_tag.d();
	    }
	  };
	} // (146:4) {#if showHelperIcon}


	function create_if_block_2$1(ctx) {
	  var div;
	  var current;
	  var helpericon = new HelperIcon({
	    props: {
	      tooltext:
	      /*tooltipContent*/
	      ctx[17]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(helpericon.$$.fragment);
	      attr(div, "class", "fg-cell-helper-icon");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(helpericon, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var helpericon_changes = {};
	      if (dirty[0] &
	      /*tooltipContent*/
	      131072) helpericon_changes.tooltext =
	      /*tooltipContent*/
	      ctx[17];
	      helpericon.$set(helpericon_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(helpericon.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(helpericon.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(helpericon);
	    }
	  };
	}

	function create_fragment$5(ctx) {
	  var div;
	  var current_block_type_index;
	  var if_block;
	  var div_class_value;
	  var div_style_value;
	  var current;
	  var dispose;
	  var if_block_creators = [create_if_block$2, create_if_block_1$2, create_else_block$1];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*checkBoxEnabled*/
	    ctx[5] &&
	    /*cellIndex*/
	    ctx[0] == 0) return 0;
	    if (
	    /*columnType*/
	    ctx[8] === "chart") return 1;
	    return 2;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  return {
	    c: function c() {
	      div = element("div");
	      if_block.c();
	      attr(div, "class", div_class_value = "fg-cell " + (!
	      /*isSelectionCell*/
	      ctx[16] ?
	      /*columnType*/
	      ctx[8] === "number" ? "fg-cell-number" : "fg-cell-string" : "") + "\n  " + (
	      /*extClassNames*/
	      ctx[9] || "") + "\n  " + (
	      /*hoverClass*/
	      ctx[7] || ""));
	      attr(div, "style", div_style_value = "" + (
	      /*style*/
	      ctx[1] +
	      /*extInlineStyleStr*/
	      ctx[12]));
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      if_blocks[current_block_type_index].m(div, null);
	      /*div_binding*/

	      ctx[39](div);
	      current = true;
	      dispose = [listen(div, "mouseover",
	      /*handleMouseOver*/
	      ctx[19]), listen(div, "mousemove",
	      /*handleMouseMove*/
	      ctx[21]), listen(div, "mouseout",
	      /*handleMouseOut*/
	      ctx[20])];
	    },
	    p: function p(ctx, dirty) {
	      var previous_block_index = current_block_type_index;
	      current_block_type_index = select_block_type(ctx);

	      if (current_block_type_index === previous_block_index) {
	        if_blocks[current_block_type_index].p(ctx, dirty);
	      } else {
	        group_outros();
	        transition_out(if_blocks[previous_block_index], 1, 1, function () {
	          if_blocks[previous_block_index] = null;
	        });
	        check_outros();
	        if_block = if_blocks[current_block_type_index];

	        if (!if_block) {
	          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	          if_block.c();
	        }

	        transition_in(if_block, 1);
	        if_block.m(div, null);
	      }

	      if (!current || dirty[0] &
	      /*isSelectionCell, columnType, extClassNames, hoverClass*/
	      66432 && div_class_value !== (div_class_value = "fg-cell " + (!
	      /*isSelectionCell*/
	      ctx[16] ?
	      /*columnType*/
	      ctx[8] === "number" ? "fg-cell-number" : "fg-cell-string" : "") + "\n  " + (
	      /*extClassNames*/
	      ctx[9] || "") + "\n  " + (
	      /*hoverClass*/
	      ctx[7] || ""))) {
	        attr(div, "class", div_class_value);
	      }

	      if (!current || dirty[0] &
	      /*style, extInlineStyleStr*/
	      4098 && div_style_value !== (div_style_value = "" + (
	      /*style*/
	      ctx[1] +
	      /*extInlineStyleStr*/
	      ctx[12]))) {
	        attr(div, "style", div_style_value);
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      if_blocks[current_block_type_index].d();
	      /*div_binding*/

	      ctx[39](null);
	      run_all(dispose);
	    }
	  };
	}

	var BLANKSTRING = "";

	function instance$5($$self, $$props, $$invalidate) {
	  var cellIndex = $$props.cellIndex;
	  var rowIndex = $$props.rowIndex;
	  var style = $$props.style;
	  var rowHeight = $$props.rowHeight;
	  var cellState = $$props.cellState;
	  var hovered = $$props.hovered;
	  var rowSelectionState = $$props.rowSelectionState;
	  var gridData = $$props.gridData;
	  var vizRecDomain = $$props.vizRecDomain;
	  var checkBoxEnabled = $$props.checkBoxEnabled;
	  var dataStart = 0,
	      dataEnd,
	      reduceColumnIndexBy,
	      cellElem,
	      hoverClass,
	      tooltipRef = getContext("tooltipRef"),
	      dispatch = createEventDispatcher(),
	      columnType,
	      cellInfo,
	      extClassNames,
	      extInlineStyle,
	      cellContent,
	      cellOrinalVal,
	      extInlineStyleStr,
	      extHoverClasses,
	      extHoverStyle,
	      colindex,
	      rowindex,
	      updatedColIndex,
	      scale,
	      showHelperIcon,
	      showTooltip,
	      isSelectionCell,
	      tooltipContent = "",
	      mergedExtStyle,
	      inlineChartStyle;

	  function handleMouseOver(e) {
	    colindex !== undefined && dispatch("cellHoverIn", {
	      visualColIndex: colindex + reduceColumnIndexBy,
	      rowindex: rowindex,
	      actualColIndex: colindex
	    });
	    showTooltip && tooltipRef.tooltip.show(tooltipContent, e.pageX, e.pageY);
	  }

	  function handleMouseOut() {
	    colindex !== undefined && dispatch("cellHoverOut", {
	      visualColIndex: colindex + reduceColumnIndexBy,
	      rowindex: rowindex,
	      actualColIndex: colindex
	    });
	    showTooltip && tooltipRef.tooltip.hide();
	  }

	  function handleMouseMove(e) {
	    // !cellHovered && dispatch('cellHoverIn', { index });
	    showTooltip && tooltipRef.tooltip.update(e.pageX, e.pageY);
	  }

	  function div_binding($$value) {
	    binding_callbacks[$$value ? "unshift" : "push"](function () {
	      $$invalidate(6, cellElem = $$value);
	    });
	  }

	  $$self.$set = function ($$props) {
	    if ("cellIndex" in $$props) $$invalidate(0, cellIndex = $$props.cellIndex);
	    if ("rowIndex" in $$props) $$invalidate(22, rowIndex = $$props.rowIndex);
	    if ("style" in $$props) $$invalidate(1, style = $$props.style);
	    if ("rowHeight" in $$props) $$invalidate(2, rowHeight = $$props.rowHeight);
	    if ("cellState" in $$props) $$invalidate(3, cellState = $$props.cellState);
	    if ("hovered" in $$props) $$invalidate(23, hovered = $$props.hovered);
	    if ("rowSelectionState" in $$props) $$invalidate(4, rowSelectionState = $$props.rowSelectionState);
	    if ("gridData" in $$props) $$invalidate(24, gridData = $$props.gridData);
	    if ("vizRecDomain" in $$props) $$invalidate(25, vizRecDomain = $$props.vizRecDomain);
	    if ("checkBoxEnabled" in $$props) $$invalidate(5, checkBoxEnabled = $$props.checkBoxEnabled);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty[0] &
	    /*checkBoxEnabled, cellIndex, reduceColumnIndexBy, gridData, updatedColIndex, vizRecDomain, isSelectionCell, dataStart, rowIndex, dataEnd, cellInfo, hovered, tooltipContent, showHelperIcon, extInlineStyle, extInlineStyleStr*/
	    2143531041 | $$self.$$.dirty[1] &
	    /*extHoverStyle, mergedExtStyle, extHoverClasses*/
	    35) {
	       {
	        $$invalidate(12, extInlineStyleStr = "");
	        $$invalidate(18, inlineChartStyle = "");
	        $$invalidate(28, reduceColumnIndexBy = 0);
	        $$invalidate(16, isSelectionCell = checkBoxEnabled && cellIndex == 0);

	        if (checkBoxEnabled && cellIndex) {
	          $$invalidate(28, reduceColumnIndexBy = 1);
	        }

	        $$invalidate(13, updatedColIndex = cellIndex - reduceColumnIndexBy);
	        $$invalidate(8, columnType = gridData.gridConfig.columns[updatedColIndex].type);
	        $$invalidate(26, dataStart = vizRecDomain.start);
	        $$invalidate(27, dataEnd = vizRecDomain.end);
	        $$invalidate(14, scale = gridData.gridConfig.columns[updatedColIndex].scale);

	        if (!isSelectionCell && dataStart + rowIndex <= dataEnd) {
	          $$invalidate(29, cellInfo = gridData.getCellMetaInfo(dataStart + rowIndex, updatedColIndex));
	          $$invalidate(9, extClassNames = (cellInfo.class || []).join(" "));
	          $$invalidate(30, extInlineStyle = cellInfo.style);
	          $$invalidate(18, inlineChartStyle = cellInfo.inlineChartStyle || {});
	          $$invalidate(10, cellContent = cellInfo.content);
	          $$invalidate(11, cellOrinalVal = cellInfo.params.cellValue);
	          colindex = cellInfo.params.cellIndex;
	          rowindex = cellInfo.params.rowIndex;
	          $$invalidate(15, showHelperIcon = cellInfo.showTooltipInHelper);
	          $$invalidate(31, extHoverClasses = cellInfo.hoverClass);
	          $$invalidate(32, extHoverStyle = hovered && cellInfo.hoverStyle);

	          if (Array.isArray(cellInfo.tooltipContent)) {
	            showTooltip = cellInfo.tooltipContent.length;
	          } else {
	            showTooltip = cellInfo.tooltipContent !== undefined && ("" + cellInfo.tooltipContent).trim() !== BLANKSTRING;
	          }

	          if (Array.isArray(cellInfo.tooltipContent)) {
	            cellInfo.tooltipContent.forEach(function (content) {
	              return $$invalidate(17, tooltipContent += content);
	            });
	          } else {
	            $$invalidate(17, tooltipContent = cellInfo.tooltipContent);
	          }

	          if (!tooltipContent) {
	            // if no tooltip is provided the do not show the icon
	            $$invalidate(15, showHelperIcon = false);
	          } else if (showHelperIcon) {
	            // else if helper icon is enabled then do not show tooltip in cell hover
	            showTooltip = false;
	          }

	          $$invalidate(36, mergedExtStyle = _objectSpread2({}, extInlineStyle, {}, extHoverStyle));

	          for (var key in mergedExtStyle) {
	            $$invalidate(12, extInlineStyleStr += key + ":" + mergedExtStyle[key] + ";");
	          }

	          $$invalidate(7, hoverClass = hovered ? extHoverClasses.join(" ") || "fg-column-hover " : "");
	        }
	      }
	    }
	  };

	  return [cellIndex, style, rowHeight, cellState, rowSelectionState, checkBoxEnabled, cellElem, hoverClass, columnType, extClassNames, cellContent, cellOrinalVal, extInlineStyleStr, updatedColIndex, scale, showHelperIcon, isSelectionCell, tooltipContent, inlineChartStyle, handleMouseOver, handleMouseOut, handleMouseMove, rowIndex, hovered, gridData, vizRecDomain, dataStart, dataEnd, reduceColumnIndexBy, cellInfo, extInlineStyle, extHoverClasses, extHoverStyle, colindex, rowindex, showTooltip, mergedExtStyle, tooltipRef, dispatch, div_binding];
	}

	var Cell$1 =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Cell, _SvelteComponent);

	  function Cell(options) {
	    var _this;

	    _classCallCheck(this, Cell);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cell).call(this));
	    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
	      cellIndex: 0,
	      rowIndex: 22,
	      style: 1,
	      rowHeight: 2,
	      cellState: 3,
	      hovered: 23,
	      rowSelectionState: 4,
	      gridData: 24,
	      vizRecDomain: 25,
	      checkBoxEnabled: 5
	    }, [-1, -1]);
	    return _this;
	  }

	  return Cell;
	}(SvelteComponent);

	function get_each_context_1(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[45] = list[i];
	  child_ctx[47] = i;
	  return child_ctx;
	}

	function get_each_context(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[45] = list[i];
	  child_ctx[47] = i;
	  return child_ctx;
	} // (140:0) {:else}


	function create_else_block$2(ctx) {
	  var div;
	  var div_class_value;
	  var div_style_value;
	  var current;
	  var dispose;
	  var each_value_1 =
	  /*headerState*/
	  ctx[14].cell;
	  var each_blocks = [];

	  for (var i = 0; i < each_value_1.length; i += 1) {
	    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  return {
	    c: function c() {
	      div = element("div");

	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      attr(div, "class", div_class_value = "fg-row " + (
	      /*rowIndex*/
	      ctx[2] % 2 ? "fg-row-odd" : "fg-row-even") +
	      /*extClassNames*/
	      ctx[8] + "\n    " +
	      /*rowHoverClass*/
	      ctx[12] +
	      /*rowSelectionClass*/
	      ctx[13]);
	      attr(div, "style", div_style_value = "" + (
	      /*style*/
	      ctx[1] +
	      /*extInlineStyleStr*/
	      ctx[9] + "; transform:\n    translateY(" +
	      /*bodyTransLateY*/
	      ctx[11] + "px)"));
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);

	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(div, null);
	      }

	      current = true;
	      dispose = listen(div, "click",
	      /*click_handler*/
	      ctx[44]);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty[0] &
	      /*gridData, vizRecDomain, rowSelectionState, dataStart, headerState, rowIndex, rowHeight, checkBoxEnabled, hoveredColumnIndex*/
	      50428) {
	        each_value_1 =
	        /*headerState*/
	        ctx[14].cell;

	        var _i3;

	        for (_i3 = 0; _i3 < each_value_1.length; _i3 += 1) {
	          var child_ctx = get_each_context_1(ctx, each_value_1, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);

	            transition_in(each_blocks[_i3], 1);
	          } else {
	            each_blocks[_i3] = create_each_block_1(child_ctx);

	            each_blocks[_i3].c();

	            transition_in(each_blocks[_i3], 1);

	            each_blocks[_i3].m(div, null);
	          }
	        }

	        group_outros();

	        for (_i3 = each_value_1.length; _i3 < each_blocks.length; _i3 += 1) {
	          out(_i3);
	        }

	        check_outros();
	      }

	      if (!current || dirty[0] &
	      /*rowIndex, extClassNames, rowHoverClass, rowSelectionClass*/
	      12548 && div_class_value !== (div_class_value = "fg-row " + (
	      /*rowIndex*/
	      ctx[2] % 2 ? "fg-row-odd" : "fg-row-even") +
	      /*extClassNames*/
	      ctx[8] + "\n    " +
	      /*rowHoverClass*/
	      ctx[12] +
	      /*rowSelectionClass*/
	      ctx[13])) {
	        attr(div, "class", div_class_value);
	      }

	      if (!current || dirty[0] &
	      /*style, extInlineStyleStr, bodyTransLateY*/
	      2562 && div_style_value !== (div_style_value = "" + (
	      /*style*/
	      ctx[1] +
	      /*extInlineStyleStr*/
	      ctx[9] + "; transform:\n    translateY(" +
	      /*bodyTransLateY*/
	      ctx[11] + "px)"))) {
	        attr(div, "style", div_style_value);
	      }
	    },
	    i: function i(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      current = true;
	    },
	    o: function o(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_each(each_blocks, detaching);
	      dispose();
	    }
	  };
	} // (125:0) {#if type === 'header'}


	function create_if_block$3(ctx) {
	  var div;
	  var current;
	  var each_value =
	  /*headerState*/
	  ctx[14].cell;
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  return {
	    c: function c() {
	      div = element("div");

	      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
	        each_blocks[_i6].c();
	      }

	      attr(div, "class", "fg-header-row");
	      attr(div, "style",
	      /*style*/
	      ctx[1]);
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);

	      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
	        each_blocks[_i7].m(div, null);
	      }

	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      if (dirty[0] &
	      /*gridData, onGlobalSelect, checkBoxEnabled, headerState, hoveredColumnIndex*/
	      114736) {
	        each_value =
	        /*headerState*/
	        ctx[14].cell;

	        var _i8;

	        for (_i8 = 0; _i8 < each_value.length; _i8 += 1) {
	          var child_ctx = get_each_context(ctx, each_value, _i8);

	          if (each_blocks[_i8]) {
	            each_blocks[_i8].p(child_ctx, dirty);

	            transition_in(each_blocks[_i8], 1);
	          } else {
	            each_blocks[_i8] = create_each_block(child_ctx);

	            each_blocks[_i8].c();

	            transition_in(each_blocks[_i8], 1);

	            each_blocks[_i8].m(div, null);
	          }
	        }

	        group_outros();

	        for (_i8 = each_value.length; _i8 < each_blocks.length; _i8 += 1) {
	          out(_i8);
	        }

	        check_outros();
	      }

	      if (!current || dirty[0] &
	      /*style*/
	      2) {
	        attr(div, "style",
	        /*style*/
	        ctx[1]);
	      }
	    },
	    i: function i(local) {
	      if (current) return;

	      for (var _i9 = 0; _i9 < each_value.length; _i9 += 1) {
	        transition_in(each_blocks[_i9]);
	      }

	      current = true;
	    },
	    o: function o(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
	        transition_out(each_blocks[_i10]);
	      }

	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_each(each_blocks, detaching);
	    }
	  };
	} // (147:4) {#each headerState.cell as cellState, i}


	function create_each_block_1(ctx) {
	  var current;
	  var bodycell = new Cell$1({
	    props: {
	      gridData:
	      /*gridData*/
	      ctx[5],
	      vizRecDomain:
	      /*vizRecDomain*/
	      ctx[6],
	      rowSelectionState:
	      /*rowSelectionState*/
	      ctx[10],
	      dataStart:
	      /*dataStart*/
	      ctx[7],
	      style: "left:" +
	      /*cellState*/
	      ctx[45].left + "px;width:" +
	      /*cellState*/
	      ctx[45].width + "px;",
	      cellIndex:
	      /*i*/
	      ctx[47],
	      rowIndex:
	      /*rowIndex*/
	      ctx[2],
	      cellState:
	      /*cellState*/
	      ctx[45],
	      rowHeight:
	      /*rowHeight*/
	      ctx[3],
	      checkBoxEnabled:
	      /*checkBoxEnabled*/
	      ctx[15],
	      hovered:
	      /*hoveredColumnIndex*/
	      ctx[4] ===
	      /*i*/
	      ctx[47]
	    }
	  });
	  bodycell.$on("cellHoverIn",
	  /*cellHoverIn_handler_1*/
	  ctx[42]);
	  bodycell.$on("cellHoverOut",
	  /*cellHoverOut_handler_1*/
	  ctx[43]);
	  return {
	    c: function c() {
	      create_component(bodycell.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(bodycell, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var bodycell_changes = {};
	      if (dirty[0] &
	      /*gridData*/
	      32) bodycell_changes.gridData =
	      /*gridData*/
	      ctx[5];
	      if (dirty[0] &
	      /*vizRecDomain*/
	      64) bodycell_changes.vizRecDomain =
	      /*vizRecDomain*/
	      ctx[6];
	      if (dirty[0] &
	      /*rowSelectionState*/
	      1024) bodycell_changes.rowSelectionState =
	      /*rowSelectionState*/
	      ctx[10];
	      if (dirty[0] &
	      /*dataStart*/
	      128) bodycell_changes.dataStart =
	      /*dataStart*/
	      ctx[7];
	      if (dirty[0] &
	      /*headerState*/
	      16384) bodycell_changes.style = "left:" +
	      /*cellState*/
	      ctx[45].left + "px;width:" +
	      /*cellState*/
	      ctx[45].width + "px;";
	      if (dirty[0] &
	      /*rowIndex*/
	      4) bodycell_changes.rowIndex =
	      /*rowIndex*/
	      ctx[2];
	      if (dirty[0] &
	      /*headerState*/
	      16384) bodycell_changes.cellState =
	      /*cellState*/
	      ctx[45];
	      if (dirty[0] &
	      /*rowHeight*/
	      8) bodycell_changes.rowHeight =
	      /*rowHeight*/
	      ctx[3];
	      if (dirty[0] &
	      /*checkBoxEnabled*/
	      32768) bodycell_changes.checkBoxEnabled =
	      /*checkBoxEnabled*/
	      ctx[15];
	      if (dirty[0] &
	      /*hoveredColumnIndex*/
	      16) bodycell_changes.hovered =
	      /*hoveredColumnIndex*/
	      ctx[4] ===
	      /*i*/
	      ctx[47];
	      bodycell.$set(bodycell_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(bodycell.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(bodycell.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(bodycell, detaching);
	    }
	  };
	} // (127:4) {#each headerState.cell as cellState, i}


	function create_each_block(ctx) {
	  var current;
	  var headercell = new Cell({
	    props: {
	      gridData:
	      /*gridData*/
	      ctx[5],
	      headerRowSelected:
	      /*gridData*/
	      ctx[5].getGlobalSelectedState(),
	      onGlobalSelect:
	      /*onGlobalSelect*/
	      ctx[16],
	      checkBoxEnabled:
	      /*checkBoxEnabled*/
	      ctx[15],
	      style: "left:" +
	      /*cellState*/
	      ctx[45].left + "px;width:" +
	      /*cellState*/
	      ctx[45].width + "px;",
	      cellIndex:
	      /*i*/
	      ctx[47],
	      hovered:
	      /*hoveredColumnIndex*/
	      ctx[4] ===
	      /*i*/
	      ctx[47]
	    }
	  });
	  headercell.$on("cellHoverIn",
	  /*cellHoverIn_handler*/
	  ctx[40]);
	  headercell.$on("cellHoverOut",
	  /*cellHoverOut_handler*/
	  ctx[41]);
	  return {
	    c: function c() {
	      create_component(headercell.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(headercell, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var headercell_changes = {};
	      if (dirty[0] &
	      /*gridData*/
	      32) headercell_changes.gridData =
	      /*gridData*/
	      ctx[5];
	      if (dirty[0] &
	      /*gridData*/
	      32) headercell_changes.headerRowSelected =
	      /*gridData*/
	      ctx[5].getGlobalSelectedState();
	      if (dirty[0] &
	      /*checkBoxEnabled*/
	      32768) headercell_changes.checkBoxEnabled =
	      /*checkBoxEnabled*/
	      ctx[15];
	      if (dirty[0] &
	      /*headerState*/
	      16384) headercell_changes.style = "left:" +
	      /*cellState*/
	      ctx[45].left + "px;width:" +
	      /*cellState*/
	      ctx[45].width + "px;";
	      if (dirty[0] &
	      /*hoveredColumnIndex*/
	      16) headercell_changes.hovered =
	      /*hoveredColumnIndex*/
	      ctx[4] ===
	      /*i*/
	      ctx[47];
	      headercell.$set(headercell_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(headercell.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(headercell.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(headercell, detaching);
	    }
	  };
	}

	function create_fragment$6(ctx) {
	  var current_block_type_index;
	  var if_block;
	  var if_block_anchor;
	  var current;
	  var if_block_creators = [create_if_block$3, create_else_block$2];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*type*/
	    ctx[0] === "header") return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  return {
	    c: function c() {
	      if_block.c();
	      if_block_anchor = empty();
	    },
	    m: function m(target, anchor) {
	      if_blocks[current_block_type_index].m(target, anchor);
	      insert(target, if_block_anchor, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var previous_block_index = current_block_type_index;
	      current_block_type_index = select_block_type(ctx);

	      if (current_block_type_index === previous_block_index) {
	        if_blocks[current_block_type_index].p(ctx, dirty);
	      } else {
	        group_outros();
	        transition_out(if_blocks[previous_block_index], 1, 1, function () {
	          if_blocks[previous_block_index] = null;
	        });
	        check_outros();
	        if_block = if_blocks[current_block_type_index];

	        if (!if_block) {
	          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	          if_block.c();
	        }

	        transition_in(if_block, 1);
	        if_block.m(if_block_anchor.parentNode, if_block_anchor);
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function d(detaching) {
	      if_blocks[current_block_type_index].d(detaching);
	      if (detaching) detach(if_block_anchor);
	    }
	  };
	}

	function instance$6($$self, $$props, $$invalidate) {
	  var type = $$props.type;
	  var style = $$props.style;
	  var rowIndex = $$props.rowIndex;
	  var rowHeight = $$props.rowHeight;
	  var gridLayout = $$props.gridLayout;
	  var hoveredColumnIndex = $$props.hoveredColumnIndex;
	  var hovered = $$props.hovered;
	  var gridData = $$props.gridData;
	  var vizRecDomain = $$props.vizRecDomain;
	  var dataStart = 0,
	      dataEnd,
	      rowInfo,
	      extClassNames,
	      extInlineStyle,
	      extInlineStyleStr = "",
	      rowSelectionState,
	      bodyTransLateY,
	      rowIndexInDT,
	      rowHoverClass,
	      rowSelectionClass,
	      rowSelectionExtClasses,
	      rowHoverExtClasses,
	      headerState,
	      rowState,
	      selectionFeature,
	      selectionEnabled,
	      checkBoxEnabled,
	      rowHoverExtStyles,
	      rowSelectionExtStyles,
	      firstClick = true,
	      firstClickTime,
	      dispatchEvent = getContext("dispatchEvent"),
	      parsedRowConfig = getContext("parsedRowConfig"),
	      firstClickTimer,
	      mergedExtStyle;

	  function onSingleSelect(finalRowIndex, e) {
	    var prevRowSelectionIndex = gridData.getLatestSelectedRow();
	    gridData.toggleRowSelectedState(finalRowIndex, e);

	    if (prevRowSelectionIndex === finalRowIndex) {
	      gridData.setLatestSelectedRow(undefined);
	    } else {
	      gridData.setLatestSelectedRow(finalRowIndex);
	      gridData.setRowSelection(prevRowSelectionIndex, !gridData.getRowSelection(prevRowSelectionIndex));
	    }
	  }

	  function onMultiSelect(finalRowIndex, e) {
	    var globalSelectedState = gridData.getGlobalSelectedState();
	    $$invalidate(10, rowSelectionState = !rowSelectionState);
	    gridData.toggleRowSelectedState(finalRowIndex, e);
	    gridData.reEvaluateGlobalSelectedState();
	  }

	  function onGlobalSelect(e) {
	    var globalSelectedState = gridData.getGlobalSelectedState();
	    gridData.setGlobalSelectedState(!globalSelectedState);
	    gridData.syncAllRowSelectedStateWithGlobalSelection(e);
	  }

	  function handleBodyRowClick(e) {
	    if (firstClick) {
	      // single click
	      dispatchEvent("rowclicked", {
	        rowIndex: rowIndex,
	        rowData: rowInfo.params.values,
	        rowHeight: parsedRowConfig.rowHeight,
	        density: parsedRowConfig.density
	      }, e);
	      dispatchEvent("recordclicked", {
	        recordIndex: rowIndex
	      }, e);
	      firstClick = false;
	      firstClickTime = window.performance.now();
	      firstClickTimer = setTimeout(function () {
	        firstClick = true;
	        firstClickTime = 0;
	      }, 350);
	    } else {
	      // @todo: remove this block if double click is not needed
	      clearTimeout(firstClickTimer);

	      if (window.performance.now() - firstClickTime <= 300) {
	        // double click
	        firstClickTime = 0;
	        firstClick = true;
	      }
	    }
	  }

	  function handleAllClickActions(e) {
	    checkBoxEnabled ? selectionEnabled && onMultiSelect.call(this, dataStart + rowIndex, e) : selectionEnabled && onSingleSelect.call(this, dataStart + rowIndex, e);
	    handleBodyRowClick(e);
	  }

	  function cellHoverIn_handler(event) {
	    bubble($$self, event);
	  }

	  function cellHoverOut_handler(event) {
	    bubble($$self, event);
	  }

	  function cellHoverIn_handler_1(event) {
	    bubble($$self, event);
	  }

	  function cellHoverOut_handler_1(event) {
	    bubble($$self, event);
	  }

	  var click_handler = function click_handler(e) {
	    return handleAllClickActions(e);
	  };

	  $$self.$set = function ($$props) {
	    if ("type" in $$props) $$invalidate(0, type = $$props.type);
	    if ("style" in $$props) $$invalidate(1, style = $$props.style);
	    if ("rowIndex" in $$props) $$invalidate(2, rowIndex = $$props.rowIndex);
	    if ("rowHeight" in $$props) $$invalidate(3, rowHeight = $$props.rowHeight);
	    if ("gridLayout" in $$props) $$invalidate(18, gridLayout = $$props.gridLayout);
	    if ("hoveredColumnIndex" in $$props) $$invalidate(4, hoveredColumnIndex = $$props.hoveredColumnIndex);
	    if ("hovered" in $$props) $$invalidate(19, hovered = $$props.hovered);
	    if ("gridData" in $$props) $$invalidate(5, gridData = $$props.gridData);
	    if ("vizRecDomain" in $$props) $$invalidate(6, vizRecDomain = $$props.vizRecDomain);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty[0] &
	    /*gridData, selectionFeature, gridLayout, vizRecDomain, type, dataStart, rowIndex, dataEnd, rowInfo, rowSelectionState, hovered, extInlineStyle, rowHoverExtStyles, rowSelectionExtStyles, extInlineStyleStr, rowHoverExtClasses, rowSelectionExtClasses*/
	    1803290341 | $$self.$$.dirty[1] &
	    /*mergedExtStyle*/
	    8) {
	       {
	        $$invalidate(27, selectionFeature = gridData.gridConfig.rowoptions && gridData.gridConfig.rowoptions.rowselection);
	        selectionEnabled = selectionFeature && selectionFeature.enable;
	        $$invalidate(15, checkBoxEnabled = selectionFeature && selectionFeature.enable && selectionFeature.showselectioncheckbox);
	        $$invalidate(14, headerState = gridLayout.headerDimState);
	        rowState = gridLayout.rowDimState;
	        $$invalidate(7, dataStart = vizRecDomain.start);
	        $$invalidate(20, dataEnd = vizRecDomain.end);
	        $$invalidate(11, bodyTransLateY = vizRecDomain.bodyTransLateY || 0);

	        if (type !== "header" && dataStart + rowIndex <= dataEnd) {
	          $$invalidate(21, rowInfo = gridData.getRowMetaInfo(dataStart + rowIndex));
	          $$invalidate(10, rowSelectionState = rowInfo && rowInfo.selected);
	          $$invalidate(8, extClassNames = (rowInfo.class || []).join(" "));
	          $$invalidate(22, extInlineStyle = rowInfo.style);
	          $$invalidate(25, rowHoverExtClasses = rowInfo.hoverClass);
	          $$invalidate(24, rowSelectionExtClasses = rowInfo.selectedClass);
	          $$invalidate(30, rowSelectionExtStyles = rowSelectionState && rowInfo.selectedStyle);
	          $$invalidate(9, extInlineStyleStr = "");
	          rowIndexInDT = rowInfo.params.rowIndex;
	          $$invalidate(29, rowHoverExtStyles = hovered && rowInfo.hoverStyle);
	          $$invalidate(34, mergedExtStyle = _objectSpread2({}, extInlineStyle, {}, rowHoverExtStyles, {}, rowSelectionExtStyles));

	          for (var key in mergedExtStyle) {
	            $$invalidate(9, extInlineStyleStr += key + ":" + mergedExtStyle[key] + ";");
	          }

	          $$invalidate(12, rowHoverClass = hovered ? "fg-row-hover " + rowHoverExtClasses.join(" ") : "");
	          $$invalidate(13, rowSelectionClass = rowSelectionState ? (rowSelectionExtClasses ? rowSelectionExtClasses.join(" ") : "") || "fg-row-selected" : "");
	        }
	      }
	    }
	  };

	  return [type, style, rowIndex, rowHeight, hoveredColumnIndex, gridData, vizRecDomain, dataStart, extClassNames, extInlineStyleStr, rowSelectionState, bodyTransLateY, rowHoverClass, rowSelectionClass, headerState, checkBoxEnabled, onGlobalSelect, handleAllClickActions, gridLayout, hovered, dataEnd, rowInfo, extInlineStyle, rowIndexInDT, rowSelectionExtClasses, rowHoverExtClasses, rowState, selectionFeature, selectionEnabled, rowHoverExtStyles, rowSelectionExtStyles, firstClick, firstClickTime, firstClickTimer, mergedExtStyle, dispatchEvent, parsedRowConfig, onSingleSelect, onMultiSelect, handleBodyRowClick, cellHoverIn_handler, cellHoverOut_handler, cellHoverIn_handler_1, cellHoverOut_handler_1, click_handler];
	}

	var Row =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Row, _SvelteComponent);

	  function Row(options) {
	    var _this;

	    _classCallCheck(this, Row);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Row).call(this));
	    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
	      type: 0,
	      style: 1,
	      rowIndex: 2,
	      rowHeight: 3,
	      gridLayout: 18,
	      hoveredColumnIndex: 4,
	      hovered: 19,
	      gridData: 5,
	      vizRecDomain: 6
	    }, [-1, -1]);
	    return _this;
	  }

	  return Row;
	}(SvelteComponent);

	function create_fragment$7(ctx) {
	  var div;
	  var current;
	  var row = new Row({
	    props: {
	      gridData:
	      /*gridData*/
	      ctx[3],
	      vizRecDomain:
	      /*vizRecDomain*/
	      ctx[4],
	      gridLayout:
	      /*gridLayout*/
	      ctx[1],
	      type: "header",
	      style:
	      /*rowStyle*/
	      ctx[6],
	      hoveredColumnIndex:
	      /*hoveredColumnIndex*/
	      ctx[2]
	    }
	  });
	  row.$on("cellHoverIn",
	  /*cellHoverIn_handler*/
	  ctx[14]);
	  row.$on("cellHoverOut",
	  /*cellHoverOut_handler*/
	  ctx[15]);
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(row.$$.fragment);
	      attr(div, "class", "fg-header-container");
	      set_style(div, "height",
	      /*headerRowHeight*/
	      ctx[5] + "px");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(row, div, null);
	      /*div_binding*/

	      ctx[16](div);
	      current = true;
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var row_changes = {};
	      if (dirty &
	      /*gridData*/
	      8) row_changes.gridData =
	      /*gridData*/
	      ctx[3];
	      if (dirty &
	      /*vizRecDomain*/
	      16) row_changes.vizRecDomain =
	      /*vizRecDomain*/
	      ctx[4];
	      if (dirty &
	      /*gridLayout*/
	      2) row_changes.gridLayout =
	      /*gridLayout*/
	      ctx[1];
	      if (dirty &
	      /*rowStyle*/
	      64) row_changes.style =
	      /*rowStyle*/
	      ctx[6];
	      if (dirty &
	      /*hoveredColumnIndex*/
	      4) row_changes.hoveredColumnIndex =
	      /*hoveredColumnIndex*/
	      ctx[2];
	      row.$set(row_changes);

	      if (!current || dirty &
	      /*headerRowHeight*/
	      32) {
	        set_style(div, "height",
	        /*headerRowHeight*/
	        ctx[5] + "px");
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(row.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(row.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(row);
	      /*div_binding*/

	      ctx[16](null);
	    }
	  };
	}

	function instance$7($$self, $$props, $$invalidate) {
	  var headerContainer = $$props.headerContainer,
	      gridLayout = $$props.gridLayout,
	      element = $$props.element,
	      bodyContentOverflowed = $$props.bodyContentOverflowed,
	      bodyWidthOverflowed = $$props.bodyWidthOverflowed,
	      hoveredColumnIndex = $$props.hoveredColumnIndex,
	      gridData = $$props.gridData,
	      gridDimensions = $$props.gridDimensions,
	      vizRecDomain = $$props.vizRecDomain;
	  onMount(function () {
	    $$invalidate(7, headerContainer.node = element, headerContainer);
	  });
	  var totalWidth, headerRowHeight, scrollerPadding, rowStyle, width;

	  function cellHoverIn_handler(event) {
	    bubble($$self, event);
	  }

	  function cellHoverOut_handler(event) {
	    bubble($$self, event);
	  }

	  function div_binding($$value) {
	    binding_callbacks[$$value ? "unshift" : "push"](function () {
	      $$invalidate(0, element = $$value);
	    });
	  }

	  $$self.$set = function ($$props) {
	    if ("headerContainer" in $$props) $$invalidate(7, headerContainer = $$props.headerContainer);
	    if ("gridLayout" in $$props) $$invalidate(1, gridLayout = $$props.gridLayout);
	    if ("element" in $$props) $$invalidate(0, element = $$props.element);
	    if ("bodyContentOverflowed" in $$props) $$invalidate(8, bodyContentOverflowed = $$props.bodyContentOverflowed);
	    if ("bodyWidthOverflowed" in $$props) $$invalidate(9, bodyWidthOverflowed = $$props.bodyWidthOverflowed);
	    if ("hoveredColumnIndex" in $$props) $$invalidate(2, hoveredColumnIndex = $$props.hoveredColumnIndex);
	    if ("gridData" in $$props) $$invalidate(3, gridData = $$props.gridData);
	    if ("gridDimensions" in $$props) $$invalidate(10, gridDimensions = $$props.gridDimensions);
	    if ("vizRecDomain" in $$props) $$invalidate(4, vizRecDomain = $$props.vizRecDomain);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*gridLayout, bodyWidthOverflowed, bodyContentOverflowed, gridDimensions, headerRowHeight, totalWidth, scrollerPadding*/
	    7970) {
	       {
	        $$invalidate(11, totalWidth = gridLayout.totalWidth);
	        $$invalidate(5, headerRowHeight = gridLayout.headerDimState.height);
	        $$invalidate(12, scrollerPadding = bodyWidthOverflowed && bodyContentOverflowed && (isIE11 || isEdge) ? 19 : 0); // default scroll width in IE is 19px

	        width = gridDimensions.width;
	        $$invalidate(6, rowStyle = "top:0px;height:" + headerRowHeight + "px;width:" + (totalWidth + scrollerPadding) + "px;");
	      }
	    }
	  };

	  return [element, gridLayout, hoveredColumnIndex, gridData, vizRecDomain, headerRowHeight, rowStyle, headerContainer, bodyContentOverflowed, bodyWidthOverflowed, gridDimensions, totalWidth, scrollerPadding, width, cellHoverIn_handler, cellHoverOut_handler, div_binding];
	}

	var Header =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Header, _SvelteComponent);

	  function Header(options) {
	    var _this;

	    _classCallCheck(this, Header);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this));
	    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {
	      headerContainer: 7,
	      gridLayout: 1,
	      element: 0,
	      bodyContentOverflowed: 8,
	      bodyWidthOverflowed: 9,
	      hoveredColumnIndex: 2,
	      gridData: 3,
	      gridDimensions: 10,
	      vizRecDomain: 4
	    });
	    return _this;
	  }

	  return Header;
	}(SvelteComponent);

	function get_each_context$1(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[22] = list[i];
	  child_ctx[24] = i;
	  return child_ctx;
	} // (66:4) {#each rowDimensions as row, i}


	function create_each_block$1(ctx) {
	  var current;
	  var row = new Row({
	    props: {
	      vizRecDomain:
	      /*vizRecDomain*/
	      ctx[4],
	      gridData:
	      /*gridData*/
	      ctx[3],
	      gridLayout:
	      /*gridLayout*/
	      ctx[0],
	      type: "body",
	      rowIndex:
	      /*i*/
	      ctx[24],
	      hovered:
	      /*i*/
	      ctx[24] ===
	      /*hoverInRowIndex*/
	      ctx[2],
	      style: "top:" +
	      /*row*/
	      ctx[22].top + "px;height:" +
	      /*row*/
	      ctx[22].height + "px;width:" +
	      /*totalWidth*/
	      ctx[7] + "px;",
	      rowHeight:
	      /*row*/
	      ctx[22].height,
	      hoveredColumnIndex:
	      /*hoveredColumnIndex*/
	      ctx[1]
	    }
	  });
	  row.$on("cellHoverIn",
	  /*cellHoverIn_handler*/
	  ctx[18]);
	  row.$on("cellHoverOut",
	  /*cellHoverOut_handler*/
	  ctx[19]);
	  return {
	    c: function c() {
	      create_component(row.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(row, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var row_changes = {};
	      if (dirty &
	      /*vizRecDomain*/
	      16) row_changes.vizRecDomain =
	      /*vizRecDomain*/
	      ctx[4];
	      if (dirty &
	      /*gridData*/
	      8) row_changes.gridData =
	      /*gridData*/
	      ctx[3];
	      if (dirty &
	      /*gridLayout*/
	      1) row_changes.gridLayout =
	      /*gridLayout*/
	      ctx[0];
	      if (dirty &
	      /*hoverInRowIndex*/
	      4) row_changes.hovered =
	      /*i*/
	      ctx[24] ===
	      /*hoverInRowIndex*/
	      ctx[2];
	      if (dirty &
	      /*rowDimensions, totalWidth*/
	      640) row_changes.style = "top:" +
	      /*row*/
	      ctx[22].top + "px;height:" +
	      /*row*/
	      ctx[22].height + "px;width:" +
	      /*totalWidth*/
	      ctx[7] + "px;";
	      if (dirty &
	      /*rowDimensions*/
	      512) row_changes.rowHeight =
	      /*row*/
	      ctx[22].height;
	      if (dirty &
	      /*hoveredColumnIndex*/
	      2) row_changes.hoveredColumnIndex =
	      /*hoveredColumnIndex*/
	      ctx[1];
	      row.$set(row_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(row.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(row.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(row, detaching);
	    }
	  };
	}

	function create_fragment$8(ctx) {
	  var div2;
	  var div0;
	  var t;
	  var div1;
	  var current;
	  var dispose;
	  var each_value =
	  /*rowDimensions*/
	  ctx[9];
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  return {
	    c: function c() {
	      div2 = element("div");
	      div0 = element("div");
	      t = space();
	      div1 = element("div");

	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      attr(div0, "class", "fg-body-scroll-shadow");
	      set_style(div0, "height",
	      /*hiddenDivHeight*/
	      ctx[6] + "px");
	      attr(div1, "class", "fg-body-main-content");
	      attr(div2, "class", "fg-body-container");
	      attr(div2, "style",
	      /*styleStr*/
	      ctx[8]);
	    },
	    m: function m(target, anchor) {
	      insert(target, div2, anchor);
	      append(div2, div0);
	      append(div2, t);
	      append(div2, div1);

	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(div1, null);
	      }
	      /*div2_binding*/


	      ctx[20](div2);
	      current = true;
	      dispose = listen(div2, "scroll",
	      /*scroll_handler*/
	      ctx[21]);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (!current || dirty &
	      /*hiddenDivHeight*/
	      64) {
	        set_style(div0, "height",
	        /*hiddenDivHeight*/
	        ctx[6] + "px");
	      }

	      if (dirty &
	      /*vizRecDomain, gridData, gridLayout, hoverInRowIndex, rowDimensions, totalWidth, hoveredColumnIndex*/
	      671) {
	        each_value =
	        /*rowDimensions*/
	        ctx[9];

	        var _i3;

	        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
	          var child_ctx = get_each_context$1(ctx, each_value, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);

	            transition_in(each_blocks[_i3], 1);
	          } else {
	            each_blocks[_i3] = create_each_block$1(child_ctx);

	            each_blocks[_i3].c();

	            transition_in(each_blocks[_i3], 1);

	            each_blocks[_i3].m(div1, null);
	          }
	        }

	        group_outros();

	        for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
	          out(_i3);
	        }

	        check_outros();
	      }

	      if (!current || dirty &
	      /*styleStr*/
	      256) {
	        attr(div2, "style",
	        /*styleStr*/
	        ctx[8]);
	      }
	    },
	    i: function i(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      current = true;
	    },
	    o: function o(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div2);
	      destroy_each(each_blocks, detaching);
	      /*div2_binding*/

	      ctx[20](null);
	      dispose();
	    }
	  };
	}

	var HORIZONTAL = "horizontal",
	    VERTICAL = "vertical";

	function instance$8($$self, $$props, $$invalidate) {
	  var infiniteScrollManager = $$props.infiniteScrollManager;
	  var bodyContainer = $$props.bodyContainer;
	  var autoHeight = $$props.autoHeight;
	  var gridLayout = $$props.gridLayout;
	  var hoveredColumnIndex = $$props.hoveredColumnIndex;
	  var hoverInRowIndex = $$props.hoverInRowIndex;
	  var bodyHeight = $$props.bodyHeight;
	  var gridData = $$props.gridData;
	  var vizRecDomain = $$props.vizRecDomain;
	  var element,
	      hiddenDivHeight,
	      totalWidth,
	      styleStr,
	      bodyScrollLeft = 0,
	      dispatchEvent = getContext("dispatchEvent"),
	      tooltipRef = getContext("tooltipRef"),
	      rowDimensions;
	  onMount(function () {
	    $$invalidate(11, bodyContainer.node = element, bodyContainer);
	  });

	  function handleScroll(e) {
	    // hide the tooltip when body scrolls
	    tooltipRef.tooltip.hide();

	    if (element.scrollLeft !== bodyScrollLeft) {
	      // horizontal scroll
	      bodyScrollLeft = element.scrollLeft;
	      dispatchEvent("scroll", {
	        direction: HORIZONTAL,
	        top: element.scrollTop,
	        left: element.scrollLeft
	      }, e);
	    } else {
	      // vertical scroll
	      infiniteScrollManager.updateHScrollProps(e);
	      dispatchEvent("scroll", {
	        direction: VERTICAL,
	        top: element.scrollTop,
	        left: element.scrollLeft
	      }, e);
	    }
	  }

	  function cellHoverIn_handler(event) {
	    bubble($$self, event);
	  }

	  function cellHoverOut_handler(event) {
	    bubble($$self, event);
	  }

	  function div2_binding($$value) {
	    binding_callbacks[$$value ? "unshift" : "push"](function () {
	      $$invalidate(5, element = $$value);
	    });
	  }

	  var scroll_handler = function scroll_handler(e) {
	    return handleScroll(e);
	  };

	  $$self.$set = function ($$props) {
	    if ("infiniteScrollManager" in $$props) $$invalidate(12, infiniteScrollManager = $$props.infiniteScrollManager);
	    if ("bodyContainer" in $$props) $$invalidate(11, bodyContainer = $$props.bodyContainer);
	    if ("autoHeight" in $$props) $$invalidate(13, autoHeight = $$props.autoHeight);
	    if ("gridLayout" in $$props) $$invalidate(0, gridLayout = $$props.gridLayout);
	    if ("hoveredColumnIndex" in $$props) $$invalidate(1, hoveredColumnIndex = $$props.hoveredColumnIndex);
	    if ("hoverInRowIndex" in $$props) $$invalidate(2, hoverInRowIndex = $$props.hoverInRowIndex);
	    if ("bodyHeight" in $$props) $$invalidate(14, bodyHeight = $$props.bodyHeight);
	    if ("gridData" in $$props) $$invalidate(3, gridData = $$props.gridData);
	    if ("vizRecDomain" in $$props) $$invalidate(4, vizRecDomain = $$props.vizRecDomain);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*gridLayout, vizRecDomain, autoHeight, bodyHeight*/
	    24593) {
	       {
	        $$invalidate(7, totalWidth = gridLayout.totalWidth);
	        $$invalidate(6, hiddenDivHeight = vizRecDomain.hiddenDivHeight);
	        $$invalidate(8, styleStr = autoHeight ? "" : "height:" + bodyHeight + "px;");
	        $$invalidate(9, rowDimensions = gridLayout.rowDimState);
	      }
	    }
	  };

	  return [gridLayout, hoveredColumnIndex, hoverInRowIndex, gridData, vizRecDomain, element, hiddenDivHeight, totalWidth, styleStr, rowDimensions, handleScroll, bodyContainer, infiniteScrollManager, autoHeight, bodyHeight, bodyScrollLeft, dispatchEvent, tooltipRef, cellHoverIn_handler, cellHoverOut_handler, div2_binding, scroll_handler];
	}

	var Body =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Body, _SvelteComponent);

	  function Body(options) {
	    var _this;

	    _classCallCheck(this, Body);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Body).call(this));
	    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
	      infiniteScrollManager: 12,
	      bodyContainer: 11,
	      autoHeight: 13,
	      gridLayout: 0,
	      hoveredColumnIndex: 1,
	      hoverInRowIndex: 2,
	      bodyHeight: 14,
	      gridData: 3,
	      vizRecDomain: 4
	    });
	    return _this;
	  }

	  return Body;
	}(SvelteComponent);

	function create_fragment$9(ctx) {
	  var div;
	  var t;
	  var current;
	  var header = new Header({
	    props: {
	      gridData:
	      /*gridData*/
	      ctx[3],
	      vizRecDomain:
	      /*vizRecDomain*/
	      ctx[4],
	      gridLayout:
	      /*rowLayout*/
	      ctx[2],
	      headerContainer:
	      /*headerContainerRef*/
	      ctx[12],
	      bodyWidthOverflowed:
	      /*totalBodyWidth*/
	      ctx[11] >
	      /*gridDimensions*/
	      ctx[5].width,
	      bodyContentOverflowed:
	      /*totalBodyHeight*/
	      ctx[10] >
	      /*bodyHeight*/
	      ctx[9],
	      hoveredColumnIndex:
	      /*hoveredColumnIndex*/
	      ctx[6],
	      gridDimensions:
	      /*gridDimensions*/
	      ctx[5]
	    }
	  });
	  header.$on("cellHoverIn",
	  /*handleHoverIn*/
	  ctx[14]);
	  header.$on("cellHoverOut",
	  /*handleHoverOut*/
	  ctx[15]);
	  var body = new Body({
	    props: {
	      gridData:
	      /*gridData*/
	      ctx[3],
	      vizRecDomain:
	      /*vizRecDomain*/
	      ctx[4],
	      gridLayout:
	      /*rowLayout*/
	      ctx[2],
	      bodyContainer:
	      /*bodyContainerRef*/
	      ctx[13],
	      infiniteScrollManager:
	      /*infiniteScrollManager*/
	      ctx[0],
	      autoHeight:
	      /*autoHeight*/
	      ctx[1],
	      bodyHeight:
	      /*bodyHeight*/
	      ctx[9],
	      hoveredColumnIndex:
	      /*hoveredColumnIndex*/
	      ctx[6],
	      prevHoveredRowIndex:
	      /*prevHoveredRowIndex*/
	      ctx[8],
	      hoverInRowIndex:
	      /*hoverInRowIndex*/
	      ctx[7]
	    }
	  });
	  body.$on("cellHoverIn",
	  /*handleHoverIn*/
	  ctx[14]);
	  body.$on("cellHoverOut",
	  /*handleHoverOut*/
	  ctx[15]);
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(header.$$.fragment);
	      t = space();
	      create_component(body.$$.fragment);
	      attr(div, "class", "fg-grid-wrapper");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(header, div, null);
	      append(div, t);
	      mount_component(body, div, null);
	      current = true;
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var header_changes = {};
	      if (dirty &
	      /*gridData*/
	      8) header_changes.gridData =
	      /*gridData*/
	      ctx[3];
	      if (dirty &
	      /*vizRecDomain*/
	      16) header_changes.vizRecDomain =
	      /*vizRecDomain*/
	      ctx[4];
	      if (dirty &
	      /*rowLayout*/
	      4) header_changes.gridLayout =
	      /*rowLayout*/
	      ctx[2];
	      if (dirty &
	      /*totalBodyWidth, gridDimensions*/
	      2080) header_changes.bodyWidthOverflowed =
	      /*totalBodyWidth*/
	      ctx[11] >
	      /*gridDimensions*/
	      ctx[5].width;
	      if (dirty &
	      /*totalBodyHeight, bodyHeight*/
	      1536) header_changes.bodyContentOverflowed =
	      /*totalBodyHeight*/
	      ctx[10] >
	      /*bodyHeight*/
	      ctx[9];
	      if (dirty &
	      /*hoveredColumnIndex*/
	      64) header_changes.hoveredColumnIndex =
	      /*hoveredColumnIndex*/
	      ctx[6];
	      if (dirty &
	      /*gridDimensions*/
	      32) header_changes.gridDimensions =
	      /*gridDimensions*/
	      ctx[5];
	      header.$set(header_changes);
	      var body_changes = {};
	      if (dirty &
	      /*gridData*/
	      8) body_changes.gridData =
	      /*gridData*/
	      ctx[3];
	      if (dirty &
	      /*vizRecDomain*/
	      16) body_changes.vizRecDomain =
	      /*vizRecDomain*/
	      ctx[4];
	      if (dirty &
	      /*rowLayout*/
	      4) body_changes.gridLayout =
	      /*rowLayout*/
	      ctx[2];
	      if (dirty &
	      /*infiniteScrollManager*/
	      1) body_changes.infiniteScrollManager =
	      /*infiniteScrollManager*/
	      ctx[0];
	      if (dirty &
	      /*autoHeight*/
	      2) body_changes.autoHeight =
	      /*autoHeight*/
	      ctx[1];
	      if (dirty &
	      /*bodyHeight*/
	      512) body_changes.bodyHeight =
	      /*bodyHeight*/
	      ctx[9];
	      if (dirty &
	      /*hoveredColumnIndex*/
	      64) body_changes.hoveredColumnIndex =
	      /*hoveredColumnIndex*/
	      ctx[6];
	      if (dirty &
	      /*prevHoveredRowIndex*/
	      256) body_changes.prevHoveredRowIndex =
	      /*prevHoveredRowIndex*/
	      ctx[8];
	      if (dirty &
	      /*hoverInRowIndex*/
	      128) body_changes.hoverInRowIndex =
	      /*hoverInRowIndex*/
	      ctx[7];
	      body.$set(body_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(header.$$.fragment, local);
	      transition_in(body.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(header.$$.fragment, local);
	      transition_out(body.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(header);
	      destroy_component(body);
	    }
	  };
	}

	function instance$9($$self, $$props, $$invalidate) {
	  var infiniteScrollManager = $$props.infiniteScrollManager;
	  var autoHeight = $$props.autoHeight;
	  var rowLayout = $$props.rowLayout;
	  var gridData = $$props.gridData;
	  var vizRecDomain = $$props.vizRecDomain;
	  var gridDimensions = $$props.gridDimensions;
	  var headerContainerRef = {},
	      bodyContainerRef = {},
	      hoveredColumnIndex,
	      hoverInRowIndex,
	      parsedGridConfig = getContext("parsedGridConfig"),
	      dispatchEvent = getContext("dispatchEvent"),
	      columns,
	      rowOptions,
	      prevHoveredRowIndex,
	      prevHoveredColumnIndex,
	      columnHoverOutTimer,
	      rowHoverOutTimer,
	      headerHeight,
	      bodyHeight,
	      totalBodyHeight,
	      totalBodyWidth,
	      rowMetaData,
	      gridHeight;
	  onMount(function () {
	    syncScroll(headerContainerRef.node, bodyContainerRef.node, "horizontal"); // fix for hover out issue in ios

	    isIOS && document.addEventListener("click", dummyFunc);
	  });

	  function handleHoverIn(e) {
	    var _e$detail = e.detail,
	        actualColIndex = _e$detail.actualColIndex,
	        visualColIndex = _e$detail.visualColIndex,
	        rowindex = _e$detail.rowindex;
	    clearTimeout(columnHoverOutTimer); // clear previous hoverout timer

	    if (visualColIndex !== prevHoveredColumnIndex) {
	      // set new column hover index only if its different than the previous index
	      if (columns[actualColIndex].hover && columns[actualColIndex].hover.enable) {
	        $$invalidate(6, hoveredColumnIndex = prevHoveredColumnIndex = visualColIndex);
	        dispatchEvent("columnhovered", {
	          columnIndex: actualColIndex,
	          columnOptions: parsedGridConfig.columns[actualColIndex]
	        }, e);
	      } else {
	        $$invalidate(6, hoveredColumnIndex = prevHoveredColumnIndex = undefined);
	      }
	    }

	    clearTimeout(rowHoverOutTimer); // clear previous hoverout timer

	    if (rowOptions.hover && rowOptions.hover.enable && rowindex !== undefined && rowindex !== prevHoveredRowIndex && rowindex !== -1) {
	      rowMetaData = gridData.getRowMetaInfo(rowindex); // do not perform operations for header row
	      // set new row hover index only if its different than the previous index

	      $$invalidate(7, hoverInRowIndex = $$invalidate(8, prevHoveredRowIndex = rowindex));
	      dispatchEvent("rowhovered", {
	        rowIndex: rowindex,
	        rowData: rowMetaData.params.values,
	        rowHoverClass: rowMetaData.hoverClass,
	        rowHoverStyle: rowMetaData.hoverStyle
	      }, e);
	    }
	  }

	  function handleHoverOut(e) {
	    // do not remove colum hover index instantly, as the hoverout may happen on a different element
	    // of the same cell
	    columnHoverOutTimer = setTimeout(function () {
	      $$invalidate(6, hoveredColumnIndex = prevHoveredColumnIndex = undefined);
	    }, 20); // do not remove row hover index instantly, as the hoverout may happen on a different element
	    // of the same cell

	    rowHoverOutTimer = setTimeout(function () {
	      $$invalidate(7, hoverInRowIndex = $$invalidate(8, prevHoveredRowIndex = undefined));
	    }, 20);
	  }

	  $$self.$set = function ($$props) {
	    if ("infiniteScrollManager" in $$props) $$invalidate(0, infiniteScrollManager = $$props.infiniteScrollManager);
	    if ("autoHeight" in $$props) $$invalidate(1, autoHeight = $$props.autoHeight);
	    if ("rowLayout" in $$props) $$invalidate(2, rowLayout = $$props.rowLayout);
	    if ("gridData" in $$props) $$invalidate(3, gridData = $$props.gridData);
	    if ("vizRecDomain" in $$props) $$invalidate(4, vizRecDomain = $$props.vizRecDomain);
	    if ("gridDimensions" in $$props) $$invalidate(5, gridDimensions = $$props.gridDimensions);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*rowLayout, gridDimensions, gridHeight, headerHeight*/
	    10485796) {
	       {
	        $$invalidate(21, headerHeight = rowLayout.headerDimState.height);
	        $$invalidate(23, gridHeight = gridDimensions.height);
	        $$invalidate(9, bodyHeight = gridHeight - headerHeight);
	        $$invalidate(10, totalBodyHeight = rowLayout.totalBodyHeight);
	        $$invalidate(11, totalBodyWidth = rowLayout.totalWidth);
	        columns = parsedGridConfig.columns;
	        rowOptions = parsedGridConfig.rowoptions;
	      }
	    }
	  };

	  return [infiniteScrollManager, autoHeight, rowLayout, gridData, vizRecDomain, gridDimensions, hoveredColumnIndex, hoverInRowIndex, prevHoveredRowIndex, bodyHeight, totalBodyHeight, totalBodyWidth, headerContainerRef, bodyContainerRef, handleHoverIn, handleHoverOut];
	}

	var Grid =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Grid, _SvelteComponent);

	  function Grid(options) {
	    var _this;

	    _classCallCheck(this, Grid);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Grid).call(this));
	    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {
	      infiniteScrollManager: 0,
	      autoHeight: 1,
	      rowLayout: 2,
	      gridData: 3,
	      vizRecDomain: 4,
	      gridDimensions: 5
	    });
	    return _this;
	  }

	  return Grid;
	}(SvelteComponent);

	function get_each_context$2(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[16] = list[i];
	  child_ctx[18] = i;
	  return child_ctx;
	} // (70:8) {:else}


	function create_else_block$3(ctx) {
	  var each_1_anchor;
	  var current;
	  var each_value =
	  /*columnConfig*/
	  ctx[9];
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  return {
	    c: function c() {
	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      each_1_anchor = empty();
	    },
	    m: function m(target, anchor) {
	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(target, anchor);
	      }

	      insert(target, each_1_anchor, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      if (dirty &
	      /*bodyCellInfos, columnConfig, cardLayout, headerCellInfos*/
	      568) {
	        each_value =
	        /*columnConfig*/
	        ctx[9];

	        var _i3;

	        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
	          var child_ctx = get_each_context$2(ctx, each_value, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);

	            transition_in(each_blocks[_i3], 1);
	          } else {
	            each_blocks[_i3] = create_each_block$2(child_ctx);

	            each_blocks[_i3].c();

	            transition_in(each_blocks[_i3], 1);

	            each_blocks[_i3].m(each_1_anchor.parentNode, each_1_anchor);
	          }
	        }

	        group_outros();

	        for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
	          out(_i3);
	        }

	        check_outros();
	      }
	    },
	    i: function i(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      current = true;
	    },
	    o: function o(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_each(each_blocks, detaching);
	      if (detaching) detach(each_1_anchor);
	    }
	  };
	} // (68:8) {#if cardTemplate}


	function create_if_block$4(ctx) {
	  var html_tag;
	  var raw_value =
	  /*gridData*/
	  ctx[2].getCardHtml(
	  /*carItemIndex*/
	  ctx[0],
	  /*cardTemplate*/
	  ctx[8]).content + "";
	  return {
	    c: function c() {
	      html_tag = new HtmlTag(raw_value, null);
	    },
	    m: function m(target, anchor) {
	      html_tag.m(target, anchor);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty &
	      /*gridData, carItemIndex*/
	      5 && raw_value !== (raw_value =
	      /*gridData*/
	      ctx[2].getCardHtml(
	      /*carItemIndex*/
	      ctx[0],
	      /*cardTemplate*/
	      ctx[8]).content + "")) html_tag.p(raw_value);
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) html_tag.d();
	    }
	  };
	} // (82:28) {:else}


	function create_else_block_1$1(ctx) {
	  var html_tag;
	  var raw_value =
	  /*bodyCellInfos*/
	  ctx[4][
	  /*i*/
	  ctx[18]].content + "";
	  return {
	    c: function c() {
	      html_tag = new HtmlTag(raw_value, null);
	    },
	    m: function m(target, anchor) {
	      html_tag.m(target, anchor);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty &
	      /*bodyCellInfos*/
	      16 && raw_value !== (raw_value =
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].content + "")) html_tag.p(raw_value);
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) html_tag.d();
	    }
	  };
	} // (80:24) {#if config.type === 'chart'}


	function create_if_block_1$3(ctx) {
	  var current;
	  var barchart = new Bar({
	    props: {
	      inlineChartStyle:
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].inlineChartStyle,
	      cellIndex:
	      /*i*/
	      ctx[18],
	      cellContent:
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].content,
	      scale:
	      /*config*/
	      ctx[16].scale,
	      rowHeight:
	      /*cardLayout*/
	      ctx[5].cellState[
	      /*i*/
	      ctx[18]].height,
	      cellState:
	      /*cardLayout*/
	      ctx[5].cellState[
	      /*i*/
	      ctx[18]],
	      cellOrinalVal:
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].params.cellValue
	    }
	  });
	  return {
	    c: function c() {
	      create_component(barchart.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(barchart, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var barchart_changes = {};
	      if (dirty &
	      /*bodyCellInfos*/
	      16) barchart_changes.inlineChartStyle =
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].inlineChartStyle;
	      if (dirty &
	      /*bodyCellInfos*/
	      16) barchart_changes.cellContent =
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].content;
	      if (dirty &
	      /*bodyCellInfos*/
	      16) barchart_changes.cellOrinalVal =
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].params.cellValue;
	      barchart.$set(barchart_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(barchart.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(barchart.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(barchart, detaching);
	    }
	  };
	} // (71:12) {#each columnConfig as config, i}


	function create_each_block$2(ctx) {
	  var div4;
	  var div1;
	  var div0;
	  var raw_value =
	  /*headerCellInfos*/
	  ctx[3][
	  /*i*/
	  ctx[18]].content + "";
	  var div1_class_value;
	  var div1_style_value;
	  var t0;
	  var div3;
	  var div2;
	  var current_block_type_index;
	  var if_block;
	  var div3_class_value;
	  var div3_style_value;
	  var t1;
	  var current;
	  var if_block_creators = [create_if_block_1$3, create_else_block_1$1];
	  var if_blocks = [];

	  function select_block_type_1(ctx, dirty) {
	    if (
	    /*config*/
	    ctx[16].type === "chart") return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type_1(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  return {
	    c: function c() {
	      div4 = element("div");
	      div1 = element("div");
	      div0 = element("div");
	      t0 = space();
	      div3 = element("div");
	      div2 = element("div");
	      if_block.c();
	      t1 = space();
	      attr(div0, "class", "fg-card-header-content");
	      attr(div1, "class", div1_class_value = "fg-card-header " +
	      /*headerCellInfos*/
	      ctx[3][
	      /*i*/
	      ctx[18]].classNames);
	      attr(div1, "style", div1_style_value = "width:40%;" +
	      /*headerCellInfos*/
	      ctx[3][
	      /*i*/
	      ctx[18]].extStyleStr);
	      attr(div2, "class", "fg-card-cell-content");
	      attr(div3, "class", div3_class_value = "fg-card-cell " +
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].classNames);
	      attr(div3, "style", div3_style_value = "width:60%;" +
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].extStyleStr);
	      attr(div4, "class", "fg-data-info-row");
	      set_style(div4, "width", "100%");
	    },
	    m: function m(target, anchor) {
	      insert(target, div4, anchor);
	      append(div4, div1);
	      append(div1, div0);
	      div0.innerHTML = raw_value;
	      append(div4, t0);
	      append(div4, div3);
	      append(div3, div2);
	      if_blocks[current_block_type_index].m(div2, null);
	      append(div4, t1);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      if ((!current || dirty &
	      /*headerCellInfos*/
	      8) && raw_value !== (raw_value =
	      /*headerCellInfos*/
	      ctx[3][
	      /*i*/
	      ctx[18]].content + "")) div0.innerHTML = raw_value;

	      if (!current || dirty &
	      /*headerCellInfos*/
	      8 && div1_class_value !== (div1_class_value = "fg-card-header " +
	      /*headerCellInfos*/
	      ctx[3][
	      /*i*/
	      ctx[18]].classNames)) {
	        attr(div1, "class", div1_class_value);
	      }

	      if (!current || dirty &
	      /*headerCellInfos*/
	      8 && div1_style_value !== (div1_style_value = "width:40%;" +
	      /*headerCellInfos*/
	      ctx[3][
	      /*i*/
	      ctx[18]].extStyleStr)) {
	        attr(div1, "style", div1_style_value);
	      }

	      if_block.p(ctx, dirty);

	      if (!current || dirty &
	      /*bodyCellInfos*/
	      16 && div3_class_value !== (div3_class_value = "fg-card-cell " +
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].classNames)) {
	        attr(div3, "class", div3_class_value);
	      }

	      if (!current || dirty &
	      /*bodyCellInfos*/
	      16 && div3_style_value !== (div3_style_value = "width:60%;" +
	      /*bodyCellInfos*/
	      ctx[4][
	      /*i*/
	      ctx[18]].extStyleStr)) {
	        attr(div3, "style", div3_style_value);
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div4);
	      if_blocks[current_block_type_index].d();
	    }
	  };
	}

	function create_fragment$a(ctx) {
	  var div;
	  var current_block_type_index;
	  var if_block;
	  var current;
	  var dispose;
	  var if_block_creators = [create_if_block$4, create_else_block$3];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*cardTemplate*/
	    ctx[8]) return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  return {
	    c: function c() {
	      div = element("div");
	      if_block.c();
	      attr(div, "class", "fg-card-container");
	      set_style(div, "width",
	      /*cardLayout*/
	      ctx[5].width + "px");
	      set_style(div, "margin-right",
	      /*orderIndex*/
	      ctx[1] !==
	      /*numCards*/
	      ctx[6] - 1 ?
	      /*paddingBetweenCards*/
	      ctx[7] + "px" : "");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      if_blocks[current_block_type_index].m(div, null);
	      current = true;
	      dispose = [listen(div, "pointerdown",
	      /*handlePointerDown*/
	      ctx[10]), listen(div, "pointerup",
	      /*handlePointerUp*/
	      ctx[11])];
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if_block.p(ctx, dirty);

	      if (!current || dirty &
	      /*orderIndex*/
	      2) {
	        set_style(div, "margin-right",
	        /*orderIndex*/
	        ctx[1] !==
	        /*numCards*/
	        ctx[6] - 1 ?
	        /*paddingBetweenCards*/
	        ctx[7] + "px" : "");
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      if_blocks[current_block_type_index].d();
	      run_all(dispose);
	    }
	  };
	}

	function instance$a($$self, $$props, $$invalidate) {
	  var carItemIndex = $$props.carItemIndex;
	  var orderIndex = $$props.orderIndex;
	  var gridData,
	      longPressTimer,
	      longPressed = false;
	  visualUtils.subscribe(function (util) {
	    $$invalidate(2, gridData = util.gridData);
	  });

	  var cardLayout = getContext("cardLayout"),
	      dispatchEvent = getContext("dispatchEvent"),
	      numCards = cardLayout.numCards,
	      paddingBetweenCards = cardLayout.paddingBetweenCards,
	      cardTemplate = cardLayout.cardtemplate,
	      columnConfig = gridData.gridConfig.columns,
	      headerCellInfos,
	      bodyCellInfos,
	      getSanitizedInfo = function getSanitizedInfo(info) {
	    var returnObj = {};
	    returnObj.classNames = (info.class || []).join(" ");
	    returnObj.extStyleStr = "";

	    for (var key in info.style || {}) {
	      returnObj.extStyleStr += key + ":" + info.style[key] + ";";
	    }

	    returnObj.content = info.content;
	    returnObj.params = info.params;
	    returnObj.inlineChartStyle = info.inlineChartStyle || {};
	    return returnObj;
	  };

	  function handlePointerDown(e) {
	    longPressed = false;
	    longPressTimer = setTimeout(function () {
	      dispatchEvent("cardlongpressed", {
	        cardIndex: carItemIndex,
	        cardTemplate: cardTemplate
	      }, e);
	      longPressed = true;
	    }, 500);
	  }

	  function handlePointerUp(e) {
	    clearTimeout(longPressTimer);

	    if (!longPressed) {
	      dispatchEvent("cardclicked", {
	        cardIndex: carItemIndex,
	        cardTemplate: cardTemplate
	      }, e);
	      dispatchEvent("recordclicked", {
	        recordIndex: carItemIndex
	      }, e);
	    }
	  }

	  $$self.$set = function ($$props) {
	    if ("carItemIndex" in $$props) $$invalidate(0, carItemIndex = $$props.carItemIndex);
	    if ("orderIndex" in $$props) $$invalidate(1, orderIndex = $$props.orderIndex);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*headerCellInfos, gridData, bodyCellInfos, carItemIndex*/
	    29) {
	       {
	        $$invalidate(3, headerCellInfos = []);
	        $$invalidate(4, bodyCellInfos = []);

	        for (var i = 0; i < columnConfig.length; i++) {
	          headerCellInfos.push(getSanitizedInfo(gridData.getHeaderMetaInfo(i)));
	          bodyCellInfos.push(getSanitizedInfo(gridData.getCellMetaInfo(carItemIndex, i)));
	        }
	      }
	    }
	  };

	  return [carItemIndex, orderIndex, gridData, headerCellInfos, bodyCellInfos, cardLayout, numCards, paddingBetweenCards, cardTemplate, columnConfig, handlePointerDown, handlePointerUp];
	}

	var CardItem =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(CardItem, _SvelteComponent);

	  function CardItem(options) {
	    var _this;

	    _classCallCheck(this, CardItem);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(CardItem).call(this));
	    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {
	      carItemIndex: 0,
	      orderIndex: 1
	    });
	    return _this;
	  }

	  return CardItem;
	}(SvelteComponent);

	function get_each_context$3(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[7] = list[i];
	  return child_ctx;
	} // (24:4) {#if (((startIndex * incrementer) + cardIndex) + vizStartIndex) < dataLength}


	function create_if_block$5(ctx) {
	  var current;
	  var carditem = new CardItem({
	    props: {
	      carItemIndex:
	      /*startIndex*/
	      ctx[0] *
	      /*incrementer*/
	      ctx[1] +
	      /*cardIndex*/
	      ctx[7] +
	      /*vizStartIndex*/
	      ctx[4],
	      orderIndex:
	      /*cardIndex*/
	      ctx[7]
	    }
	  });
	  return {
	    c: function c() {
	      create_component(carditem.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(carditem, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var carditem_changes = {};
	      if (dirty &
	      /*startIndex, incrementer, vizStartIndex*/
	      19) carditem_changes.carItemIndex =
	      /*startIndex*/
	      ctx[0] *
	      /*incrementer*/
	      ctx[1] +
	      /*cardIndex*/
	      ctx[7] +
	      /*vizStartIndex*/
	      ctx[4];
	      carditem.$set(carditem_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(carditem.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(carditem.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(carditem, detaching);
	    }
	  };
	} // (23:2) {#each cardItemsIterator as cardIndex}


	function create_each_block$3(ctx) {
	  var if_block_anchor;
	  var current;
	  var if_block =
	  /*startIndex*/
	  ctx[0] *
	  /*incrementer*/
	  ctx[1] +
	  /*cardIndex*/
	  ctx[7] +
	  /*vizStartIndex*/
	  ctx[4] <
	  /*dataLength*/
	  ctx[3] && create_if_block$5(ctx);
	  return {
	    c: function c() {
	      if (if_block) if_block.c();
	      if_block_anchor = empty();
	    },
	    m: function m(target, anchor) {
	      if (if_block) if_block.m(target, anchor);
	      insert(target, if_block_anchor, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      if (
	      /*startIndex*/
	      ctx[0] *
	      /*incrementer*/
	      ctx[1] +
	      /*cardIndex*/
	      ctx[7] +
	      /*vizStartIndex*/
	      ctx[4] <
	      /*dataLength*/
	      ctx[3]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	          transition_in(if_block, 1);
	        } else {
	          if_block = create_if_block$5(ctx);
	          if_block.c();
	          transition_in(if_block, 1);
	          if_block.m(if_block_anchor.parentNode, if_block_anchor);
	        }
	      } else if (if_block) {
	        group_outros();
	        transition_out(if_block, 1, 1, function () {
	          if_block = null;
	        });
	        check_outros();
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (if_block) if_block.d(detaching);
	      if (detaching) detach(if_block_anchor);
	    }
	  };
	}

	function create_fragment$b(ctx) {
	  var div;
	  var current;
	  var each_value =
	  /*cardItemsIterator*/
	  ctx[5];
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  return {
	    c: function c() {
	      div = element("div");

	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      attr(div, "class", "fg-card-wrapper");
	      set_style(div, "padding-left",
	      /*startPadding*/
	      ctx[2] + "px");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);

	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(div, null);
	      }

	      current = true;
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*startIndex, incrementer, cardItemsIterator, vizStartIndex, dataLength*/
	      59) {
	        each_value =
	        /*cardItemsIterator*/
	        ctx[5];

	        var _i3;

	        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
	          var child_ctx = get_each_context$3(ctx, each_value, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);

	            transition_in(each_blocks[_i3], 1);
	          } else {
	            each_blocks[_i3] = create_each_block$3(child_ctx);

	            each_blocks[_i3].c();

	            transition_in(each_blocks[_i3], 1);

	            each_blocks[_i3].m(div, null);
	          }
	        }

	        group_outros();

	        for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
	          out(_i3);
	        }

	        check_outros();
	      }

	      if (!current || dirty &
	      /*startPadding*/
	      4) {
	        set_style(div, "padding-left",
	        /*startPadding*/
	        ctx[2] + "px");
	      }
	    },
	    i: function i(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      current = true;
	    },
	    o: function o(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_each(each_blocks, detaching);
	    }
	  };
	}

	function instance$b($$self, $$props, $$invalidate) {
	  var startIndex = $$props.startIndex;
	  var incrementer = $$props.incrementer;
	  var startPadding = $$props.startPadding;
	  var dataLength = $$props.dataLength;
	  var vizStartIndex = $$props.vizStartIndex;
	  var cardItemsIterator = [],
	      cardLayout = getContext("cardLayout");

	  for (var i = 0; i < incrementer; i++) {
	    cardItemsIterator.push(i);
	  }

	  $$self.$set = function ($$props) {
	    if ("startIndex" in $$props) $$invalidate(0, startIndex = $$props.startIndex);
	    if ("incrementer" in $$props) $$invalidate(1, incrementer = $$props.incrementer);
	    if ("startPadding" in $$props) $$invalidate(2, startPadding = $$props.startPadding);
	    if ("dataLength" in $$props) $$invalidate(3, dataLength = $$props.dataLength);
	    if ("vizStartIndex" in $$props) $$invalidate(4, vizStartIndex = $$props.vizStartIndex);
	  };

	  return [startIndex, incrementer, startPadding, dataLength, vizStartIndex, cardItemsIterator];
	}

	var CardWrapper =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(CardWrapper, _SvelteComponent);

	  function CardWrapper(options) {
	    var _this;

	    _classCallCheck(this, CardWrapper);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(CardWrapper).call(this));
	    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {
	      startIndex: 0,
	      incrementer: 1,
	      startPadding: 2,
	      dataLength: 3,
	      vizStartIndex: 4
	    });
	    return _this;
	  }

	  return CardWrapper;
	}(SvelteComponent);

	function get_each_context$4(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[16] = list[i];
	  return child_ctx;
	} // (44:2) {#each wrapperIterator as startIndex}


	function create_each_block$4(ctx) {
	  var current;
	  var cardwrapper = new CardWrapper({
	    props: {
	      vizStartIndex:
	      /*vizRecDomain*/
	      ctx[1].start,
	      startIndex:
	      /*startIndex*/
	      ctx[16],
	      incrementer:
	      /*numCards*/
	      ctx[6],
	      startPadding:
	      /*startPadding*/
	      ctx[7],
	      dataLength:
	      /*paginationEnabled*/
	      ctx[2] ?
	      /*vizRecDomain*/
	      ctx[1].end + 1 :
	      /*infiniteScrollManager*/
	      ctx[0].hScrollConfig.dataLength
	    }
	  });
	  return {
	    c: function c() {
	      create_component(cardwrapper.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(cardwrapper, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var cardwrapper_changes = {};
	      if (dirty &
	      /*vizRecDomain*/
	      2) cardwrapper_changes.vizStartIndex =
	      /*vizRecDomain*/
	      ctx[1].start;
	      if (dirty &
	      /*wrapperIterator*/
	      32) cardwrapper_changes.startIndex =
	      /*startIndex*/
	      ctx[16];
	      if (dirty &
	      /*paginationEnabled, vizRecDomain, infiniteScrollManager*/
	      7) cardwrapper_changes.dataLength =
	      /*paginationEnabled*/
	      ctx[2] ?
	      /*vizRecDomain*/
	      ctx[1].end + 1 :
	      /*infiniteScrollManager*/
	      ctx[0].hScrollConfig.dataLength;
	      cardwrapper.$set(cardwrapper_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(cardwrapper.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(cardwrapper.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(cardwrapper, detaching);
	    }
	  };
	}

	function create_fragment$c(ctx) {
	  var div;
	  var current;
	  var dispose;
	  var each_value =
	  /*wrapperIterator*/
	  ctx[5];
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  return {
	    c: function c() {
	      div = element("div");

	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      attr(div, "class", "fg-card-scroller");
	      set_style(div, "overflow-y", "scroll");
	      set_style(div, "height",
	      /*gridDimensions*/
	      ctx[3].height + "px");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);

	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(div, null);
	      }
	      /*div_binding*/


	      ctx[15](div);
	      current = true;
	      dispose = listen(div, "scroll",
	      /*scroll_handler*/
	      ctx[14]);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*vizRecDomain, wrapperIterator, numCards, startPadding, paginationEnabled, infiniteScrollManager*/
	      231) {
	        each_value =
	        /*wrapperIterator*/
	        ctx[5];

	        var _i3;

	        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
	          var child_ctx = get_each_context$4(ctx, each_value, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);

	            transition_in(each_blocks[_i3], 1);
	          } else {
	            each_blocks[_i3] = create_each_block$4(child_ctx);

	            each_blocks[_i3].c();

	            transition_in(each_blocks[_i3], 1);

	            each_blocks[_i3].m(div, null);
	          }
	        }

	        group_outros();

	        for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
	          out(_i3);
	        }

	        check_outros();
	      }

	      if (!current || dirty &
	      /*gridDimensions*/
	      8) {
	        set_style(div, "height",
	        /*gridDimensions*/
	        ctx[3].height + "px");
	      }
	    },
	    i: function i(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      current = true;
	    },
	    o: function o(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_each(each_blocks, detaching);
	      /*div_binding*/

	      ctx[15](null);
	      dispose();
	    }
	  };
	}

	var VERTICAL$1 = "vertical";

	function instance$c($$self, $$props, $$invalidate) {
	  var cardLayout = $$props.cardLayout,
	      infiniteScrollManager = $$props.infiniteScrollManager,
	      vizRecDomain = $$props.vizRecDomain,
	      paginationEnabled = $$props.paginationEnabled,
	      gridDimensions = $$props.gridDimensions;
	  var numCards = cardLayout.numCards,
	      startPadding = cardLayout.startPadding,
	      numRows,
	      element,
	      noCardWrappers,
	      wrapperIterator,
	      numberOfCards,
	      dispatchEvent = getContext("dispatchEvent");

	  function handleScroll(e) {
	    // vertical scroll
	    infiniteScrollManager.updateHScrollProps(e);
	    dispatchEvent("scroll", {
	      direction: VERTICAL$1,
	      top: element.scrollTop,
	      left: element.scrollLeft
	    }, e);
	  }

	  setContext("cardLayout", cardLayout);

	  var scroll_handler = function scroll_handler(e) {
	    return handleScroll(e);
	  };

	  function div_binding($$value) {
	    binding_callbacks[$$value ? "unshift" : "push"](function () {
	      $$invalidate(4, element = $$value);
	    });
	  }

	  $$self.$set = function ($$props) {
	    if ("cardLayout" in $$props) $$invalidate(9, cardLayout = $$props.cardLayout);
	    if ("infiniteScrollManager" in $$props) $$invalidate(0, infiniteScrollManager = $$props.infiniteScrollManager);
	    if ("vizRecDomain" in $$props) $$invalidate(1, vizRecDomain = $$props.vizRecDomain);
	    if ("paginationEnabled" in $$props) $$invalidate(2, paginationEnabled = $$props.paginationEnabled);
	    if ("gridDimensions" in $$props) $$invalidate(3, gridDimensions = $$props.gridDimensions);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*vizRecDomain, numRows, noCardWrappers, wrapperIterator*/
	    3106) {
	       {
	        // adding 1 otherwise 0th row will be missed
	        $$invalidate(10, numRows = vizRecDomain.end - vizRecDomain.start + 1);
	        $$invalidate(11, noCardWrappers = Math.ceil(numRows / numCards));
	        $$invalidate(5, wrapperIterator = []);

	        for (var i = 0; i < noCardWrappers; i++) {
	          wrapperIterator.push(i);
	        }
	      }
	    }
	  };

	  return [infiniteScrollManager, vizRecDomain, paginationEnabled, gridDimensions, element, wrapperIterator, numCards, startPadding, handleScroll, cardLayout, numRows, noCardWrappers, numberOfCards, dispatchEvent, scroll_handler, div_binding];
	}

	var Card =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Card, _SvelteComponent);

	  function Card(options) {
	    var _this;

	    _classCallCheck(this, Card);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this));
	    init(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {
	      cardLayout: 9,
	      infiniteScrollManager: 0,
	      vizRecDomain: 1,
	      paginationEnabled: 2,
	      gridDimensions: 3
	    });
	    return _this;
	  }

	  return Card;
	}(SvelteComponent);

	function create_fragment$d(ctx) {
	  var div;
	  var dispose;
	  return {
	    c: function c() {
	      div = element("div");
	      div.innerHTML = "<span>FusionCharts</span>";
	      attr(div, "class", "fg-credit-label");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      dispose = listen(div, "click", handleClick);
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      dispose();
	    }
	  };
	}

	function handleClick() {
	  window.open("https://www.fusioncharts.com/?BS=FGEvalMark&utm_source=FusionGrid");
	}

	var CreditLabel =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(CreditLabel, _SvelteComponent);

	  function CreditLabel(options) {
	    var _this;

	    _classCallCheck(this, CreditLabel);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(CreditLabel).call(this));
	    init(_assertThisInitialized(_this), options, null, create_fragment$d, safe_not_equal, {});
	    return _this;
	  }

	  return CreditLabel;
	}(SvelteComponent);

	function create_fragment$e(ctx) {
	  var svg;
	  var title;
	  var t;
	  var g5;
	  var g4;
	  var g3;
	  var g2;
	  var g1;
	  var g0;
	  var polygon;
	  var rect;
	  var dispose;
	  return {
	    c: function c() {
	      svg = svg_element("svg");
	      title = svg_element("title");
	      t = text("First");
	      g5 = svg_element("g");
	      g4 = svg_element("g");
	      g3 = svg_element("g");
	      g2 = svg_element("g");
	      g1 = svg_element("g");
	      g0 = svg_element("g");
	      polygon = svg_element("polygon");
	      rect = svg_element("rect");
	      attr(polygon, "id", "Path");
	      attr(polygon, "points", "1.30726843 11.4546596 0.0952148571 10.242606 4.33782086 6 0.0952148571 1.757394 1.30726843 0.545340429 6.761928 6");
	      attr(rect, "id", "Rectangle");
	      attr(rect, "x", "7.57142857");
	      attr(rect, "y", "0");
	      attr(rect, "width", "1.71428571");
	      attr(rect, "height", "12");
	      attr(g0, "id", "First");
	      attr(g0, "transform", "translate(5.000000, 8.000000) scale(-1, 1) translate(-5.000000, -8.000000) translate(0.000000, 2.000000)");
	      attr(g1, "id", "Page-Controls");
	      attr(g1, "transform", "translate(26.000000, 10.000000)");
	      attr(g2, "id", "Pagination-Tab");
	      attr(g2, "transform", "translate(0.000000, 20.000000)");
	      attr(g3, "id", "10");
	      attr(g3, "transform", "translate(7.000000, 697.000000)");
	      attr(g4, "id", "1023-1199-Pagination-Elements");
	      attr(g4, "transform", "translate(-33.000000, -729.000000)");
	      attr(g4, "fill", "#547490");
	      attr(g4, "fill-rule", "nonzero");
	      attr(g5, "id", "011119---12px");
	      attr(g5, "stroke", "none");
	      attr(g5, "stroke-width", "1");
	      attr(g5, "fill", "none");
	      attr(g5, "fill-rule", "evenodd");
	      set_style(svg, "cursor",
	      /*config*/
	      ctx[0].currentPage === 1 ? "not-allowed" : "pointer");
	      attr(svg, "width", "10px");
	      attr(svg, "height", "12px");
	      attr(svg, "viewBox", "0 0 10 12");
	      attr(svg, "version", "1.1");
	      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
	      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
	    },
	    m: function m(target, anchor) {
	      insert(target, svg, anchor);
	      append(svg, title);
	      append(title, t);
	      append(svg, g5);
	      append(g5, g4);
	      append(g4, g3);
	      append(g3, g2);
	      append(g2, g1);
	      append(g1, g0);
	      append(g0, polygon);
	      append(g0, rect);
	      dispose = listen(svg, "click",
	      /*handlers*/
	      ctx[1].jumpToFirstPage);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*config*/
	      1) {
	        set_style(svg, "cursor",
	        /*config*/
	        ctx[0].currentPage === 1 ? "not-allowed" : "pointer");
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(svg);
	      dispose();
	    }
	  };
	}

	function instance$d($$self, $$props, $$invalidate) {
	  var config = $$props.config;
	  var handlers = getContext("handlers");

	  $$self.$set = function ($$props) {
	    if ("config" in $$props) $$invalidate(0, config = $$props.config);
	  };

	  return [config, handlers];
	}

	var First =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(First, _SvelteComponent);

	  function First(options) {
	    var _this;

	    _classCallCheck(this, First);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(First).call(this));
	    init(_assertThisInitialized(_this), options, instance$d, create_fragment$e, safe_not_equal, {
	      config: 0
	    });
	    return _this;
	  }

	  return First;
	}(SvelteComponent);

	function create_fragment$f(ctx) {
	  var svg;
	  var title;
	  var t;
	  var g5;
	  var g4;
	  var g3;
	  var g2;
	  var g1;
	  var g0;
	  var polygon;
	  var rect;
	  var dispose;
	  return {
	    c: function c() {
	      svg = svg_element("svg");
	      title = svg_element("title");
	      t = text("Last");
	      g5 = svg_element("g");
	      g4 = svg_element("g");
	      g3 = svg_element("g");
	      g2 = svg_element("g");
	      g1 = svg_element("g");
	      g0 = svg_element("g");
	      polygon = svg_element("polygon");
	      rect = svg_element("rect");
	      attr(polygon, "id", "Path");
	      attr(polygon, "points", "1.30726843 11.4546596 0.0952148571 10.242606 4.33782086 6 0.0952148571 1.757394 1.30726843 0.545340429 6.761928 6");
	      attr(rect, "id", "Rectangle");
	      attr(rect, "x", "7.57142857");
	      attr(rect, "y", "0");
	      attr(rect, "width", "1.71428571");
	      attr(rect, "height", "12");
	      attr(g0, "id", "Last");
	      attr(g0, "transform", "translate(129.000000, 2.000000)");
	      attr(g1, "id", "Page-Controls");
	      attr(g1, "transform", "translate(26.000000, 10.000000)");
	      attr(g2, "id", "Pagination-Tab");
	      attr(g2, "transform", "translate(0.000000, 20.000000)");
	      attr(g3, "id", "10");
	      attr(g3, "transform", "translate(7.000000, 697.000000)");
	      attr(g4, "id", "1023-1199-Pagination-Elements");
	      attr(g4, "transform", "translate(-162.000000, -729.000000)");
	      attr(g4, "fill", "#547490");
	      attr(g4, "fill-rule", "nonzero");
	      attr(g5, "id", "011119---12px");
	      attr(g5, "stroke", "none");
	      attr(g5, "stroke-width", "1");
	      attr(g5, "fill", "none");
	      attr(g5, "fill-rule", "evenodd");
	      set_style(svg, "cursor",
	      /*config*/
	      ctx[0].currentPage ===
	      /*config*/
	      ctx[0].totalPages ? "not-allowed" : "pointer");
	      attr(svg, "width", "10px");
	      attr(svg, "height", "12px");
	      attr(svg, "viewBox", "0 0 10 12");
	      attr(svg, "version", "1.1");
	      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
	      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
	    },
	    m: function m(target, anchor) {
	      insert(target, svg, anchor);
	      append(svg, title);
	      append(title, t);
	      append(svg, g5);
	      append(g5, g4);
	      append(g4, g3);
	      append(g3, g2);
	      append(g2, g1);
	      append(g1, g0);
	      append(g0, polygon);
	      append(g0, rect);
	      dispose = listen(svg, "click",
	      /*handlers*/
	      ctx[1].jumpToLastPage);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*config*/
	      1) {
	        set_style(svg, "cursor",
	        /*config*/
	        ctx[0].currentPage ===
	        /*config*/
	        ctx[0].totalPages ? "not-allowed" : "pointer");
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(svg);
	      dispose();
	    }
	  };
	}

	function instance$e($$self, $$props, $$invalidate) {
	  var config = $$props.config;
	  var handlers = getContext("handlers");

	  $$self.$set = function ($$props) {
	    if ("config" in $$props) $$invalidate(0, config = $$props.config);
	  };

	  return [config, handlers];
	}

	var Last =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Last, _SvelteComponent);

	  function Last(options) {
	    var _this;

	    _classCallCheck(this, Last);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Last).call(this));
	    init(_assertThisInitialized(_this), options, instance$e, create_fragment$f, safe_not_equal, {
	      config: 0
	    });
	    return _this;
	  }

	  return Last;
	}(SvelteComponent);

	function create_fragment$g(ctx) {
	  var svg;
	  var title;
	  var t;
	  var g5;
	  var g4;
	  var g3;
	  var g2;
	  var g1;
	  var g0;
	  var polygon;
	  var dispose;
	  return {
	    c: function c() {
	      svg = svg_element("svg");
	      title = svg_element("title");
	      t = text("Next");
	      g5 = svg_element("g");
	      g4 = svg_element("g");
	      g3 = svg_element("g");
	      g2 = svg_element("g");
	      g1 = svg_element("g");
	      g0 = svg_element("g");
	      polygon = svg_element("polygon");
	      attr(polygon, "id", "Path");
	      attr(polygon, "points", "1.83323104 12.5453404 0.5 11.2121094 5.16676896 6.54534043 0.5 1.87857146 1.83323104 0.545340429 7.83323104 6.54534043");
	      attr(g0, "id", "Next");
	      attr(g0, "transform", "translate(105.000000, 1.000000)");
	      attr(g1, "id", "Page-Controls");
	      attr(g1, "transform", "translate(26.000000, 10.000000)");
	      attr(g2, "id", "Pagination-Tab");
	      attr(g2, "transform", "translate(0.000000, 20.000000)");
	      attr(g3, "id", "10");
	      attr(g3, "transform", "translate(7.000000, 697.000000)");
	      attr(g4, "id", "1023-1199-Pagination-Elements");
	      attr(g4, "transform", "translate(-138.000000, -728.000000)");
	      attr(g4, "fill", "#547490");
	      attr(g4, "fill-rule", "nonzero");
	      attr(g5, "id", "011119---12px");
	      attr(g5, "stroke", "none");
	      attr(g5, "stroke-width", "1");
	      attr(g5, "fill", "none");
	      attr(g5, "fill-rule", "evenodd");
	      set_style(svg, "cursor",
	      /*config*/
	      ctx[0].currentPage ===
	      /*config*/
	      ctx[0].totalPages ? "not-allowed" : "pointer");
	      attr(svg, "width", "8px");
	      attr(svg, "height", "13px");
	      attr(svg, "viewBox", "0 0 8 13");
	      attr(svg, "version", "1.1");
	      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
	      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
	    },
	    m: function m(target, anchor) {
	      insert(target, svg, anchor);
	      append(svg, title);
	      append(title, t);
	      append(svg, g5);
	      append(g5, g4);
	      append(g4, g3);
	      append(g3, g2);
	      append(g2, g1);
	      append(g1, g0);
	      append(g0, polygon);
	      dispose = listen(svg, "click",
	      /*handlers*/
	      ctx[1].jumpToNextPage);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*config*/
	      1) {
	        set_style(svg, "cursor",
	        /*config*/
	        ctx[0].currentPage ===
	        /*config*/
	        ctx[0].totalPages ? "not-allowed" : "pointer");
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(svg);
	      dispose();
	    }
	  };
	}

	function instance$f($$self, $$props, $$invalidate) {
	  var config = $$props.config;
	  var handlers = getContext("handlers");

	  $$self.$set = function ($$props) {
	    if ("config" in $$props) $$invalidate(0, config = $$props.config);
	  };

	  return [config, handlers];
	}

	var Next =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Next, _SvelteComponent);

	  function Next(options) {
	    var _this;

	    _classCallCheck(this, Next);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Next).call(this));
	    init(_assertThisInitialized(_this), options, instance$f, create_fragment$g, safe_not_equal, {
	      config: 0
	    });
	    return _this;
	  }

	  return Next;
	}(SvelteComponent);

	function create_fragment$h(ctx) {
	  var svg;
	  var title;
	  var t;
	  var g5;
	  var g4;
	  var g3;
	  var g2;
	  var g1;
	  var g0;
	  var polygon;
	  var dispose;
	  return {
	    c: function c() {
	      svg = svg_element("svg");
	      title = svg_element("title");
	      t = text("Previous");
	      g5 = svg_element("g");
	      g4 = svg_element("g");
	      g3 = svg_element("g");
	      g2 = svg_element("g");
	      g1 = svg_element("g");
	      g0 = svg_element("g");
	      polygon = svg_element("polygon");
	      attr(polygon, "id", "Path");
	      attr(polygon, "transform", "translate(4.261830, 6.545340) scale(-1, 1) translate(-4.261830, -6.545340) ");
	      attr(polygon, "points", "1.92844589 12.5453404 0.595214857 11.2121094 5.26198382 6.54534043 0.595214857 1.87857146 1.92844589 0.545340429 7.92844589 6.54534043");
	      attr(g0, "id", "Previous");
	      attr(g0, "transform", "translate(26.000000, 1.000000)");
	      attr(g1, "id", "Page-Controls");
	      attr(g1, "transform", "translate(26.000000, 10.000000)");
	      attr(g2, "id", "Pagination-Tab");
	      attr(g2, "transform", "translate(0.000000, 20.000000)");
	      attr(g3, "id", "10");
	      attr(g3, "transform", "translate(7.000000, 697.000000)");
	      attr(g4, "id", "1023-1199-Pagination-Elements");
	      attr(g4, "transform", "translate(-59.000000, -728.000000)");
	      attr(g4, "fill", "#547490");
	      attr(g4, "fill-rule", "nonzero");
	      attr(g5, "id", "011119---12px");
	      attr(g5, "stroke", "none");
	      attr(g5, "stroke-width", "1");
	      attr(g5, "fill", "none");
	      attr(g5, "fill-rule", "evenodd");
	      set_style(svg, "cursor",
	      /*config*/
	      ctx[0].currentPage === 1 ? "not-allowed" : "pointer");
	      attr(svg, "width", "8px");
	      attr(svg, "height", "13px");
	      attr(svg, "viewBox", "0 0 8 13");
	      attr(svg, "version", "1.1");
	      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
	      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
	    },
	    m: function m(target, anchor) {
	      insert(target, svg, anchor);
	      append(svg, title);
	      append(title, t);
	      append(svg, g5);
	      append(g5, g4);
	      append(g4, g3);
	      append(g3, g2);
	      append(g2, g1);
	      append(g1, g0);
	      append(g0, polygon);
	      dispose = listen(svg, "click",
	      /*handlers*/
	      ctx[1].jumpToPreviousPage);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*config*/
	      1) {
	        set_style(svg, "cursor",
	        /*config*/
	        ctx[0].currentPage === 1 ? "not-allowed" : "pointer");
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(svg);
	      dispose();
	    }
	  };
	}

	function instance$g($$self, $$props, $$invalidate) {
	  var config = $$props.config;
	  var handlers = getContext("handlers");

	  $$self.$set = function ($$props) {
	    if ("config" in $$props) $$invalidate(0, config = $$props.config);
	  };

	  return [config, handlers];
	}

	var Previous =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Previous, _SvelteComponent);

	  function Previous(options) {
	    var _this;

	    _classCallCheck(this, Previous);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Previous).call(this));
	    init(_assertThisInitialized(_this), options, instance$g, create_fragment$h, safe_not_equal, {
	      config: 0
	    });
	    return _this;
	  }

	  return Previous;
	}(SvelteComponent);

	function create_else_block$4(ctx) {
	  var div;
	  var t_value =
	  /*config*/
	  ctx[0].currentPage + "";
	  var t;
	  return {
	    c: function c() {
	      div = element("div");
	      t = text(t_value);
	      attr(div, "class", "fg-pagination-current-page");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      append(div, t);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty &
	      /*config*/
	      1 && t_value !== (t_value =
	      /*config*/
	      ctx[0].currentPage + "")) set_data(t, t_value);
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	    }
	  };
	} // (16:0) {#if config.showPages.userInput}


	function create_if_block_1$4(ctx) {
	  var input;
	  var input_value_value;
	  var dispose;
	  return {
	    c: function c() {
	      input = element("input");
	      attr(input, "type", "text");
	      set_style(input, "width", "31px");
	      set_style(input, "height", "25px");
	      set_style(input, "margin-right", (
	      /*config*/
	      ctx[0].showPages.showTotal ? 5 : 0) + "px");
	      input.value = input_value_value =
	      /*config*/
	      ctx[0].currentPage;
	    },
	    m: function m(target, anchor) {
	      insert(target, input, anchor);
	      dispose = listen(input, "keydown",
	      /*handleUserInput*/
	      ctx[2]);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty &
	      /*config*/
	      1) {
	        set_style(input, "margin-right", (
	        /*config*/
	        ctx[0].showPages.showTotal ? 5 : 0) + "px");
	      }

	      if (dirty &
	      /*config*/
	      1 && input_value_value !== (input_value_value =
	      /*config*/
	      ctx[0].currentPage) && input.value !== input_value_value) {
	        input.value = input_value_value;
	      }
	    },
	    d: function d(detaching) {
	      if (detaching) detach(input);
	      dispose();
	    }
	  };
	} // (21:0) {#if config.showPages.showTotal && displayTotal}


	function create_if_block$6(ctx) {
	  var div;
	  var t0;
	  var t1_value =
	  /*config*/
	  ctx[0].totalPages + "";
	  var t1;
	  return {
	    c: function c() {
	      div = element("div");
	      t0 = text("of ");
	      t1 = text(t1_value);
	      attr(div, "class", "fg-pagination-total-page");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      append(div, t0);
	      append(div, t1);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty &
	      /*config*/
	      1 && t1_value !== (t1_value =
	      /*config*/
	      ctx[0].totalPages + "")) set_data(t1, t1_value);
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	    }
	  };
	}

	function create_fragment$i(ctx) {
	  var t;
	  var if_block1_anchor;

	  function select_block_type(ctx, dirty) {
	    if (
	    /*config*/
	    ctx[0].showPages.userInput) return create_if_block_1$4;
	    return create_else_block$4;
	  }

	  var current_block_type = select_block_type(ctx);
	  var if_block0 = current_block_type(ctx);
	  var if_block1 =
	  /*config*/
	  ctx[0].showPages.showTotal &&
	  /*displayTotal*/
	  ctx[1] && create_if_block$6(ctx);
	  return {
	    c: function c() {
	      if_block0.c();
	      t = space();
	      if (if_block1) if_block1.c();
	      if_block1_anchor = empty();
	    },
	    m: function m(target, anchor) {
	      if_block0.m(target, anchor);
	      insert(target, t, anchor);
	      if (if_block1) if_block1.m(target, anchor);
	      insert(target, if_block1_anchor, anchor);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
	        if_block0.p(ctx, dirty);
	      } else {
	        if_block0.d(1);
	        if_block0 = current_block_type(ctx);

	        if (if_block0) {
	          if_block0.c();
	          if_block0.m(t.parentNode, t);
	        }
	      }

	      if (
	      /*config*/
	      ctx[0].showPages.showTotal &&
	      /*displayTotal*/
	      ctx[1]) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);
	        } else {
	          if_block1 = create_if_block$6(ctx);
	          if_block1.c();
	          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
	        }
	      } else if (if_block1) {
	        if_block1.d(1);
	        if_block1 = null;
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if_block0.d(detaching);
	      if (detaching) detach(t);
	      if (if_block1) if_block1.d(detaching);
	      if (detaching) detach(if_block1_anchor);
	    }
	  };
	}

	function instance$h($$self, $$props, $$invalidate) {
	  var config = $$props.config;
	  var displayTotal = $$props.displayTotal;
	  var handlers = getContext("handlers");

	  function handleUserInput(e) {
	    if (e.keyCode === 13) {
	      handlers.jumpToPage(e.target.value);
	    }
	  }

	  $$self.$set = function ($$props) {
	    if ("config" in $$props) $$invalidate(0, config = $$props.config);
	    if ("displayTotal" in $$props) $$invalidate(1, displayTotal = $$props.displayTotal);
	  };

	  return [config, displayTotal, handleUserInput];
	}

	var Page_details =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Page_details, _SvelteComponent);

	  function Page_details(options) {
	    var _this;

	    _classCallCheck(this, Page_details);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Page_details).call(this));
	    init(_assertThisInitialized(_this), options, instance$h, create_fragment$i, safe_not_equal, {
	      config: 0,
	      displayTotal: 1
	    });
	    return _this;
	  }

	  return Page_details;
	}(SvelteComponent);

	function create_if_block_2$2(ctx) {
	  var div;
	  var current;
	  var first = new First({
	    props: {
	      config:
	      /*config*/
	      ctx[0]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(first.$$.fragment);
	      attr(div, "class", "fg-pagination-first-page-button");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(first, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var first_changes = {};
	      if (dirty &
	      /*config*/
	      1) first_changes.config =
	      /*config*/
	      ctx[0];
	      first.$set(first_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(first.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(first.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(first);
	    }
	  };
	} // (26:0) {#if config.showPages.enable && (drawAllButtons || (INPUT_WITH_SINGLE_JUMP_ARROWS_WIDTH <= width))}


	function create_if_block_1$5(ctx) {
	  var div;
	  var current;
	  var pagedetails = new Page_details({
	    props: {
	      config:
	      /*config*/
	      ctx[0],
	      displayTotal:
	      /*drawAllButtons*/
	      ctx[2]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(pagedetails.$$.fragment);
	      attr(div, "class", "fg-pagination-page-details");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(pagedetails, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var pagedetails_changes = {};
	      if (dirty &
	      /*config*/
	      1) pagedetails_changes.config =
	      /*config*/
	      ctx[0];
	      pagedetails.$set(pagedetails_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(pagedetails.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(pagedetails.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(pagedetails);
	    }
	  };
	} // (34:0) {#if config.showJumpToLastPage && drawAllButtons}


	function create_if_block$7(ctx) {
	  var div;
	  var current;
	  var last = new Last({
	    props: {
	      config:
	      /*config*/
	      ctx[0]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(last.$$.fragment);
	      attr(div, "class", "fg-pagination-last-page-button");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(last, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var last_changes = {};
	      if (dirty &
	      /*config*/
	      1) last_changes.config =
	      /*config*/
	      ctx[0];
	      last.$set(last_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(last.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(last.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(last);
	    }
	  };
	}

	function create_fragment$j(ctx) {
	  var t0;
	  var div0;
	  var t1;
	  var t2;
	  var div1;
	  var t3;
	  var if_block2_anchor;
	  var current;
	  var if_block0 =
	  /*config*/
	  ctx[0].showJumptoFirstPage &&
	  /*drawAllButtons*/
	  ctx[2] && create_if_block_2$2(ctx);
	  var previous = new Previous({
	    props: {
	      config:
	      /*config*/
	      ctx[0]
	    }
	  });
	  var if_block1 =
	  /*config*/
	  ctx[0].showPages.enable && (
	  /*drawAllButtons*/
	  ctx[2] || INPUT_WITH_SINGLE_JUMP_ARROWS_WIDTH <=
	  /*width*/
	  ctx[1]) && create_if_block_1$5(ctx);
	  var next = new Next({
	    props: {
	      config:
	      /*config*/
	      ctx[0]
	    }
	  });
	  var if_block2 =
	  /*config*/
	  ctx[0].showJumpToLastPage &&
	  /*drawAllButtons*/
	  ctx[2] && create_if_block$7(ctx);
	  return {
	    c: function c() {
	      if (if_block0) if_block0.c();
	      t0 = space();
	      div0 = element("div");
	      create_component(previous.$$.fragment);
	      t1 = space();
	      if (if_block1) if_block1.c();
	      t2 = space();
	      div1 = element("div");
	      create_component(next.$$.fragment);
	      t3 = space();
	      if (if_block2) if_block2.c();
	      if_block2_anchor = empty();
	      attr(div0, "class", "fg-pagination-previous-button");
	      set_style(div0, "width", "8px");
	      set_style(div0, "height", "13px");
	      attr(div1, "class", "fg-pagination-next-button");
	      set_style(div1, "width", "8px");
	      set_style(div1, "height", "13px");
	    },
	    m: function m(target, anchor) {
	      if (if_block0) if_block0.m(target, anchor);
	      insert(target, t0, anchor);
	      insert(target, div0, anchor);
	      mount_component(previous, div0, null);
	      insert(target, t1, anchor);
	      if (if_block1) if_block1.m(target, anchor);
	      insert(target, t2, anchor);
	      insert(target, div1, anchor);
	      mount_component(next, div1, null);
	      insert(target, t3, anchor);
	      if (if_block2) if_block2.m(target, anchor);
	      insert(target, if_block2_anchor, anchor);
	      current = true;
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (
	      /*config*/
	      ctx[0].showJumptoFirstPage &&
	      /*drawAllButtons*/
	      ctx[2]) {
	        if (if_block0) {
	          if_block0.p(ctx, dirty);
	          transition_in(if_block0, 1);
	        } else {
	          if_block0 = create_if_block_2$2(ctx);
	          if_block0.c();
	          transition_in(if_block0, 1);
	          if_block0.m(t0.parentNode, t0);
	        }
	      } else if (if_block0) {
	        group_outros();
	        transition_out(if_block0, 1, 1, function () {
	          if_block0 = null;
	        });
	        check_outros();
	      }

	      var previous_changes = {};
	      if (dirty &
	      /*config*/
	      1) previous_changes.config =
	      /*config*/
	      ctx[0];
	      previous.$set(previous_changes);

	      if (
	      /*config*/
	      ctx[0].showPages.enable && (
	      /*drawAllButtons*/
	      ctx[2] || INPUT_WITH_SINGLE_JUMP_ARROWS_WIDTH <=
	      /*width*/
	      ctx[1])) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);
	          transition_in(if_block1, 1);
	        } else {
	          if_block1 = create_if_block_1$5(ctx);
	          if_block1.c();
	          transition_in(if_block1, 1);
	          if_block1.m(t2.parentNode, t2);
	        }
	      } else if (if_block1) {
	        group_outros();
	        transition_out(if_block1, 1, 1, function () {
	          if_block1 = null;
	        });
	        check_outros();
	      }

	      var next_changes = {};
	      if (dirty &
	      /*config*/
	      1) next_changes.config =
	      /*config*/
	      ctx[0];
	      next.$set(next_changes);

	      if (
	      /*config*/
	      ctx[0].showJumpToLastPage &&
	      /*drawAllButtons*/
	      ctx[2]) {
	        if (if_block2) {
	          if_block2.p(ctx, dirty);
	          transition_in(if_block2, 1);
	        } else {
	          if_block2 = create_if_block$7(ctx);
	          if_block2.c();
	          transition_in(if_block2, 1);
	          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
	        }
	      } else if (if_block2) {
	        group_outros();
	        transition_out(if_block2, 1, 1, function () {
	          if_block2 = null;
	        });
	        check_outros();
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block0);
	      transition_in(previous.$$.fragment, local);
	      transition_in(if_block1);
	      transition_in(next.$$.fragment, local);
	      transition_in(if_block2);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block0);
	      transition_out(previous.$$.fragment, local);
	      transition_out(if_block1);
	      transition_out(next.$$.fragment, local);
	      transition_out(if_block2);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (if_block0) if_block0.d(detaching);
	      if (detaching) detach(t0);
	      if (detaching) detach(div0);
	      destroy_component(previous);
	      if (detaching) detach(t1);
	      if (if_block1) if_block1.d(detaching);
	      if (detaching) detach(t2);
	      if (detaching) detach(div1);
	      destroy_component(next);
	      if (detaching) detach(t3);
	      if (if_block2) if_block2.d(detaching);
	      if (detaching) detach(if_block2_anchor);
	    }
	  };
	}

	var ALL_BUTTONS_WIDTH = 192.8,
	    INPUT_WITH_SINGLE_JUMP_ARROWS_WIDTH = 123;

	function instance$i($$self, $$props, $$invalidate) {
	  var config = $$props.config;
	  var width = $$props.width;
	  var drawAllButtons = ALL_BUTTONS_WIDTH <= width;

	  $$self.$set = function ($$props) {
	    if ("config" in $$props) $$invalidate(0, config = $$props.config);
	    if ("width" in $$props) $$invalidate(1, width = $$props.width);
	  };

	  return [config, width, drawAllButtons];
	}

	var Buttons =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Buttons, _SvelteComponent);

	  function Buttons(options) {
	    var _this;

	    _classCallCheck(this, Buttons);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Buttons).call(this));
	    init(_assertThisInitialized(_this), options, instance$i, create_fragment$j, safe_not_equal, {
	      config: 0,
	      width: 1
	    });
	    return _this;
	  }

	  return Buttons;
	}(SvelteComponent);

	function get_each_context$5(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[4] = list[i];
	  return child_ctx;
	} // (14:5) {#each options as option}


	function create_each_block$5(ctx) {
	  var option;
	  var t_value =
	  /*option*/
	  ctx[4] + "";
	  var t;
	  var option_value_value;
	  var option_selected_value;
	  return {
	    c: function c() {
	      option = element("option");
	      t = text(t_value);
	      option.__value = option_value_value =
	      /*option*/
	      ctx[4];
	      option.value = option.__value;
	      option.selected = option_selected_value =
	      /*option*/
	      ctx[4] ===
	      /*pageSize*/
	      ctx[1];
	    },
	    m: function m(target, anchor) {
	      insert(target, option, anchor);
	      append(option, t);
	    },
	    p: function p(ctx, dirty) {
	      if (dirty &
	      /*options*/
	      1 && t_value !== (t_value =
	      /*option*/
	      ctx[4] + "")) set_data(t, t_value);

	      if (dirty &
	      /*options*/
	      1 && option_value_value !== (option_value_value =
	      /*option*/
	      ctx[4])) {
	        option.__value = option_value_value;
	      }

	      option.value = option.__value;

	      if (dirty &
	      /*options, pageSize*/
	      3 && option_selected_value !== (option_selected_value =
	      /*option*/
	      ctx[4] ===
	      /*pageSize*/
	      ctx[1])) {
	        option.selected = option_selected_value;
	      }
	    },
	    d: function d(detaching) {
	      if (detaching) detach(option);
	    }
	  };
	}

	function create_fragment$k(ctx) {
	  var select;
	  var t0;
	  var div;
	  var dispose;
	  var each_value =
	  /*options*/
	  ctx[0];
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	  }

	  return {
	    c: function c() {
	      select = element("select");

	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      t0 = space();
	      div = element("div");
	      div.textContent = "items per page";
	      attr(select, "name", "page-size-options");
	      attr(select, "class", "fg-pagination-page-size-options");
	      set_style(select, "width", "61px");
	      set_style(select, "height", "23px");
	      attr(div, "class", "fg-pagination-options-helper-text");
	    },
	    m: function m(target, anchor) {
	      insert(target, select, anchor);

	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(select, null);
	      }

	      insert(target, t0, anchor);
	      insert(target, div, anchor);
	      dispose = listen(select, "change",
	      /*handlePageSizeChange*/
	      ctx[2]);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*options, pageSize*/
	      3) {
	        each_value =
	        /*options*/
	        ctx[0];

	        var _i3;

	        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
	          var child_ctx = get_each_context$5(ctx, each_value, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);
	          } else {
	            each_blocks[_i3] = create_each_block$5(child_ctx);

	            each_blocks[_i3].c();

	            each_blocks[_i3].m(select, null);
	          }
	        }

	        for (; _i3 < each_blocks.length; _i3 += 1) {
	          each_blocks[_i3].d(1);
	        }

	        each_blocks.length = each_value.length;
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(select);
	      destroy_each(each_blocks, detaching);
	      if (detaching) detach(t0);
	      if (detaching) detach(div);
	      dispose();
	    }
	  };
	}

	function instance$j($$self, $$props, $$invalidate) {
	  var options = $$props.options;
	  var pageSize = $$props.pageSize;
	  var handlers = getContext("handlers");

	  function handlePageSizeChange(e) {
	    handlers.setPageSize(e.target.value);
	  }

	  $$self.$set = function ($$props) {
	    if ("options" in $$props) $$invalidate(0, options = $$props.options);
	    if ("pageSize" in $$props) $$invalidate(1, pageSize = $$props.pageSize);
	  };

	  return [options, pageSize, handlePageSizeChange];
	}

	var Options =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Options, _SvelteComponent);

	  function Options(options) {
	    var _this;

	    _classCallCheck(this, Options);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Options).call(this));
	    init(_assertThisInitialized(_this), options, instance$j, create_fragment$k, safe_not_equal, {
	      options: 0,
	      pageSize: 1
	    });
	    return _this;
	  }

	  return Options;
	}(SvelteComponent);

	function create_fragment$l(ctx) {
	  var div;
	  var t0;
	  var t1;
	  var t2;
	  var t3;
	  var t4;
	  var t5;
	  var t6;
	  return {
	    c: function c() {
	      div = element("div");
	      t0 = text("Showing ");
	      t1 = text(
	      /*startRecord*/
	      ctx[0]);
	      t2 = text("-");
	      t3 = text(
	      /*endRecord*/
	      ctx[1]);
	      t4 = text(" of ");
	      t5 = text(
	      /*totalRecords*/
	      ctx[2]);
	      t6 = text(" items");
	      attr(div, "class", "fg-pagination-record-details");
	      set_style(div, "width", "100%");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      append(div, t0);
	      append(div, t1);
	      append(div, t2);
	      append(div, t3);
	      append(div, t4);
	      append(div, t5);
	      append(div, t6);
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*startRecord*/
	      1) set_data(t1,
	      /*startRecord*/
	      ctx[0]);
	      if (dirty &
	      /*endRecord*/
	      2) set_data(t3,
	      /*endRecord*/
	      ctx[1]);
	      if (dirty &
	      /*totalRecords*/
	      4) set_data(t5,
	      /*totalRecords*/
	      ctx[2]);
	    },
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(div);
	    }
	  };
	}

	function instance$k($$self, $$props, $$invalidate) {
	  var startRecord = $$props.startRecord;
	  var endRecord = $$props.endRecord;
	  var totalRecords = $$props.totalRecords;

	  $$self.$set = function ($$props) {
	    if ("startRecord" in $$props) $$invalidate(0, startRecord = $$props.startRecord);
	    if ("endRecord" in $$props) $$invalidate(1, endRecord = $$props.endRecord);
	    if ("totalRecords" in $$props) $$invalidate(2, totalRecords = $$props.totalRecords);
	  };

	  return [startRecord, endRecord, totalRecords];
	}

	var Record_details =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Record_details, _SvelteComponent);

	  function Record_details(options) {
	    var _this;

	    _classCallCheck(this, Record_details);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Record_details).call(this));
	    init(_assertThisInitialized(_this), options, instance$k, create_fragment$l, safe_not_equal, {
	      startRecord: 0,
	      endRecord: 1,
	      totalRecords: 2
	    });
	    return _this;
	  }

	  return Record_details;
	}(SvelteComponent);

	function create_if_block_1$6(ctx) {
	  var div;
	  var current;
	  var options = new Options({
	    props: {
	      options:
	      /*config*/
	      ctx[0].pageSize.options,
	      pageSize:
	      /*config*/
	      ctx[0].pageSize.applied,
	      width:
	      /*optionsContainerWidth*/
	      ctx[8]
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(options.$$.fragment);
	      attr(div, "class", "fg-pagination-options-container");
	      set_style(div, "width",
	      /*optionsContainerWidth*/
	      ctx[8] + "px");
	      set_style(div, "height",
	      /*rowHeight*/
	      ctx[6] + "px");
	      set_style(div, "text-align",
	      /*optionsContainerWidth*/
	      ctx[8] ===
	      /*containerWidth*/
	      ctx[3] * 0.5 ? "right" : "center");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(options, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var options_changes = {};
	      if (dirty &
	      /*config*/
	      1) options_changes.options =
	      /*config*/
	      ctx[0].pageSize.options;
	      if (dirty &
	      /*config*/
	      1) options_changes.pageSize =
	      /*config*/
	      ctx[0].pageSize.applied;
	      if (dirty &
	      /*optionsContainerWidth*/
	      256) options_changes.width =
	      /*optionsContainerWidth*/
	      ctx[8];
	      options.$set(options_changes);

	      if (!current || dirty &
	      /*optionsContainerWidth*/
	      256) {
	        set_style(div, "width",
	        /*optionsContainerWidth*/
	        ctx[8] + "px");
	      }

	      if (!current || dirty &
	      /*rowHeight*/
	      64) {
	        set_style(div, "height",
	        /*rowHeight*/
	        ctx[6] + "px");
	      }

	      if (!current || dirty &
	      /*optionsContainerWidth, containerWidth*/
	      264) {
	        set_style(div, "text-align",
	        /*optionsContainerWidth*/
	        ctx[8] ===
	        /*containerWidth*/
	        ctx[3] * 0.5 ? "right" : "center");
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(options.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(options.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(options);
	    }
	  };
	} // (71:4) {#if showRecordCountEnabled}


	function create_if_block$8(ctx) {
	  var div;
	  var current;
	  var recorddetails = new Record_details({
	    props: {
	      startRecord:
	      /*startRecord*/
	      ctx[1],
	      width:
	      /*showRecordCountContainerWidth*/
	      ctx[9],
	      endRecord:
	      /*endRecord*/
	      ctx[2],
	      totalRecords:
	      /*config*/
	      ctx[0].totalRecords
	    }
	  });
	  return {
	    c: function c() {
	      div = element("div");
	      create_component(recorddetails.$$.fragment);
	      attr(div, "class", "fg-pagination-record-display-container");
	      set_style(div, "width",
	      /*showRecordCountContainerWidth*/
	      ctx[9] + "px");
	      set_style(div, "height",
	      /*rowHeight*/
	      ctx[6] + "px");
	      set_style(div, "text-align",
	      /*showRecordCountContainerWidth*/
	      ctx[9] ===
	      /*containerWidth*/
	      ctx[3] * 0.33 || !
	      /*optionsEnabled*/
	      ctx[5] ? "right" : "left");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      mount_component(recorddetails, div, null);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var recorddetails_changes = {};
	      if (dirty &
	      /*startRecord*/
	      2) recorddetails_changes.startRecord =
	      /*startRecord*/
	      ctx[1];
	      if (dirty &
	      /*showRecordCountContainerWidth*/
	      512) recorddetails_changes.width =
	      /*showRecordCountContainerWidth*/
	      ctx[9];
	      if (dirty &
	      /*endRecord*/
	      4) recorddetails_changes.endRecord =
	      /*endRecord*/
	      ctx[2];
	      if (dirty &
	      /*config*/
	      1) recorddetails_changes.totalRecords =
	      /*config*/
	      ctx[0].totalRecords;
	      recorddetails.$set(recorddetails_changes);

	      if (!current || dirty &
	      /*showRecordCountContainerWidth*/
	      512) {
	        set_style(div, "width",
	        /*showRecordCountContainerWidth*/
	        ctx[9] + "px");
	      }

	      if (!current || dirty &
	      /*rowHeight*/
	      64) {
	        set_style(div, "height",
	        /*rowHeight*/
	        ctx[6] + "px");
	      }

	      if (!current || dirty &
	      /*showRecordCountContainerWidth, containerWidth, optionsEnabled*/
	      552) {
	        set_style(div, "text-align",
	        /*showRecordCountContainerWidth*/
	        ctx[9] ===
	        /*containerWidth*/
	        ctx[3] * 0.33 || !
	        /*optionsEnabled*/
	        ctx[5] ? "right" : "left");
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(recorddetails.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(recorddetails.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      destroy_component(recorddetails);
	    }
	  };
	}

	function create_fragment$m(ctx) {
	  var div1;
	  var div0;
	  var t0;
	  var t1;
	  var current;
	  var buttons = new Buttons({
	    props: {
	      config:
	      /*config*/
	      ctx[0],
	      width:
	      /*buttonsContainerWidth*/
	      ctx[7]
	    }
	  });
	  var if_block0 =
	  /*optionsEnabled*/
	  ctx[5] && create_if_block_1$6(ctx);
	  var if_block1 =
	  /*showRecordCountEnabled*/
	  ctx[4] && create_if_block$8(ctx);
	  return {
	    c: function c() {
	      div1 = element("div");
	      div0 = element("div");
	      create_component(buttons.$$.fragment);
	      t0 = space();
	      if (if_block0) if_block0.c();
	      t1 = space();
	      if (if_block1) if_block1.c();
	      attr(div0, "class", "fg-pagination-buttons-container");
	      set_style(div0, "width",
	      /*buttonsContainerWidth*/
	      ctx[7] + "px");
	      set_style(div0, "height",
	      /*rowHeight*/
	      ctx[6] + "px");
	      attr(div1, "class", "fg-pagination-container fg-pagination");
	      set_style(div1, "width", "100%");
	      set_style(div1, "height",
	      /*height*/
	      ctx[10] + "px");
	    },
	    m: function m(target, anchor) {
	      insert(target, div1, anchor);
	      append(div1, div0);
	      mount_component(buttons, div0, null);
	      append(div1, t0);
	      if (if_block0) if_block0.m(div1, null);
	      append(div1, t1);
	      if (if_block1) if_block1.m(div1, null);
	      current = true;
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var buttons_changes = {};
	      if (dirty &
	      /*config*/
	      1) buttons_changes.config =
	      /*config*/
	      ctx[0];
	      if (dirty &
	      /*buttonsContainerWidth*/
	      128) buttons_changes.width =
	      /*buttonsContainerWidth*/
	      ctx[7];
	      buttons.$set(buttons_changes);

	      if (!current || dirty &
	      /*buttonsContainerWidth*/
	      128) {
	        set_style(div0, "width",
	        /*buttonsContainerWidth*/
	        ctx[7] + "px");
	      }

	      if (!current || dirty &
	      /*rowHeight*/
	      64) {
	        set_style(div0, "height",
	        /*rowHeight*/
	        ctx[6] + "px");
	      }

	      if (
	      /*optionsEnabled*/
	      ctx[5]) {
	        if (if_block0) {
	          if_block0.p(ctx, dirty);
	          transition_in(if_block0, 1);
	        } else {
	          if_block0 = create_if_block_1$6(ctx);
	          if_block0.c();
	          transition_in(if_block0, 1);
	          if_block0.m(div1, t1);
	        }
	      } else if (if_block0) {
	        group_outros();
	        transition_out(if_block0, 1, 1, function () {
	          if_block0 = null;
	        });
	        check_outros();
	      }

	      if (
	      /*showRecordCountEnabled*/
	      ctx[4]) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);
	          transition_in(if_block1, 1);
	        } else {
	          if_block1 = create_if_block$8(ctx);
	          if_block1.c();
	          transition_in(if_block1, 1);
	          if_block1.m(div1, null);
	        }
	      } else if (if_block1) {
	        group_outros();
	        transition_out(if_block1, 1, 1, function () {
	          if_block1 = null;
	        });
	        check_outros();
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(buttons.$$.fragment, local);
	      transition_in(if_block0);
	      transition_in(if_block1);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(buttons.$$.fragment, local);
	      transition_out(if_block0);
	      transition_out(if_block1);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div1);
	      destroy_component(buttons);
	      if (if_block0) if_block0.d();
	      if (if_block1) if_block1.d();
	    }
	  };
	}

	var HUNDRED_PERCENT = "100%",
	    FIFTY_PERCENT = "50%",
	    THIRTY_THREE_PERCENT = "33.33%";

	function instance$l($$self, $$props, $$invalidate) {
	  var config = $$props.config;
	  var startRecord = $$props.startRecord;
	  var endRecord = $$props.endRecord;
	  var handlers = $$props.handlers;
	  var containerWidth = $$props.containerWidth;

	  var height = config.paginationHeight,
	      showRecordCountEnabled,
	      optionsEnabled,
	      numRows = config.numRows,
	      rowHeight = height / numRows,
	      buttonsContainerWidth,
	      optionsContainerWidth,
	      showRecordCountContainerWidth,
	      calculateWidth = function calculateWidth(percentVal) {
	    switch (percentVal) {
	      case HUNDRED_PERCENT:
	        return containerWidth;

	      case FIFTY_PERCENT:
	        return containerWidth * 0.5;

	      case THIRTY_THREE_PERCENT:
	        return containerWidth * 0.33;
	    }
	  };

	  setContext("handlers", handlers);

	  $$self.$set = function ($$props) {
	    if ("config" in $$props) $$invalidate(0, config = $$props.config);
	    if ("startRecord" in $$props) $$invalidate(1, startRecord = $$props.startRecord);
	    if ("endRecord" in $$props) $$invalidate(2, endRecord = $$props.endRecord);
	    if ("handlers" in $$props) $$invalidate(11, handlers = $$props.handlers);
	    if ("containerWidth" in $$props) $$invalidate(3, containerWidth = $$props.containerWidth);
	  };

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*config, showRecordCountEnabled, optionsEnabled*/
	    49) {
	       {
	        $$invalidate(4, showRecordCountEnabled = config.showRecordCount);
	        $$invalidate(5, optionsEnabled = config.pageSize.options && config.pageSize.options.length);
	        $$invalidate(6, rowHeight = height / numRows);

	        if (numRows === 2) {
	          $$invalidate(7, buttonsContainerWidth = $$invalidate(8, optionsContainerWidth = calculateWidth(FIFTY_PERCENT)));
	          $$invalidate(9, showRecordCountContainerWidth = calculateWidth(HUNDRED_PERCENT));
	        } else {
	          if (!showRecordCountEnabled && !optionsEnabled) {
	            $$invalidate(7, buttonsContainerWidth = calculateWidth(HUNDRED_PERCENT));
	          } else if (!showRecordCountEnabled) {
	            $$invalidate(7, buttonsContainerWidth = $$invalidate(8, optionsContainerWidth = calculateWidth(FIFTY_PERCENT)));
	          } else if (!optionsEnabled) {
	            $$invalidate(7, buttonsContainerWidth = $$invalidate(9, showRecordCountContainerWidth = calculateWidth(FIFTY_PERCENT)));
	          } else {
	            $$invalidate(7, buttonsContainerWidth = $$invalidate(8, optionsContainerWidth = $$invalidate(9, showRecordCountContainerWidth = calculateWidth(THIRTY_THREE_PERCENT))));
	          }
	        }
	      }
	    }
	  };

	  return [config, startRecord, endRecord, containerWidth, showRecordCountEnabled, optionsEnabled, rowHeight, buttonsContainerWidth, optionsContainerWidth, showRecordCountContainerWidth, height, handlers];
	}

	var Pagination$1 =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Pagination, _SvelteComponent);

	  function Pagination(options) {
	    var _this;

	    _classCallCheck(this, Pagination);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pagination).call(this));
	    init(_assertThisInitialized(_this), options, instance$l, create_fragment$m, safe_not_equal, {
	      config: 0,
	      startRecord: 1,
	      endRecord: 2,
	      handlers: 11,
	      containerWidth: 3
	    });
	    return _this;
	  }

	  return Pagination;
	}(SvelteComponent);

	var tooltip = createCommonjsModule(function (module) {
	  module.exports =
	  /******/
	  function (modules) {
	    // webpackBootstrap

	    /******/
	    // The module cache

	    /******/
	    var installedModules = {};
	    /******/

	    /******/
	    // The require function

	    /******/

	    function __webpack_require__(moduleId) {
	      /******/

	      /******/
	      // Check if module is in cache

	      /******/
	      if (installedModules[moduleId]) {
	        /******/
	        return installedModules[moduleId].exports;
	        /******/
	      }
	      /******/
	      // Create a new module (and put it into the cache)

	      /******/


	      var module = installedModules[moduleId] = {
	        /******/
	        i: moduleId,

	        /******/
	        l: false,

	        /******/
	        exports: {}
	        /******/

	      };
	      /******/

	      /******/
	      // Execute the module function

	      /******/

	      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	      /******/

	      /******/
	      // Flag the module as loaded

	      /******/

	      module.l = true;
	      /******/

	      /******/
	      // Return the exports of the module

	      /******/

	      return module.exports;
	      /******/
	    }
	    /******/

	    /******/

	    /******/
	    // expose the modules object (__webpack_modules__)

	    /******/


	    __webpack_require__.m = modules;
	    /******/

	    /******/
	    // expose the module cache

	    /******/

	    __webpack_require__.c = installedModules;
	    /******/

	    /******/
	    // define getter function for harmony exports

	    /******/

	    __webpack_require__.d = function (exports, name, getter) {
	      /******/
	      if (!__webpack_require__.o(exports, name)) {
	        /******/
	        Object.defineProperty(exports, name, {
	          enumerable: true,
	          get: getter
	        });
	        /******/
	      }
	      /******/

	    };
	    /******/

	    /******/
	    // define __esModule on exports

	    /******/


	    __webpack_require__.r = function (exports) {
	      /******/
	      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	        /******/
	        Object.defineProperty(exports, Symbol.toStringTag, {
	          value: 'Module'
	        });
	        /******/
	      }
	      /******/


	      Object.defineProperty(exports, '__esModule', {
	        value: true
	      });
	      /******/
	    };
	    /******/

	    /******/
	    // create a fake namespace object

	    /******/
	    // mode & 1: value is a module id, require it

	    /******/
	    // mode & 2: merge all properties of value into the ns

	    /******/
	    // mode & 4: return value when already ns object

	    /******/
	    // mode & 8|1: behave like require

	    /******/


	    __webpack_require__.t = function (value, mode) {
	      /******/
	      if (mode & 1) value = __webpack_require__(value);
	      /******/

	      if (mode & 8) return value;
	      /******/

	      if (mode & 4 && _typeof(value) === 'object' && value && value.__esModule) return value;
	      /******/

	      var ns = Object.create(null);
	      /******/

	      __webpack_require__.r(ns);
	      /******/


	      Object.defineProperty(ns, 'default', {
	        enumerable: true,
	        value: value
	      });
	      /******/

	      if (mode & 2 && typeof value != 'string') for (var key in value) {
	        __webpack_require__.d(ns, key, function (key) {
	          return value[key];
	        }.bind(null, key));
	      }
	      /******/

	      return ns;
	      /******/
	    };
	    /******/

	    /******/
	    // getDefaultExport function for compatibility with non-harmony modules

	    /******/


	    __webpack_require__.n = function (module) {
	      /******/
	      var getter = module && module.__esModule ?
	      /******/
	      function getDefault() {
	        return module['default'];
	      } :
	      /******/
	      function getModuleExports() {
	        return module;
	      };
	      /******/

	      __webpack_require__.d(getter, 'a', getter);
	      /******/


	      return getter;
	      /******/
	    };
	    /******/

	    /******/
	    // Object.prototype.hasOwnProperty.call

	    /******/


	    __webpack_require__.o = function (object, property) {
	      return Object.prototype.hasOwnProperty.call(object, property);
	    };
	    /******/

	    /******/
	    // __webpack_public_path__

	    /******/


	    __webpack_require__.p = "";
	    /******/

	    /******/

	    /******/
	    // Load entry module and return exports

	    /******/

	    return __webpack_require__(__webpack_require__.s = "./src/index.js");
	    /******/
	  }(
	  /************************************************************************/

	  /******/
	  {
	    /***/
	    "./src/Beak.js":
	    /*!*********************!*\
	      !*** ./src/Beak.js ***!
	      \*********************/

	    /*! exports provided: default */

	    /***/
	    function srcBeakJs(module, __webpack_exports__, __webpack_require__) {

	      __webpack_require__.r(__webpack_exports__);

	      var BOTTOM_STR = 'bottom',
	          ABOSULTE_STR = 'absolute',
	          VISIBLE_STR = 'visible',
	          HIDDEN_STR = 'hidden';

	      function styleDeriver(direction) {
	        switch (direction) {
	          case 'bottom':
	            return ['border-left', 'border-right', 'border-top'];

	          case 'top':
	            return ['border-left', 'border-right', 'border-bottom'];

	          case 'left':
	            return ['border-top', 'border-bottom', 'border-right'];

	          case 'right':
	            return ['border-top', 'border-bottom', 'border-left'];
	        }
	      }

	      function getPosition(x, y, width, height, length, direction) {
	        x = +x.replace(/[^-.0-9]/g, '');
	        y = +y.replace(/[^-.0-9]/g, '');
	        length = +length.replace(/[^-.0-9]/g, '');

	        switch (direction) {
	          case 'bottom':
	            return {
	              left: x + width / 2 - length,
	              top: y + height
	            };

	          case 'top':
	            return {
	              left: x + width / 2 - length,
	              top: y - length
	            };

	          case 'left':
	            return {
	              left: x - length,
	              top: y + height / 2 - length
	            };

	          case 'right':
	            return {
	              left: x + width,
	              top: y + height / 2 - length
	            };
	        }
	      }

	      var Beak =
	      /*#__PURE__*/
	      function () {
	        function Beak(obj) {
	          _classCallCheck(this, Beak);

	          this.config = {};
	          this._container = obj.container;
	          this._parent = obj.parent;
	          this._element = document.createElement('div');

	          this._container.appendChild(this._element);

	          this.setDefaultConfig();
	          this.configure(obj);
	        }

	        _createClass(Beak, [{
	          key: "setDefaultConfig",
	          value: function setDefaultConfig() {
	            var config = this.config;
	            config.direction = BOTTOM_STR;
	            config.beakLength = '5px';
	            config.beakColor = '#000000';
	          }
	        }, {
	          key: "configure",
	          value: function configure(config) {
	            var beak = this,
	                beakConfig = beak.config;

	            for (var key in config.beakProps) {
	              beakConfig[key] = config.beakProps[key];
	            }

	            beak.applyInlineStyles();
	          }
	        }, {
	          key: "applyInlineStyles",
	          value: function applyInlineStyles() {
	            var beak = this,
	                config = beak.config,
	                beakElement = beak._element,
	                applicableStyles = styleDeriver(config.direction),
	                i,
	                len;
	            beakElement.style.width = '0px';
	            beakElement.style.height = '0px';

	            for (i = 0, len = applicableStyles.length; i < len; i++) {
	              if (i !== len - 1) {
	                beakElement.style[applicableStyles[i]] = config.beakLength + ' solid transparent';
	              } else {
	                beakElement.style[applicableStyles[i]] = config.beakLength + ' solid ' + config.beakColor;
	              }
	            }

	            beakElement.style.visibility = HIDDEN_STR;
	            beakElement.style.position = ABOSULTE_STR;
	          }
	        }, {
	          key: "show",
	          value: function show(xPos, yPos) {
	            var beak = this,
	                config = beak.config,
	                parent = beak._parent,
	                parentWidth = parent.offsetWidth,
	                parentHeight = parent.offsetHeight,
	                beakLength = config.beakLength,
	                _getPosition = getPosition(xPos, yPos, parentWidth, parentHeight, beakLength, config.direction),
	                left = _getPosition.left,
	                top = _getPosition.top,
	                beakElem = beak._element;

	            beakElem.style.left = left + 'px';
	            beakElem.style.top = top + 'px';
	            beakElem.style.visibility = VISIBLE_STR;
	          }
	        }, {
	          key: "hide",
	          value: function hide() {
	            var beak = this,
	                beakElem = beak._element;
	            beakElem.style.visibility = HIDDEN_STR;
	          }
	        }]);

	        return Beak;
	      }();
	      /* harmony default export */


	      __webpack_exports__["default"] = Beak;
	      /***/
	    },

	    /***/
	    "./src/CloseAction.js":
	    /*!****************************!*\
	      !*** ./src/CloseAction.js ***!
	      \****************************/

	    /*! no static exports found */

	    /***/
	    function srcCloseActionJs(module, exports) {
	      /***/
	    },

	    /***/
	    "./src/TooltipComponent.js":
	    /*!*********************************!*\
	      !*** ./src/TooltipComponent.js ***!
	      \*********************************/

	    /*! exports provided: default */

	    /***/
	    function srcTooltipComponentJs(module, __webpack_exports__, __webpack_require__) {

	      __webpack_require__.r(__webpack_exports__);
	      /* harmony import */


	      var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
	      /*! ./utils */
	      "./src/utils.js");
	      /* harmony import */


	      var _Beak__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
	      /*! ./Beak */
	      "./src/Beak.js");
	      /* harmony import */


	      var _CloseAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
	      /*! ./CloseAction */
	      "./src/CloseAction.js");

	      var OBJECT_STR = 'object',
	          BOTTOM_STR = 'bottom',
	          ABOSULTE_STR = 'absolute',
	          VISIBLE_STR = 'visible',
	          HIDDEN_STR = 'hidden',
	          DEFAULT_HORIZONTAL_PADDING = 11,
	          DEFAULT_VERTICAL_PADDING = 11;

	      var TooltipComponent =
	      /*#__PURE__*/
	      function () {
	        function TooltipComponent(obj) {
	          _classCallCheck(this, TooltipComponent);

	          this.config = {};
	          this._parent = obj.container;
	          this._childrens = {};
	          this._element = document.createElement('div');

	          this._parent.appendChild(this._element);

	          this._tooltipDim = {};
	          this._prevContent = '';
	          this.setDefaultConfig();
	          this.configure(obj);
	        }

	        _createClass(TooltipComponent, [{
	          key: "attachChild",
	          value: function attachChild(childName, childClass, config) {
	            this._childrens[childName] = new childClass(config);
	            return this._childrens[childName];
	          }
	        }, {
	          key: "removeChild",
	          value: function removeChild(childName) {
	            var child = this._childrens[childName];
	            child.dispose();
	            delete this._childrens[childName];
	          }
	        }, {
	          key: "setBounds",
	          value: function setBounds(bounds) {
	            this.config.bounds = bounds;
	          }
	        }, {
	          key: "getBounds",
	          value: function getBounds() {
	            return this.config.bounds;
	          }
	        }, {
	          key: "setDefaultConfig",
	          value: function setDefaultConfig() {
	            var config = this.config;
	            config.hasBeak = false;
	            config.isSticky = false;
	            config.defaultDirection = BOTTOM_STR;
	            config.stickProps = {};
	            config.beakProps = {};
	            config.bounds = {};
	            config.styles = {
	              position: ABOSULTE_STR,
	              visibility: HIDDEN_STR
	            };
	          }
	        }, {
	          key: "configure",
	          value: function configure(config) {
	            var tooltip = this,
	                tooltipConfig = tooltip.config,
	                extStyles = config.styles || {},
	                containerClasses = config.containerClasses,
	                closeButtonClasses = config.closeButtonClasses,
	                hasBeak = config.beak,
	                isSticky = config.sticky,
	                defaultDirection = config.defaultDirection;

	            for (var key in extStyles) {
	              tooltipConfig.styles[key] = extStyles[key];
	            }

	            Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(containerClasses) && (tooltipConfig.containerClassName = containerClasses.join(' '));
	            Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(closeButtonClasses) && (tooltipConfig.closeButtonClassName = closeButtonClasses.join(' '));
	            Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(hasBeak) && (tooltipConfig.hasBeak = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isTruthy"])(hasBeak));

	            if (_typeof(hasBeak) === OBJECT_STR) {
	              for (var _key in hasBeak) {
	                Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(hasBeak[_key]) && (tooltipConfig.beakProps[_key] = hasBeak[_key]);
	              }
	            }

	            Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(isSticky) && (tooltipConfig.isSticky = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isTruthy"])(isSticky));

	            if (_typeof(isSticky) === OBJECT_STR) {
	              for (var _key2 in isSticky) {
	                Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(isSticky[_key2]) && (tooltipConfig.stickyProps[_key2] = isSticky[_key2]);
	              }
	            }

	            Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(defaultDirection) && (tooltipConfig.defaultDirection = defaultDirection);
	            tooltip.createChildComponents();
	            tooltip.applyInlineStyles();
	          }
	        }, {
	          key: "applyInlineStyles",
	          value: function applyInlineStyles() {
	            var tooltip = this,
	                tooltipElem = tooltip._element,
	                config = tooltip.config,
	                styles = config.styles,
	                className = config.containerClassName;

	            for (var style in styles) {
	              tooltipElem.style[style] = styles[style];
	            }

	            tooltipElem.setAttribute('class', className);
	          }
	        }, {
	          key: "createChildComponents",
	          value: function createChildComponents() {
	            var tooltip = this,
	                tooltipConfig = tooltip.config,
	                beak;

	            if (tooltipConfig.hasBeak) {
	              beak = tooltip.attachChild('beak', _Beak__WEBPACK_IMPORTED_MODULE_1__["default"], {
	                container: tooltip._parent,
	                parent: tooltip._element,
	                direction: tooltipConfig.defaultDirection,
	                className: tooltipConfig.containerClassName,
	                beakProps: tooltipConfig.beakProps
	              });
	            }
	          }
	        }, {
	          key: "show",
	          value: function show(content, x, y) {
	            var tooltip = this,
	                tooltipElem = tooltip._element,
	                tooltipDim = tooltip._tooltipDim;

	            if (tooltip._prevContent !== content) {
	              tooltip._prevContent = content;
	              tooltipElem.style.whiteSpace = 'nowrap';
	              tooltipElem.style.width = '';
	              tooltipElem.style.height = '';
	              tooltipElem.innerHTML = content;
	              tooltipDim.width = tooltipElem.offsetWidth;
	              tooltipDim.height = tooltipElem.offsetHeight;
	            }

	            if (tooltipElem.style.visibility === HIDDEN_STR) {
	              tooltipElem.style.visibility = VISIBLE_STR;
	            }

	            tooltip.update(x, y);
	          }
	        }, {
	          key: "update",
	          value: function update(x, y) {
	            var tooltip = this,
	                parent = tooltip._parent,
	                bounds = tooltip.config.bounds,
	                tooltipElem = tooltip._element,
	                containerWidth = bounds.width,
	                containerHeight = bounds.height,
	                containerLeft = bounds.left,
	                containerTop = bounds.top,
	                _tooltip$_tooltipDim = tooltip._tooltipDim,
	                tooltipWidth = _tooltip$_tooltipDim.width,
	                tooltipHeight = _tooltip$_tooltipDim.height,
	                xPos = x - containerLeft + DEFAULT_HORIZONTAL_PADDING,
	                yPos = y - containerTop + DEFAULT_VERTICAL_PADDING; // horizontal domain validation
	            // if tooltip overflows the right side of the container push it to left

	            if (xPos + tooltipWidth > containerWidth) {
	              // if tooltip still overflows the left side of the container then provide it a width
	              // which is equal to the container and break texts into multiple lines
	              if (xPos - tooltipWidth < containerLeft) {
	                xPos = 0;

	                if (tooltipElem.style.width !== containerWidth + 'px') {
	                  tooltipElem.style.width = containerWidth + 'px';
	                }

	                if (tooltipElem.style.whiteSpace !== 'normal') {
	                  tooltipElem.style.whiteSpace = 'normal';
	                }
	                tooltipHeight = tooltipElem.offsetHeight;
	              } else {
	                xPos = xPos - tooltipWidth - DEFAULT_HORIZONTAL_PADDING;

	                if (tooltipElem.style.width !== tooltipWidth + 'px') {
	                  tooltipElem.style.width = tooltipWidth + 'px';
	                }

	                if (tooltipElem.style.whiteSpace !== 'nowrap') {
	                  tooltipElem.style.whiteSpace = 'nowrap';
	                }
	              }
	            } // vertical domain validation
	            // if tooltip overflows the bottom of the container then push the tooltip to top.
	            // No validation will be done if the tooltip still overflows the top of the container


	            if (yPos + tooltipHeight > containerHeight) {
	              yPos = yPos - tooltipHeight - DEFAULT_VERTICAL_PADDING;
	            }

	            xPos += 'px';
	            yPos += 'px';
	            parent.style.left = xPos;
	            parent.style.top = yPos;
	            tooltip.showChildrens(xPos, yPos);
	          }
	        }, {
	          key: "hide",
	          value: function hide() {
	            var tooltip = this,
	                tooltipElem = tooltip._element;
	            tooltipElem.style.visibility = HIDDEN_STR;
	            tooltip.hideChildrens();
	          }
	        }, {
	          key: "showChildrens",
	          value: function showChildrens(xPos, yPos) {
	            var tooltip = this,
	                childrens = tooltip._childrens;

	            for (var child in childrens) {
	              childrens[child].show(xPos, yPos);
	            }
	          }
	        }, {
	          key: "hideChildrens",
	          value: function hideChildrens() {
	            var tooltip = this,
	                childrens = tooltip._childrens;

	            for (var child in childrens) {
	              childrens[child].hide();
	            }
	          }
	        }]);

	        return TooltipComponent;
	      }();
	      /* harmony default export */


	      __webpack_exports__["default"] = TooltipComponent;
	      /***/
	    },

	    /***/
	    "./src/TooltipMaster.js":
	    /*!******************************!*\
	      !*** ./src/TooltipMaster.js ***!
	      \******************************/

	    /*! exports provided: default */

	    /***/
	    function srcTooltipMasterJs(module, __webpack_exports__, __webpack_require__) {

	      __webpack_require__.r(__webpack_exports__);
	      /* harmony import */


	      var _TooltipComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
	      /*! ./TooltipComponent */
	      "./src/TooltipComponent.js");

	      var CLASSIC = 'classic',
	          STICKY = 'sticky';

	      var TooltipMaster =
	      /*#__PURE__*/
	      function () {
	        function TooltipMaster() {
	          _classCallCheck(this, TooltipMaster);

	          this._tooltipStore = {
	            classic: undefined,
	            sticky: undefined
	          };
	        }

	        _createClass(TooltipMaster, [{
	          key: "getAvailableTooltip",
	          value: function getAvailableTooltip(type) {
	            return this._tooltipStore[type];
	          }
	        }, {
	          key: "addNewTooltip",
	          value: function addNewTooltip(type, tooltip) {
	            this._tooltipStore[type] = tooltip;
	          }
	        }, {
	          key: "createTooltip",
	          value: function createTooltip(config) {
	            var master = this,
	                type = config.type,
	                tooltip;

	            if (type === STICKY) {
	              if (tooltip = master.getAvailableTooltip(STICKY)) {
	                return tooltip.update(config);
	              } else {
	                tooltip = new _TooltipComponent__WEBPACK_IMPORTED_MODULE_0__["default"](config);
	                master.addNewTooltip(STICKY, tooltip);
	                return tooltip;
	              }
	            } else {
	              if (tooltip = master.getAvailableTooltip(CLASSIC)) {
	                return tooltip.update(config);
	              } else {
	                tooltip = new _TooltipComponent__WEBPACK_IMPORTED_MODULE_0__["default"](config);
	                master.addNewTooltip(CLASSIC, tooltip);
	                return tooltip;
	              }
	            }
	          }
	        }, {
	          key: "hideAll",
	          value: function hideAll() {
	            for (var type in this._tooltipStore) {
	              this._tooltipStore[type].hide();
	            }
	          } // @todo write tooltip removing logic

	        }]);

	        return TooltipMaster;
	      }();
	      /* harmony default export */


	      __webpack_exports__["default"] = TooltipMaster;
	      /***/
	    },

	    /***/
	    "./src/index.js":
	    /*!**********************!*\
	      !*** ./src/index.js ***!
	      \**********************/

	    /*! no static exports found */

	    /***/
	    function srcIndexJs(module, exports, __webpack_require__) {
	      var TooltipMaster = __webpack_require__(
	      /*! ./TooltipMaster */
	      "./src/TooltipMaster.js").default;

	      module.exports = TooltipMaster;
	      /***/
	    },

	    /***/
	    "./src/utils.js":
	    /*!**********************!*\
	      !*** ./src/utils.js ***!
	      \**********************/

	    /*! exports provided: isDefined, isTruthy */

	    /***/
	    function srcUtilsJs(module, __webpack_exports__, __webpack_require__) {

	      __webpack_require__.r(__webpack_exports__);
	      /* harmony export (binding) */


	      __webpack_require__.d(__webpack_exports__, "isDefined", function () {
	        return isDefined;
	      });
	      /* harmony export (binding) */


	      __webpack_require__.d(__webpack_exports__, "isTruthy", function () {
	        return isTruthy;
	      });

	      var isDefined = function isDefined(value) {
	        return value !== undefined && (!Array.isArray(value) || Array.isArray(value) && value.length) && value !== null;
	      };

	      var isTruthy = function isTruthy(value) {
	        if (value) {
	          return true;
	        }

	        return false;
	      };
	      /***/

	    }
	    /******/

	  });
	});
	var TooltipMaster = unwrapExports(tooltip);

	function create_fragment$n(ctx) {
	  var div;
	  return {
	    c: function c() {
	      div = element("div");
	      attr(div, "class", "fg-tooltip-container");
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      /*div_binding*/

	      ctx[3](div);
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      /*div_binding*/

	      ctx[3](null);
	    }
	  };
	}

	function instance$m($$self, $$props, $$invalidate) {
	  var tooltipRef = $$props.tooltipRef,
	      gridDimensions = $$props.gridDimensions;
	  var container;
	  onMount(function () {
	    var tooltipMaster = new TooltipMaster();
	    $$invalidate(1, tooltipRef.tooltip = tooltipMaster.createTooltip({
	      container: container,
	      containerClasses: ["fg-tooltip-instance"]
	    }), tooltipRef);
	    tooltipRef.tooltip.setBounds(gridDimensions);
	  });

	  function div_binding($$value) {
	    binding_callbacks[$$value ? "unshift" : "push"](function () {
	      $$invalidate(0, container = $$value);
	    });
	  }

	  $$self.$set = function ($$props) {
	    if ("tooltipRef" in $$props) $$invalidate(1, tooltipRef = $$props.tooltipRef);
	    if ("gridDimensions" in $$props) $$invalidate(2, gridDimensions = $$props.gridDimensions);
	  };

	  return [container, tooltipRef, gridDimensions, div_binding];
	}

	var Tooltip =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Tooltip, _SvelteComponent);

	  function Tooltip(options) {
	    var _this;

	    _classCallCheck(this, Tooltip);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).call(this));
	    init(_assertThisInitialized(_this), options, instance$m, create_fragment$n, safe_not_equal, {
	      tooltipRef: 1,
	      gridDimensions: 2
	    });
	    return _this;
	  }

	  return Tooltip;
	}(SvelteComponent);

	function create_else_block$5(ctx) {
	  var current;
	  var card = new Card({
	    props: {
	      gridData:
	      /*gridData*/
	      ctx[6],
	      vizRecDomain:
	      /*vizRecDomain*/
	      ctx[7],
	      cardLayout:
	      /*layoutStateObj*/
	      ctx[3],
	      infiniteScrollManager:
	      /*infiniteScrollManager*/
	      ctx[0],
	      gridDimensions:
	      /*gridDim*/
	      ctx[5],
	      paginationEnabled:
	      /*pagination*/
	      ctx[8].enable
	    }
	  });
	  return {
	    c: function c() {
	      create_component(card.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(card, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var card_changes = {};
	      if (dirty &
	      /*gridData*/
	      64) card_changes.gridData =
	      /*gridData*/
	      ctx[6];
	      if (dirty &
	      /*vizRecDomain*/
	      128) card_changes.vizRecDomain =
	      /*vizRecDomain*/
	      ctx[7];
	      if (dirty &
	      /*layoutStateObj*/
	      8) card_changes.cardLayout =
	      /*layoutStateObj*/
	      ctx[3];
	      if (dirty &
	      /*infiniteScrollManager*/
	      1) card_changes.infiniteScrollManager =
	      /*infiniteScrollManager*/
	      ctx[0];
	      if (dirty &
	      /*gridDim*/
	      32) card_changes.gridDimensions =
	      /*gridDim*/
	      ctx[5];
	      if (dirty &
	      /*pagination*/
	      256) card_changes.paginationEnabled =
	      /*pagination*/
	      ctx[8].enable;
	      card.$set(card_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(card.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(card.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(card, detaching);
	    }
	  };
	} // (74:2) {#if isRow}


	function create_if_block_1$7(ctx) {
	  var current;
	  var grid = new Grid({
	    props: {
	      gridData:
	      /*gridData*/
	      ctx[6],
	      vizRecDomain:
	      /*vizRecDomain*/
	      ctx[7],
	      rowLayout:
	      /*layoutStateObj*/
	      ctx[3],
	      infiniteScrollManager:
	      /*infiniteScrollManager*/
	      ctx[0],
	      gridDimensions:
	      /*gridDim*/
	      ctx[5],
	      autoHeight:
	      /*autoHeightState*/
	      ctx[4]
	    }
	  });
	  return {
	    c: function c() {
	      create_component(grid.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(grid, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var grid_changes = {};
	      if (dirty &
	      /*gridData*/
	      64) grid_changes.gridData =
	      /*gridData*/
	      ctx[6];
	      if (dirty &
	      /*vizRecDomain*/
	      128) grid_changes.vizRecDomain =
	      /*vizRecDomain*/
	      ctx[7];
	      if (dirty &
	      /*layoutStateObj*/
	      8) grid_changes.rowLayout =
	      /*layoutStateObj*/
	      ctx[3];
	      if (dirty &
	      /*infiniteScrollManager*/
	      1) grid_changes.infiniteScrollManager =
	      /*infiniteScrollManager*/
	      ctx[0];
	      if (dirty &
	      /*gridDim*/
	      32) grid_changes.gridDimensions =
	      /*gridDim*/
	      ctx[5];
	      if (dirty &
	      /*autoHeightState*/
	      16) grid_changes.autoHeight =
	      /*autoHeightState*/
	      ctx[4];
	      grid.$set(grid_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(grid.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(grid.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(grid, detaching);
	    }
	  };
	} // (92:2) {#if pagination.enable}


	function create_if_block$9(ctx) {
	  var current;
	  var pagination_1 = new Pagination$1({
	    props: {
	      config:
	      /*pagination*/
	      ctx[8],
	      startRecord:
	      /*vizRecDomain*/
	      ctx[7].start + 1,
	      endRecord:
	      /*vizRecDomain*/
	      ctx[7].end + 1,
	      handlers:
	      /*paginationHandlers*/
	      ctx[1],
	      containerWidth:
	      /*gridDim*/
	      ctx[5].width
	    }
	  });
	  return {
	    c: function c() {
	      create_component(pagination_1.$$.fragment);
	    },
	    m: function m(target, anchor) {
	      mount_component(pagination_1, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, dirty) {
	      var pagination_1_changes = {};
	      if (dirty &
	      /*pagination*/
	      256) pagination_1_changes.config =
	      /*pagination*/
	      ctx[8];
	      if (dirty &
	      /*vizRecDomain*/
	      128) pagination_1_changes.startRecord =
	      /*vizRecDomain*/
	      ctx[7].start + 1;
	      if (dirty &
	      /*vizRecDomain*/
	      128) pagination_1_changes.endRecord =
	      /*vizRecDomain*/
	      ctx[7].end + 1;
	      if (dirty &
	      /*paginationHandlers*/
	      2) pagination_1_changes.handlers =
	      /*paginationHandlers*/
	      ctx[1];
	      if (dirty &
	      /*gridDim*/
	      32) pagination_1_changes.containerWidth =
	      /*gridDim*/
	      ctx[5].width;
	      pagination_1.$set(pagination_1_changes);
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(pagination_1.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(pagination_1.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      destroy_component(pagination_1, detaching);
	    }
	  };
	}

	function create_fragment$o(ctx) {
	  var div;
	  var current_block_type_index;
	  var if_block0;
	  var t0;
	  var t1;
	  var div_class_value;
	  var t2;
	  var current;
	  var if_block_creators = [create_if_block_1$7, create_else_block$5];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*isRow*/
	    ctx[2]) return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  var if_block1 =
	  /*pagination*/
	  ctx[8].enable && create_if_block$9(ctx);
	  var tooltip = new Tooltip({
	    props: {
	      tooltipRef:
	      /*tooltipRef*/
	      ctx[9],
	      gridDimensions:
	      /*gridDim*/
	      ctx[5]
	    }
	  });
	  var creditlabel = new CreditLabel({});
	  return {
	    c: function c() {
	      div = element("div");
	      if_block0.c();
	      t0 = space();
	      if (if_block1) if_block1.c();
	      t1 = space();
	      create_component(tooltip.$$.fragment);
	      t2 = space();
	      create_component(creditlabel.$$.fragment);
	      attr(div, "class", div_class_value = "fg-root-wrapper " + (!
	      /*isRow*/
	      ctx[2] ? "fg-layout-type-card" : ""));
	    },
	    m: function m(target, anchor) {
	      insert(target, div, anchor);
	      if_blocks[current_block_type_index].m(div, null);
	      append(div, t0);
	      if (if_block1) if_block1.m(div, null);
	      append(div, t1);
	      mount_component(tooltip, div, null);
	      insert(target, t2, anchor);
	      mount_component(creditlabel, target, anchor);
	      current = true;
	    },
	    p: function p(ctx, _ref) {
	      var _ref2 = _slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var previous_block_index = current_block_type_index;
	      current_block_type_index = select_block_type(ctx);

	      if (current_block_type_index === previous_block_index) {
	        if_blocks[current_block_type_index].p(ctx, dirty);
	      } else {
	        group_outros();
	        transition_out(if_blocks[previous_block_index], 1, 1, function () {
	          if_blocks[previous_block_index] = null;
	        });
	        check_outros();
	        if_block0 = if_blocks[current_block_type_index];

	        if (!if_block0) {
	          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	          if_block0.c();
	        }

	        transition_in(if_block0, 1);
	        if_block0.m(div, t0);
	      }

	      if (
	      /*pagination*/
	      ctx[8].enable) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);
	          transition_in(if_block1, 1);
	        } else {
	          if_block1 = create_if_block$9(ctx);
	          if_block1.c();
	          transition_in(if_block1, 1);
	          if_block1.m(div, t1);
	        }
	      } else if (if_block1) {
	        group_outros();
	        transition_out(if_block1, 1, 1, function () {
	          if_block1 = null;
	        });
	        check_outros();
	      }

	      var tooltip_changes = {};
	      if (dirty &
	      /*gridDim*/
	      32) tooltip_changes.gridDimensions =
	      /*gridDim*/
	      ctx[5];
	      tooltip.$set(tooltip_changes);

	      if (!current || dirty &
	      /*isRow*/
	      4 && div_class_value !== (div_class_value = "fg-root-wrapper " + (!
	      /*isRow*/
	      ctx[2] ? "fg-layout-type-card" : ""))) {
	        attr(div, "class", div_class_value);
	      }
	    },
	    i: function i(local) {
	      if (current) return;
	      transition_in(if_block0);
	      transition_in(if_block1);
	      transition_in(tooltip.$$.fragment, local);
	      transition_in(creditlabel.$$.fragment, local);
	      current = true;
	    },
	    o: function o(local) {
	      transition_out(if_block0);
	      transition_out(if_block1);
	      transition_out(tooltip.$$.fragment, local);
	      transition_out(creditlabel.$$.fragment, local);
	      current = false;
	    },
	    d: function d(detaching) {
	      if (detaching) detach(div);
	      if_blocks[current_block_type_index].d();
	      if (if_block1) if_block1.d();
	      destroy_component(tooltip);
	      if (detaching) detach(t2);
	      destroy_component(creditlabel, detaching);
	    }
	  };
	}

	function instance$n($$self, $$props, $$invalidate) {
	  var infiniteScrollManager = $$props.infiniteScrollManager;
	  var parsedRowConfig = $$props.parsedRowConfig;
	  var parsedCardConfig = $$props.parsedCardConfig;
	  var container = $$props.container;
	  var paginationHandlers = $$props.paginationHandlers;
	  var isRow = true,
	      layoutStateObj,
	      autoHeightState,
	      gridDim,
	      parsedGridConfig,
	      tooltipRef = {},
	      gridData,
	      vizRecDomain,
	      pagination,
	      dispatchEvent;
	  onMount(function () {
	    // dispatch rendered public event
	    dispatchEvent("rendered", {
	      container: container,
	      gridConfig: parsedGridConfig
	    });
	  });
	  layoutObject.subscribe(function (tmpLayoutObject) {
	    $$invalidate(2, isRow = tmpLayoutObject.layout.type !== "card"); // fallback to row if card is not explicitly mentioned

	    if (isRow) {
	      $$invalidate(3, layoutStateObj = tmpLayoutObject.layoutState.rowLayout);
	    } else {
	      $$invalidate(3, layoutStateObj = tmpLayoutObject.layoutState.cardLayout);
	    }
	  });
	  autoHeight.subscribe(function (tmpAutoHeightState) {
	    $$invalidate(4, autoHeightState = tmpAutoHeightState);
	  });
	  visualUtils.subscribe(function (tmpVisualUtils) {
	    $$invalidate(6, gridData = tmpVisualUtils.gridData);
	    parsedGridConfig = tmpVisualUtils.gridData.gridConfig;
	    dispatchEvent = tmpVisualUtils.dispatchEvent;
	  });
	  gridDimensions.subscribe(function (dim) {
	    $$invalidate(5, gridDim = dim);
	  });
	  vizRecordDomain.subscribe(function (tmpVizRecDomain) {
	    $$invalidate(7, vizRecDomain = tmpVizRecDomain);
	  });
	  paginationState.subscribe(function (paginationConfig) {
	    $$invalidate(8, pagination = paginationConfig);
	  });
	  setContext("parsedGridConfig", parsedGridConfig);
	  setContext("tooltipRef", tooltipRef);
	  setContext("dispatchEvent", dispatchEvent);
	  setContext("parsedRowConfig", parsedRowConfig);
	  setContext("parsedCardConfig", parsedCardConfig);
	  setContext("gridContainer", container);

	  $$self.$set = function ($$props) {
	    if ("infiniteScrollManager" in $$props) $$invalidate(0, infiniteScrollManager = $$props.infiniteScrollManager);
	    if ("parsedRowConfig" in $$props) $$invalidate(10, parsedRowConfig = $$props.parsedRowConfig);
	    if ("parsedCardConfig" in $$props) $$invalidate(11, parsedCardConfig = $$props.parsedCardConfig);
	    if ("container" in $$props) $$invalidate(12, container = $$props.container);
	    if ("paginationHandlers" in $$props) $$invalidate(1, paginationHandlers = $$props.paginationHandlers);
	  };

	  return [infiniteScrollManager, paginationHandlers, isRow, layoutStateObj, autoHeightState, gridDim, gridData, vizRecDomain, pagination, tooltipRef, parsedRowConfig, parsedCardConfig, container];
	}

	var Viz =
	/*#__PURE__*/
	function (_SvelteComponent) {
	  _inherits(Viz, _SvelteComponent);

	  function Viz(options) {
	    var _this;

	    _classCallCheck(this, Viz);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Viz).call(this));
	    init(_assertThisInitialized(_this), options, instance$n, create_fragment$o, safe_not_equal, {
	      infiniteScrollManager: 0,
	      parsedRowConfig: 10,
	      parsedCardConfig: 11,
	      container: 12,
	      paginationHandlers: 1
	    });
	    return _this;
	  }

	  return Viz;
	}(SvelteComponent);

	var UNDEF$2;
	var createExtViewportArray = function (viewports) {
	    var viewportArr = [];
	    for (var key in viewports) {
	        viewportArr.push(_assign({ name: key }, viewports[key]));
	    }
	    return viewportArr;
	}, isRowStylingOption = function (option) { return (option === 'style') || (option === 'hover') || (option === 'class'); }, isTouchDevice = "ontouchstart" in window, calculatePaginationHeight = function (screenWidth, config) {
	    if (!config.enable) {
	        return 0;
	    }
	    if ((screenWidth <= 550) && (config.showrecordcount && config.pagesize.options)) {
	        return 2 * DEFAULT_PAGINATION_ROW_HEIGHT;
	    }
	    return DEFAULT_PAGINATION_ROW_HEIGHT;
	};
	var OrientationEvents$1;
	(function (OrientationEvents) {
	    OrientationEvents["Resize"] = "resize";
	    OrientationEvents["OrientationChange"] = "orientationchange";
	})(OrientationEvents$1 || (OrientationEvents$1 = {}));
	var FusionGrid = (function () {
	    function FusionGrid(container, data, gridConfig) {
	        var _this = this;
	        var parsedGridConfig, systemDefaultColumnOptions, defaultRowOptions, viewport, eventToBeAttached = isIOS
	            ? OrientationEvents$1.OrientationChange
	            : OrientationEvents$1.Resize;
	        if (document && container) {
	            this._lengthUnitsObject = lengthUnitGenerator(document, container, {
	                height: container.offsetHeight,
	                width: container.offsetWidth
	            });
	            setMinColumnWidth(container);
	        }
	        this._lazyRendering = true;
	        this._eventManager = new EventManager({
	            context: this,
	            events: gridConfig.events
	        });
	        visualUtils.set({
	            dispatchEvent: this._eventManager.dispatchEvent
	        });
	        this._logger = new Logger(this._eventManager.dispatchEvent);
	        try {
	            if (!container || !data) {
	                throw new Error(GridException.parameterMissing);
	            }
	            if (!(container instanceof Element)) {
	                throw new Error(GridException.containerNotElement);
	            }
	            this._container = container;
	            this._data = data;
	            this._gridConfig = gridConfig;
	            systemDefaultColumnOptions = {
	                width: DEFAULT_COLUMN_WIDTH,
	                minwidth: 50,
	                wraptext: false,
	                chartconfig: {
	                    type: 'bar',
	                    showvalue: true,
	                    showhundredpercentbar: false,
	                    valuetextposition: DEFAULT_VALUE_TEXT_POSITION,
	                    valuetextalignment: DEFAULT_VALUE_TEXT_ALIGNMENT
	                }
	            };
	            defaultRowOptions = {
	                rowheight: DEFAULT_ROW_HEIGHT,
	                headerrowheight: DEFAULT_ROW_HEIGHT,
	                hover: {
	                    enable: true
	                }
	            };
	            this._systemDefaults = {
	                columnOptions: systemDefaultColumnOptions,
	                rowOptions: defaultRowOptions,
	                lowerCaseIgnorableProperties: ['style', 'headerstyle', 'cellstyle', 'selectedrowstyle', 'positivebarstyle', 'negativebarstyle', 'hundredpercentbarstyle', 'valuetextstyle'],
	                valsToConvert: ['type', 'density', 'valuetextposition', 'valuetextalignment']
	            };
	            this._gridDataTable = new GridDataTable(this._data);
	            parsedGridConfig = this._buildGridConfig();
	            this._viewportManager = new ViewportManager({
	                externalViewports: createExtViewportArray(parsedGridConfig.viewports),
	                extLayout: parsedGridConfig.layout,
	                logger: this._logger
	            });
	            viewport = this._viewportManager.getCurrentViewport();
	            this._parsedGridConfig = this._configurePrasedGridConfig(viewport, parsedGridConfig);
	            this._gridData = this._configureGridData(parsedGridConfig);
	            this._updateGridDataStore();
	            this._conatinerDimensions = {
	                width: this._container.offsetWidth,
	                height: this._container.offsetHeight - DEFAULT_CREDIT_LABEL_HEIGHT,
	                top: this._container.offsetTop,
	                left: this._container.offsetLeft,
	            };
	            this._layoutManager = this._configureLayoutManager(viewport, parsedGridConfig, container);
	            this._infiniteScrollManager = this._configureInfiniteScrollManager(parsedGridConfig, container);
	            this._pagination = this._configurePagination();
	            isTouchDevice && window.addEventListener(eventToBeAttached, function () {
	                _this._viewportManager.orientationHandler();
	                var newViewPort = _this._viewportManager.getCurrentViewport();
	                if (_this._viewportManager.config.viewportChanged) {
	                    var newLayoutObj = (newViewPort.config && newViewPort.config.layout) || {};
	                    _this._layoutManager.setLayout(newLayoutObj);
	                }
	            });
	            gridDimensions.set({
	                width: this._conatinerDimensions.width,
	                height: this._conatinerDimensions.height,
	                top: this._conatinerDimensions.top,
	                left: this._conatinerDimensions.left,
	            });
	            this.trigger('initialized', {
	                container: container,
	                gridConfig: parsedGridConfig
	            });
	        }
	        catch (ex) {
	            this._logger.error(ex.message);
	            throw ex;
	        }
	    }
	    FusionGrid.prototype._configurePrasedGridConfig = function (viewport, parsedGridConfig) {
	        if (viewport && typeof viewport.config === 'object') {
	            var viewportConfig = viewport.config, userDefaultColumnOptions = viewportConfig.defaultColumnOptions || {}, defaultColumnOptions = mergeDeep(this._systemDefaults.columnOptions, userDefaultColumnOptions), viewportColumnOptions = this._buildColumnOptions(viewportConfig.columns || [], defaultColumnOptions, false);
	            if (typeof viewportColumnOptions !== 'undefined' && viewportColumnOptions.length > 0) {
	                parsedGridConfig.columns = viewportColumnOptions;
	            }
	            if (typeof viewportConfig.layout !== 'undefined') {
	                parsedGridConfig.layout = viewportConfig.layout;
	            }
	            if (typeof viewportConfig.rowoptions !== 'undefined') {
	                parsedGridConfig.rowoptions = viewportConfig.rowoptions;
	            }
	            if (typeof viewportConfig.pagination !== 'undefined') {
	                parsedGridConfig.pagination = this._buildPagination(viewportConfig.pagination);
	            }
	        }
	        if (!parsedGridConfig.columns.length) {
	            throw new Error(GridException.noColumnFound);
	        }
	        return parsedGridConfig;
	    };
	    FusionGrid.prototype._configurePagination = function () {
	        var paginationConfig = this._parsedGridConfig.pagination || {}, paginationHeight = calculatePaginationHeight(this._conatinerDimensions.width, paginationConfig);
	        this._conatinerDimensions.height -= paginationHeight;
	        return new Pagination({
	            pagination: paginationConfig,
	            currentScreenWidth: this._conatinerDimensions.width,
	            logger: this._logger,
	            bodyHeight: this._conatinerDimensions.height - this._layoutManager.getDensedHeaderRowHeight(),
	            rowHeight: this._layoutManager.getDensedBodyRowHeight(),
	            dispatchEvent: this._eventManager.dispatchEvent,
	            gridDataTable: this._gridDataTable,
	            paginationHeight: paginationHeight
	        });
	    };
	    FusionGrid.prototype._configureGridData = function (parsedGridConfig) {
	        return new GridData(this._gridDataTable, parsedGridConfig, this);
	    };
	    FusionGrid.prototype._configureLayoutManager = function (viewport, parsedGridConfig, container) {
	        var logger = this._logger, layoutManager = new LayoutManager({
	            layoutConfig: clone((viewport.config && viewport.config.layout) || {}),
	            rowOptionsConfig: parsedGridConfig.rowoptions,
	            columnsConfig: parsedGridConfig.columns,
	            selectionConfig: typeof parsedGridConfig.rowoptions === 'undefined' ? parsedGridConfig.rowoptions : parsedGridConfig.rowoptions.rowselection,
	            domContainerDim: {
	                height: container.offsetHeight,
	                width: container.offsetWidth
	            }
	        });
	        return layoutManager;
	    };
	    FusionGrid.prototype._configureInfiniteScrollManager = function (parsedGridConfig, container) {
	        var infiniteScrollManager = new InfiniteScrollManager({
	            lazyRendering: this._lazyRendering,
	            dataLength: this._gridData.gridDataTable.gridData.length,
	            rowConfig: parsedGridConfig.rowoptions || {},
	            domContainer: this._conatinerDimensions
	        });
	        if (this._lazyRendering) {
	            vizRecordDomain.set({
	                start: 0,
	                end: infiniteScrollManager.getEndRow()
	            });
	        }
	        else {
	            vizRecordDomain.set({
	                start: 0,
	                end: this._gridData.gridDataTable.gridData.length - 1
	            });
	        }
	        return infiniteScrollManager;
	    };
	    FusionGrid.prototype._configure = function () {
	        if (this._viewportManager.config.viewportChanged) {
	            var viewport = this._viewportManager.getCurrentViewport(), parsedGridConfig = this._buildGridConfig(), container = this._container;
	            this._parsedGridConfig = this._configurePrasedGridConfig(viewport, parsedGridConfig);
	            this._gridData = this._configureGridData(parsedGridConfig);
	            this._updateGridDataStore();
	            this._layoutManager = this._configureLayoutManager(viewport, parsedGridConfig, container);
	            this._infiniteScrollManager = this._configureInfiniteScrollManager(parsedGridConfig, container);
	            this._configurePagination();
	            this.trigger('updated', {
	                gridConfig: this._parsedGridConfig
	            });
	        }
	    };
	    FusionGrid.prototype.render = function () {
	        this.trigger('beforerender', {
	            container: this._container,
	            gridConfig: this._parsedGridConfig
	        });
	        var layoutManager = this._layoutManager, pagination = this._pagination;
	        this._viz = new Viz({
	            target: this._container,
	            props: {
	                container: this._container,
	                parsedRowConfig: Object.assign({}, { density: layoutManager.getDensity() }, layoutManager.getRowConfig()),
	                parsedCardConfig: layoutManager.getCardConfig(),
	                infiniteScrollManager: this._infiniteScrollManager,
	                paginationHandlers: {
	                    'jumpToNextPage': function () {
	                        pagination.jumpToNextPage();
	                    },
	                    'jumpToPreviousPage': function () {
	                        pagination.jumpToPreviousPage();
	                    },
	                    'jumpToFirstPage': function () {
	                        pagination.jumpToFirstPage();
	                    },
	                    'jumpToLastPage': function () {
	                        pagination.jumpToLastPage();
	                    },
	                    'jumpToPage': function (pageNumber) {
	                        pagination.jumpToPage(+pageNumber);
	                    },
	                    'setPageSize': function (pageSize) {
	                        pagination.setPageSize(+pageSize);
	                    },
	                }
	            }
	        });
	    };
	    FusionGrid.prototype.on = function (eventName, handler) {
	        this._eventManager.addEventListener(eventName, handler);
	    };
	    FusionGrid.prototype.off = function (eventName, handler) {
	        this._eventManager.removeEventListener(eventName, handler);
	    };
	    FusionGrid.prototype.trigger = function (eventName, payload) {
	        this._eventManager.dispatchEvent.call(this, eventName, payload);
	    };
	    FusionGrid.prototype.getColumns = function (columnIndex) {
	        if (this._gridConfig && this._gridConfig.columns && Array.isArray(this._gridConfig.columns)) {
	            if (typeof columnIndex === 'undefined') {
	                return this._gridConfig.columns;
	            }
	            else if (!isWholeNumber(columnIndex)) {
	                this._logger.error(GridException.inValidColumnIndex, columnIndex);
	            }
	            else {
	                return this._gridConfig.columns[columnIndex];
	            }
	        }
	        return UNDEF$2;
	    };
	    FusionGrid.prototype.getParsedColumnOptions = function (columnIndex) {
	        if (typeof columnIndex === 'undefined') {
	            return this._parsedGridConfig.columns;
	        }
	        else if (!isWholeNumber(columnIndex)) {
	            this._logger.error(GridException.inValidColumnIndex, columnIndex);
	            return UNDEF$2;
	        }
	        return this._parsedGridConfig.columns[columnIndex];
	    };
	    FusionGrid.prototype.setColumns = function (columns) {
	        if (!Array.isArray(columns)) {
	            this._logger.error(GridException.acceptsOnlyArrayAsInput);
	            return this;
	        }
	        var lowerCasedColumns = convertKeysToLowerCase(columns, this._systemDefaults.lowerCaseIgnorableProperties, this._systemDefaults.valsToConvert) || {}, parsedConfigColumns = this._buildColumnOptions(lowerCasedColumns, this._defaultColumnOptions, true);
	        this._gridData.setColumns(parsedConfigColumns);
	        this._layoutManager.setColumnsConfig(parsedConfigColumns);
	        this._updateGridDataStore();
	        this._layoutManager.calculatelayout();
	        this.trigger('updated', {
	            gridConfig: this._parsedGridConfig
	        });
	        return this;
	    };
	    FusionGrid.prototype.getDataTable = function () {
	        return this._data;
	    };
	    FusionGrid.prototype.setDataTable = function (dataTable) {
	        this._gridData.setDataTable(dataTable);
	        this._infiniteScrollManager.setDatalength(this._gridData.gridDataTable.gridData.length);
	        this._updateVizRecDomainStartEnd(0, this._infiniteScrollManager.getEndRow());
	        this._updateGridDataStore();
	        this.trigger('updated', {
	            gridConfig: this._parsedGridConfig
	        });
	        return this;
	    };
	    FusionGrid.prototype.getLayout = function (property) {
	        var layoutObject = this._layoutManager.getLayout();
	        if (property) {
	            return layoutObject[property];
	        }
	        return layoutObject;
	    };
	    FusionGrid.prototype.setLayout = function (properties) {
	        var lowerCasedProps = convertKeysToLowerCase(properties, this._systemDefaults.lowerCaseIgnorableProperties, this._systemDefaults.valsToConvert);
	        var prevLayout = clone(this._layoutManager.getLayout()), viewport = this._viewportManager.getCurrentViewport(), newLayout;
	        this._layoutManager.setLayout(lowerCasedProps);
	        newLayout = this._layoutManager.getLayout();
	        if (!isEqualObject(prevLayout, newLayout)) {
	            this.trigger('layoutchanged', {
	                layout: newLayout,
	                viewport: viewport
	            });
	            if (newLayout.type !== prevLayout.type) {
	                this.trigger('layouttypechanged', {
	                    layout: newLayout,
	                    viewport: viewport,
	                    layoutType: newLayout.type,
	                    prevLayoutType: prevLayout.type
	                });
	            }
	            this.trigger('updated', {
	                gridConfig: this._parsedGridConfig
	            });
	        }
	    };
	    FusionGrid.prototype.getAllViewports = function () {
	        return this._viewportManager.getAllViewports();
	    };
	    FusionGrid.prototype.getCurrentViewport = function () {
	        return this._viewportManager.getCurrentViewport();
	    };
	    FusionGrid.prototype.addViewport = function (viewportName, config) {
	        this._viewportManager.addViewport(_assign({ name: viewportName }, config));
	        this._configure();
	    };
	    FusionGrid.prototype.setRowOptions = function (param, value) {
	        var _this = this;
	        var parsedGridConfig = this._parsedGridConfig, gridDataConfig = this._gridData.gridConfig, logger = this._logger, fomattedValue, setStylingOptions = function (option, val) {
	            if (option === 'style') {
	                parsedGridConfig.rowoptions.style = gridDataConfig.rowoptions.style = val;
	            }
	            else if (option === 'class') {
	                parsedGridConfig.rowoptions.class = gridDataConfig.rowoptions.class = val;
	            }
	            else if (option === 'hover') {
	                parsedGridConfig.rowoptions.hover = gridDataConfig.rowoptions.hover = val;
	            }
	            _this._updateGridDataStore();
	        };
	        if (typeof param === 'string') {
	            var paramInLowerCase = param.toLowerCase();
	            fomattedValue = typeof value === 'object' ? convertKeysToLowerCase(value, this._systemDefaults.lowerCaseIgnorableProperties)
	                : value;
	            if (!isRowStylingOption(param)) {
	                (paramInLowerCase === 'rowselection') && this._shouldResetRowSelectedState(fomattedValue);
	                if (paramInLowerCase === 'rowheight') {
	                    var tmpRowHeight = parseLengthUnit(fomattedValue, this._lengthUnitsObject, 'height');
	                    (tmpRowHeight) ? this._layoutManager.setRowOptions('pxRowHeight', tmpRowHeight)
	                        : logger.error(GridException.invalidRowHeight, fomattedValue);
	                }
	                else if (paramInLowerCase === 'headerrowheight') {
	                    var tmpHeaderRowHeight = parseLengthUnit(fomattedValue, this._lengthUnitsObject, 'height');
	                    (tmpHeaderRowHeight) ? this._layoutManager.setRowOptions('pxHeaderRowHeight', tmpHeaderRowHeight)
	                        : logger.error(GridException.invalidHeaderRowHeight, fomattedValue);
	                }
	                else {
	                    this._layoutManager.setRowOptions(paramInLowerCase, fomattedValue);
	                }
	            }
	            else {
	                setStylingOptions(param, fomattedValue);
	            }
	        }
	        else if (typeof param === 'object') {
	            var lowerCasedParam = convertKeysToLowerCase(param, this._systemDefaults.lowerCaseIgnorableProperties, this._systemDefaults.valsToConvert), parsedRowOptions = this._buildRowOptions(lowerCasedParam, this._systemDefaults.rowOptions);
	            for (var key in parsedRowOptions) {
	                if (!isRowStylingOption(param)) {
	                    (key === 'rowselection') && this._shouldResetRowSelectedState(parsedRowOptions[key]);
	                    this._layoutManager.setRowOptions(key, parsedRowOptions[key]);
	                }
	                else {
	                    setStylingOptions(key, parsedRowOptions[key]);
	                }
	            }
	        }
	        this.trigger('updated', {
	            gridConfig: this._parsedGridConfig
	        });
	        return this;
	    };
	    FusionGrid.prototype._shouldResetRowSelectedState = function (newRowSelection) {
	        var prevRowSelectionState = this._parsedGridConfig.rowoptions && this._parsedGridConfig.rowoptions.rowselection || {};
	        if ((prevRowSelectionState.showselectioncheckbox !== newRowSelection.showselectioncheckbox)
	            || (prevRowSelectionState.enable !== newRowSelection.enable)) {
	            this._gridData.resetRowSelectedState();
	            this._gridData.setLatestSelectedRow(UNDEF$2);
	        }
	    };
	    FusionGrid.prototype.getRowOptions = function (optionVal) {
	        var _this = this;
	        var option, rowOptions = this._gridData.gridConfig.rowoptions, returnObj = {}, getOptionValue = function (opt) {
	            if (!isRowStylingOption(opt)) {
	                return _this._layoutManager.getRowOption(opt);
	            }
	            if (opt === 'style') {
	                return rowOptions.style;
	            }
	            else if (opt === 'class') {
	                return rowOptions.class;
	            }
	            else if (opt === 'hover') {
	                return rowOptions.hover;
	            }
	        };
	        if (typeof optionVal === 'undefined') {
	            return rowOptions;
	        }
	        else if (typeof optionVal === 'string') {
	            option = optionVal.toLowerCase();
	            return getOptionValue(option);
	        }
	        else if (Array.isArray(optionVal) && optionVal.length) {
	            for (var i = 0; i < optionVal.length; i++) {
	                option = optionVal[i].toLowerCase();
	                returnObj[option] = getOptionValue(option);
	            }
	            return returnObj;
	        }
	    };
	    FusionGrid.prototype.enableAutoViewportSwitch = function () {
	        this._viewportManager.setSwitch(true);
	    };
	    FusionGrid.prototype.disableAutoViewportSwitch = function () {
	        this._viewportManager.setSwitch(false);
	    };
	    FusionGrid.prototype._updateGridDataStore = function () {
	        var _this = this;
	        visualUtils.update(function (tmpVisualUtils) {
	            tmpVisualUtils.gridData = _this._gridData;
	            return tmpVisualUtils;
	        });
	    };
	    FusionGrid.prototype._buildColumnOptions = function (columnOptions, defaultColumnOptions, isReplaceEmptyConfigWithDT) {
	        var _this = this;
	        var logger = this._logger;
	        var parsedConfigColumns = [], calculatedMinColumnWidth = getMinColumnWidth();
	        if (Array.isArray(columnOptions) && columnOptions.length) {
	            parsedConfigColumns = columnOptions.reduce(function (columns, val) {
	                var mergedObj = mergeDeep(defaultColumnOptions, val);
	                mergedObj.pxWidth = parseLengthUnit(mergedObj.width, _this._lengthUnitsObject, 'width') || DEFAULT_COLUMN_WIDTH;
	                mergedObj.pxMinWidth = Math.max(parseLengthUnit(mergedObj.minwidth, _this._lengthUnitsObject, 'width'), calculatedMinColumnWidth);
	                mergedObj.pxMaxWidth = parseLengthUnit(mergedObj.maxwidth, _this._lengthUnitsObject, 'width');
	                var inclusionFlag = true, minWidth = mergedObj.pxMinWidth || -Infinity, maxWidth = mergedObj.pxMaxWidth || +Infinity;
	                if (mergedObj.type !== ColumnType.HTML) {
	                    if (typeof mergedObj.field === 'undefined') {
	                        logger.error(GridException.fieldNotFound);
	                        inclusionFlag = false;
	                    }
	                    else {
	                        var valueTextAlignmentTypeArr = getAllValuesofObj(ValueTextAlignmentType), valueTextPositionTypeArr = getAllValuesofObj(ValueTextPositionType);
	                        if (typeof mergedObj.type === 'undefined' || mergedObj.type === ColumnType.Chart) {
	                            var derivedType = _this._gridDataTable.getColumnType(mergedObj.field);
	                            if (typeof derivedType === 'undefined') {
	                                logger.error(formatString(GridException.fieldError, mergedObj.field));
	                                inclusionFlag = false;
	                            }
	                            if (mergedObj.type === ColumnType.Chart && typeof mergedObj.chartconfig !== 'undefined') {
	                                mergedObj.derivedChartConfig = clone(mergedObj.chartconfig);
	                                var valueTextPos = mergedObj.derivedChartConfig.valuetextposition, valueTextAlign = mergedObj.derivedChartConfig.valuetextalignment;
	                                if (valueTextPos && valueTextPositionTypeArr.indexOf(valueTextPos.toLowerCase()) === -1) {
	                                    mergedObj.derivedChartConfig.valuetextposition = DEFAULT_VALUE_TEXT_POSITION;
	                                }
	                                if (valueTextAlign && valueTextAlignmentTypeArr.indexOf(valueTextAlign.toLowerCase()) === -1) {
	                                    mergedObj.derivedChartConfig.valuetextalignment = DEFAULT_VALUE_TEXT_ALIGNMENT;
	                                }
	                                if (typeof mergedObj.derivedChartConfig.barheight !== 'undefined') {
	                                    mergedObj.derivedChartConfig.pxBarHeight = parseLengthUnit(mergedObj.derivedChartConfig.barheight, _this._lengthUnitsObject, 'height');
	                                }
	                                else if (valueTextPos === ValueTextPositionType.top || valueTextPos === ValueTextPositionType.bottom) {
	                                    mergedObj.derivedChartConfig.valuetextposition = DEFAULT_VALUE_TEXT_POSITION;
	                                }
	                            }
	                            if (mergedObj.type === ColumnType.Chart && derivedType !== ColumnType.Number) {
	                                logger.error(formatString(GridException.inlineChartTypeMismatch, mergedObj.field));
	                                mergedObj.type = derivedType;
	                            }
	                            else if (typeof mergedObj.type === 'undefined') {
	                                mergedObj.type = derivedType;
	                            }
	                        }
	                    }
	                }
	                if (inclusionFlag) {
	                    if (typeof mergedObj.hover === 'object') {
	                        if (typeof mergedObj.hover.enable !== 'boolean') {
	                            mergedObj.hover.enable = true;
	                        }
	                    }
	                    if (typeof mergedObj.tooltip === 'object') {
	                        if (typeof mergedObj.tooltip.enable !== 'boolean') {
	                            mergedObj.tooltip.enable = true;
	                        }
	                        if (mergedObj.tooltip.enable === true) {
	                            if (typeof mergedObj.tooltip.enableheadertooltip !== 'boolean') {
	                                mergedObj.tooltip.enableheadertooltip = true;
	                            }
	                            if (typeof mergedObj.tooltip.enablecelltooltip !== 'boolean') {
	                                mergedObj.tooltip.enablecelltooltip = true;
	                            }
	                        }
	                        if (typeof mergedObj.tooltip.enablehelpericon !== 'boolean') {
	                            mergedObj.tooltip.enablehelpericon = false;
	                        }
	                        if (mergedObj.tooltip.enablehelpericon === true) {
	                            if (typeof mergedObj.tooltip.enableheaderhelpericon !== 'boolean') {
	                                mergedObj.tooltip.enableheaderhelpericon = true;
	                            }
	                            if (typeof mergedObj.tooltip.enablecellhelpericon !== 'boolean') {
	                                mergedObj.tooltip.enablecellhelpericon = true;
	                            }
	                        }
	                    }
	                    if (typeof mergedObj.headertext === 'undefined') {
	                        mergedObj.headertext = captalizeFirstLetter(mergedObj.field) || '';
	                    }
	                    if (minWidth > maxWidth) {
	                        logger.error(formatString(GridException.minGreaterMaxWidth, mergedObj.headertext || ''));
	                    }
	                    else {
	                        if (mergedObj.pxWidth < minWidth) {
	                            mergedObj.pxWidth = minWidth;
	                        }
	                        else if (mergedObj.pxWidth > maxWidth) {
	                            mergedObj.pxWidth = maxWidth;
	                        }
	                    }
	                    columns.push(mergedObj);
	                }
	                return columns;
	            }, []);
	        }
	        else if (isReplaceEmptyConfigWithDT) {
	            this._logger.warn(GridWarningMessage.columnsBuiltFromSchema);
	            parsedConfigColumns = this._gridDataTable.gridSchema.reduce(function (columns, val) {
	                if (val.name !== '_row_id') {
	                    columns.push(mergeDeep(defaultColumnOptions, {
	                        field: val.name,
	                        headertext: captalizeFirstLetter(val.name),
	                        type: deriveColumnTypeFromSchema(val.type || 'text')
	                    }));
	                }
	                return columns;
	            }, []);
	        }
	        return parsedConfigColumns;
	    };
	    FusionGrid.prototype._buildRowOptions = function (rowOptions, baseOptions) {
	        var logger = this._logger, mergedOptions = mergeDeep(baseOptions, rowOptions);
	        if (typeof mergedOptions.hover === 'object') {
	            if (typeof mergedOptions.hover.enable !== 'boolean') {
	                mergedOptions.hover.enable = true;
	            }
	        }
	        if (typeof mergedOptions.rowselection === 'object') {
	            if (typeof mergedOptions.rowselection.enable !== 'boolean') {
	                mergedOptions.rowselection.enable = true;
	            }
	            if (typeof mergedOptions.rowselection.showselectioncheckbox !== 'boolean') {
	                mergedOptions.rowselection.showselectioncheckbox = false;
	            }
	        }
	        mergedOptions.pxRowHeight = parseLengthUnit(mergedOptions.rowheight, this._lengthUnitsObject, 'height') || DEFAULT_ROW_HEIGHT;
	        mergedOptions.pxHeaderRowHeight = parseLengthUnit(mergedOptions.headerrowheight, this._lengthUnitsObject, 'height') || DEFAULT_ROW_HEIGHT;
	        return mergedOptions;
	    };
	    FusionGrid.prototype._buildPagination = function (pagination) {
	        var logger = this._logger;
	        if (typeof pagination !== 'undefined') {
	            if (typeof pagination.enable !== 'boolean') {
	                pagination.enable = true;
	            }
	            if (typeof pagination.showrecordcount !== 'boolean') {
	                pagination.showrecordcount = false;
	            }
	            if (typeof pagination.showjumptoendbuttons !== 'boolean') {
	                pagination.showjumptoendbuttons = false;
	            }
	            if (typeof pagination.showjumptofirstpagebutton !== 'boolean') {
	                pagination.showjumptofirstpagebutton = pagination.showjumptoendbuttons;
	            }
	            if (typeof pagination.showjumptolastpagebutton !== 'boolean') {
	                pagination.showjumptolastpagebutton = pagination.showjumptoendbuttons;
	            }
	            var showPages = pagination.showpages, pageSize = pagination.pagesize;
	            if (typeof showPages === 'object') {
	                if (typeof showPages.enable !== 'boolean') {
	                    showPages.enable = true;
	                }
	                if (typeof showPages.showtotal !== 'boolean') {
	                    showPages.showtotal = false;
	                }
	                if (typeof showPages.userinput !== 'boolean') {
	                    showPages.userinput = false;
	                }
	            }
	            else {
	                pagination.showpages = {};
	            }
	            if (typeof pageSize === 'object') {
	                if (Array.isArray(pageSize.options) && pageSize.options.length > 0) {
	                    pageSize.options = pageSize.options.filter(function (x) { return isNaturalNumber(x); });
	                    if (pageSize.options.length === 0) {
	                        logger.error(GridException.invalidPageSizeOptionsArr);
	                    }
	                    else if (!isNaturalNumber(pageSize['default']) || (typeof pageSize['default'] !== 'undefined' && pageSize.options.indexOf(pageSize['default']) === -1)) {
	                        logger.error(GridException.invalidDefaultPageSize);
	                        pageSize['default'] = pageSize.options[0];
	                    }
	                }
	                else if (typeof pageSize.options !== 'undefined' && typeof pageSize.options !== 'boolean') {
	                    logger.error(GridException.invalidPageSizeOptions);
	                    pageSize.options = false;
	                }
	            }
	            else {
	                pagination.pagesize = {};
	            }
	        }
	        return pagination;
	    };
	    FusionGrid.prototype._buildGridConfig = function () {
	        var lowerCasedConfig = convertKeysToLowerCase(this._gridConfig, this._systemDefaults.lowerCaseIgnorableProperties, this._systemDefaults.valsToConvert) || {}, userDefaultColumnOptions = lowerCasedConfig.defaultcolumnoptions || {}, defaultColumnOptions = this._defaultColumnOptions = mergeDeep(this._systemDefaults.columnOptions, userDefaultColumnOptions), gridConfigColumns = lowerCasedConfig.columns || [], parsedConfigColumns = this._buildColumnOptions(gridConfigColumns, defaultColumnOptions, true), rowOptions = this._buildRowOptions(lowerCasedConfig.rowoptions || {}, this._systemDefaults.rowOptions), pagination = this._buildPagination(lowerCasedConfig.pagination);
	        return {
	            columns: parsedConfigColumns,
	            layout: lowerCasedConfig.layout,
	            rowoptions: rowOptions,
	            pagination: pagination,
	            viewports: lowerCasedConfig.viewports || {},
	            events: lowerCasedConfig.events
	        };
	    };
	    FusionGrid.prototype._updateVizRecDomainStartEnd = function (start, end) {
	        var logger = this._parsedGridConfig;
	        vizRecordDomain.update(function (tmpVizRecDomain) {
	            tmpVizRecDomain.start = start;
	            tmpVizRecDomain.end = end;
	            return tmpVizRecDomain;
	        });
	    };
	    FusionGrid.prototype.sizeColumnsToContent = function (columnIndexes) {
	        var inputColumnIndexes = (arguments.length > 0) ? columnIndexes : [], validColumns = [], invalidColums = [], parsedGridLen = this._parsedGridConfig.columns.length;
	        if (!inputColumnIndexes.length) {
	            for (var index = 0; index < parsedGridLen; index++) {
	                var field = this._parsedGridConfig.columns[index].field;
	                if (field) {
	                    validColumns.push({
	                        columnIndex: index,
	                        content: this._gridData.getMinMaxContent(field) || {}
	                    });
	                }
	            }
	        }
	        else {
	            for (var index = 0; index < inputColumnIndexes.length; index++) {
	                var colIndex = inputColumnIndexes[index];
	                if (colIndex === parseInt(colIndex, 10)) {
	                    validColumns.push(colIndex);
	                }
	                else {
	                    invalidColums.push(colIndex);
	                }
	            }
	        }
	        if (document && this._container)
	            this._layoutManager.sizeColumnsToContent(validColumns, document, this._container);
	        if (invalidColums.length > 0)
	            this._logger.error(GridException.sizeColumnsToContentFailedForColumn, invalidColums);
	    };
	    FusionGrid.prototype.selectRows = function (rowIndexArr) {
	        var rowSlectionStateObj, gridDataLen = this._gridData.getRowSelectedState().length, currentRowSelection = this._parsedGridConfig.rowoptions.rowselection || {}, isMultiSelectEnabled = currentRowSelection.showselectioncheckbox, isSelectionEnabled = currentRowSelection.enable;
	        if (!isSelectionEnabled) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableSelection);
	            return this;
	        }
	        if (!isMultiSelectEnabled && Array.isArray(rowIndexArr) && rowIndexArr.length > 1) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableMultiRowSelectionForRowIndicesSelection, rowIndexArr);
	            return this;
	        }
	        else if (!isMultiSelectEnabled && (Array.isArray(rowIndexArr) && rowIndexArr.length === 1 || typeof rowIndexArr === 'number')) {
	            var gridData = this._gridData, finalRowIndex = Array.isArray(rowIndexArr) ? rowIndexArr[0] : rowIndexArr, prevRowSelectionIndex = gridData.getLatestSelectedRow();
	            if (prevRowSelectionIndex !== finalRowIndex && (finalRowIndex === parseInt(finalRowIndex, 10)) && (finalRowIndex >= 0 && finalRowIndex < gridDataLen)) {
	                gridData.setLatestSelectedRow(finalRowIndex);
	                (typeof prevRowSelectionIndex !== 'undefined') && gridData.setRowSelection(prevRowSelectionIndex, !gridData.getRowSelection(prevRowSelectionIndex));
	            }
	        }
	        rowSlectionStateObj = this._gridData.setRowsSelected(rowIndexArr, true);
	        if (rowSlectionStateObj.validRowArray.length > 0)
	            this._updateGridDataStore();
	        if (rowSlectionStateObj.inValidRowArray.length > 0)
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.invalidRowIndexs, rowSlectionStateObj.inValidRowArray);
	        return this;
	    };
	    FusionGrid.prototype.deselectRows = function (rowIndexArr) {
	        var rowSlectionStateObj, currentRowSelection = this._parsedGridConfig.rowoptions.rowselection || {}, isMultiSelectEnabled = currentRowSelection.showselectioncheckbox, isSelectionEnabled = currentRowSelection.enable;
	        if (!isSelectionEnabled) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableSelection);
	            return this;
	        }
	        if (!isMultiSelectEnabled && Array.isArray(rowIndexArr) && rowIndexArr.length > 1) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableMultiRowSelectionForRowIndicesDeselection, rowIndexArr);
	            return this;
	        }
	        rowSlectionStateObj = this._gridData.setRowsSelected(rowIndexArr, false);
	        if (rowSlectionStateObj.validRowArray.length > 0)
	            this._updateGridDataStore();
	        if (rowSlectionStateObj.inValidRowArray.length > 0)
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.invalidRowIndexs, rowSlectionStateObj.inValidRowArray);
	        return this;
	    };
	    FusionGrid.prototype.getSelectedRows = function () {
	        var selectedRowArr, rowSelectedState, currentRowSelection = this._parsedGridConfig.rowoptions.rowselection || {}, isSelectionEnabled = currentRowSelection.enable;
	        if (!isSelectionEnabled) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableSelection);
	            return this;
	        }
	        selectedRowArr = [],
	            rowSelectedState = this._gridData.getRowSelectedState();
	        for (var index = 0; index < rowSelectedState.length; index++) {
	            var state = rowSelectedState[index];
	            if (state)
	                selectedRowArr.push(index);
	        }
	        return selectedRowArr;
	    };
	    FusionGrid.prototype.selectAllRows = function () {
	        var currentRowSelection = this._parsedGridConfig.rowoptions.rowselection || {}, isMultiSelectEnabled = currentRowSelection.showselectioncheckbox, isSelectionEnabled = currentRowSelection.enable;
	        if (!isSelectionEnabled) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableSelection);
	            return this;
	        }
	        if (!isMultiSelectEnabled) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableMultiRowSelectionForAllRowsSelection);
	            return this;
	        }
	        this._gridData.setGlobalSelectedState(true);
	        this._gridData.syncAllRowSelectedStateWithGlobalSelection(UNDEF$2);
	        this._updateGridDataStore();
	        return this;
	    };
	    FusionGrid.prototype.deselectAllRows = function () {
	        var currentRowSelection = this._parsedGridConfig.rowoptions.rowselection || {}, isMultiSelectEnabled = currentRowSelection.showselectioncheckbox, isSelectionEnabled = currentRowSelection.enable;
	        if (!isSelectionEnabled) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableSelection);
	            return this;
	        }
	        if (!isMultiSelectEnabled) {
	            this._logger.error(ROW_SELECTION_ERROR_MESSAGE.enableMultiRowSelectionForAllRowsDeselection);
	            return this;
	        }
	        this._gridData.setGlobalSelectedState(false);
	        this._gridData.syncAllRowSelectedStateWithGlobalSelection(UNDEF$2);
	        this._updateGridDataStore();
	        return this;
	    };
	    FusionGrid.prototype.sizeColumnsToFit = function () {
	        var rowSelection = this._parsedGridConfig.rowoptions && this._parsedGridConfig.rowoptions.rowselection, isSizeToFitApplied, containerOffsetWidth = (rowSelection && rowSelection.enable && rowSelection.showselectioncheckbox) ?
	            this._container.offsetWidth - DEFAULT_CHECKBOX_COLUMN_WIDTH
	            : this._container.offsetWidth;
	        isSizeToFitApplied = this._layoutManager.sizeColumnsToFit(0, this._parsedGridConfig.columns.length, containerOffsetWidth);
	        if (!isSizeToFitApplied)
	            this._logger.error(GridException.sizeColumnsToFitFailed);
	        return this;
	    };
	    FusionGrid.prototype.getPageSize = function () {
	        return this._pagination.getPageSize();
	    };
	    FusionGrid.prototype.setPageSize = function (pageSize) {
	        this._pagination.setPageSize(pageSize);
	        return this;
	    };
	    FusionGrid.prototype.getCurrentPage = function () {
	        return this._pagination.getCurrentPage();
	    };
	    FusionGrid.prototype.getTotalPages = function () {
	        return this._pagination.getTotalPages();
	    };
	    FusionGrid.prototype.getRowCount = function () {
	        return this._pagination.getRowCount();
	    };
	    FusionGrid.prototype.jumpToPage = function (pageNumber) {
	        if (!isWholeNumber(pageNumber)) {
	            this._logger.error(PaginationException.invalidPageNumber);
	            return this;
	        }
	        this._pagination.jumpToPage(pageNumber);
	        return this;
	    };
	    FusionGrid.prototype.jumpToNextPage = function () {
	        this._pagination.jumpToNextPage();
	        return this;
	    };
	    FusionGrid.prototype.jumpToPreviousPage = function () {
	        this._pagination.jumpToPreviousPage();
	        return this;
	    };
	    FusionGrid.prototype.jumpToFirstPage = function () {
	        this._pagination.jumpToFirstPage();
	        return this;
	    };
	    FusionGrid.prototype.jumpToLastPage = function () {
	        this._pagination.jumpToLastPage();
	        return this;
	    };
	    FusionGrid.prototype.setPagination = function (param, value) {
	        var _this = this;
	        var pagination = this._pagination, paginationEnable, paginationHeight = pagination.paginationHeight, formattedValue;
	        if (typeof param === "object") {
	            var lowerCasedParam = convertKeysToLowerCase(param, this._systemDefaults.lowerCaseIgnorableProperties, this._systemDefaults.valsToConvert);
	            for (var key in lowerCasedParam) {
	                pagination.setPagination(key, lowerCasedParam[key]);
	            }
	        }
	        else if (typeof param === "string") {
	            formattedValue = typeof value === "object" ? convertKeysToLowerCase(value, this._systemDefaults.lowerCaseIgnorableProperties, this._systemDefaults.valsToConvert) : value;
	            pagination.setPagination(param.toLowerCase(), value);
	        }
	        paginationEnable = pagination.config.enable;
	        if (pagination.shouldMutateStore) {
	            pagination.reconfigureState();
	        }
	        gridDimensions.update(function (dim) {
	            dim.height = _this._container.offsetHeight - DEFAULT_CREDIT_LABEL_HEIGHT - (paginationEnable ? paginationHeight : 0);
	            return dim;
	        });
	    };
	    FusionGrid.prototype.getPagination = function (param) {
	        return this._pagination.getPagination(param);
	    };
	    return FusionGrid;
	}());

	//# sourceMappingURL=index.js.map

	return FusionGrid;

})));
