/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		var prefetchChunks = data[3] || [];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		deferredPrefetch.push.apply(deferredPrefetch, prefetchChunks);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		if(deferredModules.length === 0) {
/******/ 			// chunk prefetching for javascript
/******/ 			deferredPrefetch.forEach(function(chunkId) {
/******/ 				if(installedChunks[chunkId] === undefined) {
/******/ 					installedChunks[chunkId] = null;
/******/ 					var link = document.createElement('link');
/******/
/******/ 					if (__webpack_require__.nc) {
/******/ 						link.setAttribute("nonce", __webpack_require__.nc);
/******/ 					}
/******/ 					link.rel = "prefetch";
/******/ 					link.as = "script";
/******/ 					link.href = jsonpScriptSrc(chunkId);
/******/ 					document.head.appendChild(link);
/******/ 				}
/******/ 			});
/******/ 			deferredPrefetch.length = 0;
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"home": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [], deferredPrefetch = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"footer":"footer"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../../";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	var startupResult = (function() {
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~about~contact~home~portfolio~services~team~vacancies","about~home"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ 	})();
/******/
/******/ 	webpackJsonpCallback([[], {}, 0, ["footer"]]);
/******/ 	return startupResult;
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../scss/pages/home/page.scss":
/*!********************************************************************!*\
  !*** E:/Front End/projects/1_rembud/src/scss/pages/home/page.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../lib/swiper.js":
/*!************************!*\
  !*** ../lib/swiper.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Swiper 5.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 20, 2020
 */
!function (e, t) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  "use strict";

  function e(e) {
    return null !== e && "object" == _typeof(e) && "constructor" in e && e.constructor === Object;
  }

  function t(i, s) {
    void 0 === i && (i = {}), void 0 === s && (s = {}), Object.keys(s).forEach(function (a) {
      void 0 === i[a] ? i[a] = s[a] : e(s[a]) && e(i[a]) && Object.keys(s[a]).length > 0 && t(i[a], s[a]);
    });
  }

  var i = "undefined" != typeof document ? document : {},
      s = {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: ""
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {}
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS: function createElementNS() {
      return {};
    },
    importNode: function importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  t(i, s);
  var a = "undefined" != typeof window ? window : {};
  t(a, {
    document: s,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState: function replaceState() {},
      pushState: function pushState() {},
      go: function go() {},
      back: function back() {}
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return "";
        }
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
    matchMedia: function matchMedia() {
      return {};
    }
  });

  var r = function r(e) {
    for (var t = 0; t < e.length; t += 1) {
      this[t] = e[t];
    }

    return this.length = e.length, this;
  };

  function n(e, t) {
    var s = [],
        n = 0;
    if (e && !t && e instanceof r) return e;
    if (e) if ("string" == typeof e) {
      var o,
          l,
          d = e.trim();

      if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
        var h = "div";

        for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = i.createElement(h)).innerHTML = d, n = 0; n < l.childNodes.length; n += 1) {
          s.push(l.childNodes[n]);
        }
      } else for (o = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || i).querySelectorAll(e.trim()) : [i.getElementById(e.trim().split("#")[1])], n = 0; n < o.length; n += 1) {
        o[n] && s.push(o[n]);
      }
    } else if (e.nodeType || e === a || e === i) s.push(e);else if (e.length > 0 && e[0].nodeType) for (n = 0; n < e.length; n += 1) {
      s.push(e[n]);
    }
    return new r(s);
  }

  function o(e) {
    for (var t = [], i = 0; i < e.length; i += 1) {
      -1 === t.indexOf(e[i]) && t.push(e[i]);
    }

    return t;
  }

  n.fn = r.prototype, n.Class = r, n.Dom7 = r;
  var l = {
    addClass: function addClass(e) {
      if (void 0 === e) return this;

      for (var t = e.split(" "), i = 0; i < t.length; i += 1) {
        for (var s = 0; s < this.length; s += 1) {
          void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
        }
      }

      return this;
    },
    removeClass: function removeClass(e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1) {
        for (var s = 0; s < this.length; s += 1) {
          void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
        }
      }

      return this;
    },
    hasClass: function hasClass(e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function toggleClass(e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1) {
        for (var s = 0; s < this.length; s += 1) {
          void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
        }
      }

      return this;
    },
    attr: function attr(e, t) {
      var i = arguments;
      if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;

      for (var s = 0; s < this.length; s += 1) {
        if (2 === i.length) this[s].setAttribute(e, t);else for (var a in e) {
          this[s][a] = e[a], this[s].setAttribute(a, e[a]);
        }
      }

      return this;
    },
    removeAttr: function removeAttr(e) {
      for (var t = 0; t < this.length; t += 1) {
        this[t].removeAttribute(e);
      }

      return this;
    },
    data: function data(e, t) {
      var i;

      if (void 0 !== t) {
        for (var s = 0; s < this.length; s += 1) {
          (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
        }

        return this;
      }

      if (i = this[0]) {
        if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
        var a = i.getAttribute("data-" + e);
        return a || void 0;
      }
    },
    transform: function transform(e) {
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        i.webkitTransform = e, i.transform = e;
      }

      return this;
    },
    transition: function transition(e) {
      "string" != typeof e && (e += "ms");

      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        i.webkitTransitionDuration = e, i.transitionDuration = e;
      }

      return this;
    },
    on: function on() {
      for (var e, t = [], i = arguments.length; i--;) {
        t[i] = arguments[i];
      }

      var s = t[0],
          a = t[1],
          r = t[2],
          o = t[3];

      function l(e) {
        var t = e.target;

        if (t) {
          var i = e.target.dom7EventData || [];
          if (i.indexOf(e) < 0 && i.unshift(e), n(t).is(a)) r.apply(t, i);else for (var s = n(t).parents(), o = 0; o < s.length; o += 1) {
            n(s[o]).is(a) && r.apply(s[o], i);
          }
        }
      }

      function d(e) {
        var t = e && e.target && e.target.dom7EventData || [];
        t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
      }

      "function" == typeof t[1] && (s = (e = t)[0], r = e[1], o = e[2], a = void 0), o || (o = !1);

      for (var h, p = s.split(" "), c = 0; c < this.length; c += 1) {
        var u = this[c];
        if (a) for (h = 0; h < p.length; h += 1) {
          var v = p[h];
          u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []), u.dom7LiveListeners[v].push({
            listener: r,
            proxyListener: l
          }), u.addEventListener(v, l, o);
        } else for (h = 0; h < p.length; h += 1) {
          var f = p[h];
          u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[f] || (u.dom7Listeners[f] = []), u.dom7Listeners[f].push({
            listener: r,
            proxyListener: d
          }), u.addEventListener(f, d, o);
        }
      }

      return this;
    },
    off: function off() {
      for (var e, t = [], i = arguments.length; i--;) {
        t[i] = arguments[i];
      }

      var s = t[0],
          a = t[1],
          r = t[2],
          n = t[3];
      "function" == typeof t[1] && (s = (e = t)[0], r = e[1], n = e[2], a = void 0), n || (n = !1);

      for (var o = s.split(" "), l = 0; l < o.length; l += 1) {
        for (var d = o[l], h = 0; h < this.length; h += 1) {
          var p = this[h],
              c = void 0;
          if (!a && p.dom7Listeners ? c = p.dom7Listeners[d] : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]), c && c.length) for (var u = c.length - 1; u >= 0; u -= 1) {
            var v = c[u];
            r && v.listener === r || r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r || (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1));
          }
        }
      }

      return this;
    },
    trigger: function trigger() {
      for (var e = [], t = arguments.length; t--;) {
        e[t] = arguments[t];
      }

      for (var s = e[0].split(" "), r = e[1], n = 0; n < s.length; n += 1) {
        for (var o = s[n], l = 0; l < this.length; l += 1) {
          var d = this[l],
              h = void 0;

          try {
            h = new a.CustomEvent(o, {
              detail: r,
              bubbles: !0,
              cancelable: !0
            });
          } catch (e) {
            (h = i.createEvent("Event")).initEvent(o, !0, !0), h.detail = r;
          }

          d.dom7EventData = e.filter(function (e, t) {
            return t > 0;
          }), d.dispatchEvent(h), d.dom7EventData = [], delete d.dom7EventData;
        }
      }

      return this;
    },
    transitionEnd: function transitionEnd(e) {
      var t,
          i = ["webkitTransitionEnd", "transitionend"],
          s = this;

      function a(r) {
        if (r.target === this) for (e.call(this, r), t = 0; t < i.length; t += 1) {
          s.off(i[t], a);
        }
      }

      if (e) for (t = 0; t < i.length; t += 1) {
        s.on(i[t], a);
      }
      return this;
    },
    outerWidth: function outerWidth(e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"));
        }

        return this[0].offsetWidth;
      }

      return null;
    },
    outerHeight: function outerHeight(e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"));
        }

        return this[0].offsetHeight;
      }

      return null;
    },
    offset: function offset() {
      if (this.length > 0) {
        var e = this[0],
            t = e.getBoundingClientRect(),
            s = i.body,
            r = e.clientTop || s.clientTop || 0,
            n = e.clientLeft || s.clientLeft || 0,
            o = e === a ? a.scrollY : e.scrollTop,
            l = e === a ? a.scrollX : e.scrollLeft;
        return {
          top: t.top + o - r,
          left: t.left + l - n
        };
      }

      return null;
    },
    css: function css(e, t) {
      var i;

      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1) {
            for (var s in e) {
              this[i].style[s] = e[s];
            }
          }

          return this;
        }

        if (this[0]) return a.getComputedStyle(this[0], null).getPropertyValue(e);
      }

      if (2 === arguments.length && "string" == typeof e) {
        for (i = 0; i < this.length; i += 1) {
          this[i].style[e] = t;
        }

        return this;
      }

      return this;
    },
    each: function each(e) {
      if (!e) return this;

      for (var t = 0; t < this.length; t += 1) {
        if (!1 === e.call(this[t], t, this[t])) return this;
      }

      return this;
    },
    html: function html(e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;

      for (var t = 0; t < this.length; t += 1) {
        this[t].innerHTML = e;
      }

      return this;
    },
    text: function text(e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;

      for (var t = 0; t < this.length; t += 1) {
        this[t].textContent = e;
      }

      return this;
    },
    is: function is(e) {
      var t,
          s,
          o = this[0];
      if (!o || void 0 === e) return !1;

      if ("string" == typeof e) {
        if (o.matches) return o.matches(e);
        if (o.webkitMatchesSelector) return o.webkitMatchesSelector(e);
        if (o.msMatchesSelector) return o.msMatchesSelector(e);

        for (t = n(e), s = 0; s < t.length; s += 1) {
          if (t[s] === o) return !0;
        }

        return !1;
      }

      if (e === i) return o === i;
      if (e === a) return o === a;

      if (e.nodeType || e instanceof r) {
        for (t = e.nodeType ? [e] : e, s = 0; s < t.length; s += 1) {
          if (t[s] === o) return !0;
        }

        return !1;
      }

      return !1;
    },
    index: function index() {
      var e,
          t = this[0];

      if (t) {
        for (e = 0; null !== (t = t.previousSibling);) {
          1 === t.nodeType && (e += 1);
        }

        return e;
      }
    },
    eq: function eq(e) {
      if (void 0 === e) return this;
      var t,
          i = this.length;
      return new r(e > i - 1 ? [] : e < 0 ? (t = i + e) < 0 ? [] : [this[t]] : [this[e]]);
    },
    append: function append() {
      for (var e, t = [], s = arguments.length; s--;) {
        t[s] = arguments[s];
      }

      for (var a = 0; a < t.length; a += 1) {
        e = t[a];

        for (var n = 0; n < this.length; n += 1) {
          if ("string" == typeof e) {
            var o = i.createElement("div");

            for (o.innerHTML = e; o.firstChild;) {
              this[n].appendChild(o.firstChild);
            }
          } else if (e instanceof r) for (var l = 0; l < e.length; l += 1) {
            this[n].appendChild(e[l]);
          } else this[n].appendChild(e);
        }
      }

      return this;
    },
    prepend: function prepend(e) {
      var t, s;

      for (t = 0; t < this.length; t += 1) {
        if ("string" == typeof e) {
          var a = i.createElement("div");

          for (a.innerHTML = e, s = a.childNodes.length - 1; s >= 0; s -= 1) {
            this[t].insertBefore(a.childNodes[s], this[t].childNodes[0]);
          }
        } else if (e instanceof r) for (s = 0; s < e.length; s += 1) {
          this[t].insertBefore(e[s], this[t].childNodes[0]);
        } else this[t].insertBefore(e, this[t].childNodes[0]);
      }

      return this;
    },
    next: function next(e) {
      return this.length > 0 ? e ? this[0].nextElementSibling && n(this[0].nextElementSibling).is(e) ? new r([this[0].nextElementSibling]) : new r([]) : this[0].nextElementSibling ? new r([this[0].nextElementSibling]) : new r([]) : new r([]);
    },
    nextAll: function nextAll(e) {
      var t = [],
          i = this[0];
      if (!i) return new r([]);

      for (; i.nextElementSibling;) {
        var s = i.nextElementSibling;
        e ? n(s).is(e) && t.push(s) : t.push(s), i = s;
      }

      return new r(t);
    },
    prev: function prev(e) {
      if (this.length > 0) {
        var t = this[0];
        return e ? t.previousElementSibling && n(t.previousElementSibling).is(e) ? new r([t.previousElementSibling]) : new r([]) : t.previousElementSibling ? new r([t.previousElementSibling]) : new r([]);
      }

      return new r([]);
    },
    prevAll: function prevAll(e) {
      var t = [],
          i = this[0];
      if (!i) return new r([]);

      for (; i.previousElementSibling;) {
        var s = i.previousElementSibling;
        e ? n(s).is(e) && t.push(s) : t.push(s), i = s;
      }

      return new r(t);
    },
    parent: function parent(e) {
      for (var t = [], i = 0; i < this.length; i += 1) {
        null !== this[i].parentNode && (e ? n(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
      }

      return n(o(t));
    },
    parents: function parents(e) {
      for (var t = [], i = 0; i < this.length; i += 1) {
        for (var s = this[i].parentNode; s;) {
          e ? n(s).is(e) && t.push(s) : t.push(s), s = s.parentNode;
        }
      }

      return n(o(t));
    },
    closest: function closest(e) {
      var t = this;
      return void 0 === e ? new r([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function find(e) {
      for (var t = [], i = 0; i < this.length; i += 1) {
        for (var s = this[i].querySelectorAll(e), a = 0; a < s.length; a += 1) {
          t.push(s[a]);
        }
      }

      return new r(t);
    },
    children: function children(e) {
      for (var t = [], i = 0; i < this.length; i += 1) {
        for (var s = this[i].childNodes, a = 0; a < s.length; a += 1) {
          e ? 1 === s[a].nodeType && n(s[a]).is(e) && t.push(s[a]) : 1 === s[a].nodeType && t.push(s[a]);
        }
      }

      return new r(o(t));
    },
    filter: function filter(e) {
      for (var t = [], i = 0; i < this.length; i += 1) {
        e.call(this[i], i, this[i]) && t.push(this[i]);
      }

      return new r(t);
    },
    remove: function remove() {
      for (var e = 0; e < this.length; e += 1) {
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      }

      return this;
    },
    add: function add() {
      for (var e = [], t = arguments.length; t--;) {
        e[t] = arguments[t];
      }

      var i,
          s,
          a = this;

      for (i = 0; i < e.length; i += 1) {
        var r = n(e[i]);

        for (s = 0; s < r.length; s += 1) {
          a[a.length] = r[s], a.length += 1;
        }
      }

      return a;
    },
    styles: function styles() {
      return this[0] ? a.getComputedStyle(this[0], null) : {};
    }
  };
  Object.keys(l).forEach(function (e) {
    n.fn[e] = n.fn[e] || l[e];
  });

  var d = {
    deleteProps: function deleteProps(e) {
      var t = e;
      Object.keys(t).forEach(function (e) {
        try {
          t[e] = null;
        } catch (e) {}

        try {
          delete t[e];
        } catch (e) {}
      });
    },
    nextTick: function nextTick(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(e, t) {
      var i, s, r;
      void 0 === t && (t = "x");
      var n = a.getComputedStyle(e, null);
      return a.WebKitCSSMatrix ? ((s = n.transform || n.webkitTransform).split(",").length > 6 && (s = s.split(", ").map(function (e) {
        return e.replace(",", ".");
      }).join(", ")), r = new a.WebKitCSSMatrix("none" === s ? "" : s)) : i = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (s = a.WebKitCSSMatrix ? r.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (s = a.WebKitCSSMatrix ? r.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), s || 0;
    },
    parseUrlQuery: function parseUrlQuery(e) {
      var t,
          i,
          s,
          r,
          n = {},
          o = e || a.location.href;
      if ("string" == typeof o && o.length) for (r = (i = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
        return "" !== e;
      })).length, t = 0; t < r; t += 1) {
        s = i[t].replace(/#\S+/g, "").split("="), n[decodeURIComponent(s[0])] = void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || "";
      }
      return n;
    },
    isObject: function isObject(e) {
      return "object" == _typeof(e) && null !== e && e.constructor && e.constructor === Object;
    },
    extend: function extend() {
      for (var e = [], t = arguments.length; t--;) {
        e[t] = arguments[t];
      }

      for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
        var a = e[s];
        if (null != a) for (var r = Object.keys(Object(a)), n = 0, o = r.length; n < o; n += 1) {
          var l = r[n],
              h = Object.getOwnPropertyDescriptor(a, l);
          void 0 !== h && h.enumerable && (d.isObject(i[l]) && d.isObject(a[l]) ? d.extend(i[l], a[l]) : !d.isObject(i[l]) && d.isObject(a[l]) ? (i[l] = {}, d.extend(i[l], a[l])) : i[l] = a[l]);
        }
      }

      return i;
    }
  },
      h = {
    touch: !!("ontouchstart" in a || a.DocumentTouch && i instanceof a.DocumentTouch),
    pointerEvents: !!a.PointerEvent && "maxTouchPoints" in a.navigator && a.navigator.maxTouchPoints >= 0,
    observer: "MutationObserver" in a || "WebkitMutationObserver" in a,
    passiveListener: function () {
      var e = !1;

      try {
        var t = Object.defineProperty({}, "passive", {
          get: function get() {
            e = !0;
          }
        });
        a.addEventListener("testPassiveListener", null, t);
      } catch (e) {}

      return e;
    }(),
    gestures: "ongesturestart" in a
  },
      p = function p(e) {
    void 0 === e && (e = {});
    var t = this;
    t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
      t.on(e, t.params.on[e]);
    });
  },
      c = {
    components: {
      configurable: !0
    }
  };

  p.prototype.on = function (e, t, i) {
    var s = this;
    if ("function" != typeof t) return s;
    var a = i ? "unshift" : "push";
    return e.split(" ").forEach(function (e) {
      s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t);
    }), s;
  }, p.prototype.once = function (e, t, i) {
    var s = this;
    if ("function" != typeof t) return s;

    function a() {
      for (var i = [], r = arguments.length; r--;) {
        i[r] = arguments[r];
      }

      s.off(e, a), a.f7proxy && delete a.f7proxy, t.apply(s, i);
    }

    return a.f7proxy = t, s.on(e, a, i);
  }, p.prototype.off = function (e, t) {
    var i = this;
    return i.eventsListeners ? (e.split(" ").forEach(function (e) {
      void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach(function (s, a) {
        (s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(a, 1);
      });
    }), i) : i;
  }, p.prototype.emit = function () {
    for (var e = [], t = arguments.length; t--;) {
      e[t] = arguments[t];
    }

    var i,
        s,
        a,
        r = this;
    if (!r.eventsListeners) return r;
    "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = r) : (i = e[0].events, s = e[0].data, a = e[0].context || r);
    var n = Array.isArray(i) ? i : i.split(" ");
    return n.forEach(function (e) {
      if (r.eventsListeners && r.eventsListeners[e]) {
        var t = [];
        r.eventsListeners[e].forEach(function (e) {
          t.push(e);
        }), t.forEach(function (e) {
          e.apply(a, s);
        });
      }
    }), r;
  }, p.prototype.useModulesParams = function (e) {
    var t = this;
    t.modules && Object.keys(t.modules).forEach(function (i) {
      var s = t.modules[i];
      s.params && d.extend(e, s.params);
    });
  }, p.prototype.useModules = function (e) {
    void 0 === e && (e = {});
    var t = this;
    t.modules && Object.keys(t.modules).forEach(function (i) {
      var s = t.modules[i],
          a = e[i] || {};
      s.instance && Object.keys(s.instance).forEach(function (e) {
        var i = s.instance[e];
        t[e] = "function" == typeof i ? i.bind(t) : i;
      }), s.on && t.on && Object.keys(s.on).forEach(function (e) {
        t.on(e, s.on[e]);
      }), s.create && s.create.bind(t)(a);
    });
  }, c.components.set = function (e) {
    this.use && this.use(e);
  }, p.installModule = function (e) {
    for (var t = [], i = arguments.length - 1; i-- > 0;) {
      t[i] = arguments[i + 1];
    }

    var s = this;
    s.prototype.modules || (s.prototype.modules = {});
    var a = e.name || Object.keys(s.prototype.modules).length + "_" + d.now();
    return s.prototype.modules[a] = e, e.proto && Object.keys(e.proto).forEach(function (t) {
      s.prototype[t] = e.proto[t];
    }), e.static && Object.keys(e.static).forEach(function (t) {
      s[t] = e.static[t];
    }), e.install && e.install.apply(s, t), s;
  }, p.use = function (e) {
    for (var t = [], i = arguments.length - 1; i-- > 0;) {
      t[i] = arguments[i + 1];
    }

    var s = this;
    return Array.isArray(e) ? (e.forEach(function (e) {
      return s.installModule(e);
    }), s) : s.installModule.apply(s, [e].concat(t));
  }, Object.defineProperties(p, c);
  var u = {
    updateSize: function updateSize() {
      var e,
          t,
          i = this.$el;
      e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), d.extend(this, {
        width: e,
        height: t,
        size: this.isHorizontal() ? e : t
      }));
    },
    updateSlides: function updateSlides() {
      var e = this.params,
          t = this.$wrapperEl,
          i = this.size,
          s = this.rtlTranslate,
          r = this.wrongRTL,
          n = this.virtual && e.virtual.enabled,
          o = n ? this.virtual.slides.length : this.slides.length,
          l = t.children("." + this.params.slideClass),
          h = n ? this.virtual.slides.length : l.length,
          p = [],
          c = [],
          u = [];

      function v(t) {
        return !e.cssMode || t !== l.length - 1;
      }

      var f = e.slidesOffsetBefore;
      "function" == typeof f && (f = e.slidesOffsetBefore.call(this));
      var m = e.slidesOffsetAfter;
      "function" == typeof m && (m = e.slidesOffsetAfter.call(this));
      var g = this.snapGrid.length,
          b = this.snapGrid.length,
          w = e.spaceBetween,
          y = -f,
          x = 0,
          E = 0;

      if (void 0 !== i) {
        var T, S;
        "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * i), this.virtualSize = -w, s ? l.css({
          marginLeft: "",
          marginTop: ""
        }) : l.css({
          marginRight: "",
          marginBottom: ""
        }), e.slidesPerColumn > 1 && (T = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (T = Math.max(T, e.slidesPerView * e.slidesPerColumn)));

        for (var C, M = e.slidesPerColumn, P = T / M, z = Math.floor(h / e.slidesPerColumn), k = 0; k < h; k += 1) {
          S = 0;
          var $ = l.eq(k);

          if (e.slidesPerColumn > 1) {
            var L = void 0,
                I = void 0,
                O = void 0;

            if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
              var D = Math.floor(k / (e.slidesPerGroup * e.slidesPerColumn)),
                  A = k - e.slidesPerColumn * e.slidesPerGroup * D,
                  G = 0 === D ? e.slidesPerGroup : Math.min(Math.ceil((h - D * M * e.slidesPerGroup) / M), e.slidesPerGroup);
              L = (I = A - (O = Math.floor(A / G)) * G + D * e.slidesPerGroup) + O * T / M, $.css({
                "-webkit-box-ordinal-group": L,
                "-moz-box-ordinal-group": L,
                "-ms-flex-order": L,
                "-webkit-order": L,
                order: L
              });
            } else "column" === e.slidesPerColumnFill ? (O = k - (I = Math.floor(k / M)) * M, (I > z || I === z && O === M - 1) && (O += 1) >= M && (O = 0, I += 1)) : I = k - (O = Math.floor(k / P)) * P;

            $.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== O && e.spaceBetween && e.spaceBetween + "px");
          }

          if ("none" !== $.css("display")) {
            if ("auto" === e.slidesPerView) {
              var H = a.getComputedStyle($[0], null),
                  B = $[0].style.transform,
                  N = $[0].style.webkitTransform;
              if (B && ($[0].style.transform = "none"), N && ($[0].style.webkitTransform = "none"), e.roundLengths) S = this.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0);else if (this.isHorizontal()) {
                var X = parseFloat(H.getPropertyValue("width")),
                    V = parseFloat(H.getPropertyValue("padding-left")),
                    Y = parseFloat(H.getPropertyValue("padding-right")),
                    F = parseFloat(H.getPropertyValue("margin-left")),
                    W = parseFloat(H.getPropertyValue("margin-right")),
                    R = H.getPropertyValue("box-sizing");
                S = R && "border-box" === R ? X + F + W : X + V + Y + F + W;
              } else {
                var q = parseFloat(H.getPropertyValue("height")),
                    j = parseFloat(H.getPropertyValue("padding-top")),
                    K = parseFloat(H.getPropertyValue("padding-bottom")),
                    U = parseFloat(H.getPropertyValue("margin-top")),
                    _ = parseFloat(H.getPropertyValue("margin-bottom")),
                    Z = H.getPropertyValue("box-sizing");

                S = Z && "border-box" === Z ? q + U + _ : q + j + K + U + _;
              }
              B && ($[0].style.transform = B), N && ($[0].style.webkitTransform = N), e.roundLengths && (S = Math.floor(S));
            } else S = (i - (e.slidesPerView - 1) * w) / e.slidesPerView, e.roundLengths && (S = Math.floor(S)), l[k] && (this.isHorizontal() ? l[k].style.width = S + "px" : l[k].style.height = S + "px");

            l[k] && (l[k].swiperSlideSize = S), u.push(S), e.centeredSlides ? (y = y + S / 2 + x / 2 + w, 0 === x && 0 !== k && (y = y - i / 2 - w), 0 === k && (y = y - i / 2 - w), Math.abs(y) < .001 && (y = 0), e.roundLengths && (y = Math.floor(y)), E % e.slidesPerGroup == 0 && p.push(y), c.push(y)) : (e.roundLengths && (y = Math.floor(y)), (E - Math.min(this.params.slidesPerGroupSkip, E)) % this.params.slidesPerGroup == 0 && p.push(y), c.push(y), y = y + S + w), this.virtualSize += S + w, x = S, E += 1;
          }
        }

        if (this.virtualSize = Math.max(this.virtualSize, i) + m, s && r && ("slide" === e.effect || "coverflow" === e.effect) && t.css({
          width: this.virtualSize + e.spaceBetween + "px"
        }), e.setWrapperSize && (this.isHorizontal() ? t.css({
          width: this.virtualSize + e.spaceBetween + "px"
        }) : t.css({
          height: this.virtualSize + e.spaceBetween + "px"
        })), e.slidesPerColumn > 1 && (this.virtualSize = (S + e.spaceBetween) * T, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? t.css({
          width: this.virtualSize + e.spaceBetween + "px"
        }) : t.css({
          height: this.virtualSize + e.spaceBetween + "px"
        }), e.centeredSlides)) {
          C = [];

          for (var Q = 0; Q < p.length; Q += 1) {
            var J = p[Q];
            e.roundLengths && (J = Math.floor(J)), p[Q] < this.virtualSize + p[0] && C.push(J);
          }

          p = C;
        }

        if (!e.centeredSlides) {
          C = [];

          for (var ee = 0; ee < p.length; ee += 1) {
            var te = p[ee];
            e.roundLengths && (te = Math.floor(te)), p[ee] <= this.virtualSize - i && C.push(te);
          }

          p = C, Math.floor(this.virtualSize - i) - Math.floor(p[p.length - 1]) > 1 && p.push(this.virtualSize - i);
        }

        if (0 === p.length && (p = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? s ? l.filter(v).css({
          marginLeft: w + "px"
        }) : l.filter(v).css({
          marginRight: w + "px"
        }) : l.filter(v).css({
          marginBottom: w + "px"
        })), e.centeredSlides && e.centeredSlidesBounds) {
          var ie = 0;
          u.forEach(function (t) {
            ie += t + (e.spaceBetween ? e.spaceBetween : 0);
          });
          var se = (ie -= e.spaceBetween) - i;
          p = p.map(function (e) {
            return e < 0 ? -f : e > se ? se + m : e;
          });
        }

        if (e.centerInsufficientSlides) {
          var ae = 0;

          if (u.forEach(function (t) {
            ae += t + (e.spaceBetween ? e.spaceBetween : 0);
          }), (ae -= e.spaceBetween) < i) {
            var re = (i - ae) / 2;
            p.forEach(function (e, t) {
              p[t] = e - re;
            }), c.forEach(function (e, t) {
              c[t] = e + re;
            });
          }
        }

        d.extend(this, {
          slides: l,
          snapGrid: p,
          slidesGrid: c,
          slidesSizesGrid: u
        }), h !== o && this.emit("slidesLengthChange"), p.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), c.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset();
      }
    },
    updateAutoHeight: function updateAutoHeight(e) {
      var t,
          i = [],
          s = 0;
      if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) {
        if (this.params.centeredSlides) this.visibleSlides.each(function (e, t) {
          i.push(t);
        });else for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
          var a = this.activeIndex + t;
          if (a > this.slides.length) break;
          i.push(this.slides.eq(a)[0]);
        }
      } else i.push(this.slides.eq(this.activeIndex)[0]);

      for (t = 0; t < i.length; t += 1) {
        if (void 0 !== i[t]) {
          var r = i[t].offsetHeight;
          s = r > s ? r : s;
        }
      }

      s && this.$wrapperEl.css("height", s + "px");
    },
    updateSlidesOffset: function updateSlidesOffset() {
      for (var e = this.slides, t = 0; t < e.length; t += 1) {
        e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop;
      }
    },
    updateSlidesProgress: function updateSlidesProgress(e) {
      void 0 === e && (e = this && this.translate || 0);
      var t = this.params,
          i = this.slides,
          s = this.rtlTranslate;

      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
        var a = -e;
        s && (a = e), i.removeClass(t.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = [];

        for (var r = 0; r < i.length; r += 1) {
          var o = i[r],
              l = (a + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);

          if (t.watchSlidesVisibility || t.centeredSlides && t.autoHeight) {
            var d = -(a - o.swiperSlideOffset),
                h = d + this.slidesSizesGrid[r];
            (d >= 0 && d < this.size - 1 || h > 1 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(r), i.eq(r).addClass(t.slideVisibleClass));
          }

          o.progress = s ? -l : l;
        }

        this.visibleSlides = n(this.visibleSlides);
      }
    },
    updateProgress: function updateProgress(e) {
      if (void 0 === e) {
        var t = this.rtlTranslate ? -1 : 1;
        e = this && this.translate && this.translate * t || 0;
      }

      var i = this.params,
          s = this.maxTranslate() - this.minTranslate(),
          a = this.progress,
          r = this.isBeginning,
          n = this.isEnd,
          o = r,
          l = n;
      0 === s ? (a = 0, r = !0, n = !0) : (r = (a = (e - this.minTranslate()) / s) <= 0, n = a >= 1), d.extend(this, {
        progress: a,
        isBeginning: r,
        isEnd: n
      }), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && this.updateSlidesProgress(e), r && !o && this.emit("reachBeginning toEdge"), n && !l && this.emit("reachEnd toEdge"), (o && !r || l && !n) && this.emit("fromEdge"), this.emit("progress", a);
    },
    updateSlidesClasses: function updateSlidesClasses() {
      var e,
          t = this.slides,
          i = this.params,
          s = this.$wrapperEl,
          a = this.activeIndex,
          r = this.realIndex,
          n = this.virtual && i.virtual.enabled;
      t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
      var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
      var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
      i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass));
    },
    updateActiveIndex: function updateActiveIndex(e) {
      var t,
          i = this.rtlTranslate ? this.translate : -this.translate,
          s = this.slidesGrid,
          a = this.snapGrid,
          r = this.params,
          n = this.activeIndex,
          o = this.realIndex,
          l = this.snapIndex,
          h = e;

      if (void 0 === h) {
        for (var p = 0; p < s.length; p += 1) {
          void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p);
        }

        r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0);
      }

      if (a.indexOf(i) >= 0) t = a.indexOf(i);else {
        var c = Math.min(r.slidesPerGroupSkip, h);
        t = c + Math.floor((h - c) / r.slidesPerGroup);
      }

      if (t >= a.length && (t = a.length - 1), h !== n) {
        var u = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
        d.extend(this, {
          snapIndex: t,
          realIndex: u,
          previousIndex: n,
          activeIndex: h
        }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), o !== u && this.emit("realIndexChange"), (this.initialized || this.params.runCallbacksOnInit) && this.emit("slideChange");
      } else t !== l && (this.snapIndex = t, this.emit("snapIndexChange"));
    },
    updateClickedSlide: function updateClickedSlide(e) {
      var t = this.params,
          i = n(e.target).closest("." + t.slideClass)[0],
          s = !1;
      if (i) for (var a = 0; a < this.slides.length; a += 1) {
        this.slides[a] === i && (s = !0);
      }
      if (!i || !s) return this.clickedSlide = void 0, void (this.clickedIndex = void 0);
      this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(n(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = n(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide();
    }
  };
  var v = {
    getTranslate: function getTranslate(e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      var t = this.params,
          i = this.rtlTranslate,
          s = this.translate,
          a = this.$wrapperEl;
      if (t.virtualTranslate) return i ? -s : s;
      if (t.cssMode) return s;
      var r = d.getTranslate(a[0], e);
      return i && (r = -r), r || 0;
    },
    setTranslate: function setTranslate(e, t) {
      var i = this.rtlTranslate,
          s = this.params,
          a = this.$wrapperEl,
          r = this.wrapperEl,
          n = this.progress,
          o = 0,
          l = 0;
      this.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.cssMode ? r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l : s.virtualTranslate || a.transform("translate3d(" + o + "px, " + l + "px, 0px)"), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? o : l;
      var d = this.maxTranslate() - this.minTranslate();
      (0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e), this.emit("setTranslate", this.translate, t);
    },
    minTranslate: function minTranslate() {
      return -this.snapGrid[0];
    },
    maxTranslate: function maxTranslate() {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function translateTo(e, t, i, s, a) {
      var r;
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
      var n = this,
          o = n.params,
          l = n.wrapperEl;
      if (n.animating && o.preventInteractionOnTransition) return !1;
      var d,
          h = n.minTranslate(),
          p = n.maxTranslate();

      if (d = s && e > h ? h : s && e < p ? p : e, n.updateProgress(d), o.cssMode) {
        var c = n.isHorizontal();
        return 0 === t ? l[c ? "scrollLeft" : "scrollTop"] = -d : l.scrollTo ? l.scrollTo(((r = {})[c ? "left" : "top"] = -d, r.behavior = "smooth", r)) : l[c ? "scrollLeft" : "scrollTop"] = -d, !0;
      }

      return 0 === t ? (n.setTransition(0), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function (e) {
        n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, i && n.emit("transitionEnd"));
      }), n.$wrapperEl[0].addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd))), !0;
    }
  };
  var f = {
    setTransition: function setTransition(e, t) {
      this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
    },
    transitionStart: function transitionStart(e, t) {
      void 0 === e && (e = !0);
      var i = this.activeIndex,
          s = this.params,
          a = this.previousIndex;

      if (!s.cssMode) {
        s.autoHeight && this.updateAutoHeight();
        var r = t;

        if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a) {
          if ("reset" === r) return void this.emit("slideResetTransitionStart");
          this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart");
        }
      }
    },
    transitionEnd: function transitionEnd(e, t) {
      void 0 === e && (e = !0);
      var i = this.activeIndex,
          s = this.previousIndex,
          a = this.params;

      if (this.animating = !1, !a.cssMode) {
        this.setTransition(0);
        var r = t;

        if (r || (r = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) {
          if ("reset" === r) return void this.emit("slideResetTransitionEnd");
          this.emit("slideChangeTransitionEnd"), "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd");
        }
      }
    }
  };
  var m = {
    slideTo: function slideTo(e, t, i, s) {
      var a;
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
      var r = this,
          n = e;
      n < 0 && (n = 0);
      var o = r.params,
          l = r.snapGrid,
          d = r.slidesGrid,
          h = r.previousIndex,
          p = r.activeIndex,
          c = r.rtlTranslate,
          u = r.wrapperEl;
      if (r.animating && o.preventInteractionOnTransition) return !1;
      var v = Math.min(r.params.slidesPerGroupSkip, n),
          f = v + Math.floor((n - v) / r.params.slidesPerGroup);
      f >= l.length && (f = l.length - 1), (p || o.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart");
      var m,
          g = -l[f];
      if (r.updateProgress(g), o.normalizeSlideIndex) for (var b = 0; b < d.length; b += 1) {
        -Math.floor(100 * g) >= Math.floor(100 * d[b]) && (n = b);
      }

      if (r.initialized && n !== p) {
        if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1;
        if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (p || 0) !== n) return !1;
      }

      if (m = n > p ? "next" : n < p ? "prev" : "reset", c && -g === r.translate || !c && g === r.translate) return r.updateActiveIndex(n), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(g), "reset" !== m && (r.transitionStart(i, m), r.transitionEnd(i, m)), !1;

      if (o.cssMode) {
        var w = r.isHorizontal(),
            y = -g;
        return c && (y = u.scrollWidth - u.offsetWidth - y), 0 === t ? u[w ? "scrollLeft" : "scrollTop"] = y : u.scrollTo ? u.scrollTo(((a = {})[w ? "left" : "top"] = y, a.behavior = "smooth", a)) : u[w ? "scrollLeft" : "scrollTop"] = y, !0;
      }

      return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, m), r.transitionEnd(i, m)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, m), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, m));
      }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0;
    },
    slideToLoop: function slideToLoop(e, t, i, s) {
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
      var a = e;
      return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s);
    },
    slideNext: function slideNext(e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.params,
          a = this.animating,
          r = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;

      if (s.loop) {
        if (a) return !1;
        this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft;
      }

      return this.slideTo(this.activeIndex + r, e, t, i);
    },
    slidePrev: function slidePrev(e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.params,
          a = this.animating,
          r = this.snapGrid,
          n = this.slidesGrid,
          o = this.rtlTranslate;

      if (s.loop) {
        if (a) return !1;
        this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft;
      }

      function l(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }

      var d,
          h = l(o ? this.translate : -this.translate),
          p = r.map(function (e) {
        return l(e);
      }),
          c = (n.map(function (e) {
        return l(e);
      }), r[p.indexOf(h)], r[p.indexOf(h) - 1]);
      return void 0 === c && s.cssMode && r.forEach(function (e) {
        !c && h >= e && (c = e);
      }), void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1), this.slideTo(d, e, t, i);
    },
    slideReset: function slideReset(e, t, i) {
      return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i);
    },
    slideToClosest: function slideToClosest(e, t, i, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = .5);
      var a = this.activeIndex,
          r = Math.min(this.params.slidesPerGroupSkip, a),
          n = r + Math.floor((a - r) / this.params.slidesPerGroup),
          o = this.rtlTranslate ? this.translate : -this.translate;

      if (o >= this.snapGrid[n]) {
        var l = this.snapGrid[n];
        o - l > (this.snapGrid[n + 1] - l) * s && (a += this.params.slidesPerGroup);
      } else {
        var d = this.snapGrid[n - 1];
        o - d <= (this.snapGrid[n] - d) * s && (a -= this.params.slidesPerGroup);
      }

      return a = Math.max(a, 0), a = Math.min(a, this.slidesGrid.length - 1), this.slideTo(a, e, t, i);
    },
    slideToClickedSlide: function slideToClickedSlide() {
      var e,
          t = this,
          i = t.params,
          s = t.$wrapperEl,
          a = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
          r = t.clickedIndex;

      if (i.loop) {
        if (t.animating) return;
        e = parseInt(n(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? r < t.loopedSlides - a / 2 || r > t.slides.length - t.loopedSlides + a / 2 ? (t.loopFix(), r = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), d.nextTick(function () {
          t.slideTo(r);
        })) : t.slideTo(r) : r > t.slides.length - a ? (t.loopFix(), r = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), d.nextTick(function () {
          t.slideTo(r);
        })) : t.slideTo(r);
      } else t.slideTo(r);
    }
  };
  var g = {
    loopCreate: function loopCreate() {
      var e = this,
          t = e.params,
          s = e.$wrapperEl;
      s.children("." + t.slideClass + "." + t.slideDuplicateClass).remove();
      var a = s.children("." + t.slideClass);

      if (t.loopFillGroupWithBlank) {
        var r = t.slidesPerGroup - a.length % t.slidesPerGroup;

        if (r !== t.slidesPerGroup) {
          for (var o = 0; o < r; o += 1) {
            var l = n(i.createElement("div")).addClass(t.slideClass + " " + t.slideBlankClass);
            s.append(l);
          }

          a = s.children("." + t.slideClass);
        }
      }

      "auto" !== t.slidesPerView || t.loopedSlides || (t.loopedSlides = a.length), e.loopedSlides = Math.ceil(parseFloat(t.loopedSlides || t.slidesPerView, 10)), e.loopedSlides += t.loopAdditionalSlides, e.loopedSlides > a.length && (e.loopedSlides = a.length);
      var d = [],
          h = [];
      a.each(function (t, i) {
        var s = n(i);
        t < e.loopedSlides && h.push(i), t < a.length && t >= a.length - e.loopedSlides && d.push(i), s.attr("data-swiper-slide-index", t);
      });

      for (var p = 0; p < h.length; p += 1) {
        s.append(n(h[p].cloneNode(!0)).addClass(t.slideDuplicateClass));
      }

      for (var c = d.length - 1; c >= 0; c -= 1) {
        s.prepend(n(d[c].cloneNode(!0)).addClass(t.slideDuplicateClass));
      }
    },
    loopFix: function loopFix() {
      this.emit("beforeLoopFix");
      var e,
          t = this.activeIndex,
          i = this.slides,
          s = this.loopedSlides,
          a = this.allowSlidePrev,
          r = this.allowSlideNext,
          n = this.snapGrid,
          o = this.rtlTranslate;
      this.allowSlidePrev = !0, this.allowSlideNext = !0;
      var l = -n[t] - this.getTranslate();
      if (t < s) e = i.length - 3 * s + t, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l);else if (t >= i.length - s) {
        e = -i.length + t + s, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l);
      }
      this.allowSlidePrev = a, this.allowSlideNext = r, this.emit("loopFix");
    },
    loopDestroy: function loopDestroy() {
      var e = this.$wrapperEl,
          t = this.params,
          i = this.slides;
      e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index");
    }
  };
  var b = {
    setGrabCursor: function setGrabCursor(e) {
      if (!(h.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
        var t = this.el;
        t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab";
      }
    },
    unsetGrabCursor: function unsetGrabCursor() {
      h.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "");
    }
  };
  var w,
      y,
      x,
      E,
      T,
      S,
      C,
      M,
      P,
      z,
      k,
      $,
      L,
      I,
      O,
      D = {
    appendSlide: function appendSlide(e) {
      var t = this.$wrapperEl,
          i = this.params;
      if (i.loop && this.loopDestroy(), "object" == _typeof(e) && "length" in e) for (var s = 0; s < e.length; s += 1) {
        e[s] && t.append(e[s]);
      } else t.append(e);
      i.loop && this.loopCreate(), i.observer && h.observer || this.update();
    },
    prependSlide: function prependSlide(e) {
      var t = this.params,
          i = this.$wrapperEl,
          s = this.activeIndex;
      t.loop && this.loopDestroy();
      var a = s + 1;

      if ("object" == _typeof(e) && "length" in e) {
        for (var r = 0; r < e.length; r += 1) {
          e[r] && i.prepend(e[r]);
        }

        a = s + e.length;
      } else i.prepend(e);

      t.loop && this.loopCreate(), t.observer && h.observer || this.update(), this.slideTo(a, 0, !1);
    },
    addSlide: function addSlide(e, t) {
      var i = this.$wrapperEl,
          s = this.params,
          a = this.activeIndex;
      s.loop && (a -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass));
      var r = this.slides.length;
      if (e <= 0) this.prependSlide(t);else if (e >= r) this.appendSlide(t);else {
        for (var n = a > e ? a + 1 : a, o = [], l = r - 1; l >= e; l -= 1) {
          var d = this.slides.eq(l);
          d.remove(), o.unshift(d);
        }

        if ("object" == _typeof(t) && "length" in t) {
          for (var p = 0; p < t.length; p += 1) {
            t[p] && i.append(t[p]);
          }

          n = a > e ? a + t.length : a;
        } else i.append(t);

        for (var c = 0; c < o.length; c += 1) {
          i.append(o[c]);
        }

        s.loop && this.loopCreate(), s.observer && h.observer || this.update(), s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1);
      }
    },
    removeSlide: function removeSlide(e) {
      var t = this.params,
          i = this.$wrapperEl,
          s = this.activeIndex;
      t.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass));
      var a,
          r = s;

      if ("object" == _typeof(e) && "length" in e) {
        for (var n = 0; n < e.length; n += 1) {
          a = e[n], this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
        }

        r = Math.max(r, 0);
      } else a = e, this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0);

      t.loop && this.loopCreate(), t.observer && h.observer || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1);
    },
    removeAllSlides: function removeAllSlides() {
      for (var e = [], t = 0; t < this.slides.length; t += 1) {
        e.push(t);
      }

      this.removeSlide(e);
    }
  },
      A = (w = a.navigator.platform, y = a.navigator.userAgent, x = {
    ios: !1,
    android: !1,
    androidChrome: !1,
    desktop: !1,
    iphone: !1,
    ipod: !1,
    ipad: !1,
    edge: !1,
    ie: !1,
    firefox: !1,
    macos: !1,
    windows: !1,
    cordova: !(!a.cordova && !a.phonegap),
    phonegap: !(!a.cordova && !a.phonegap),
    electron: !1
  }, E = a.screen.width, T = a.screen.height, S = y.match(/(Android);?[\s\/]+([\d.]+)?/), C = y.match(/(iPad).*OS\s([\d_]+)/), M = y.match(/(iPod)(.*OS\s([\d_]+))?/), P = !C && y.match(/(iPhone\sOS|iOS)\s([\d_]+)/), z = y.indexOf("MSIE ") >= 0 || y.indexOf("Trident/") >= 0, k = y.indexOf("Edge/") >= 0, $ = y.indexOf("Gecko/") >= 0 && y.indexOf("Firefox/") >= 0, L = "Win32" === w, I = y.toLowerCase().indexOf("electron") >= 0, O = "MacIntel" === w, !C && O && h.touch && (1024 === E && 1366 === T || 834 === E && 1194 === T || 834 === E && 1112 === T || 768 === E && 1024 === T) && (C = y.match(/(Version)\/([\d.]+)/), O = !1), x.ie = z, x.edge = k, x.firefox = $, S && !L && (x.os = "android", x.osVersion = S[2], x.android = !0, x.androidChrome = y.toLowerCase().indexOf("chrome") >= 0), (C || P || M) && (x.os = "ios", x.ios = !0), P && !M && (x.osVersion = P[2].replace(/_/g, "."), x.iphone = !0), C && (x.osVersion = C[2].replace(/_/g, "."), x.ipad = !0), M && (x.osVersion = M[3] ? M[3].replace(/_/g, ".") : null, x.ipod = !0), x.ios && x.osVersion && y.indexOf("Version/") >= 0 && "10" === x.osVersion.split(".")[0] && (x.osVersion = y.toLowerCase().split("version/")[1].split(" ")[0]), x.webView = !(!(P || C || M) || !y.match(/.*AppleWebKit(?!.*Safari)/i) && !a.navigator.standalone) || a.matchMedia && a.matchMedia("(display-mode: standalone)").matches, x.webview = x.webView, x.standalone = x.webView, x.desktop = !(x.ios || x.android) || I, x.desktop && (x.electron = I, x.macos = O, x.windows = L, x.macos && (x.os = "macos"), x.windows && (x.os = "windows")), x.pixelRatio = a.devicePixelRatio || 1, x);

  function G(e) {
    var t = this.touchEventsData,
        s = this.params,
        r = this.touches;

    if (!this.animating || !s.preventInteractionOnTransition) {
      var o = e;
      o.originalEvent && (o = o.originalEvent);
      var l = n(o.target);
      if (("wrapper" !== s.touchEventsTarget || l.closest(this.wrapperEl).length) && (t.isTouchEvent = "touchstart" === o.type, (t.isTouchEvent || !("which" in o) || 3 !== o.which) && !(!t.isTouchEvent && "button" in o && o.button > 0 || t.isTouched && t.isMoved))) if (s.noSwiping && l.closest(s.noSwipingSelector ? s.noSwipingSelector : "." + s.noSwipingClass)[0]) this.allowClick = !0;else if (!s.swipeHandler || l.closest(s.swipeHandler)[0]) {
        r.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX, r.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY;
        var h = r.currentX,
            p = r.currentY,
            c = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
            u = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;

        if (!c || !(h <= u || h >= a.screen.width - u)) {
          if (d.extend(t, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0
          }), r.startX = h, r.startY = p, t.touchStartTime = d.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, s.threshold > 0 && (t.allowThresholdMove = !1), "touchstart" !== o.type) {
            var v = !0;
            l.is(t.formElements) && (v = !1), i.activeElement && n(i.activeElement).is(t.formElements) && i.activeElement !== l[0] && i.activeElement.blur();
            var f = v && this.allowTouchMove && s.touchStartPreventDefault;
            (s.touchStartForcePreventDefault || f) && o.preventDefault();
          }

          this.emit("touchStart", o);
        }
      }
    }
  }

  function H(e) {
    var t = this.touchEventsData,
        s = this.params,
        a = this.touches,
        r = this.rtlTranslate,
        o = e;

    if (o.originalEvent && (o = o.originalEvent), t.isTouched) {
      if (!t.isTouchEvent || "touchmove" === o.type) {
        var l = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]),
            h = "touchmove" === o.type ? l.pageX : o.pageX,
            p = "touchmove" === o.type ? l.pageY : o.pageY;
        if (o.preventedByNestedSwiper) return a.startX = h, void (a.startY = p);
        if (!this.allowTouchMove) return this.allowClick = !1, void (t.isTouched && (d.extend(a, {
          startX: h,
          startY: p,
          currentX: h,
          currentY: p
        }), t.touchStartTime = d.now()));
        if (t.isTouchEvent && s.touchReleaseOnEdges && !s.loop) if (this.isVertical()) {
          if (p < a.startY && this.translate <= this.maxTranslate() || p > a.startY && this.translate >= this.minTranslate()) return t.isTouched = !1, void (t.isMoved = !1);
        } else if (h < a.startX && this.translate <= this.maxTranslate() || h > a.startX && this.translate >= this.minTranslate()) return;
        if (t.isTouchEvent && i.activeElement && o.target === i.activeElement && n(o.target).is(t.formElements)) return t.isMoved = !0, void (this.allowClick = !1);

        if (t.allowTouchCallbacks && this.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
          a.currentX = h, a.currentY = p;
          var c = a.currentX - a.startX,
              u = a.currentY - a.startY;

          if (!(this.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold)) {
            var v;
            if (void 0 === t.isScrolling) this.isHorizontal() && a.currentY === a.startY || this.isVertical() && a.currentX === a.startX ? t.isScrolling = !1 : c * c + u * u >= 25 && (v = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI, t.isScrolling = this.isHorizontal() ? v > s.touchAngle : 90 - v > s.touchAngle);
            if (t.isScrolling && this.emit("touchMoveOpposite", o), void 0 === t.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (t.startMoving = !0)), t.isScrolling) t.isTouched = !1;else if (t.startMoving) {
              this.allowClick = !1, !s.cssMode && o.cancelable && o.preventDefault(), s.touchMoveStopPropagation && !s.nested && o.stopPropagation(), t.isMoved || (s.loop && this.loopFix(), t.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), t.allowMomentumBounce = !1, !s.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", o)), this.emit("sliderMove", o), t.isMoved = !0;
              var f = this.isHorizontal() ? c : u;
              a.diff = f, f *= s.touchRatio, r && (f = -f), this.swipeDirection = f > 0 ? "prev" : "next", t.currentTranslate = f + t.startTranslate;
              var m = !0,
                  g = s.resistanceRatio;

              if (s.touchReleaseOnEdges && (g = 0), f > 0 && t.currentTranslate > this.minTranslate() ? (m = !1, s.resistance && (t.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + t.startTranslate + f, g))) : f < 0 && t.currentTranslate < this.maxTranslate() && (m = !1, s.resistance && (t.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - t.startTranslate - f, g))), m && (o.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && t.currentTranslate < t.startTranslate && (t.currentTranslate = t.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && t.currentTranslate > t.startTranslate && (t.currentTranslate = t.startTranslate), s.threshold > 0) {
                if (!(Math.abs(f) > s.threshold || t.allowThresholdMove)) return void (t.currentTranslate = t.startTranslate);
                if (!t.allowThresholdMove) return t.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, t.currentTranslate = t.startTranslate, void (a.diff = this.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY);
              }

              s.followFinger && !s.cssMode && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), s.freeMode && (0 === t.velocities.length && t.velocities.push({
                position: a[this.isHorizontal() ? "startX" : "startY"],
                time: t.touchStartTime
              }), t.velocities.push({
                position: a[this.isHorizontal() ? "currentX" : "currentY"],
                time: d.now()
              })), this.updateProgress(t.currentTranslate), this.setTranslate(t.currentTranslate));
            }
          }
        }
      }
    } else t.startMoving && t.isScrolling && this.emit("touchMoveOpposite", o);
  }

  function B(e) {
    var t = this,
        i = t.touchEventsData,
        s = t.params,
        a = t.touches,
        r = t.rtlTranslate,
        n = t.$wrapperEl,
        o = t.slidesGrid,
        l = t.snapGrid,
        h = e;
    if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
    s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    var p,
        c = d.now(),
        u = c - i.touchStartTime;
    if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap click", h), u < 300 && c - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", h)), i.lastClickTime = d.now(), d.nextTick(function () {
      t.destroyed || (t.allowClick = !0);
    }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
    if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, !s.cssMode) if (s.freeMode) {
      if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
      if (p > -t.maxTranslate()) return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));

      if (s.freeModeMomentum) {
        if (i.velocities.length > 1) {
          var v = i.velocities.pop(),
              f = i.velocities.pop(),
              m = v.position - f.position,
              g = v.time - f.time;
          t.velocity = m / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || d.now() - v.time > 300) && (t.velocity = 0);
        } else t.velocity = 0;

        t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
        var b = 1e3 * s.freeModeMomentumRatio,
            w = t.velocity * b,
            y = t.translate + w;
        r && (y = -y);
        var x,
            E,
            T = !1,
            S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
        if (y < t.maxTranslate()) s.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S), x = t.maxTranslate(), T = !0, i.allowMomentumBounce = !0) : y = t.maxTranslate(), s.loop && s.centeredSlides && (E = !0);else if (y > t.minTranslate()) s.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S), x = t.minTranslate(), T = !0, i.allowMomentumBounce = !0) : y = t.minTranslate(), s.loop && s.centeredSlides && (E = !0);else if (s.freeModeSticky) {
          for (var C, M = 0; M < l.length; M += 1) {
            if (l[M] > -y) {
              C = M;
              break;
            }
          }

          y = -(y = Math.abs(l[C] - y) < Math.abs(l[C - 1] - y) || "next" === t.swipeDirection ? l[C] : l[C - 1]);
        }

        if (E && t.once("transitionEnd", function () {
          t.loopFix();
        }), 0 !== t.velocity) {
          if (b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity), s.freeModeSticky) {
            var P = Math.abs((r ? -y : y) - t.translate),
                z = t.slidesSizesGrid[t.activeIndex];
            b = P < z ? s.speed : P < 2 * z ? 1.5 * s.speed : 2.5 * s.speed;
          }
        } else if (s.freeModeSticky) return void t.slideToClosest();

        s.freeModeMomentumBounce && T ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function () {
          t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), setTimeout(function () {
            t.setTranslate(x), n.transitionEnd(function () {
              t && !t.destroyed && t.transitionEnd();
            });
          }, 0));
        })) : t.velocity ? (t.updateProgress(y), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function () {
          t && !t.destroyed && t.transitionEnd();
        }))) : t.updateProgress(y), t.updateActiveIndex(), t.updateSlidesClasses();
      } else if (s.freeModeSticky) return void t.slideToClosest();

      (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
    } else {
      for (var k = 0, $ = t.slidesSizesGrid[0], L = 0; L < o.length; L += L < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
        var I = L < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        void 0 !== o[L + I] ? p >= o[L] && p < o[L + I] && (k = L, $ = o[L + I] - o[L]) : p >= o[L] && (k = L, $ = o[o.length - 1] - o[o.length - 2]);
      }

      var O = (p - o[k]) / $,
          D = k < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;

      if (u > s.longSwipesMs) {
        if (!s.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection && (O >= s.longSwipesRatio ? t.slideTo(k + D) : t.slideTo(k)), "prev" === t.swipeDirection && (O > 1 - s.longSwipesRatio ? t.slideTo(k + D) : t.slideTo(k));
      } else {
        if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation && (h.target === t.navigation.nextEl || h.target === t.navigation.prevEl) ? h.target === t.navigation.nextEl ? t.slideTo(k + D) : t.slideTo(k) : ("next" === t.swipeDirection && t.slideTo(k + D), "prev" === t.swipeDirection && t.slideTo(k));
      }
    }
  }

  function N() {
    var e = this.params,
        t = this.el;

    if (!t || 0 !== t.offsetWidth) {
      e.breakpoints && this.setBreakpoint();
      var i = this.allowSlideNext,
          s = this.allowSlidePrev,
          a = this.snapGrid;
      this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0), this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(), this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow();
    }
  }

  function X(e) {
    this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
  }

  function V() {
    var e = this.wrapperEl,
        t = this.rtlTranslate;
    this.previousTranslate = this.translate, this.isHorizontal() ? this.translate = t ? e.scrollWidth - e.offsetWidth - e.scrollLeft : -e.scrollLeft : this.translate = -e.scrollTop, -0 === this.translate && (this.translate = 0), this.updateActiveIndex(), this.updateSlidesClasses();
    var i = this.maxTranslate() - this.minTranslate();
    (0 === i ? 0 : (this.translate - this.minTranslate()) / i) !== this.progress && this.updateProgress(t ? -this.translate : this.translate), this.emit("setTranslate", this.translate, !1);
  }

  var Y = !1;

  function F() {}

  var W = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "container",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    preventInteractionOnTransition: !1,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    freeMode: !1,
    freeModeMomentum: !0,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: !0,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: !1,
    freeModeMinimumVelocity: .02,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: "column",
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !1,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    watchSlidesVisibility: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-container-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0
  },
      R = {
    update: u,
    translate: v,
    transition: f,
    slide: m,
    loop: g,
    grabCursor: b,
    manipulation: D,
    events: {
      attachEvents: function attachEvents() {
        var e = this.params,
            t = this.touchEvents,
            s = this.el,
            a = this.wrapperEl;
        this.onTouchStart = G.bind(this), this.onTouchMove = H.bind(this), this.onTouchEnd = B.bind(this), e.cssMode && (this.onScroll = V.bind(this)), this.onClick = X.bind(this);
        var r = !!e.nested;
        if (!h.touch && h.pointerEvents) s.addEventListener(t.start, this.onTouchStart, !1), i.addEventListener(t.move, this.onTouchMove, r), i.addEventListener(t.end, this.onTouchEnd, !1);else {
          if (h.touch) {
            var n = !("touchstart" !== t.start || !h.passiveListener || !e.passiveListeners) && {
              passive: !0,
              capture: !1
            };
            s.addEventListener(t.start, this.onTouchStart, n), s.addEventListener(t.move, this.onTouchMove, h.passiveListener ? {
              passive: !1,
              capture: r
            } : r), s.addEventListener(t.end, this.onTouchEnd, n), t.cancel && s.addEventListener(t.cancel, this.onTouchEnd, n), Y || (i.addEventListener("touchstart", F), Y = !0);
          }

          (e.simulateTouch && !A.ios && !A.android || e.simulateTouch && !h.touch && A.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1), i.addEventListener("mousemove", this.onTouchMove, r), i.addEventListener("mouseup", this.onTouchEnd, !1));
        }
        (e.preventClicks || e.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0), e.cssMode && a.addEventListener("scroll", this.onScroll), e.updateOnWindowResize ? this.on(A.ios || A.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", N, !0) : this.on("observerUpdate", N, !0);
      },
      detachEvents: function detachEvents() {
        var e = this.params,
            t = this.touchEvents,
            s = this.el,
            a = this.wrapperEl,
            r = !!e.nested;
        if (!h.touch && h.pointerEvents) s.removeEventListener(t.start, this.onTouchStart, !1), i.removeEventListener(t.move, this.onTouchMove, r), i.removeEventListener(t.end, this.onTouchEnd, !1);else {
          if (h.touch) {
            var n = !("onTouchStart" !== t.start || !h.passiveListener || !e.passiveListeners) && {
              passive: !0,
              capture: !1
            };
            s.removeEventListener(t.start, this.onTouchStart, n), s.removeEventListener(t.move, this.onTouchMove, r), s.removeEventListener(t.end, this.onTouchEnd, n), t.cancel && s.removeEventListener(t.cancel, this.onTouchEnd, n);
          }

          (e.simulateTouch && !A.ios && !A.android || e.simulateTouch && !h.touch && A.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1), i.removeEventListener("mousemove", this.onTouchMove, r), i.removeEventListener("mouseup", this.onTouchEnd, !1));
        }
        (e.preventClicks || e.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0), e.cssMode && a.removeEventListener("scroll", this.onScroll), this.off(A.ios || A.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", N);
      }
    },
    breakpoints: {
      setBreakpoint: function setBreakpoint() {
        var e = this.activeIndex,
            t = this.initialized,
            i = this.loopedSlides;
        void 0 === i && (i = 0);
        var s = this.params,
            a = this.$el,
            r = s.breakpoints;

        if (r && (!r || 0 !== Object.keys(r).length)) {
          var n = this.getBreakpoint(r);

          if (n && this.currentBreakpoint !== n) {
            var o = n in r ? r[n] : void 0;
            o && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach(function (e) {
              var t = o[e];
              void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto");
            });
            var l = o || this.originalParams,
                h = s.slidesPerColumn > 1,
                p = l.slidesPerColumn > 1;
            h && !p ? a.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !h && p && (a.addClass(s.containerModifierClass + "multirow"), "column" === l.slidesPerColumnFill && a.addClass(s.containerModifierClass + "multirow-column"));
            var c = l.direction && l.direction !== s.direction,
                u = s.loop && (l.slidesPerView !== s.slidesPerView || c);
            c && t && this.changeDirection(), d.extend(this.params, l), d.extend(this, {
              allowTouchMove: this.params.allowTouchMove,
              allowSlideNext: this.params.allowSlideNext,
              allowSlidePrev: this.params.allowSlidePrev
            }), this.currentBreakpoint = n, u && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", l);
          }
        }
      },
      getBreakpoint: function getBreakpoint(e) {
        if (e) {
          var t = !1,
              i = Object.keys(e).map(function (e) {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              var t = parseFloat(e.substr(1));
              return {
                value: a.innerHeight * t,
                point: e
              };
            }

            return {
              value: e,
              point: e
            };
          });
          i.sort(function (e, t) {
            return parseInt(e.value, 10) - parseInt(t.value, 10);
          });

          for (var s = 0; s < i.length; s += 1) {
            var r = i[s],
                n = r.point;
            r.value <= a.innerWidth && (t = n);
          }

          return t || "max";
        }
      }
    },
    checkOverflow: {
      checkOverflow: function checkOverflow() {
        var e = this.params,
            t = this.isLocked,
            i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
        e.slidesOffsetBefore && e.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), t && t !== this.isLocked && (this.isEnd = !1, this.navigation.update());
      }
    },
    classes: {
      addClasses: function addClasses() {
        var e = this.classNames,
            t = this.params,
            i = this.rtl,
            s = this.$el,
            a = [];
        a.push("initialized"), a.push(t.direction), t.freeMode && a.push("free-mode"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), t.slidesPerColumn > 1 && (a.push("multirow"), "column" === t.slidesPerColumnFill && a.push("multirow-column")), A.android && a.push("android"), A.ios && a.push("ios"), t.cssMode && a.push("css-mode"), a.forEach(function (i) {
          e.push(t.containerModifierClass + i);
        }), s.addClass(e.join(" "));
      },
      removeClasses: function removeClasses() {
        var e = this.$el,
            t = this.classNames;
        e.removeClass(t.join(" "));
      }
    },
    images: {
      loadImage: function loadImage(e, t, i, s, r, o) {
        var l;

        function d() {
          o && o();
        }

        n(e).parent("picture")[0] || e.complete && r ? d() : t ? ((l = new a.Image()).onload = d, l.onerror = d, s && (l.sizes = s), i && (l.srcset = i), t && (l.src = t)) : d();
      },
      preloadImages: function preloadImages() {
        var e = this;

        function t() {
          null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
        }

        e.imagesToLoad = e.$el.find("img");

        for (var i = 0; i < e.imagesToLoad.length; i += 1) {
          var s = e.imagesToLoad[i];
          e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t);
        }
      }
    }
  },
      q = {},
      j = function (e) {
    function t() {
      for (var i, s, a, r = [], o = arguments.length; o--;) {
        r[o] = arguments[o];
      }

      1 === r.length && r[0].constructor && r[0].constructor === Object ? a = r[0] : (s = (i = r)[0], a = i[1]), a || (a = {}), a = d.extend({}, a), s && !a.el && (a.el = s), e.call(this, a), Object.keys(R).forEach(function (e) {
        Object.keys(R[e]).forEach(function (i) {
          t.prototype[i] || (t.prototype[i] = R[e][i]);
        });
      });
      var l = this;
      void 0 === l.modules && (l.modules = {}), Object.keys(l.modules).forEach(function (e) {
        var t = l.modules[e];

        if (t.params) {
          var i = Object.keys(t.params)[0],
              s = t.params[i];
          if ("object" != _typeof(s) || null === s) return;
          if (!(i in a) || !("enabled" in s)) return;
          !0 === a[i] && (a[i] = {
            enabled: !0
          }), "object" != _typeof(a[i]) || "enabled" in a[i] || (a[i].enabled = !0), a[i] || (a[i] = {
            enabled: !1
          });
        }
      });
      var p = d.extend({}, W);
      l.useModulesParams(p), l.params = d.extend({}, p, q, a), l.originalParams = d.extend({}, l.params), l.passedParams = d.extend({}, a), l.$ = n;
      var c = n(l.params.el);

      if (s = c[0]) {
        if (c.length > 1) {
          var u = [];
          return c.each(function (e, i) {
            var s = d.extend({}, a, {
              el: i
            });
            u.push(new t(s));
          }), u;
        }

        var v, f, m;
        return s.swiper = l, c.data("swiper", l), s && s.shadowRoot && s.shadowRoot.querySelector ? (v = n(s.shadowRoot.querySelector("." + l.params.wrapperClass))).children = function (e) {
          return c.children(e);
        } : v = c.children("." + l.params.wrapperClass), d.extend(l, {
          $el: c,
          el: s,
          $wrapperEl: v,
          wrapperEl: v[0],
          classNames: [],
          slides: n(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: function isHorizontal() {
            return "horizontal" === l.params.direction;
          },
          isVertical: function isVertical() {
            return "vertical" === l.params.direction;
          },
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === c.css("direction"),
          rtlTranslate: "horizontal" === l.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === c.css("direction")),
          wrongRTL: "-webkit-box" === v.css("display"),
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: l.params.allowSlideNext,
          allowSlidePrev: l.params.allowSlidePrev,
          touchEvents: (f = ["touchstart", "touchmove", "touchend", "touchcancel"], m = ["mousedown", "mousemove", "mouseup"], h.pointerEvents && (m = ["pointerdown", "pointermove", "pointerup"]), l.touchEventsTouch = {
            start: f[0],
            move: f[1],
            end: f[2],
            cancel: f[3]
          }, l.touchEventsDesktop = {
            start: m[0],
            move: m[1],
            end: m[2]
          }, h.touch || !l.params.simulateTouch ? l.touchEventsTouch : l.touchEventsDesktop),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            formElements: "input, select, option, textarea, button, video, label",
            lastClickTime: d.now(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0
          },
          allowClick: !0,
          allowTouchMove: l.params.allowTouchMove,
          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          },
          imagesToLoad: [],
          imagesLoaded: 0
        }), l.useModules(), l.params.init && l.init(), l;
      }
    }

    e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
    var i = {
      extendedDefaults: {
        configurable: !0
      },
      defaults: {
        configurable: !0
      },
      Class: {
        configurable: !0
      },
      $: {
        configurable: !0
      }
    };
    return t.prototype.slidesPerViewDynamic = function () {
      var e = this.params,
          t = this.slides,
          i = this.slidesGrid,
          s = this.size,
          a = this.activeIndex,
          r = 1;

      if (e.centeredSlides) {
        for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) {
          t[l] && !n && (r += 1, (o += t[l].swiperSlideSize) > s && (n = !0));
        }

        for (var d = a - 1; d >= 0; d -= 1) {
          t[d] && !n && (r += 1, (o += t[d].swiperSlideSize) > s && (n = !0));
        }
      } else for (var h = a + 1; h < t.length; h += 1) {
        i[h] - i[a] < s && (r += 1);
      }

      return r;
    }, t.prototype.update = function () {
      var e = this;

      if (e && !e.destroyed) {
        var t = e.snapGrid,
            i = e.params;
        i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
      }

      function s() {
        var t = e.rtlTranslate ? -1 * e.translate : e.translate,
            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
      }
    }, t.prototype.changeDirection = function (e, t) {
      void 0 === t && (t = !0);
      var i = this.params.direction;
      return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e), this.params.direction = e, this.slides.each(function (t, i) {
        "vertical" === e ? i.style.width = "" : i.style.height = "";
      }), this.emit("changeDirection"), t && this.update()), this;
    }, t.prototype.init = function () {
      this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"));
    }, t.prototype.destroy = function (e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      var i = this,
          s = i.params,
          a = i.$el,
          r = i.$wrapperEl,
          n = i.slides;
      return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function (e) {
        i.off(e);
      }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), d.deleteProps(i)), i.destroyed = !0), null;
    }, t.extendDefaults = function (e) {
      d.extend(q, e);
    }, i.extendedDefaults.get = function () {
      return q;
    }, i.defaults.get = function () {
      return W;
    }, i.Class.get = function () {
      return e;
    }, i.$.get = function () {
      return n;
    }, Object.defineProperties(t, i), t;
  }(p),
      K = {
    name: "device",
    proto: {
      device: A
    },
    static: {
      device: A
    }
  },
      U = {
    name: "support",
    proto: {
      support: h
    },
    static: {
      support: h
    }
  },
      _ = {
    isEdge: !!a.navigator.userAgent.match(/Edge/g),
    isSafari: function () {
      var e = a.navigator.userAgent.toLowerCase();
      return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
    }(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(a.navigator.userAgent)
  },
      Z = {
    name: "browser",
    proto: {
      browser: _
    },
    static: {
      browser: _
    }
  },
      Q = {
    name: "resize",
    create: function create() {
      var e = this;
      d.extend(e, {
        resize: {
          resizeHandler: function resizeHandler() {
            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"));
          },
          orientationChangeHandler: function orientationChangeHandler() {
            e && !e.destroyed && e.initialized && e.emit("orientationchange");
          }
        }
      });
    },
    on: {
      init: function init() {
        a.addEventListener("resize", this.resize.resizeHandler), a.addEventListener("orientationchange", this.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        a.removeEventListener("resize", this.resize.resizeHandler), a.removeEventListener("orientationchange", this.resize.orientationChangeHandler);
      }
    }
  },
      J = {
    func: a.MutationObserver || a.WebkitMutationObserver,
    attach: function attach(e, t) {
      void 0 === t && (t = {});
      var i = this,
          s = new (0, J.func)(function (e) {
        if (1 !== e.length) {
          var t = function t() {
            i.emit("observerUpdate", e[0]);
          };

          a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0);
        } else i.emit("observerUpdate", e[0]);
      });
      s.observe(e, {
        attributes: void 0 === t.attributes || t.attributes,
        childList: void 0 === t.childList || t.childList,
        characterData: void 0 === t.characterData || t.characterData
      }), i.observer.observers.push(s);
    },
    init: function init() {
      if (h.observer && this.params.observer) {
        if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) {
          this.observer.attach(e[t]);
        }
        this.observer.attach(this.$el[0], {
          childList: this.params.observeSlideChildren
        }), this.observer.attach(this.$wrapperEl[0], {
          attributes: !1
        });
      }
    },
    destroy: function destroy() {
      this.observer.observers.forEach(function (e) {
        e.disconnect();
      }), this.observer.observers = [];
    }
  },
      ee = {
    name: "observer",
    params: {
      observer: !1,
      observeParents: !1,
      observeSlideChildren: !1
    },
    create: function create() {
      d.extend(this, {
        observer: {
          init: J.init.bind(this),
          attach: J.attach.bind(this),
          destroy: J.destroy.bind(this),
          observers: []
        }
      });
    },
    on: {
      init: function init() {
        this.observer.init();
      },
      destroy: function destroy() {
        this.observer.destroy();
      }
    }
  },
      te = {
    update: function update(e) {
      var t = this,
          i = t.params,
          s = i.slidesPerView,
          a = i.slidesPerGroup,
          r = i.centeredSlides,
          n = t.params.virtual,
          o = n.addSlidesBefore,
          l = n.addSlidesAfter,
          h = t.virtual,
          p = h.from,
          c = h.to,
          u = h.slides,
          v = h.slidesGrid,
          f = h.renderSlide,
          m = h.offset;
      t.updateActiveIndex();
      var g,
          b,
          w,
          y = t.activeIndex || 0;
      g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (b = Math.floor(s / 2) + a + o, w = Math.floor(s / 2) + a + l) : (b = s + (a - 1) + o, w = a + l);
      var x = Math.max((y || 0) - w, 0),
          E = Math.min((y || 0) + b, u.length - 1),
          T = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);

      function S() {
        t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load();
      }

      if (d.extend(t.virtual, {
        from: x,
        to: E,
        offset: T,
        slidesGrid: t.slidesGrid
      }), p === x && c === E && !e) return t.slidesGrid !== v && T !== m && t.slides.css(g, T + "px"), void t.updateProgress();
      if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
        offset: T,
        from: x,
        to: E,
        slides: function () {
          for (var e = [], t = x; t <= E; t += 1) {
            e.push(u[t]);
          }

          return e;
        }()
      }), void S();
      var C = [],
          M = [];
      if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();else for (var P = p; P <= c; P += 1) {
        (P < x || P > E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
      }

      for (var z = 0; z < u.length; z += 1) {
        z >= x && z <= E && (void 0 === c || e ? M.push(z) : (z > c && M.push(z), z < p && C.push(z)));
      }

      M.forEach(function (e) {
        t.$wrapperEl.append(f(u[e], e));
      }), C.sort(function (e, t) {
        return t - e;
      }).forEach(function (e) {
        t.$wrapperEl.prepend(f(u[e], e));
      }), t.$wrapperEl.children(".swiper-slide").css(g, T + "px"), S();
    },
    renderSlide: function renderSlide(e, t) {
      var i = this.params.virtual;
      if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
      var s = i.renderSlide ? n(i.renderSlide.call(this, e, t)) : n('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
      return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = s), s;
    },
    appendSlide: function appendSlide(e) {
      if ("object" == _typeof(e) && "length" in e) for (var t = 0; t < e.length; t += 1) {
        e[t] && this.virtual.slides.push(e[t]);
      } else this.virtual.slides.push(e);
      this.virtual.update(!0);
    },
    prependSlide: function prependSlide(e) {
      var t = this.activeIndex,
          i = t + 1,
          s = 1;

      if (Array.isArray(e)) {
        for (var a = 0; a < e.length; a += 1) {
          e[a] && this.virtual.slides.unshift(e[a]);
        }

        i = t + e.length, s = e.length;
      } else this.virtual.slides.unshift(e);

      if (this.params.virtual.cache) {
        var r = this.virtual.cache,
            n = {};
        Object.keys(r).forEach(function (e) {
          var t = r[e],
              i = t.attr("data-swiper-slide-index");
          i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), n[parseInt(e, 10) + s] = t;
        }), this.virtual.cache = n;
      }

      this.virtual.update(!0), this.slideTo(i, 0);
    },
    removeSlide: function removeSlide(e) {
      if (null != e) {
        var t = this.activeIndex;
        if (Array.isArray(e)) for (var i = e.length - 1; i >= 0; i -= 1) {
          this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0);
        } else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
        this.virtual.update(!0), this.slideTo(t, 0);
      }
    },
    removeAllSlides: function removeAllSlides() {
      this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0);
    }
  },
      ie = {
    name: "virtual",
    params: {
      virtual: {
        enabled: !1,
        slides: [],
        cache: !0,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    },
    create: function create() {
      d.extend(this, {
        virtual: {
          update: te.update.bind(this),
          appendSlide: te.appendSlide.bind(this),
          prependSlide: te.prependSlide.bind(this),
          removeSlide: te.removeSlide.bind(this),
          removeAllSlides: te.removeAllSlides.bind(this),
          renderSlide: te.renderSlide.bind(this),
          slides: this.params.virtual.slides,
          cache: {}
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        if (this.params.virtual.enabled) {
          this.classNames.push(this.params.containerModifierClass + "virtual");
          var e = {
            watchSlidesProgress: !0
          };
          d.extend(this.params, e), d.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update();
        }
      },
      setTranslate: function setTranslate() {
        this.params.virtual.enabled && this.virtual.update();
      }
    }
  },
      se = {
    handle: function handle(e) {
      var t = this.rtlTranslate,
          s = e;
      s.originalEvent && (s = s.originalEvent);
      var r = s.keyCode || s.charCode;
      if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r || 34 === r)) return !1;
      if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r || 33 === r)) return !1;

      if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || i.activeElement && i.activeElement.nodeName && ("input" === i.activeElement.nodeName.toLowerCase() || "textarea" === i.activeElement.nodeName.toLowerCase()))) {
        if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) {
          var n = !1;
          if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
          var o = a.innerWidth,
              l = a.innerHeight,
              d = this.$el.offset();
          t && (d.left -= this.$el[0].scrollLeft);

          for (var h = [[d.left, d.top], [d.left + this.width, d.top], [d.left, d.top + this.height], [d.left + this.width, d.top + this.height]], p = 0; p < h.length; p += 1) {
            var c = h[p];
            c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0);
          }

          if (!n) return;
        }

        this.isHorizontal() ? (33 !== r && 34 !== r && 37 !== r && 39 !== r || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), (34 !== r && 39 !== r || t) && (33 !== r && 37 !== r || !t) || this.slideNext(), (33 !== r && 37 !== r || t) && (34 !== r && 39 !== r || !t) || this.slidePrev()) : (33 !== r && 34 !== r && 38 !== r && 40 !== r || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), 34 !== r && 40 !== r || this.slideNext(), 33 !== r && 38 !== r || this.slidePrev()), this.emit("keyPress", r);
      }
    },
    enable: function enable() {
      this.keyboard.enabled || (n(i).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0);
    },
    disable: function disable() {
      this.keyboard.enabled && (n(i).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1);
    }
  },
      ae = {
    name: "keyboard",
    params: {
      keyboard: {
        enabled: !1,
        onlyInViewport: !0
      }
    },
    create: function create() {
      d.extend(this, {
        keyboard: {
          enabled: !1,
          enable: se.enable.bind(this),
          disable: se.disable.bind(this),
          handle: se.handle.bind(this)
        }
      });
    },
    on: {
      init: function init() {
        this.params.keyboard.enabled && this.keyboard.enable();
      },
      destroy: function destroy() {
        this.keyboard.enabled && this.keyboard.disable();
      }
    }
  };

  var re = {
    lastScrollTime: d.now(),
    lastEventBeforeSnap: void 0,
    recentWheelEvents: [],
    event: function event() {
      return a.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
        var e = ("onwheel" in i);

        if (!e) {
          var t = i.createElement("div");
          t.setAttribute("onwheel", "return;"), e = "function" == typeof t.onwheel;
        }

        return !e && i.implementation && i.implementation.hasFeature && !0 !== i.implementation.hasFeature("", "") && (e = i.implementation.hasFeature("Events.wheel", "3.0")), e;
      }() ? "wheel" : "mousewheel";
    },
    normalize: function normalize(e) {
      var t = 0,
          i = 0,
          s = 0,
          a = 0;
      return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = a, a = 0), (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, a *= 40) : (s *= 800, a *= 800)), s && !t && (t = s < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), {
        spinX: t,
        spinY: i,
        pixelX: s,
        pixelY: a
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      this.mouseEntered = !0;
    },
    handleMouseLeave: function handleMouseLeave() {
      this.mouseEntered = !1;
    },
    handle: function handle(e) {
      var t = e,
          i = this,
          s = i.params.mousewheel;
      i.params.cssMode && t.preventDefault();
      var a = i.$el;
      if ("container" !== i.params.mousewheel.eventsTarged && (a = n(i.params.mousewheel.eventsTarged)), !i.mouseEntered && !a[0].contains(t.target) && !s.releaseOnEdges) return !0;
      t.originalEvent && (t = t.originalEvent);
      var r = 0,
          o = i.rtlTranslate ? -1 : 1,
          l = re.normalize(t);
      if (s.forceToAxis) {
        if (i.isHorizontal()) {
          if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
          r = l.pixelX * o;
        } else {
          if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
          r = l.pixelY;
        }
      } else r = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
      if (0 === r) return !0;

      if (s.invert && (r = -r), i.params.freeMode) {
        var h = {
          time: d.now(),
          delta: Math.abs(r),
          direction: Math.sign(r)
        },
            p = i.mousewheel.lastEventBeforeSnap,
            c = p && h.time < p.time + 500 && h.delta <= p.delta && h.direction === p.direction;

        if (!c) {
          i.mousewheel.lastEventBeforeSnap = void 0, i.params.loop && i.loopFix();
          var u = i.getTranslate() + r * s.sensitivity,
              v = i.isBeginning,
              f = i.isEnd;

          if (u >= i.minTranslate() && (u = i.minTranslate()), u <= i.maxTranslate() && (u = i.maxTranslate()), i.setTransition(0), i.setTranslate(u), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!v && i.isBeginning || !f && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky) {
            clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = void 0;
            var m = i.mousewheel.recentWheelEvents;
            m.length >= 15 && m.shift();
            var g = m.length ? m[m.length - 1] : void 0,
                b = m[0];
            if (m.push(h), g && (h.delta > g.delta || h.direction !== g.direction)) m.splice(0);else if (m.length >= 15 && h.time - b.time < 500 && b.delta - h.delta >= 1 && h.delta <= 6) {
              var w = r > 0 ? .8 : .2;
              i.mousewheel.lastEventBeforeSnap = h, m.splice(0), i.mousewheel.timeout = d.nextTick(function () {
                i.slideToClosest(i.params.speed, !0, void 0, w);
              }, 0);
            }
            i.mousewheel.timeout || (i.mousewheel.timeout = d.nextTick(function () {
              i.mousewheel.lastEventBeforeSnap = h, m.splice(0), i.slideToClosest(i.params.speed, !0, void 0, .5);
            }, 500));
          }

          if (c || i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), u === i.minTranslate() || u === i.maxTranslate()) return !0;
        }
      } else {
        var y = {
          time: d.now(),
          delta: Math.abs(r),
          direction: Math.sign(r),
          raw: e
        },
            x = i.mousewheel.recentWheelEvents;
        x.length >= 2 && x.shift();
        var E = x.length ? x[x.length - 1] : void 0;
        if (x.push(y), E ? (y.direction !== E.direction || y.delta > E.delta || y.time > E.time + 150) && i.mousewheel.animateSlider(y) : i.mousewheel.animateSlider(y), i.mousewheel.releaseScroll(y)) return !0;
      }

      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1;
    },
    animateSlider: function animateSlider(e) {
      return e.delta >= 6 && d.now() - this.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? this.isEnd && !this.params.loop || this.animating || (this.slideNext(), this.emit("scroll", e.raw)) : this.isBeginning && !this.params.loop || this.animating || (this.slidePrev(), this.emit("scroll", e.raw)), this.mousewheel.lastScrollTime = new a.Date().getTime(), !1);
    },
    releaseScroll: function releaseScroll(e) {
      var t = this.params.mousewheel;

      if (e.direction < 0) {
        if (this.isEnd && !this.params.loop && t.releaseOnEdges) return !0;
      } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges) return !0;

      return !1;
    },
    enable: function enable() {
      var e = re.event();
      if (this.params.cssMode) return this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0;
      if (!e) return !1;
      if (this.mousewheel.enabled) return !1;
      var t = this.$el;
      return "container" !== this.params.mousewheel.eventsTarged && (t = n(this.params.mousewheel.eventsTarged)), t.on("mouseenter", this.mousewheel.handleMouseEnter), t.on("mouseleave", this.mousewheel.handleMouseLeave), t.on(e, this.mousewheel.handle), this.mousewheel.enabled = !0, !0;
    },
    disable: function disable() {
      var e = re.event();
      if (this.params.cssMode) return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0;
      if (!e) return !1;
      if (!this.mousewheel.enabled) return !1;
      var t = this.$el;
      return "container" !== this.params.mousewheel.eventsTarged && (t = n(this.params.mousewheel.eventsTarged)), t.off(e, this.mousewheel.handle), this.mousewheel.enabled = !1, !0;
    }
  },
      ne = {
    update: function update() {
      var e = this.params.navigation;

      if (!this.params.loop) {
        var t = this.navigation,
            i = t.$nextEl,
            s = t.$prevEl;
        s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass));
      }
    },
    onPrevClick: function onPrevClick(e) {
      e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext();
    },
    init: function init() {
      var e,
          t,
          i = this.params.navigation;
      (i.nextEl || i.prevEl) && (i.nextEl && (e = n(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = n(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), t && t.length > 0 && t.on("click", this.navigation.onPrevClick), d.extend(this.navigation, {
        $nextEl: e,
        nextEl: e && e[0],
        $prevEl: t,
        prevEl: t && t[0]
      }));
    },
    destroy: function destroy() {
      var e = this.navigation,
          t = e.$nextEl,
          i = e.$prevEl;
      t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass));
    }
  },
      oe = {
    update: function update() {
      var e = this.rtl,
          t = this.params.pagination;

      if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
        var i,
            s = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
            a = this.pagination.$el,
            r = this.params.loop ? Math.ceil((s - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;

        if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > s - 1 - 2 * this.loopedSlides && (i -= s - 2 * this.loopedSlides), i > r - 1 && (i -= r), i < 0 && "bullets" !== this.params.paginationType && (i = r + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
          var o,
              l,
              d,
              h = this.pagination.bullets;
          if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), a.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), a.length > 1) h.each(function (e, s) {
            var a = n(s),
                r = a.index();
            r === i && a.addClass(t.bulletActiveClass), t.dynamicBullets && (r >= o && r <= l && a.addClass(t.bulletActiveClass + "-main"), r === o && a.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), r === l && a.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"));
          });else {
            var p = h.eq(i),
                c = p.index();

            if (p.addClass(t.bulletActiveClass), t.dynamicBullets) {
              for (var u = h.eq(o), v = h.eq(l), f = o; f <= l; f += 1) {
                h.eq(f).addClass(t.bulletActiveClass + "-main");
              }

              if (this.params.loop) {
                if (c >= h.length - t.dynamicMainBullets) {
                  for (var m = t.dynamicMainBullets; m >= 0; m -= 1) {
                    h.eq(h.length - m).addClass(t.bulletActiveClass + "-main");
                  }

                  h.eq(h.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev");
                } else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next");
              } else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next");
            }
          }

          if (t.dynamicBullets) {
            var g = Math.min(h.length, t.dynamicMainBullets + 4),
                b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                w = e ? "right" : "left";
            h.css(this.isHorizontal() ? w : "top", b + "px");
          }
        }

        if ("fraction" === t.type && (a.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), a.find("." + t.totalClass).text(t.formatFractionTotal(r))), "progressbar" === t.type) {
          var y;
          y = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
          var x = (i + 1) / r,
              E = 1,
              T = 1;
          "horizontal" === y ? E = x : T = x, a.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + E + ") scaleY(" + T + ")").transition(this.params.speed);
        }

        "custom" === t.type && t.renderCustom ? (a.html(t.renderCustom(this, i + 1, r)), this.emit("paginationRender", this, a[0])) : this.emit("paginationUpdate", this, a[0]), a[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass);
      }
    },
    render: function render() {
      var e = this.params.pagination;

      if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
        var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
            i = this.pagination.$el,
            s = "";

        if ("bullets" === e.type) {
          for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1) {
            e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
          }

          i.html(s), this.pagination.bullets = i.find("." + e.bulletClass);
        }

        "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0]);
      }
    },
    init: function init() {
      var e = this,
          t = e.params.pagination;

      if (t.el) {
        var i = n(t.el);
        0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, function (t) {
          t.preventDefault();
          var i = n(this).index() * e.params.slidesPerGroup;
          e.params.loop && (i += e.loopedSlides), e.slideTo(i);
        }), d.extend(e.pagination, {
          $el: i,
          el: i[0]
        }));
      }
    },
    destroy: function destroy() {
      var e = this.params.pagination;

      if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
        var t = this.pagination.$el;
        t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass);
      }
    }
  },
      le = {
    setTranslate: function setTranslate() {
      if (this.params.scrollbar.el && this.scrollbar.el) {
        var e = this.scrollbar,
            t = this.rtlTranslate,
            i = this.progress,
            s = e.dragSize,
            a = e.trackSize,
            r = e.$dragEl,
            n = e.$el,
            o = this.params.scrollbar,
            l = s,
            d = (a - s) * i;
        t ? (d = -d) > 0 ? (l = s - d, d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d, d = 0) : d + s > a && (l = a - d), this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"), r[0].style.width = l + "px") : (r.transform("translate3d(0px, " + d + "px, 0)"), r[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), n[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function () {
          n[0].style.opacity = 0, n.transition(400);
        }, 1e3));
      }
    },
    setTransition: function setTransition(e) {
      this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e);
    },
    updateSize: function updateSize() {
      if (this.params.scrollbar.el && this.scrollbar.el) {
        var e = this.scrollbar,
            t = e.$dragEl,
            i = e.$el;
        t[0].style.width = "", t[0].style.height = "";
        var s,
            a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            r = this.size / this.virtualSize,
            n = r * (a / this.size);
        s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = r >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), d.extend(e, {
          trackSize: a,
          divider: r,
          moveDivider: n,
          dragSize: s
        }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass);
      }
    },
    getPointerPosition: function getPointerPosition(e) {
      return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY;
    },
    setDragPosition: function setDragPosition(e) {
      var t,
          i = this.scrollbar,
          s = this.rtlTranslate,
          a = i.$el,
          r = i.dragSize,
          n = i.trackSize,
          o = i.dragStartPos;
      t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
      var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
      this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var t = this.params.scrollbar,
          i = this.scrollbar,
          s = this.$wrapperEl,
          a = i.$el,
          r = i.$dragEl;
      this.scrollbar.isTouched = !0, this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), r.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), a.transition(0), t.hide && a.css("opacity", 1), this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"), this.emit("scrollbarDragStart", e);
    },
    onDragMove: function onDragMove(e) {
      var t = this.scrollbar,
          i = this.$wrapperEl,
          s = t.$el,
          a = t.$dragEl;
      this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e));
    },
    onDragEnd: function onDragEnd(e) {
      var t = this.params.scrollbar,
          i = this.scrollbar,
          s = this.$wrapperEl,
          a = i.$el;
      this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = d.nextTick(function () {
        a.css("opacity", 0), a.transition(400);
      }, 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest());
    },
    enableDraggable: function enableDraggable() {
      if (this.params.scrollbar.el) {
        var e = this.scrollbar,
            t = this.touchEventsTouch,
            s = this.touchEventsDesktop,
            a = this.params,
            r = e.$el[0],
            n = !(!h.passiveListener || !a.passiveListeners) && {
          passive: !1,
          capture: !1
        },
            o = !(!h.passiveListener || !a.passiveListeners) && {
          passive: !0,
          capture: !1
        };
        h.touch ? (r.addEventListener(t.start, this.scrollbar.onDragStart, n), r.addEventListener(t.move, this.scrollbar.onDragMove, n), r.addEventListener(t.end, this.scrollbar.onDragEnd, o)) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), i.addEventListener(s.move, this.scrollbar.onDragMove, n), i.addEventListener(s.end, this.scrollbar.onDragEnd, o));
      }
    },
    disableDraggable: function disableDraggable() {
      if (this.params.scrollbar.el) {
        var e = this.scrollbar,
            t = this.touchEventsTouch,
            s = this.touchEventsDesktop,
            a = this.params,
            r = e.$el[0],
            n = !(!h.passiveListener || !a.passiveListeners) && {
          passive: !1,
          capture: !1
        },
            o = !(!h.passiveListener || !a.passiveListeners) && {
          passive: !0,
          capture: !1
        };
        h.touch ? (r.removeEventListener(t.start, this.scrollbar.onDragStart, n), r.removeEventListener(t.move, this.scrollbar.onDragMove, n), r.removeEventListener(t.end, this.scrollbar.onDragEnd, o)) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), i.removeEventListener(s.move, this.scrollbar.onDragMove, n), i.removeEventListener(s.end, this.scrollbar.onDragEnd, o));
      }
    },
    init: function init() {
      if (this.params.scrollbar.el) {
        var e = this.scrollbar,
            t = this.$el,
            i = this.params.scrollbar,
            s = n(i.el);
        this.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === t.find(i.el).length && (s = t.find(i.el));
        var a = s.find("." + this.params.scrollbar.dragClass);
        0 === a.length && (a = n('<div class="' + this.params.scrollbar.dragClass + '"></div>'), s.append(a)), d.extend(e, {
          $el: s,
          el: s[0],
          $dragEl: a,
          dragEl: a[0]
        }), i.draggable && e.enableDraggable();
      }
    },
    destroy: function destroy() {
      this.scrollbar.disableDraggable();
    }
  },
      de = {
    setTransform: function setTransform(e, t) {
      var i = this.rtl,
          s = n(e),
          a = i ? -1 : 1,
          r = s.attr("data-swiper-parallax") || "0",
          o = s.attr("data-swiper-parallax-x"),
          l = s.attr("data-swiper-parallax-y"),
          d = s.attr("data-swiper-parallax-scale"),
          h = s.attr("data-swiper-parallax-opacity");

      if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = r, l = "0") : (l = r, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * a + "%" : o * t * a + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != h) {
        var p = h - (h - 1) * (1 - Math.abs(t));
        s[0].style.opacity = p;
      }

      if (null == d) s.transform("translate3d(" + o + ", " + l + ", 0px)");else {
        var c = d - (d - 1) * (1 - Math.abs(t));
        s.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")");
      }
    },
    setTranslate: function setTranslate() {
      var e = this,
          t = e.$el,
          i = e.slides,
          s = e.progress,
          a = e.snapGrid;
      t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (t, i) {
        e.parallax.setTransform(i, s);
      }), i.each(function (t, i) {
        var r = i.progress;
        e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (r += Math.ceil(t / 2) - s * (a.length - 1)), r = Math.min(Math.max(r, -1), 1), n(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (t, i) {
          e.parallax.setTransform(i, r);
        });
      });
    },
    setTransition: function setTransition(e) {
      void 0 === e && (e = this.params.speed);
      this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (t, i) {
        var s = n(i),
            a = parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
        0 === e && (a = 0), s.transition(a);
      });
    }
  },
      he = {
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) return 1;
      var t = e.targetTouches[0].pageX,
          i = e.targetTouches[0].pageY,
          s = e.targetTouches[1].pageX,
          a = e.targetTouches[1].pageY;
      return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2));
    },
    onGestureStart: function onGestureStart(e) {
      var t = this.params.zoom,
          i = this.zoom,
          s = i.gesture;

      if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !h.gestures) {
        if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
        i.fakeGestureTouched = !0, s.scaleStart = he.getDistanceBetweenTouches(e);
      }

      s.$slideEl && s.$slideEl.length || (s.$slideEl = n(e.target).closest("." + this.params.slideClass), 0 === s.$slideEl.length && (s.$slideEl = this.slides.eq(this.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), s.$imageWrapEl = s.$imageEl.parent("." + t.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl && s.$imageEl.transition(0), this.zoom.isScaling = !0) : s.$imageEl = void 0;
    },
    onGestureChange: function onGestureChange(e) {
      var t = this.params.zoom,
          i = this.zoom,
          s = i.gesture;

      if (!h.gestures) {
        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
        i.fakeGestureMoved = !0, s.scaleMove = he.getDistanceBetweenTouches(e);
      }

      s.$imageEl && 0 !== s.$imageEl.length && (i.scale = h.gestures ? e.scale * i.currentScale : s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
    },
    onGestureEnd: function onGestureEnd(e) {
      var t = this.params.zoom,
          i = this.zoom,
          s = i.gesture;

      if (!h.gestures) {
        if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
        if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !A.android) return;
        i.fakeGestureTouched = !1, i.fakeGestureMoved = !1;
      }

      s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0));
    },
    onTouchStart: function onTouchStart(e) {
      var t = this.zoom,
          i = t.gesture,
          s = t.image;
      i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (A.android && e.cancelable && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY));
    },
    onTouchMove: function onTouchMove(e) {
      var t = this.zoom,
          i = t.gesture,
          s = t.image,
          a = t.velocity;

      if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
        s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = d.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = d.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY));
        var r = s.width * t.scale,
            n = s.height * t.scale;

        if (!(r < i.slideWidth && n < i.slideHeight)) {
          if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - n / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) {
            if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1);
            if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1);
          }

          e.cancelable && e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = s.touchesCurrent.x, a.prevPositionY = s.touchesCurrent.y, a.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)");
        }
      }
    },
    onTouchEnd: function onTouchEnd() {
      var e = this.zoom,
          t = e.gesture,
          i = e.image,
          s = e.velocity;

      if (t.$imageEl && 0 !== t.$imageEl.length) {
        if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
        i.isTouched = !1, i.isMoved = !1;
        var a = 300,
            r = 300,
            n = s.x * a,
            o = i.currentX + n,
            l = s.y * r,
            d = i.currentY + l;
        0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
        var h = Math.max(a, r);
        i.currentX = o, i.currentY = d;
        var p = i.width * e.scale,
            c = i.height * e.scale;
        i.minX = Math.min(t.slideWidth / 2 - p / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - c / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)");
      }
    },
    onTransitionEnd: function onTransitionEnd() {
      var e = this.zoom,
          t = e.gesture;
      t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl && t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl && t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0);
    },
    toggle: function toggle(e) {
      var t = this.zoom;
      t.scale && 1 !== t.scale ? t.out() : t.in(e);
    },
    in: function _in(e) {
      var t,
          i,
          s,
          a,
          r,
          n,
          o,
          l,
          d,
          h,
          p,
          c,
          u,
          v,
          f,
          m,
          g = this.zoom,
          b = this.params.zoom,
          w = g.gesture,
          y = g.image;
      (w.$slideEl || (this.params.virtual && this.params.virtual.enabled && this.virtual ? w.$slideEl = this.$wrapperEl.children("." + this.params.slideActiveClass) : w.$slideEl = this.slides.eq(this.activeIndex), w.$imageEl = w.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), w.$imageWrapEl = w.$imageEl.parent("." + b.containerClass)), w.$imageEl && 0 !== w.$imageEl.length) && (w.$slideEl.addClass("" + b.zoomedSlideClass), void 0 === y.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = y.touchesStart.x, i = y.touchesStart.y), g.scale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, g.currentScale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, e ? (f = w.$slideEl[0].offsetWidth, m = w.$slideEl[0].offsetHeight, s = w.$slideEl.offset().left + f / 2 - t, a = w.$slideEl.offset().top + m / 2 - i, o = w.$imageEl[0].offsetWidth, l = w.$imageEl[0].offsetHeight, d = o * g.scale, h = l * g.scale, u = -(p = Math.min(f / 2 - d / 2, 0)), v = -(c = Math.min(m / 2 - h / 2, 0)), (r = s * g.scale) < p && (r = p), r > u && (r = u), (n = a * g.scale) < c && (n = c), n > v && (n = v)) : (r = 0, n = 0), w.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), w.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + g.scale + ")"));
    },
    out: function out() {
      var e = this.zoom,
          t = this.params.zoom,
          i = e.gesture;
      i.$slideEl || (this.params.virtual && this.params.virtual.enabled && this.virtual ? i.$slideEl = this.$wrapperEl.children("." + this.params.slideActiveClass) : i.$slideEl = this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0);
    },
    enable: function enable() {
      var e = this.zoom;

      if (!e.enabled) {
        e.enabled = !0;
        var t = !("touchstart" !== this.touchEvents.start || !h.passiveListener || !this.params.passiveListeners) && {
          passive: !0,
          capture: !1
        },
            i = !h.passiveListener || {
          passive: !1,
          capture: !0
        },
            s = "." + this.params.slideClass;
        h.gestures ? (this.$wrapperEl.on("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.on("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.on("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.on(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i);
      }
    },
    disable: function disable() {
      var e = this.zoom;

      if (e.enabled) {
        this.zoom.enabled = !1;
        var t = !("touchstart" !== this.touchEvents.start || !h.passiveListener || !this.params.passiveListeners) && {
          passive: !0,
          capture: !1
        },
            i = !h.passiveListener || {
          passive: !1,
          capture: !0
        },
            s = "." + this.params.slideClass;
        h.gestures ? (this.$wrapperEl.off("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.off("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.off("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.off(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i);
      }
    }
  },
      pe = {
    loadInSlide: function loadInSlide(e, t) {
      void 0 === t && (t = !0);
      var i = this,
          s = i.params.lazy;

      if (void 0 !== e && 0 !== i.slides.length) {
        var a = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
            r = a.find("." + s.elementClass + ":not(." + s.loadedClass + "):not(." + s.loadingClass + ")");
        !a.hasClass(s.elementClass) || a.hasClass(s.loadedClass) || a.hasClass(s.loadingClass) || (r = r.add(a[0])), 0 !== r.length && r.each(function (e, r) {
          var o = n(r);
          o.addClass(s.loadingClass);
          var l = o.attr("data-background"),
              d = o.attr("data-src"),
              h = o.attr("data-srcset"),
              p = o.attr("data-sizes"),
              c = o.parent("picture");
          i.loadImage(o[0], d || l, h, p, !1, function () {
            if (null != i && i && (!i || i.params) && !i.destroyed) {
              if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), c.length && c.children("source").each(function (e, t) {
                var i = n(t);
                i.attr("data-srcset") && (i.attr("srcset", i.attr("data-srcset")), i.removeAttr("data-srcset"));
              }), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(s.loadedClass).removeClass(s.loadingClass), a.find("." + s.preloaderClass).remove(), i.params.loop && t) {
                var e = a.attr("data-swiper-slide-index");

                if (a.hasClass(i.params.slideDuplicateClass)) {
                  var r = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                  i.lazy.loadInSlide(r.index(), !1);
                } else {
                  var u = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                  i.lazy.loadInSlide(u.index(), !1);
                }
              }

              i.emit("lazyImageReady", a[0], o[0]), i.params.autoHeight && i.updateAutoHeight();
            }
          }), i.emit("lazyImageLoad", a[0], o[0]);
        });
      }
    },
    load: function load() {
      var e = this,
          t = e.$wrapperEl,
          i = e.params,
          s = e.slides,
          a = e.activeIndex,
          r = e.virtual && i.virtual.enabled,
          o = i.lazy,
          l = i.slidesPerView;

      function d(e) {
        if (r) {
          if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0;
        } else if (s[e]) return !0;

        return !1;
      }

      function h(e) {
        return r ? n(e).attr("data-swiper-slide-index") : n(e).index();
      }

      if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each(function (t, i) {
        var s = r ? n(i).attr("data-swiper-slide-index") : n(i).index();
        e.lazy.loadInSlide(s);
      });else if (l > 1) for (var p = a; p < a + l; p += 1) {
        d(p) && e.lazy.loadInSlide(p);
      } else e.lazy.loadInSlide(a);
      if (o.loadPrevNext) if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
        for (var c = o.loadPrevNextAmount, u = l, v = Math.min(a + u + Math.max(c, u), s.length), f = Math.max(a - Math.max(u, c), 0), m = a + l; m < v; m += 1) {
          d(m) && e.lazy.loadInSlide(m);
        }

        for (var g = f; g < a; g += 1) {
          d(g) && e.lazy.loadInSlide(g);
        }
      } else {
        var b = t.children("." + i.slideNextClass);
        b.length > 0 && e.lazy.loadInSlide(h(b));
        var w = t.children("." + i.slidePrevClass);
        w.length > 0 && e.lazy.loadInSlide(h(w));
      }
    }
  },
      ce = {
    LinearSpline: function LinearSpline(e, t) {
      var i,
          s,
          a,
          r,
          n,
          o = function o(e, t) {
        for (s = -1, i = e.length; i - s > 1;) {
          e[a = i + s >> 1] <= t ? s = a : i = a;
        }

        return i;
      };

      return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
        return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0;
      }, this;
    },
    getInterpolateFunction: function getInterpolateFunction(e) {
      this.controller.spline || (this.controller.spline = this.params.loop ? new ce.LinearSpline(this.slidesGrid, e.slidesGrid) : new ce.LinearSpline(this.snapGrid, e.snapGrid));
    },
    setTranslate: function setTranslate(e, t) {
      var i,
          s,
          a = this,
          r = a.controller.control;

      function n(e) {
        var t = a.rtlTranslate ? -a.translate : a.translate;
        "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), s = -a.controller.spline.interpolate(-t)), s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), s = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, a), e.updateActiveIndex(), e.updateSlidesClasses();
      }

      if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) {
        r[o] !== t && r[o] instanceof j && n(r[o]);
      } else r instanceof j && t !== r && n(r);
    },
    setTransition: function setTransition(e, t) {
      var i,
          s = this,
          a = s.controller.control;

      function r(t) {
        t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.params.autoHeight && d.nextTick(function () {
          t.updateAutoHeight();
        }), t.$wrapperEl.transitionEnd(function () {
          a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd());
        }));
      }

      if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) {
        a[i] !== t && a[i] instanceof j && r(a[i]);
      } else a instanceof j && t !== a && r(a);
    }
  },
      ue = {
    makeElFocusable: function makeElFocusable(e) {
      return e.attr("tabIndex", "0"), e;
    },
    makeElNotFocusable: function makeElNotFocusable(e) {
      return e.attr("tabIndex", "-1"), e;
    },
    addElRole: function addElRole(e, t) {
      return e.attr("role", t), e;
    },
    addElLabel: function addElLabel(e, t) {
      return e.attr("aria-label", t), e;
    },
    disableEl: function disableEl(e) {
      return e.attr("aria-disabled", !0), e;
    },
    enableEl: function enableEl(e) {
      return e.attr("aria-disabled", !1), e;
    },
    onEnterKey: function onEnterKey(e) {
      var t = this.params.a11y;

      if (13 === e.keyCode) {
        var i = n(e.target);
        this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click();
      }
    },
    notify: function notify(e) {
      var t = this.a11y.liveRegion;
      0 !== t.length && (t.html(""), t.html(e));
    },
    updateNavigation: function updateNavigation() {
      if (!this.params.loop && this.navigation) {
        var e = this.navigation,
            t = e.$nextEl,
            i = e.$prevEl;
        i && i.length > 0 && (this.isBeginning ? (this.a11y.disableEl(i), this.a11y.makeElNotFocusable(i)) : (this.a11y.enableEl(i), this.a11y.makeElFocusable(i))), t && t.length > 0 && (this.isEnd ? (this.a11y.disableEl(t), this.a11y.makeElNotFocusable(t)) : (this.a11y.enableEl(t), this.a11y.makeElFocusable(t)));
      }
    },
    updatePagination: function updatePagination() {
      var e = this,
          t = e.params.a11y;
      e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function (i, s) {
        var a = n(s);
        e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, t.paginationBulletMessage.replace(/\{\{index\}\}/, a.index() + 1));
      });
    },
    init: function init() {
      this.$el.append(this.a11y.liveRegion);
      var e,
          t,
          i = this.params.a11y;
      this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey);
    },
    destroy: function destroy() {
      var e, t;
      this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey);
    }
  },
      ve = {
    init: function init() {
      if (this.params.history) {
        if (!a.history || !a.history.pushState) return this.params.history.enabled = !1, void (this.params.hashNavigation.enabled = !0);
        var e = this.history;
        e.initialized = !0, e.paths = ve.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || a.addEventListener("popstate", this.history.setHistoryPopState));
      }
    },
    destroy: function destroy() {
      this.params.history.replaceState || a.removeEventListener("popstate", this.history.setHistoryPopState);
    },
    setHistoryPopState: function setHistoryPopState() {
      this.history.paths = ve.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1);
    },
    getPathValues: function getPathValues() {
      var e = a.location.pathname.slice(1).split("/").filter(function (e) {
        return "" !== e;
      }),
          t = e.length;
      return {
        key: e[t - 2],
        value: e[t - 1]
      };
    },
    setHistory: function setHistory(e, t) {
      if (this.history.initialized && this.params.history.enabled) {
        var i = this.slides.eq(t),
            s = ve.slugify(i.attr("data-history"));
        a.location.pathname.includes(e) || (s = e + "/" + s);
        var r = a.history.state;
        r && r.value === s || (this.params.history.replaceState ? a.history.replaceState({
          value: s
        }, null, s) : a.history.pushState({
          value: s
        }, null, s));
      }
    },
    slugify: function slugify(e) {
      return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    },
    scrollToSlide: function scrollToSlide(e, t, i) {
      if (t) for (var s = 0, a = this.slides.length; s < a; s += 1) {
        var r = this.slides.eq(s);

        if (ve.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
          var n = r.index();
          this.slideTo(n, e, i);
        }
      } else this.slideTo(0, e, i);
    }
  },
      fe = {
    onHashCange: function onHashCange() {
      this.emit("hashChange");
      var e = i.location.hash.replace("#", "");

      if (e !== this.slides.eq(this.activeIndex).attr("data-hash")) {
        var t = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + e + '"]').index();
        if (void 0 === t) return;
        this.slideTo(t);
      }
    },
    setHash: function setHash() {
      if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && a.history && a.history.replaceState) a.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || false), this.emit("hashSet");else {
        var e = this.slides.eq(this.activeIndex),
            t = e.attr("data-hash") || e.attr("data-history");
        i.location.hash = t || "", this.emit("hashSet");
      }
    },
    init: function init() {
      if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
        this.hashNavigation.initialized = !0;
        var e = i.location.hash.replace("#", "");
        if (e) for (var t = 0, s = this.slides.length; t < s; t += 1) {
          var r = this.slides.eq(t);

          if ((r.attr("data-hash") || r.attr("data-history")) === e && !r.hasClass(this.params.slideDuplicateClass)) {
            var o = r.index();
            this.slideTo(o, 0, this.params.runCallbacksOnInit, !0);
          }
        }
        this.params.hashNavigation.watchState && n(a).on("hashchange", this.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      this.params.hashNavigation.watchState && n(a).off("hashchange", this.hashNavigation.onHashCange);
    }
  },
      me = {
    run: function run() {
      var e = this,
          t = e.slides.eq(e.activeIndex),
          i = e.params.autoplay.delay;
      t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = d.nextTick(function () {
        e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), e.params.cssMode && e.autoplay.running && e.autoplay.run();
      }, i);
    },
    start: function start() {
      return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0);
    },
    stop: function stop() {
      return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0);
    },
    pause: function pause(e) {
      this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run())));
    }
  },
      ge = {
    setTranslate: function setTranslate() {
      for (var e = this.slides, t = 0; t < e.length; t += 1) {
        var i = this.slides.eq(t),
            s = -i[0].swiperSlideOffset;
        this.params.virtualTranslate || (s -= this.translate);
        var a = 0;
        this.isHorizontal() || (a = s, s = 0);
        var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
        i.css({
          opacity: r
        }).transform("translate3d(" + s + "px, " + a + "px, 0px)");
      }
    },
    setTransition: function setTransition(e) {
      var t = this,
          i = t.slides,
          s = t.$wrapperEl;

      if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
        var a = !1;
        i.transitionEnd(function () {
          if (!a && t && !t.destroyed) {
            a = !0, t.animating = !1;

            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) {
              s.trigger(e[i]);
            }
          }
        });
      }
    }
  },
      be = {
    setTranslate: function setTranslate() {
      var e,
          t = this.$el,
          i = this.$wrapperEl,
          s = this.slides,
          a = this.width,
          r = this.height,
          o = this.rtlTranslate,
          l = this.size,
          d = this.params.cubeEffect,
          h = this.isHorizontal(),
          p = this.virtual && this.params.virtual.enabled,
          c = 0;
      d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = n('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
        height: a + "px"
      })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = n('<div class="swiper-cube-shadow"></div>'), t.append(e)));

      for (var u = 0; u < s.length; u += 1) {
        var v = s.eq(u),
            f = u;
        p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
        var m = 90 * f,
            g = Math.floor(m / 360);
        o && (m = -m, g = Math.floor(-m / 360));
        var b = Math.max(Math.min(v[0].progress, 1), -1),
            w = 0,
            y = 0,
            x = 0;
        f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), h || (y = w, w = 0);
        var E = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";

        if (b <= 1 && b > -1 && (c = 90 * f + 90 * b, o && (c = 90 * -f - 90 * b)), v.transform(E), d.slideShadows) {
          var T = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
              S = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
          0 === T.length && (T = n('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), v.append(T)), 0 === S.length && (S = n('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), v.append(S)), T.length && (T[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0));
        }
      }

      if (i.css({
        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
        "transform-origin": "50% 50% -" + l / 2 + "px"
      }), d.shadow) if (h) e.transform("translate3d(0px, " + (a / 2 + d.shadowOffset) + "px, " + -a / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");else {
        var C = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
            M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
            P = d.shadowScale,
            z = d.shadowScale / M,
            k = d.shadowOffset;
        e.transform("scale3d(" + P + ", 1, " + z + ") translate3d(0px, " + (r / 2 + k) + "px, " + -r / 2 / z + "px) rotateX(-90deg)");
      }
      var $ = _.isSafari || _.isUiWebView ? -l / 2 : 0;
      i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)");
    },
    setTransition: function setTransition(e) {
      var t = this.$el;
      this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e);
    }
  },
      we = {
    setTranslate: function setTranslate() {
      for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
        var s = e.eq(i),
            a = s[0].progress;
        this.params.flipEffect.limitRotation && (a = Math.max(Math.min(s[0].progress, 1), -1));
        var r = -180 * a,
            o = 0,
            l = -s[0].swiperSlideOffset,
            d = 0;

        if (this.isHorizontal() ? t && (r = -r) : (d = l, l = 0, o = -r, r = 0), s[0].style.zIndex = -Math.abs(Math.round(a)) + e.length, this.params.flipEffect.slideShadows) {
          var h = this.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
              p = this.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
          0 === h.length && (h = n('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), s.append(h)), 0 === p.length && (p = n('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(p)), h.length && (h[0].style.opacity = Math.max(-a, 0)), p.length && (p[0].style.opacity = Math.max(a, 0));
        }

        s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + r + "deg)");
      }
    },
    setTransition: function setTransition(e) {
      var t = this,
          i = t.slides,
          s = t.activeIndex,
          a = t.$wrapperEl;

      if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
        var r = !1;
        i.eq(s).transitionEnd(function () {
          if (!r && t && !t.destroyed) {
            r = !0, t.animating = !1;

            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) {
              a.trigger(e[i]);
            }
          }
        });
      }
    }
  },
      ye = {
    setTranslate: function setTranslate() {
      for (var e = this.width, t = this.height, i = this.slides, s = this.$wrapperEl, a = this.slidesSizesGrid, r = this.params.coverflowEffect, o = this.isHorizontal(), l = this.translate, d = o ? e / 2 - l : t / 2 - l, p = o ? r.rotate : -r.rotate, c = r.depth, u = 0, v = i.length; u < v; u += 1) {
        var f = i.eq(u),
            m = a[u],
            g = (d - f[0].swiperSlideOffset - m / 2) / m * r.modifier,
            b = o ? p * g : 0,
            w = o ? 0 : p * g,
            y = -c * Math.abs(g),
            x = r.stretch;
        "string" == typeof x && -1 !== x.indexOf("%") && (x = parseFloat(r.stretch) / 100 * m);
        var E = o ? 0 : x * g,
            T = o ? x * g : 0;
        Math.abs(T) < .001 && (T = 0), Math.abs(E) < .001 && (E = 0), Math.abs(y) < .001 && (y = 0), Math.abs(b) < .001 && (b = 0), Math.abs(w) < .001 && (w = 0);
        var S = "translate3d(" + T + "px," + E + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";

        if (f.transform(S), f[0].style.zIndex = 1 - Math.abs(Math.round(g)), r.slideShadows) {
          var C = o ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
              M = o ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
          0 === C.length && (C = n('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), f.append(C)), 0 === M.length && (M = n('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), f.append(M)), C.length && (C[0].style.opacity = g > 0 ? g : 0), M.length && (M[0].style.opacity = -g > 0 ? -g : 0);
        }
      }

      (h.pointerEvents || h.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%");
    },
    setTransition: function setTransition(e) {
      this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
    }
  },
      xe = {
    init: function init() {
      var e = this.params.thumbs,
          t = this.constructor;
      e.swiper instanceof t ? (this.thumbs.swiper = e.swiper, d.extend(this.thumbs.swiper.originalParams, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), d.extend(this.thumbs.swiper.params, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      })) : d.isObject(e.swiper) && (this.thumbs.swiper = new t(d.extend({}, e.swiper, {
        watchSlidesVisibility: !0,
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      })), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick);
    },
    onThumbClick: function onThumbClick() {
      var e = this.thumbs.swiper;

      if (e) {
        var t = e.clickedIndex,
            i = e.clickedSlide;

        if (!(i && n(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
          var s;

          if (s = e.params.loop ? parseInt(n(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t, this.params.loop) {
            var a = this.activeIndex;
            this.slides.eq(a).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, a = this.activeIndex);
            var r = this.slides.eq(a).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                o = this.slides.eq(a).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
            s = void 0 === r ? o : void 0 === o ? r : o - a < a - r ? o : r;
          }

          this.slideTo(s);
        }
      }
    },
    update: function update(e) {
      var t = this.thumbs.swiper;

      if (t) {
        var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView,
            s = this.params.thumbs.autoScrollOffset,
            a = s && !t.params.loop;

        if (this.realIndex !== t.realIndex || a) {
          var r,
              n,
              o = t.activeIndex;

          if (t.params.loop) {
            t.slides.eq(o).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, o = t.activeIndex);
            var l = t.slides.eq(o).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(),
                d = t.slides.eq(o).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
            r = void 0 === l ? d : void 0 === d ? l : d - o == o - l ? o : d - o < o - l ? d : l, n = this.activeIndex > this.previousIndex ? "next" : "prev";
          } else n = (r = this.realIndex) > this.previousIndex ? "next" : "prev";

          a && (r += "next" === n ? s : -1 * s), t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(r) < 0 && (t.params.centeredSlides ? r = r > o ? r - Math.floor(i / 2) + 1 : r + Math.floor(i / 2) - 1 : r > o && (r = r - i + 1), t.slideTo(r, e ? 0 : void 0));
        }

        var h = 1,
            p = this.params.thumbs.slideThumbActiveClass;
        if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (h = this.params.slidesPerView), this.params.thumbs.multipleActiveThumbs || (h = 1), h = Math.floor(h), t.slides.removeClass(p), t.params.loop || t.params.virtual && t.params.virtual.enabled) for (var c = 0; c < h; c += 1) {
          t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + c) + '"]').addClass(p);
        } else for (var u = 0; u < h; u += 1) {
          t.slides.eq(this.realIndex + u).addClass(p);
        }
      }
    }
  },
      Ee = [K, U, Z, Q, ee, ie, ae, {
    name: "mousewheel",
    params: {
      mousewheel: {
        enabled: !1,
        releaseOnEdges: !1,
        invert: !1,
        forceToAxis: !1,
        sensitivity: 1,
        eventsTarged: "container"
      }
    },
    create: function create() {
      d.extend(this, {
        mousewheel: {
          enabled: !1,
          enable: re.enable.bind(this),
          disable: re.disable.bind(this),
          handle: re.handle.bind(this),
          handleMouseEnter: re.handleMouseEnter.bind(this),
          handleMouseLeave: re.handleMouseLeave.bind(this),
          animateSlider: re.animateSlider.bind(this),
          releaseScroll: re.releaseScroll.bind(this),
          lastScrollTime: d.now(),
          lastEventBeforeSnap: void 0,
          recentWheelEvents: []
        }
      });
    },
    on: {
      init: function init() {
        !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(), this.params.mousewheel.enabled && this.mousewheel.enable();
      },
      destroy: function destroy() {
        this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable();
      }
    }
  }, {
    name: "navigation",
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock"
      }
    },
    create: function create() {
      d.extend(this, {
        navigation: {
          init: ne.init.bind(this),
          update: ne.update.bind(this),
          destroy: ne.destroy.bind(this),
          onNextClick: ne.onNextClick.bind(this),
          onPrevClick: ne.onPrevClick.bind(this)
        }
      });
    },
    on: {
      init: function init() {
        this.navigation.init(), this.navigation.update();
      },
      toEdge: function toEdge() {
        this.navigation.update();
      },
      fromEdge: function fromEdge() {
        this.navigation.update();
      },
      destroy: function destroy() {
        this.navigation.destroy();
      },
      click: function click(e) {
        var t,
            i = this.navigation,
            s = i.$nextEl,
            a = i.$prevEl;
        !this.params.navigation.hideOnClick || n(e.target).is(a) || n(e.target).is(s) || (s ? t = s.hasClass(this.params.navigation.hiddenClass) : a && (t = a.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), s && s.toggleClass(this.params.navigation.hiddenClass), a && a.toggleClass(this.params.navigation.hiddenClass));
      }
    }
  }, {
    name: "pagination",
    params: {
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: function formatFractionCurrent(e) {
          return e;
        },
        formatFractionTotal: function formatFractionTotal(e) {
          return e;
        },
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        modifierClass: "swiper-pagination-",
        currentClass: "swiper-pagination-current",
        totalClass: "swiper-pagination-total",
        hiddenClass: "swiper-pagination-hidden",
        progressbarFillClass: "swiper-pagination-progressbar-fill",
        progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
        clickableClass: "swiper-pagination-clickable",
        lockClass: "swiper-pagination-lock"
      }
    },
    create: function create() {
      d.extend(this, {
        pagination: {
          init: oe.init.bind(this),
          render: oe.render.bind(this),
          update: oe.update.bind(this),
          destroy: oe.destroy.bind(this),
          dynamicBulletIndex: 0
        }
      });
    },
    on: {
      init: function init() {
        this.pagination.init(), this.pagination.render(), this.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        (this.params.loop || void 0 === this.snapIndex) && this.pagination.update();
      },
      snapIndexChange: function snapIndexChange() {
        this.params.loop || this.pagination.update();
      },
      slidesLengthChange: function slidesLengthChange() {
        this.params.loop && (this.pagination.render(), this.pagination.update());
      },
      snapGridLengthChange: function snapGridLengthChange() {
        this.params.loop || (this.pagination.render(), this.pagination.update());
      },
      destroy: function destroy() {
        this.pagination.destroy();
      },
      click: function click(e) {
        this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !n(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass));
      }
    }
  }, {
    name: "scrollbar",
    params: {
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag"
      }
    },
    create: function create() {
      d.extend(this, {
        scrollbar: {
          init: le.init.bind(this),
          destroy: le.destroy.bind(this),
          updateSize: le.updateSize.bind(this),
          setTranslate: le.setTranslate.bind(this),
          setTransition: le.setTransition.bind(this),
          enableDraggable: le.enableDraggable.bind(this),
          disableDraggable: le.disableDraggable.bind(this),
          setDragPosition: le.setDragPosition.bind(this),
          getPointerPosition: le.getPointerPosition.bind(this),
          onDragStart: le.onDragStart.bind(this),
          onDragMove: le.onDragMove.bind(this),
          onDragEnd: le.onDragEnd.bind(this),
          isTouched: !1,
          timeout: null,
          dragTimeout: null
        }
      });
    },
    on: {
      init: function init() {
        this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate();
      },
      update: function update() {
        this.scrollbar.updateSize();
      },
      resize: function resize() {
        this.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        this.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        this.scrollbar.setTranslate();
      },
      setTransition: function setTransition(e) {
        this.scrollbar.setTransition(e);
      },
      destroy: function destroy() {
        this.scrollbar.destroy();
      }
    }
  }, {
    name: "parallax",
    params: {
      parallax: {
        enabled: !1
      }
    },
    create: function create() {
      d.extend(this, {
        parallax: {
          setTransform: de.setTransform.bind(this),
          setTranslate: de.setTranslate.bind(this),
          setTransition: de.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0);
      },
      init: function init() {
        this.params.parallax.enabled && this.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        this.params.parallax.enabled && this.parallax.setTranslate();
      },
      setTransition: function setTransition(e) {
        this.params.parallax.enabled && this.parallax.setTransition(e);
      }
    }
  }, {
    name: "zoom",
    params: {
      zoom: {
        enabled: !1,
        maxRatio: 3,
        minRatio: 1,
        toggle: !0,
        containerClass: "swiper-zoom-container",
        zoomedSlideClass: "swiper-slide-zoomed"
      }
    },
    create: function create() {
      var e = this,
          t = {
        enabled: !1,
        scale: 1,
        currentScale: 1,
        isScaling: !1,
        gesture: {
          $slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          $imageEl: void 0,
          $imageWrapEl: void 0,
          maxRatio: 3
        },
        image: {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {}
        },
        velocity: {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0
        }
      };
      "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (i) {
        t[i] = he[i].bind(e);
      }), d.extend(e, {
        zoom: t
      });
      var i = 1;
      Object.defineProperty(e.zoom, "scale", {
        get: function get() {
          return i;
        },
        set: function set(t) {
          if (i !== t) {
            var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
            e.emit("zoomChange", t, s, a);
          }

          i = t;
        }
      });
    },
    on: {
      init: function init() {
        this.params.zoom.enabled && this.zoom.enable();
      },
      destroy: function destroy() {
        this.zoom.disable();
      },
      touchStart: function touchStart(e) {
        this.zoom.enabled && this.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        this.zoom.enabled && this.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e);
      },
      transitionEnd: function transitionEnd() {
        this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd();
      },
      slideChange: function slideChange() {
        this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd();
      }
    }
  }, {
    name: "lazy",
    params: {
      lazy: {
        enabled: !1,
        loadPrevNext: !1,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: !1,
        elementClass: "swiper-lazy",
        loadingClass: "swiper-lazy-loading",
        loadedClass: "swiper-lazy-loaded",
        preloaderClass: "swiper-lazy-preloader"
      }
    },
    create: function create() {
      d.extend(this, {
        lazy: {
          initialImageLoaded: !1,
          load: pe.load.bind(this),
          loadInSlide: pe.loadInSlide.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1);
      },
      init: function init() {
        this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load();
      },
      scroll: function scroll() {
        this.params.freeMode && !this.params.freeModeSticky && this.lazy.load();
      },
      resize: function resize() {
        this.params.lazy.enabled && this.lazy.load();
      },
      scrollbarDragMove: function scrollbarDragMove() {
        this.params.lazy.enabled && this.lazy.load();
      },
      transitionStart: function transitionStart() {
        this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load();
      },
      transitionEnd: function transitionEnd() {
        this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load();
      },
      slideChange: function slideChange() {
        this.params.lazy.enabled && this.params.cssMode && this.lazy.load();
      }
    }
  }, {
    name: "controller",
    params: {
      controller: {
        control: void 0,
        inverse: !1,
        by: "slide"
      }
    },
    create: function create() {
      d.extend(this, {
        controller: {
          control: this.params.controller.control,
          getInterpolateFunction: ce.getInterpolateFunction.bind(this),
          setTranslate: ce.setTranslate.bind(this),
          setTransition: ce.setTransition.bind(this)
        }
      });
    },
    on: {
      update: function update() {
        this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
      },
      resize: function resize() {
        this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
      },
      observerUpdate: function observerUpdate() {
        this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
      },
      setTranslate: function setTranslate(e, t) {
        this.controller.control && this.controller.setTranslate(e, t);
      },
      setTransition: function setTransition(e, t) {
        this.controller.control && this.controller.setTransition(e, t);
      }
    }
  }, {
    name: "a11y",
    params: {
      a11y: {
        enabled: !0,
        notificationClass: "swiper-notification",
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}"
      }
    },
    create: function create() {
      var e = this;
      d.extend(e, {
        a11y: {
          liveRegion: n('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
        }
      }), Object.keys(ue).forEach(function (t) {
        e.a11y[t] = ue[t].bind(e);
      });
    },
    on: {
      init: function init() {
        this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation());
      },
      toEdge: function toEdge() {
        this.params.a11y.enabled && this.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        this.params.a11y.enabled && this.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        this.params.a11y.enabled && this.a11y.updatePagination();
      },
      destroy: function destroy() {
        this.params.a11y.enabled && this.a11y.destroy();
      }
    }
  }, {
    name: "history",
    params: {
      history: {
        enabled: !1,
        replaceState: !1,
        key: "slides"
      }
    },
    create: function create() {
      d.extend(this, {
        history: {
          init: ve.init.bind(this),
          setHistory: ve.setHistory.bind(this),
          setHistoryPopState: ve.setHistoryPopState.bind(this),
          scrollToSlide: ve.scrollToSlide.bind(this),
          destroy: ve.destroy.bind(this)
        }
      });
    },
    on: {
      init: function init() {
        this.params.history.enabled && this.history.init();
      },
      destroy: function destroy() {
        this.params.history.enabled && this.history.destroy();
      },
      transitionEnd: function transitionEnd() {
        this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex);
      },
      slideChange: function slideChange() {
        this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex);
      }
    }
  }, {
    name: "hash-navigation",
    params: {
      hashNavigation: {
        enabled: !1,
        replaceState: !1,
        watchState: !1
      }
    },
    create: function create() {
      d.extend(this, {
        hashNavigation: {
          initialized: !1,
          init: fe.init.bind(this),
          destroy: fe.destroy.bind(this),
          setHash: fe.setHash.bind(this),
          onHashCange: fe.onHashCange.bind(this)
        }
      });
    },
    on: {
      init: function init() {
        this.params.hashNavigation.enabled && this.hashNavigation.init();
      },
      destroy: function destroy() {
        this.params.hashNavigation.enabled && this.hashNavigation.destroy();
      },
      transitionEnd: function transitionEnd() {
        this.hashNavigation.initialized && this.hashNavigation.setHash();
      },
      slideChange: function slideChange() {
        this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash();
      }
    }
  }, {
    name: "autoplay",
    params: {
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !0,
        stopOnLastSlide: !1,
        reverseDirection: !1
      }
    },
    create: function create() {
      var e = this;
      d.extend(e, {
        autoplay: {
          running: !1,
          paused: !1,
          run: me.run.bind(e),
          start: me.start.bind(e),
          stop: me.stop.bind(e),
          pause: me.pause.bind(e),
          onVisibilityChange: function onVisibilityChange() {
            "hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1);
          },
          onTransitionEnd: function onTransitionEnd(t) {
            e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop());
          }
        }
      });
    },
    on: {
      init: function init() {
        this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange));
      },
      beforeTransitionStart: function beforeTransitionStart(e, t) {
        this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop());
      },
      sliderFirstMove: function sliderFirstMove() {
        this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause());
      },
      touchEnd: function touchEnd() {
        this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run();
      },
      destroy: function destroy() {
        this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange);
      }
    }
  }, {
    name: "effect-fade",
    params: {
      fadeEffect: {
        crossFade: !1
      }
    },
    create: function create() {
      d.extend(this, {
        fadeEffect: {
          setTranslate: ge.setTranslate.bind(this),
          setTransition: ge.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        if ("fade" === this.params.effect) {
          this.classNames.push(this.params.containerModifierClass + "fade");
          var e = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !0
          };
          d.extend(this.params, e), d.extend(this.originalParams, e);
        }
      },
      setTranslate: function setTranslate() {
        "fade" === this.params.effect && this.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(e) {
        "fade" === this.params.effect && this.fadeEffect.setTransition(e);
      }
    }
  }, {
    name: "effect-cube",
    params: {
      cubeEffect: {
        slideShadows: !0,
        shadow: !0,
        shadowOffset: 20,
        shadowScale: .94
      }
    },
    create: function create() {
      d.extend(this, {
        cubeEffect: {
          setTranslate: be.setTranslate.bind(this),
          setTransition: be.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        if ("cube" === this.params.effect) {
          this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
          var e = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0
          };
          d.extend(this.params, e), d.extend(this.originalParams, e);
        }
      },
      setTranslate: function setTranslate() {
        "cube" === this.params.effect && this.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(e) {
        "cube" === this.params.effect && this.cubeEffect.setTransition(e);
      }
    }
  }, {
    name: "effect-flip",
    params: {
      flipEffect: {
        slideShadows: !0,
        limitRotation: !0
      }
    },
    create: function create() {
      d.extend(this, {
        flipEffect: {
          setTranslate: we.setTranslate.bind(this),
          setTransition: we.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        if ("flip" === this.params.effect) {
          this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
          var e = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !0
          };
          d.extend(this.params, e), d.extend(this.originalParams, e);
        }
      },
      setTranslate: function setTranslate() {
        "flip" === this.params.effect && this.flipEffect.setTranslate();
      },
      setTransition: function setTransition(e) {
        "flip" === this.params.effect && this.flipEffect.setTransition(e);
      }
    }
  }, {
    name: "effect-coverflow",
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: !0
      }
    },
    create: function create() {
      d.extend(this, {
        coverflowEffect: {
          setTranslate: ye.setTranslate.bind(this),
          setTransition: ye.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0);
      },
      setTranslate: function setTranslate() {
        "coverflow" === this.params.effect && this.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(e) {
        "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e);
      }
    }
  }, {
    name: "thumbs",
    params: {
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-container-thumbs"
      }
    },
    create: function create() {
      d.extend(this, {
        thumbs: {
          swiper: null,
          init: xe.init.bind(this),
          update: xe.update.bind(this),
          onThumbClick: xe.onThumbClick.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var e = this.params.thumbs;
        e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
      },
      slideChange: function slideChange() {
        this.thumbs.swiper && this.thumbs.update();
      },
      update: function update() {
        this.thumbs.swiper && this.thumbs.update();
      },
      resize: function resize() {
        this.thumbs.swiper && this.thumbs.update();
      },
      observerUpdate: function observerUpdate() {
        this.thumbs.swiper && this.thumbs.update();
      },
      setTransition: function setTransition(e) {
        var t = this.thumbs.swiper;
        t && t.setTransition(e);
      },
      beforeDestroy: function beforeDestroy() {
        var e = this.thumbs.swiper;
        e && this.thumbs.swiperCreated && e && e.destroy();
      }
    }
  }];
  return void 0 === j.use && (j.use = j.Class.use, j.installModule = j.Class.installModule), j.use(Ee), j;
});

/***/ }),

/***/ "../modules/lazyLoad.js":
/*!******************************!*\
  !*** ../modules/lazyLoad.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  'use strict';

  if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) window.addEventListener('load', function () {
    // start
    var pItems = Array.from(document.querySelectorAll('img[data-src]')),
        timer;
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', scroller, false);
    inView(); // throttled scroll/resize

    function scroller(e) {
      timer = timer || setTimeout(function () {
        timer = null;
        requestAnimationFrame(inView);
      }, 300);
    } // image in view?


    function inView() {
      var wT = window.pageYOffset,
          wB = wT + window.innerHeight,
          cRect,
          pT,
          pB,
          p = 0;

      while (p < pItems.length) {
        cRect = pItems[p].getBoundingClientRect();
        pT = wT + cRect.top;
        pB = pT + cRect.height;

        if (wT < pB && wB > pT) {
          loadFullImage(pItems[p]);
          pItems.splice(p, 1);
        } else p++;
      }
    } // replace with full image


    function loadFullImage(item) {
      if (!item || !(item.dataset.src || item.dataset.srcset)) return; // load image

      var img = new Image();

      if (item.dataset.srcset) {
        img.srcset = item.dataset.srcset;
      } else {
        img.src = item.dataset.src;
      }

      img.className = item.className;
      img.alt = item.alt;
      if (img.complete) addImg();else img.onload = addImg; // replace image

      function addImg() {
        // disable click
        item.addEventListener('click', function (e) {
          e.preventDefault();
        }, false); // add full image

        item.before(img); //remove preload  

        item.remove();
      }
    }
  }, false);
};

/***/ }),

/***/ "./home.js":
/*!*****************!*\
  !*** ./home.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/global */ "../../scss/global.scss");
/* harmony import */ var _scss_global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_pages_home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scss/pages/home/page */ "../../scss/pages/home/page.scss");
/* harmony import */ var _scss_pages_home_page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_pages_home_page__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__(/*! ../modules/polyfills */ "../modules/polyfills.js")();

__webpack_require__(/*! ../modules/menu */ "../modules/menu.js")();

__webpack_require__(/*! ../modules/lazyLoad */ "../modules/lazyLoad.js")();

var Swiper = __webpack_require__(/*! ../lib/swiper */ "../lib/swiper.js");

__webpack_require__.e(/*! import() | footer */ "footer").then(__webpack_require__.bind(null, /*! ../modules/footer */ "../modules/footer.js")).then(function (module) {
  module.default();
});

 //services slider

var slidesPerView, gap;
calcSlider();
var servicesSlider = new Swiper('.services-slider', {
  slidesPerView: slidesPerView,
  spaceBetween: gap,
  autoHeight: true,
  speed: 2000,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  }
});
window.addEventListener('resize', function () {
  calcSlider();
  updateSlider();
});

function calcSlider() {
  var maxSlideWidth = window.innerHeight * 0.9 / 3,
      amount = window.innerWidth / maxSlideWidth;
  slidesPerView = Math.trunc(amount);
  gap = (amount - slidesPerView) * maxSlideWidth / (slidesPerView - 1);

  if (slidesPerView <= 1) {
    slidesPerView = 2;
    gap = 0;
  }
}

function updateSlider() {
  servicesSlider.params.slidesPerView = slidesPerView;
  servicesSlider.params.spaceBetween = gap;
  servicesSlider.params.loop = true;
  servicesSlider.params.autoplay = {
    delay: 2000
  };
  servicesSlider.params.speed = 2000;
}

var portfolioSlider = new Swiper('.portfolio-slider', {
  grabCursor: true,
  speed: 700,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.portfolio-pagination',
    clickable: true
  }
});

/***/ }),

/***/ 0:
/*!*****************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://192.168.0.187:1406 ./home.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! E:\Front End\projects\1_rembud\node_modules\webpack-dev-server\client\index.js?http://192.168.0.187:1406 */"../../../node_modules/webpack-dev-server/client/index.js?http://192.168.0.187:1406");
module.exports = __webpack_require__(/*! ./home.js */"./home.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0U6L0Zyb250IEVuZC9wcm9qZWN0cy8xX3JlbWJ1ZC9zcmMvc2Nzcy9wYWdlcy9ob21lL3BhZ2Uuc2Nzcz80YjQzIiwid2VicGFjazovLy8uLi9saWIvc3dpcGVyLmpzIiwid2VicGFjazovLy8uLi9tb2R1bGVzL2xhenlMb2FkLmpzIiwid2VicGFjazovLy8uL2hvbWUuanMiXSwibmFtZXMiOlsiZSIsInQiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJpIiwicyIsImtleXMiLCJmb3JFYWNoIiwiYSIsImxlbmd0aCIsImRvY3VtZW50IiwiYm9keSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWN0aXZlRWxlbWVudCIsImJsdXIiLCJub2RlTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImNyZWF0ZUVsZW1lbnQiLCJjaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJzdHlsZSIsInNldEF0dHJpYnV0ZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY3JlYXRlRWxlbWVudE5TIiwiaW1wb3J0Tm9kZSIsImxvY2F0aW9uIiwiaGFzaCIsImhvc3QiLCJob3N0bmFtZSIsImhyZWYiLCJvcmlnaW4iLCJwYXRobmFtZSIsInByb3RvY29sIiwic2VhcmNoIiwid2luZG93IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInB1c2hTdGF0ZSIsImdvIiwiYmFjayIsIkN1c3RvbUV2ZW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiLCJJbWFnZSIsIkRhdGUiLCJzY3JlZW4iLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwibWF0Y2hNZWRpYSIsInIiLCJuIiwibyIsImwiLCJkIiwidHJpbSIsImluZGV4T2YiLCJoIiwiaW5uZXJIVE1MIiwicHVzaCIsIm1hdGNoIiwic3BsaXQiLCJub2RlVHlwZSIsImZuIiwicHJvdG90eXBlIiwiQ2xhc3MiLCJEb203IiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmVDbGFzcyIsInJlbW92ZSIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJ0b2dnbGVDbGFzcyIsInRvZ2dsZSIsImF0dHIiLCJhcmd1bWVudHMiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyIiwicmVtb3ZlQXR0cmlidXRlIiwiZGF0YSIsImRvbTdFbGVtZW50RGF0YVN0b3JhZ2UiLCJ0cmFuc2Zvcm0iLCJ3ZWJraXRUcmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwid2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwib24iLCJ0YXJnZXQiLCJkb203RXZlbnREYXRhIiwidW5zaGlmdCIsImlzIiwiYXBwbHkiLCJwYXJlbnRzIiwicCIsImMiLCJ1IiwidiIsImRvbTdMaXZlTGlzdGVuZXJzIiwibGlzdGVuZXIiLCJwcm94eUxpc3RlbmVyIiwiZiIsImRvbTdMaXN0ZW5lcnMiLCJvZmYiLCJkb203cHJveHkiLCJzcGxpY2UiLCJ0cmlnZ2VyIiwiZGV0YWlsIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJmaWx0ZXIiLCJkaXNwYXRjaEV2ZW50IiwidHJhbnNpdGlvbkVuZCIsImNhbGwiLCJvdXRlcldpZHRoIiwic3R5bGVzIiwib2Zmc2V0V2lkdGgiLCJwYXJzZUZsb2F0Iiwib3V0ZXJIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRUb3AiLCJjbGllbnRMZWZ0Iiwic2Nyb2xsWSIsInNjcm9sbFRvcCIsInNjcm9sbFgiLCJzY3JvbGxMZWZ0IiwidG9wIiwibGVmdCIsImNzcyIsImVhY2giLCJodG1sIiwidGV4dCIsInRleHRDb250ZW50IiwibWF0Y2hlcyIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwiaW5kZXgiLCJwcmV2aW91c1NpYmxpbmciLCJlcSIsImFwcGVuZCIsImZpcnN0Q2hpbGQiLCJhcHBlbmRDaGlsZCIsInByZXBlbmQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0IiwibmV4dEVsZW1lbnRTaWJsaW5nIiwibmV4dEFsbCIsInByZXYiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwicHJldkFsbCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJjbG9zZXN0IiwiZmluZCIsInJlbW92ZUNoaWxkIiwiZGVsZXRlUHJvcHMiLCJuZXh0VGljayIsIm5vdyIsImdldFRyYW5zbGF0ZSIsIldlYktpdENTU01hdHJpeCIsIm1hcCIsInJlcGxhY2UiLCJqb2luIiwiTW96VHJhbnNmb3JtIiwiT1RyYW5zZm9ybSIsIk1zVHJhbnNmb3JtIiwibXNUcmFuc2Zvcm0iLCJ0b1N0cmluZyIsIm00MSIsIm00MiIsInBhcnNlVXJsUXVlcnkiLCJkZWNvZGVVUklDb21wb25lbnQiLCJpc09iamVjdCIsImV4dGVuZCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJ0b3VjaCIsIkRvY3VtZW50VG91Y2giLCJwb2ludGVyRXZlbnRzIiwiUG9pbnRlckV2ZW50IiwibWF4VG91Y2hQb2ludHMiLCJvYnNlcnZlciIsInBhc3NpdmVMaXN0ZW5lciIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZ2VzdHVyZXMiLCJwYXJhbXMiLCJldmVudHNMaXN0ZW5lcnMiLCJjb21wb25lbnRzIiwiY29uZmlndXJhYmxlIiwib25jZSIsImY3cHJveHkiLCJlbWl0IiwiQXJyYXkiLCJpc0FycmF5Iiwic2xpY2UiLCJldmVudHMiLCJjb250ZXh0IiwidXNlTW9kdWxlc1BhcmFtcyIsIm1vZHVsZXMiLCJ1c2VNb2R1bGVzIiwiaW5zdGFuY2UiLCJiaW5kIiwiY3JlYXRlIiwic2V0IiwidXNlIiwiaW5zdGFsbE1vZHVsZSIsIm5hbWUiLCJwcm90byIsInN0YXRpYyIsImluc3RhbGwiLCJjb25jYXQiLCJkZWZpbmVQcm9wZXJ0aWVzIiwidXBkYXRlU2l6ZSIsIiRlbCIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJoZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpc0hvcml6b250YWwiLCJpc1ZlcnRpY2FsIiwicGFyc2VJbnQiLCJzaXplIiwidXBkYXRlU2xpZGVzIiwiJHdyYXBwZXJFbCIsInJ0bFRyYW5zbGF0ZSIsIndyb25nUlRMIiwidmlydHVhbCIsImVuYWJsZWQiLCJzbGlkZXMiLCJzbGlkZUNsYXNzIiwiY3NzTW9kZSIsInNsaWRlc09mZnNldEJlZm9yZSIsIm0iLCJzbGlkZXNPZmZzZXRBZnRlciIsImciLCJzbmFwR3JpZCIsImIiLCJ3Iiwic3BhY2VCZXR3ZWVuIiwieSIsIngiLCJFIiwiVCIsIlMiLCJ2aXJ0dWFsU2l6ZSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5SaWdodCIsIm1hcmdpbkJvdHRvbSIsInNsaWRlc1BlckNvbHVtbiIsIk1hdGgiLCJmbG9vciIsImNlaWwiLCJzbGlkZXNQZXJWaWV3Iiwic2xpZGVzUGVyQ29sdW1uRmlsbCIsIm1heCIsIkMiLCJNIiwiUCIsInoiLCJrIiwiJCIsIkwiLCJJIiwiTyIsInNsaWRlc1Blckdyb3VwIiwiRCIsIkEiLCJHIiwibWluIiwib3JkZXIiLCJIIiwiQiIsIk4iLCJyb3VuZExlbmd0aHMiLCJYIiwiViIsIlkiLCJGIiwiVyIsIlIiLCJxIiwiaiIsIksiLCJVIiwiXyIsIloiLCJzd2lwZXJTbGlkZVNpemUiLCJjZW50ZXJlZFNsaWRlcyIsImFicyIsInNsaWRlc1Blckdyb3VwU2tpcCIsImVmZmVjdCIsInNldFdyYXBwZXJTaXplIiwiUSIsIkoiLCJlZSIsInRlIiwiY2VudGVyZWRTbGlkZXNCb3VuZHMiLCJpZSIsInNlIiwiY2VudGVySW5zdWZmaWNpZW50U2xpZGVzIiwiYWUiLCJyZSIsInNsaWRlc0dyaWQiLCJzbGlkZXNTaXplc0dyaWQiLCJ3YXRjaE92ZXJmbG93IiwiY2hlY2tPdmVyZmxvdyIsIndhdGNoU2xpZGVzUHJvZ3Jlc3MiLCJ3YXRjaFNsaWRlc1Zpc2liaWxpdHkiLCJ1cGRhdGVTbGlkZXNPZmZzZXQiLCJ1cGRhdGVBdXRvSGVpZ2h0Iiwic2V0VHJhbnNpdGlvbiIsInNwZWVkIiwidmlzaWJsZVNsaWRlcyIsImFjdGl2ZUluZGV4Iiwic3dpcGVyU2xpZGVPZmZzZXQiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwidXBkYXRlU2xpZGVzUHJvZ3Jlc3MiLCJ0cmFuc2xhdGUiLCJzbGlkZVZpc2libGVDbGFzcyIsInZpc2libGVTbGlkZXNJbmRleGVzIiwibWluVHJhbnNsYXRlIiwiYXV0b0hlaWdodCIsInByb2dyZXNzIiwidXBkYXRlUHJvZ3Jlc3MiLCJtYXhUcmFuc2xhdGUiLCJpc0JlZ2lubmluZyIsImlzRW5kIiwidXBkYXRlU2xpZGVzQ2xhc3NlcyIsInJlYWxJbmRleCIsInNsaWRlQWN0aXZlQ2xhc3MiLCJzbGlkZU5leHRDbGFzcyIsInNsaWRlUHJldkNsYXNzIiwic2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyIsInNsaWRlRHVwbGljYXRlTmV4dENsYXNzIiwic2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MiLCJsb29wIiwic2xpZGVEdXBsaWNhdGVDbGFzcyIsInVwZGF0ZUFjdGl2ZUluZGV4Iiwic25hcEluZGV4Iiwibm9ybWFsaXplU2xpZGVJbmRleCIsInByZXZpb3VzSW5kZXgiLCJpbml0aWFsaXplZCIsInJ1bkNhbGxiYWNrc09uSW5pdCIsInVwZGF0ZUNsaWNrZWRTbGlkZSIsImNsaWNrZWRTbGlkZSIsImNsaWNrZWRJbmRleCIsInNsaWRlVG9DbGlja2VkU2xpZGUiLCJ2aXJ0dWFsVHJhbnNsYXRlIiwic2V0VHJhbnNsYXRlIiwid3JhcHBlckVsIiwicHJldmlvdXNUcmFuc2xhdGUiLCJ0cmFuc2xhdGVUbyIsImFuaW1hdGluZyIsInByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbiIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJvblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQiLCJkZXN0cm95ZWQiLCJ0cmFuc2l0aW9uU3RhcnQiLCJzbGlkZVRvIiwiaW5pdGlhbFNsaWRlIiwiYWxsb3dTbGlkZU5leHQiLCJhbGxvd1NsaWRlUHJldiIsInNjcm9sbFdpZHRoIiwib25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQiLCJzbGlkZVRvTG9vcCIsImxvb3BlZFNsaWRlcyIsInNsaWRlTmV4dCIsImxvb3BGaXgiLCJfY2xpZW50TGVmdCIsInNsaWRlUHJldiIsInNsaWRlUmVzZXQiLCJzbGlkZVRvQ2xvc2VzdCIsInNsaWRlc1BlclZpZXdEeW5hbWljIiwibG9vcENyZWF0ZSIsImxvb3BGaWxsR3JvdXBXaXRoQmxhbmsiLCJzbGlkZUJsYW5rQ2xhc3MiLCJsb29wQWRkaXRpb25hbFNsaWRlcyIsImNsb25lTm9kZSIsImxvb3BEZXN0cm95Iiwic2V0R3JhYkN1cnNvciIsInNpbXVsYXRlVG91Y2giLCJpc0xvY2tlZCIsImVsIiwiY3Vyc29yIiwidW5zZXRHcmFiQ3Vyc29yIiwiYXBwZW5kU2xpZGUiLCJ1cGRhdGUiLCJwcmVwZW5kU2xpZGUiLCJhZGRTbGlkZSIsInJlbW92ZVNsaWRlIiwicmVtb3ZlQWxsU2xpZGVzIiwicGxhdGZvcm0iLCJpb3MiLCJhbmRyb2lkIiwiYW5kcm9pZENocm9tZSIsImRlc2t0b3AiLCJpcGhvbmUiLCJpcG9kIiwiaXBhZCIsImVkZ2UiLCJmaXJlZm94IiwibWFjb3MiLCJ3aW5kb3dzIiwiY29yZG92YSIsInBob25lZ2FwIiwiZWxlY3Ryb24iLCJ0b0xvd2VyQ2FzZSIsIm9zIiwib3NWZXJzaW9uIiwid2ViVmlldyIsInN0YW5kYWxvbmUiLCJ3ZWJ2aWV3IiwicGl4ZWxSYXRpbyIsImRldmljZVBpeGVsUmF0aW8iLCJ0b3VjaEV2ZW50c0RhdGEiLCJ0b3VjaGVzIiwib3JpZ2luYWxFdmVudCIsInRvdWNoRXZlbnRzVGFyZ2V0IiwiaXNUb3VjaEV2ZW50IiwidHlwZSIsIndoaWNoIiwiYnV0dG9uIiwiaXNUb3VjaGVkIiwiaXNNb3ZlZCIsIm5vU3dpcGluZyIsIm5vU3dpcGluZ1NlbGVjdG9yIiwibm9Td2lwaW5nQ2xhc3MiLCJhbGxvd0NsaWNrIiwic3dpcGVIYW5kbGVyIiwiY3VycmVudFgiLCJ0YXJnZXRUb3VjaGVzIiwicGFnZVgiLCJjdXJyZW50WSIsInBhZ2VZIiwiZWRnZVN3aXBlRGV0ZWN0aW9uIiwiaU9TRWRnZVN3aXBlRGV0ZWN0aW9uIiwiZWRnZVN3aXBlVGhyZXNob2xkIiwiaU9TRWRnZVN3aXBlVGhyZXNob2xkIiwiYWxsb3dUb3VjaENhbGxiYWNrcyIsImlzU2Nyb2xsaW5nIiwic3RhcnRNb3ZpbmciLCJzdGFydFgiLCJzdGFydFkiLCJ0b3VjaFN0YXJ0VGltZSIsInN3aXBlRGlyZWN0aW9uIiwidGhyZXNob2xkIiwiYWxsb3dUaHJlc2hvbGRNb3ZlIiwiZm9ybUVsZW1lbnRzIiwiYWxsb3dUb3VjaE1vdmUiLCJ0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQiLCJ0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCIsInByZXZlbnREZWZhdWx0IiwiY2hhbmdlZFRvdWNoZXMiLCJwcmV2ZW50ZWRCeU5lc3RlZFN3aXBlciIsInRvdWNoUmVsZWFzZU9uRWRnZXMiLCJzcXJ0IiwicG93IiwiYXRhbjIiLCJQSSIsInRvdWNoQW5nbGUiLCJ0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24iLCJuZXN0ZWQiLCJzdG9wUHJvcGFnYXRpb24iLCJzdGFydFRyYW5zbGF0ZSIsImFsbG93TW9tZW50dW1Cb3VuY2UiLCJncmFiQ3Vyc29yIiwiZGlmZiIsInRvdWNoUmF0aW8iLCJjdXJyZW50VHJhbnNsYXRlIiwicmVzaXN0YW5jZVJhdGlvIiwicmVzaXN0YW5jZSIsImZvbGxvd0ZpbmdlciIsImZyZWVNb2RlIiwidmVsb2NpdGllcyIsInBvc2l0aW9uIiwidGltZSIsImxhc3RDbGlja1RpbWUiLCJmcmVlTW9kZU1vbWVudHVtIiwicG9wIiwidmVsb2NpdHkiLCJmcmVlTW9kZU1pbmltdW1WZWxvY2l0eSIsImZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvIiwiZnJlZU1vZGVNb21lbnR1bVJhdGlvIiwiZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvIiwiZnJlZU1vZGVNb21lbnR1bUJvdW5jZSIsImZyZWVNb2RlU3RpY2t5IiwibG9uZ1N3aXBlc01zIiwibG9uZ1N3aXBlcyIsImxvbmdTd2lwZXNSYXRpbyIsInNob3J0U3dpcGVzIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsImJyZWFrcG9pbnRzIiwic2V0QnJlYWtwb2ludCIsImF1dG9wbGF5IiwicnVubmluZyIsInBhdXNlZCIsInJ1biIsInByZXZlbnRDbGlja3MiLCJwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24iLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJpbml0IiwiZGlyZWN0aW9uIiwidXBkYXRlT25XaW5kb3dSZXNpemUiLCJ1bmlxdWVOYXZFbGVtZW50cyIsInByZWxvYWRJbWFnZXMiLCJ1cGRhdGVPbkltYWdlc1JlYWR5IiwicGFzc2l2ZUxpc3RlbmVycyIsImNvbnRhaW5lck1vZGlmaWVyQ2xhc3MiLCJ3cmFwcGVyQ2xhc3MiLCJzbGlkZSIsIm1hbmlwdWxhdGlvbiIsImF0dGFjaEV2ZW50cyIsInRvdWNoRXZlbnRzIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwib25TY3JvbGwiLCJvbkNsaWNrIiwic3RhcnQiLCJtb3ZlIiwiZW5kIiwicGFzc2l2ZSIsImNhcHR1cmUiLCJjYW5jZWwiLCJkZXRhY2hFdmVudHMiLCJnZXRCcmVha3BvaW50IiwiY3VycmVudEJyZWFrcG9pbnQiLCJvcmlnaW5hbFBhcmFtcyIsImNoYW5nZURpcmVjdGlvbiIsInN1YnN0ciIsInZhbHVlIiwiaW5uZXJIZWlnaHQiLCJwb2ludCIsInNvcnQiLCJpbm5lcldpZHRoIiwiY2xhc3NlcyIsImFkZENsYXNzZXMiLCJjbGFzc05hbWVzIiwicnRsIiwicmVtb3ZlQ2xhc3NlcyIsImltYWdlcyIsImxvYWRJbWFnZSIsImNvbXBsZXRlIiwib25sb2FkIiwib25lcnJvciIsInNpemVzIiwic3Jjc2V0Iiwic3JjIiwiaW1hZ2VzTG9hZGVkIiwiaW1hZ2VzVG9Mb2FkIiwiY3VycmVudFNyYyIsInBhc3NlZFBhcmFtcyIsInN3aXBlciIsInNoYWRvd1Jvb3QiLCJkaXIiLCJ0b3VjaEV2ZW50c1RvdWNoIiwidG91Y2hFdmVudHNEZXNrdG9wIiwiY2xpY2tUaW1lb3V0IiwiX19wcm90b19fIiwiZXh0ZW5kZWREZWZhdWx0cyIsImRlZmF1bHRzIiwiZGVzdHJveSIsImV4dGVuZERlZmF1bHRzIiwiZGV2aWNlIiwic3VwcG9ydCIsImlzRWRnZSIsImlzU2FmYXJpIiwiaXNVaVdlYlZpZXciLCJ0ZXN0IiwiYnJvd3NlciIsInJlc2l6ZSIsInJlc2l6ZUhhbmRsZXIiLCJvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIiLCJmdW5jIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYmtpdE11dGF0aW9uT2JzZXJ2ZXIiLCJhdHRhY2giLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImNoaWxkTGlzdCIsImNoYXJhY3RlckRhdGEiLCJvYnNlcnZlcnMiLCJvYnNlcnZlUGFyZW50cyIsIm9ic2VydmVTbGlkZUNoaWxkcmVuIiwiZGlzY29ubmVjdCIsImFkZFNsaWRlc0JlZm9yZSIsImFkZFNsaWRlc0FmdGVyIiwiZnJvbSIsInRvIiwicmVuZGVyU2xpZGUiLCJsYXp5IiwibG9hZCIsInJlbmRlckV4dGVybmFsIiwiY2FjaGUiLCJiZWZvcmVJbml0IiwiaGFuZGxlIiwia2V5Q29kZSIsImNoYXJDb2RlIiwic2hpZnRLZXkiLCJhbHRLZXkiLCJjdHJsS2V5IiwibWV0YUtleSIsImtleWJvYXJkIiwib25seUluVmlld3BvcnQiLCJyZXR1cm5WYWx1ZSIsImVuYWJsZSIsImRpc2FibGUiLCJsYXN0U2Nyb2xsVGltZSIsImxhc3RFdmVudEJlZm9yZVNuYXAiLCJyZWNlbnRXaGVlbEV2ZW50cyIsImV2ZW50Iiwib253aGVlbCIsImltcGxlbWVudGF0aW9uIiwiaGFzRmVhdHVyZSIsIm5vcm1hbGl6ZSIsIndoZWVsRGVsdGEiLCJ3aGVlbERlbHRhWSIsIndoZWVsRGVsdGFYIiwiYXhpcyIsIkhPUklaT05UQUxfQVhJUyIsImRlbHRhWSIsImRlbHRhWCIsImRlbHRhTW9kZSIsInNwaW5YIiwic3BpblkiLCJwaXhlbFgiLCJwaXhlbFkiLCJoYW5kbGVNb3VzZUVudGVyIiwibW91c2VFbnRlcmVkIiwiaGFuZGxlTW91c2VMZWF2ZSIsIm1vdXNld2hlZWwiLCJldmVudHNUYXJnZWQiLCJyZWxlYXNlT25FZGdlcyIsImZvcmNlVG9BeGlzIiwiaW52ZXJ0IiwiZGVsdGEiLCJzaWduIiwic2Vuc2l0aXZpdHkiLCJ0aW1lb3V0Iiwic2hpZnQiLCJhdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uIiwic3RvcCIsInJhdyIsImFuaW1hdGVTbGlkZXIiLCJyZWxlYXNlU2Nyb2xsIiwiZ2V0VGltZSIsIm5lIiwiJG5leHRFbCIsIiRwcmV2RWwiLCJkaXNhYmxlZENsYXNzIiwibG9ja0NsYXNzIiwib25QcmV2Q2xpY2siLCJvbk5leHRDbGljayIsIm9lIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiYnVsbGV0cyIsImR5bmFtaWNCdWxsZXRzIiwiYnVsbGV0U2l6ZSIsImR5bmFtaWNNYWluQnVsbGV0cyIsImR5bmFtaWNCdWxsZXRJbmRleCIsImJ1bGxldEFjdGl2ZUNsYXNzIiwiY3VycmVudENsYXNzIiwiZm9ybWF0RnJhY3Rpb25DdXJyZW50IiwidG90YWxDbGFzcyIsImZvcm1hdEZyYWN0aW9uVG90YWwiLCJwcm9ncmVzc2Jhck9wcG9zaXRlIiwicHJvZ3Jlc3NiYXJGaWxsQ2xhc3MiLCJyZW5kZXJDdXN0b20iLCJyZW5kZXIiLCJyZW5kZXJCdWxsZXQiLCJidWxsZXRDbGFzcyIsImJ1bGxldEVsZW1lbnQiLCJyZW5kZXJGcmFjdGlvbiIsInJlbmRlclByb2dyZXNzYmFyIiwiY2xpY2thYmxlIiwiY2xpY2thYmxlQ2xhc3MiLCJtb2RpZmllckNsYXNzIiwicHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzIiwiaGlkZGVuQ2xhc3MiLCJsZSIsInNjcm9sbGJhciIsImRyYWdTaXplIiwidHJhY2tTaXplIiwiJGRyYWdFbCIsImhpZGUiLCJvcGFjaXR5IiwiZGlzcGxheSIsImRpdmlkZXIiLCJtb3ZlRGl2aWRlciIsImdldFBvaW50ZXJQb3NpdGlvbiIsImNsaWVudFgiLCJjbGllbnRZIiwic2V0RHJhZ1Bvc2l0aW9uIiwiZHJhZ1N0YXJ0UG9zIiwib25EcmFnU3RhcnQiLCJkcmFnVGltZW91dCIsIm9uRHJhZ01vdmUiLCJvbkRyYWdFbmQiLCJzbmFwT25SZWxlYXNlIiwiZW5hYmxlRHJhZ2dhYmxlIiwiZGlzYWJsZURyYWdnYWJsZSIsImRyYWdDbGFzcyIsImRyYWdFbCIsImRyYWdnYWJsZSIsImRlIiwic2V0VHJhbnNmb3JtIiwicGFyYWxsYXgiLCJoZSIsImdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMiLCJvbkdlc3R1cmVTdGFydCIsInpvb20iLCJnZXN0dXJlIiwiZmFrZUdlc3R1cmVUb3VjaGVkIiwiZmFrZUdlc3R1cmVNb3ZlZCIsInNjYWxlU3RhcnQiLCIkc2xpZGVFbCIsIiRpbWFnZUVsIiwiJGltYWdlV3JhcEVsIiwiY29udGFpbmVyQ2xhc3MiLCJtYXhSYXRpbyIsImlzU2NhbGluZyIsIm9uR2VzdHVyZUNoYW5nZSIsInNjYWxlTW92ZSIsInNjYWxlIiwiY3VycmVudFNjYWxlIiwibWluUmF0aW8iLCJvbkdlc3R1cmVFbmQiLCJpbWFnZSIsInRvdWNoZXNTdGFydCIsInNsaWRlV2lkdGgiLCJzbGlkZUhlaWdodCIsIm1pblgiLCJtYXhYIiwibWluWSIsIm1heFkiLCJ0b3VjaGVzQ3VycmVudCIsInByZXZQb3NpdGlvblgiLCJwcmV2UG9zaXRpb25ZIiwicHJldlRpbWUiLCJvblRyYW5zaXRpb25FbmQiLCJvdXQiLCJpbiIsInpvb21lZFNsaWRlQ2xhc3MiLCJwZSIsImxvYWRJblNsaWRlIiwiZWxlbWVudENsYXNzIiwibG9hZGVkQ2xhc3MiLCJsb2FkaW5nQ2xhc3MiLCJwcmVsb2FkZXJDbGFzcyIsImluaXRpYWxJbWFnZUxvYWRlZCIsImxvYWRQcmV2TmV4dCIsImxvYWRQcmV2TmV4dEFtb3VudCIsImNlIiwiTGluZWFyU3BsaW5lIiwibGFzdEluZGV4IiwiaW50ZXJwb2xhdGUiLCJnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uIiwiY29udHJvbGxlciIsInNwbGluZSIsImNvbnRyb2wiLCJieSIsImludmVyc2UiLCJ1ZSIsIm1ha2VFbEZvY3VzYWJsZSIsIm1ha2VFbE5vdEZvY3VzYWJsZSIsImFkZEVsUm9sZSIsImFkZEVsTGFiZWwiLCJkaXNhYmxlRWwiLCJlbmFibGVFbCIsIm9uRW50ZXJLZXkiLCJhMTF5Iiwibm90aWZ5IiwibGFzdFNsaWRlTWVzc2FnZSIsIm5leHRTbGlkZU1lc3NhZ2UiLCJmaXJzdFNsaWRlTWVzc2FnZSIsInByZXZTbGlkZU1lc3NhZ2UiLCJjbGljayIsImxpdmVSZWdpb24iLCJ1cGRhdGVOYXZpZ2F0aW9uIiwidXBkYXRlUGFnaW5hdGlvbiIsInBhZ2luYXRpb25CdWxsZXRNZXNzYWdlIiwidmUiLCJoYXNoTmF2aWdhdGlvbiIsInBhdGhzIiwiZ2V0UGF0aFZhbHVlcyIsImtleSIsInNjcm9sbFRvU2xpZGUiLCJzZXRIaXN0b3J5UG9wU3RhdGUiLCJzZXRIaXN0b3J5Iiwic2x1Z2lmeSIsImluY2x1ZGVzIiwic3RhdGUiLCJmZSIsIm9uSGFzaENhbmdlIiwic2V0SGFzaCIsIndhdGNoU3RhdGUiLCJtZSIsImRlbGF5IiwicmV2ZXJzZURpcmVjdGlvbiIsInN0b3BPbkxhc3RTbGlkZSIsInBhdXNlIiwid2FpdEZvclRyYW5zaXRpb24iLCJnZSIsImZhZGVFZmZlY3QiLCJjcm9zc0ZhZGUiLCJiZSIsImN1YmVFZmZlY3QiLCJzaGFkb3ciLCJzbGlkZVNoYWRvd3MiLCJzaGFkb3dPZmZzZXQiLCJzaGFkb3dTY2FsZSIsInNpbiIsImNvcyIsIndlIiwiZmxpcEVmZmVjdCIsImxpbWl0Um90YXRpb24iLCJ6SW5kZXgiLCJyb3VuZCIsInllIiwiY292ZXJmbG93RWZmZWN0Iiwicm90YXRlIiwiZGVwdGgiLCJtb2RpZmllciIsInN0cmV0Y2giLCJwcmVmaXhlZFBvaW50ZXJFdmVudHMiLCJwZXJzcGVjdGl2ZU9yaWdpbiIsInhlIiwidGh1bWJzIiwic3dpcGVyQ3JlYXRlZCIsInRodW1ic0NvbnRhaW5lckNsYXNzIiwib25UaHVtYkNsaWNrIiwic2xpZGVUaHVtYkFjdGl2ZUNsYXNzIiwiYXV0b1Njcm9sbE9mZnNldCIsIm11bHRpcGxlQWN0aXZlVGh1bWJzIiwiRWUiLCJoaWRlT25DbGljayIsInRvRWRnZSIsImZyb21FZGdlIiwiYWN0aXZlSW5kZXhDaGFuZ2UiLCJzbmFwSW5kZXhDaGFuZ2UiLCJzbGlkZXNMZW5ndGhDaGFuZ2UiLCJzbmFwR3JpZExlbmd0aENoYW5nZSIsIm9ic2VydmVyVXBkYXRlIiwidG91Y2hTdGFydCIsInRvdWNoRW5kIiwiZG91YmxlVGFwIiwic2xpZGVDaGFuZ2UiLCJsb2FkT25UcmFuc2l0aW9uU3RhcnQiLCJzY3JvbGwiLCJzY3JvbGxiYXJEcmFnTW92ZSIsIm5vdGlmaWNhdGlvbkNsYXNzIiwicGFnaW5hdGlvblVwZGF0ZSIsImRpc2FibGVPbkludGVyYWN0aW9uIiwib25WaXNpYmlsaXR5Q2hhbmdlIiwidmlzaWJpbGl0eVN0YXRlIiwiYmVmb3JlVHJhbnNpdGlvblN0YXJ0Iiwic2xpZGVyRmlyc3RNb3ZlIiwiYmVmb3JlRGVzdHJveSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJwSXRlbXMiLCJ0aW1lciIsInNjcm9sbGVyIiwiaW5WaWV3Iiwid1QiLCJwYWdlWU9mZnNldCIsIndCIiwiY1JlY3QiLCJwVCIsInBCIiwibG9hZEZ1bGxJbWFnZSIsIml0ZW0iLCJkYXRhc2V0IiwiaW1nIiwiY2xhc3NOYW1lIiwiYWx0IiwiYWRkSW1nIiwiYmVmb3JlIiwicmVxdWlyZSIsIlN3aXBlciIsInRoZW4iLCJkZWZhdWx0IiwiZ2FwIiwiY2FsY1NsaWRlciIsInNlcnZpY2VzU2xpZGVyIiwidXBkYXRlU2xpZGVyIiwibWF4U2xpZGVXaWR0aCIsImFtb3VudCIsInRydW5jIiwicG9ydGZvbGlvU2xpZGVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLDRDQUE0QyxrQkFBa0I7UUFDOUQ7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTs7UUFFQTtRQUNBLGlDQUFpQzs7UUFFakM7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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QXNCK0gsS0FBdEIsR0FBNkIsSUFBN0I7QUFDRDs7QUFJRCxJQUFJdWtCLGVBQWUsR0FBRyxJQUFJVixNQUFKLENBQVcsbUJBQVgsRUFBZ0M7QUFDcERqYSxZQUFVLEVBQUUsSUFEd0M7QUFFcEQ1SixPQUFLLEVBQUUsR0FGNkM7QUFHcER5QixNQUFJLEVBQUUsSUFIOEM7QUFJcERpSyxVQUFRLEVBQUU7QUFDUmtULFNBQUssRUFBRSxJQURDO0FBRVJ1RCx3QkFBb0IsRUFBRTtBQUZkLEdBSjBDO0FBUXBEdk0sWUFBVSxFQUFFO0FBQ1ZuUixNQUFFLEVBQUUsdUJBRE07QUFFVndTLGFBQVMsRUFBRTtBQUZEO0FBUndDLENBQWhDLENBQXRCLEMiLCJmaWxlIjoianMvaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuIFx0XHR2YXIgcHJlZmV0Y2hDaHVua3MgPSBkYXRhWzNdIHx8IFtdO1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcbiBcdFx0ZGVmZXJyZWRQcmVmZXRjaC5wdXNoLmFwcGx5KGRlZmVycmVkUHJlZmV0Y2gsIHByZWZldGNoQ2h1bmtzKTtcbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG4gXHRcdFx0Ly8gY2h1bmsgcHJlZmV0Y2hpbmcgZm9yIGphdmFzY3JpcHRcbiBcdFx0XHRkZWZlcnJlZFByZWZldGNoLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gbnVsbDtcbiBcdFx0XHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiBcdFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0XHRsaW5rLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGxpbmsucmVsID0gXCJwcmVmZXRjaFwiO1xuIFx0XHRcdFx0XHRsaW5rLmFzID0gXCJzY3JpcHRcIjtcbiBcdFx0XHRcdFx0bGluay5ocmVmID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSk7XG4gXHRcdFx0ZGVmZXJyZWRQcmVmZXRjaC5sZW5ndGggPSAwO1xuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImhvbWVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdLCBkZWZlcnJlZFByZWZldGNoID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcImpzL1wiICsgKHtcImZvb3RlclwiOlwiZm9vdGVyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4uLy4uL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdHZhciBzdGFydHVwUmVzdWx0ID0gKGZ1bmN0aW9uKCkge1xuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnN+YWJvdXR+Y29udGFjdH5ob21lfnBvcnRmb2xpb35zZXJ2aWNlc350ZWFtfnZhY2FuY2llc1wiLFwiYWJvdXR+aG9tZVwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH0pKCk7XG5cbiBcdHdlYnBhY2tKc29ucENhbGxiYWNrKFtbXSwge30sIDAsIFtcImZvb3RlclwiXV0pO1xuIFx0cmV0dXJuIHN0YXJ0dXBSZXN1bHQ7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKipcclxuICogU3dpcGVyIDUuNC4xXHJcbiAqIE1vc3QgbW9kZXJuIG1vYmlsZSB0b3VjaCBzbGlkZXIgYW5kIGZyYW1ld29yayB3aXRoIGhhcmR3YXJlIGFjY2VsZXJhdGVkIHRyYW5zaXRpb25zXHJcbiAqIGh0dHA6Ly9zd2lwZXJqcy5jb21cclxuICpcclxuICogQ29weXJpZ2h0IDIwMTQtMjAyMCBWbGFkaW1pciBLaGFybGFtcGlkaVxyXG4gKlxyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICpcclxuICogUmVsZWFzZWQgb246IE1heSAyMCwgMjAyMFxyXG4gKi9cclxuXHJcbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPWV8fHNlbGYpLlN3aXBlcj10KCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZShlKXtyZXR1cm4gbnVsbCE9PWUmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZcImNvbnN0cnVjdG9yXCJpbiBlJiZlLmNvbnN0cnVjdG9yPT09T2JqZWN0fWZ1bmN0aW9uIHQoaSxzKXt2b2lkIDA9PT1pJiYoaT17fSksdm9pZCAwPT09cyYmKHM9e30pLE9iamVjdC5rZXlzKHMpLmZvckVhY2goKGZ1bmN0aW9uKGEpe3ZvaWQgMD09PWlbYV0/aVthXT1zW2FdOmUoc1thXSkmJmUoaVthXSkmJk9iamVjdC5rZXlzKHNbYV0pLmxlbmd0aD4wJiZ0KGlbYV0sc1thXSl9KSl9dmFyIGk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50P2RvY3VtZW50Ont9LHM9e2JvZHk6e30sYWRkRXZlbnRMaXN0ZW5lcjpmdW5jdGlvbigpe30scmVtb3ZlRXZlbnRMaXN0ZW5lcjpmdW5jdGlvbigpe30sYWN0aXZlRWxlbWVudDp7Ymx1cjpmdW5jdGlvbigpe30sbm9kZU5hbWU6XCJcIn0scXVlcnlTZWxlY3RvcjpmdW5jdGlvbigpe3JldHVybiBudWxsfSxxdWVyeVNlbGVjdG9yQWxsOmZ1bmN0aW9uKCl7cmV0dXJuW119LGdldEVsZW1lbnRCeUlkOmZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9LGNyZWF0ZUV2ZW50OmZ1bmN0aW9uKCl7cmV0dXJue2luaXRFdmVudDpmdW5jdGlvbigpe319fSxjcmVhdGVFbGVtZW50OmZ1bmN0aW9uKCl7cmV0dXJue2NoaWxkcmVuOltdLGNoaWxkTm9kZXM6W10sc3R5bGU6e30sc2V0QXR0cmlidXRlOmZ1bmN0aW9uKCl7fSxnZXRFbGVtZW50c0J5VGFnTmFtZTpmdW5jdGlvbigpe3JldHVybltdfX19LGNyZWF0ZUVsZW1lbnROUzpmdW5jdGlvbigpe3JldHVybnt9fSxpbXBvcnROb2RlOmZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9LGxvY2F0aW9uOntoYXNoOlwiXCIsaG9zdDpcIlwiLGhvc3RuYW1lOlwiXCIsaHJlZjpcIlwiLG9yaWdpbjpcIlwiLHBhdGhuYW1lOlwiXCIscHJvdG9jb2w6XCJcIixzZWFyY2g6XCJcIn19O3QoaSxzKTt2YXIgYT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fTt0KGEse2RvY3VtZW50OnMsbmF2aWdhdG9yOnt1c2VyQWdlbnQ6XCJcIn0sbG9jYXRpb246e2hhc2g6XCJcIixob3N0OlwiXCIsaG9zdG5hbWU6XCJcIixocmVmOlwiXCIsb3JpZ2luOlwiXCIscGF0aG5hbWU6XCJcIixwcm90b2NvbDpcIlwiLHNlYXJjaDpcIlwifSxoaXN0b3J5OntyZXBsYWNlU3RhdGU6ZnVuY3Rpb24oKXt9LHB1c2hTdGF0ZTpmdW5jdGlvbigpe30sZ286ZnVuY3Rpb24oKXt9LGJhY2s6ZnVuY3Rpb24oKXt9fSxDdXN0b21FdmVudDpmdW5jdGlvbigpe3JldHVybiB0aGlzfSxhZGRFdmVudExpc3RlbmVyOmZ1bmN0aW9uKCl7fSxyZW1vdmVFdmVudExpc3RlbmVyOmZ1bmN0aW9uKCl7fSxnZXRDb21wdXRlZFN0eWxlOmZ1bmN0aW9uKCl7cmV0dXJue2dldFByb3BlcnR5VmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm5cIlwifX19LEltYWdlOmZ1bmN0aW9uKCl7fSxEYXRlOmZ1bmN0aW9uKCl7fSxzY3JlZW46e30sc2V0VGltZW91dDpmdW5jdGlvbigpe30sY2xlYXJUaW1lb3V0OmZ1bmN0aW9uKCl7fSxtYXRjaE1lZGlhOmZ1bmN0aW9uKCl7cmV0dXJue319fSk7dmFyIHI9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTA7dDxlLmxlbmd0aDt0Kz0xKXRoaXNbdF09ZVt0XTtyZXR1cm4gdGhpcy5sZW5ndGg9ZS5sZW5ndGgsdGhpc307ZnVuY3Rpb24gbihlLHQpe3ZhciBzPVtdLG49MDtpZihlJiYhdCYmZSBpbnN0YW5jZW9mIHIpcmV0dXJuIGU7aWYoZSlpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7dmFyIG8sbCxkPWUudHJpbSgpO2lmKGQuaW5kZXhPZihcIjxcIik+PTAmJmQuaW5kZXhPZihcIj5cIik+PTApe3ZhciBoPVwiZGl2XCI7Zm9yKDA9PT1kLmluZGV4T2YoXCI8bGlcIikmJihoPVwidWxcIiksMD09PWQuaW5kZXhPZihcIjx0clwiKSYmKGg9XCJ0Ym9keVwiKSwwIT09ZC5pbmRleE9mKFwiPHRkXCIpJiYwIT09ZC5pbmRleE9mKFwiPHRoXCIpfHwoaD1cInRyXCIpLDA9PT1kLmluZGV4T2YoXCI8dGJvZHlcIikmJihoPVwidGFibGVcIiksMD09PWQuaW5kZXhPZihcIjxvcHRpb25cIikmJihoPVwic2VsZWN0XCIpLChsPWkuY3JlYXRlRWxlbWVudChoKSkuaW5uZXJIVE1MPWQsbj0wO248bC5jaGlsZE5vZGVzLmxlbmd0aDtuKz0xKXMucHVzaChsLmNoaWxkTm9kZXNbbl0pfWVsc2UgZm9yKG89dHx8XCIjXCIhPT1lWzBdfHxlLm1hdGNoKC9bIC48Pjp+XS8pPyh0fHxpKS5xdWVyeVNlbGVjdG9yQWxsKGUudHJpbSgpKTpbaS5nZXRFbGVtZW50QnlJZChlLnRyaW0oKS5zcGxpdChcIiNcIilbMV0pXSxuPTA7bjxvLmxlbmd0aDtuKz0xKW9bbl0mJnMucHVzaChvW25dKX1lbHNlIGlmKGUubm9kZVR5cGV8fGU9PT1hfHxlPT09aSlzLnB1c2goZSk7ZWxzZSBpZihlLmxlbmd0aD4wJiZlWzBdLm5vZGVUeXBlKWZvcihuPTA7bjxlLmxlbmd0aDtuKz0xKXMucHVzaChlW25dKTtyZXR1cm4gbmV3IHIocyl9ZnVuY3Rpb24gbyhlKXtmb3IodmFyIHQ9W10saT0wO2k8ZS5sZW5ndGg7aSs9MSktMT09PXQuaW5kZXhPZihlW2ldKSYmdC5wdXNoKGVbaV0pO3JldHVybiB0fW4uZm49ci5wcm90b3R5cGUsbi5DbGFzcz1yLG4uRG9tNz1yO3ZhciBsPXthZGRDbGFzczpmdW5jdGlvbihlKXtpZih2b2lkIDA9PT1lKXJldHVybiB0aGlzO2Zvcih2YXIgdD1lLnNwbGl0KFwiIFwiKSxpPTA7aTx0Lmxlbmd0aDtpKz0xKWZvcih2YXIgcz0wO3M8dGhpcy5sZW5ndGg7cys9MSl2b2lkIDAhPT10aGlzW3NdJiZ2b2lkIDAhPT10aGlzW3NdLmNsYXNzTGlzdCYmdGhpc1tzXS5jbGFzc0xpc3QuYWRkKHRbaV0pO3JldHVybiB0aGlzfSxyZW1vdmVDbGFzczpmdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5zcGxpdChcIiBcIiksaT0wO2k8dC5sZW5ndGg7aSs9MSlmb3IodmFyIHM9MDtzPHRoaXMubGVuZ3RoO3MrPTEpdm9pZCAwIT09dGhpc1tzXSYmdm9pZCAwIT09dGhpc1tzXS5jbGFzc0xpc3QmJnRoaXNbc10uY2xhc3NMaXN0LnJlbW92ZSh0W2ldKTtyZXR1cm4gdGhpc30saGFzQ2xhc3M6ZnVuY3Rpb24oZSl7cmV0dXJuISF0aGlzWzBdJiZ0aGlzWzBdLmNsYXNzTGlzdC5jb250YWlucyhlKX0sdG9nZ2xlQ2xhc3M6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWUuc3BsaXQoXCIgXCIpLGk9MDtpPHQubGVuZ3RoO2krPTEpZm9yKHZhciBzPTA7czx0aGlzLmxlbmd0aDtzKz0xKXZvaWQgMCE9PXRoaXNbc10mJnZvaWQgMCE9PXRoaXNbc10uY2xhc3NMaXN0JiZ0aGlzW3NdLmNsYXNzTGlzdC50b2dnbGUodFtpXSk7cmV0dXJuIHRoaXN9LGF0dHI6ZnVuY3Rpb24oZSx0KXt2YXIgaT1hcmd1bWVudHM7aWYoMT09PWFyZ3VtZW50cy5sZW5ndGgmJlwic3RyaW5nXCI9PXR5cGVvZiBlKXJldHVybiB0aGlzWzBdP3RoaXNbMF0uZ2V0QXR0cmlidXRlKGUpOnZvaWQgMDtmb3IodmFyIHM9MDtzPHRoaXMubGVuZ3RoO3MrPTEpaWYoMj09PWkubGVuZ3RoKXRoaXNbc10uc2V0QXR0cmlidXRlKGUsdCk7ZWxzZSBmb3IodmFyIGEgaW4gZSl0aGlzW3NdW2FdPWVbYV0sdGhpc1tzXS5zZXRBdHRyaWJ1dGUoYSxlW2FdKTtyZXR1cm4gdGhpc30scmVtb3ZlQXR0cjpmdW5jdGlvbihlKXtmb3IodmFyIHQ9MDt0PHRoaXMubGVuZ3RoO3QrPTEpdGhpc1t0XS5yZW1vdmVBdHRyaWJ1dGUoZSk7cmV0dXJuIHRoaXN9LGRhdGE6ZnVuY3Rpb24oZSx0KXt2YXIgaTtpZih2b2lkIDAhPT10KXtmb3IodmFyIHM9MDtzPHRoaXMubGVuZ3RoO3MrPTEpKGk9dGhpc1tzXSkuZG9tN0VsZW1lbnREYXRhU3RvcmFnZXx8KGkuZG9tN0VsZW1lbnREYXRhU3RvcmFnZT17fSksaS5kb203RWxlbWVudERhdGFTdG9yYWdlW2VdPXQ7cmV0dXJuIHRoaXN9aWYoaT10aGlzWzBdKXtpZihpLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UmJmUgaW4gaS5kb203RWxlbWVudERhdGFTdG9yYWdlKXJldHVybiBpLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2VbZV07dmFyIGE9aS5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK2UpO3JldHVybiBhfHx2b2lkIDB9fSx0cmFuc2Zvcm06ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTA7dDx0aGlzLmxlbmd0aDt0Kz0xKXt2YXIgaT10aGlzW3RdLnN0eWxlO2kud2Via2l0VHJhbnNmb3JtPWUsaS50cmFuc2Zvcm09ZX1yZXR1cm4gdGhpc30sdHJhbnNpdGlvbjpmdW5jdGlvbihlKXtcInN0cmluZ1wiIT10eXBlb2YgZSYmKGUrPVwibXNcIik7Zm9yKHZhciB0PTA7dDx0aGlzLmxlbmd0aDt0Kz0xKXt2YXIgaT10aGlzW3RdLnN0eWxlO2kud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uPWUsaS50cmFuc2l0aW9uRHVyYXRpb249ZX1yZXR1cm4gdGhpc30sb246ZnVuY3Rpb24oKXtmb3IodmFyIGUsdD1bXSxpPWFyZ3VtZW50cy5sZW5ndGg7aS0tOyl0W2ldPWFyZ3VtZW50c1tpXTt2YXIgcz10WzBdLGE9dFsxXSxyPXRbMl0sbz10WzNdO2Z1bmN0aW9uIGwoZSl7dmFyIHQ9ZS50YXJnZXQ7aWYodCl7dmFyIGk9ZS50YXJnZXQuZG9tN0V2ZW50RGF0YXx8W107aWYoaS5pbmRleE9mKGUpPDAmJmkudW5zaGlmdChlKSxuKHQpLmlzKGEpKXIuYXBwbHkodCxpKTtlbHNlIGZvcih2YXIgcz1uKHQpLnBhcmVudHMoKSxvPTA7bzxzLmxlbmd0aDtvKz0xKW4oc1tvXSkuaXMoYSkmJnIuYXBwbHkoc1tvXSxpKX19ZnVuY3Rpb24gZChlKXt2YXIgdD1lJiZlLnRhcmdldCYmZS50YXJnZXQuZG9tN0V2ZW50RGF0YXx8W107dC5pbmRleE9mKGUpPDAmJnQudW5zaGlmdChlKSxyLmFwcGx5KHRoaXMsdCl9XCJmdW5jdGlvblwiPT10eXBlb2YgdFsxXSYmKHM9KGU9dClbMF0scj1lWzFdLG89ZVsyXSxhPXZvaWQgMCksb3x8KG89ITEpO2Zvcih2YXIgaCxwPXMuc3BsaXQoXCIgXCIpLGM9MDtjPHRoaXMubGVuZ3RoO2MrPTEpe3ZhciB1PXRoaXNbY107aWYoYSlmb3IoaD0wO2g8cC5sZW5ndGg7aCs9MSl7dmFyIHY9cFtoXTt1LmRvbTdMaXZlTGlzdGVuZXJzfHwodS5kb203TGl2ZUxpc3RlbmVycz17fSksdS5kb203TGl2ZUxpc3RlbmVyc1t2XXx8KHUuZG9tN0xpdmVMaXN0ZW5lcnNbdl09W10pLHUuZG9tN0xpdmVMaXN0ZW5lcnNbdl0ucHVzaCh7bGlzdGVuZXI6cixwcm94eUxpc3RlbmVyOmx9KSx1LmFkZEV2ZW50TGlzdGVuZXIodixsLG8pfWVsc2UgZm9yKGg9MDtoPHAubGVuZ3RoO2grPTEpe3ZhciBmPXBbaF07dS5kb203TGlzdGVuZXJzfHwodS5kb203TGlzdGVuZXJzPXt9KSx1LmRvbTdMaXN0ZW5lcnNbZl18fCh1LmRvbTdMaXN0ZW5lcnNbZl09W10pLHUuZG9tN0xpc3RlbmVyc1tmXS5wdXNoKHtsaXN0ZW5lcjpyLHByb3h5TGlzdGVuZXI6ZH0pLHUuYWRkRXZlbnRMaXN0ZW5lcihmLGQsbyl9fXJldHVybiB0aGlzfSxvZmY6ZnVuY3Rpb24oKXtmb3IodmFyIGUsdD1bXSxpPWFyZ3VtZW50cy5sZW5ndGg7aS0tOyl0W2ldPWFyZ3VtZW50c1tpXTt2YXIgcz10WzBdLGE9dFsxXSxyPXRbMl0sbj10WzNdO1wiZnVuY3Rpb25cIj09dHlwZW9mIHRbMV0mJihzPShlPXQpWzBdLHI9ZVsxXSxuPWVbMl0sYT12b2lkIDApLG58fChuPSExKTtmb3IodmFyIG89cy5zcGxpdChcIiBcIiksbD0wO2w8by5sZW5ndGg7bCs9MSlmb3IodmFyIGQ9b1tsXSxoPTA7aDx0aGlzLmxlbmd0aDtoKz0xKXt2YXIgcD10aGlzW2hdLGM9dm9pZCAwO2lmKCFhJiZwLmRvbTdMaXN0ZW5lcnM/Yz1wLmRvbTdMaXN0ZW5lcnNbZF06YSYmcC5kb203TGl2ZUxpc3RlbmVycyYmKGM9cC5kb203TGl2ZUxpc3RlbmVyc1tkXSksYyYmYy5sZW5ndGgpZm9yKHZhciB1PWMubGVuZ3RoLTE7dT49MDt1LT0xKXt2YXIgdj1jW3VdO3ImJnYubGlzdGVuZXI9PT1yfHxyJiZ2Lmxpc3RlbmVyJiZ2Lmxpc3RlbmVyLmRvbTdwcm94eSYmdi5saXN0ZW5lci5kb203cHJveHk9PT1yPyhwLnJlbW92ZUV2ZW50TGlzdGVuZXIoZCx2LnByb3h5TGlzdGVuZXIsbiksYy5zcGxpY2UodSwxKSk6cnx8KHAucmVtb3ZlRXZlbnRMaXN0ZW5lcihkLHYucHJveHlMaXN0ZW5lcixuKSxjLnNwbGljZSh1LDEpKX19cmV0dXJuIHRoaXN9LHRyaWdnZXI6ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD1hcmd1bWVudHMubGVuZ3RoO3QtLTspZVt0XT1hcmd1bWVudHNbdF07Zm9yKHZhciBzPWVbMF0uc3BsaXQoXCIgXCIpLHI9ZVsxXSxuPTA7bjxzLmxlbmd0aDtuKz0xKWZvcih2YXIgbz1zW25dLGw9MDtsPHRoaXMubGVuZ3RoO2wrPTEpe3ZhciBkPXRoaXNbbF0saD12b2lkIDA7dHJ5e2g9bmV3IGEuQ3VzdG9tRXZlbnQobyx7ZGV0YWlsOnIsYnViYmxlczohMCxjYW5jZWxhYmxlOiEwfSl9Y2F0Y2goZSl7KGg9aS5jcmVhdGVFdmVudChcIkV2ZW50XCIpKS5pbml0RXZlbnQobywhMCwhMCksaC5kZXRhaWw9cn1kLmRvbTdFdmVudERhdGE9ZS5maWx0ZXIoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ+MH0pKSxkLmRpc3BhdGNoRXZlbnQoaCksZC5kb203RXZlbnREYXRhPVtdLGRlbGV0ZSBkLmRvbTdFdmVudERhdGF9cmV0dXJuIHRoaXN9LHRyYW5zaXRpb25FbmQ6ZnVuY3Rpb24oZSl7dmFyIHQsaT1bXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsXCJ0cmFuc2l0aW9uZW5kXCJdLHM9dGhpcztmdW5jdGlvbiBhKHIpe2lmKHIudGFyZ2V0PT09dGhpcylmb3IoZS5jYWxsKHRoaXMsciksdD0wO3Q8aS5sZW5ndGg7dCs9MSlzLm9mZihpW3RdLGEpfWlmKGUpZm9yKHQ9MDt0PGkubGVuZ3RoO3QrPTEpcy5vbihpW3RdLGEpO3JldHVybiB0aGlzfSxvdXRlcldpZHRoOmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoPjApe2lmKGUpe3ZhciB0PXRoaXMuc3R5bGVzKCk7cmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGgrcGFyc2VGbG9hdCh0LmdldFByb3BlcnR5VmFsdWUoXCJtYXJnaW4tcmlnaHRcIikpK3BhcnNlRmxvYXQodC5nZXRQcm9wZXJ0eVZhbHVlKFwibWFyZ2luLWxlZnRcIikpfXJldHVybiB0aGlzWzBdLm9mZnNldFdpZHRofXJldHVybiBudWxsfSxvdXRlckhlaWdodDpmdW5jdGlvbihlKXtpZih0aGlzLmxlbmd0aD4wKXtpZihlKXt2YXIgdD10aGlzLnN0eWxlcygpO3JldHVybiB0aGlzWzBdLm9mZnNldEhlaWdodCtwYXJzZUZsb2F0KHQuZ2V0UHJvcGVydHlWYWx1ZShcIm1hcmdpbi10b3BcIikpK3BhcnNlRmxvYXQodC5nZXRQcm9wZXJ0eVZhbHVlKFwibWFyZ2luLWJvdHRvbVwiKSl9cmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0fXJldHVybiBudWxsfSxvZmZzZXQ6ZnVuY3Rpb24oKXtpZih0aGlzLmxlbmd0aD4wKXt2YXIgZT10aGlzWzBdLHQ9ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxzPWkuYm9keSxyPWUuY2xpZW50VG9wfHxzLmNsaWVudFRvcHx8MCxuPWUuY2xpZW50TGVmdHx8cy5jbGllbnRMZWZ0fHwwLG89ZT09PWE/YS5zY3JvbGxZOmUuc2Nyb2xsVG9wLGw9ZT09PWE/YS5zY3JvbGxYOmUuc2Nyb2xsTGVmdDtyZXR1cm57dG9wOnQudG9wK28tcixsZWZ0OnQubGVmdCtsLW59fXJldHVybiBudWxsfSxjc3M6ZnVuY3Rpb24oZSx0KXt2YXIgaTtpZigxPT09YXJndW1lbnRzLmxlbmd0aCl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGUpe2ZvcihpPTA7aTx0aGlzLmxlbmd0aDtpKz0xKWZvcih2YXIgcyBpbiBlKXRoaXNbaV0uc3R5bGVbc109ZVtzXTtyZXR1cm4gdGhpc31pZih0aGlzWzBdKXJldHVybiBhLmdldENvbXB1dGVkU3R5bGUodGhpc1swXSxudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKGUpfWlmKDI9PT1hcmd1bWVudHMubGVuZ3RoJiZcInN0cmluZ1wiPT10eXBlb2YgZSl7Zm9yKGk9MDtpPHRoaXMubGVuZ3RoO2krPTEpdGhpc1tpXS5zdHlsZVtlXT10O3JldHVybiB0aGlzfXJldHVybiB0aGlzfSxlYWNoOmZ1bmN0aW9uKGUpe2lmKCFlKXJldHVybiB0aGlzO2Zvcih2YXIgdD0wO3Q8dGhpcy5sZW5ndGg7dCs9MSlpZighMT09PWUuY2FsbCh0aGlzW3RdLHQsdGhpc1t0XSkpcmV0dXJuIHRoaXM7cmV0dXJuIHRoaXN9LGh0bWw6ZnVuY3Rpb24oZSl7aWYodm9pZCAwPT09ZSlyZXR1cm4gdGhpc1swXT90aGlzWzBdLmlubmVySFRNTDp2b2lkIDA7Zm9yKHZhciB0PTA7dDx0aGlzLmxlbmd0aDt0Kz0xKXRoaXNbdF0uaW5uZXJIVE1MPWU7cmV0dXJuIHRoaXN9LHRleHQ6ZnVuY3Rpb24oZSl7aWYodm9pZCAwPT09ZSlyZXR1cm4gdGhpc1swXT90aGlzWzBdLnRleHRDb250ZW50LnRyaW0oKTpudWxsO2Zvcih2YXIgdD0wO3Q8dGhpcy5sZW5ndGg7dCs9MSl0aGlzW3RdLnRleHRDb250ZW50PWU7cmV0dXJuIHRoaXN9LGlzOmZ1bmN0aW9uKGUpe3ZhciB0LHMsbz10aGlzWzBdO2lmKCFvfHx2b2lkIDA9PT1lKXJldHVybiExO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXtpZihvLm1hdGNoZXMpcmV0dXJuIG8ubWF0Y2hlcyhlKTtpZihvLndlYmtpdE1hdGNoZXNTZWxlY3RvcilyZXR1cm4gby53ZWJraXRNYXRjaGVzU2VsZWN0b3IoZSk7aWYoby5tc01hdGNoZXNTZWxlY3RvcilyZXR1cm4gby5tc01hdGNoZXNTZWxlY3RvcihlKTtmb3IodD1uKGUpLHM9MDtzPHQubGVuZ3RoO3MrPTEpaWYodFtzXT09PW8pcmV0dXJuITA7cmV0dXJuITF9aWYoZT09PWkpcmV0dXJuIG89PT1pO2lmKGU9PT1hKXJldHVybiBvPT09YTtpZihlLm5vZGVUeXBlfHxlIGluc3RhbmNlb2Ygcil7Zm9yKHQ9ZS5ub2RlVHlwZT9bZV06ZSxzPTA7czx0Lmxlbmd0aDtzKz0xKWlmKHRbc109PT1vKXJldHVybiEwO3JldHVybiExfXJldHVybiExfSxpbmRleDpmdW5jdGlvbigpe3ZhciBlLHQ9dGhpc1swXTtpZih0KXtmb3IoZT0wO251bGwhPT0odD10LnByZXZpb3VzU2libGluZyk7KTE9PT10Lm5vZGVUeXBlJiYoZSs9MSk7cmV0dXJuIGV9fSxlcTpmdW5jdGlvbihlKXtpZih2b2lkIDA9PT1lKXJldHVybiB0aGlzO3ZhciB0LGk9dGhpcy5sZW5ndGg7cmV0dXJuIG5ldyByKGU+aS0xP1tdOmU8MD8odD1pK2UpPDA/W106W3RoaXNbdF1dOlt0aGlzW2VdXSl9LGFwcGVuZDpmdW5jdGlvbigpe2Zvcih2YXIgZSx0PVtdLHM9YXJndW1lbnRzLmxlbmd0aDtzLS07KXRbc109YXJndW1lbnRzW3NdO2Zvcih2YXIgYT0wO2E8dC5sZW5ndGg7YSs9MSl7ZT10W2FdO2Zvcih2YXIgbj0wO248dGhpcy5sZW5ndGg7bis9MSlpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7dmFyIG89aS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2ZvcihvLmlubmVySFRNTD1lO28uZmlyc3RDaGlsZDspdGhpc1tuXS5hcHBlbmRDaGlsZChvLmZpcnN0Q2hpbGQpfWVsc2UgaWYoZSBpbnN0YW5jZW9mIHIpZm9yKHZhciBsPTA7bDxlLmxlbmd0aDtsKz0xKXRoaXNbbl0uYXBwZW5kQ2hpbGQoZVtsXSk7ZWxzZSB0aGlzW25dLmFwcGVuZENoaWxkKGUpfXJldHVybiB0aGlzfSxwcmVwZW5kOmZ1bmN0aW9uKGUpe3ZhciB0LHM7Zm9yKHQ9MDt0PHRoaXMubGVuZ3RoO3QrPTEpaWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpe3ZhciBhPWkuY3JlYXRlRWxlbWVudChcImRpdlwiKTtmb3IoYS5pbm5lckhUTUw9ZSxzPWEuY2hpbGROb2Rlcy5sZW5ndGgtMTtzPj0wO3MtPTEpdGhpc1t0XS5pbnNlcnRCZWZvcmUoYS5jaGlsZE5vZGVzW3NdLHRoaXNbdF0uY2hpbGROb2Rlc1swXSl9ZWxzZSBpZihlIGluc3RhbmNlb2Ygcilmb3Iocz0wO3M8ZS5sZW5ndGg7cys9MSl0aGlzW3RdLmluc2VydEJlZm9yZShlW3NdLHRoaXNbdF0uY2hpbGROb2Rlc1swXSk7ZWxzZSB0aGlzW3RdLmluc2VydEJlZm9yZShlLHRoaXNbdF0uY2hpbGROb2Rlc1swXSk7cmV0dXJuIHRoaXN9LG5leHQ6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMubGVuZ3RoPjA/ZT90aGlzWzBdLm5leHRFbGVtZW50U2libGluZyYmbih0aGlzWzBdLm5leHRFbGVtZW50U2libGluZykuaXMoZSk/bmV3IHIoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk6bmV3IHIoW10pOnRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nP25ldyByKFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pOm5ldyByKFtdKTpuZXcgcihbXSl9LG5leHRBbGw6ZnVuY3Rpb24oZSl7dmFyIHQ9W10saT10aGlzWzBdO2lmKCFpKXJldHVybiBuZXcgcihbXSk7Zm9yKDtpLm5leHRFbGVtZW50U2libGluZzspe3ZhciBzPWkubmV4dEVsZW1lbnRTaWJsaW5nO2U/bihzKS5pcyhlKSYmdC5wdXNoKHMpOnQucHVzaChzKSxpPXN9cmV0dXJuIG5ldyByKHQpfSxwcmV2OmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoPjApe3ZhciB0PXRoaXNbMF07cmV0dXJuIGU/dC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nJiZuKHQucHJldmlvdXNFbGVtZW50U2libGluZykuaXMoZSk/bmV3IHIoW3QucHJldmlvdXNFbGVtZW50U2libGluZ10pOm5ldyByKFtdKTp0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc/bmV3IHIoW3QucHJldmlvdXNFbGVtZW50U2libGluZ10pOm5ldyByKFtdKX1yZXR1cm4gbmV3IHIoW10pfSxwcmV2QWxsOmZ1bmN0aW9uKGUpe3ZhciB0PVtdLGk9dGhpc1swXTtpZighaSlyZXR1cm4gbmV3IHIoW10pO2Zvcig7aS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nOyl7dmFyIHM9aS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO2U/bihzKS5pcyhlKSYmdC5wdXNoKHMpOnQucHVzaChzKSxpPXN9cmV0dXJuIG5ldyByKHQpfSxwYXJlbnQ6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLGk9MDtpPHRoaXMubGVuZ3RoO2krPTEpbnVsbCE9PXRoaXNbaV0ucGFyZW50Tm9kZSYmKGU/bih0aGlzW2ldLnBhcmVudE5vZGUpLmlzKGUpJiZ0LnB1c2godGhpc1tpXS5wYXJlbnROb2RlKTp0LnB1c2godGhpc1tpXS5wYXJlbnROb2RlKSk7cmV0dXJuIG4obyh0KSl9LHBhcmVudHM6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLGk9MDtpPHRoaXMubGVuZ3RoO2krPTEpZm9yKHZhciBzPXRoaXNbaV0ucGFyZW50Tm9kZTtzOyllP24ocykuaXMoZSkmJnQucHVzaChzKTp0LnB1c2gocykscz1zLnBhcmVudE5vZGU7cmV0dXJuIG4obyh0KSl9LGNsb3Nlc3Q6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztyZXR1cm4gdm9pZCAwPT09ZT9uZXcgcihbXSk6KHQuaXMoZSl8fCh0PXQucGFyZW50cyhlKS5lcSgwKSksdCl9LGZpbmQ6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLGk9MDtpPHRoaXMubGVuZ3RoO2krPTEpZm9yKHZhciBzPXRoaXNbaV0ucXVlcnlTZWxlY3RvckFsbChlKSxhPTA7YTxzLmxlbmd0aDthKz0xKXQucHVzaChzW2FdKTtyZXR1cm4gbmV3IHIodCl9LGNoaWxkcmVuOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxpPTA7aTx0aGlzLmxlbmd0aDtpKz0xKWZvcih2YXIgcz10aGlzW2ldLmNoaWxkTm9kZXMsYT0wO2E8cy5sZW5ndGg7YSs9MSllPzE9PT1zW2FdLm5vZGVUeXBlJiZuKHNbYV0pLmlzKGUpJiZ0LnB1c2goc1thXSk6MT09PXNbYV0ubm9kZVR5cGUmJnQucHVzaChzW2FdKTtyZXR1cm4gbmV3IHIobyh0KSl9LGZpbHRlcjpmdW5jdGlvbihlKXtmb3IodmFyIHQ9W10saT0wO2k8dGhpcy5sZW5ndGg7aSs9MSllLmNhbGwodGhpc1tpXSxpLHRoaXNbaV0pJiZ0LnB1c2godGhpc1tpXSk7cmV0dXJuIG5ldyByKHQpfSxyZW1vdmU6ZnVuY3Rpb24oKXtmb3IodmFyIGU9MDtlPHRoaXMubGVuZ3RoO2UrPTEpdGhpc1tlXS5wYXJlbnROb2RlJiZ0aGlzW2VdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpc1tlXSk7cmV0dXJuIHRoaXN9LGFkZDpmdW5jdGlvbigpe2Zvcih2YXIgZT1bXSx0PWFyZ3VtZW50cy5sZW5ndGg7dC0tOyllW3RdPWFyZ3VtZW50c1t0XTt2YXIgaSxzLGE9dGhpcztmb3IoaT0wO2k8ZS5sZW5ndGg7aSs9MSl7dmFyIHI9bihlW2ldKTtmb3Iocz0wO3M8ci5sZW5ndGg7cys9MSlhW2EubGVuZ3RoXT1yW3NdLGEubGVuZ3RoKz0xfXJldHVybiBhfSxzdHlsZXM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1swXT9hLmdldENvbXB1dGVkU3R5bGUodGhpc1swXSxudWxsKTp7fX19O09iamVjdC5rZXlzKGwpLmZvckVhY2goKGZ1bmN0aW9uKGUpe24uZm5bZV09bi5mbltlXXx8bFtlXX0pKTt2YXIgZD17ZGVsZXRlUHJvcHM6ZnVuY3Rpb24oZSl7dmFyIHQ9ZTtPYmplY3Qua2V5cyh0KS5mb3JFYWNoKChmdW5jdGlvbihlKXt0cnl7dFtlXT1udWxsfWNhdGNoKGUpe310cnl7ZGVsZXRlIHRbZV19Y2F0Y2goZSl7fX0pKX0sbmV4dFRpY2s6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdm9pZCAwPT09dCYmKHQ9MCksc2V0VGltZW91dChlLHQpfSxub3c6ZnVuY3Rpb24oKXtyZXR1cm4gRGF0ZS5ub3coKX0sZ2V0VHJhbnNsYXRlOmZ1bmN0aW9uKGUsdCl7dmFyIGkscyxyO3ZvaWQgMD09PXQmJih0PVwieFwiKTt2YXIgbj1hLmdldENvbXB1dGVkU3R5bGUoZSxudWxsKTtyZXR1cm4gYS5XZWJLaXRDU1NNYXRyaXg/KChzPW4udHJhbnNmb3JtfHxuLndlYmtpdFRyYW5zZm9ybSkuc3BsaXQoXCIsXCIpLmxlbmd0aD42JiYocz1zLnNwbGl0KFwiLCBcIikubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gZS5yZXBsYWNlKFwiLFwiLFwiLlwiKX0pKS5qb2luKFwiLCBcIikpLHI9bmV3IGEuV2ViS2l0Q1NTTWF0cml4KFwibm9uZVwiPT09cz9cIlwiOnMpKTppPShyPW4uTW96VHJhbnNmb3JtfHxuLk9UcmFuc2Zvcm18fG4uTXNUcmFuc2Zvcm18fG4ubXNUcmFuc2Zvcm18fG4udHJhbnNmb3JtfHxuLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIikucmVwbGFjZShcInRyYW5zbGF0ZShcIixcIm1hdHJpeCgxLCAwLCAwLCAxLFwiKSkudG9TdHJpbmcoKS5zcGxpdChcIixcIiksXCJ4XCI9PT10JiYocz1hLldlYktpdENTU01hdHJpeD9yLm00MToxNj09PWkubGVuZ3RoP3BhcnNlRmxvYXQoaVsxMl0pOnBhcnNlRmxvYXQoaVs0XSkpLFwieVwiPT09dCYmKHM9YS5XZWJLaXRDU1NNYXRyaXg/ci5tNDI6MTY9PT1pLmxlbmd0aD9wYXJzZUZsb2F0KGlbMTNdKTpwYXJzZUZsb2F0KGlbNV0pKSxzfHwwfSxwYXJzZVVybFF1ZXJ5OmZ1bmN0aW9uKGUpe3ZhciB0LGkscyxyLG49e30sbz1lfHxhLmxvY2F0aW9uLmhyZWY7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG8mJm8ubGVuZ3RoKWZvcihyPShpPShvPW8uaW5kZXhPZihcIj9cIik+LTE/by5yZXBsYWNlKC9cXFMqXFw/LyxcIlwiKTpcIlwiKS5zcGxpdChcIiZcIikuZmlsdGVyKChmdW5jdGlvbihlKXtyZXR1cm5cIlwiIT09ZX0pKSkubGVuZ3RoLHQ9MDt0PHI7dCs9MSlzPWlbdF0ucmVwbGFjZSgvI1xcUysvZyxcIlwiKS5zcGxpdChcIj1cIiksbltkZWNvZGVVUklDb21wb25lbnQoc1swXSldPXZvaWQgMD09PXNbMV0/dm9pZCAwOmRlY29kZVVSSUNvbXBvbmVudChzWzFdKXx8XCJcIjtyZXR1cm4gbn0saXNPYmplY3Q6ZnVuY3Rpb24oZSl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGUmJm51bGwhPT1lJiZlLmNvbnN0cnVjdG9yJiZlLmNvbnN0cnVjdG9yPT09T2JqZWN0fSxleHRlbmQ6ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD1hcmd1bWVudHMubGVuZ3RoO3QtLTspZVt0XT1hcmd1bWVudHNbdF07Zm9yKHZhciBpPU9iamVjdChlWzBdKSxzPTE7czxlLmxlbmd0aDtzKz0xKXt2YXIgYT1lW3NdO2lmKG51bGwhPWEpZm9yKHZhciByPU9iamVjdC5rZXlzKE9iamVjdChhKSksbj0wLG89ci5sZW5ndGg7bjxvO24rPTEpe3ZhciBsPXJbbl0saD1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGEsbCk7dm9pZCAwIT09aCYmaC5lbnVtZXJhYmxlJiYoZC5pc09iamVjdChpW2xdKSYmZC5pc09iamVjdChhW2xdKT9kLmV4dGVuZChpW2xdLGFbbF0pOiFkLmlzT2JqZWN0KGlbbF0pJiZkLmlzT2JqZWN0KGFbbF0pPyhpW2xdPXt9LGQuZXh0ZW5kKGlbbF0sYVtsXSkpOmlbbF09YVtsXSl9fXJldHVybiBpfX0saD17dG91Y2g6ISEoXCJvbnRvdWNoc3RhcnRcImluIGF8fGEuRG9jdW1lbnRUb3VjaCYmaSBpbnN0YW5jZW9mIGEuRG9jdW1lbnRUb3VjaCkscG9pbnRlckV2ZW50czohIWEuUG9pbnRlckV2ZW50JiZcIm1heFRvdWNoUG9pbnRzXCJpbiBhLm5hdmlnYXRvciYmYS5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM+PTAsb2JzZXJ2ZXI6XCJNdXRhdGlvbk9ic2VydmVyXCJpbiBhfHxcIldlYmtpdE11dGF0aW9uT2JzZXJ2ZXJcImluIGEscGFzc2l2ZUxpc3RlbmVyOmZ1bmN0aW9uKCl7dmFyIGU9ITE7dHJ5e3ZhciB0PU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcInBhc3NpdmVcIix7Z2V0OmZ1bmN0aW9uKCl7ZT0hMH19KTthLmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZUxpc3RlbmVyXCIsbnVsbCx0KX1jYXRjaChlKXt9cmV0dXJuIGV9KCksZ2VzdHVyZXM6XCJvbmdlc3R1cmVzdGFydFwiaW4gYX0scD1mdW5jdGlvbihlKXt2b2lkIDA9PT1lJiYoZT17fSk7dmFyIHQ9dGhpczt0LnBhcmFtcz1lLHQuZXZlbnRzTGlzdGVuZXJzPXt9LHQucGFyYW1zJiZ0LnBhcmFtcy5vbiYmT2JqZWN0LmtleXModC5wYXJhbXMub24pLmZvckVhY2goKGZ1bmN0aW9uKGUpe3Qub24oZSx0LnBhcmFtcy5vbltlXSl9KSl9LGM9e2NvbXBvbmVudHM6e2NvbmZpZ3VyYWJsZTohMH19O3AucHJvdG90eXBlLm9uPWZ1bmN0aW9uKGUsdCxpKXt2YXIgcz10aGlzO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJuIHM7dmFyIGE9aT9cInVuc2hpZnRcIjpcInB1c2hcIjtyZXR1cm4gZS5zcGxpdChcIiBcIikuZm9yRWFjaCgoZnVuY3Rpb24oZSl7cy5ldmVudHNMaXN0ZW5lcnNbZV18fChzLmV2ZW50c0xpc3RlbmVyc1tlXT1bXSkscy5ldmVudHNMaXN0ZW5lcnNbZV1bYV0odCl9KSksc30scC5wcm90b3R5cGUub25jZT1mdW5jdGlvbihlLHQsaSl7dmFyIHM9dGhpcztpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybiBzO2Z1bmN0aW9uIGEoKXtmb3IodmFyIGk9W10scj1hcmd1bWVudHMubGVuZ3RoO3ItLTspaVtyXT1hcmd1bWVudHNbcl07cy5vZmYoZSxhKSxhLmY3cHJveHkmJmRlbGV0ZSBhLmY3cHJveHksdC5hcHBseShzLGkpfXJldHVybiBhLmY3cHJveHk9dCxzLm9uKGUsYSxpKX0scC5wcm90b3R5cGUub2ZmPWZ1bmN0aW9uKGUsdCl7dmFyIGk9dGhpcztyZXR1cm4gaS5ldmVudHNMaXN0ZW5lcnM/KGUuc3BsaXQoXCIgXCIpLmZvckVhY2goKGZ1bmN0aW9uKGUpe3ZvaWQgMD09PXQ/aS5ldmVudHNMaXN0ZW5lcnNbZV09W106aS5ldmVudHNMaXN0ZW5lcnNbZV0mJmkuZXZlbnRzTGlzdGVuZXJzW2VdLmxlbmd0aCYmaS5ldmVudHNMaXN0ZW5lcnNbZV0uZm9yRWFjaCgoZnVuY3Rpb24ocyxhKXsocz09PXR8fHMuZjdwcm94eSYmcy5mN3Byb3h5PT09dCkmJmkuZXZlbnRzTGlzdGVuZXJzW2VdLnNwbGljZShhLDEpfSkpfSkpLGkpOml9LHAucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD1hcmd1bWVudHMubGVuZ3RoO3QtLTspZVt0XT1hcmd1bWVudHNbdF07dmFyIGkscyxhLHI9dGhpcztpZighci5ldmVudHNMaXN0ZW5lcnMpcmV0dXJuIHI7XCJzdHJpbmdcIj09dHlwZW9mIGVbMF18fEFycmF5LmlzQXJyYXkoZVswXSk/KGk9ZVswXSxzPWUuc2xpY2UoMSxlLmxlbmd0aCksYT1yKTooaT1lWzBdLmV2ZW50cyxzPWVbMF0uZGF0YSxhPWVbMF0uY29udGV4dHx8cik7dmFyIG49QXJyYXkuaXNBcnJheShpKT9pOmkuc3BsaXQoXCIgXCIpO3JldHVybiBuLmZvckVhY2goKGZ1bmN0aW9uKGUpe2lmKHIuZXZlbnRzTGlzdGVuZXJzJiZyLmV2ZW50c0xpc3RlbmVyc1tlXSl7dmFyIHQ9W107ci5ldmVudHNMaXN0ZW5lcnNbZV0uZm9yRWFjaCgoZnVuY3Rpb24oZSl7dC5wdXNoKGUpfSkpLHQuZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5hcHBseShhLHMpfSkpfX0pKSxyfSxwLnByb3RvdHlwZS51c2VNb2R1bGVzUGFyYW1zPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7dC5tb2R1bGVzJiZPYmplY3Qua2V5cyh0Lm1vZHVsZXMpLmZvckVhY2goKGZ1bmN0aW9uKGkpe3ZhciBzPXQubW9kdWxlc1tpXTtzLnBhcmFtcyYmZC5leHRlbmQoZSxzLnBhcmFtcyl9KSl9LHAucHJvdG90eXBlLnVzZU1vZHVsZXM9ZnVuY3Rpb24oZSl7dm9pZCAwPT09ZSYmKGU9e30pO3ZhciB0PXRoaXM7dC5tb2R1bGVzJiZPYmplY3Qua2V5cyh0Lm1vZHVsZXMpLmZvckVhY2goKGZ1bmN0aW9uKGkpe3ZhciBzPXQubW9kdWxlc1tpXSxhPWVbaV18fHt9O3MuaW5zdGFuY2UmJk9iamVjdC5rZXlzKHMuaW5zdGFuY2UpLmZvckVhY2goKGZ1bmN0aW9uKGUpe3ZhciBpPXMuaW5zdGFuY2VbZV07dFtlXT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpP2kuYmluZCh0KTppfSkpLHMub24mJnQub24mJk9iamVjdC5rZXlzKHMub24pLmZvckVhY2goKGZ1bmN0aW9uKGUpe3Qub24oZSxzLm9uW2VdKX0pKSxzLmNyZWF0ZSYmcy5jcmVhdGUuYmluZCh0KShhKX0pKX0sYy5jb21wb25lbnRzLnNldD1mdW5jdGlvbihlKXt0aGlzLnVzZSYmdGhpcy51c2UoZSl9LHAuaW5zdGFsbE1vZHVsZT1mdW5jdGlvbihlKXtmb3IodmFyIHQ9W10saT1hcmd1bWVudHMubGVuZ3RoLTE7aS0tID4wOyl0W2ldPWFyZ3VtZW50c1tpKzFdO3ZhciBzPXRoaXM7cy5wcm90b3R5cGUubW9kdWxlc3x8KHMucHJvdG90eXBlLm1vZHVsZXM9e30pO3ZhciBhPWUubmFtZXx8T2JqZWN0LmtleXMocy5wcm90b3R5cGUubW9kdWxlcykubGVuZ3RoK1wiX1wiK2Qubm93KCk7cmV0dXJuIHMucHJvdG90eXBlLm1vZHVsZXNbYV09ZSxlLnByb3RvJiZPYmplY3Qua2V5cyhlLnByb3RvKS5mb3JFYWNoKChmdW5jdGlvbih0KXtzLnByb3RvdHlwZVt0XT1lLnByb3RvW3RdfSkpLGUuc3RhdGljJiZPYmplY3Qua2V5cyhlLnN0YXRpYykuZm9yRWFjaCgoZnVuY3Rpb24odCl7c1t0XT1lLnN0YXRpY1t0XX0pKSxlLmluc3RhbGwmJmUuaW5zdGFsbC5hcHBseShzLHQpLHN9LHAudXNlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxpPWFyZ3VtZW50cy5sZW5ndGgtMTtpLS0gPjA7KXRbaV09YXJndW1lbnRzW2krMV07dmFyIHM9dGhpcztyZXR1cm4gQXJyYXkuaXNBcnJheShlKT8oZS5mb3JFYWNoKChmdW5jdGlvbihlKXtyZXR1cm4gcy5pbnN0YWxsTW9kdWxlKGUpfSkpLHMpOnMuaW5zdGFsbE1vZHVsZS5hcHBseShzLFtlXS5jb25jYXQodCkpfSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyhwLGMpO3ZhciB1PXt1cGRhdGVTaXplOmZ1bmN0aW9uKCl7dmFyIGUsdCxpPXRoaXMuJGVsO2U9dm9pZCAwIT09dGhpcy5wYXJhbXMud2lkdGg/dGhpcy5wYXJhbXMud2lkdGg6aVswXS5jbGllbnRXaWR0aCx0PXZvaWQgMCE9PXRoaXMucGFyYW1zLmhlaWdodD90aGlzLnBhcmFtcy5oZWlnaHQ6aVswXS5jbGllbnRIZWlnaHQsMD09PWUmJnRoaXMuaXNIb3Jpem9udGFsKCl8fDA9PT10JiZ0aGlzLmlzVmVydGljYWwoKXx8KGU9ZS1wYXJzZUludChpLmNzcyhcInBhZGRpbmctbGVmdFwiKSwxMCktcGFyc2VJbnQoaS5jc3MoXCJwYWRkaW5nLXJpZ2h0XCIpLDEwKSx0PXQtcGFyc2VJbnQoaS5jc3MoXCJwYWRkaW5nLXRvcFwiKSwxMCktcGFyc2VJbnQoaS5jc3MoXCJwYWRkaW5nLWJvdHRvbVwiKSwxMCksZC5leHRlbmQodGhpcyx7d2lkdGg6ZSxoZWlnaHQ6dCxzaXplOnRoaXMuaXNIb3Jpem9udGFsKCk/ZTp0fSkpfSx1cGRhdGVTbGlkZXM6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnBhcmFtcyx0PXRoaXMuJHdyYXBwZXJFbCxpPXRoaXMuc2l6ZSxzPXRoaXMucnRsVHJhbnNsYXRlLHI9dGhpcy53cm9uZ1JUTCxuPXRoaXMudmlydHVhbCYmZS52aXJ0dWFsLmVuYWJsZWQsbz1uP3RoaXMudmlydHVhbC5zbGlkZXMubGVuZ3RoOnRoaXMuc2xpZGVzLmxlbmd0aCxsPXQuY2hpbGRyZW4oXCIuXCIrdGhpcy5wYXJhbXMuc2xpZGVDbGFzcyksaD1uP3RoaXMudmlydHVhbC5zbGlkZXMubGVuZ3RoOmwubGVuZ3RoLHA9W10sYz1bXSx1PVtdO2Z1bmN0aW9uIHYodCl7cmV0dXJuIWUuY3NzTW9kZXx8dCE9PWwubGVuZ3RoLTF9dmFyIGY9ZS5zbGlkZXNPZmZzZXRCZWZvcmU7XCJmdW5jdGlvblwiPT10eXBlb2YgZiYmKGY9ZS5zbGlkZXNPZmZzZXRCZWZvcmUuY2FsbCh0aGlzKSk7dmFyIG09ZS5zbGlkZXNPZmZzZXRBZnRlcjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBtJiYobT1lLnNsaWRlc09mZnNldEFmdGVyLmNhbGwodGhpcykpO3ZhciBnPXRoaXMuc25hcEdyaWQubGVuZ3RoLGI9dGhpcy5zbmFwR3JpZC5sZW5ndGgsdz1lLnNwYWNlQmV0d2Vlbix5PS1mLHg9MCxFPTA7aWYodm9pZCAwIT09aSl7dmFyIFQsUztcInN0cmluZ1wiPT10eXBlb2YgdyYmdy5pbmRleE9mKFwiJVwiKT49MCYmKHc9cGFyc2VGbG9hdCh3LnJlcGxhY2UoXCIlXCIsXCJcIikpLzEwMCppKSx0aGlzLnZpcnR1YWxTaXplPS13LHM/bC5jc3Moe21hcmdpbkxlZnQ6XCJcIixtYXJnaW5Ub3A6XCJcIn0pOmwuY3NzKHttYXJnaW5SaWdodDpcIlwiLG1hcmdpbkJvdHRvbTpcIlwifSksZS5zbGlkZXNQZXJDb2x1bW4+MSYmKFQ9TWF0aC5mbG9vcihoL2Uuc2xpZGVzUGVyQ29sdW1uKT09PWgvdGhpcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uP2g6TWF0aC5jZWlsKGgvZS5zbGlkZXNQZXJDb2x1bW4pKmUuc2xpZGVzUGVyQ29sdW1uLFwiYXV0b1wiIT09ZS5zbGlkZXNQZXJWaWV3JiZcInJvd1wiPT09ZS5zbGlkZXNQZXJDb2x1bW5GaWxsJiYoVD1NYXRoLm1heChULGUuc2xpZGVzUGVyVmlldyplLnNsaWRlc1BlckNvbHVtbikpKTtmb3IodmFyIEMsTT1lLnNsaWRlc1BlckNvbHVtbixQPVQvTSx6PU1hdGguZmxvb3IoaC9lLnNsaWRlc1BlckNvbHVtbiksaz0wO2s8aDtrKz0xKXtTPTA7dmFyICQ9bC5lcShrKTtpZihlLnNsaWRlc1BlckNvbHVtbj4xKXt2YXIgTD12b2lkIDAsST12b2lkIDAsTz12b2lkIDA7aWYoXCJyb3dcIj09PWUuc2xpZGVzUGVyQ29sdW1uRmlsbCYmZS5zbGlkZXNQZXJHcm91cD4xKXt2YXIgRD1NYXRoLmZsb29yKGsvKGUuc2xpZGVzUGVyR3JvdXAqZS5zbGlkZXNQZXJDb2x1bW4pKSxBPWstZS5zbGlkZXNQZXJDb2x1bW4qZS5zbGlkZXNQZXJHcm91cCpELEc9MD09PUQ/ZS5zbGlkZXNQZXJHcm91cDpNYXRoLm1pbihNYXRoLmNlaWwoKGgtRCpNKmUuc2xpZGVzUGVyR3JvdXApL00pLGUuc2xpZGVzUGVyR3JvdXApO0w9KEk9QS0oTz1NYXRoLmZsb29yKEEvRykpKkcrRCplLnNsaWRlc1Blckdyb3VwKStPKlQvTSwkLmNzcyh7XCItd2Via2l0LWJveC1vcmRpbmFsLWdyb3VwXCI6TCxcIi1tb3otYm94LW9yZGluYWwtZ3JvdXBcIjpMLFwiLW1zLWZsZXgtb3JkZXJcIjpMLFwiLXdlYmtpdC1vcmRlclwiOkwsb3JkZXI6TH0pfWVsc2VcImNvbHVtblwiPT09ZS5zbGlkZXNQZXJDb2x1bW5GaWxsPyhPPWstKEk9TWF0aC5mbG9vcihrL00pKSpNLChJPnp8fEk9PT16JiZPPT09TS0xKSYmKE8rPTEpPj1NJiYoTz0wLEkrPTEpKTpJPWstKE89TWF0aC5mbG9vcihrL1ApKSpQOyQuY3NzKFwibWFyZ2luLVwiKyh0aGlzLmlzSG9yaXpvbnRhbCgpP1widG9wXCI6XCJsZWZ0XCIpLDAhPT1PJiZlLnNwYWNlQmV0d2VlbiYmZS5zcGFjZUJldHdlZW4rXCJweFwiKX1pZihcIm5vbmVcIiE9PSQuY3NzKFwiZGlzcGxheVwiKSl7aWYoXCJhdXRvXCI9PT1lLnNsaWRlc1BlclZpZXcpe3ZhciBIPWEuZ2V0Q29tcHV0ZWRTdHlsZSgkWzBdLG51bGwpLEI9JFswXS5zdHlsZS50cmFuc2Zvcm0sTj0kWzBdLnN0eWxlLndlYmtpdFRyYW5zZm9ybTtpZihCJiYoJFswXS5zdHlsZS50cmFuc2Zvcm09XCJub25lXCIpLE4mJigkWzBdLnN0eWxlLndlYmtpdFRyYW5zZm9ybT1cIm5vbmVcIiksZS5yb3VuZExlbmd0aHMpUz10aGlzLmlzSG9yaXpvbnRhbCgpPyQub3V0ZXJXaWR0aCghMCk6JC5vdXRlckhlaWdodCghMCk7ZWxzZSBpZih0aGlzLmlzSG9yaXpvbnRhbCgpKXt2YXIgWD1wYXJzZUZsb2F0KEguZ2V0UHJvcGVydHlWYWx1ZShcIndpZHRoXCIpKSxWPXBhcnNlRmxvYXQoSC5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1sZWZ0XCIpKSxZPXBhcnNlRmxvYXQoSC5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKSksRj1wYXJzZUZsb2F0KEguZ2V0UHJvcGVydHlWYWx1ZShcIm1hcmdpbi1sZWZ0XCIpKSxXPXBhcnNlRmxvYXQoSC5nZXRQcm9wZXJ0eVZhbHVlKFwibWFyZ2luLXJpZ2h0XCIpKSxSPUguZ2V0UHJvcGVydHlWYWx1ZShcImJveC1zaXppbmdcIik7Uz1SJiZcImJvcmRlci1ib3hcIj09PVI/WCtGK1c6WCtWK1krRitXfWVsc2V7dmFyIHE9cGFyc2VGbG9hdChILmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIikpLGo9cGFyc2VGbG9hdChILmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXRvcFwiKSksSz1wYXJzZUZsb2F0KEguZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctYm90dG9tXCIpKSxVPXBhcnNlRmxvYXQoSC5nZXRQcm9wZXJ0eVZhbHVlKFwibWFyZ2luLXRvcFwiKSksXz1wYXJzZUZsb2F0KEguZ2V0UHJvcGVydHlWYWx1ZShcIm1hcmdpbi1ib3R0b21cIikpLFo9SC5nZXRQcm9wZXJ0eVZhbHVlKFwiYm94LXNpemluZ1wiKTtTPVomJlwiYm9yZGVyLWJveFwiPT09Wj9xK1UrXzpxK2orSytVK199QiYmKCRbMF0uc3R5bGUudHJhbnNmb3JtPUIpLE4mJigkWzBdLnN0eWxlLndlYmtpdFRyYW5zZm9ybT1OKSxlLnJvdW5kTGVuZ3RocyYmKFM9TWF0aC5mbG9vcihTKSl9ZWxzZSBTPShpLShlLnNsaWRlc1BlclZpZXctMSkqdykvZS5zbGlkZXNQZXJWaWV3LGUucm91bmRMZW5ndGhzJiYoUz1NYXRoLmZsb29yKFMpKSxsW2tdJiYodGhpcy5pc0hvcml6b250YWwoKT9sW2tdLnN0eWxlLndpZHRoPVMrXCJweFwiOmxba10uc3R5bGUuaGVpZ2h0PVMrXCJweFwiKTtsW2tdJiYobFtrXS5zd2lwZXJTbGlkZVNpemU9UyksdS5wdXNoKFMpLGUuY2VudGVyZWRTbGlkZXM/KHk9eStTLzIreC8yK3csMD09PXgmJjAhPT1rJiYoeT15LWkvMi13KSwwPT09ayYmKHk9eS1pLzItdyksTWF0aC5hYnMoeSk8LjAwMSYmKHk9MCksZS5yb3VuZExlbmd0aHMmJih5PU1hdGguZmxvb3IoeSkpLEUlZS5zbGlkZXNQZXJHcm91cD09MCYmcC5wdXNoKHkpLGMucHVzaCh5KSk6KGUucm91bmRMZW5ndGhzJiYoeT1NYXRoLmZsb29yKHkpKSwoRS1NYXRoLm1pbih0aGlzLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsRSkpJXRoaXMucGFyYW1zLnNsaWRlc1Blckdyb3VwPT0wJiZwLnB1c2goeSksYy5wdXNoKHkpLHk9eStTK3cpLHRoaXMudmlydHVhbFNpemUrPVMrdyx4PVMsRSs9MX19aWYodGhpcy52aXJ0dWFsU2l6ZT1NYXRoLm1heCh0aGlzLnZpcnR1YWxTaXplLGkpK20scyYmciYmKFwic2xpZGVcIj09PWUuZWZmZWN0fHxcImNvdmVyZmxvd1wiPT09ZS5lZmZlY3QpJiZ0LmNzcyh7d2lkdGg6dGhpcy52aXJ0dWFsU2l6ZStlLnNwYWNlQmV0d2VlbitcInB4XCJ9KSxlLnNldFdyYXBwZXJTaXplJiYodGhpcy5pc0hvcml6b250YWwoKT90LmNzcyh7d2lkdGg6dGhpcy52aXJ0dWFsU2l6ZStlLnNwYWNlQmV0d2VlbitcInB4XCJ9KTp0LmNzcyh7aGVpZ2h0OnRoaXMudmlydHVhbFNpemUrZS5zcGFjZUJldHdlZW4rXCJweFwifSkpLGUuc2xpZGVzUGVyQ29sdW1uPjEmJih0aGlzLnZpcnR1YWxTaXplPShTK2Uuc3BhY2VCZXR3ZWVuKSpULHRoaXMudmlydHVhbFNpemU9TWF0aC5jZWlsKHRoaXMudmlydHVhbFNpemUvZS5zbGlkZXNQZXJDb2x1bW4pLWUuc3BhY2VCZXR3ZWVuLHRoaXMuaXNIb3Jpem9udGFsKCk/dC5jc3Moe3dpZHRoOnRoaXMudmlydHVhbFNpemUrZS5zcGFjZUJldHdlZW4rXCJweFwifSk6dC5jc3Moe2hlaWdodDp0aGlzLnZpcnR1YWxTaXplK2Uuc3BhY2VCZXR3ZWVuK1wicHhcIn0pLGUuY2VudGVyZWRTbGlkZXMpKXtDPVtdO2Zvcih2YXIgUT0wO1E8cC5sZW5ndGg7USs9MSl7dmFyIEo9cFtRXTtlLnJvdW5kTGVuZ3RocyYmKEo9TWF0aC5mbG9vcihKKSkscFtRXTx0aGlzLnZpcnR1YWxTaXplK3BbMF0mJkMucHVzaChKKX1wPUN9aWYoIWUuY2VudGVyZWRTbGlkZXMpe0M9W107Zm9yKHZhciBlZT0wO2VlPHAubGVuZ3RoO2VlKz0xKXt2YXIgdGU9cFtlZV07ZS5yb3VuZExlbmd0aHMmJih0ZT1NYXRoLmZsb29yKHRlKSkscFtlZV08PXRoaXMudmlydHVhbFNpemUtaSYmQy5wdXNoKHRlKX1wPUMsTWF0aC5mbG9vcih0aGlzLnZpcnR1YWxTaXplLWkpLU1hdGguZmxvb3IocFtwLmxlbmd0aC0xXSk+MSYmcC5wdXNoKHRoaXMudmlydHVhbFNpemUtaSl9aWYoMD09PXAubGVuZ3RoJiYocD1bMF0pLDAhPT1lLnNwYWNlQmV0d2VlbiYmKHRoaXMuaXNIb3Jpem9udGFsKCk/cz9sLmZpbHRlcih2KS5jc3Moe21hcmdpbkxlZnQ6dytcInB4XCJ9KTpsLmZpbHRlcih2KS5jc3Moe21hcmdpblJpZ2h0OncrXCJweFwifSk6bC5maWx0ZXIodikuY3NzKHttYXJnaW5Cb3R0b206dytcInB4XCJ9KSksZS5jZW50ZXJlZFNsaWRlcyYmZS5jZW50ZXJlZFNsaWRlc0JvdW5kcyl7dmFyIGllPTA7dS5mb3JFYWNoKChmdW5jdGlvbih0KXtpZSs9dCsoZS5zcGFjZUJldHdlZW4/ZS5zcGFjZUJldHdlZW46MCl9KSk7dmFyIHNlPShpZS09ZS5zcGFjZUJldHdlZW4pLWk7cD1wLm1hcCgoZnVuY3Rpb24oZSl7cmV0dXJuIGU8MD8tZjplPnNlP3NlK206ZX0pKX1pZihlLmNlbnRlckluc3VmZmljaWVudFNsaWRlcyl7dmFyIGFlPTA7aWYodS5mb3JFYWNoKChmdW5jdGlvbih0KXthZSs9dCsoZS5zcGFjZUJldHdlZW4/ZS5zcGFjZUJldHdlZW46MCl9KSksKGFlLT1lLnNwYWNlQmV0d2Vlbik8aSl7dmFyIHJlPShpLWFlKS8yO3AuZm9yRWFjaCgoZnVuY3Rpb24oZSx0KXtwW3RdPWUtcmV9KSksYy5mb3JFYWNoKChmdW5jdGlvbihlLHQpe2NbdF09ZStyZX0pKX19ZC5leHRlbmQodGhpcyx7c2xpZGVzOmwsc25hcEdyaWQ6cCxzbGlkZXNHcmlkOmMsc2xpZGVzU2l6ZXNHcmlkOnV9KSxoIT09byYmdGhpcy5lbWl0KFwic2xpZGVzTGVuZ3RoQ2hhbmdlXCIpLHAubGVuZ3RoIT09ZyYmKHRoaXMucGFyYW1zLndhdGNoT3ZlcmZsb3cmJnRoaXMuY2hlY2tPdmVyZmxvdygpLHRoaXMuZW1pdChcInNuYXBHcmlkTGVuZ3RoQ2hhbmdlXCIpKSxjLmxlbmd0aCE9PWImJnRoaXMuZW1pdChcInNsaWRlc0dyaWRMZW5ndGhDaGFuZ2VcIiksKGUud2F0Y2hTbGlkZXNQcm9ncmVzc3x8ZS53YXRjaFNsaWRlc1Zpc2liaWxpdHkpJiZ0aGlzLnVwZGF0ZVNsaWRlc09mZnNldCgpfX0sdXBkYXRlQXV0b0hlaWdodDpmdW5jdGlvbihlKXt2YXIgdCxpPVtdLHM9MDtpZihcIm51bWJlclwiPT10eXBlb2YgZT90aGlzLnNldFRyYW5zaXRpb24oZSk6ITA9PT1lJiZ0aGlzLnNldFRyYW5zaXRpb24odGhpcy5wYXJhbXMuc3BlZWQpLFwiYXV0b1wiIT09dGhpcy5wYXJhbXMuc2xpZGVzUGVyVmlldyYmdGhpcy5wYXJhbXMuc2xpZGVzUGVyVmlldz4xKWlmKHRoaXMucGFyYW1zLmNlbnRlcmVkU2xpZGVzKXRoaXMudmlzaWJsZVNsaWRlcy5lYWNoKChmdW5jdGlvbihlLHQpe2kucHVzaCh0KX0pKTtlbHNlIGZvcih0PTA7dDxNYXRoLmNlaWwodGhpcy5wYXJhbXMuc2xpZGVzUGVyVmlldyk7dCs9MSl7dmFyIGE9dGhpcy5hY3RpdmVJbmRleCt0O2lmKGE+dGhpcy5zbGlkZXMubGVuZ3RoKWJyZWFrO2kucHVzaCh0aGlzLnNsaWRlcy5lcShhKVswXSl9ZWxzZSBpLnB1c2godGhpcy5zbGlkZXMuZXEodGhpcy5hY3RpdmVJbmRleClbMF0pO2Zvcih0PTA7dDxpLmxlbmd0aDt0Kz0xKWlmKHZvaWQgMCE9PWlbdF0pe3ZhciByPWlbdF0ub2Zmc2V0SGVpZ2h0O3M9cj5zP3I6c31zJiZ0aGlzLiR3cmFwcGVyRWwuY3NzKFwiaGVpZ2h0XCIscytcInB4XCIpfSx1cGRhdGVTbGlkZXNPZmZzZXQ6ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcy5zbGlkZXMsdD0wO3Q8ZS5sZW5ndGg7dCs9MSllW3RdLnN3aXBlclNsaWRlT2Zmc2V0PXRoaXMuaXNIb3Jpem9udGFsKCk/ZVt0XS5vZmZzZXRMZWZ0OmVbdF0ub2Zmc2V0VG9wfSx1cGRhdGVTbGlkZXNQcm9ncmVzczpmdW5jdGlvbihlKXt2b2lkIDA9PT1lJiYoZT10aGlzJiZ0aGlzLnRyYW5zbGF0ZXx8MCk7dmFyIHQ9dGhpcy5wYXJhbXMsaT10aGlzLnNsaWRlcyxzPXRoaXMucnRsVHJhbnNsYXRlO2lmKDAhPT1pLmxlbmd0aCl7dm9pZCAwPT09aVswXS5zd2lwZXJTbGlkZU9mZnNldCYmdGhpcy51cGRhdGVTbGlkZXNPZmZzZXQoKTt2YXIgYT0tZTtzJiYoYT1lKSxpLnJlbW92ZUNsYXNzKHQuc2xpZGVWaXNpYmxlQ2xhc3MpLHRoaXMudmlzaWJsZVNsaWRlc0luZGV4ZXM9W10sdGhpcy52aXNpYmxlU2xpZGVzPVtdO2Zvcih2YXIgcj0wO3I8aS5sZW5ndGg7cis9MSl7dmFyIG89aVtyXSxsPShhKyh0LmNlbnRlcmVkU2xpZGVzP3RoaXMubWluVHJhbnNsYXRlKCk6MCktby5zd2lwZXJTbGlkZU9mZnNldCkvKG8uc3dpcGVyU2xpZGVTaXplK3Quc3BhY2VCZXR3ZWVuKTtpZih0LndhdGNoU2xpZGVzVmlzaWJpbGl0eXx8dC5jZW50ZXJlZFNsaWRlcyYmdC5hdXRvSGVpZ2h0KXt2YXIgZD0tKGEtby5zd2lwZXJTbGlkZU9mZnNldCksaD1kK3RoaXMuc2xpZGVzU2l6ZXNHcmlkW3JdOyhkPj0wJiZkPHRoaXMuc2l6ZS0xfHxoPjEmJmg8PXRoaXMuc2l6ZXx8ZDw9MCYmaD49dGhpcy5zaXplKSYmKHRoaXMudmlzaWJsZVNsaWRlcy5wdXNoKG8pLHRoaXMudmlzaWJsZVNsaWRlc0luZGV4ZXMucHVzaChyKSxpLmVxKHIpLmFkZENsYXNzKHQuc2xpZGVWaXNpYmxlQ2xhc3MpKX1vLnByb2dyZXNzPXM/LWw6bH10aGlzLnZpc2libGVTbGlkZXM9bih0aGlzLnZpc2libGVTbGlkZXMpfX0sdXBkYXRlUHJvZ3Jlc3M6ZnVuY3Rpb24oZSl7aWYodm9pZCAwPT09ZSl7dmFyIHQ9dGhpcy5ydGxUcmFuc2xhdGU/LTE6MTtlPXRoaXMmJnRoaXMudHJhbnNsYXRlJiZ0aGlzLnRyYW5zbGF0ZSp0fHwwfXZhciBpPXRoaXMucGFyYW1zLHM9dGhpcy5tYXhUcmFuc2xhdGUoKS10aGlzLm1pblRyYW5zbGF0ZSgpLGE9dGhpcy5wcm9ncmVzcyxyPXRoaXMuaXNCZWdpbm5pbmcsbj10aGlzLmlzRW5kLG89cixsPW47MD09PXM/KGE9MCxyPSEwLG49ITApOihyPShhPShlLXRoaXMubWluVHJhbnNsYXRlKCkpL3MpPD0wLG49YT49MSksZC5leHRlbmQodGhpcyx7cHJvZ3Jlc3M6YSxpc0JlZ2lubmluZzpyLGlzRW5kOm59KSwoaS53YXRjaFNsaWRlc1Byb2dyZXNzfHxpLndhdGNoU2xpZGVzVmlzaWJpbGl0eXx8aS5jZW50ZXJlZFNsaWRlcyYmaS5hdXRvSGVpZ2h0KSYmdGhpcy51cGRhdGVTbGlkZXNQcm9ncmVzcyhlKSxyJiYhbyYmdGhpcy5lbWl0KFwicmVhY2hCZWdpbm5pbmcgdG9FZGdlXCIpLG4mJiFsJiZ0aGlzLmVtaXQoXCJyZWFjaEVuZCB0b0VkZ2VcIiksKG8mJiFyfHxsJiYhbikmJnRoaXMuZW1pdChcImZyb21FZGdlXCIpLHRoaXMuZW1pdChcInByb2dyZXNzXCIsYSl9LHVwZGF0ZVNsaWRlc0NsYXNzZXM6ZnVuY3Rpb24oKXt2YXIgZSx0PXRoaXMuc2xpZGVzLGk9dGhpcy5wYXJhbXMscz10aGlzLiR3cmFwcGVyRWwsYT10aGlzLmFjdGl2ZUluZGV4LHI9dGhpcy5yZWFsSW5kZXgsbj10aGlzLnZpcnR1YWwmJmkudmlydHVhbC5lbmFibGVkO3QucmVtb3ZlQ2xhc3MoaS5zbGlkZUFjdGl2ZUNsYXNzK1wiIFwiK2kuc2xpZGVOZXh0Q2xhc3MrXCIgXCIraS5zbGlkZVByZXZDbGFzcytcIiBcIitpLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MrXCIgXCIraS5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcytcIiBcIitpLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKSwoZT1uP3RoaXMuJHdyYXBwZXJFbC5maW5kKFwiLlwiK2kuc2xpZGVDbGFzcysnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJythKydcIl0nKTp0LmVxKGEpKS5hZGRDbGFzcyhpLnNsaWRlQWN0aXZlQ2xhc3MpLGkubG9vcCYmKGUuaGFzQ2xhc3MoaS5zbGlkZUR1cGxpY2F0ZUNsYXNzKT9zLmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVDbGFzcytcIjpub3QoLlwiK2kuc2xpZGVEdXBsaWNhdGVDbGFzcysnKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrcisnXCJdJykuYWRkQ2xhc3MoaS5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKTpzLmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVDbGFzcytcIi5cIitpLnNsaWRlRHVwbGljYXRlQ2xhc3MrJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrcisnXCJdJykuYWRkQ2xhc3MoaS5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKSk7dmFyIG89ZS5uZXh0QWxsKFwiLlwiK2kuc2xpZGVDbGFzcykuZXEoMCkuYWRkQ2xhc3MoaS5zbGlkZU5leHRDbGFzcyk7aS5sb29wJiYwPT09by5sZW5ndGgmJihvPXQuZXEoMCkpLmFkZENsYXNzKGkuc2xpZGVOZXh0Q2xhc3MpO3ZhciBsPWUucHJldkFsbChcIi5cIitpLnNsaWRlQ2xhc3MpLmVxKDApLmFkZENsYXNzKGkuc2xpZGVQcmV2Q2xhc3MpO2kubG9vcCYmMD09PWwubGVuZ3RoJiYobD10LmVxKC0xKSkuYWRkQ2xhc3MoaS5zbGlkZVByZXZDbGFzcyksaS5sb29wJiYoby5oYXNDbGFzcyhpLnNsaWRlRHVwbGljYXRlQ2xhc3MpP3MuY2hpbGRyZW4oXCIuXCIraS5zbGlkZUNsYXNzK1wiOm5vdCguXCIraS5zbGlkZUR1cGxpY2F0ZUNsYXNzKycpW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytvLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSsnXCJdJykuYWRkQ2xhc3MoaS5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyk6cy5jaGlsZHJlbihcIi5cIitpLnNsaWRlQ2xhc3MrXCIuXCIraS5zbGlkZUR1cGxpY2F0ZUNsYXNzKydbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK28uYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpKydcIl0nKS5hZGRDbGFzcyhpLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKSxsLmhhc0NsYXNzKGkuc2xpZGVEdXBsaWNhdGVDbGFzcyk/cy5jaGlsZHJlbihcIi5cIitpLnNsaWRlQ2xhc3MrXCI6bm90KC5cIitpLnNsaWRlRHVwbGljYXRlQ2xhc3MrJylbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK2wuYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpKydcIl0nKS5hZGRDbGFzcyhpLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTpzLmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVDbGFzcytcIi5cIitpLnNsaWRlRHVwbGljYXRlQ2xhc3MrJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrbC5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIikrJ1wiXScpLmFkZENsYXNzKGkuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpKX0sdXBkYXRlQWN0aXZlSW5kZXg6ZnVuY3Rpb24oZSl7dmFyIHQsaT10aGlzLnJ0bFRyYW5zbGF0ZT90aGlzLnRyYW5zbGF0ZTotdGhpcy50cmFuc2xhdGUscz10aGlzLnNsaWRlc0dyaWQsYT10aGlzLnNuYXBHcmlkLHI9dGhpcy5wYXJhbXMsbj10aGlzLmFjdGl2ZUluZGV4LG89dGhpcy5yZWFsSW5kZXgsbD10aGlzLnNuYXBJbmRleCxoPWU7aWYodm9pZCAwPT09aCl7Zm9yKHZhciBwPTA7cDxzLmxlbmd0aDtwKz0xKXZvaWQgMCE9PXNbcCsxXT9pPj1zW3BdJiZpPHNbcCsxXS0oc1twKzFdLXNbcF0pLzI/aD1wOmk+PXNbcF0mJmk8c1twKzFdJiYoaD1wKzEpOmk+PXNbcF0mJihoPXApO3Iubm9ybWFsaXplU2xpZGVJbmRleCYmKGg8MHx8dm9pZCAwPT09aCkmJihoPTApfWlmKGEuaW5kZXhPZihpKT49MCl0PWEuaW5kZXhPZihpKTtlbHNle3ZhciBjPU1hdGgubWluKHIuc2xpZGVzUGVyR3JvdXBTa2lwLGgpO3Q9YytNYXRoLmZsb29yKChoLWMpL3Iuc2xpZGVzUGVyR3JvdXApfWlmKHQ+PWEubGVuZ3RoJiYodD1hLmxlbmd0aC0xKSxoIT09bil7dmFyIHU9cGFyc2VJbnQodGhpcy5zbGlkZXMuZXEoaCkuYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpfHxoLDEwKTtkLmV4dGVuZCh0aGlzLHtzbmFwSW5kZXg6dCxyZWFsSW5kZXg6dSxwcmV2aW91c0luZGV4Om4sYWN0aXZlSW5kZXg6aH0pLHRoaXMuZW1pdChcImFjdGl2ZUluZGV4Q2hhbmdlXCIpLHRoaXMuZW1pdChcInNuYXBJbmRleENoYW5nZVwiKSxvIT09dSYmdGhpcy5lbWl0KFwicmVhbEluZGV4Q2hhbmdlXCIpLCh0aGlzLmluaXRpYWxpemVkfHx0aGlzLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpJiZ0aGlzLmVtaXQoXCJzbGlkZUNoYW5nZVwiKX1lbHNlIHQhPT1sJiYodGhpcy5zbmFwSW5kZXg9dCx0aGlzLmVtaXQoXCJzbmFwSW5kZXhDaGFuZ2VcIikpfSx1cGRhdGVDbGlja2VkU2xpZGU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5wYXJhbXMsaT1uKGUudGFyZ2V0KS5jbG9zZXN0KFwiLlwiK3Quc2xpZGVDbGFzcylbMF0scz0hMTtpZihpKWZvcih2YXIgYT0wO2E8dGhpcy5zbGlkZXMubGVuZ3RoO2ErPTEpdGhpcy5zbGlkZXNbYV09PT1pJiYocz0hMCk7aWYoIWl8fCFzKXJldHVybiB0aGlzLmNsaWNrZWRTbGlkZT12b2lkIDAsdm9pZCh0aGlzLmNsaWNrZWRJbmRleD12b2lkIDApO3RoaXMuY2xpY2tlZFNsaWRlPWksdGhpcy52aXJ0dWFsJiZ0aGlzLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ/dGhpcy5jbGlja2VkSW5kZXg9cGFyc2VJbnQobihpKS5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIiksMTApOnRoaXMuY2xpY2tlZEluZGV4PW4oaSkuaW5kZXgoKSx0LnNsaWRlVG9DbGlja2VkU2xpZGUmJnZvaWQgMCE9PXRoaXMuY2xpY2tlZEluZGV4JiZ0aGlzLmNsaWNrZWRJbmRleCE9PXRoaXMuYWN0aXZlSW5kZXgmJnRoaXMuc2xpZGVUb0NsaWNrZWRTbGlkZSgpfX07dmFyIHY9e2dldFRyYW5zbGF0ZTpmdW5jdGlvbihlKXt2b2lkIDA9PT1lJiYoZT10aGlzLmlzSG9yaXpvbnRhbCgpP1wieFwiOlwieVwiKTt2YXIgdD10aGlzLnBhcmFtcyxpPXRoaXMucnRsVHJhbnNsYXRlLHM9dGhpcy50cmFuc2xhdGUsYT10aGlzLiR3cmFwcGVyRWw7aWYodC52aXJ0dWFsVHJhbnNsYXRlKXJldHVybiBpPy1zOnM7aWYodC5jc3NNb2RlKXJldHVybiBzO3ZhciByPWQuZ2V0VHJhbnNsYXRlKGFbMF0sZSk7cmV0dXJuIGkmJihyPS1yKSxyfHwwfSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oZSx0KXt2YXIgaT10aGlzLnJ0bFRyYW5zbGF0ZSxzPXRoaXMucGFyYW1zLGE9dGhpcy4kd3JhcHBlckVsLHI9dGhpcy53cmFwcGVyRWwsbj10aGlzLnByb2dyZXNzLG89MCxsPTA7dGhpcy5pc0hvcml6b250YWwoKT9vPWk/LWU6ZTpsPWUscy5yb3VuZExlbmd0aHMmJihvPU1hdGguZmxvb3IobyksbD1NYXRoLmZsb29yKGwpKSxzLmNzc01vZGU/clt0aGlzLmlzSG9yaXpvbnRhbCgpP1wic2Nyb2xsTGVmdFwiOlwic2Nyb2xsVG9wXCJdPXRoaXMuaXNIb3Jpem9udGFsKCk/LW86LWw6cy52aXJ0dWFsVHJhbnNsYXRlfHxhLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKFwiK28rXCJweCwgXCIrbCtcInB4LCAwcHgpXCIpLHRoaXMucHJldmlvdXNUcmFuc2xhdGU9dGhpcy50cmFuc2xhdGUsdGhpcy50cmFuc2xhdGU9dGhpcy5pc0hvcml6b250YWwoKT9vOmw7dmFyIGQ9dGhpcy5tYXhUcmFuc2xhdGUoKS10aGlzLm1pblRyYW5zbGF0ZSgpOygwPT09ZD8wOihlLXRoaXMubWluVHJhbnNsYXRlKCkpL2QpIT09biYmdGhpcy51cGRhdGVQcm9ncmVzcyhlKSx0aGlzLmVtaXQoXCJzZXRUcmFuc2xhdGVcIix0aGlzLnRyYW5zbGF0ZSx0KX0sbWluVHJhbnNsYXRlOmZ1bmN0aW9uKCl7cmV0dXJuLXRoaXMuc25hcEdyaWRbMF19LG1heFRyYW5zbGF0ZTpmdW5jdGlvbigpe3JldHVybi10aGlzLnNuYXBHcmlkW3RoaXMuc25hcEdyaWQubGVuZ3RoLTFdfSx0cmFuc2xhdGVUbzpmdW5jdGlvbihlLHQsaSxzLGEpe3ZhciByO3ZvaWQgMD09PWUmJihlPTApLHZvaWQgMD09PXQmJih0PXRoaXMucGFyYW1zLnNwZWVkKSx2b2lkIDA9PT1pJiYoaT0hMCksdm9pZCAwPT09cyYmKHM9ITApO3ZhciBuPXRoaXMsbz1uLnBhcmFtcyxsPW4ud3JhcHBlckVsO2lmKG4uYW5pbWF0aW5nJiZvLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbilyZXR1cm4hMTt2YXIgZCxoPW4ubWluVHJhbnNsYXRlKCkscD1uLm1heFRyYW5zbGF0ZSgpO2lmKGQ9cyYmZT5oP2g6cyYmZTxwP3A6ZSxuLnVwZGF0ZVByb2dyZXNzKGQpLG8uY3NzTW9kZSl7dmFyIGM9bi5pc0hvcml6b250YWwoKTtyZXR1cm4gMD09PXQ/bFtjP1wic2Nyb2xsTGVmdFwiOlwic2Nyb2xsVG9wXCJdPS1kOmwuc2Nyb2xsVG8/bC5zY3JvbGxUbygoKHI9e30pW2M/XCJsZWZ0XCI6XCJ0b3BcIl09LWQsci5iZWhhdmlvcj1cInNtb290aFwiLHIpKTpsW2M/XCJzY3JvbGxMZWZ0XCI6XCJzY3JvbGxUb3BcIl09LWQsITB9cmV0dXJuIDA9PT10PyhuLnNldFRyYW5zaXRpb24oMCksbi5zZXRUcmFuc2xhdGUoZCksaSYmKG4uZW1pdChcImJlZm9yZVRyYW5zaXRpb25TdGFydFwiLHQsYSksbi5lbWl0KFwidHJhbnNpdGlvbkVuZFwiKSkpOihuLnNldFRyYW5zaXRpb24odCksbi5zZXRUcmFuc2xhdGUoZCksaSYmKG4uZW1pdChcImJlZm9yZVRyYW5zaXRpb25TdGFydFwiLHQsYSksbi5lbWl0KFwidHJhbnNpdGlvblN0YXJ0XCIpKSxuLmFuaW1hdGluZ3x8KG4uYW5pbWF0aW5nPSEwLG4ub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kfHwobi5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ9ZnVuY3Rpb24oZSl7biYmIW4uZGVzdHJveWVkJiZlLnRhcmdldD09PXRoaXMmJihuLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIixuLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCksbi4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsbi5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpLG4ub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kPW51bGwsZGVsZXRlIG4ub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kLGkmJm4uZW1pdChcInRyYW5zaXRpb25FbmRcIikpfSksbi4kd3JhcHBlckVsWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsbi5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpLG4uJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLG4ub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSkpLCEwfX07dmFyIGY9e3NldFRyYW5zaXRpb246ZnVuY3Rpb24oZSx0KXt0aGlzLnBhcmFtcy5jc3NNb2RlfHx0aGlzLiR3cmFwcGVyRWwudHJhbnNpdGlvbihlKSx0aGlzLmVtaXQoXCJzZXRUcmFuc2l0aW9uXCIsZSx0KX0sdHJhbnNpdGlvblN0YXJ0OmZ1bmN0aW9uKGUsdCl7dm9pZCAwPT09ZSYmKGU9ITApO3ZhciBpPXRoaXMuYWN0aXZlSW5kZXgscz10aGlzLnBhcmFtcyxhPXRoaXMucHJldmlvdXNJbmRleDtpZighcy5jc3NNb2RlKXtzLmF1dG9IZWlnaHQmJnRoaXMudXBkYXRlQXV0b0hlaWdodCgpO3ZhciByPXQ7aWYocnx8KHI9aT5hP1wibmV4dFwiOmk8YT9cInByZXZcIjpcInJlc2V0XCIpLHRoaXMuZW1pdChcInRyYW5zaXRpb25TdGFydFwiKSxlJiZpIT09YSl7aWYoXCJyZXNldFwiPT09cilyZXR1cm4gdm9pZCB0aGlzLmVtaXQoXCJzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0XCIpO3RoaXMuZW1pdChcInNsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0XCIpLFwibmV4dFwiPT09cj90aGlzLmVtaXQoXCJzbGlkZU5leHRUcmFuc2l0aW9uU3RhcnRcIik6dGhpcy5lbWl0KFwic2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0XCIpfX19LHRyYW5zaXRpb25FbmQ6ZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT1lJiYoZT0hMCk7dmFyIGk9dGhpcy5hY3RpdmVJbmRleCxzPXRoaXMucHJldmlvdXNJbmRleCxhPXRoaXMucGFyYW1zO2lmKHRoaXMuYW5pbWF0aW5nPSExLCFhLmNzc01vZGUpe3RoaXMuc2V0VHJhbnNpdGlvbigwKTt2YXIgcj10O2lmKHJ8fChyPWk+cz9cIm5leHRcIjppPHM/XCJwcmV2XCI6XCJyZXNldFwiKSx0aGlzLmVtaXQoXCJ0cmFuc2l0aW9uRW5kXCIpLGUmJmkhPT1zKXtpZihcInJlc2V0XCI9PT1yKXJldHVybiB2b2lkIHRoaXMuZW1pdChcInNsaWRlUmVzZXRUcmFuc2l0aW9uRW5kXCIpO3RoaXMuZW1pdChcInNsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZFwiKSxcIm5leHRcIj09PXI/dGhpcy5lbWl0KFwic2xpZGVOZXh0VHJhbnNpdGlvbkVuZFwiKTp0aGlzLmVtaXQoXCJzbGlkZVByZXZUcmFuc2l0aW9uRW5kXCIpfX19fTt2YXIgbT17c2xpZGVUbzpmdW5jdGlvbihlLHQsaSxzKXt2YXIgYTt2b2lkIDA9PT1lJiYoZT0wKSx2b2lkIDA9PT10JiYodD10aGlzLnBhcmFtcy5zcGVlZCksdm9pZCAwPT09aSYmKGk9ITApO3ZhciByPXRoaXMsbj1lO248MCYmKG49MCk7dmFyIG89ci5wYXJhbXMsbD1yLnNuYXBHcmlkLGQ9ci5zbGlkZXNHcmlkLGg9ci5wcmV2aW91c0luZGV4LHA9ci5hY3RpdmVJbmRleCxjPXIucnRsVHJhbnNsYXRlLHU9ci53cmFwcGVyRWw7aWYoci5hbmltYXRpbmcmJm8ucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKXJldHVybiExO3ZhciB2PU1hdGgubWluKHIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCxuKSxmPXYrTWF0aC5mbG9vcigobi12KS9yLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7Zj49bC5sZW5ndGgmJihmPWwubGVuZ3RoLTEpLChwfHxvLmluaXRpYWxTbGlkZXx8MCk9PT0oaHx8MCkmJmkmJnIuZW1pdChcImJlZm9yZVNsaWRlQ2hhbmdlU3RhcnRcIik7dmFyIG0sZz0tbFtmXTtpZihyLnVwZGF0ZVByb2dyZXNzKGcpLG8ubm9ybWFsaXplU2xpZGVJbmRleClmb3IodmFyIGI9MDtiPGQubGVuZ3RoO2IrPTEpLU1hdGguZmxvb3IoMTAwKmcpPj1NYXRoLmZsb29yKDEwMCpkW2JdKSYmKG49Yik7aWYoci5pbml0aWFsaXplZCYmbiE9PXApe2lmKCFyLmFsbG93U2xpZGVOZXh0JiZnPHIudHJhbnNsYXRlJiZnPHIubWluVHJhbnNsYXRlKCkpcmV0dXJuITE7aWYoIXIuYWxsb3dTbGlkZVByZXYmJmc+ci50cmFuc2xhdGUmJmc+ci5tYXhUcmFuc2xhdGUoKSYmKHB8fDApIT09bilyZXR1cm4hMX1pZihtPW4+cD9cIm5leHRcIjpuPHA/XCJwcmV2XCI6XCJyZXNldFwiLGMmJi1nPT09ci50cmFuc2xhdGV8fCFjJiZnPT09ci50cmFuc2xhdGUpcmV0dXJuIHIudXBkYXRlQWN0aXZlSW5kZXgobiksby5hdXRvSGVpZ2h0JiZyLnVwZGF0ZUF1dG9IZWlnaHQoKSxyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKSxcInNsaWRlXCIhPT1vLmVmZmVjdCYmci5zZXRUcmFuc2xhdGUoZyksXCJyZXNldFwiIT09bSYmKHIudHJhbnNpdGlvblN0YXJ0KGksbSksci50cmFuc2l0aW9uRW5kKGksbSkpLCExO2lmKG8uY3NzTW9kZSl7dmFyIHc9ci5pc0hvcml6b250YWwoKSx5PS1nO3JldHVybiBjJiYoeT11LnNjcm9sbFdpZHRoLXUub2Zmc2V0V2lkdGgteSksMD09PXQ/dVt3P1wic2Nyb2xsTGVmdFwiOlwic2Nyb2xsVG9wXCJdPXk6dS5zY3JvbGxUbz91LnNjcm9sbFRvKCgoYT17fSlbdz9cImxlZnRcIjpcInRvcFwiXT15LGEuYmVoYXZpb3I9XCJzbW9vdGhcIixhKSk6dVt3P1wic2Nyb2xsTGVmdFwiOlwic2Nyb2xsVG9wXCJdPXksITB9cmV0dXJuIDA9PT10PyhyLnNldFRyYW5zaXRpb24oMCksci5zZXRUcmFuc2xhdGUoZyksci51cGRhdGVBY3RpdmVJbmRleChuKSxyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKSxyLmVtaXQoXCJiZWZvcmVUcmFuc2l0aW9uU3RhcnRcIix0LHMpLHIudHJhbnNpdGlvblN0YXJ0KGksbSksci50cmFuc2l0aW9uRW5kKGksbSkpOihyLnNldFRyYW5zaXRpb24odCksci5zZXRUcmFuc2xhdGUoZyksci51cGRhdGVBY3RpdmVJbmRleChuKSxyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKSxyLmVtaXQoXCJiZWZvcmVUcmFuc2l0aW9uU3RhcnRcIix0LHMpLHIudHJhbnNpdGlvblN0YXJ0KGksbSksci5hbmltYXRpbmd8fChyLmFuaW1hdGluZz0hMCxyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kfHwoci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZD1mdW5jdGlvbihlKXtyJiYhci5kZXN0cm95ZWQmJmUudGFyZ2V0PT09dGhpcyYmKHIuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLHIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpLHIuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLHIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpLHIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ9bnVsbCxkZWxldGUgci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCxyLnRyYW5zaXRpb25FbmQoaSxtKSl9KSxyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIixyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSxyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdFRyYW5zaXRpb25FbmRcIixyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSkpLCEwfSxzbGlkZVRvTG9vcDpmdW5jdGlvbihlLHQsaSxzKXt2b2lkIDA9PT1lJiYoZT0wKSx2b2lkIDA9PT10JiYodD10aGlzLnBhcmFtcy5zcGVlZCksdm9pZCAwPT09aSYmKGk9ITApO3ZhciBhPWU7cmV0dXJuIHRoaXMucGFyYW1zLmxvb3AmJihhKz10aGlzLmxvb3BlZFNsaWRlcyksdGhpcy5zbGlkZVRvKGEsdCxpLHMpfSxzbGlkZU5leHQ6ZnVuY3Rpb24oZSx0LGkpe3ZvaWQgMD09PWUmJihlPXRoaXMucGFyYW1zLnNwZWVkKSx2b2lkIDA9PT10JiYodD0hMCk7dmFyIHM9dGhpcy5wYXJhbXMsYT10aGlzLmFuaW1hdGluZyxyPXRoaXMuYWN0aXZlSW5kZXg8cy5zbGlkZXNQZXJHcm91cFNraXA/MTpzLnNsaWRlc1Blckdyb3VwO2lmKHMubG9vcCl7aWYoYSlyZXR1cm4hMTt0aGlzLmxvb3BGaXgoKSx0aGlzLl9jbGllbnRMZWZ0PXRoaXMuJHdyYXBwZXJFbFswXS5jbGllbnRMZWZ0fXJldHVybiB0aGlzLnNsaWRlVG8odGhpcy5hY3RpdmVJbmRleCtyLGUsdCxpKX0sc2xpZGVQcmV2OmZ1bmN0aW9uKGUsdCxpKXt2b2lkIDA9PT1lJiYoZT10aGlzLnBhcmFtcy5zcGVlZCksdm9pZCAwPT09dCYmKHQ9ITApO3ZhciBzPXRoaXMucGFyYW1zLGE9dGhpcy5hbmltYXRpbmcscj10aGlzLnNuYXBHcmlkLG49dGhpcy5zbGlkZXNHcmlkLG89dGhpcy5ydGxUcmFuc2xhdGU7aWYocy5sb29wKXtpZihhKXJldHVybiExO3RoaXMubG9vcEZpeCgpLHRoaXMuX2NsaWVudExlZnQ9dGhpcy4kd3JhcHBlckVsWzBdLmNsaWVudExlZnR9ZnVuY3Rpb24gbChlKXtyZXR1cm4gZTwwPy1NYXRoLmZsb29yKE1hdGguYWJzKGUpKTpNYXRoLmZsb29yKGUpfXZhciBkLGg9bChvP3RoaXMudHJhbnNsYXRlOi10aGlzLnRyYW5zbGF0ZSkscD1yLm1hcCgoZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSl9KSksYz0obi5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBsKGUpfSkpLHJbcC5pbmRleE9mKGgpXSxyW3AuaW5kZXhPZihoKS0xXSk7cmV0dXJuIHZvaWQgMD09PWMmJnMuY3NzTW9kZSYmci5mb3JFYWNoKChmdW5jdGlvbihlKXshYyYmaD49ZSYmKGM9ZSl9KSksdm9pZCAwIT09YyYmKGQ9bi5pbmRleE9mKGMpKTwwJiYoZD10aGlzLmFjdGl2ZUluZGV4LTEpLHRoaXMuc2xpZGVUbyhkLGUsdCxpKX0sc2xpZGVSZXNldDpmdW5jdGlvbihlLHQsaSl7cmV0dXJuIHZvaWQgMD09PWUmJihlPXRoaXMucGFyYW1zLnNwZWVkKSx2b2lkIDA9PT10JiYodD0hMCksdGhpcy5zbGlkZVRvKHRoaXMuYWN0aXZlSW5kZXgsZSx0LGkpfSxzbGlkZVRvQ2xvc2VzdDpmdW5jdGlvbihlLHQsaSxzKXt2b2lkIDA9PT1lJiYoZT10aGlzLnBhcmFtcy5zcGVlZCksdm9pZCAwPT09dCYmKHQ9ITApLHZvaWQgMD09PXMmJihzPS41KTt2YXIgYT10aGlzLmFjdGl2ZUluZGV4LHI9TWF0aC5taW4odGhpcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLGEpLG49citNYXRoLmZsb29yKChhLXIpL3RoaXMucGFyYW1zLnNsaWRlc1Blckdyb3VwKSxvPXRoaXMucnRsVHJhbnNsYXRlP3RoaXMudHJhbnNsYXRlOi10aGlzLnRyYW5zbGF0ZTtpZihvPj10aGlzLnNuYXBHcmlkW25dKXt2YXIgbD10aGlzLnNuYXBHcmlkW25dO28tbD4odGhpcy5zbmFwR3JpZFtuKzFdLWwpKnMmJihhKz10aGlzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCl9ZWxzZXt2YXIgZD10aGlzLnNuYXBHcmlkW24tMV07by1kPD0odGhpcy5zbmFwR3JpZFtuXS1kKSpzJiYoYS09dGhpcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApfXJldHVybiBhPU1hdGgubWF4KGEsMCksYT1NYXRoLm1pbihhLHRoaXMuc2xpZGVzR3JpZC5sZW5ndGgtMSksdGhpcy5zbGlkZVRvKGEsZSx0LGkpfSxzbGlkZVRvQ2xpY2tlZFNsaWRlOmZ1bmN0aW9uKCl7dmFyIGUsdD10aGlzLGk9dC5wYXJhbXMscz10LiR3cmFwcGVyRWwsYT1cImF1dG9cIj09PWkuc2xpZGVzUGVyVmlldz90LnNsaWRlc1BlclZpZXdEeW5hbWljKCk6aS5zbGlkZXNQZXJWaWV3LHI9dC5jbGlja2VkSW5kZXg7aWYoaS5sb29wKXtpZih0LmFuaW1hdGluZylyZXR1cm47ZT1wYXJzZUludChuKHQuY2xpY2tlZFNsaWRlKS5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIiksMTApLGkuY2VudGVyZWRTbGlkZXM/cjx0Lmxvb3BlZFNsaWRlcy1hLzJ8fHI+dC5zbGlkZXMubGVuZ3RoLXQubG9vcGVkU2xpZGVzK2EvMj8odC5sb29wRml4KCkscj1zLmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVDbGFzcysnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytlKydcIl06bm90KC4nK2kuc2xpZGVEdXBsaWNhdGVDbGFzcytcIilcIikuZXEoMCkuaW5kZXgoKSxkLm5leHRUaWNrKChmdW5jdGlvbigpe3Quc2xpZGVUbyhyKX0pKSk6dC5zbGlkZVRvKHIpOnI+dC5zbGlkZXMubGVuZ3RoLWE/KHQubG9vcEZpeCgpLHI9cy5jaGlsZHJlbihcIi5cIitpLnNsaWRlQ2xhc3MrJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrZSsnXCJdOm5vdCguJytpLnNsaWRlRHVwbGljYXRlQ2xhc3MrXCIpXCIpLmVxKDApLmluZGV4KCksZC5uZXh0VGljaygoZnVuY3Rpb24oKXt0LnNsaWRlVG8ocil9KSkpOnQuc2xpZGVUbyhyKX1lbHNlIHQuc2xpZGVUbyhyKX19O3ZhciBnPXtsb29wQ3JlYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUucGFyYW1zLHM9ZS4kd3JhcHBlckVsO3MuY2hpbGRyZW4oXCIuXCIrdC5zbGlkZUNsYXNzK1wiLlwiK3Quc2xpZGVEdXBsaWNhdGVDbGFzcykucmVtb3ZlKCk7dmFyIGE9cy5jaGlsZHJlbihcIi5cIit0LnNsaWRlQ2xhc3MpO2lmKHQubG9vcEZpbGxHcm91cFdpdGhCbGFuayl7dmFyIHI9dC5zbGlkZXNQZXJHcm91cC1hLmxlbmd0aCV0LnNsaWRlc1Blckdyb3VwO2lmKHIhPT10LnNsaWRlc1Blckdyb3VwKXtmb3IodmFyIG89MDtvPHI7bys9MSl7dmFyIGw9bihpLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLmFkZENsYXNzKHQuc2xpZGVDbGFzcytcIiBcIit0LnNsaWRlQmxhbmtDbGFzcyk7cy5hcHBlbmQobCl9YT1zLmNoaWxkcmVuKFwiLlwiK3Quc2xpZGVDbGFzcyl9fVwiYXV0b1wiIT09dC5zbGlkZXNQZXJWaWV3fHx0Lmxvb3BlZFNsaWRlc3x8KHQubG9vcGVkU2xpZGVzPWEubGVuZ3RoKSxlLmxvb3BlZFNsaWRlcz1NYXRoLmNlaWwocGFyc2VGbG9hdCh0Lmxvb3BlZFNsaWRlc3x8dC5zbGlkZXNQZXJWaWV3LDEwKSksZS5sb29wZWRTbGlkZXMrPXQubG9vcEFkZGl0aW9uYWxTbGlkZXMsZS5sb29wZWRTbGlkZXM+YS5sZW5ndGgmJihlLmxvb3BlZFNsaWRlcz1hLmxlbmd0aCk7dmFyIGQ9W10saD1bXTthLmVhY2goKGZ1bmN0aW9uKHQsaSl7dmFyIHM9bihpKTt0PGUubG9vcGVkU2xpZGVzJiZoLnB1c2goaSksdDxhLmxlbmd0aCYmdD49YS5sZW5ndGgtZS5sb29wZWRTbGlkZXMmJmQucHVzaChpKSxzLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiLHQpfSkpO2Zvcih2YXIgcD0wO3A8aC5sZW5ndGg7cCs9MSlzLmFwcGVuZChuKGhbcF0uY2xvbmVOb2RlKCEwKSkuYWRkQ2xhc3ModC5zbGlkZUR1cGxpY2F0ZUNsYXNzKSk7Zm9yKHZhciBjPWQubGVuZ3RoLTE7Yz49MDtjLT0xKXMucHJlcGVuZChuKGRbY10uY2xvbmVOb2RlKCEwKSkuYWRkQ2xhc3ModC5zbGlkZUR1cGxpY2F0ZUNsYXNzKSl9LGxvb3BGaXg6ZnVuY3Rpb24oKXt0aGlzLmVtaXQoXCJiZWZvcmVMb29wRml4XCIpO3ZhciBlLHQ9dGhpcy5hY3RpdmVJbmRleCxpPXRoaXMuc2xpZGVzLHM9dGhpcy5sb29wZWRTbGlkZXMsYT10aGlzLmFsbG93U2xpZGVQcmV2LHI9dGhpcy5hbGxvd1NsaWRlTmV4dCxuPXRoaXMuc25hcEdyaWQsbz10aGlzLnJ0bFRyYW5zbGF0ZTt0aGlzLmFsbG93U2xpZGVQcmV2PSEwLHRoaXMuYWxsb3dTbGlkZU5leHQ9ITA7dmFyIGw9LW5bdF0tdGhpcy5nZXRUcmFuc2xhdGUoKTtpZih0PHMpZT1pLmxlbmd0aC0zKnMrdCxlKz1zLHRoaXMuc2xpZGVUbyhlLDAsITEsITApJiYwIT09bCYmdGhpcy5zZXRUcmFuc2xhdGUoKG8/LXRoaXMudHJhbnNsYXRlOnRoaXMudHJhbnNsYXRlKS1sKTtlbHNlIGlmKHQ+PWkubGVuZ3RoLXMpe2U9LWkubGVuZ3RoK3QrcyxlKz1zLHRoaXMuc2xpZGVUbyhlLDAsITEsITApJiYwIT09bCYmdGhpcy5zZXRUcmFuc2xhdGUoKG8/LXRoaXMudHJhbnNsYXRlOnRoaXMudHJhbnNsYXRlKS1sKX10aGlzLmFsbG93U2xpZGVQcmV2PWEsdGhpcy5hbGxvd1NsaWRlTmV4dD1yLHRoaXMuZW1pdChcImxvb3BGaXhcIil9LGxvb3BEZXN0cm95OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy4kd3JhcHBlckVsLHQ9dGhpcy5wYXJhbXMsaT10aGlzLnNsaWRlcztlLmNoaWxkcmVuKFwiLlwiK3Quc2xpZGVDbGFzcytcIi5cIit0LnNsaWRlRHVwbGljYXRlQ2xhc3MrXCIsLlwiK3Quc2xpZGVDbGFzcytcIi5cIit0LnNsaWRlQmxhbmtDbGFzcykucmVtb3ZlKCksaS5yZW1vdmVBdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIil9fTt2YXIgYj17c2V0R3JhYkN1cnNvcjpmdW5jdGlvbihlKXtpZighKGgudG91Y2h8fCF0aGlzLnBhcmFtcy5zaW11bGF0ZVRvdWNofHx0aGlzLnBhcmFtcy53YXRjaE92ZXJmbG93JiZ0aGlzLmlzTG9ja2VkfHx0aGlzLnBhcmFtcy5jc3NNb2RlKSl7dmFyIHQ9dGhpcy5lbDt0LnN0eWxlLmN1cnNvcj1cIm1vdmVcIix0LnN0eWxlLmN1cnNvcj1lP1wiLXdlYmtpdC1ncmFiYmluZ1wiOlwiLXdlYmtpdC1ncmFiXCIsdC5zdHlsZS5jdXJzb3I9ZT9cIi1tb3otZ3JhYmJpblwiOlwiLW1vei1ncmFiXCIsdC5zdHlsZS5jdXJzb3I9ZT9cImdyYWJiaW5nXCI6XCJncmFiXCJ9fSx1bnNldEdyYWJDdXJzb3I6ZnVuY3Rpb24oKXtoLnRvdWNofHx0aGlzLnBhcmFtcy53YXRjaE92ZXJmbG93JiZ0aGlzLmlzTG9ja2VkfHx0aGlzLnBhcmFtcy5jc3NNb2RlfHwodGhpcy5lbC5zdHlsZS5jdXJzb3I9XCJcIil9fTt2YXIgdyx5LHgsRSxULFMsQyxNLFAseixrLCQsTCxJLE8sRD17YXBwZW5kU2xpZGU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy4kd3JhcHBlckVsLGk9dGhpcy5wYXJhbXM7aWYoaS5sb29wJiZ0aGlzLmxvb3BEZXN0cm95KCksXCJvYmplY3RcIj09dHlwZW9mIGUmJlwibGVuZ3RoXCJpbiBlKWZvcih2YXIgcz0wO3M8ZS5sZW5ndGg7cys9MSllW3NdJiZ0LmFwcGVuZChlW3NdKTtlbHNlIHQuYXBwZW5kKGUpO2kubG9vcCYmdGhpcy5sb29wQ3JlYXRlKCksaS5vYnNlcnZlciYmaC5vYnNlcnZlcnx8dGhpcy51cGRhdGUoKX0scHJlcGVuZFNsaWRlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLGk9dGhpcy4kd3JhcHBlckVsLHM9dGhpcy5hY3RpdmVJbmRleDt0Lmxvb3AmJnRoaXMubG9vcERlc3Ryb3koKTt2YXIgYT1zKzE7aWYoXCJvYmplY3RcIj09dHlwZW9mIGUmJlwibGVuZ3RoXCJpbiBlKXtmb3IodmFyIHI9MDtyPGUubGVuZ3RoO3IrPTEpZVtyXSYmaS5wcmVwZW5kKGVbcl0pO2E9cytlLmxlbmd0aH1lbHNlIGkucHJlcGVuZChlKTt0Lmxvb3AmJnRoaXMubG9vcENyZWF0ZSgpLHQub2JzZXJ2ZXImJmgub2JzZXJ2ZXJ8fHRoaXMudXBkYXRlKCksdGhpcy5zbGlkZVRvKGEsMCwhMSl9LGFkZFNsaWRlOmZ1bmN0aW9uKGUsdCl7dmFyIGk9dGhpcy4kd3JhcHBlckVsLHM9dGhpcy5wYXJhbXMsYT10aGlzLmFjdGl2ZUluZGV4O3MubG9vcCYmKGEtPXRoaXMubG9vcGVkU2xpZGVzLHRoaXMubG9vcERlc3Ryb3koKSx0aGlzLnNsaWRlcz1pLmNoaWxkcmVuKFwiLlwiK3Muc2xpZGVDbGFzcykpO3ZhciByPXRoaXMuc2xpZGVzLmxlbmd0aDtpZihlPD0wKXRoaXMucHJlcGVuZFNsaWRlKHQpO2Vsc2UgaWYoZT49cil0aGlzLmFwcGVuZFNsaWRlKHQpO2Vsc2V7Zm9yKHZhciBuPWE+ZT9hKzE6YSxvPVtdLGw9ci0xO2w+PWU7bC09MSl7dmFyIGQ9dGhpcy5zbGlkZXMuZXEobCk7ZC5yZW1vdmUoKSxvLnVuc2hpZnQoZCl9aWYoXCJvYmplY3RcIj09dHlwZW9mIHQmJlwibGVuZ3RoXCJpbiB0KXtmb3IodmFyIHA9MDtwPHQubGVuZ3RoO3ArPTEpdFtwXSYmaS5hcHBlbmQodFtwXSk7bj1hPmU/YSt0Lmxlbmd0aDphfWVsc2UgaS5hcHBlbmQodCk7Zm9yKHZhciBjPTA7YzxvLmxlbmd0aDtjKz0xKWkuYXBwZW5kKG9bY10pO3MubG9vcCYmdGhpcy5sb29wQ3JlYXRlKCkscy5vYnNlcnZlciYmaC5vYnNlcnZlcnx8dGhpcy51cGRhdGUoKSxzLmxvb3A/dGhpcy5zbGlkZVRvKG4rdGhpcy5sb29wZWRTbGlkZXMsMCwhMSk6dGhpcy5zbGlkZVRvKG4sMCwhMSl9fSxyZW1vdmVTbGlkZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnBhcmFtcyxpPXRoaXMuJHdyYXBwZXJFbCxzPXRoaXMuYWN0aXZlSW5kZXg7dC5sb29wJiYocy09dGhpcy5sb29wZWRTbGlkZXMsdGhpcy5sb29wRGVzdHJveSgpLHRoaXMuc2xpZGVzPWkuY2hpbGRyZW4oXCIuXCIrdC5zbGlkZUNsYXNzKSk7dmFyIGEscj1zO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlJiZcImxlbmd0aFwiaW4gZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKz0xKWE9ZVtuXSx0aGlzLnNsaWRlc1thXSYmdGhpcy5zbGlkZXMuZXEoYSkucmVtb3ZlKCksYTxyJiYoci09MSk7cj1NYXRoLm1heChyLDApfWVsc2UgYT1lLHRoaXMuc2xpZGVzW2FdJiZ0aGlzLnNsaWRlcy5lcShhKS5yZW1vdmUoKSxhPHImJihyLT0xKSxyPU1hdGgubWF4KHIsMCk7dC5sb29wJiZ0aGlzLmxvb3BDcmVhdGUoKSx0Lm9ic2VydmVyJiZoLm9ic2VydmVyfHx0aGlzLnVwZGF0ZSgpLHQubG9vcD90aGlzLnNsaWRlVG8ocit0aGlzLmxvb3BlZFNsaWRlcywwLCExKTp0aGlzLnNsaWRlVG8ociwwLCExKX0scmVtb3ZlQWxsU2xpZGVzOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9MDt0PHRoaXMuc2xpZGVzLmxlbmd0aDt0Kz0xKWUucHVzaCh0KTt0aGlzLnJlbW92ZVNsaWRlKGUpfX0sQT0odz1hLm5hdmlnYXRvci5wbGF0Zm9ybSx5PWEubmF2aWdhdG9yLnVzZXJBZ2VudCx4PXtpb3M6ITEsYW5kcm9pZDohMSxhbmRyb2lkQ2hyb21lOiExLGRlc2t0b3A6ITEsaXBob25lOiExLGlwb2Q6ITEsaXBhZDohMSxlZGdlOiExLGllOiExLGZpcmVmb3g6ITEsbWFjb3M6ITEsd2luZG93czohMSxjb3Jkb3ZhOiEoIWEuY29yZG92YSYmIWEucGhvbmVnYXApLHBob25lZ2FwOiEoIWEuY29yZG92YSYmIWEucGhvbmVnYXApLGVsZWN0cm9uOiExfSxFPWEuc2NyZWVuLndpZHRoLFQ9YS5zY3JlZW4uaGVpZ2h0LFM9eS5tYXRjaCgvKEFuZHJvaWQpOz9bXFxzXFwvXSsoW1xcZC5dKyk/LyksQz15Lm1hdGNoKC8oaVBhZCkuKk9TXFxzKFtcXGRfXSspLyksTT15Lm1hdGNoKC8oaVBvZCkoLipPU1xccyhbXFxkX10rKSk/LyksUD0hQyYmeS5tYXRjaCgvKGlQaG9uZVxcc09TfGlPUylcXHMoW1xcZF9dKykvKSx6PXkuaW5kZXhPZihcIk1TSUUgXCIpPj0wfHx5LmluZGV4T2YoXCJUcmlkZW50L1wiKT49MCxrPXkuaW5kZXhPZihcIkVkZ2UvXCIpPj0wLCQ9eS5pbmRleE9mKFwiR2Vja28vXCIpPj0wJiZ5LmluZGV4T2YoXCJGaXJlZm94L1wiKT49MCxMPVwiV2luMzJcIj09PXcsST15LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImVsZWN0cm9uXCIpPj0wLE89XCJNYWNJbnRlbFwiPT09dywhQyYmTyYmaC50b3VjaCYmKDEwMjQ9PT1FJiYxMzY2PT09VHx8ODM0PT09RSYmMTE5ND09PVR8fDgzND09PUUmJjExMTI9PT1UfHw3Njg9PT1FJiYxMDI0PT09VCkmJihDPXkubWF0Y2goLyhWZXJzaW9uKVxcLyhbXFxkLl0rKS8pLE89ITEpLHguaWU9eix4LmVkZ2U9ayx4LmZpcmVmb3g9JCxTJiYhTCYmKHgub3M9XCJhbmRyb2lkXCIseC5vc1ZlcnNpb249U1syXSx4LmFuZHJvaWQ9ITAseC5hbmRyb2lkQ2hyb21lPXkudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiY2hyb21lXCIpPj0wKSwoQ3x8UHx8TSkmJih4Lm9zPVwiaW9zXCIseC5pb3M9ITApLFAmJiFNJiYoeC5vc1ZlcnNpb249UFsyXS5yZXBsYWNlKC9fL2csXCIuXCIpLHguaXBob25lPSEwKSxDJiYoeC5vc1ZlcnNpb249Q1syXS5yZXBsYWNlKC9fL2csXCIuXCIpLHguaXBhZD0hMCksTSYmKHgub3NWZXJzaW9uPU1bM10/TVszXS5yZXBsYWNlKC9fL2csXCIuXCIpOm51bGwseC5pcG9kPSEwKSx4LmlvcyYmeC5vc1ZlcnNpb24mJnkuaW5kZXhPZihcIlZlcnNpb24vXCIpPj0wJiZcIjEwXCI9PT14Lm9zVmVyc2lvbi5zcGxpdChcIi5cIilbMF0mJih4Lm9zVmVyc2lvbj15LnRvTG93ZXJDYXNlKCkuc3BsaXQoXCJ2ZXJzaW9uL1wiKVsxXS5zcGxpdChcIiBcIilbMF0pLHgud2ViVmlldz0hKCEoUHx8Q3x8TSl8fCF5Lm1hdGNoKC8uKkFwcGxlV2ViS2l0KD8hLipTYWZhcmkpL2kpJiYhYS5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSl8fGEubWF0Y2hNZWRpYSYmYS5tYXRjaE1lZGlhKFwiKGRpc3BsYXktbW9kZTogc3RhbmRhbG9uZSlcIikubWF0Y2hlcyx4LndlYnZpZXc9eC53ZWJWaWV3LHguc3RhbmRhbG9uZT14LndlYlZpZXcseC5kZXNrdG9wPSEoeC5pb3N8fHguYW5kcm9pZCl8fEkseC5kZXNrdG9wJiYoeC5lbGVjdHJvbj1JLHgubWFjb3M9Tyx4LndpbmRvd3M9TCx4Lm1hY29zJiYoeC5vcz1cIm1hY29zXCIpLHgud2luZG93cyYmKHgub3M9XCJ3aW5kb3dzXCIpKSx4LnBpeGVsUmF0aW89YS5kZXZpY2VQaXhlbFJhdGlvfHwxLHgpO2Z1bmN0aW9uIEcoZSl7dmFyIHQ9dGhpcy50b3VjaEV2ZW50c0RhdGEscz10aGlzLnBhcmFtcyxyPXRoaXMudG91Y2hlcztpZighdGhpcy5hbmltYXRpbmd8fCFzLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbil7dmFyIG89ZTtvLm9yaWdpbmFsRXZlbnQmJihvPW8ub3JpZ2luYWxFdmVudCk7dmFyIGw9bihvLnRhcmdldCk7aWYoKFwid3JhcHBlclwiIT09cy50b3VjaEV2ZW50c1RhcmdldHx8bC5jbG9zZXN0KHRoaXMud3JhcHBlckVsKS5sZW5ndGgpJiYodC5pc1RvdWNoRXZlbnQ9XCJ0b3VjaHN0YXJ0XCI9PT1vLnR5cGUsKHQuaXNUb3VjaEV2ZW50fHwhKFwid2hpY2hcImluIG8pfHwzIT09by53aGljaCkmJiEoIXQuaXNUb3VjaEV2ZW50JiZcImJ1dHRvblwiaW4gbyYmby5idXR0b24+MHx8dC5pc1RvdWNoZWQmJnQuaXNNb3ZlZCkpKWlmKHMubm9Td2lwaW5nJiZsLmNsb3Nlc3Qocy5ub1N3aXBpbmdTZWxlY3Rvcj9zLm5vU3dpcGluZ1NlbGVjdG9yOlwiLlwiK3Mubm9Td2lwaW5nQ2xhc3MpWzBdKXRoaXMuYWxsb3dDbGljaz0hMDtlbHNlIGlmKCFzLnN3aXBlSGFuZGxlcnx8bC5jbG9zZXN0KHMuc3dpcGVIYW5kbGVyKVswXSl7ci5jdXJyZW50WD1cInRvdWNoc3RhcnRcIj09PW8udHlwZT9vLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg6by5wYWdlWCxyLmN1cnJlbnRZPVwidG91Y2hzdGFydFwiPT09by50eXBlP28udGFyZ2V0VG91Y2hlc1swXS5wYWdlWTpvLnBhZ2VZO3ZhciBoPXIuY3VycmVudFgscD1yLmN1cnJlbnRZLGM9cy5lZGdlU3dpcGVEZXRlY3Rpb258fHMuaU9TRWRnZVN3aXBlRGV0ZWN0aW9uLHU9cy5lZGdlU3dpcGVUaHJlc2hvbGR8fHMuaU9TRWRnZVN3aXBlVGhyZXNob2xkO2lmKCFjfHwhKGg8PXV8fGg+PWEuc2NyZWVuLndpZHRoLXUpKXtpZihkLmV4dGVuZCh0LHtpc1RvdWNoZWQ6ITAsaXNNb3ZlZDohMSxhbGxvd1RvdWNoQ2FsbGJhY2tzOiEwLGlzU2Nyb2xsaW5nOnZvaWQgMCxzdGFydE1vdmluZzp2b2lkIDB9KSxyLnN0YXJ0WD1oLHIuc3RhcnRZPXAsdC50b3VjaFN0YXJ0VGltZT1kLm5vdygpLHRoaXMuYWxsb3dDbGljaz0hMCx0aGlzLnVwZGF0ZVNpemUoKSx0aGlzLnN3aXBlRGlyZWN0aW9uPXZvaWQgMCxzLnRocmVzaG9sZD4wJiYodC5hbGxvd1RocmVzaG9sZE1vdmU9ITEpLFwidG91Y2hzdGFydFwiIT09by50eXBlKXt2YXIgdj0hMDtsLmlzKHQuZm9ybUVsZW1lbnRzKSYmKHY9ITEpLGkuYWN0aXZlRWxlbWVudCYmbihpLmFjdGl2ZUVsZW1lbnQpLmlzKHQuZm9ybUVsZW1lbnRzKSYmaS5hY3RpdmVFbGVtZW50IT09bFswXSYmaS5hY3RpdmVFbGVtZW50LmJsdXIoKTt2YXIgZj12JiZ0aGlzLmFsbG93VG91Y2hNb3ZlJiZzLnRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDsocy50b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdHx8ZikmJm8ucHJldmVudERlZmF1bHQoKX10aGlzLmVtaXQoXCJ0b3VjaFN0YXJ0XCIsbyl9fX19ZnVuY3Rpb24gSChlKXt2YXIgdD10aGlzLnRvdWNoRXZlbnRzRGF0YSxzPXRoaXMucGFyYW1zLGE9dGhpcy50b3VjaGVzLHI9dGhpcy5ydGxUcmFuc2xhdGUsbz1lO2lmKG8ub3JpZ2luYWxFdmVudCYmKG89by5vcmlnaW5hbEV2ZW50KSx0LmlzVG91Y2hlZCl7aWYoIXQuaXNUb3VjaEV2ZW50fHxcInRvdWNobW92ZVwiPT09by50eXBlKXt2YXIgbD1cInRvdWNobW92ZVwiPT09by50eXBlJiZvLnRhcmdldFRvdWNoZXMmJihvLnRhcmdldFRvdWNoZXNbMF18fG8uY2hhbmdlZFRvdWNoZXNbMF0pLGg9XCJ0b3VjaG1vdmVcIj09PW8udHlwZT9sLnBhZ2VYOm8ucGFnZVgscD1cInRvdWNobW92ZVwiPT09by50eXBlP2wucGFnZVk6by5wYWdlWTtpZihvLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyKXJldHVybiBhLnN0YXJ0WD1oLHZvaWQoYS5zdGFydFk9cCk7aWYoIXRoaXMuYWxsb3dUb3VjaE1vdmUpcmV0dXJuIHRoaXMuYWxsb3dDbGljaz0hMSx2b2lkKHQuaXNUb3VjaGVkJiYoZC5leHRlbmQoYSx7c3RhcnRYOmgsc3RhcnRZOnAsY3VycmVudFg6aCxjdXJyZW50WTpwfSksdC50b3VjaFN0YXJ0VGltZT1kLm5vdygpKSk7aWYodC5pc1RvdWNoRXZlbnQmJnMudG91Y2hSZWxlYXNlT25FZGdlcyYmIXMubG9vcClpZih0aGlzLmlzVmVydGljYWwoKSl7aWYocDxhLnN0YXJ0WSYmdGhpcy50cmFuc2xhdGU8PXRoaXMubWF4VHJhbnNsYXRlKCl8fHA+YS5zdGFydFkmJnRoaXMudHJhbnNsYXRlPj10aGlzLm1pblRyYW5zbGF0ZSgpKXJldHVybiB0LmlzVG91Y2hlZD0hMSx2b2lkKHQuaXNNb3ZlZD0hMSl9ZWxzZSBpZihoPGEuc3RhcnRYJiZ0aGlzLnRyYW5zbGF0ZTw9dGhpcy5tYXhUcmFuc2xhdGUoKXx8aD5hLnN0YXJ0WCYmdGhpcy50cmFuc2xhdGU+PXRoaXMubWluVHJhbnNsYXRlKCkpcmV0dXJuO2lmKHQuaXNUb3VjaEV2ZW50JiZpLmFjdGl2ZUVsZW1lbnQmJm8udGFyZ2V0PT09aS5hY3RpdmVFbGVtZW50JiZuKG8udGFyZ2V0KS5pcyh0LmZvcm1FbGVtZW50cykpcmV0dXJuIHQuaXNNb3ZlZD0hMCx2b2lkKHRoaXMuYWxsb3dDbGljaz0hMSk7aWYodC5hbGxvd1RvdWNoQ2FsbGJhY2tzJiZ0aGlzLmVtaXQoXCJ0b3VjaE1vdmVcIixvKSwhKG8udGFyZ2V0VG91Y2hlcyYmby50YXJnZXRUb3VjaGVzLmxlbmd0aD4xKSl7YS5jdXJyZW50WD1oLGEuY3VycmVudFk9cDt2YXIgYz1hLmN1cnJlbnRYLWEuc3RhcnRYLHU9YS5jdXJyZW50WS1hLnN0YXJ0WTtpZighKHRoaXMucGFyYW1zLnRocmVzaG9sZCYmTWF0aC5zcXJ0KE1hdGgucG93KGMsMikrTWF0aC5wb3codSwyKSk8dGhpcy5wYXJhbXMudGhyZXNob2xkKSl7dmFyIHY7aWYodm9pZCAwPT09dC5pc1Njcm9sbGluZyl0aGlzLmlzSG9yaXpvbnRhbCgpJiZhLmN1cnJlbnRZPT09YS5zdGFydFl8fHRoaXMuaXNWZXJ0aWNhbCgpJiZhLmN1cnJlbnRYPT09YS5zdGFydFg/dC5pc1Njcm9sbGluZz0hMTpjKmMrdSp1Pj0yNSYmKHY9MTgwKk1hdGguYXRhbjIoTWF0aC5hYnModSksTWF0aC5hYnMoYykpL01hdGguUEksdC5pc1Njcm9sbGluZz10aGlzLmlzSG9yaXpvbnRhbCgpP3Y+cy50b3VjaEFuZ2xlOjkwLXY+cy50b3VjaEFuZ2xlKTtpZih0LmlzU2Nyb2xsaW5nJiZ0aGlzLmVtaXQoXCJ0b3VjaE1vdmVPcHBvc2l0ZVwiLG8pLHZvaWQgMD09PXQuc3RhcnRNb3ZpbmcmJihhLmN1cnJlbnRYPT09YS5zdGFydFgmJmEuY3VycmVudFk9PT1hLnN0YXJ0WXx8KHQuc3RhcnRNb3Zpbmc9ITApKSx0LmlzU2Nyb2xsaW5nKXQuaXNUb3VjaGVkPSExO2Vsc2UgaWYodC5zdGFydE1vdmluZyl7dGhpcy5hbGxvd0NsaWNrPSExLCFzLmNzc01vZGUmJm8uY2FuY2VsYWJsZSYmby5wcmV2ZW50RGVmYXVsdCgpLHMudG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uJiYhcy5uZXN0ZWQmJm8uc3RvcFByb3BhZ2F0aW9uKCksdC5pc01vdmVkfHwocy5sb29wJiZ0aGlzLmxvb3BGaXgoKSx0LnN0YXJ0VHJhbnNsYXRlPXRoaXMuZ2V0VHJhbnNsYXRlKCksdGhpcy5zZXRUcmFuc2l0aW9uKDApLHRoaXMuYW5pbWF0aW5nJiZ0aGlzLiR3cmFwcGVyRWwudHJpZ2dlcihcIndlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZFwiKSx0LmFsbG93TW9tZW50dW1Cb3VuY2U9ITEsIXMuZ3JhYkN1cnNvcnx8ITAhPT10aGlzLmFsbG93U2xpZGVOZXh0JiYhMCE9PXRoaXMuYWxsb3dTbGlkZVByZXZ8fHRoaXMuc2V0R3JhYkN1cnNvcighMCksdGhpcy5lbWl0KFwic2xpZGVyRmlyc3RNb3ZlXCIsbykpLHRoaXMuZW1pdChcInNsaWRlck1vdmVcIixvKSx0LmlzTW92ZWQ9ITA7dmFyIGY9dGhpcy5pc0hvcml6b250YWwoKT9jOnU7YS5kaWZmPWYsZio9cy50b3VjaFJhdGlvLHImJihmPS1mKSx0aGlzLnN3aXBlRGlyZWN0aW9uPWY+MD9cInByZXZcIjpcIm5leHRcIix0LmN1cnJlbnRUcmFuc2xhdGU9Zit0LnN0YXJ0VHJhbnNsYXRlO3ZhciBtPSEwLGc9cy5yZXNpc3RhbmNlUmF0aW87aWYocy50b3VjaFJlbGVhc2VPbkVkZ2VzJiYoZz0wKSxmPjAmJnQuY3VycmVudFRyYW5zbGF0ZT50aGlzLm1pblRyYW5zbGF0ZSgpPyhtPSExLHMucmVzaXN0YW5jZSYmKHQuY3VycmVudFRyYW5zbGF0ZT10aGlzLm1pblRyYW5zbGF0ZSgpLTErTWF0aC5wb3coLXRoaXMubWluVHJhbnNsYXRlKCkrdC5zdGFydFRyYW5zbGF0ZStmLGcpKSk6ZjwwJiZ0LmN1cnJlbnRUcmFuc2xhdGU8dGhpcy5tYXhUcmFuc2xhdGUoKSYmKG09ITEscy5yZXNpc3RhbmNlJiYodC5jdXJyZW50VHJhbnNsYXRlPXRoaXMubWF4VHJhbnNsYXRlKCkrMS1NYXRoLnBvdyh0aGlzLm1heFRyYW5zbGF0ZSgpLXQuc3RhcnRUcmFuc2xhdGUtZixnKSkpLG0mJihvLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyPSEwKSwhdGhpcy5hbGxvd1NsaWRlTmV4dCYmXCJuZXh0XCI9PT10aGlzLnN3aXBlRGlyZWN0aW9uJiZ0LmN1cnJlbnRUcmFuc2xhdGU8dC5zdGFydFRyYW5zbGF0ZSYmKHQuY3VycmVudFRyYW5zbGF0ZT10LnN0YXJ0VHJhbnNsYXRlKSwhdGhpcy5hbGxvd1NsaWRlUHJldiYmXCJwcmV2XCI9PT10aGlzLnN3aXBlRGlyZWN0aW9uJiZ0LmN1cnJlbnRUcmFuc2xhdGU+dC5zdGFydFRyYW5zbGF0ZSYmKHQuY3VycmVudFRyYW5zbGF0ZT10LnN0YXJ0VHJhbnNsYXRlKSxzLnRocmVzaG9sZD4wKXtpZighKE1hdGguYWJzKGYpPnMudGhyZXNob2xkfHx0LmFsbG93VGhyZXNob2xkTW92ZSkpcmV0dXJuIHZvaWQodC5jdXJyZW50VHJhbnNsYXRlPXQuc3RhcnRUcmFuc2xhdGUpO2lmKCF0LmFsbG93VGhyZXNob2xkTW92ZSlyZXR1cm4gdC5hbGxvd1RocmVzaG9sZE1vdmU9ITAsYS5zdGFydFg9YS5jdXJyZW50WCxhLnN0YXJ0WT1hLmN1cnJlbnRZLHQuY3VycmVudFRyYW5zbGF0ZT10LnN0YXJ0VHJhbnNsYXRlLHZvaWQoYS5kaWZmPXRoaXMuaXNIb3Jpem9udGFsKCk/YS5jdXJyZW50WC1hLnN0YXJ0WDphLmN1cnJlbnRZLWEuc3RhcnRZKX1zLmZvbGxvd0ZpbmdlciYmIXMuY3NzTW9kZSYmKChzLmZyZWVNb2RlfHxzLndhdGNoU2xpZGVzUHJvZ3Jlc3N8fHMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KSYmKHRoaXMudXBkYXRlQWN0aXZlSW5kZXgoKSx0aGlzLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKSkscy5mcmVlTW9kZSYmKDA9PT10LnZlbG9jaXRpZXMubGVuZ3RoJiZ0LnZlbG9jaXRpZXMucHVzaCh7cG9zaXRpb246YVt0aGlzLmlzSG9yaXpvbnRhbCgpP1wic3RhcnRYXCI6XCJzdGFydFlcIl0sdGltZTp0LnRvdWNoU3RhcnRUaW1lfSksdC52ZWxvY2l0aWVzLnB1c2goe3Bvc2l0aW9uOmFbdGhpcy5pc0hvcml6b250YWwoKT9cImN1cnJlbnRYXCI6XCJjdXJyZW50WVwiXSx0aW1lOmQubm93KCl9KSksdGhpcy51cGRhdGVQcm9ncmVzcyh0LmN1cnJlbnRUcmFuc2xhdGUpLHRoaXMuc2V0VHJhbnNsYXRlKHQuY3VycmVudFRyYW5zbGF0ZSkpfX19fX1lbHNlIHQuc3RhcnRNb3ZpbmcmJnQuaXNTY3JvbGxpbmcmJnRoaXMuZW1pdChcInRvdWNoTW92ZU9wcG9zaXRlXCIsbyl9ZnVuY3Rpb24gQihlKXt2YXIgdD10aGlzLGk9dC50b3VjaEV2ZW50c0RhdGEscz10LnBhcmFtcyxhPXQudG91Y2hlcyxyPXQucnRsVHJhbnNsYXRlLG49dC4kd3JhcHBlckVsLG89dC5zbGlkZXNHcmlkLGw9dC5zbmFwR3JpZCxoPWU7aWYoaC5vcmlnaW5hbEV2ZW50JiYoaD1oLm9yaWdpbmFsRXZlbnQpLGkuYWxsb3dUb3VjaENhbGxiYWNrcyYmdC5lbWl0KFwidG91Y2hFbmRcIixoKSxpLmFsbG93VG91Y2hDYWxsYmFja3M9ITEsIWkuaXNUb3VjaGVkKXJldHVybiBpLmlzTW92ZWQmJnMuZ3JhYkN1cnNvciYmdC5zZXRHcmFiQ3Vyc29yKCExKSxpLmlzTW92ZWQ9ITEsdm9pZChpLnN0YXJ0TW92aW5nPSExKTtzLmdyYWJDdXJzb3ImJmkuaXNNb3ZlZCYmaS5pc1RvdWNoZWQmJighMD09PXQuYWxsb3dTbGlkZU5leHR8fCEwPT09dC5hbGxvd1NsaWRlUHJldikmJnQuc2V0R3JhYkN1cnNvcighMSk7dmFyIHAsYz1kLm5vdygpLHU9Yy1pLnRvdWNoU3RhcnRUaW1lO2lmKHQuYWxsb3dDbGljayYmKHQudXBkYXRlQ2xpY2tlZFNsaWRlKGgpLHQuZW1pdChcInRhcCBjbGlja1wiLGgpLHU8MzAwJiZjLWkubGFzdENsaWNrVGltZTwzMDAmJnQuZW1pdChcImRvdWJsZVRhcCBkb3VibGVDbGlja1wiLGgpKSxpLmxhc3RDbGlja1RpbWU9ZC5ub3coKSxkLm5leHRUaWNrKChmdW5jdGlvbigpe3QuZGVzdHJveWVkfHwodC5hbGxvd0NsaWNrPSEwKX0pKSwhaS5pc1RvdWNoZWR8fCFpLmlzTW92ZWR8fCF0LnN3aXBlRGlyZWN0aW9ufHwwPT09YS5kaWZmfHxpLmN1cnJlbnRUcmFuc2xhdGU9PT1pLnN0YXJ0VHJhbnNsYXRlKXJldHVybiBpLmlzVG91Y2hlZD0hMSxpLmlzTW92ZWQ9ITEsdm9pZChpLnN0YXJ0TW92aW5nPSExKTtpZihpLmlzVG91Y2hlZD0hMSxpLmlzTW92ZWQ9ITEsaS5zdGFydE1vdmluZz0hMSxwPXMuZm9sbG93RmluZ2VyP3I/dC50cmFuc2xhdGU6LXQudHJhbnNsYXRlOi1pLmN1cnJlbnRUcmFuc2xhdGUsIXMuY3NzTW9kZSlpZihzLmZyZWVNb2RlKXtpZihwPC10Lm1pblRyYW5zbGF0ZSgpKXJldHVybiB2b2lkIHQuc2xpZGVUbyh0LmFjdGl2ZUluZGV4KTtpZihwPi10Lm1heFRyYW5zbGF0ZSgpKXJldHVybiB2b2lkKHQuc2xpZGVzLmxlbmd0aDxsLmxlbmd0aD90LnNsaWRlVG8obC5sZW5ndGgtMSk6dC5zbGlkZVRvKHQuc2xpZGVzLmxlbmd0aC0xKSk7aWYocy5mcmVlTW9kZU1vbWVudHVtKXtpZihpLnZlbG9jaXRpZXMubGVuZ3RoPjEpe3ZhciB2PWkudmVsb2NpdGllcy5wb3AoKSxmPWkudmVsb2NpdGllcy5wb3AoKSxtPXYucG9zaXRpb24tZi5wb3NpdGlvbixnPXYudGltZS1mLnRpbWU7dC52ZWxvY2l0eT1tL2csdC52ZWxvY2l0eS89MixNYXRoLmFicyh0LnZlbG9jaXR5KTxzLmZyZWVNb2RlTWluaW11bVZlbG9jaXR5JiYodC52ZWxvY2l0eT0wKSwoZz4xNTB8fGQubm93KCktdi50aW1lPjMwMCkmJih0LnZlbG9jaXR5PTApfWVsc2UgdC52ZWxvY2l0eT0wO3QudmVsb2NpdHkqPXMuZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW8saS52ZWxvY2l0aWVzLmxlbmd0aD0wO3ZhciBiPTFlMypzLmZyZWVNb2RlTW9tZW50dW1SYXRpbyx3PXQudmVsb2NpdHkqYix5PXQudHJhbnNsYXRlK3c7ciYmKHk9LXkpO3ZhciB4LEUsVD0hMSxTPTIwKk1hdGguYWJzKHQudmVsb2NpdHkpKnMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvO2lmKHk8dC5tYXhUcmFuc2xhdGUoKSlzLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2U/KHkrdC5tYXhUcmFuc2xhdGUoKTwtUyYmKHk9dC5tYXhUcmFuc2xhdGUoKS1TKSx4PXQubWF4VHJhbnNsYXRlKCksVD0hMCxpLmFsbG93TW9tZW50dW1Cb3VuY2U9ITApOnk9dC5tYXhUcmFuc2xhdGUoKSxzLmxvb3AmJnMuY2VudGVyZWRTbGlkZXMmJihFPSEwKTtlbHNlIGlmKHk+dC5taW5UcmFuc2xhdGUoKSlzLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2U/KHktdC5taW5UcmFuc2xhdGUoKT5TJiYoeT10Lm1pblRyYW5zbGF0ZSgpK1MpLHg9dC5taW5UcmFuc2xhdGUoKSxUPSEwLGkuYWxsb3dNb21lbnR1bUJvdW5jZT0hMCk6eT10Lm1pblRyYW5zbGF0ZSgpLHMubG9vcCYmcy5jZW50ZXJlZFNsaWRlcyYmKEU9ITApO2Vsc2UgaWYocy5mcmVlTW9kZVN0aWNreSl7Zm9yKHZhciBDLE09MDtNPGwubGVuZ3RoO00rPTEpaWYobFtNXT4teSl7Qz1NO2JyZWFrfXk9LSh5PU1hdGguYWJzKGxbQ10teSk8TWF0aC5hYnMobFtDLTFdLXkpfHxcIm5leHRcIj09PXQuc3dpcGVEaXJlY3Rpb24/bFtDXTpsW0MtMV0pfWlmKEUmJnQub25jZShcInRyYW5zaXRpb25FbmRcIiwoZnVuY3Rpb24oKXt0Lmxvb3BGaXgoKX0pKSwwIT09dC52ZWxvY2l0eSl7aWYoYj1yP01hdGguYWJzKCgteS10LnRyYW5zbGF0ZSkvdC52ZWxvY2l0eSk6TWF0aC5hYnMoKHktdC50cmFuc2xhdGUpL3QudmVsb2NpdHkpLHMuZnJlZU1vZGVTdGlja3kpe3ZhciBQPU1hdGguYWJzKChyPy15OnkpLXQudHJhbnNsYXRlKSx6PXQuc2xpZGVzU2l6ZXNHcmlkW3QuYWN0aXZlSW5kZXhdO2I9UDx6P3Muc3BlZWQ6UDwyKno/MS41KnMuc3BlZWQ6Mi41KnMuc3BlZWR9fWVsc2UgaWYocy5mcmVlTW9kZVN0aWNreSlyZXR1cm4gdm9pZCB0LnNsaWRlVG9DbG9zZXN0KCk7cy5mcmVlTW9kZU1vbWVudHVtQm91bmNlJiZUPyh0LnVwZGF0ZVByb2dyZXNzKHgpLHQuc2V0VHJhbnNpdGlvbihiKSx0LnNldFRyYW5zbGF0ZSh5KSx0LnRyYW5zaXRpb25TdGFydCghMCx0LnN3aXBlRGlyZWN0aW9uKSx0LmFuaW1hdGluZz0hMCxuLnRyYW5zaXRpb25FbmQoKGZ1bmN0aW9uKCl7dCYmIXQuZGVzdHJveWVkJiZpLmFsbG93TW9tZW50dW1Cb3VuY2UmJih0LmVtaXQoXCJtb21lbnR1bUJvdW5jZVwiKSx0LnNldFRyYW5zaXRpb24ocy5zcGVlZCksc2V0VGltZW91dCgoZnVuY3Rpb24oKXt0LnNldFRyYW5zbGF0ZSh4KSxuLnRyYW5zaXRpb25FbmQoKGZ1bmN0aW9uKCl7dCYmIXQuZGVzdHJveWVkJiZ0LnRyYW5zaXRpb25FbmQoKX0pKX0pLDApKX0pKSk6dC52ZWxvY2l0eT8odC51cGRhdGVQcm9ncmVzcyh5KSx0LnNldFRyYW5zaXRpb24oYiksdC5zZXRUcmFuc2xhdGUoeSksdC50cmFuc2l0aW9uU3RhcnQoITAsdC5zd2lwZURpcmVjdGlvbiksdC5hbmltYXRpbmd8fCh0LmFuaW1hdGluZz0hMCxuLnRyYW5zaXRpb25FbmQoKGZ1bmN0aW9uKCl7dCYmIXQuZGVzdHJveWVkJiZ0LnRyYW5zaXRpb25FbmQoKX0pKSkpOnQudXBkYXRlUHJvZ3Jlc3MoeSksdC51cGRhdGVBY3RpdmVJbmRleCgpLHQudXBkYXRlU2xpZGVzQ2xhc3NlcygpfWVsc2UgaWYocy5mcmVlTW9kZVN0aWNreSlyZXR1cm4gdm9pZCB0LnNsaWRlVG9DbG9zZXN0KCk7KCFzLmZyZWVNb2RlTW9tZW50dW18fHU+PXMubG9uZ1N3aXBlc01zKSYmKHQudXBkYXRlUHJvZ3Jlc3MoKSx0LnVwZGF0ZUFjdGl2ZUluZGV4KCksdC51cGRhdGVTbGlkZXNDbGFzc2VzKCkpfWVsc2V7Zm9yKHZhciBrPTAsJD10LnNsaWRlc1NpemVzR3JpZFswXSxMPTA7TDxvLmxlbmd0aDtMKz1MPHMuc2xpZGVzUGVyR3JvdXBTa2lwPzE6cy5zbGlkZXNQZXJHcm91cCl7dmFyIEk9TDxzLnNsaWRlc1Blckdyb3VwU2tpcC0xPzE6cy5zbGlkZXNQZXJHcm91cDt2b2lkIDAhPT1vW0wrSV0/cD49b1tMXSYmcDxvW0wrSV0mJihrPUwsJD1vW0wrSV0tb1tMXSk6cD49b1tMXSYmKGs9TCwkPW9bby5sZW5ndGgtMV0tb1tvLmxlbmd0aC0yXSl9dmFyIE89KHAtb1trXSkvJCxEPWs8cy5zbGlkZXNQZXJHcm91cFNraXAtMT8xOnMuc2xpZGVzUGVyR3JvdXA7aWYodT5zLmxvbmdTd2lwZXNNcyl7aWYoIXMubG9uZ1N3aXBlcylyZXR1cm4gdm9pZCB0LnNsaWRlVG8odC5hY3RpdmVJbmRleCk7XCJuZXh0XCI9PT10LnN3aXBlRGlyZWN0aW9uJiYoTz49cy5sb25nU3dpcGVzUmF0aW8/dC5zbGlkZVRvKGsrRCk6dC5zbGlkZVRvKGspKSxcInByZXZcIj09PXQuc3dpcGVEaXJlY3Rpb24mJihPPjEtcy5sb25nU3dpcGVzUmF0aW8/dC5zbGlkZVRvKGsrRCk6dC5zbGlkZVRvKGspKX1lbHNle2lmKCFzLnNob3J0U3dpcGVzKXJldHVybiB2b2lkIHQuc2xpZGVUbyh0LmFjdGl2ZUluZGV4KTt0Lm5hdmlnYXRpb24mJihoLnRhcmdldD09PXQubmF2aWdhdGlvbi5uZXh0RWx8fGgudGFyZ2V0PT09dC5uYXZpZ2F0aW9uLnByZXZFbCk/aC50YXJnZXQ9PT10Lm5hdmlnYXRpb24ubmV4dEVsP3Quc2xpZGVUbyhrK0QpOnQuc2xpZGVUbyhrKTooXCJuZXh0XCI9PT10LnN3aXBlRGlyZWN0aW9uJiZ0LnNsaWRlVG8oaytEKSxcInByZXZcIj09PXQuc3dpcGVEaXJlY3Rpb24mJnQuc2xpZGVUbyhrKSl9fX1mdW5jdGlvbiBOKCl7dmFyIGU9dGhpcy5wYXJhbXMsdD10aGlzLmVsO2lmKCF0fHwwIT09dC5vZmZzZXRXaWR0aCl7ZS5icmVha3BvaW50cyYmdGhpcy5zZXRCcmVha3BvaW50KCk7dmFyIGk9dGhpcy5hbGxvd1NsaWRlTmV4dCxzPXRoaXMuYWxsb3dTbGlkZVByZXYsYT10aGlzLnNuYXBHcmlkO3RoaXMuYWxsb3dTbGlkZU5leHQ9ITAsdGhpcy5hbGxvd1NsaWRlUHJldj0hMCx0aGlzLnVwZGF0ZVNpemUoKSx0aGlzLnVwZGF0ZVNsaWRlcygpLHRoaXMudXBkYXRlU2xpZGVzQ2xhc3NlcygpLChcImF1dG9cIj09PWUuc2xpZGVzUGVyVmlld3x8ZS5zbGlkZXNQZXJWaWV3PjEpJiZ0aGlzLmlzRW5kJiYhdGhpcy5wYXJhbXMuY2VudGVyZWRTbGlkZXM/dGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVzLmxlbmd0aC0xLDAsITEsITApOnRoaXMuc2xpZGVUbyh0aGlzLmFjdGl2ZUluZGV4LDAsITEsITApLHRoaXMuYXV0b3BsYXkmJnRoaXMuYXV0b3BsYXkucnVubmluZyYmdGhpcy5hdXRvcGxheS5wYXVzZWQmJnRoaXMuYXV0b3BsYXkucnVuKCksdGhpcy5hbGxvd1NsaWRlUHJldj1zLHRoaXMuYWxsb3dTbGlkZU5leHQ9aSx0aGlzLnBhcmFtcy53YXRjaE92ZXJmbG93JiZhIT09dGhpcy5zbmFwR3JpZCYmdGhpcy5jaGVja092ZXJmbG93KCl9fWZ1bmN0aW9uIFgoZSl7dGhpcy5hbGxvd0NsaWNrfHwodGhpcy5wYXJhbXMucHJldmVudENsaWNrcyYmZS5wcmV2ZW50RGVmYXVsdCgpLHRoaXMucGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbiYmdGhpcy5hbmltYXRpbmcmJihlLnN0b3BQcm9wYWdhdGlvbigpLGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkpKX1mdW5jdGlvbiBWKCl7dmFyIGU9dGhpcy53cmFwcGVyRWwsdD10aGlzLnJ0bFRyYW5zbGF0ZTt0aGlzLnByZXZpb3VzVHJhbnNsYXRlPXRoaXMudHJhbnNsYXRlLHRoaXMuaXNIb3Jpem9udGFsKCk/dGhpcy50cmFuc2xhdGU9dD9lLnNjcm9sbFdpZHRoLWUub2Zmc2V0V2lkdGgtZS5zY3JvbGxMZWZ0Oi1lLnNjcm9sbExlZnQ6dGhpcy50cmFuc2xhdGU9LWUuc2Nyb2xsVG9wLC0wPT09dGhpcy50cmFuc2xhdGUmJih0aGlzLnRyYW5zbGF0ZT0wKSx0aGlzLnVwZGF0ZUFjdGl2ZUluZGV4KCksdGhpcy51cGRhdGVTbGlkZXNDbGFzc2VzKCk7dmFyIGk9dGhpcy5tYXhUcmFuc2xhdGUoKS10aGlzLm1pblRyYW5zbGF0ZSgpOygwPT09aT8wOih0aGlzLnRyYW5zbGF0ZS10aGlzLm1pblRyYW5zbGF0ZSgpKS9pKSE9PXRoaXMucHJvZ3Jlc3MmJnRoaXMudXBkYXRlUHJvZ3Jlc3ModD8tdGhpcy50cmFuc2xhdGU6dGhpcy50cmFuc2xhdGUpLHRoaXMuZW1pdChcInNldFRyYW5zbGF0ZVwiLHRoaXMudHJhbnNsYXRlLCExKX12YXIgWT0hMTtmdW5jdGlvbiBGKCl7fXZhciBXPXtpbml0OiEwLGRpcmVjdGlvbjpcImhvcml6b250YWxcIix0b3VjaEV2ZW50c1RhcmdldDpcImNvbnRhaW5lclwiLGluaXRpYWxTbGlkZTowLHNwZWVkOjMwMCxjc3NNb2RlOiExLHVwZGF0ZU9uV2luZG93UmVzaXplOiEwLHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjohMSxlZGdlU3dpcGVEZXRlY3Rpb246ITEsZWRnZVN3aXBlVGhyZXNob2xkOjIwLGZyZWVNb2RlOiExLGZyZWVNb2RlTW9tZW50dW06ITAsZnJlZU1vZGVNb21lbnR1bVJhdGlvOjEsZnJlZU1vZGVNb21lbnR1bUJvdW5jZTohMCxmcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW86MSxmcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbzoxLGZyZWVNb2RlU3RpY2t5OiExLGZyZWVNb2RlTWluaW11bVZlbG9jaXR5Oi4wMixhdXRvSGVpZ2h0OiExLHNldFdyYXBwZXJTaXplOiExLHZpcnR1YWxUcmFuc2xhdGU6ITEsZWZmZWN0Olwic2xpZGVcIixicmVha3BvaW50czp2b2lkIDAsc3BhY2VCZXR3ZWVuOjAsc2xpZGVzUGVyVmlldzoxLHNsaWRlc1BlckNvbHVtbjoxLHNsaWRlc1BlckNvbHVtbkZpbGw6XCJjb2x1bW5cIixzbGlkZXNQZXJHcm91cDoxLHNsaWRlc1Blckdyb3VwU2tpcDowLGNlbnRlcmVkU2xpZGVzOiExLGNlbnRlcmVkU2xpZGVzQm91bmRzOiExLHNsaWRlc09mZnNldEJlZm9yZTowLHNsaWRlc09mZnNldEFmdGVyOjAsbm9ybWFsaXplU2xpZGVJbmRleDohMCxjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXM6ITEsd2F0Y2hPdmVyZmxvdzohMSxyb3VuZExlbmd0aHM6ITEsdG91Y2hSYXRpbzoxLHRvdWNoQW5nbGU6NDUsc2ltdWxhdGVUb3VjaDohMCxzaG9ydFN3aXBlczohMCxsb25nU3dpcGVzOiEwLGxvbmdTd2lwZXNSYXRpbzouNSxsb25nU3dpcGVzTXM6MzAwLGZvbGxvd0ZpbmdlcjohMCxhbGxvd1RvdWNoTW92ZTohMCx0aHJlc2hvbGQ6MCx0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246ITEsdG91Y2hTdGFydFByZXZlbnREZWZhdWx0OiEwLHRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0OiExLHRvdWNoUmVsZWFzZU9uRWRnZXM6ITEsdW5pcXVlTmF2RWxlbWVudHM6ITAscmVzaXN0YW5jZTohMCxyZXNpc3RhbmNlUmF0aW86Ljg1LHdhdGNoU2xpZGVzUHJvZ3Jlc3M6ITEsd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiExLGdyYWJDdXJzb3I6ITEscHJldmVudENsaWNrczohMCxwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb246ITAsc2xpZGVUb0NsaWNrZWRTbGlkZTohMSxwcmVsb2FkSW1hZ2VzOiEwLHVwZGF0ZU9uSW1hZ2VzUmVhZHk6ITAsbG9vcDohMSxsb29wQWRkaXRpb25hbFNsaWRlczowLGxvb3BlZFNsaWRlczpudWxsLGxvb3BGaWxsR3JvdXBXaXRoQmxhbms6ITEsYWxsb3dTbGlkZVByZXY6ITAsYWxsb3dTbGlkZU5leHQ6ITAsc3dpcGVIYW5kbGVyOm51bGwsbm9Td2lwaW5nOiEwLG5vU3dpcGluZ0NsYXNzOlwic3dpcGVyLW5vLXN3aXBpbmdcIixub1N3aXBpbmdTZWxlY3RvcjpudWxsLHBhc3NpdmVMaXN0ZW5lcnM6ITAsY29udGFpbmVyTW9kaWZpZXJDbGFzczpcInN3aXBlci1jb250YWluZXItXCIsc2xpZGVDbGFzczpcInN3aXBlci1zbGlkZVwiLHNsaWRlQmxhbmtDbGFzczpcInN3aXBlci1zbGlkZS1pbnZpc2libGUtYmxhbmtcIixzbGlkZUFjdGl2ZUNsYXNzOlwic3dpcGVyLXNsaWRlLWFjdGl2ZVwiLHNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3M6XCJzd2lwZXItc2xpZGUtZHVwbGljYXRlLWFjdGl2ZVwiLHNsaWRlVmlzaWJsZUNsYXNzOlwic3dpcGVyLXNsaWRlLXZpc2libGVcIixzbGlkZUR1cGxpY2F0ZUNsYXNzOlwic3dpcGVyLXNsaWRlLWR1cGxpY2F0ZVwiLHNsaWRlTmV4dENsYXNzOlwic3dpcGVyLXNsaWRlLW5leHRcIixzbGlkZUR1cGxpY2F0ZU5leHRDbGFzczpcInN3aXBlci1zbGlkZS1kdXBsaWNhdGUtbmV4dFwiLHNsaWRlUHJldkNsYXNzOlwic3dpcGVyLXNsaWRlLXByZXZcIixzbGlkZUR1cGxpY2F0ZVByZXZDbGFzczpcInN3aXBlci1zbGlkZS1kdXBsaWNhdGUtcHJldlwiLHdyYXBwZXJDbGFzczpcInN3aXBlci13cmFwcGVyXCIscnVuQ2FsbGJhY2tzT25Jbml0OiEwfSxSPXt1cGRhdGU6dSx0cmFuc2xhdGU6dix0cmFuc2l0aW9uOmYsc2xpZGU6bSxsb29wOmcsZ3JhYkN1cnNvcjpiLG1hbmlwdWxhdGlvbjpELGV2ZW50czp7YXR0YWNoRXZlbnRzOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wYXJhbXMsdD10aGlzLnRvdWNoRXZlbnRzLHM9dGhpcy5lbCxhPXRoaXMud3JhcHBlckVsO3RoaXMub25Ub3VjaFN0YXJ0PUcuYmluZCh0aGlzKSx0aGlzLm9uVG91Y2hNb3ZlPUguYmluZCh0aGlzKSx0aGlzLm9uVG91Y2hFbmQ9Qi5iaW5kKHRoaXMpLGUuY3NzTW9kZSYmKHRoaXMub25TY3JvbGw9Vi5iaW5kKHRoaXMpKSx0aGlzLm9uQ2xpY2s9WC5iaW5kKHRoaXMpO3ZhciByPSEhZS5uZXN0ZWQ7aWYoIWgudG91Y2gmJmgucG9pbnRlckV2ZW50cylzLmFkZEV2ZW50TGlzdGVuZXIodC5zdGFydCx0aGlzLm9uVG91Y2hTdGFydCwhMSksaS5hZGRFdmVudExpc3RlbmVyKHQubW92ZSx0aGlzLm9uVG91Y2hNb3ZlLHIpLGkuYWRkRXZlbnRMaXN0ZW5lcih0LmVuZCx0aGlzLm9uVG91Y2hFbmQsITEpO2Vsc2V7aWYoaC50b3VjaCl7dmFyIG49IShcInRvdWNoc3RhcnRcIiE9PXQuc3RhcnR8fCFoLnBhc3NpdmVMaXN0ZW5lcnx8IWUucGFzc2l2ZUxpc3RlbmVycykmJntwYXNzaXZlOiEwLGNhcHR1cmU6ITF9O3MuYWRkRXZlbnRMaXN0ZW5lcih0LnN0YXJ0LHRoaXMub25Ub3VjaFN0YXJ0LG4pLHMuYWRkRXZlbnRMaXN0ZW5lcih0Lm1vdmUsdGhpcy5vblRvdWNoTW92ZSxoLnBhc3NpdmVMaXN0ZW5lcj97cGFzc2l2ZTohMSxjYXB0dXJlOnJ9OnIpLHMuYWRkRXZlbnRMaXN0ZW5lcih0LmVuZCx0aGlzLm9uVG91Y2hFbmQsbiksdC5jYW5jZWwmJnMuYWRkRXZlbnRMaXN0ZW5lcih0LmNhbmNlbCx0aGlzLm9uVG91Y2hFbmQsbiksWXx8KGkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixGKSxZPSEwKX0oZS5zaW11bGF0ZVRvdWNoJiYhQS5pb3MmJiFBLmFuZHJvaWR8fGUuc2ltdWxhdGVUb3VjaCYmIWgudG91Y2gmJkEuaW9zKSYmKHMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLHRoaXMub25Ub3VjaFN0YXJ0LCExKSxpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLm9uVG91Y2hNb3ZlLHIpLGkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLm9uVG91Y2hFbmQsITEpKX0oZS5wcmV2ZW50Q2xpY2tzfHxlLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikmJnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5vbkNsaWNrLCEwKSxlLmNzc01vZGUmJmEuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpLGUudXBkYXRlT25XaW5kb3dSZXNpemU/dGhpcy5vbihBLmlvc3x8QS5hbmRyb2lkP1wicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlIG9ic2VydmVyVXBkYXRlXCI6XCJyZXNpemUgb2JzZXJ2ZXJVcGRhdGVcIixOLCEwKTp0aGlzLm9uKFwib2JzZXJ2ZXJVcGRhdGVcIixOLCEwKX0sZGV0YWNoRXZlbnRzOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wYXJhbXMsdD10aGlzLnRvdWNoRXZlbnRzLHM9dGhpcy5lbCxhPXRoaXMud3JhcHBlckVsLHI9ISFlLm5lc3RlZDtpZighaC50b3VjaCYmaC5wb2ludGVyRXZlbnRzKXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LnN0YXJ0LHRoaXMub25Ub3VjaFN0YXJ0LCExKSxpLnJlbW92ZUV2ZW50TGlzdGVuZXIodC5tb3ZlLHRoaXMub25Ub3VjaE1vdmUsciksaS5yZW1vdmVFdmVudExpc3RlbmVyKHQuZW5kLHRoaXMub25Ub3VjaEVuZCwhMSk7ZWxzZXtpZihoLnRvdWNoKXt2YXIgbj0hKFwib25Ub3VjaFN0YXJ0XCIhPT10LnN0YXJ0fHwhaC5wYXNzaXZlTGlzdGVuZXJ8fCFlLnBhc3NpdmVMaXN0ZW5lcnMpJiZ7cGFzc2l2ZTohMCxjYXB0dXJlOiExfTtzLnJlbW92ZUV2ZW50TGlzdGVuZXIodC5zdGFydCx0aGlzLm9uVG91Y2hTdGFydCxuKSxzLnJlbW92ZUV2ZW50TGlzdGVuZXIodC5tb3ZlLHRoaXMub25Ub3VjaE1vdmUscikscy5yZW1vdmVFdmVudExpc3RlbmVyKHQuZW5kLHRoaXMub25Ub3VjaEVuZCxuKSx0LmNhbmNlbCYmcy5yZW1vdmVFdmVudExpc3RlbmVyKHQuY2FuY2VsLHRoaXMub25Ub3VjaEVuZCxuKX0oZS5zaW11bGF0ZVRvdWNoJiYhQS5pb3MmJiFBLmFuZHJvaWR8fGUuc2ltdWxhdGVUb3VjaCYmIWgudG91Y2gmJkEuaW9zKSYmKHMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLHRoaXMub25Ub3VjaFN0YXJ0LCExKSxpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLm9uVG91Y2hNb3ZlLHIpLGkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLm9uVG91Y2hFbmQsITEpKX0oZS5wcmV2ZW50Q2xpY2tzfHxlLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikmJnMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5vbkNsaWNrLCEwKSxlLmNzc01vZGUmJmEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpLHRoaXMub2ZmKEEuaW9zfHxBLmFuZHJvaWQ/XCJyZXNpemUgb3JpZW50YXRpb25jaGFuZ2Ugb2JzZXJ2ZXJVcGRhdGVcIjpcInJlc2l6ZSBvYnNlcnZlclVwZGF0ZVwiLE4pfX0sYnJlYWtwb2ludHM6e3NldEJyZWFrcG9pbnQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmFjdGl2ZUluZGV4LHQ9dGhpcy5pbml0aWFsaXplZCxpPXRoaXMubG9vcGVkU2xpZGVzO3ZvaWQgMD09PWkmJihpPTApO3ZhciBzPXRoaXMucGFyYW1zLGE9dGhpcy4kZWwscj1zLmJyZWFrcG9pbnRzO2lmKHImJighcnx8MCE9PU9iamVjdC5rZXlzKHIpLmxlbmd0aCkpe3ZhciBuPXRoaXMuZ2V0QnJlYWtwb2ludChyKTtpZihuJiZ0aGlzLmN1cnJlbnRCcmVha3BvaW50IT09bil7dmFyIG89biBpbiByP3Jbbl06dm9pZCAwO28mJltcInNsaWRlc1BlclZpZXdcIixcInNwYWNlQmV0d2VlblwiLFwic2xpZGVzUGVyR3JvdXBcIixcInNsaWRlc1Blckdyb3VwU2tpcFwiLFwic2xpZGVzUGVyQ29sdW1uXCJdLmZvckVhY2goKGZ1bmN0aW9uKGUpe3ZhciB0PW9bZV07dm9pZCAwIT09dCYmKG9bZV09XCJzbGlkZXNQZXJWaWV3XCIhPT1lfHxcIkFVVE9cIiE9PXQmJlwiYXV0b1wiIT09dD9cInNsaWRlc1BlclZpZXdcIj09PWU/cGFyc2VGbG9hdCh0KTpwYXJzZUludCh0LDEwKTpcImF1dG9cIil9KSk7dmFyIGw9b3x8dGhpcy5vcmlnaW5hbFBhcmFtcyxoPXMuc2xpZGVzUGVyQ29sdW1uPjEscD1sLnNsaWRlc1BlckNvbHVtbj4xO2gmJiFwP2EucmVtb3ZlQ2xhc3Mocy5jb250YWluZXJNb2RpZmllckNsYXNzK1wibXVsdGlyb3cgXCIrcy5jb250YWluZXJNb2RpZmllckNsYXNzK1wibXVsdGlyb3ctY29sdW1uXCIpOiFoJiZwJiYoYS5hZGRDbGFzcyhzLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MrXCJtdWx0aXJvd1wiKSxcImNvbHVtblwiPT09bC5zbGlkZXNQZXJDb2x1bW5GaWxsJiZhLmFkZENsYXNzKHMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcIm11bHRpcm93LWNvbHVtblwiKSk7dmFyIGM9bC5kaXJlY3Rpb24mJmwuZGlyZWN0aW9uIT09cy5kaXJlY3Rpb24sdT1zLmxvb3AmJihsLnNsaWRlc1BlclZpZXchPT1zLnNsaWRlc1BlclZpZXd8fGMpO2MmJnQmJnRoaXMuY2hhbmdlRGlyZWN0aW9uKCksZC5leHRlbmQodGhpcy5wYXJhbXMsbCksZC5leHRlbmQodGhpcyx7YWxsb3dUb3VjaE1vdmU6dGhpcy5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsYWxsb3dTbGlkZU5leHQ6dGhpcy5wYXJhbXMuYWxsb3dTbGlkZU5leHQsYWxsb3dTbGlkZVByZXY6dGhpcy5wYXJhbXMuYWxsb3dTbGlkZVByZXZ9KSx0aGlzLmN1cnJlbnRCcmVha3BvaW50PW4sdSYmdCYmKHRoaXMubG9vcERlc3Ryb3koKSx0aGlzLmxvb3BDcmVhdGUoKSx0aGlzLnVwZGF0ZVNsaWRlcygpLHRoaXMuc2xpZGVUbyhlLWkrdGhpcy5sb29wZWRTbGlkZXMsMCwhMSkpLHRoaXMuZW1pdChcImJyZWFrcG9pbnRcIixsKX19fSxnZXRCcmVha3BvaW50OmZ1bmN0aW9uKGUpe2lmKGUpe3ZhciB0PSExLGk9T2JqZWN0LmtleXMoZSkubWFwKChmdW5jdGlvbihlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZSYmMD09PWUuaW5kZXhPZihcIkBcIikpe3ZhciB0PXBhcnNlRmxvYXQoZS5zdWJzdHIoMSkpO3JldHVybnt2YWx1ZTphLmlubmVySGVpZ2h0KnQscG9pbnQ6ZX19cmV0dXJue3ZhbHVlOmUscG9pbnQ6ZX19KSk7aS5zb3J0KChmdW5jdGlvbihlLHQpe3JldHVybiBwYXJzZUludChlLnZhbHVlLDEwKS1wYXJzZUludCh0LnZhbHVlLDEwKX0pKTtmb3IodmFyIHM9MDtzPGkubGVuZ3RoO3MrPTEpe3ZhciByPWlbc10sbj1yLnBvaW50O3IudmFsdWU8PWEuaW5uZXJXaWR0aCYmKHQ9bil9cmV0dXJuIHR8fFwibWF4XCJ9fX0sY2hlY2tPdmVyZmxvdzp7Y2hlY2tPdmVyZmxvdzpmdW5jdGlvbigpe3ZhciBlPXRoaXMucGFyYW1zLHQ9dGhpcy5pc0xvY2tlZCxpPXRoaXMuc2xpZGVzLmxlbmd0aD4wJiZlLnNsaWRlc09mZnNldEJlZm9yZStlLnNwYWNlQmV0d2VlbioodGhpcy5zbGlkZXMubGVuZ3RoLTEpK3RoaXMuc2xpZGVzWzBdLm9mZnNldFdpZHRoKnRoaXMuc2xpZGVzLmxlbmd0aDtlLnNsaWRlc09mZnNldEJlZm9yZSYmZS5zbGlkZXNPZmZzZXRBZnRlciYmaT90aGlzLmlzTG9ja2VkPWk8PXRoaXMuc2l6ZTp0aGlzLmlzTG9ja2VkPTE9PT10aGlzLnNuYXBHcmlkLmxlbmd0aCx0aGlzLmFsbG93U2xpZGVOZXh0PSF0aGlzLmlzTG9ja2VkLHRoaXMuYWxsb3dTbGlkZVByZXY9IXRoaXMuaXNMb2NrZWQsdCE9PXRoaXMuaXNMb2NrZWQmJnRoaXMuZW1pdCh0aGlzLmlzTG9ja2VkP1wibG9ja1wiOlwidW5sb2NrXCIpLHQmJnQhPT10aGlzLmlzTG9ja2VkJiYodGhpcy5pc0VuZD0hMSx0aGlzLm5hdmlnYXRpb24udXBkYXRlKCkpfX0sY2xhc3Nlczp7YWRkQ2xhc3NlczpmdW5jdGlvbigpe3ZhciBlPXRoaXMuY2xhc3NOYW1lcyx0PXRoaXMucGFyYW1zLGk9dGhpcy5ydGwscz10aGlzLiRlbCxhPVtdO2EucHVzaChcImluaXRpYWxpemVkXCIpLGEucHVzaCh0LmRpcmVjdGlvbiksdC5mcmVlTW9kZSYmYS5wdXNoKFwiZnJlZS1tb2RlXCIpLHQuYXV0b0hlaWdodCYmYS5wdXNoKFwiYXV0b2hlaWdodFwiKSxpJiZhLnB1c2goXCJydGxcIiksdC5zbGlkZXNQZXJDb2x1bW4+MSYmKGEucHVzaChcIm11bHRpcm93XCIpLFwiY29sdW1uXCI9PT10LnNsaWRlc1BlckNvbHVtbkZpbGwmJmEucHVzaChcIm11bHRpcm93LWNvbHVtblwiKSksQS5hbmRyb2lkJiZhLnB1c2goXCJhbmRyb2lkXCIpLEEuaW9zJiZhLnB1c2goXCJpb3NcIiksdC5jc3NNb2RlJiZhLnB1c2goXCJjc3MtbW9kZVwiKSxhLmZvckVhY2goKGZ1bmN0aW9uKGkpe2UucHVzaCh0LmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MraSl9KSkscy5hZGRDbGFzcyhlLmpvaW4oXCIgXCIpKX0scmVtb3ZlQ2xhc3NlczpmdW5jdGlvbigpe3ZhciBlPXRoaXMuJGVsLHQ9dGhpcy5jbGFzc05hbWVzO2UucmVtb3ZlQ2xhc3ModC5qb2luKFwiIFwiKSl9fSxpbWFnZXM6e2xvYWRJbWFnZTpmdW5jdGlvbihlLHQsaSxzLHIsbyl7dmFyIGw7ZnVuY3Rpb24gZCgpe28mJm8oKX1uKGUpLnBhcmVudChcInBpY3R1cmVcIilbMF18fGUuY29tcGxldGUmJnI/ZCgpOnQ/KChsPW5ldyBhLkltYWdlKS5vbmxvYWQ9ZCxsLm9uZXJyb3I9ZCxzJiYobC5zaXplcz1zKSxpJiYobC5zcmNzZXQ9aSksdCYmKGwuc3JjPXQpKTpkKCl9LHByZWxvYWRJbWFnZXM6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2Z1bmN0aW9uIHQoKXtudWxsIT1lJiZlJiYhZS5kZXN0cm95ZWQmJih2b2lkIDAhPT1lLmltYWdlc0xvYWRlZCYmKGUuaW1hZ2VzTG9hZGVkKz0xKSxlLmltYWdlc0xvYWRlZD09PWUuaW1hZ2VzVG9Mb2FkLmxlbmd0aCYmKGUucGFyYW1zLnVwZGF0ZU9uSW1hZ2VzUmVhZHkmJmUudXBkYXRlKCksZS5lbWl0KFwiaW1hZ2VzUmVhZHlcIikpKX1lLmltYWdlc1RvTG9hZD1lLiRlbC5maW5kKFwiaW1nXCIpO2Zvcih2YXIgaT0wO2k8ZS5pbWFnZXNUb0xvYWQubGVuZ3RoO2krPTEpe3ZhciBzPWUuaW1hZ2VzVG9Mb2FkW2ldO2UubG9hZEltYWdlKHMscy5jdXJyZW50U3JjfHxzLmdldEF0dHJpYnV0ZShcInNyY1wiKSxzLnNyY3NldHx8cy5nZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIikscy5zaXplc3x8cy5nZXRBdHRyaWJ1dGUoXCJzaXplc1wiKSwhMCx0KX19fX0scT17fSxqPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoKXtmb3IodmFyIGkscyxhLHI9W10sbz1hcmd1bWVudHMubGVuZ3RoO28tLTspcltvXT1hcmd1bWVudHNbb107MT09PXIubGVuZ3RoJiZyWzBdLmNvbnN0cnVjdG9yJiZyWzBdLmNvbnN0cnVjdG9yPT09T2JqZWN0P2E9clswXToocz0oaT1yKVswXSxhPWlbMV0pLGF8fChhPXt9KSxhPWQuZXh0ZW5kKHt9LGEpLHMmJiFhLmVsJiYoYS5lbD1zKSxlLmNhbGwodGhpcyxhKSxPYmplY3Qua2V5cyhSKS5mb3JFYWNoKChmdW5jdGlvbihlKXtPYmplY3Qua2V5cyhSW2VdKS5mb3JFYWNoKChmdW5jdGlvbihpKXt0LnByb3RvdHlwZVtpXXx8KHQucHJvdG90eXBlW2ldPVJbZV1baV0pfSkpfSkpO3ZhciBsPXRoaXM7dm9pZCAwPT09bC5tb2R1bGVzJiYobC5tb2R1bGVzPXt9KSxPYmplY3Qua2V5cyhsLm1vZHVsZXMpLmZvckVhY2goKGZ1bmN0aW9uKGUpe3ZhciB0PWwubW9kdWxlc1tlXTtpZih0LnBhcmFtcyl7dmFyIGk9T2JqZWN0LmtleXModC5wYXJhbXMpWzBdLHM9dC5wYXJhbXNbaV07aWYoXCJvYmplY3RcIiE9dHlwZW9mIHN8fG51bGw9PT1zKXJldHVybjtpZighKGkgaW4gYSl8fCEoXCJlbmFibGVkXCJpbiBzKSlyZXR1cm47ITA9PT1hW2ldJiYoYVtpXT17ZW5hYmxlZDohMH0pLFwib2JqZWN0XCIhPXR5cGVvZiBhW2ldfHxcImVuYWJsZWRcImluIGFbaV18fChhW2ldLmVuYWJsZWQ9ITApLGFbaV18fChhW2ldPXtlbmFibGVkOiExfSl9fSkpO3ZhciBwPWQuZXh0ZW5kKHt9LFcpO2wudXNlTW9kdWxlc1BhcmFtcyhwKSxsLnBhcmFtcz1kLmV4dGVuZCh7fSxwLHEsYSksbC5vcmlnaW5hbFBhcmFtcz1kLmV4dGVuZCh7fSxsLnBhcmFtcyksbC5wYXNzZWRQYXJhbXM9ZC5leHRlbmQoe30sYSksbC4kPW47dmFyIGM9bihsLnBhcmFtcy5lbCk7aWYocz1jWzBdKXtpZihjLmxlbmd0aD4xKXt2YXIgdT1bXTtyZXR1cm4gYy5lYWNoKChmdW5jdGlvbihlLGkpe3ZhciBzPWQuZXh0ZW5kKHt9LGEse2VsOml9KTt1LnB1c2gobmV3IHQocykpfSkpLHV9dmFyIHYsZixtO3JldHVybiBzLnN3aXBlcj1sLGMuZGF0YShcInN3aXBlclwiLGwpLHMmJnMuc2hhZG93Um9vdCYmcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3I/KHY9bihzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5cIitsLnBhcmFtcy53cmFwcGVyQ2xhc3MpKSkuY2hpbGRyZW49ZnVuY3Rpb24oZSl7cmV0dXJuIGMuY2hpbGRyZW4oZSl9OnY9Yy5jaGlsZHJlbihcIi5cIitsLnBhcmFtcy53cmFwcGVyQ2xhc3MpLGQuZXh0ZW5kKGwseyRlbDpjLGVsOnMsJHdyYXBwZXJFbDp2LHdyYXBwZXJFbDp2WzBdLGNsYXNzTmFtZXM6W10sc2xpZGVzOm4oKSxzbGlkZXNHcmlkOltdLHNuYXBHcmlkOltdLHNsaWRlc1NpemVzR3JpZDpbXSxpc0hvcml6b250YWw6ZnVuY3Rpb24oKXtyZXR1cm5cImhvcml6b250YWxcIj09PWwucGFyYW1zLmRpcmVjdGlvbn0saXNWZXJ0aWNhbDpmdW5jdGlvbigpe3JldHVyblwidmVydGljYWxcIj09PWwucGFyYW1zLmRpcmVjdGlvbn0scnRsOlwicnRsXCI9PT1zLmRpci50b0xvd2VyQ2FzZSgpfHxcInJ0bFwiPT09Yy5jc3MoXCJkaXJlY3Rpb25cIikscnRsVHJhbnNsYXRlOlwiaG9yaXpvbnRhbFwiPT09bC5wYXJhbXMuZGlyZWN0aW9uJiYoXCJydGxcIj09PXMuZGlyLnRvTG93ZXJDYXNlKCl8fFwicnRsXCI9PT1jLmNzcyhcImRpcmVjdGlvblwiKSksd3JvbmdSVEw6XCItd2Via2l0LWJveFwiPT09di5jc3MoXCJkaXNwbGF5XCIpLGFjdGl2ZUluZGV4OjAscmVhbEluZGV4OjAsaXNCZWdpbm5pbmc6ITAsaXNFbmQ6ITEsdHJhbnNsYXRlOjAscHJldmlvdXNUcmFuc2xhdGU6MCxwcm9ncmVzczowLHZlbG9jaXR5OjAsYW5pbWF0aW5nOiExLGFsbG93U2xpZGVOZXh0OmwucGFyYW1zLmFsbG93U2xpZGVOZXh0LGFsbG93U2xpZGVQcmV2OmwucGFyYW1zLmFsbG93U2xpZGVQcmV2LHRvdWNoRXZlbnRzOihmPVtcInRvdWNoc3RhcnRcIixcInRvdWNobW92ZVwiLFwidG91Y2hlbmRcIixcInRvdWNoY2FuY2VsXCJdLG09W1wibW91c2Vkb3duXCIsXCJtb3VzZW1vdmVcIixcIm1vdXNldXBcIl0saC5wb2ludGVyRXZlbnRzJiYobT1bXCJwb2ludGVyZG93blwiLFwicG9pbnRlcm1vdmVcIixcInBvaW50ZXJ1cFwiXSksbC50b3VjaEV2ZW50c1RvdWNoPXtzdGFydDpmWzBdLG1vdmU6ZlsxXSxlbmQ6ZlsyXSxjYW5jZWw6ZlszXX0sbC50b3VjaEV2ZW50c0Rlc2t0b3A9e3N0YXJ0Om1bMF0sbW92ZTptWzFdLGVuZDptWzJdfSxoLnRvdWNofHwhbC5wYXJhbXMuc2ltdWxhdGVUb3VjaD9sLnRvdWNoRXZlbnRzVG91Y2g6bC50b3VjaEV2ZW50c0Rlc2t0b3ApLHRvdWNoRXZlbnRzRGF0YTp7aXNUb3VjaGVkOnZvaWQgMCxpc01vdmVkOnZvaWQgMCxhbGxvd1RvdWNoQ2FsbGJhY2tzOnZvaWQgMCx0b3VjaFN0YXJ0VGltZTp2b2lkIDAsaXNTY3JvbGxpbmc6dm9pZCAwLGN1cnJlbnRUcmFuc2xhdGU6dm9pZCAwLHN0YXJ0VHJhbnNsYXRlOnZvaWQgMCxhbGxvd1RocmVzaG9sZE1vdmU6dm9pZCAwLGZvcm1FbGVtZW50czpcImlucHV0LCBzZWxlY3QsIG9wdGlvbiwgdGV4dGFyZWEsIGJ1dHRvbiwgdmlkZW8sIGxhYmVsXCIsbGFzdENsaWNrVGltZTpkLm5vdygpLGNsaWNrVGltZW91dDp2b2lkIDAsdmVsb2NpdGllczpbXSxhbGxvd01vbWVudHVtQm91bmNlOnZvaWQgMCxpc1RvdWNoRXZlbnQ6dm9pZCAwLHN0YXJ0TW92aW5nOnZvaWQgMH0sYWxsb3dDbGljazohMCxhbGxvd1RvdWNoTW92ZTpsLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSx0b3VjaGVzOntzdGFydFg6MCxzdGFydFk6MCxjdXJyZW50WDowLGN1cnJlbnRZOjAsZGlmZjowfSxpbWFnZXNUb0xvYWQ6W10saW1hZ2VzTG9hZGVkOjB9KSxsLnVzZU1vZHVsZXMoKSxsLnBhcmFtcy5pbml0JiZsLmluaXQoKSxsfX1lJiYodC5fX3Byb3RvX189ZSksdC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShlJiZlLnByb3RvdHlwZSksdC5wcm90b3R5cGUuY29uc3RydWN0b3I9dDt2YXIgaT17ZXh0ZW5kZWREZWZhdWx0czp7Y29uZmlndXJhYmxlOiEwfSxkZWZhdWx0czp7Y29uZmlndXJhYmxlOiEwfSxDbGFzczp7Y29uZmlndXJhYmxlOiEwfSwkOntjb25maWd1cmFibGU6ITB9fTtyZXR1cm4gdC5wcm90b3R5cGUuc2xpZGVzUGVyVmlld0R5bmFtaWM9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnBhcmFtcyx0PXRoaXMuc2xpZGVzLGk9dGhpcy5zbGlkZXNHcmlkLHM9dGhpcy5zaXplLGE9dGhpcy5hY3RpdmVJbmRleCxyPTE7aWYoZS5jZW50ZXJlZFNsaWRlcyl7Zm9yKHZhciBuLG89dFthXS5zd2lwZXJTbGlkZVNpemUsbD1hKzE7bDx0Lmxlbmd0aDtsKz0xKXRbbF0mJiFuJiYocis9MSwobys9dFtsXS5zd2lwZXJTbGlkZVNpemUpPnMmJihuPSEwKSk7Zm9yKHZhciBkPWEtMTtkPj0wO2QtPTEpdFtkXSYmIW4mJihyKz0xLChvKz10W2RdLnN3aXBlclNsaWRlU2l6ZSk+cyYmKG49ITApKX1lbHNlIGZvcih2YXIgaD1hKzE7aDx0Lmxlbmd0aDtoKz0xKWlbaF0taVthXTxzJiYocis9MSk7cmV0dXJuIHJ9LHQucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYoZSYmIWUuZGVzdHJveWVkKXt2YXIgdD1lLnNuYXBHcmlkLGk9ZS5wYXJhbXM7aS5icmVha3BvaW50cyYmZS5zZXRCcmVha3BvaW50KCksZS51cGRhdGVTaXplKCksZS51cGRhdGVTbGlkZXMoKSxlLnVwZGF0ZVByb2dyZXNzKCksZS51cGRhdGVTbGlkZXNDbGFzc2VzKCksZS5wYXJhbXMuZnJlZU1vZGU/KHMoKSxlLnBhcmFtcy5hdXRvSGVpZ2h0JiZlLnVwZGF0ZUF1dG9IZWlnaHQoKSk6KChcImF1dG9cIj09PWUucGFyYW1zLnNsaWRlc1BlclZpZXd8fGUucGFyYW1zLnNsaWRlc1BlclZpZXc+MSkmJmUuaXNFbmQmJiFlLnBhcmFtcy5jZW50ZXJlZFNsaWRlcz9lLnNsaWRlVG8oZS5zbGlkZXMubGVuZ3RoLTEsMCwhMSwhMCk6ZS5zbGlkZVRvKGUuYWN0aXZlSW5kZXgsMCwhMSwhMCkpfHxzKCksaS53YXRjaE92ZXJmbG93JiZ0IT09ZS5zbmFwR3JpZCYmZS5jaGVja092ZXJmbG93KCksZS5lbWl0KFwidXBkYXRlXCIpfWZ1bmN0aW9uIHMoKXt2YXIgdD1lLnJ0bFRyYW5zbGF0ZT8tMSplLnRyYW5zbGF0ZTplLnRyYW5zbGF0ZSxpPU1hdGgubWluKE1hdGgubWF4KHQsZS5tYXhUcmFuc2xhdGUoKSksZS5taW5UcmFuc2xhdGUoKSk7ZS5zZXRUcmFuc2xhdGUoaSksZS51cGRhdGVBY3RpdmVJbmRleCgpLGUudXBkYXRlU2xpZGVzQ2xhc3NlcygpfX0sdC5wcm90b3R5cGUuY2hhbmdlRGlyZWN0aW9uPWZ1bmN0aW9uKGUsdCl7dm9pZCAwPT09dCYmKHQ9ITApO3ZhciBpPXRoaXMucGFyYW1zLmRpcmVjdGlvbjtyZXR1cm4gZXx8KGU9XCJob3Jpem9udGFsXCI9PT1pP1widmVydGljYWxcIjpcImhvcml6b250YWxcIiksZT09PWl8fFwiaG9yaXpvbnRhbFwiIT09ZSYmXCJ2ZXJ0aWNhbFwiIT09ZXx8KHRoaXMuJGVsLnJlbW92ZUNsYXNzKFwiXCIrdGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytpKS5hZGRDbGFzcyhcIlwiK3RoaXMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MrZSksdGhpcy5wYXJhbXMuZGlyZWN0aW9uPWUsdGhpcy5zbGlkZXMuZWFjaCgoZnVuY3Rpb24odCxpKXtcInZlcnRpY2FsXCI9PT1lP2kuc3R5bGUud2lkdGg9XCJcIjppLnN0eWxlLmhlaWdodD1cIlwifSkpLHRoaXMuZW1pdChcImNoYW5nZURpcmVjdGlvblwiKSx0JiZ0aGlzLnVwZGF0ZSgpKSx0aGlzfSx0LnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7dGhpcy5pbml0aWFsaXplZHx8KHRoaXMuZW1pdChcImJlZm9yZUluaXRcIiksdGhpcy5wYXJhbXMuYnJlYWtwb2ludHMmJnRoaXMuc2V0QnJlYWtwb2ludCgpLHRoaXMuYWRkQ2xhc3NlcygpLHRoaXMucGFyYW1zLmxvb3AmJnRoaXMubG9vcENyZWF0ZSgpLHRoaXMudXBkYXRlU2l6ZSgpLHRoaXMudXBkYXRlU2xpZGVzKCksdGhpcy5wYXJhbXMud2F0Y2hPdmVyZmxvdyYmdGhpcy5jaGVja092ZXJmbG93KCksdGhpcy5wYXJhbXMuZ3JhYkN1cnNvciYmdGhpcy5zZXRHcmFiQ3Vyc29yKCksdGhpcy5wYXJhbXMucHJlbG9hZEltYWdlcyYmdGhpcy5wcmVsb2FkSW1hZ2VzKCksdGhpcy5wYXJhbXMubG9vcD90aGlzLnNsaWRlVG8odGhpcy5wYXJhbXMuaW5pdGlhbFNsaWRlK3RoaXMubG9vcGVkU2xpZGVzLDAsdGhpcy5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KTp0aGlzLnNsaWRlVG8odGhpcy5wYXJhbXMuaW5pdGlhbFNsaWRlLDAsdGhpcy5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KSx0aGlzLmF0dGFjaEV2ZW50cygpLHRoaXMuaW5pdGlhbGl6ZWQ9ITAsdGhpcy5lbWl0KFwiaW5pdFwiKSl9LHQucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT1lJiYoZT0hMCksdm9pZCAwPT09dCYmKHQ9ITApO3ZhciBpPXRoaXMscz1pLnBhcmFtcyxhPWkuJGVsLHI9aS4kd3JhcHBlckVsLG49aS5zbGlkZXM7cmV0dXJuIHZvaWQgMD09PWkucGFyYW1zfHxpLmRlc3Ryb3llZHx8KGkuZW1pdChcImJlZm9yZURlc3Ryb3lcIiksaS5pbml0aWFsaXplZD0hMSxpLmRldGFjaEV2ZW50cygpLHMubG9vcCYmaS5sb29wRGVzdHJveSgpLHQmJihpLnJlbW92ZUNsYXNzZXMoKSxhLnJlbW92ZUF0dHIoXCJzdHlsZVwiKSxyLnJlbW92ZUF0dHIoXCJzdHlsZVwiKSxuJiZuLmxlbmd0aCYmbi5yZW1vdmVDbGFzcyhbcy5zbGlkZVZpc2libGVDbGFzcyxzLnNsaWRlQWN0aXZlQ2xhc3Mscy5zbGlkZU5leHRDbGFzcyxzLnNsaWRlUHJldkNsYXNzXS5qb2luKFwiIFwiKSkucmVtb3ZlQXR0cihcInN0eWxlXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSksaS5lbWl0KFwiZGVzdHJveVwiKSxPYmplY3Qua2V5cyhpLmV2ZW50c0xpc3RlbmVycykuZm9yRWFjaCgoZnVuY3Rpb24oZSl7aS5vZmYoZSl9KSksITEhPT1lJiYoaS4kZWxbMF0uc3dpcGVyPW51bGwsaS4kZWwuZGF0YShcInN3aXBlclwiLG51bGwpLGQuZGVsZXRlUHJvcHMoaSkpLGkuZGVzdHJveWVkPSEwKSxudWxsfSx0LmV4dGVuZERlZmF1bHRzPWZ1bmN0aW9uKGUpe2QuZXh0ZW5kKHEsZSl9LGkuZXh0ZW5kZWREZWZhdWx0cy5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gcX0saS5kZWZhdWx0cy5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gV30saS5DbGFzcy5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gZX0saS4kLmdldD1mdW5jdGlvbigpe3JldHVybiBufSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0LGkpLHR9KHApLEs9e25hbWU6XCJkZXZpY2VcIixwcm90bzp7ZGV2aWNlOkF9LHN0YXRpYzp7ZGV2aWNlOkF9fSxVPXtuYW1lOlwic3VwcG9ydFwiLHByb3RvOntzdXBwb3J0Omh9LHN0YXRpYzp7c3VwcG9ydDpofX0sXz17aXNFZGdlOiEhYS5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9FZGdlL2cpLGlzU2FmYXJpOmZ1bmN0aW9uKCl7dmFyIGU9YS5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7cmV0dXJuIGUuaW5kZXhPZihcInNhZmFyaVwiKT49MCYmZS5pbmRleE9mKFwiY2hyb21lXCIpPDAmJmUuaW5kZXhPZihcImFuZHJvaWRcIik8MH0oKSxpc1VpV2ViVmlldzovKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdCg/IS4qU2FmYXJpKS9pLnRlc3QoYS5uYXZpZ2F0b3IudXNlckFnZW50KX0sWj17bmFtZTpcImJyb3dzZXJcIixwcm90bzp7YnJvd3NlcjpffSxzdGF0aWM6e2Jyb3dzZXI6X319LFE9e25hbWU6XCJyZXNpemVcIixjcmVhdGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2QuZXh0ZW5kKGUse3Jlc2l6ZTp7cmVzaXplSGFuZGxlcjpmdW5jdGlvbigpe2UmJiFlLmRlc3Ryb3llZCYmZS5pbml0aWFsaXplZCYmKGUuZW1pdChcImJlZm9yZVJlc2l6ZVwiKSxlLmVtaXQoXCJyZXNpemVcIikpfSxvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXI6ZnVuY3Rpb24oKXtlJiYhZS5kZXN0cm95ZWQmJmUuaW5pdGlhbGl6ZWQmJmUuZW1pdChcIm9yaWVudGF0aW9uY2hhbmdlXCIpfX19KX0sb246e2luaXQ6ZnVuY3Rpb24oKXthLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLnJlc2l6ZS5yZXNpemVIYW5kbGVyKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLHRoaXMucmVzaXplLm9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcil9LGRlc3Ryb3k6ZnVuY3Rpb24oKXthLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLnJlc2l6ZS5yZXNpemVIYW5kbGVyKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLHRoaXMucmVzaXplLm9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcil9fX0sSj17ZnVuYzphLk11dGF0aW9uT2JzZXJ2ZXJ8fGEuV2Via2l0TXV0YXRpb25PYnNlcnZlcixhdHRhY2g6ZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT10JiYodD17fSk7dmFyIGk9dGhpcyxzPW5ldygwLEouZnVuYykoKGZ1bmN0aW9uKGUpe2lmKDEhPT1lLmxlbmd0aCl7dmFyIHQ9ZnVuY3Rpb24oKXtpLmVtaXQoXCJvYnNlcnZlclVwZGF0ZVwiLGVbMF0pfTthLnJlcXVlc3RBbmltYXRpb25GcmFtZT9hLnJlcXVlc3RBbmltYXRpb25GcmFtZSh0KTphLnNldFRpbWVvdXQodCwwKX1lbHNlIGkuZW1pdChcIm9ic2VydmVyVXBkYXRlXCIsZVswXSl9KSk7cy5vYnNlcnZlKGUse2F0dHJpYnV0ZXM6dm9pZCAwPT09dC5hdHRyaWJ1dGVzfHx0LmF0dHJpYnV0ZXMsY2hpbGRMaXN0OnZvaWQgMD09PXQuY2hpbGRMaXN0fHx0LmNoaWxkTGlzdCxjaGFyYWN0ZXJEYXRhOnZvaWQgMD09PXQuY2hhcmFjdGVyRGF0YXx8dC5jaGFyYWN0ZXJEYXRhfSksaS5vYnNlcnZlci5vYnNlcnZlcnMucHVzaChzKX0saW5pdDpmdW5jdGlvbigpe2lmKGgub2JzZXJ2ZXImJnRoaXMucGFyYW1zLm9ic2VydmVyKXtpZih0aGlzLnBhcmFtcy5vYnNlcnZlUGFyZW50cylmb3IodmFyIGU9dGhpcy4kZWwucGFyZW50cygpLHQ9MDt0PGUubGVuZ3RoO3QrPTEpdGhpcy5vYnNlcnZlci5hdHRhY2goZVt0XSk7dGhpcy5vYnNlcnZlci5hdHRhY2godGhpcy4kZWxbMF0se2NoaWxkTGlzdDp0aGlzLnBhcmFtcy5vYnNlcnZlU2xpZGVDaGlsZHJlbn0pLHRoaXMub2JzZXJ2ZXIuYXR0YWNoKHRoaXMuJHdyYXBwZXJFbFswXSx7YXR0cmlidXRlczohMX0pfX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMub2JzZXJ2ZXIub2JzZXJ2ZXJzLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuZGlzY29ubmVjdCgpfSkpLHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZXJzPVtdfX0sZWU9e25hbWU6XCJvYnNlcnZlclwiLHBhcmFtczp7b2JzZXJ2ZXI6ITEsb2JzZXJ2ZVBhcmVudHM6ITEsb2JzZXJ2ZVNsaWRlQ2hpbGRyZW46ITF9LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse29ic2VydmVyOntpbml0OkouaW5pdC5iaW5kKHRoaXMpLGF0dGFjaDpKLmF0dGFjaC5iaW5kKHRoaXMpLGRlc3Ryb3k6Si5kZXN0cm95LmJpbmQodGhpcyksb2JzZXJ2ZXJzOltdfX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMub2JzZXJ2ZXIuaW5pdCgpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5vYnNlcnZlci5kZXN0cm95KCl9fX0sdGU9e3VwZGF0ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLGk9dC5wYXJhbXMscz1pLnNsaWRlc1BlclZpZXcsYT1pLnNsaWRlc1Blckdyb3VwLHI9aS5jZW50ZXJlZFNsaWRlcyxuPXQucGFyYW1zLnZpcnR1YWwsbz1uLmFkZFNsaWRlc0JlZm9yZSxsPW4uYWRkU2xpZGVzQWZ0ZXIsaD10LnZpcnR1YWwscD1oLmZyb20sYz1oLnRvLHU9aC5zbGlkZXMsdj1oLnNsaWRlc0dyaWQsZj1oLnJlbmRlclNsaWRlLG09aC5vZmZzZXQ7dC51cGRhdGVBY3RpdmVJbmRleCgpO3ZhciBnLGIsdyx5PXQuYWN0aXZlSW5kZXh8fDA7Zz10LnJ0bFRyYW5zbGF0ZT9cInJpZ2h0XCI6dC5pc0hvcml6b250YWwoKT9cImxlZnRcIjpcInRvcFwiLHI/KGI9TWF0aC5mbG9vcihzLzIpK2Erbyx3PU1hdGguZmxvb3Iocy8yKSthK2wpOihiPXMrKGEtMSkrbyx3PWErbCk7dmFyIHg9TWF0aC5tYXgoKHl8fDApLXcsMCksRT1NYXRoLm1pbigoeXx8MCkrYix1Lmxlbmd0aC0xKSxUPSh0LnNsaWRlc0dyaWRbeF18fDApLSh0LnNsaWRlc0dyaWRbMF18fDApO2Z1bmN0aW9uIFMoKXt0LnVwZGF0ZVNsaWRlcygpLHQudXBkYXRlUHJvZ3Jlc3MoKSx0LnVwZGF0ZVNsaWRlc0NsYXNzZXMoKSx0LmxhenkmJnQucGFyYW1zLmxhenkuZW5hYmxlZCYmdC5sYXp5LmxvYWQoKX1pZihkLmV4dGVuZCh0LnZpcnR1YWwse2Zyb206eCx0bzpFLG9mZnNldDpULHNsaWRlc0dyaWQ6dC5zbGlkZXNHcmlkfSkscD09PXgmJmM9PT1FJiYhZSlyZXR1cm4gdC5zbGlkZXNHcmlkIT09diYmVCE9PW0mJnQuc2xpZGVzLmNzcyhnLFQrXCJweFwiKSx2b2lkIHQudXBkYXRlUHJvZ3Jlc3MoKTtpZih0LnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsKXJldHVybiB0LnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsLmNhbGwodCx7b2Zmc2V0OlQsZnJvbTp4LHRvOkUsc2xpZGVzOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9eDt0PD1FO3QrPTEpZS5wdXNoKHVbdF0pO3JldHVybiBlfSgpfSksdm9pZCBTKCk7dmFyIEM9W10sTT1bXTtpZihlKXQuJHdyYXBwZXJFbC5maW5kKFwiLlwiK3QucGFyYW1zLnNsaWRlQ2xhc3MpLnJlbW92ZSgpO2Vsc2UgZm9yKHZhciBQPXA7UDw9YztQKz0xKShQPHh8fFA+RSkmJnQuJHdyYXBwZXJFbC5maW5kKFwiLlwiK3QucGFyYW1zLnNsaWRlQ2xhc3MrJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrUCsnXCJdJykucmVtb3ZlKCk7Zm9yKHZhciB6PTA7ejx1Lmxlbmd0aDt6Kz0xKXo+PXgmJno8PUUmJih2b2lkIDA9PT1jfHxlP00ucHVzaCh6KTooej5jJiZNLnB1c2goeiksejxwJiZDLnB1c2goeikpKTtNLmZvckVhY2goKGZ1bmN0aW9uKGUpe3QuJHdyYXBwZXJFbC5hcHBlbmQoZih1W2VdLGUpKX0pKSxDLnNvcnQoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQtZX0pKS5mb3JFYWNoKChmdW5jdGlvbihlKXt0LiR3cmFwcGVyRWwucHJlcGVuZChmKHVbZV0sZSkpfSkpLHQuJHdyYXBwZXJFbC5jaGlsZHJlbihcIi5zd2lwZXItc2xpZGVcIikuY3NzKGcsVCtcInB4XCIpLFMoKX0scmVuZGVyU2xpZGU6ZnVuY3Rpb24oZSx0KXt2YXIgaT10aGlzLnBhcmFtcy52aXJ0dWFsO2lmKGkuY2FjaGUmJnRoaXMudmlydHVhbC5jYWNoZVt0XSlyZXR1cm4gdGhpcy52aXJ0dWFsLmNhY2hlW3RdO3ZhciBzPWkucmVuZGVyU2xpZGU/bihpLnJlbmRlclNsaWRlLmNhbGwodGhpcyxlLHQpKTpuKCc8ZGl2IGNsYXNzPVwiJyt0aGlzLnBhcmFtcy5zbGlkZUNsYXNzKydcIiBkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrdCsnXCI+JytlK1wiPC9kaXY+XCIpO3JldHVybiBzLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKXx8cy5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIix0KSxpLmNhY2hlJiYodGhpcy52aXJ0dWFsLmNhY2hlW3RdPXMpLHN9LGFwcGVuZFNsaWRlOmZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlJiZcImxlbmd0aFwiaW4gZSlmb3IodmFyIHQ9MDt0PGUubGVuZ3RoO3QrPTEpZVt0XSYmdGhpcy52aXJ0dWFsLnNsaWRlcy5wdXNoKGVbdF0pO2Vsc2UgdGhpcy52aXJ0dWFsLnNsaWRlcy5wdXNoKGUpO3RoaXMudmlydHVhbC51cGRhdGUoITApfSxwcmVwZW5kU2xpZGU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5hY3RpdmVJbmRleCxpPXQrMSxzPTE7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciBhPTA7YTxlLmxlbmd0aDthKz0xKWVbYV0mJnRoaXMudmlydHVhbC5zbGlkZXMudW5zaGlmdChlW2FdKTtpPXQrZS5sZW5ndGgscz1lLmxlbmd0aH1lbHNlIHRoaXMudmlydHVhbC5zbGlkZXMudW5zaGlmdChlKTtpZih0aGlzLnBhcmFtcy52aXJ0dWFsLmNhY2hlKXt2YXIgcj10aGlzLnZpcnR1YWwuY2FjaGUsbj17fTtPYmplY3Qua2V5cyhyKS5mb3JFYWNoKChmdW5jdGlvbihlKXt2YXIgdD1yW2VdLGk9dC5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIik7aSYmdC5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIixwYXJzZUludChpLDEwKSsxKSxuW3BhcnNlSW50KGUsMTApK3NdPXR9KSksdGhpcy52aXJ0dWFsLmNhY2hlPW59dGhpcy52aXJ0dWFsLnVwZGF0ZSghMCksdGhpcy5zbGlkZVRvKGksMCl9LHJlbW92ZVNsaWRlOmZ1bmN0aW9uKGUpe2lmKG51bGwhPWUpe3ZhciB0PXRoaXMuYWN0aXZlSW5kZXg7aWYoQXJyYXkuaXNBcnJheShlKSlmb3IodmFyIGk9ZS5sZW5ndGgtMTtpPj0wO2ktPTEpdGhpcy52aXJ0dWFsLnNsaWRlcy5zcGxpY2UoZVtpXSwxKSx0aGlzLnBhcmFtcy52aXJ0dWFsLmNhY2hlJiZkZWxldGUgdGhpcy52aXJ0dWFsLmNhY2hlW2VbaV1dLGVbaV08dCYmKHQtPTEpLHQ9TWF0aC5tYXgodCwwKTtlbHNlIHRoaXMudmlydHVhbC5zbGlkZXMuc3BsaWNlKGUsMSksdGhpcy5wYXJhbXMudmlydHVhbC5jYWNoZSYmZGVsZXRlIHRoaXMudmlydHVhbC5jYWNoZVtlXSxlPHQmJih0LT0xKSx0PU1hdGgubWF4KHQsMCk7dGhpcy52aXJ0dWFsLnVwZGF0ZSghMCksdGhpcy5zbGlkZVRvKHQsMCl9fSxyZW1vdmVBbGxTbGlkZXM6ZnVuY3Rpb24oKXt0aGlzLnZpcnR1YWwuc2xpZGVzPVtdLHRoaXMucGFyYW1zLnZpcnR1YWwuY2FjaGUmJih0aGlzLnZpcnR1YWwuY2FjaGU9e30pLHRoaXMudmlydHVhbC51cGRhdGUoITApLHRoaXMuc2xpZGVUbygwLDApfX0saWU9e25hbWU6XCJ2aXJ0dWFsXCIscGFyYW1zOnt2aXJ0dWFsOntlbmFibGVkOiExLHNsaWRlczpbXSxjYWNoZTohMCxyZW5kZXJTbGlkZTpudWxsLHJlbmRlckV4dGVybmFsOm51bGwsYWRkU2xpZGVzQmVmb3JlOjAsYWRkU2xpZGVzQWZ0ZXI6MH19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse3ZpcnR1YWw6e3VwZGF0ZTp0ZS51cGRhdGUuYmluZCh0aGlzKSxhcHBlbmRTbGlkZTp0ZS5hcHBlbmRTbGlkZS5iaW5kKHRoaXMpLHByZXBlbmRTbGlkZTp0ZS5wcmVwZW5kU2xpZGUuYmluZCh0aGlzKSxyZW1vdmVTbGlkZTp0ZS5yZW1vdmVTbGlkZS5iaW5kKHRoaXMpLHJlbW92ZUFsbFNsaWRlczp0ZS5yZW1vdmVBbGxTbGlkZXMuYmluZCh0aGlzKSxyZW5kZXJTbGlkZTp0ZS5yZW5kZXJTbGlkZS5iaW5kKHRoaXMpLHNsaWRlczp0aGlzLnBhcmFtcy52aXJ0dWFsLnNsaWRlcyxjYWNoZTp7fX19KX0sb246e2JlZm9yZUluaXQ6ZnVuY3Rpb24oKXtpZih0aGlzLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpe3RoaXMuY2xhc3NOYW1lcy5wdXNoKHRoaXMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MrXCJ2aXJ0dWFsXCIpO3ZhciBlPXt3YXRjaFNsaWRlc1Byb2dyZXNzOiEwfTtkLmV4dGVuZCh0aGlzLnBhcmFtcyxlKSxkLmV4dGVuZCh0aGlzLm9yaWdpbmFsUGFyYW1zLGUpLHRoaXMucGFyYW1zLmluaXRpYWxTbGlkZXx8dGhpcy52aXJ0dWFsLnVwZGF0ZSgpfX0sc2V0VHJhbnNsYXRlOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMudmlydHVhbC5lbmFibGVkJiZ0aGlzLnZpcnR1YWwudXBkYXRlKCl9fX0sc2U9e2hhbmRsZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnJ0bFRyYW5zbGF0ZSxzPWU7cy5vcmlnaW5hbEV2ZW50JiYocz1zLm9yaWdpbmFsRXZlbnQpO3ZhciByPXMua2V5Q29kZXx8cy5jaGFyQ29kZTtpZighdGhpcy5hbGxvd1NsaWRlTmV4dCYmKHRoaXMuaXNIb3Jpem9udGFsKCkmJjM5PT09cnx8dGhpcy5pc1ZlcnRpY2FsKCkmJjQwPT09cnx8MzQ9PT1yKSlyZXR1cm4hMTtpZighdGhpcy5hbGxvd1NsaWRlUHJldiYmKHRoaXMuaXNIb3Jpem9udGFsKCkmJjM3PT09cnx8dGhpcy5pc1ZlcnRpY2FsKCkmJjM4PT09cnx8MzM9PT1yKSlyZXR1cm4hMTtpZighKHMuc2hpZnRLZXl8fHMuYWx0S2V5fHxzLmN0cmxLZXl8fHMubWV0YUtleXx8aS5hY3RpdmVFbGVtZW50JiZpLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUmJihcImlucHV0XCI9PT1pLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKXx8XCJ0ZXh0YXJlYVwiPT09aS5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpKSl7aWYodGhpcy5wYXJhbXMua2V5Ym9hcmQub25seUluVmlld3BvcnQmJigzMz09PXJ8fDM0PT09cnx8Mzc9PT1yfHwzOT09PXJ8fDM4PT09cnx8NDA9PT1yKSl7dmFyIG49ITE7aWYodGhpcy4kZWwucGFyZW50cyhcIi5cIit0aGlzLnBhcmFtcy5zbGlkZUNsYXNzKS5sZW5ndGg+MCYmMD09PXRoaXMuJGVsLnBhcmVudHMoXCIuXCIrdGhpcy5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcykubGVuZ3RoKXJldHVybjt2YXIgbz1hLmlubmVyV2lkdGgsbD1hLmlubmVySGVpZ2h0LGQ9dGhpcy4kZWwub2Zmc2V0KCk7dCYmKGQubGVmdC09dGhpcy4kZWxbMF0uc2Nyb2xsTGVmdCk7Zm9yKHZhciBoPVtbZC5sZWZ0LGQudG9wXSxbZC5sZWZ0K3RoaXMud2lkdGgsZC50b3BdLFtkLmxlZnQsZC50b3ArdGhpcy5oZWlnaHRdLFtkLmxlZnQrdGhpcy53aWR0aCxkLnRvcCt0aGlzLmhlaWdodF1dLHA9MDtwPGgubGVuZ3RoO3ArPTEpe3ZhciBjPWhbcF07Y1swXT49MCYmY1swXTw9byYmY1sxXT49MCYmY1sxXTw9bCYmKG49ITApfWlmKCFuKXJldHVybn10aGlzLmlzSG9yaXpvbnRhbCgpPygzMyE9PXImJjM0IT09ciYmMzchPT1yJiYzOSE9PXJ8fChzLnByZXZlbnREZWZhdWx0P3MucHJldmVudERlZmF1bHQoKTpzLnJldHVyblZhbHVlPSExKSwoMzQhPT1yJiYzOSE9PXJ8fHQpJiYoMzMhPT1yJiYzNyE9PXJ8fCF0KXx8dGhpcy5zbGlkZU5leHQoKSwoMzMhPT1yJiYzNyE9PXJ8fHQpJiYoMzQhPT1yJiYzOSE9PXJ8fCF0KXx8dGhpcy5zbGlkZVByZXYoKSk6KDMzIT09ciYmMzQhPT1yJiYzOCE9PXImJjQwIT09cnx8KHMucHJldmVudERlZmF1bHQ/cy5wcmV2ZW50RGVmYXVsdCgpOnMucmV0dXJuVmFsdWU9ITEpLDM0IT09ciYmNDAhPT1yfHx0aGlzLnNsaWRlTmV4dCgpLDMzIT09ciYmMzghPT1yfHx0aGlzLnNsaWRlUHJldigpKSx0aGlzLmVtaXQoXCJrZXlQcmVzc1wiLHIpfX0sZW5hYmxlOmZ1bmN0aW9uKCl7dGhpcy5rZXlib2FyZC5lbmFibGVkfHwobihpKS5vbihcImtleWRvd25cIix0aGlzLmtleWJvYXJkLmhhbmRsZSksdGhpcy5rZXlib2FyZC5lbmFibGVkPSEwKX0sZGlzYWJsZTpmdW5jdGlvbigpe3RoaXMua2V5Ym9hcmQuZW5hYmxlZCYmKG4oaSkub2ZmKFwia2V5ZG93blwiLHRoaXMua2V5Ym9hcmQuaGFuZGxlKSx0aGlzLmtleWJvYXJkLmVuYWJsZWQ9ITEpfX0sYWU9e25hbWU6XCJrZXlib2FyZFwiLHBhcmFtczp7a2V5Ym9hcmQ6e2VuYWJsZWQ6ITEsb25seUluVmlld3BvcnQ6ITB9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHtrZXlib2FyZDp7ZW5hYmxlZDohMSxlbmFibGU6c2UuZW5hYmxlLmJpbmQodGhpcyksZGlzYWJsZTpzZS5kaXNhYmxlLmJpbmQodGhpcyksaGFuZGxlOnNlLmhhbmRsZS5iaW5kKHRoaXMpfX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmtleWJvYXJkLmVuYWJsZWQmJnRoaXMua2V5Ym9hcmQuZW5hYmxlKCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLmtleWJvYXJkLmVuYWJsZWQmJnRoaXMua2V5Ym9hcmQuZGlzYWJsZSgpfX19O3ZhciByZT17bGFzdFNjcm9sbFRpbWU6ZC5ub3coKSxsYXN0RXZlbnRCZWZvcmVTbmFwOnZvaWQgMCxyZWNlbnRXaGVlbEV2ZW50czpbXSxldmVudDpmdW5jdGlvbigpe3JldHVybiBhLm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcImZpcmVmb3hcIik+LTE/XCJET01Nb3VzZVNjcm9sbFwiOmZ1bmN0aW9uKCl7dmFyIGU9XCJvbndoZWVsXCJpbiBpO2lmKCFlKXt2YXIgdD1pLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5zZXRBdHRyaWJ1dGUoXCJvbndoZWVsXCIsXCJyZXR1cm47XCIpLGU9XCJmdW5jdGlvblwiPT10eXBlb2YgdC5vbndoZWVsfXJldHVybiFlJiZpLmltcGxlbWVudGF0aW9uJiZpLmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUmJiEwIT09aS5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKFwiXCIsXCJcIikmJihlPWkuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZShcIkV2ZW50cy53aGVlbFwiLFwiMy4wXCIpKSxlfSgpP1wid2hlZWxcIjpcIm1vdXNld2hlZWxcIn0sbm9ybWFsaXplOmZ1bmN0aW9uKGUpe3ZhciB0PTAsaT0wLHM9MCxhPTA7cmV0dXJuXCJkZXRhaWxcImluIGUmJihpPWUuZGV0YWlsKSxcIndoZWVsRGVsdGFcImluIGUmJihpPS1lLndoZWVsRGVsdGEvMTIwKSxcIndoZWVsRGVsdGFZXCJpbiBlJiYoaT0tZS53aGVlbERlbHRhWS8xMjApLFwid2hlZWxEZWx0YVhcImluIGUmJih0PS1lLndoZWVsRGVsdGFYLzEyMCksXCJheGlzXCJpbiBlJiZlLmF4aXM9PT1lLkhPUklaT05UQUxfQVhJUyYmKHQ9aSxpPTApLHM9MTAqdCxhPTEwKmksXCJkZWx0YVlcImluIGUmJihhPWUuZGVsdGFZKSxcImRlbHRhWFwiaW4gZSYmKHM9ZS5kZWx0YVgpLGUuc2hpZnRLZXkmJiFzJiYocz1hLGE9MCksKHN8fGEpJiZlLmRlbHRhTW9kZSYmKDE9PT1lLmRlbHRhTW9kZT8ocyo9NDAsYSo9NDApOihzKj04MDAsYSo9ODAwKSkscyYmIXQmJih0PXM8MT8tMToxKSxhJiYhaSYmKGk9YTwxPy0xOjEpLHtzcGluWDp0LHNwaW5ZOmkscGl4ZWxYOnMscGl4ZWxZOmF9fSxoYW5kbGVNb3VzZUVudGVyOmZ1bmN0aW9uKCl7dGhpcy5tb3VzZUVudGVyZWQ9ITB9LGhhbmRsZU1vdXNlTGVhdmU6ZnVuY3Rpb24oKXt0aGlzLm1vdXNlRW50ZXJlZD0hMX0saGFuZGxlOmZ1bmN0aW9uKGUpe3ZhciB0PWUsaT10aGlzLHM9aS5wYXJhbXMubW91c2V3aGVlbDtpLnBhcmFtcy5jc3NNb2RlJiZ0LnByZXZlbnREZWZhdWx0KCk7dmFyIGE9aS4kZWw7aWYoXCJjb250YWluZXJcIiE9PWkucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkJiYoYT1uKGkucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkKSksIWkubW91c2VFbnRlcmVkJiYhYVswXS5jb250YWlucyh0LnRhcmdldCkmJiFzLnJlbGVhc2VPbkVkZ2VzKXJldHVybiEwO3Qub3JpZ2luYWxFdmVudCYmKHQ9dC5vcmlnaW5hbEV2ZW50KTt2YXIgcj0wLG89aS5ydGxUcmFuc2xhdGU/LTE6MSxsPXJlLm5vcm1hbGl6ZSh0KTtpZihzLmZvcmNlVG9BeGlzKWlmKGkuaXNIb3Jpem9udGFsKCkpe2lmKCEoTWF0aC5hYnMobC5waXhlbFgpPk1hdGguYWJzKGwucGl4ZWxZKSkpcmV0dXJuITA7cj1sLnBpeGVsWCpvfWVsc2V7aWYoIShNYXRoLmFicyhsLnBpeGVsWSk+TWF0aC5hYnMobC5waXhlbFgpKSlyZXR1cm4hMDtyPWwucGl4ZWxZfWVsc2Ugcj1NYXRoLmFicyhsLnBpeGVsWCk+TWF0aC5hYnMobC5waXhlbFkpPy1sLnBpeGVsWCpvOi1sLnBpeGVsWTtpZigwPT09cilyZXR1cm4hMDtpZihzLmludmVydCYmKHI9LXIpLGkucGFyYW1zLmZyZWVNb2RlKXt2YXIgaD17dGltZTpkLm5vdygpLGRlbHRhOk1hdGguYWJzKHIpLGRpcmVjdGlvbjpNYXRoLnNpZ24ocil9LHA9aS5tb3VzZXdoZWVsLmxhc3RFdmVudEJlZm9yZVNuYXAsYz1wJiZoLnRpbWU8cC50aW1lKzUwMCYmaC5kZWx0YTw9cC5kZWx0YSYmaC5kaXJlY3Rpb249PT1wLmRpcmVjdGlvbjtpZighYyl7aS5tb3VzZXdoZWVsLmxhc3RFdmVudEJlZm9yZVNuYXA9dm9pZCAwLGkucGFyYW1zLmxvb3AmJmkubG9vcEZpeCgpO3ZhciB1PWkuZ2V0VHJhbnNsYXRlKCkrcipzLnNlbnNpdGl2aXR5LHY9aS5pc0JlZ2lubmluZyxmPWkuaXNFbmQ7aWYodT49aS5taW5UcmFuc2xhdGUoKSYmKHU9aS5taW5UcmFuc2xhdGUoKSksdTw9aS5tYXhUcmFuc2xhdGUoKSYmKHU9aS5tYXhUcmFuc2xhdGUoKSksaS5zZXRUcmFuc2l0aW9uKDApLGkuc2V0VHJhbnNsYXRlKHUpLGkudXBkYXRlUHJvZ3Jlc3MoKSxpLnVwZGF0ZUFjdGl2ZUluZGV4KCksaS51cGRhdGVTbGlkZXNDbGFzc2VzKCksKCF2JiZpLmlzQmVnaW5uaW5nfHwhZiYmaS5pc0VuZCkmJmkudXBkYXRlU2xpZGVzQ2xhc3NlcygpLGkucGFyYW1zLmZyZWVNb2RlU3RpY2t5KXtjbGVhclRpbWVvdXQoaS5tb3VzZXdoZWVsLnRpbWVvdXQpLGkubW91c2V3aGVlbC50aW1lb3V0PXZvaWQgMDt2YXIgbT1pLm1vdXNld2hlZWwucmVjZW50V2hlZWxFdmVudHM7bS5sZW5ndGg+PTE1JiZtLnNoaWZ0KCk7dmFyIGc9bS5sZW5ndGg/bVttLmxlbmd0aC0xXTp2b2lkIDAsYj1tWzBdO2lmKG0ucHVzaChoKSxnJiYoaC5kZWx0YT5nLmRlbHRhfHxoLmRpcmVjdGlvbiE9PWcuZGlyZWN0aW9uKSltLnNwbGljZSgwKTtlbHNlIGlmKG0ubGVuZ3RoPj0xNSYmaC50aW1lLWIudGltZTw1MDAmJmIuZGVsdGEtaC5kZWx0YT49MSYmaC5kZWx0YTw9Nil7dmFyIHc9cj4wPy44Oi4yO2kubW91c2V3aGVlbC5sYXN0RXZlbnRCZWZvcmVTbmFwPWgsbS5zcGxpY2UoMCksaS5tb3VzZXdoZWVsLnRpbWVvdXQ9ZC5uZXh0VGljaygoZnVuY3Rpb24oKXtpLnNsaWRlVG9DbG9zZXN0KGkucGFyYW1zLnNwZWVkLCEwLHZvaWQgMCx3KX0pLDApfWkubW91c2V3aGVlbC50aW1lb3V0fHwoaS5tb3VzZXdoZWVsLnRpbWVvdXQ9ZC5uZXh0VGljaygoZnVuY3Rpb24oKXtpLm1vdXNld2hlZWwubGFzdEV2ZW50QmVmb3JlU25hcD1oLG0uc3BsaWNlKDApLGkuc2xpZGVUb0Nsb3Nlc3QoaS5wYXJhbXMuc3BlZWQsITAsdm9pZCAwLC41KX0pLDUwMCkpfWlmKGN8fGkuZW1pdChcInNjcm9sbFwiLHQpLGkucGFyYW1zLmF1dG9wbGF5JiZpLnBhcmFtcy5hdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uJiZpLmF1dG9wbGF5LnN0b3AoKSx1PT09aS5taW5UcmFuc2xhdGUoKXx8dT09PWkubWF4VHJhbnNsYXRlKCkpcmV0dXJuITB9fWVsc2V7dmFyIHk9e3RpbWU6ZC5ub3coKSxkZWx0YTpNYXRoLmFicyhyKSxkaXJlY3Rpb246TWF0aC5zaWduKHIpLHJhdzplfSx4PWkubW91c2V3aGVlbC5yZWNlbnRXaGVlbEV2ZW50czt4Lmxlbmd0aD49MiYmeC5zaGlmdCgpO3ZhciBFPXgubGVuZ3RoP3hbeC5sZW5ndGgtMV06dm9pZCAwO2lmKHgucHVzaCh5KSxFPyh5LmRpcmVjdGlvbiE9PUUuZGlyZWN0aW9ufHx5LmRlbHRhPkUuZGVsdGF8fHkudGltZT5FLnRpbWUrMTUwKSYmaS5tb3VzZXdoZWVsLmFuaW1hdGVTbGlkZXIoeSk6aS5tb3VzZXdoZWVsLmFuaW1hdGVTbGlkZXIoeSksaS5tb3VzZXdoZWVsLnJlbGVhc2VTY3JvbGwoeSkpcmV0dXJuITB9cmV0dXJuIHQucHJldmVudERlZmF1bHQ/dC5wcmV2ZW50RGVmYXVsdCgpOnQucmV0dXJuVmFsdWU9ITEsITF9LGFuaW1hdGVTbGlkZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZGVsdGE+PTYmJmQubm93KCktdGhpcy5tb3VzZXdoZWVsLmxhc3RTY3JvbGxUaW1lPDYwfHwoZS5kaXJlY3Rpb248MD90aGlzLmlzRW5kJiYhdGhpcy5wYXJhbXMubG9vcHx8dGhpcy5hbmltYXRpbmd8fCh0aGlzLnNsaWRlTmV4dCgpLHRoaXMuZW1pdChcInNjcm9sbFwiLGUucmF3KSk6dGhpcy5pc0JlZ2lubmluZyYmIXRoaXMucGFyYW1zLmxvb3B8fHRoaXMuYW5pbWF0aW5nfHwodGhpcy5zbGlkZVByZXYoKSx0aGlzLmVtaXQoXCJzY3JvbGxcIixlLnJhdykpLHRoaXMubW91c2V3aGVlbC5sYXN0U2Nyb2xsVGltZT0obmV3IGEuRGF0ZSkuZ2V0VGltZSgpLCExKX0scmVsZWFzZVNjcm9sbDpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnBhcmFtcy5tb3VzZXdoZWVsO2lmKGUuZGlyZWN0aW9uPDApe2lmKHRoaXMuaXNFbmQmJiF0aGlzLnBhcmFtcy5sb29wJiZ0LnJlbGVhc2VPbkVkZ2VzKXJldHVybiEwfWVsc2UgaWYodGhpcy5pc0JlZ2lubmluZyYmIXRoaXMucGFyYW1zLmxvb3AmJnQucmVsZWFzZU9uRWRnZXMpcmV0dXJuITA7cmV0dXJuITF9LGVuYWJsZTpmdW5jdGlvbigpe3ZhciBlPXJlLmV2ZW50KCk7aWYodGhpcy5wYXJhbXMuY3NzTW9kZSlyZXR1cm4gdGhpcy53cmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHRoaXMubW91c2V3aGVlbC5oYW5kbGUpLCEwO2lmKCFlKXJldHVybiExO2lmKHRoaXMubW91c2V3aGVlbC5lbmFibGVkKXJldHVybiExO3ZhciB0PXRoaXMuJGVsO3JldHVyblwiY29udGFpbmVyXCIhPT10aGlzLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCYmKHQ9bih0aGlzLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCkpLHQub24oXCJtb3VzZWVudGVyXCIsdGhpcy5tb3VzZXdoZWVsLmhhbmRsZU1vdXNlRW50ZXIpLHQub24oXCJtb3VzZWxlYXZlXCIsdGhpcy5tb3VzZXdoZWVsLmhhbmRsZU1vdXNlTGVhdmUpLHQub24oZSx0aGlzLm1vdXNld2hlZWwuaGFuZGxlKSx0aGlzLm1vdXNld2hlZWwuZW5hYmxlZD0hMCwhMH0sZGlzYWJsZTpmdW5jdGlvbigpe3ZhciBlPXJlLmV2ZW50KCk7aWYodGhpcy5wYXJhbXMuY3NzTW9kZSlyZXR1cm4gdGhpcy53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihlLHRoaXMubW91c2V3aGVlbC5oYW5kbGUpLCEwO2lmKCFlKXJldHVybiExO2lmKCF0aGlzLm1vdXNld2hlZWwuZW5hYmxlZClyZXR1cm4hMTt2YXIgdD10aGlzLiRlbDtyZXR1cm5cImNvbnRhaW5lclwiIT09dGhpcy5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQmJih0PW4odGhpcy5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQpKSx0Lm9mZihlLHRoaXMubW91c2V3aGVlbC5oYW5kbGUpLHRoaXMubW91c2V3aGVlbC5lbmFibGVkPSExLCEwfX0sbmU9e3VwZGF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMucGFyYW1zLm5hdmlnYXRpb247aWYoIXRoaXMucGFyYW1zLmxvb3Ape3ZhciB0PXRoaXMubmF2aWdhdGlvbixpPXQuJG5leHRFbCxzPXQuJHByZXZFbDtzJiZzLmxlbmd0aD4wJiYodGhpcy5pc0JlZ2lubmluZz9zLmFkZENsYXNzKGUuZGlzYWJsZWRDbGFzcyk6cy5yZW1vdmVDbGFzcyhlLmRpc2FibGVkQ2xhc3MpLHNbdGhpcy5wYXJhbXMud2F0Y2hPdmVyZmxvdyYmdGhpcy5pc0xvY2tlZD9cImFkZENsYXNzXCI6XCJyZW1vdmVDbGFzc1wiXShlLmxvY2tDbGFzcykpLGkmJmkubGVuZ3RoPjAmJih0aGlzLmlzRW5kP2kuYWRkQ2xhc3MoZS5kaXNhYmxlZENsYXNzKTppLnJlbW92ZUNsYXNzKGUuZGlzYWJsZWRDbGFzcyksaVt0aGlzLnBhcmFtcy53YXRjaE92ZXJmbG93JiZ0aGlzLmlzTG9ja2VkP1wiYWRkQ2xhc3NcIjpcInJlbW92ZUNsYXNzXCJdKGUubG9ja0NsYXNzKSl9fSxvblByZXZDbGljazpmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCksdGhpcy5pc0JlZ2lubmluZyYmIXRoaXMucGFyYW1zLmxvb3B8fHRoaXMuc2xpZGVQcmV2KCl9LG9uTmV4dENsaWNrOmZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSx0aGlzLmlzRW5kJiYhdGhpcy5wYXJhbXMubG9vcHx8dGhpcy5zbGlkZU5leHQoKX0saW5pdDpmdW5jdGlvbigpe3ZhciBlLHQsaT10aGlzLnBhcmFtcy5uYXZpZ2F0aW9uOyhpLm5leHRFbHx8aS5wcmV2RWwpJiYoaS5uZXh0RWwmJihlPW4oaS5uZXh0RWwpLHRoaXMucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzJiZcInN0cmluZ1wiPT10eXBlb2YgaS5uZXh0RWwmJmUubGVuZ3RoPjEmJjE9PT10aGlzLiRlbC5maW5kKGkubmV4dEVsKS5sZW5ndGgmJihlPXRoaXMuJGVsLmZpbmQoaS5uZXh0RWwpKSksaS5wcmV2RWwmJih0PW4oaS5wcmV2RWwpLHRoaXMucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzJiZcInN0cmluZ1wiPT10eXBlb2YgaS5wcmV2RWwmJnQubGVuZ3RoPjEmJjE9PT10aGlzLiRlbC5maW5kKGkucHJldkVsKS5sZW5ndGgmJih0PXRoaXMuJGVsLmZpbmQoaS5wcmV2RWwpKSksZSYmZS5sZW5ndGg+MCYmZS5vbihcImNsaWNrXCIsdGhpcy5uYXZpZ2F0aW9uLm9uTmV4dENsaWNrKSx0JiZ0Lmxlbmd0aD4wJiZ0Lm9uKFwiY2xpY2tcIix0aGlzLm5hdmlnYXRpb24ub25QcmV2Q2xpY2spLGQuZXh0ZW5kKHRoaXMubmF2aWdhdGlvbix7JG5leHRFbDplLG5leHRFbDplJiZlWzBdLCRwcmV2RWw6dCxwcmV2RWw6dCYmdFswXX0pKX0sZGVzdHJveTpmdW5jdGlvbigpe3ZhciBlPXRoaXMubmF2aWdhdGlvbix0PWUuJG5leHRFbCxpPWUuJHByZXZFbDt0JiZ0Lmxlbmd0aCYmKHQub2ZmKFwiY2xpY2tcIix0aGlzLm5hdmlnYXRpb24ub25OZXh0Q2xpY2spLHQucmVtb3ZlQ2xhc3ModGhpcy5wYXJhbXMubmF2aWdhdGlvbi5kaXNhYmxlZENsYXNzKSksaSYmaS5sZW5ndGgmJihpLm9mZihcImNsaWNrXCIsdGhpcy5uYXZpZ2F0aW9uLm9uUHJldkNsaWNrKSxpLnJlbW92ZUNsYXNzKHRoaXMucGFyYW1zLm5hdmlnYXRpb24uZGlzYWJsZWRDbGFzcykpfX0sb2U9e3VwZGF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMucnRsLHQ9dGhpcy5wYXJhbXMucGFnaW5hdGlvbjtpZih0LmVsJiZ0aGlzLnBhZ2luYXRpb24uZWwmJnRoaXMucGFnaW5hdGlvbi4kZWwmJjAhPT10aGlzLnBhZ2luYXRpb24uJGVsLmxlbmd0aCl7dmFyIGkscz10aGlzLnZpcnR1YWwmJnRoaXMucGFyYW1zLnZpcnR1YWwuZW5hYmxlZD90aGlzLnZpcnR1YWwuc2xpZGVzLmxlbmd0aDp0aGlzLnNsaWRlcy5sZW5ndGgsYT10aGlzLnBhZ2luYXRpb24uJGVsLHI9dGhpcy5wYXJhbXMubG9vcD9NYXRoLmNlaWwoKHMtMip0aGlzLmxvb3BlZFNsaWRlcykvdGhpcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApOnRoaXMuc25hcEdyaWQubGVuZ3RoO2lmKHRoaXMucGFyYW1zLmxvb3A/KChpPU1hdGguY2VpbCgodGhpcy5hY3RpdmVJbmRleC10aGlzLmxvb3BlZFNsaWRlcykvdGhpcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApKT5zLTEtMip0aGlzLmxvb3BlZFNsaWRlcyYmKGktPXMtMip0aGlzLmxvb3BlZFNsaWRlcyksaT5yLTEmJihpLT1yKSxpPDAmJlwiYnVsbGV0c1wiIT09dGhpcy5wYXJhbXMucGFnaW5hdGlvblR5cGUmJihpPXIraSkpOmk9dm9pZCAwIT09dGhpcy5zbmFwSW5kZXg/dGhpcy5zbmFwSW5kZXg6dGhpcy5hY3RpdmVJbmRleHx8MCxcImJ1bGxldHNcIj09PXQudHlwZSYmdGhpcy5wYWdpbmF0aW9uLmJ1bGxldHMmJnRoaXMucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aD4wKXt2YXIgbyxsLGQsaD10aGlzLnBhZ2luYXRpb24uYnVsbGV0cztpZih0LmR5bmFtaWNCdWxsZXRzJiYodGhpcy5wYWdpbmF0aW9uLmJ1bGxldFNpemU9aC5lcSgwKVt0aGlzLmlzSG9yaXpvbnRhbCgpP1wib3V0ZXJXaWR0aFwiOlwib3V0ZXJIZWlnaHRcIl0oITApLGEuY3NzKHRoaXMuaXNIb3Jpem9udGFsKCk/XCJ3aWR0aFwiOlwiaGVpZ2h0XCIsdGhpcy5wYWdpbmF0aW9uLmJ1bGxldFNpemUqKHQuZHluYW1pY01haW5CdWxsZXRzKzQpK1wicHhcIiksdC5keW5hbWljTWFpbkJ1bGxldHM+MSYmdm9pZCAwIT09dGhpcy5wcmV2aW91c0luZGV4JiYodGhpcy5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleCs9aS10aGlzLnByZXZpb3VzSW5kZXgsdGhpcy5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleD50LmR5bmFtaWNNYWluQnVsbGV0cy0xP3RoaXMucGFnaW5hdGlvbi5keW5hbWljQnVsbGV0SW5kZXg9dC5keW5hbWljTWFpbkJ1bGxldHMtMTp0aGlzLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4PDAmJih0aGlzLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4PTApKSxvPWktdGhpcy5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleCxkPSgobD1vKyhNYXRoLm1pbihoLmxlbmd0aCx0LmR5bmFtaWNNYWluQnVsbGV0cyktMSkpK28pLzIpLGgucmVtb3ZlQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIiBcIit0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW5leHQgXCIrdC5idWxsZXRBY3RpdmVDbGFzcytcIi1uZXh0LW5leHQgXCIrdC5idWxsZXRBY3RpdmVDbGFzcytcIi1wcmV2IFwiK3QuYnVsbGV0QWN0aXZlQ2xhc3MrXCItcHJldi1wcmV2IFwiK3QuYnVsbGV0QWN0aXZlQ2xhc3MrXCItbWFpblwiKSxhLmxlbmd0aD4xKWguZWFjaCgoZnVuY3Rpb24oZSxzKXt2YXIgYT1uKHMpLHI9YS5pbmRleCgpO3I9PT1pJiZhLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MpLHQuZHluYW1pY0J1bGxldHMmJihyPj1vJiZyPD1sJiZhLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItbWFpblwiKSxyPT09byYmYS5wcmV2KCkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1wcmV2XCIpLnByZXYoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLXByZXYtcHJldlwiKSxyPT09bCYmYS5uZXh0KCkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1uZXh0XCIpLm5leHQoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW5leHQtbmV4dFwiKSl9KSk7ZWxzZXt2YXIgcD1oLmVxKGkpLGM9cC5pbmRleCgpO2lmKHAuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcyksdC5keW5hbWljQnVsbGV0cyl7Zm9yKHZhciB1PWguZXEobyksdj1oLmVxKGwpLGY9bztmPD1sO2YrPTEpaC5lcShmKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW1haW5cIik7aWYodGhpcy5wYXJhbXMubG9vcClpZihjPj1oLmxlbmd0aC10LmR5bmFtaWNNYWluQnVsbGV0cyl7Zm9yKHZhciBtPXQuZHluYW1pY01haW5CdWxsZXRzO20+PTA7bS09MSloLmVxKGgubGVuZ3RoLW0pLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItbWFpblwiKTtoLmVxKGgubGVuZ3RoLXQuZHluYW1pY01haW5CdWxsZXRzLTEpLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItcHJldlwiKX1lbHNlIHUucHJldigpLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItcHJldlwiKS5wcmV2KCkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1wcmV2LXByZXZcIiksdi5uZXh0KCkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1uZXh0XCIpLm5leHQoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW5leHQtbmV4dFwiKTtlbHNlIHUucHJldigpLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItcHJldlwiKS5wcmV2KCkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1wcmV2LXByZXZcIiksdi5uZXh0KCkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1uZXh0XCIpLm5leHQoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW5leHQtbmV4dFwiKX19aWYodC5keW5hbWljQnVsbGV0cyl7dmFyIGc9TWF0aC5taW4oaC5sZW5ndGgsdC5keW5hbWljTWFpbkJ1bGxldHMrNCksYj0odGhpcy5wYWdpbmF0aW9uLmJ1bGxldFNpemUqZy10aGlzLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSkvMi1kKnRoaXMucGFnaW5hdGlvbi5idWxsZXRTaXplLHc9ZT9cInJpZ2h0XCI6XCJsZWZ0XCI7aC5jc3ModGhpcy5pc0hvcml6b250YWwoKT93OlwidG9wXCIsYitcInB4XCIpfX1pZihcImZyYWN0aW9uXCI9PT10LnR5cGUmJihhLmZpbmQoXCIuXCIrdC5jdXJyZW50Q2xhc3MpLnRleHQodC5mb3JtYXRGcmFjdGlvbkN1cnJlbnQoaSsxKSksYS5maW5kKFwiLlwiK3QudG90YWxDbGFzcykudGV4dCh0LmZvcm1hdEZyYWN0aW9uVG90YWwocikpKSxcInByb2dyZXNzYmFyXCI9PT10LnR5cGUpe3ZhciB5O3k9dC5wcm9ncmVzc2Jhck9wcG9zaXRlP3RoaXMuaXNIb3Jpem9udGFsKCk/XCJ2ZXJ0aWNhbFwiOlwiaG9yaXpvbnRhbFwiOnRoaXMuaXNIb3Jpem9udGFsKCk/XCJob3Jpem9udGFsXCI6XCJ2ZXJ0aWNhbFwiO3ZhciB4PShpKzEpL3IsRT0xLFQ9MTtcImhvcml6b250YWxcIj09PXk/RT14OlQ9eCxhLmZpbmQoXCIuXCIrdC5wcm9ncmVzc2JhckZpbGxDbGFzcykudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlWChcIitFK1wiKSBzY2FsZVkoXCIrVCtcIilcIikudHJhbnNpdGlvbih0aGlzLnBhcmFtcy5zcGVlZCl9XCJjdXN0b21cIj09PXQudHlwZSYmdC5yZW5kZXJDdXN0b20/KGEuaHRtbCh0LnJlbmRlckN1c3RvbSh0aGlzLGkrMSxyKSksdGhpcy5lbWl0KFwicGFnaW5hdGlvblJlbmRlclwiLHRoaXMsYVswXSkpOnRoaXMuZW1pdChcInBhZ2luYXRpb25VcGRhdGVcIix0aGlzLGFbMF0pLGFbdGhpcy5wYXJhbXMud2F0Y2hPdmVyZmxvdyYmdGhpcy5pc0xvY2tlZD9cImFkZENsYXNzXCI6XCJyZW1vdmVDbGFzc1wiXSh0LmxvY2tDbGFzcyl9fSxyZW5kZXI6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnBhcmFtcy5wYWdpbmF0aW9uO2lmKGUuZWwmJnRoaXMucGFnaW5hdGlvbi5lbCYmdGhpcy5wYWdpbmF0aW9uLiRlbCYmMCE9PXRoaXMucGFnaW5hdGlvbi4kZWwubGVuZ3RoKXt2YXIgdD10aGlzLnZpcnR1YWwmJnRoaXMucGFyYW1zLnZpcnR1YWwuZW5hYmxlZD90aGlzLnZpcnR1YWwuc2xpZGVzLmxlbmd0aDp0aGlzLnNsaWRlcy5sZW5ndGgsaT10aGlzLnBhZ2luYXRpb24uJGVsLHM9XCJcIjtpZihcImJ1bGxldHNcIj09PWUudHlwZSl7Zm9yKHZhciBhPXRoaXMucGFyYW1zLmxvb3A/TWF0aC5jZWlsKCh0LTIqdGhpcy5sb29wZWRTbGlkZXMpL3RoaXMucGFyYW1zLnNsaWRlc1Blckdyb3VwKTp0aGlzLnNuYXBHcmlkLmxlbmd0aCxyPTA7cjxhO3IrPTEpZS5yZW5kZXJCdWxsZXQ/cys9ZS5yZW5kZXJCdWxsZXQuY2FsbCh0aGlzLHIsZS5idWxsZXRDbGFzcyk6cys9XCI8XCIrZS5idWxsZXRFbGVtZW50KycgY2xhc3M9XCInK2UuYnVsbGV0Q2xhc3MrJ1wiPjwvJytlLmJ1bGxldEVsZW1lbnQrXCI+XCI7aS5odG1sKHMpLHRoaXMucGFnaW5hdGlvbi5idWxsZXRzPWkuZmluZChcIi5cIitlLmJ1bGxldENsYXNzKX1cImZyYWN0aW9uXCI9PT1lLnR5cGUmJihzPWUucmVuZGVyRnJhY3Rpb24/ZS5yZW5kZXJGcmFjdGlvbi5jYWxsKHRoaXMsZS5jdXJyZW50Q2xhc3MsZS50b3RhbENsYXNzKTonPHNwYW4gY2xhc3M9XCInK2UuY3VycmVudENsYXNzKydcIj48L3NwYW4+IC8gPHNwYW4gY2xhc3M9XCInK2UudG90YWxDbGFzcysnXCI+PC9zcGFuPicsaS5odG1sKHMpKSxcInByb2dyZXNzYmFyXCI9PT1lLnR5cGUmJihzPWUucmVuZGVyUHJvZ3Jlc3NiYXI/ZS5yZW5kZXJQcm9ncmVzc2Jhci5jYWxsKHRoaXMsZS5wcm9ncmVzc2JhckZpbGxDbGFzcyk6JzxzcGFuIGNsYXNzPVwiJytlLnByb2dyZXNzYmFyRmlsbENsYXNzKydcIj48L3NwYW4+JyxpLmh0bWwocykpLFwiY3VzdG9tXCIhPT1lLnR5cGUmJnRoaXMuZW1pdChcInBhZ2luYXRpb25SZW5kZXJcIix0aGlzLnBhZ2luYXRpb24uJGVsWzBdKX19LGluaXQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS5wYXJhbXMucGFnaW5hdGlvbjtpZih0LmVsKXt2YXIgaT1uKHQuZWwpOzAhPT1pLmxlbmd0aCYmKGUucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzJiZcInN0cmluZ1wiPT10eXBlb2YgdC5lbCYmaS5sZW5ndGg+MSYmMT09PWUuJGVsLmZpbmQodC5lbCkubGVuZ3RoJiYoaT1lLiRlbC5maW5kKHQuZWwpKSxcImJ1bGxldHNcIj09PXQudHlwZSYmdC5jbGlja2FibGUmJmkuYWRkQ2xhc3ModC5jbGlja2FibGVDbGFzcyksaS5hZGRDbGFzcyh0Lm1vZGlmaWVyQ2xhc3MrdC50eXBlKSxcImJ1bGxldHNcIj09PXQudHlwZSYmdC5keW5hbWljQnVsbGV0cyYmKGkuYWRkQ2xhc3MoXCJcIit0Lm1vZGlmaWVyQ2xhc3MrdC50eXBlK1wiLWR5bmFtaWNcIiksZS5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleD0wLHQuZHluYW1pY01haW5CdWxsZXRzPDEmJih0LmR5bmFtaWNNYWluQnVsbGV0cz0xKSksXCJwcm9ncmVzc2JhclwiPT09dC50eXBlJiZ0LnByb2dyZXNzYmFyT3Bwb3NpdGUmJmkuYWRkQ2xhc3ModC5wcm9ncmVzc2Jhck9wcG9zaXRlQ2xhc3MpLHQuY2xpY2thYmxlJiZpLm9uKFwiY2xpY2tcIixcIi5cIit0LmJ1bGxldENsYXNzLChmdW5jdGlvbih0KXt0LnByZXZlbnREZWZhdWx0KCk7dmFyIGk9bih0aGlzKS5pbmRleCgpKmUucGFyYW1zLnNsaWRlc1Blckdyb3VwO2UucGFyYW1zLmxvb3AmJihpKz1lLmxvb3BlZFNsaWRlcyksZS5zbGlkZVRvKGkpfSkpLGQuZXh0ZW5kKGUucGFnaW5hdGlvbix7JGVsOmksZWw6aVswXX0pKX19LGRlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnBhcmFtcy5wYWdpbmF0aW9uO2lmKGUuZWwmJnRoaXMucGFnaW5hdGlvbi5lbCYmdGhpcy5wYWdpbmF0aW9uLiRlbCYmMCE9PXRoaXMucGFnaW5hdGlvbi4kZWwubGVuZ3RoKXt2YXIgdD10aGlzLnBhZ2luYXRpb24uJGVsO3QucmVtb3ZlQ2xhc3MoZS5oaWRkZW5DbGFzcyksdC5yZW1vdmVDbGFzcyhlLm1vZGlmaWVyQ2xhc3MrZS50eXBlKSx0aGlzLnBhZ2luYXRpb24uYnVsbGV0cyYmdGhpcy5wYWdpbmF0aW9uLmJ1bGxldHMucmVtb3ZlQ2xhc3MoZS5idWxsZXRBY3RpdmVDbGFzcyksZS5jbGlja2FibGUmJnQub2ZmKFwiY2xpY2tcIixcIi5cIitlLmJ1bGxldENsYXNzKX19fSxsZT17c2V0VHJhbnNsYXRlOmZ1bmN0aW9uKCl7aWYodGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmVsJiZ0aGlzLnNjcm9sbGJhci5lbCl7dmFyIGU9dGhpcy5zY3JvbGxiYXIsdD10aGlzLnJ0bFRyYW5zbGF0ZSxpPXRoaXMucHJvZ3Jlc3Mscz1lLmRyYWdTaXplLGE9ZS50cmFja1NpemUscj1lLiRkcmFnRWwsbj1lLiRlbCxvPXRoaXMucGFyYW1zLnNjcm9sbGJhcixsPXMsZD0oYS1zKSppO3Q/KGQ9LWQpPjA/KGw9cy1kLGQ9MCk6LWQrcz5hJiYobD1hK2QpOmQ8MD8obD1zK2QsZD0wKTpkK3M+YSYmKGw9YS1kKSx0aGlzLmlzSG9yaXpvbnRhbCgpPyhyLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKFwiK2QrXCJweCwgMCwgMClcIiksclswXS5zdHlsZS53aWR0aD1sK1wicHhcIik6KHIudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMHB4LCBcIitkK1wicHgsIDApXCIpLHJbMF0uc3R5bGUuaGVpZ2h0PWwrXCJweFwiKSxvLmhpZGUmJihjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxiYXIudGltZW91dCksblswXS5zdHlsZS5vcGFjaXR5PTEsdGhpcy5zY3JvbGxiYXIudGltZW91dD1zZXRUaW1lb3V0KChmdW5jdGlvbigpe25bMF0uc3R5bGUub3BhY2l0eT0wLG4udHJhbnNpdGlvbig0MDApfSksMWUzKSl9fSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUpe3RoaXMucGFyYW1zLnNjcm9sbGJhci5lbCYmdGhpcy5zY3JvbGxiYXIuZWwmJnRoaXMuc2Nyb2xsYmFyLiRkcmFnRWwudHJhbnNpdGlvbihlKX0sdXBkYXRlU2l6ZTpmdW5jdGlvbigpe2lmKHRoaXMucGFyYW1zLnNjcm9sbGJhci5lbCYmdGhpcy5zY3JvbGxiYXIuZWwpe3ZhciBlPXRoaXMuc2Nyb2xsYmFyLHQ9ZS4kZHJhZ0VsLGk9ZS4kZWw7dFswXS5zdHlsZS53aWR0aD1cIlwiLHRbMF0uc3R5bGUuaGVpZ2h0PVwiXCI7dmFyIHMsYT10aGlzLmlzSG9yaXpvbnRhbCgpP2lbMF0ub2Zmc2V0V2lkdGg6aVswXS5vZmZzZXRIZWlnaHQscj10aGlzLnNpemUvdGhpcy52aXJ0dWFsU2l6ZSxuPXIqKGEvdGhpcy5zaXplKTtzPVwiYXV0b1wiPT09dGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdTaXplP2EqcjpwYXJzZUludCh0aGlzLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemUsMTApLHRoaXMuaXNIb3Jpem9udGFsKCk/dFswXS5zdHlsZS53aWR0aD1zK1wicHhcIjp0WzBdLnN0eWxlLmhlaWdodD1zK1wicHhcIixpWzBdLnN0eWxlLmRpc3BsYXk9cj49MT9cIm5vbmVcIjpcIlwiLHRoaXMucGFyYW1zLnNjcm9sbGJhci5oaWRlJiYoaVswXS5zdHlsZS5vcGFjaXR5PTApLGQuZXh0ZW5kKGUse3RyYWNrU2l6ZTphLGRpdmlkZXI6cixtb3ZlRGl2aWRlcjpuLGRyYWdTaXplOnN9KSxlLiRlbFt0aGlzLnBhcmFtcy53YXRjaE92ZXJmbG93JiZ0aGlzLmlzTG9ja2VkP1wiYWRkQ2xhc3NcIjpcInJlbW92ZUNsYXNzXCJdKHRoaXMucGFyYW1zLnNjcm9sbGJhci5sb2NrQ2xhc3MpfX0sZ2V0UG9pbnRlclBvc2l0aW9uOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmlzSG9yaXpvbnRhbCgpP1widG91Y2hzdGFydFwiPT09ZS50eXBlfHxcInRvdWNobW92ZVwiPT09ZS50eXBlP2UudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRYOmUuY2xpZW50WDpcInRvdWNoc3RhcnRcIj09PWUudHlwZXx8XCJ0b3VjaG1vdmVcIj09PWUudHlwZT9lLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WTplLmNsaWVudFl9LHNldERyYWdQb3NpdGlvbjpmdW5jdGlvbihlKXt2YXIgdCxpPXRoaXMuc2Nyb2xsYmFyLHM9dGhpcy5ydGxUcmFuc2xhdGUsYT1pLiRlbCxyPWkuZHJhZ1NpemUsbj1pLnRyYWNrU2l6ZSxvPWkuZHJhZ1N0YXJ0UG9zO3Q9KGkuZ2V0UG9pbnRlclBvc2l0aW9uKGUpLWEub2Zmc2V0KClbdGhpcy5pc0hvcml6b250YWwoKT9cImxlZnRcIjpcInRvcFwiXS0obnVsbCE9PW8/bzpyLzIpKS8obi1yKSx0PU1hdGgubWF4KE1hdGgubWluKHQsMSksMCkscyYmKHQ9MS10KTt2YXIgbD10aGlzLm1pblRyYW5zbGF0ZSgpKyh0aGlzLm1heFRyYW5zbGF0ZSgpLXRoaXMubWluVHJhbnNsYXRlKCkpKnQ7dGhpcy51cGRhdGVQcm9ncmVzcyhsKSx0aGlzLnNldFRyYW5zbGF0ZShsKSx0aGlzLnVwZGF0ZUFjdGl2ZUluZGV4KCksdGhpcy51cGRhdGVTbGlkZXNDbGFzc2VzKCl9LG9uRHJhZ1N0YXJ0OmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLnNjcm9sbGJhcixpPXRoaXMuc2Nyb2xsYmFyLHM9dGhpcy4kd3JhcHBlckVsLGE9aS4kZWwscj1pLiRkcmFnRWw7dGhpcy5zY3JvbGxiYXIuaXNUb3VjaGVkPSEwLHRoaXMuc2Nyb2xsYmFyLmRyYWdTdGFydFBvcz1lLnRhcmdldD09PXJbMF18fGUudGFyZ2V0PT09cj9pLmdldFBvaW50ZXJQb3NpdGlvbihlKS1lLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVt0aGlzLmlzSG9yaXpvbnRhbCgpP1wibGVmdFwiOlwidG9wXCJdOm51bGwsZS5wcmV2ZW50RGVmYXVsdCgpLGUuc3RvcFByb3BhZ2F0aW9uKCkscy50cmFuc2l0aW9uKDEwMCksci50cmFuc2l0aW9uKDEwMCksaS5zZXREcmFnUG9zaXRpb24oZSksY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsYmFyLmRyYWdUaW1lb3V0KSxhLnRyYW5zaXRpb24oMCksdC5oaWRlJiZhLmNzcyhcIm9wYWNpdHlcIiwxKSx0aGlzLnBhcmFtcy5jc3NNb2RlJiZ0aGlzLiR3cmFwcGVyRWwuY3NzKFwic2Nyb2xsLXNuYXAtdHlwZVwiLFwibm9uZVwiKSx0aGlzLmVtaXQoXCJzY3JvbGxiYXJEcmFnU3RhcnRcIixlKX0sb25EcmFnTW92ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnNjcm9sbGJhcixpPXRoaXMuJHdyYXBwZXJFbCxzPXQuJGVsLGE9dC4kZHJhZ0VsO3RoaXMuc2Nyb2xsYmFyLmlzVG91Y2hlZCYmKGUucHJldmVudERlZmF1bHQ/ZS5wcmV2ZW50RGVmYXVsdCgpOmUucmV0dXJuVmFsdWU9ITEsdC5zZXREcmFnUG9zaXRpb24oZSksaS50cmFuc2l0aW9uKDApLHMudHJhbnNpdGlvbigwKSxhLnRyYW5zaXRpb24oMCksdGhpcy5lbWl0KFwic2Nyb2xsYmFyRHJhZ01vdmVcIixlKSl9LG9uRHJhZ0VuZDpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnBhcmFtcy5zY3JvbGxiYXIsaT10aGlzLnNjcm9sbGJhcixzPXRoaXMuJHdyYXBwZXJFbCxhPWkuJGVsO3RoaXMuc2Nyb2xsYmFyLmlzVG91Y2hlZCYmKHRoaXMuc2Nyb2xsYmFyLmlzVG91Y2hlZD0hMSx0aGlzLnBhcmFtcy5jc3NNb2RlJiYodGhpcy4kd3JhcHBlckVsLmNzcyhcInNjcm9sbC1zbmFwLXR5cGVcIixcIlwiKSxzLnRyYW5zaXRpb24oXCJcIikpLHQuaGlkZSYmKGNsZWFyVGltZW91dCh0aGlzLnNjcm9sbGJhci5kcmFnVGltZW91dCksdGhpcy5zY3JvbGxiYXIuZHJhZ1RpbWVvdXQ9ZC5uZXh0VGljaygoZnVuY3Rpb24oKXthLmNzcyhcIm9wYWNpdHlcIiwwKSxhLnRyYW5zaXRpb24oNDAwKX0pLDFlMykpLHRoaXMuZW1pdChcInNjcm9sbGJhckRyYWdFbmRcIixlKSx0LnNuYXBPblJlbGVhc2UmJnRoaXMuc2xpZGVUb0Nsb3Nlc3QoKSl9LGVuYWJsZURyYWdnYWJsZTpmdW5jdGlvbigpe2lmKHRoaXMucGFyYW1zLnNjcm9sbGJhci5lbCl7dmFyIGU9dGhpcy5zY3JvbGxiYXIsdD10aGlzLnRvdWNoRXZlbnRzVG91Y2gscz10aGlzLnRvdWNoRXZlbnRzRGVza3RvcCxhPXRoaXMucGFyYW1zLHI9ZS4kZWxbMF0sbj0hKCFoLnBhc3NpdmVMaXN0ZW5lcnx8IWEucGFzc2l2ZUxpc3RlbmVycykmJntwYXNzaXZlOiExLGNhcHR1cmU6ITF9LG89ISghaC5wYXNzaXZlTGlzdGVuZXJ8fCFhLnBhc3NpdmVMaXN0ZW5lcnMpJiZ7cGFzc2l2ZTohMCxjYXB0dXJlOiExfTtoLnRvdWNoPyhyLmFkZEV2ZW50TGlzdGVuZXIodC5zdGFydCx0aGlzLnNjcm9sbGJhci5vbkRyYWdTdGFydCxuKSxyLmFkZEV2ZW50TGlzdGVuZXIodC5tb3ZlLHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ01vdmUsbiksci5hZGRFdmVudExpc3RlbmVyKHQuZW5kLHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ0VuZCxvKSk6KHIuYWRkRXZlbnRMaXN0ZW5lcihzLnN0YXJ0LHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ1N0YXJ0LG4pLGkuYWRkRXZlbnRMaXN0ZW5lcihzLm1vdmUsdGhpcy5zY3JvbGxiYXIub25EcmFnTW92ZSxuKSxpLmFkZEV2ZW50TGlzdGVuZXIocy5lbmQsdGhpcy5zY3JvbGxiYXIub25EcmFnRW5kLG8pKX19LGRpc2FibGVEcmFnZ2FibGU6ZnVuY3Rpb24oKXtpZih0aGlzLnBhcmFtcy5zY3JvbGxiYXIuZWwpe3ZhciBlPXRoaXMuc2Nyb2xsYmFyLHQ9dGhpcy50b3VjaEV2ZW50c1RvdWNoLHM9dGhpcy50b3VjaEV2ZW50c0Rlc2t0b3AsYT10aGlzLnBhcmFtcyxyPWUuJGVsWzBdLG49ISghaC5wYXNzaXZlTGlzdGVuZXJ8fCFhLnBhc3NpdmVMaXN0ZW5lcnMpJiZ7cGFzc2l2ZTohMSxjYXB0dXJlOiExfSxvPSEoIWgucGFzc2l2ZUxpc3RlbmVyfHwhYS5wYXNzaXZlTGlzdGVuZXJzKSYme3Bhc3NpdmU6ITAsY2FwdHVyZTohMX07aC50b3VjaD8oci5yZW1vdmVFdmVudExpc3RlbmVyKHQuc3RhcnQsdGhpcy5zY3JvbGxiYXIub25EcmFnU3RhcnQsbiksci5yZW1vdmVFdmVudExpc3RlbmVyKHQubW92ZSx0aGlzLnNjcm9sbGJhci5vbkRyYWdNb3ZlLG4pLHIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LmVuZCx0aGlzLnNjcm9sbGJhci5vbkRyYWdFbmQsbykpOihyLnJlbW92ZUV2ZW50TGlzdGVuZXIocy5zdGFydCx0aGlzLnNjcm9sbGJhci5vbkRyYWdTdGFydCxuKSxpLnJlbW92ZUV2ZW50TGlzdGVuZXIocy5tb3ZlLHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ01vdmUsbiksaS5yZW1vdmVFdmVudExpc3RlbmVyKHMuZW5kLHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ0VuZCxvKSl9fSxpbml0OmZ1bmN0aW9uKCl7aWYodGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmVsKXt2YXIgZT10aGlzLnNjcm9sbGJhcix0PXRoaXMuJGVsLGk9dGhpcy5wYXJhbXMuc2Nyb2xsYmFyLHM9bihpLmVsKTt0aGlzLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyYmXCJzdHJpbmdcIj09dHlwZW9mIGkuZWwmJnMubGVuZ3RoPjEmJjE9PT10LmZpbmQoaS5lbCkubGVuZ3RoJiYocz10LmZpbmQoaS5lbCkpO3ZhciBhPXMuZmluZChcIi5cIit0aGlzLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ0NsYXNzKTswPT09YS5sZW5ndGgmJihhPW4oJzxkaXYgY2xhc3M9XCInK3RoaXMucGFyYW1zLnNjcm9sbGJhci5kcmFnQ2xhc3MrJ1wiPjwvZGl2PicpLHMuYXBwZW5kKGEpKSxkLmV4dGVuZChlLHskZWw6cyxlbDpzWzBdLCRkcmFnRWw6YSxkcmFnRWw6YVswXX0pLGkuZHJhZ2dhYmxlJiZlLmVuYWJsZURyYWdnYWJsZSgpfX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuc2Nyb2xsYmFyLmRpc2FibGVEcmFnZ2FibGUoKX19LGRlPXtzZXRUcmFuc2Zvcm06ZnVuY3Rpb24oZSx0KXt2YXIgaT10aGlzLnJ0bCxzPW4oZSksYT1pPy0xOjEscj1zLmF0dHIoXCJkYXRhLXN3aXBlci1wYXJhbGxheFwiKXx8XCIwXCIsbz1zLmF0dHIoXCJkYXRhLXN3aXBlci1wYXJhbGxheC14XCIpLGw9cy5hdHRyKFwiZGF0YS1zd2lwZXItcGFyYWxsYXgteVwiKSxkPXMuYXR0cihcImRhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlXCIpLGg9cy5hdHRyKFwiZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eVwiKTtpZihvfHxsPyhvPW98fFwiMFwiLGw9bHx8XCIwXCIpOnRoaXMuaXNIb3Jpem9udGFsKCk/KG89cixsPVwiMFwiKToobD1yLG89XCIwXCIpLG89by5pbmRleE9mKFwiJVwiKT49MD9wYXJzZUludChvLDEwKSp0KmErXCIlXCI6byp0KmErXCJweFwiLGw9bC5pbmRleE9mKFwiJVwiKT49MD9wYXJzZUludChsLDEwKSp0K1wiJVwiOmwqdCtcInB4XCIsbnVsbCE9aCl7dmFyIHA9aC0oaC0xKSooMS1NYXRoLmFicyh0KSk7c1swXS5zdHlsZS5vcGFjaXR5PXB9aWYobnVsbD09ZClzLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKFwiK28rXCIsIFwiK2wrXCIsIDBweClcIik7ZWxzZXt2YXIgYz1kLShkLTEpKigxLU1hdGguYWJzKHQpKTtzLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKFwiK28rXCIsIFwiK2wrXCIsIDBweCkgc2NhbGUoXCIrYytcIilcIil9fSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kZWwsaT1lLnNsaWRlcyxzPWUucHJvZ3Jlc3MsYT1lLnNuYXBHcmlkO3QuY2hpbGRyZW4oXCJbZGF0YS1zd2lwZXItcGFyYWxsYXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC15XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LW9wYWNpdHldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtc2NhbGVdXCIpLmVhY2goKGZ1bmN0aW9uKHQsaSl7ZS5wYXJhbGxheC5zZXRUcmFuc2Zvcm0oaSxzKX0pKSxpLmVhY2goKGZ1bmN0aW9uKHQsaSl7dmFyIHI9aS5wcm9ncmVzcztlLnBhcmFtcy5zbGlkZXNQZXJHcm91cD4xJiZcImF1dG9cIiE9PWUucGFyYW1zLnNsaWRlc1BlclZpZXcmJihyKz1NYXRoLmNlaWwodC8yKS1zKihhLmxlbmd0aC0xKSkscj1NYXRoLm1pbihNYXRoLm1heChyLC0xKSwxKSxuKGkpLmZpbmQoXCJbZGF0YS1zd2lwZXItcGFyYWxsYXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC15XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LW9wYWNpdHldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtc2NhbGVdXCIpLmVhY2goKGZ1bmN0aW9uKHQsaSl7ZS5wYXJhbGxheC5zZXRUcmFuc2Zvcm0oaSxyKX0pKX0pKX0sc2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlKXt2b2lkIDA9PT1lJiYoZT10aGlzLnBhcmFtcy5zcGVlZCk7dGhpcy4kZWwuZmluZChcIltkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZV1cIikuZWFjaCgoZnVuY3Rpb24odCxpKXt2YXIgcz1uKGkpLGE9cGFyc2VJbnQocy5hdHRyKFwiZGF0YS1zd2lwZXItcGFyYWxsYXgtZHVyYXRpb25cIiksMTApfHxlOzA9PT1lJiYoYT0wKSxzLnRyYW5zaXRpb24oYSl9KSl9fSxoZT17Z2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlczpmdW5jdGlvbihlKXtpZihlLnRhcmdldFRvdWNoZXMubGVuZ3RoPDIpcmV0dXJuIDE7dmFyIHQ9ZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYLGk9ZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZLHM9ZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VYLGE9ZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VZO3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cocy10LDIpK01hdGgucG93KGEtaSwyKSl9LG9uR2VzdHVyZVN0YXJ0OmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLnpvb20saT10aGlzLnpvb20scz1pLmdlc3R1cmU7aWYoaS5mYWtlR2VzdHVyZVRvdWNoZWQ9ITEsaS5mYWtlR2VzdHVyZU1vdmVkPSExLCFoLmdlc3R1cmVzKXtpZihcInRvdWNoc3RhcnRcIiE9PWUudHlwZXx8XCJ0b3VjaHN0YXJ0XCI9PT1lLnR5cGUmJmUudGFyZ2V0VG91Y2hlcy5sZW5ndGg8MilyZXR1cm47aS5mYWtlR2VzdHVyZVRvdWNoZWQ9ITAscy5zY2FsZVN0YXJ0PWhlLmdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSl9cy4kc2xpZGVFbCYmcy4kc2xpZGVFbC5sZW5ndGh8fChzLiRzbGlkZUVsPW4oZS50YXJnZXQpLmNsb3Nlc3QoXCIuXCIrdGhpcy5wYXJhbXMuc2xpZGVDbGFzcyksMD09PXMuJHNsaWRlRWwubGVuZ3RoJiYocy4kc2xpZGVFbD10aGlzLnNsaWRlcy5lcSh0aGlzLmFjdGl2ZUluZGV4KSkscy4kaW1hZ2VFbD1zLiRzbGlkZUVsLmZpbmQoXCJpbWcsIHN2ZywgY2FudmFzLCBwaWN0dXJlLCAuc3dpcGVyLXpvb20tdGFyZ2V0XCIpLHMuJGltYWdlV3JhcEVsPXMuJGltYWdlRWwucGFyZW50KFwiLlwiK3QuY29udGFpbmVyQ2xhc3MpLHMubWF4UmF0aW89cy4kaW1hZ2VXcmFwRWwuYXR0cihcImRhdGEtc3dpcGVyLXpvb21cIil8fHQubWF4UmF0aW8sMCE9PXMuJGltYWdlV3JhcEVsLmxlbmd0aCk/KHMuJGltYWdlRWwmJnMuJGltYWdlRWwudHJhbnNpdGlvbigwKSx0aGlzLnpvb20uaXNTY2FsaW5nPSEwKTpzLiRpbWFnZUVsPXZvaWQgMH0sb25HZXN0dXJlQ2hhbmdlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLnpvb20saT10aGlzLnpvb20scz1pLmdlc3R1cmU7aWYoIWguZ2VzdHVyZXMpe2lmKFwidG91Y2htb3ZlXCIhPT1lLnR5cGV8fFwidG91Y2htb3ZlXCI9PT1lLnR5cGUmJmUudGFyZ2V0VG91Y2hlcy5sZW5ndGg8MilyZXR1cm47aS5mYWtlR2VzdHVyZU1vdmVkPSEwLHMuc2NhbGVNb3ZlPWhlLmdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSl9cy4kaW1hZ2VFbCYmMCE9PXMuJGltYWdlRWwubGVuZ3RoJiYoaS5zY2FsZT1oLmdlc3R1cmVzP2Uuc2NhbGUqaS5jdXJyZW50U2NhbGU6cy5zY2FsZU1vdmUvcy5zY2FsZVN0YXJ0KmkuY3VycmVudFNjYWxlLGkuc2NhbGU+cy5tYXhSYXRpbyYmKGkuc2NhbGU9cy5tYXhSYXRpby0xK01hdGgucG93KGkuc2NhbGUtcy5tYXhSYXRpbysxLC41KSksaS5zY2FsZTx0Lm1pblJhdGlvJiYoaS5zY2FsZT10Lm1pblJhdGlvKzEtTWF0aC5wb3codC5taW5SYXRpby1pLnNjYWxlKzEsLjUpKSxzLiRpbWFnZUVsLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZShcIitpLnNjYWxlK1wiKVwiKSl9LG9uR2VzdHVyZUVuZDpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnBhcmFtcy56b29tLGk9dGhpcy56b29tLHM9aS5nZXN0dXJlO2lmKCFoLmdlc3R1cmVzKXtpZighaS5mYWtlR2VzdHVyZVRvdWNoZWR8fCFpLmZha2VHZXN0dXJlTW92ZWQpcmV0dXJuO2lmKFwidG91Y2hlbmRcIiE9PWUudHlwZXx8XCJ0b3VjaGVuZFwiPT09ZS50eXBlJiZlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDwyJiYhQS5hbmRyb2lkKXJldHVybjtpLmZha2VHZXN0dXJlVG91Y2hlZD0hMSxpLmZha2VHZXN0dXJlTW92ZWQ9ITF9cy4kaW1hZ2VFbCYmMCE9PXMuJGltYWdlRWwubGVuZ3RoJiYoaS5zY2FsZT1NYXRoLm1heChNYXRoLm1pbihpLnNjYWxlLHMubWF4UmF0aW8pLHQubWluUmF0aW8pLHMuJGltYWdlRWwudHJhbnNpdGlvbih0aGlzLnBhcmFtcy5zcGVlZCkudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKFwiK2kuc2NhbGUrXCIpXCIpLGkuY3VycmVudFNjYWxlPWkuc2NhbGUsaS5pc1NjYWxpbmc9ITEsMT09PWkuc2NhbGUmJihzLiRzbGlkZUVsPXZvaWQgMCkpfSxvblRvdWNoU3RhcnQ6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy56b29tLGk9dC5nZXN0dXJlLHM9dC5pbWFnZTtpLiRpbWFnZUVsJiYwIT09aS4kaW1hZ2VFbC5sZW5ndGgmJihzLmlzVG91Y2hlZHx8KEEuYW5kcm9pZCYmZS5jYW5jZWxhYmxlJiZlLnByZXZlbnREZWZhdWx0KCkscy5pc1RvdWNoZWQ9ITAscy50b3VjaGVzU3RhcnQueD1cInRvdWNoc3RhcnRcIj09PWUudHlwZT9lLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg6ZS5wYWdlWCxzLnRvdWNoZXNTdGFydC55PVwidG91Y2hzdGFydFwiPT09ZS50eXBlP2UudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTplLnBhZ2VZKSl9LG9uVG91Y2hNb3ZlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuem9vbSxpPXQuZ2VzdHVyZSxzPXQuaW1hZ2UsYT10LnZlbG9jaXR5O2lmKGkuJGltYWdlRWwmJjAhPT1pLiRpbWFnZUVsLmxlbmd0aCYmKHRoaXMuYWxsb3dDbGljaz0hMSxzLmlzVG91Y2hlZCYmaS4kc2xpZGVFbCkpe3MuaXNNb3ZlZHx8KHMud2lkdGg9aS4kaW1hZ2VFbFswXS5vZmZzZXRXaWR0aCxzLmhlaWdodD1pLiRpbWFnZUVsWzBdLm9mZnNldEhlaWdodCxzLnN0YXJ0WD1kLmdldFRyYW5zbGF0ZShpLiRpbWFnZVdyYXBFbFswXSxcInhcIil8fDAscy5zdGFydFk9ZC5nZXRUcmFuc2xhdGUoaS4kaW1hZ2VXcmFwRWxbMF0sXCJ5XCIpfHwwLGkuc2xpZGVXaWR0aD1pLiRzbGlkZUVsWzBdLm9mZnNldFdpZHRoLGkuc2xpZGVIZWlnaHQ9aS4kc2xpZGVFbFswXS5vZmZzZXRIZWlnaHQsaS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbigwKSx0aGlzLnJ0bCYmKHMuc3RhcnRYPS1zLnN0YXJ0WCxzLnN0YXJ0WT0tcy5zdGFydFkpKTt2YXIgcj1zLndpZHRoKnQuc2NhbGUsbj1zLmhlaWdodCp0LnNjYWxlO2lmKCEocjxpLnNsaWRlV2lkdGgmJm48aS5zbGlkZUhlaWdodCkpe2lmKHMubWluWD1NYXRoLm1pbihpLnNsaWRlV2lkdGgvMi1yLzIsMCkscy5tYXhYPS1zLm1pblgscy5taW5ZPU1hdGgubWluKGkuc2xpZGVIZWlnaHQvMi1uLzIsMCkscy5tYXhZPS1zLm1pblkscy50b3VjaGVzQ3VycmVudC54PVwidG91Y2htb3ZlXCI9PT1lLnR5cGU/ZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYOmUucGFnZVgscy50b3VjaGVzQ3VycmVudC55PVwidG91Y2htb3ZlXCI9PT1lLnR5cGU/ZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZOmUucGFnZVksIXMuaXNNb3ZlZCYmIXQuaXNTY2FsaW5nKXtpZih0aGlzLmlzSG9yaXpvbnRhbCgpJiYoTWF0aC5mbG9vcihzLm1pblgpPT09TWF0aC5mbG9vcihzLnN0YXJ0WCkmJnMudG91Y2hlc0N1cnJlbnQueDxzLnRvdWNoZXNTdGFydC54fHxNYXRoLmZsb29yKHMubWF4WCk9PT1NYXRoLmZsb29yKHMuc3RhcnRYKSYmcy50b3VjaGVzQ3VycmVudC54PnMudG91Y2hlc1N0YXJ0LngpKXJldHVybiB2b2lkKHMuaXNUb3VjaGVkPSExKTtpZighdGhpcy5pc0hvcml6b250YWwoKSYmKE1hdGguZmxvb3Iocy5taW5ZKT09PU1hdGguZmxvb3Iocy5zdGFydFkpJiZzLnRvdWNoZXNDdXJyZW50Lnk8cy50b3VjaGVzU3RhcnQueXx8TWF0aC5mbG9vcihzLm1heFkpPT09TWF0aC5mbG9vcihzLnN0YXJ0WSkmJnMudG91Y2hlc0N1cnJlbnQueT5zLnRvdWNoZXNTdGFydC55KSlyZXR1cm4gdm9pZChzLmlzVG91Y2hlZD0hMSl9ZS5jYW5jZWxhYmxlJiZlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKSxzLmlzTW92ZWQ9ITAscy5jdXJyZW50WD1zLnRvdWNoZXNDdXJyZW50Lngtcy50b3VjaGVzU3RhcnQueCtzLnN0YXJ0WCxzLmN1cnJlbnRZPXMudG91Y2hlc0N1cnJlbnQueS1zLnRvdWNoZXNTdGFydC55K3Muc3RhcnRZLHMuY3VycmVudFg8cy5taW5YJiYocy5jdXJyZW50WD1zLm1pblgrMS1NYXRoLnBvdyhzLm1pblgtcy5jdXJyZW50WCsxLC44KSkscy5jdXJyZW50WD5zLm1heFgmJihzLmN1cnJlbnRYPXMubWF4WC0xK01hdGgucG93KHMuY3VycmVudFgtcy5tYXhYKzEsLjgpKSxzLmN1cnJlbnRZPHMubWluWSYmKHMuY3VycmVudFk9cy5taW5ZKzEtTWF0aC5wb3cocy5taW5ZLXMuY3VycmVudFkrMSwuOCkpLHMuY3VycmVudFk+cy5tYXhZJiYocy5jdXJyZW50WT1zLm1heFktMStNYXRoLnBvdyhzLmN1cnJlbnRZLXMubWF4WSsxLC44KSksYS5wcmV2UG9zaXRpb25YfHwoYS5wcmV2UG9zaXRpb25YPXMudG91Y2hlc0N1cnJlbnQueCksYS5wcmV2UG9zaXRpb25ZfHwoYS5wcmV2UG9zaXRpb25ZPXMudG91Y2hlc0N1cnJlbnQueSksYS5wcmV2VGltZXx8KGEucHJldlRpbWU9RGF0ZS5ub3coKSksYS54PShzLnRvdWNoZXNDdXJyZW50LngtYS5wcmV2UG9zaXRpb25YKS8oRGF0ZS5ub3coKS1hLnByZXZUaW1lKS8yLGEueT0ocy50b3VjaGVzQ3VycmVudC55LWEucHJldlBvc2l0aW9uWSkvKERhdGUubm93KCktYS5wcmV2VGltZSkvMixNYXRoLmFicyhzLnRvdWNoZXNDdXJyZW50LngtYS5wcmV2UG9zaXRpb25YKTwyJiYoYS54PTApLE1hdGguYWJzKHMudG91Y2hlc0N1cnJlbnQueS1hLnByZXZQb3NpdGlvblkpPDImJihhLnk9MCksYS5wcmV2UG9zaXRpb25YPXMudG91Y2hlc0N1cnJlbnQueCxhLnByZXZQb3NpdGlvblk9cy50b3VjaGVzQ3VycmVudC55LGEucHJldlRpbWU9RGF0ZS5ub3coKSxpLiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZChcIitzLmN1cnJlbnRYK1wicHgsIFwiK3MuY3VycmVudFkrXCJweCwwKVwiKX19fSxvblRvdWNoRW5kOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy56b29tLHQ9ZS5nZXN0dXJlLGk9ZS5pbWFnZSxzPWUudmVsb2NpdHk7aWYodC4kaW1hZ2VFbCYmMCE9PXQuJGltYWdlRWwubGVuZ3RoKXtpZighaS5pc1RvdWNoZWR8fCFpLmlzTW92ZWQpcmV0dXJuIGkuaXNUb3VjaGVkPSExLHZvaWQoaS5pc01vdmVkPSExKTtpLmlzVG91Y2hlZD0hMSxpLmlzTW92ZWQ9ITE7dmFyIGE9MzAwLHI9MzAwLG49cy54KmEsbz1pLmN1cnJlbnRYK24sbD1zLnkqcixkPWkuY3VycmVudFkrbDswIT09cy54JiYoYT1NYXRoLmFicygoby1pLmN1cnJlbnRYKS9zLngpKSwwIT09cy55JiYocj1NYXRoLmFicygoZC1pLmN1cnJlbnRZKS9zLnkpKTt2YXIgaD1NYXRoLm1heChhLHIpO2kuY3VycmVudFg9byxpLmN1cnJlbnRZPWQ7dmFyIHA9aS53aWR0aCplLnNjYWxlLGM9aS5oZWlnaHQqZS5zY2FsZTtpLm1pblg9TWF0aC5taW4odC5zbGlkZVdpZHRoLzItcC8yLDApLGkubWF4WD0taS5taW5YLGkubWluWT1NYXRoLm1pbih0LnNsaWRlSGVpZ2h0LzItYy8yLDApLGkubWF4WT0taS5taW5ZLGkuY3VycmVudFg9TWF0aC5tYXgoTWF0aC5taW4oaS5jdXJyZW50WCxpLm1heFgpLGkubWluWCksaS5jdXJyZW50WT1NYXRoLm1heChNYXRoLm1pbihpLmN1cnJlbnRZLGkubWF4WSksaS5taW5ZKSx0LiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKGgpLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKFwiK2kuY3VycmVudFgrXCJweCwgXCIraS5jdXJyZW50WStcInB4LDApXCIpfX0sb25UcmFuc2l0aW9uRW5kOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy56b29tLHQ9ZS5nZXN0dXJlO3QuJHNsaWRlRWwmJnRoaXMucHJldmlvdXNJbmRleCE9PXRoaXMuYWN0aXZlSW5kZXgmJih0LiRpbWFnZUVsJiZ0LiRpbWFnZUVsLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgxKVwiKSx0LiRpbWFnZVdyYXBFbCYmdC4kaW1hZ2VXcmFwRWwudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMCwwLDApXCIpLGUuc2NhbGU9MSxlLmN1cnJlbnRTY2FsZT0xLHQuJHNsaWRlRWw9dm9pZCAwLHQuJGltYWdlRWw9dm9pZCAwLHQuJGltYWdlV3JhcEVsPXZvaWQgMCl9LHRvZ2dsZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnpvb207dC5zY2FsZSYmMSE9PXQuc2NhbGU/dC5vdXQoKTp0LmluKGUpfSxpbjpmdW5jdGlvbihlKXt2YXIgdCxpLHMsYSxyLG4sbyxsLGQsaCxwLGMsdSx2LGYsbSxnPXRoaXMuem9vbSxiPXRoaXMucGFyYW1zLnpvb20sdz1nLmdlc3R1cmUseT1nLmltYWdlOyh3LiRzbGlkZUVsfHwodGhpcy5wYXJhbXMudmlydHVhbCYmdGhpcy5wYXJhbXMudmlydHVhbC5lbmFibGVkJiZ0aGlzLnZpcnR1YWw/dy4kc2xpZGVFbD10aGlzLiR3cmFwcGVyRWwuY2hpbGRyZW4oXCIuXCIrdGhpcy5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyk6dy4kc2xpZGVFbD10aGlzLnNsaWRlcy5lcSh0aGlzLmFjdGl2ZUluZGV4KSx3LiRpbWFnZUVsPXcuJHNsaWRlRWwuZmluZChcImltZywgc3ZnLCBjYW52YXMsIHBpY3R1cmUsIC5zd2lwZXItem9vbS10YXJnZXRcIiksdy4kaW1hZ2VXcmFwRWw9dy4kaW1hZ2VFbC5wYXJlbnQoXCIuXCIrYi5jb250YWluZXJDbGFzcykpLHcuJGltYWdlRWwmJjAhPT13LiRpbWFnZUVsLmxlbmd0aCkmJih3LiRzbGlkZUVsLmFkZENsYXNzKFwiXCIrYi56b29tZWRTbGlkZUNsYXNzKSx2b2lkIDA9PT15LnRvdWNoZXNTdGFydC54JiZlPyh0PVwidG91Y2hlbmRcIj09PWUudHlwZT9lLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYOmUucGFnZVgsaT1cInRvdWNoZW5kXCI9PT1lLnR5cGU/ZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTplLnBhZ2VZKToodD15LnRvdWNoZXNTdGFydC54LGk9eS50b3VjaGVzU3RhcnQueSksZy5zY2FsZT13LiRpbWFnZVdyYXBFbC5hdHRyKFwiZGF0YS1zd2lwZXItem9vbVwiKXx8Yi5tYXhSYXRpbyxnLmN1cnJlbnRTY2FsZT13LiRpbWFnZVdyYXBFbC5hdHRyKFwiZGF0YS1zd2lwZXItem9vbVwiKXx8Yi5tYXhSYXRpbyxlPyhmPXcuJHNsaWRlRWxbMF0ub2Zmc2V0V2lkdGgsbT13LiRzbGlkZUVsWzBdLm9mZnNldEhlaWdodCxzPXcuJHNsaWRlRWwub2Zmc2V0KCkubGVmdCtmLzItdCxhPXcuJHNsaWRlRWwub2Zmc2V0KCkudG9wK20vMi1pLG89dy4kaW1hZ2VFbFswXS5vZmZzZXRXaWR0aCxsPXcuJGltYWdlRWxbMF0ub2Zmc2V0SGVpZ2h0LGQ9bypnLnNjYWxlLGg9bCpnLnNjYWxlLHU9LShwPU1hdGgubWluKGYvMi1kLzIsMCkpLHY9LShjPU1hdGgubWluKG0vMi1oLzIsMCkpLChyPXMqZy5zY2FsZSk8cCYmKHI9cCkscj51JiYocj11KSwobj1hKmcuc2NhbGUpPGMmJihuPWMpLG4+diYmKG49dikpOihyPTAsbj0wKSx3LiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoXCIrcitcInB4LCBcIituK1wicHgsMClcIiksdy4kaW1hZ2VFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKFwiK2cuc2NhbGUrXCIpXCIpKX0sb3V0OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy56b29tLHQ9dGhpcy5wYXJhbXMuem9vbSxpPWUuZ2VzdHVyZTtpLiRzbGlkZUVsfHwodGhpcy5wYXJhbXMudmlydHVhbCYmdGhpcy5wYXJhbXMudmlydHVhbC5lbmFibGVkJiZ0aGlzLnZpcnR1YWw/aS4kc2xpZGVFbD10aGlzLiR3cmFwcGVyRWwuY2hpbGRyZW4oXCIuXCIrdGhpcy5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyk6aS4kc2xpZGVFbD10aGlzLnNsaWRlcy5lcSh0aGlzLmFjdGl2ZUluZGV4KSxpLiRpbWFnZUVsPWkuJHNsaWRlRWwuZmluZChcImltZywgc3ZnLCBjYW52YXMsIHBpY3R1cmUsIC5zd2lwZXItem9vbS10YXJnZXRcIiksaS4kaW1hZ2VXcmFwRWw9aS4kaW1hZ2VFbC5wYXJlbnQoXCIuXCIrdC5jb250YWluZXJDbGFzcykpLGkuJGltYWdlRWwmJjAhPT1pLiRpbWFnZUVsLmxlbmd0aCYmKGUuc2NhbGU9MSxlLmN1cnJlbnRTY2FsZT0xLGkuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwLDAsMClcIiksaS4kaW1hZ2VFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpXCIpLGkuJHNsaWRlRWwucmVtb3ZlQ2xhc3MoXCJcIit0Lnpvb21lZFNsaWRlQ2xhc3MpLGkuJHNsaWRlRWw9dm9pZCAwKX0sZW5hYmxlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy56b29tO2lmKCFlLmVuYWJsZWQpe2UuZW5hYmxlZD0hMDt2YXIgdD0hKFwidG91Y2hzdGFydFwiIT09dGhpcy50b3VjaEV2ZW50cy5zdGFydHx8IWgucGFzc2l2ZUxpc3RlbmVyfHwhdGhpcy5wYXJhbXMucGFzc2l2ZUxpc3RlbmVycykmJntwYXNzaXZlOiEwLGNhcHR1cmU6ITF9LGk9IWgucGFzc2l2ZUxpc3RlbmVyfHx7cGFzc2l2ZTohMSxjYXB0dXJlOiEwfSxzPVwiLlwiK3RoaXMucGFyYW1zLnNsaWRlQ2xhc3M7aC5nZXN0dXJlcz8odGhpcy4kd3JhcHBlckVsLm9uKFwiZ2VzdHVyZXN0YXJ0XCIscyxlLm9uR2VzdHVyZVN0YXJ0LHQpLHRoaXMuJHdyYXBwZXJFbC5vbihcImdlc3R1cmVjaGFuZ2VcIixzLGUub25HZXN0dXJlQ2hhbmdlLHQpLHRoaXMuJHdyYXBwZXJFbC5vbihcImdlc3R1cmVlbmRcIixzLGUub25HZXN0dXJlRW5kLHQpKTpcInRvdWNoc3RhcnRcIj09PXRoaXMudG91Y2hFdmVudHMuc3RhcnQmJih0aGlzLiR3cmFwcGVyRWwub24odGhpcy50b3VjaEV2ZW50cy5zdGFydCxzLGUub25HZXN0dXJlU3RhcnQsdCksdGhpcy4kd3JhcHBlckVsLm9uKHRoaXMudG91Y2hFdmVudHMubW92ZSxzLGUub25HZXN0dXJlQ2hhbmdlLGkpLHRoaXMuJHdyYXBwZXJFbC5vbih0aGlzLnRvdWNoRXZlbnRzLmVuZCxzLGUub25HZXN0dXJlRW5kLHQpLHRoaXMudG91Y2hFdmVudHMuY2FuY2VsJiZ0aGlzLiR3cmFwcGVyRWwub24odGhpcy50b3VjaEV2ZW50cy5jYW5jZWwscyxlLm9uR2VzdHVyZUVuZCx0KSksdGhpcy4kd3JhcHBlckVsLm9uKHRoaXMudG91Y2hFdmVudHMubW92ZSxcIi5cIit0aGlzLnBhcmFtcy56b29tLmNvbnRhaW5lckNsYXNzLGUub25Ub3VjaE1vdmUsaSl9fSxkaXNhYmxlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy56b29tO2lmKGUuZW5hYmxlZCl7dGhpcy56b29tLmVuYWJsZWQ9ITE7dmFyIHQ9IShcInRvdWNoc3RhcnRcIiE9PXRoaXMudG91Y2hFdmVudHMuc3RhcnR8fCFoLnBhc3NpdmVMaXN0ZW5lcnx8IXRoaXMucGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMpJiZ7cGFzc2l2ZTohMCxjYXB0dXJlOiExfSxpPSFoLnBhc3NpdmVMaXN0ZW5lcnx8e3Bhc3NpdmU6ITEsY2FwdHVyZTohMH0scz1cIi5cIit0aGlzLnBhcmFtcy5zbGlkZUNsYXNzO2guZ2VzdHVyZXM/KHRoaXMuJHdyYXBwZXJFbC5vZmYoXCJnZXN0dXJlc3RhcnRcIixzLGUub25HZXN0dXJlU3RhcnQsdCksdGhpcy4kd3JhcHBlckVsLm9mZihcImdlc3R1cmVjaGFuZ2VcIixzLGUub25HZXN0dXJlQ2hhbmdlLHQpLHRoaXMuJHdyYXBwZXJFbC5vZmYoXCJnZXN0dXJlZW5kXCIscyxlLm9uR2VzdHVyZUVuZCx0KSk6XCJ0b3VjaHN0YXJ0XCI9PT10aGlzLnRvdWNoRXZlbnRzLnN0YXJ0JiYodGhpcy4kd3JhcHBlckVsLm9mZih0aGlzLnRvdWNoRXZlbnRzLnN0YXJ0LHMsZS5vbkdlc3R1cmVTdGFydCx0KSx0aGlzLiR3cmFwcGVyRWwub2ZmKHRoaXMudG91Y2hFdmVudHMubW92ZSxzLGUub25HZXN0dXJlQ2hhbmdlLGkpLHRoaXMuJHdyYXBwZXJFbC5vZmYodGhpcy50b3VjaEV2ZW50cy5lbmQscyxlLm9uR2VzdHVyZUVuZCx0KSx0aGlzLnRvdWNoRXZlbnRzLmNhbmNlbCYmdGhpcy4kd3JhcHBlckVsLm9mZih0aGlzLnRvdWNoRXZlbnRzLmNhbmNlbCxzLGUub25HZXN0dXJlRW5kLHQpKSx0aGlzLiR3cmFwcGVyRWwub2ZmKHRoaXMudG91Y2hFdmVudHMubW92ZSxcIi5cIit0aGlzLnBhcmFtcy56b29tLmNvbnRhaW5lckNsYXNzLGUub25Ub3VjaE1vdmUsaSl9fX0scGU9e2xvYWRJblNsaWRlOmZ1bmN0aW9uKGUsdCl7dm9pZCAwPT09dCYmKHQ9ITApO3ZhciBpPXRoaXMscz1pLnBhcmFtcy5sYXp5O2lmKHZvaWQgMCE9PWUmJjAhPT1pLnNsaWRlcy5sZW5ndGgpe3ZhciBhPWkudmlydHVhbCYmaS5wYXJhbXMudmlydHVhbC5lbmFibGVkP2kuJHdyYXBwZXJFbC5jaGlsZHJlbihcIi5cIitpLnBhcmFtcy5zbGlkZUNsYXNzKydbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK2UrJ1wiXScpOmkuc2xpZGVzLmVxKGUpLHI9YS5maW5kKFwiLlwiK3MuZWxlbWVudENsYXNzK1wiOm5vdCguXCIrcy5sb2FkZWRDbGFzcytcIik6bm90KC5cIitzLmxvYWRpbmdDbGFzcytcIilcIik7IWEuaGFzQ2xhc3Mocy5lbGVtZW50Q2xhc3MpfHxhLmhhc0NsYXNzKHMubG9hZGVkQ2xhc3MpfHxhLmhhc0NsYXNzKHMubG9hZGluZ0NsYXNzKXx8KHI9ci5hZGQoYVswXSkpLDAhPT1yLmxlbmd0aCYmci5lYWNoKChmdW5jdGlvbihlLHIpe3ZhciBvPW4ocik7by5hZGRDbGFzcyhzLmxvYWRpbmdDbGFzcyk7dmFyIGw9by5hdHRyKFwiZGF0YS1iYWNrZ3JvdW5kXCIpLGQ9by5hdHRyKFwiZGF0YS1zcmNcIiksaD1vLmF0dHIoXCJkYXRhLXNyY3NldFwiKSxwPW8uYXR0cihcImRhdGEtc2l6ZXNcIiksYz1vLnBhcmVudChcInBpY3R1cmVcIik7aS5sb2FkSW1hZ2Uob1swXSxkfHxsLGgscCwhMSwoZnVuY3Rpb24oKXtpZihudWxsIT1pJiZpJiYoIWl8fGkucGFyYW1zKSYmIWkuZGVzdHJveWVkKXtpZihsPyhvLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwndXJsKFwiJytsKydcIiknKSxvLnJlbW92ZUF0dHIoXCJkYXRhLWJhY2tncm91bmRcIikpOihoJiYoby5hdHRyKFwic3Jjc2V0XCIsaCksby5yZW1vdmVBdHRyKFwiZGF0YS1zcmNzZXRcIikpLHAmJihvLmF0dHIoXCJzaXplc1wiLHApLG8ucmVtb3ZlQXR0cihcImRhdGEtc2l6ZXNcIikpLGMubGVuZ3RoJiZjLmNoaWxkcmVuKFwic291cmNlXCIpLmVhY2goKGZ1bmN0aW9uKGUsdCl7dmFyIGk9bih0KTtpLmF0dHIoXCJkYXRhLXNyY3NldFwiKSYmKGkuYXR0cihcInNyY3NldFwiLGkuYXR0cihcImRhdGEtc3Jjc2V0XCIpKSxpLnJlbW92ZUF0dHIoXCJkYXRhLXNyY3NldFwiKSl9KSksZCYmKG8uYXR0cihcInNyY1wiLGQpLG8ucmVtb3ZlQXR0cihcImRhdGEtc3JjXCIpKSksby5hZGRDbGFzcyhzLmxvYWRlZENsYXNzKS5yZW1vdmVDbGFzcyhzLmxvYWRpbmdDbGFzcyksYS5maW5kKFwiLlwiK3MucHJlbG9hZGVyQ2xhc3MpLnJlbW92ZSgpLGkucGFyYW1zLmxvb3AmJnQpe3ZhciBlPWEuYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpO2lmKGEuaGFzQ2xhc3MoaS5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpe3ZhciByPWkuJHdyYXBwZXJFbC5jaGlsZHJlbignW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytlKydcIl06bm90KC4nK2kucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MrXCIpXCIpO2kubGF6eS5sb2FkSW5TbGlkZShyLmluZGV4KCksITEpfWVsc2V7dmFyIHU9aS4kd3JhcHBlckVsLmNoaWxkcmVuKFwiLlwiK2kucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MrJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrZSsnXCJdJyk7aS5sYXp5LmxvYWRJblNsaWRlKHUuaW5kZXgoKSwhMSl9fWkuZW1pdChcImxhenlJbWFnZVJlYWR5XCIsYVswXSxvWzBdKSxpLnBhcmFtcy5hdXRvSGVpZ2h0JiZpLnVwZGF0ZUF1dG9IZWlnaHQoKX19KSksaS5lbWl0KFwibGF6eUltYWdlTG9hZFwiLGFbMF0sb1swXSl9KSl9fSxsb2FkOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJHdyYXBwZXJFbCxpPWUucGFyYW1zLHM9ZS5zbGlkZXMsYT1lLmFjdGl2ZUluZGV4LHI9ZS52aXJ0dWFsJiZpLnZpcnR1YWwuZW5hYmxlZCxvPWkubGF6eSxsPWkuc2xpZGVzUGVyVmlldztmdW5jdGlvbiBkKGUpe2lmKHIpe2lmKHQuY2hpbGRyZW4oXCIuXCIraS5zbGlkZUNsYXNzKydbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK2UrJ1wiXScpLmxlbmd0aClyZXR1cm4hMH1lbHNlIGlmKHNbZV0pcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gaChlKXtyZXR1cm4gcj9uKGUpLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKTpuKGUpLmluZGV4KCl9aWYoXCJhdXRvXCI9PT1sJiYobD0wKSxlLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkfHwoZS5sYXp5LmluaXRpYWxJbWFnZUxvYWRlZD0hMCksZS5wYXJhbXMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KXQuY2hpbGRyZW4oXCIuXCIraS5zbGlkZVZpc2libGVDbGFzcykuZWFjaCgoZnVuY3Rpb24odCxpKXt2YXIgcz1yP24oaSkuYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpOm4oaSkuaW5kZXgoKTtlLmxhenkubG9hZEluU2xpZGUocyl9KSk7ZWxzZSBpZihsPjEpZm9yKHZhciBwPWE7cDxhK2w7cCs9MSlkKHApJiZlLmxhenkubG9hZEluU2xpZGUocCk7ZWxzZSBlLmxhenkubG9hZEluU2xpZGUoYSk7aWYoby5sb2FkUHJldk5leHQpaWYobD4xfHxvLmxvYWRQcmV2TmV4dEFtb3VudCYmby5sb2FkUHJldk5leHRBbW91bnQ+MSl7Zm9yKHZhciBjPW8ubG9hZFByZXZOZXh0QW1vdW50LHU9bCx2PU1hdGgubWluKGErdStNYXRoLm1heChjLHUpLHMubGVuZ3RoKSxmPU1hdGgubWF4KGEtTWF0aC5tYXgodSxjKSwwKSxtPWErbDttPHY7bSs9MSlkKG0pJiZlLmxhenkubG9hZEluU2xpZGUobSk7Zm9yKHZhciBnPWY7ZzxhO2crPTEpZChnKSYmZS5sYXp5LmxvYWRJblNsaWRlKGcpfWVsc2V7dmFyIGI9dC5jaGlsZHJlbihcIi5cIitpLnNsaWRlTmV4dENsYXNzKTtiLmxlbmd0aD4wJiZlLmxhenkubG9hZEluU2xpZGUoaChiKSk7dmFyIHc9dC5jaGlsZHJlbihcIi5cIitpLnNsaWRlUHJldkNsYXNzKTt3Lmxlbmd0aD4wJiZlLmxhenkubG9hZEluU2xpZGUoaCh3KSl9fX0sY2U9e0xpbmVhclNwbGluZTpmdW5jdGlvbihlLHQpe3ZhciBpLHMsYSxyLG4sbz1mdW5jdGlvbihlLHQpe2ZvcihzPS0xLGk9ZS5sZW5ndGg7aS1zPjE7KWVbYT1pK3M+PjFdPD10P3M9YTppPWE7cmV0dXJuIGl9O3JldHVybiB0aGlzLng9ZSx0aGlzLnk9dCx0aGlzLmxhc3RJbmRleD1lLmxlbmd0aC0xLHRoaXMuaW50ZXJwb2xhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIGU/KG49byh0aGlzLngsZSkscj1uLTEsKGUtdGhpcy54W3JdKSoodGhpcy55W25dLXRoaXMueVtyXSkvKHRoaXMueFtuXS10aGlzLnhbcl0pK3RoaXMueVtyXSk6MH0sdGhpc30sZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbjpmdW5jdGlvbihlKXt0aGlzLmNvbnRyb2xsZXIuc3BsaW5lfHwodGhpcy5jb250cm9sbGVyLnNwbGluZT10aGlzLnBhcmFtcy5sb29wP25ldyBjZS5MaW5lYXJTcGxpbmUodGhpcy5zbGlkZXNHcmlkLGUuc2xpZGVzR3JpZCk6bmV3IGNlLkxpbmVhclNwbGluZSh0aGlzLnNuYXBHcmlkLGUuc25hcEdyaWQpKX0sc2V0VHJhbnNsYXRlOmZ1bmN0aW9uKGUsdCl7dmFyIGkscyxhPXRoaXMscj1hLmNvbnRyb2xsZXIuY29udHJvbDtmdW5jdGlvbiBuKGUpe3ZhciB0PWEucnRsVHJhbnNsYXRlPy1hLnRyYW5zbGF0ZTphLnRyYW5zbGF0ZTtcInNsaWRlXCI9PT1hLnBhcmFtcy5jb250cm9sbGVyLmJ5JiYoYS5jb250cm9sbGVyLmdldEludGVycG9sYXRlRnVuY3Rpb24oZSkscz0tYS5jb250cm9sbGVyLnNwbGluZS5pbnRlcnBvbGF0ZSgtdCkpLHMmJlwiY29udGFpbmVyXCIhPT1hLnBhcmFtcy5jb250cm9sbGVyLmJ5fHwoaT0oZS5tYXhUcmFuc2xhdGUoKS1lLm1pblRyYW5zbGF0ZSgpKS8oYS5tYXhUcmFuc2xhdGUoKS1hLm1pblRyYW5zbGF0ZSgpKSxzPSh0LWEubWluVHJhbnNsYXRlKCkpKmkrZS5taW5UcmFuc2xhdGUoKSksYS5wYXJhbXMuY29udHJvbGxlci5pbnZlcnNlJiYocz1lLm1heFRyYW5zbGF0ZSgpLXMpLGUudXBkYXRlUHJvZ3Jlc3MocyksZS5zZXRUcmFuc2xhdGUocyxhKSxlLnVwZGF0ZUFjdGl2ZUluZGV4KCksZS51cGRhdGVTbGlkZXNDbGFzc2VzKCl9aWYoQXJyYXkuaXNBcnJheShyKSlmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rPTEpcltvXSE9PXQmJnJbb11pbnN0YW5jZW9mIGomJm4ocltvXSk7ZWxzZSByIGluc3RhbmNlb2YgaiYmdCE9PXImJm4ocil9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSx0KXt2YXIgaSxzPXRoaXMsYT1zLmNvbnRyb2xsZXIuY29udHJvbDtmdW5jdGlvbiByKHQpe3Quc2V0VHJhbnNpdGlvbihlLHMpLDAhPT1lJiYodC50cmFuc2l0aW9uU3RhcnQoKSx0LnBhcmFtcy5hdXRvSGVpZ2h0JiZkLm5leHRUaWNrKChmdW5jdGlvbigpe3QudXBkYXRlQXV0b0hlaWdodCgpfSkpLHQuJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKChmdW5jdGlvbigpe2EmJih0LnBhcmFtcy5sb29wJiZcInNsaWRlXCI9PT1zLnBhcmFtcy5jb250cm9sbGVyLmJ5JiZ0Lmxvb3BGaXgoKSx0LnRyYW5zaXRpb25FbmQoKSl9KSkpfWlmKEFycmF5LmlzQXJyYXkoYSkpZm9yKGk9MDtpPGEubGVuZ3RoO2krPTEpYVtpXSE9PXQmJmFbaV1pbnN0YW5jZW9mIGomJnIoYVtpXSk7ZWxzZSBhIGluc3RhbmNlb2YgaiYmdCE9PWEmJnIoYSl9fSx1ZT17bWFrZUVsRm9jdXNhYmxlOmZ1bmN0aW9uKGUpe3JldHVybiBlLmF0dHIoXCJ0YWJJbmRleFwiLFwiMFwiKSxlfSxtYWtlRWxOb3RGb2N1c2FibGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuYXR0cihcInRhYkluZGV4XCIsXCItMVwiKSxlfSxhZGRFbFJvbGU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5hdHRyKFwicm9sZVwiLHQpLGV9LGFkZEVsTGFiZWw6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5hdHRyKFwiYXJpYS1sYWJlbFwiLHQpLGV9LGRpc2FibGVFbDpmdW5jdGlvbihlKXtyZXR1cm4gZS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLCEwKSxlfSxlbmFibGVFbDpmdW5jdGlvbihlKXtyZXR1cm4gZS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLCExKSxlfSxvbkVudGVyS2V5OmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLmExMXk7aWYoMTM9PT1lLmtleUNvZGUpe3ZhciBpPW4oZS50YXJnZXQpO3RoaXMubmF2aWdhdGlvbiYmdGhpcy5uYXZpZ2F0aW9uLiRuZXh0RWwmJmkuaXModGhpcy5uYXZpZ2F0aW9uLiRuZXh0RWwpJiYodGhpcy5pc0VuZCYmIXRoaXMucGFyYW1zLmxvb3B8fHRoaXMuc2xpZGVOZXh0KCksdGhpcy5pc0VuZD90aGlzLmExMXkubm90aWZ5KHQubGFzdFNsaWRlTWVzc2FnZSk6dGhpcy5hMTF5Lm5vdGlmeSh0Lm5leHRTbGlkZU1lc3NhZ2UpKSx0aGlzLm5hdmlnYXRpb24mJnRoaXMubmF2aWdhdGlvbi4kcHJldkVsJiZpLmlzKHRoaXMubmF2aWdhdGlvbi4kcHJldkVsKSYmKHRoaXMuaXNCZWdpbm5pbmcmJiF0aGlzLnBhcmFtcy5sb29wfHx0aGlzLnNsaWRlUHJldigpLHRoaXMuaXNCZWdpbm5pbmc/dGhpcy5hMTF5Lm5vdGlmeSh0LmZpcnN0U2xpZGVNZXNzYWdlKTp0aGlzLmExMXkubm90aWZ5KHQucHJldlNsaWRlTWVzc2FnZSkpLHRoaXMucGFnaW5hdGlvbiYmaS5pcyhcIi5cIit0aGlzLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKSYmaVswXS5jbGljaygpfX0sbm90aWZ5OmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuYTExeS5saXZlUmVnaW9uOzAhPT10Lmxlbmd0aCYmKHQuaHRtbChcIlwiKSx0Lmh0bWwoZSkpfSx1cGRhdGVOYXZpZ2F0aW9uOmZ1bmN0aW9uKCl7aWYoIXRoaXMucGFyYW1zLmxvb3AmJnRoaXMubmF2aWdhdGlvbil7dmFyIGU9dGhpcy5uYXZpZ2F0aW9uLHQ9ZS4kbmV4dEVsLGk9ZS4kcHJldkVsO2kmJmkubGVuZ3RoPjAmJih0aGlzLmlzQmVnaW5uaW5nPyh0aGlzLmExMXkuZGlzYWJsZUVsKGkpLHRoaXMuYTExeS5tYWtlRWxOb3RGb2N1c2FibGUoaSkpOih0aGlzLmExMXkuZW5hYmxlRWwoaSksdGhpcy5hMTF5Lm1ha2VFbEZvY3VzYWJsZShpKSkpLHQmJnQubGVuZ3RoPjAmJih0aGlzLmlzRW5kPyh0aGlzLmExMXkuZGlzYWJsZUVsKHQpLHRoaXMuYTExeS5tYWtlRWxOb3RGb2N1c2FibGUodCkpOih0aGlzLmExMXkuZW5hYmxlRWwodCksdGhpcy5hMTF5Lm1ha2VFbEZvY3VzYWJsZSh0KSkpfX0sdXBkYXRlUGFnaW5hdGlvbjpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLnBhcmFtcy5hMTF5O2UucGFnaW5hdGlvbiYmZS5wYXJhbXMucGFnaW5hdGlvbi5jbGlja2FibGUmJmUucGFnaW5hdGlvbi5idWxsZXRzJiZlLnBhZ2luYXRpb24uYnVsbGV0cy5sZW5ndGgmJmUucGFnaW5hdGlvbi5idWxsZXRzLmVhY2goKGZ1bmN0aW9uKGkscyl7dmFyIGE9bihzKTtlLmExMXkubWFrZUVsRm9jdXNhYmxlKGEpLGUuYTExeS5hZGRFbFJvbGUoYSxcImJ1dHRvblwiKSxlLmExMXkuYWRkRWxMYWJlbChhLHQucGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2UucmVwbGFjZSgvXFx7XFx7aW5kZXhcXH1cXH0vLGEuaW5kZXgoKSsxKSl9KSl9LGluaXQ6ZnVuY3Rpb24oKXt0aGlzLiRlbC5hcHBlbmQodGhpcy5hMTF5LmxpdmVSZWdpb24pO3ZhciBlLHQsaT10aGlzLnBhcmFtcy5hMTF5O3RoaXMubmF2aWdhdGlvbiYmdGhpcy5uYXZpZ2F0aW9uLiRuZXh0RWwmJihlPXRoaXMubmF2aWdhdGlvbi4kbmV4dEVsKSx0aGlzLm5hdmlnYXRpb24mJnRoaXMubmF2aWdhdGlvbi4kcHJldkVsJiYodD10aGlzLm5hdmlnYXRpb24uJHByZXZFbCksZSYmKHRoaXMuYTExeS5tYWtlRWxGb2N1c2FibGUoZSksdGhpcy5hMTF5LmFkZEVsUm9sZShlLFwiYnV0dG9uXCIpLHRoaXMuYTExeS5hZGRFbExhYmVsKGUsaS5uZXh0U2xpZGVNZXNzYWdlKSxlLm9uKFwia2V5ZG93blwiLHRoaXMuYTExeS5vbkVudGVyS2V5KSksdCYmKHRoaXMuYTExeS5tYWtlRWxGb2N1c2FibGUodCksdGhpcy5hMTF5LmFkZEVsUm9sZSh0LFwiYnV0dG9uXCIpLHRoaXMuYTExeS5hZGRFbExhYmVsKHQsaS5wcmV2U2xpZGVNZXNzYWdlKSx0Lm9uKFwia2V5ZG93blwiLHRoaXMuYTExeS5vbkVudGVyS2V5KSksdGhpcy5wYWdpbmF0aW9uJiZ0aGlzLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSYmdGhpcy5wYWdpbmF0aW9uLmJ1bGxldHMmJnRoaXMucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCYmdGhpcy5wYWdpbmF0aW9uLiRlbC5vbihcImtleWRvd25cIixcIi5cIit0aGlzLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzLHRoaXMuYTExeS5vbkVudGVyS2V5KX0sZGVzdHJveTpmdW5jdGlvbigpe3ZhciBlLHQ7dGhpcy5hMTF5LmxpdmVSZWdpb24mJnRoaXMuYTExeS5saXZlUmVnaW9uLmxlbmd0aD4wJiZ0aGlzLmExMXkubGl2ZVJlZ2lvbi5yZW1vdmUoKSx0aGlzLm5hdmlnYXRpb24mJnRoaXMubmF2aWdhdGlvbi4kbmV4dEVsJiYoZT10aGlzLm5hdmlnYXRpb24uJG5leHRFbCksdGhpcy5uYXZpZ2F0aW9uJiZ0aGlzLm5hdmlnYXRpb24uJHByZXZFbCYmKHQ9dGhpcy5uYXZpZ2F0aW9uLiRwcmV2RWwpLGUmJmUub2ZmKFwia2V5ZG93blwiLHRoaXMuYTExeS5vbkVudGVyS2V5KSx0JiZ0Lm9mZihcImtleWRvd25cIix0aGlzLmExMXkub25FbnRlcktleSksdGhpcy5wYWdpbmF0aW9uJiZ0aGlzLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSYmdGhpcy5wYWdpbmF0aW9uLmJ1bGxldHMmJnRoaXMucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCYmdGhpcy5wYWdpbmF0aW9uLiRlbC5vZmYoXCJrZXlkb3duXCIsXCIuXCIrdGhpcy5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcyx0aGlzLmExMXkub25FbnRlcktleSl9fSx2ZT17aW5pdDpmdW5jdGlvbigpe2lmKHRoaXMucGFyYW1zLmhpc3Rvcnkpe2lmKCFhLmhpc3Rvcnl8fCFhLmhpc3RvcnkucHVzaFN0YXRlKXJldHVybiB0aGlzLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQ9ITEsdm9pZCh0aGlzLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkPSEwKTt2YXIgZT10aGlzLmhpc3Rvcnk7ZS5pbml0aWFsaXplZD0hMCxlLnBhdGhzPXZlLmdldFBhdGhWYWx1ZXMoKSwoZS5wYXRocy5rZXl8fGUucGF0aHMudmFsdWUpJiYoZS5zY3JvbGxUb1NsaWRlKDAsZS5wYXRocy52YWx1ZSx0aGlzLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpLHRoaXMucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlfHxhLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLHRoaXMuaGlzdG9yeS5zZXRIaXN0b3J5UG9wU3RhdGUpKX19LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZXx8YS5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIix0aGlzLmhpc3Rvcnkuc2V0SGlzdG9yeVBvcFN0YXRlKX0sc2V0SGlzdG9yeVBvcFN0YXRlOmZ1bmN0aW9uKCl7dGhpcy5oaXN0b3J5LnBhdGhzPXZlLmdldFBhdGhWYWx1ZXMoKSx0aGlzLmhpc3Rvcnkuc2Nyb2xsVG9TbGlkZSh0aGlzLnBhcmFtcy5zcGVlZCx0aGlzLmhpc3RvcnkucGF0aHMudmFsdWUsITEpfSxnZXRQYXRoVmFsdWVzOmZ1bmN0aW9uKCl7dmFyIGU9YS5sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgxKS5zcGxpdChcIi9cIikuZmlsdGVyKChmdW5jdGlvbihlKXtyZXR1cm5cIlwiIT09ZX0pKSx0PWUubGVuZ3RoO3JldHVybntrZXk6ZVt0LTJdLHZhbHVlOmVbdC0xXX19LHNldEhpc3Rvcnk6ZnVuY3Rpb24oZSx0KXtpZih0aGlzLmhpc3RvcnkuaW5pdGlhbGl6ZWQmJnRoaXMucGFyYW1zLmhpc3RvcnkuZW5hYmxlZCl7dmFyIGk9dGhpcy5zbGlkZXMuZXEodCkscz12ZS5zbHVnaWZ5KGkuYXR0cihcImRhdGEtaGlzdG9yeVwiKSk7YS5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhlKXx8KHM9ZStcIi9cIitzKTt2YXIgcj1hLmhpc3Rvcnkuc3RhdGU7ciYmci52YWx1ZT09PXN8fCh0aGlzLnBhcmFtcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZT9hLmhpc3RvcnkucmVwbGFjZVN0YXRlKHt2YWx1ZTpzfSxudWxsLHMpOmEuaGlzdG9yeS5wdXNoU3RhdGUoe3ZhbHVlOnN9LG51bGwscykpfX0sc2x1Z2lmeTpmdW5jdGlvbihlKXtyZXR1cm4gZS50b1N0cmluZygpLnJlcGxhY2UoL1xccysvZyxcIi1cIikucmVwbGFjZSgvW15cXHctXSsvZyxcIlwiKS5yZXBsYWNlKC8tLSsvZyxcIi1cIikucmVwbGFjZSgvXi0rLyxcIlwiKS5yZXBsYWNlKC8tKyQvLFwiXCIpfSxzY3JvbGxUb1NsaWRlOmZ1bmN0aW9uKGUsdCxpKXtpZih0KWZvcih2YXIgcz0wLGE9dGhpcy5zbGlkZXMubGVuZ3RoO3M8YTtzKz0xKXt2YXIgcj10aGlzLnNsaWRlcy5lcShzKTtpZih2ZS5zbHVnaWZ5KHIuYXR0cihcImRhdGEtaGlzdG9yeVwiKSk9PT10JiYhci5oYXNDbGFzcyh0aGlzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSl7dmFyIG49ci5pbmRleCgpO3RoaXMuc2xpZGVUbyhuLGUsaSl9fWVsc2UgdGhpcy5zbGlkZVRvKDAsZSxpKX19LGZlPXtvbkhhc2hDYW5nZTpmdW5jdGlvbigpe3RoaXMuZW1pdChcImhhc2hDaGFuZ2VcIik7dmFyIGU9aS5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoXCIjXCIsXCJcIik7aWYoZSE9PXRoaXMuc2xpZGVzLmVxKHRoaXMuYWN0aXZlSW5kZXgpLmF0dHIoXCJkYXRhLWhhc2hcIikpe3ZhciB0PXRoaXMuJHdyYXBwZXJFbC5jaGlsZHJlbihcIi5cIit0aGlzLnBhcmFtcy5zbGlkZUNsYXNzKydbZGF0YS1oYXNoPVwiJytlKydcIl0nKS5pbmRleCgpO2lmKHZvaWQgMD09PXQpcmV0dXJuO3RoaXMuc2xpZGVUbyh0KX19LHNldEhhc2g6ZnVuY3Rpb24oKXtpZih0aGlzLmhhc2hOYXZpZ2F0aW9uLmluaXRpYWxpemVkJiZ0aGlzLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkKWlmKHRoaXMucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLnJlcGxhY2VTdGF0ZSYmYS5oaXN0b3J5JiZhLmhpc3RvcnkucmVwbGFjZVN0YXRlKWEuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCxudWxsLFwiI1wiK3RoaXMuc2xpZGVzLmVxKHRoaXMuYWN0aXZlSW5kZXgpLmF0dHIoXCJkYXRhLWhhc2hcIil8fFwiXCIpLHRoaXMuZW1pdChcImhhc2hTZXRcIik7ZWxzZXt2YXIgZT10aGlzLnNsaWRlcy5lcSh0aGlzLmFjdGl2ZUluZGV4KSx0PWUuYXR0cihcImRhdGEtaGFzaFwiKXx8ZS5hdHRyKFwiZGF0YS1oaXN0b3J5XCIpO2kubG9jYXRpb24uaGFzaD10fHxcIlwiLHRoaXMuZW1pdChcImhhc2hTZXRcIil9fSxpbml0OmZ1bmN0aW9uKCl7aWYoISghdGhpcy5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZHx8dGhpcy5wYXJhbXMuaGlzdG9yeSYmdGhpcy5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKSl7dGhpcy5oYXNoTmF2aWdhdGlvbi5pbml0aWFsaXplZD0hMDt2YXIgZT1pLmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIixcIlwiKTtpZihlKWZvcih2YXIgdD0wLHM9dGhpcy5zbGlkZXMubGVuZ3RoO3Q8czt0Kz0xKXt2YXIgcj10aGlzLnNsaWRlcy5lcSh0KTtpZigoci5hdHRyKFwiZGF0YS1oYXNoXCIpfHxyLmF0dHIoXCJkYXRhLWhpc3RvcnlcIikpPT09ZSYmIXIuaGFzQ2xhc3ModGhpcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpe3ZhciBvPXIuaW5kZXgoKTt0aGlzLnNsaWRlVG8obywwLHRoaXMucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwhMCl9fXRoaXMucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLndhdGNoU3RhdGUmJm4oYSkub24oXCJoYXNoY2hhbmdlXCIsdGhpcy5oYXNoTmF2aWdhdGlvbi5vbkhhc2hDYW5nZSl9fSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuaGFzaE5hdmlnYXRpb24ud2F0Y2hTdGF0ZSYmbihhKS5vZmYoXCJoYXNoY2hhbmdlXCIsdGhpcy5oYXNoTmF2aWdhdGlvbi5vbkhhc2hDYW5nZSl9fSxtZT17cnVuOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuc2xpZGVzLmVxKGUuYWN0aXZlSW5kZXgpLGk9ZS5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7dC5hdHRyKFwiZGF0YS1zd2lwZXItYXV0b3BsYXlcIikmJihpPXQuYXR0cihcImRhdGEtc3dpcGVyLWF1dG9wbGF5XCIpfHxlLnBhcmFtcy5hdXRvcGxheS5kZWxheSksY2xlYXJUaW1lb3V0KGUuYXV0b3BsYXkudGltZW91dCksZS5hdXRvcGxheS50aW1lb3V0PWQubmV4dFRpY2soKGZ1bmN0aW9uKCl7ZS5wYXJhbXMuYXV0b3BsYXkucmV2ZXJzZURpcmVjdGlvbj9lLnBhcmFtcy5sb29wPyhlLmxvb3BGaXgoKSxlLnNsaWRlUHJldihlLnBhcmFtcy5zcGVlZCwhMCwhMCksZS5lbWl0KFwiYXV0b3BsYXlcIikpOmUuaXNCZWdpbm5pbmc/ZS5wYXJhbXMuYXV0b3BsYXkuc3RvcE9uTGFzdFNsaWRlP2UuYXV0b3BsYXkuc3RvcCgpOihlLnNsaWRlVG8oZS5zbGlkZXMubGVuZ3RoLTEsZS5wYXJhbXMuc3BlZWQsITAsITApLGUuZW1pdChcImF1dG9wbGF5XCIpKTooZS5zbGlkZVByZXYoZS5wYXJhbXMuc3BlZWQsITAsITApLGUuZW1pdChcImF1dG9wbGF5XCIpKTplLnBhcmFtcy5sb29wPyhlLmxvb3BGaXgoKSxlLnNsaWRlTmV4dChlLnBhcmFtcy5zcGVlZCwhMCwhMCksZS5lbWl0KFwiYXV0b3BsYXlcIikpOmUuaXNFbmQ/ZS5wYXJhbXMuYXV0b3BsYXkuc3RvcE9uTGFzdFNsaWRlP2UuYXV0b3BsYXkuc3RvcCgpOihlLnNsaWRlVG8oMCxlLnBhcmFtcy5zcGVlZCwhMCwhMCksZS5lbWl0KFwiYXV0b3BsYXlcIikpOihlLnNsaWRlTmV4dChlLnBhcmFtcy5zcGVlZCwhMCwhMCksZS5lbWl0KFwiYXV0b3BsYXlcIikpLGUucGFyYW1zLmNzc01vZGUmJmUuYXV0b3BsYXkucnVubmluZyYmZS5hdXRvcGxheS5ydW4oKX0pLGkpfSxzdGFydDpmdW5jdGlvbigpe3JldHVybiB2b2lkIDA9PT10aGlzLmF1dG9wbGF5LnRpbWVvdXQmJighdGhpcy5hdXRvcGxheS5ydW5uaW5nJiYodGhpcy5hdXRvcGxheS5ydW5uaW5nPSEwLHRoaXMuZW1pdChcImF1dG9wbGF5U3RhcnRcIiksdGhpcy5hdXRvcGxheS5ydW4oKSwhMCkpfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuISF0aGlzLmF1dG9wbGF5LnJ1bm5pbmcmJih2b2lkIDAhPT10aGlzLmF1dG9wbGF5LnRpbWVvdXQmJih0aGlzLmF1dG9wbGF5LnRpbWVvdXQmJihjbGVhclRpbWVvdXQodGhpcy5hdXRvcGxheS50aW1lb3V0KSx0aGlzLmF1dG9wbGF5LnRpbWVvdXQ9dm9pZCAwKSx0aGlzLmF1dG9wbGF5LnJ1bm5pbmc9ITEsdGhpcy5lbWl0KFwiYXV0b3BsYXlTdG9wXCIpLCEwKSl9LHBhdXNlOmZ1bmN0aW9uKGUpe3RoaXMuYXV0b3BsYXkucnVubmluZyYmKHRoaXMuYXV0b3BsYXkucGF1c2VkfHwodGhpcy5hdXRvcGxheS50aW1lb3V0JiZjbGVhclRpbWVvdXQodGhpcy5hdXRvcGxheS50aW1lb3V0KSx0aGlzLmF1dG9wbGF5LnBhdXNlZD0hMCwwIT09ZSYmdGhpcy5wYXJhbXMuYXV0b3BsYXkud2FpdEZvclRyYW5zaXRpb24/KHRoaXMuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLHRoaXMuYXV0b3BsYXkub25UcmFuc2l0aW9uRW5kKSx0aGlzLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdFRyYW5zaXRpb25FbmRcIix0aGlzLmF1dG9wbGF5Lm9uVHJhbnNpdGlvbkVuZCkpOih0aGlzLmF1dG9wbGF5LnBhdXNlZD0hMSx0aGlzLmF1dG9wbGF5LnJ1bigpKSkpfX0sZ2U9e3NldFRyYW5zbGF0ZTpmdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLnNsaWRlcyx0PTA7dDxlLmxlbmd0aDt0Kz0xKXt2YXIgaT10aGlzLnNsaWRlcy5lcSh0KSxzPS1pWzBdLnN3aXBlclNsaWRlT2Zmc2V0O3RoaXMucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGV8fChzLT10aGlzLnRyYW5zbGF0ZSk7dmFyIGE9MDt0aGlzLmlzSG9yaXpvbnRhbCgpfHwoYT1zLHM9MCk7dmFyIHI9dGhpcy5wYXJhbXMuZmFkZUVmZmVjdC5jcm9zc0ZhZGU/TWF0aC5tYXgoMS1NYXRoLmFicyhpWzBdLnByb2dyZXNzKSwwKToxK01hdGgubWluKE1hdGgubWF4KGlbMF0ucHJvZ3Jlc3MsLTEpLDApO2kuY3NzKHtvcGFjaXR5OnJ9KS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZChcIitzK1wicHgsIFwiK2ErXCJweCwgMHB4KVwiKX19LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcyxpPXQuc2xpZGVzLHM9dC4kd3JhcHBlckVsO2lmKGkudHJhbnNpdGlvbihlKSx0LnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlJiYwIT09ZSl7dmFyIGE9ITE7aS50cmFuc2l0aW9uRW5kKChmdW5jdGlvbigpe2lmKCFhJiZ0JiYhdC5kZXN0cm95ZWQpe2E9ITAsdC5hbmltYXRpbmc9ITE7Zm9yKHZhciBlPVtcIndlYmtpdFRyYW5zaXRpb25FbmRcIixcInRyYW5zaXRpb25lbmRcIl0saT0wO2k8ZS5sZW5ndGg7aSs9MSlzLnRyaWdnZXIoZVtpXSl9fSkpfX19LGJlPXtzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXt2YXIgZSx0PXRoaXMuJGVsLGk9dGhpcy4kd3JhcHBlckVsLHM9dGhpcy5zbGlkZXMsYT10aGlzLndpZHRoLHI9dGhpcy5oZWlnaHQsbz10aGlzLnJ0bFRyYW5zbGF0ZSxsPXRoaXMuc2l6ZSxkPXRoaXMucGFyYW1zLmN1YmVFZmZlY3QsaD10aGlzLmlzSG9yaXpvbnRhbCgpLHA9dGhpcy52aXJ0dWFsJiZ0aGlzLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQsYz0wO2Quc2hhZG93JiYoaD8oMD09PShlPWkuZmluZChcIi5zd2lwZXItY3ViZS1zaGFkb3dcIikpLmxlbmd0aCYmKGU9bignPGRpdiBjbGFzcz1cInN3aXBlci1jdWJlLXNoYWRvd1wiPjwvZGl2PicpLGkuYXBwZW5kKGUpKSxlLmNzcyh7aGVpZ2h0OmErXCJweFwifSkpOjA9PT0oZT10LmZpbmQoXCIuc3dpcGVyLWN1YmUtc2hhZG93XCIpKS5sZW5ndGgmJihlPW4oJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKSx0LmFwcGVuZChlKSkpO2Zvcih2YXIgdT0wO3U8cy5sZW5ndGg7dSs9MSl7dmFyIHY9cy5lcSh1KSxmPXU7cCYmKGY9cGFyc2VJbnQodi5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIiksMTApKTt2YXIgbT05MCpmLGc9TWF0aC5mbG9vcihtLzM2MCk7byYmKG09LW0sZz1NYXRoLmZsb29yKC1tLzM2MCkpO3ZhciBiPU1hdGgubWF4KE1hdGgubWluKHZbMF0ucHJvZ3Jlc3MsMSksLTEpLHc9MCx5PTAseD0wO2YlND09MD8odz00Ki1nKmwseD0wKTooZi0xKSU0PT0wPyh3PTAseD00Ki1nKmwpOihmLTIpJTQ9PTA/KHc9bCs0KmcqbCx4PWwpOihmLTMpJTQ9PTAmJih3PS1sLHg9MypsKzQqbCpnKSxvJiYodz0tdyksaHx8KHk9dyx3PTApO3ZhciBFPVwicm90YXRlWChcIisoaD8wOi1tKStcImRlZykgcm90YXRlWShcIisoaD9tOjApK1wiZGVnKSB0cmFuc2xhdGUzZChcIit3K1wicHgsIFwiK3krXCJweCwgXCIreCtcInB4KVwiO2lmKGI8PTEmJmI+LTEmJihjPTkwKmYrOTAqYixvJiYoYz05MCotZi05MCpiKSksdi50cmFuc2Zvcm0oRSksZC5zbGlkZVNoYWRvd3Mpe3ZhciBUPWg/di5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdFwiKTp2LmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3BcIiksUz1oP3YuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0XCIpOnYuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbVwiKTswPT09VC5sZW5ndGgmJihUPW4oJzxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LScrKGg/XCJsZWZ0XCI6XCJ0b3BcIikrJ1wiPjwvZGl2PicpLHYuYXBwZW5kKFQpKSwwPT09Uy5sZW5ndGgmJihTPW4oJzxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LScrKGg/XCJyaWdodFwiOlwiYm90dG9tXCIpKydcIj48L2Rpdj4nKSx2LmFwcGVuZChTKSksVC5sZW5ndGgmJihUWzBdLnN0eWxlLm9wYWNpdHk9TWF0aC5tYXgoLWIsMCkpLFMubGVuZ3RoJiYoU1swXS5zdHlsZS5vcGFjaXR5PU1hdGgubWF4KGIsMCkpfX1pZihpLmNzcyh7XCItd2Via2l0LXRyYW5zZm9ybS1vcmlnaW5cIjpcIjUwJSA1MCUgLVwiK2wvMitcInB4XCIsXCItbW96LXRyYW5zZm9ybS1vcmlnaW5cIjpcIjUwJSA1MCUgLVwiK2wvMitcInB4XCIsXCItbXMtdHJhbnNmb3JtLW9yaWdpblwiOlwiNTAlIDUwJSAtXCIrbC8yK1wicHhcIixcInRyYW5zZm9ybS1vcmlnaW5cIjpcIjUwJSA1MCUgLVwiK2wvMitcInB4XCJ9KSxkLnNoYWRvdylpZihoKWUudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMHB4LCBcIisoYS8yK2Quc2hhZG93T2Zmc2V0KStcInB4LCBcIistYS8yK1wicHgpIHJvdGF0ZVgoOTBkZWcpIHJvdGF0ZVooMGRlZykgc2NhbGUoXCIrZC5zaGFkb3dTY2FsZStcIilcIik7ZWxzZXt2YXIgQz1NYXRoLmFicyhjKS05MCpNYXRoLmZsb29yKE1hdGguYWJzKGMpLzkwKSxNPTEuNS0oTWF0aC5zaW4oMipDKk1hdGguUEkvMzYwKS8yK01hdGguY29zKDIqQypNYXRoLlBJLzM2MCkvMiksUD1kLnNoYWRvd1NjYWxlLHo9ZC5zaGFkb3dTY2FsZS9NLGs9ZC5zaGFkb3dPZmZzZXQ7ZS50cmFuc2Zvcm0oXCJzY2FsZTNkKFwiK1ArXCIsIDEsIFwiK3orXCIpIHRyYW5zbGF0ZTNkKDBweCwgXCIrKHIvMitrKStcInB4LCBcIistci8yL3orXCJweCkgcm90YXRlWCgtOTBkZWcpXCIpfXZhciAkPV8uaXNTYWZhcml8fF8uaXNVaVdlYlZpZXc/LWwvMjowO2kudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMHB4LDAsXCIrJCtcInB4KSByb3RhdGVYKFwiKyh0aGlzLmlzSG9yaXpvbnRhbCgpPzA6YykrXCJkZWcpIHJvdGF0ZVkoXCIrKHRoaXMuaXNIb3Jpem9udGFsKCk/LWM6MCkrXCJkZWcpXCIpfSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuJGVsO3RoaXMuc2xpZGVzLnRyYW5zaXRpb24oZSkuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdFwiKS50cmFuc2l0aW9uKGUpLHRoaXMucGFyYW1zLmN1YmVFZmZlY3Quc2hhZG93JiYhdGhpcy5pc0hvcml6b250YWwoKSYmdC5maW5kKFwiLnN3aXBlci1jdWJlLXNoYWRvd1wiKS50cmFuc2l0aW9uKGUpfX0sd2U9e3NldFRyYW5zbGF0ZTpmdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLnNsaWRlcyx0PXRoaXMucnRsVHJhbnNsYXRlLGk9MDtpPGUubGVuZ3RoO2krPTEpe3ZhciBzPWUuZXEoaSksYT1zWzBdLnByb2dyZXNzO3RoaXMucGFyYW1zLmZsaXBFZmZlY3QubGltaXRSb3RhdGlvbiYmKGE9TWF0aC5tYXgoTWF0aC5taW4oc1swXS5wcm9ncmVzcywxKSwtMSkpO3ZhciByPS0xODAqYSxvPTAsbD0tc1swXS5zd2lwZXJTbGlkZU9mZnNldCxkPTA7aWYodGhpcy5pc0hvcml6b250YWwoKT90JiYocj0tcik6KGQ9bCxsPTAsbz0tcixyPTApLHNbMF0uc3R5bGUuekluZGV4PS1NYXRoLmFicyhNYXRoLnJvdW5kKGEpKStlLmxlbmd0aCx0aGlzLnBhcmFtcy5mbGlwRWZmZWN0LnNsaWRlU2hhZG93cyl7dmFyIGg9dGhpcy5pc0hvcml6b250YWwoKT9zLmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0XCIpOnMuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LXRvcFwiKSxwPXRoaXMuaXNIb3Jpem9udGFsKCk/cy5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHRcIik6cy5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tXCIpOzA9PT1oLmxlbmd0aCYmKGg9bignPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJysodGhpcy5pc0hvcml6b250YWwoKT9cImxlZnRcIjpcInRvcFwiKSsnXCI+PC9kaXY+Jykscy5hcHBlbmQoaCkpLDA9PT1wLmxlbmd0aCYmKHA9bignPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJysodGhpcy5pc0hvcml6b250YWwoKT9cInJpZ2h0XCI6XCJib3R0b21cIikrJ1wiPjwvZGl2PicpLHMuYXBwZW5kKHApKSxoLmxlbmd0aCYmKGhbMF0uc3R5bGUub3BhY2l0eT1NYXRoLm1heCgtYSwwKSkscC5sZW5ndGgmJihwWzBdLnN0eWxlLm9wYWNpdHk9TWF0aC5tYXgoYSwwKSl9cy50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZChcIitsK1wicHgsIFwiK2QrXCJweCwgMHB4KSByb3RhdGVYKFwiK28rXCJkZWcpIHJvdGF0ZVkoXCIrcitcImRlZylcIil9fSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMsaT10LnNsaWRlcyxzPXQuYWN0aXZlSW5kZXgsYT10LiR3cmFwcGVyRWw7aWYoaS50cmFuc2l0aW9uKGUpLmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnRcIikudHJhbnNpdGlvbihlKSx0LnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlJiYwIT09ZSl7dmFyIHI9ITE7aS5lcShzKS50cmFuc2l0aW9uRW5kKChmdW5jdGlvbigpe2lmKCFyJiZ0JiYhdC5kZXN0cm95ZWQpe3I9ITAsdC5hbmltYXRpbmc9ITE7Zm9yKHZhciBlPVtcIndlYmtpdFRyYW5zaXRpb25FbmRcIixcInRyYW5zaXRpb25lbmRcIl0saT0wO2k8ZS5sZW5ndGg7aSs9MSlhLnRyaWdnZXIoZVtpXSl9fSkpfX19LHllPXtzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcy53aWR0aCx0PXRoaXMuaGVpZ2h0LGk9dGhpcy5zbGlkZXMscz10aGlzLiR3cmFwcGVyRWwsYT10aGlzLnNsaWRlc1NpemVzR3JpZCxyPXRoaXMucGFyYW1zLmNvdmVyZmxvd0VmZmVjdCxvPXRoaXMuaXNIb3Jpem9udGFsKCksbD10aGlzLnRyYW5zbGF0ZSxkPW8/ZS8yLWw6dC8yLWwscD1vP3Iucm90YXRlOi1yLnJvdGF0ZSxjPXIuZGVwdGgsdT0wLHY9aS5sZW5ndGg7dTx2O3UrPTEpe3ZhciBmPWkuZXEodSksbT1hW3VdLGc9KGQtZlswXS5zd2lwZXJTbGlkZU9mZnNldC1tLzIpL20qci5tb2RpZmllcixiPW8/cCpnOjAsdz1vPzA6cCpnLHk9LWMqTWF0aC5hYnMoZykseD1yLnN0cmV0Y2g7XCJzdHJpbmdcIj09dHlwZW9mIHgmJi0xIT09eC5pbmRleE9mKFwiJVwiKSYmKHg9cGFyc2VGbG9hdChyLnN0cmV0Y2gpLzEwMCptKTt2YXIgRT1vPzA6eCpnLFQ9bz94Kmc6MDtNYXRoLmFicyhUKTwuMDAxJiYoVD0wKSxNYXRoLmFicyhFKTwuMDAxJiYoRT0wKSxNYXRoLmFicyh5KTwuMDAxJiYoeT0wKSxNYXRoLmFicyhiKTwuMDAxJiYoYj0wKSxNYXRoLmFicyh3KTwuMDAxJiYodz0wKTt2YXIgUz1cInRyYW5zbGF0ZTNkKFwiK1QrXCJweCxcIitFK1wicHgsXCIreStcInB4KSAgcm90YXRlWChcIit3K1wiZGVnKSByb3RhdGVZKFwiK2IrXCJkZWcpXCI7aWYoZi50cmFuc2Zvcm0oUyksZlswXS5zdHlsZS56SW5kZXg9MS1NYXRoLmFicyhNYXRoLnJvdW5kKGcpKSxyLnNsaWRlU2hhZG93cyl7dmFyIEM9bz9mLmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0XCIpOmYuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LXRvcFwiKSxNPW8/Zi5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHRcIik6Zi5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tXCIpOzA9PT1DLmxlbmd0aCYmKEM9bignPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJysobz9cImxlZnRcIjpcInRvcFwiKSsnXCI+PC9kaXY+JyksZi5hcHBlbmQoQykpLDA9PT1NLmxlbmd0aCYmKE09bignPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJysobz9cInJpZ2h0XCI6XCJib3R0b21cIikrJ1wiPjwvZGl2PicpLGYuYXBwZW5kKE0pKSxDLmxlbmd0aCYmKENbMF0uc3R5bGUub3BhY2l0eT1nPjA/ZzowKSxNLmxlbmd0aCYmKE1bMF0uc3R5bGUub3BhY2l0eT0tZz4wPy1nOjApfX0oaC5wb2ludGVyRXZlbnRzfHxoLnByZWZpeGVkUG9pbnRlckV2ZW50cykmJihzWzBdLnN0eWxlLnBlcnNwZWN0aXZlT3JpZ2luPWQrXCJweCA1MCVcIil9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7dGhpcy5zbGlkZXMudHJhbnNpdGlvbihlKS5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0XCIpLnRyYW5zaXRpb24oZSl9fSx4ZT17aW5pdDpmdW5jdGlvbigpe3ZhciBlPXRoaXMucGFyYW1zLnRodW1icyx0PXRoaXMuY29uc3RydWN0b3I7ZS5zd2lwZXIgaW5zdGFuY2VvZiB0Pyh0aGlzLnRodW1icy5zd2lwZXI9ZS5zd2lwZXIsZC5leHRlbmQodGhpcy50aHVtYnMuc3dpcGVyLm9yaWdpbmFsUGFyYW1zLHt3YXRjaFNsaWRlc1Byb2dyZXNzOiEwLHNsaWRlVG9DbGlja2VkU2xpZGU6ITF9KSxkLmV4dGVuZCh0aGlzLnRodW1icy5zd2lwZXIucGFyYW1zLHt3YXRjaFNsaWRlc1Byb2dyZXNzOiEwLHNsaWRlVG9DbGlja2VkU2xpZGU6ITF9KSk6ZC5pc09iamVjdChlLnN3aXBlcikmJih0aGlzLnRodW1icy5zd2lwZXI9bmV3IHQoZC5leHRlbmQoe30sZS5zd2lwZXIse3dhdGNoU2xpZGVzVmlzaWJpbGl0eTohMCx3YXRjaFNsaWRlc1Byb2dyZXNzOiEwLHNsaWRlVG9DbGlja2VkU2xpZGU6ITF9KSksdGhpcy50aHVtYnMuc3dpcGVyQ3JlYXRlZD0hMCksdGhpcy50aHVtYnMuc3dpcGVyLiRlbC5hZGRDbGFzcyh0aGlzLnBhcmFtcy50aHVtYnMudGh1bWJzQ29udGFpbmVyQ2xhc3MpLHRoaXMudGh1bWJzLnN3aXBlci5vbihcInRhcFwiLHRoaXMudGh1bWJzLm9uVGh1bWJDbGljayl9LG9uVGh1bWJDbGljazpmdW5jdGlvbigpe3ZhciBlPXRoaXMudGh1bWJzLnN3aXBlcjtpZihlKXt2YXIgdD1lLmNsaWNrZWRJbmRleCxpPWUuY2xpY2tlZFNsaWRlO2lmKCEoaSYmbihpKS5oYXNDbGFzcyh0aGlzLnBhcmFtcy50aHVtYnMuc2xpZGVUaHVtYkFjdGl2ZUNsYXNzKXx8bnVsbD09dCkpe3ZhciBzO2lmKHM9ZS5wYXJhbXMubG9vcD9wYXJzZUludChuKGUuY2xpY2tlZFNsaWRlKS5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIiksMTApOnQsdGhpcy5wYXJhbXMubG9vcCl7dmFyIGE9dGhpcy5hY3RpdmVJbmRleDt0aGlzLnNsaWRlcy5lcShhKS5oYXNDbGFzcyh0aGlzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSYmKHRoaXMubG9vcEZpeCgpLHRoaXMuX2NsaWVudExlZnQ9dGhpcy4kd3JhcHBlckVsWzBdLmNsaWVudExlZnQsYT10aGlzLmFjdGl2ZUluZGV4KTt2YXIgcj10aGlzLnNsaWRlcy5lcShhKS5wcmV2QWxsKCdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK3MrJ1wiXScpLmVxKDApLmluZGV4KCksbz10aGlzLnNsaWRlcy5lcShhKS5uZXh0QWxsKCdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK3MrJ1wiXScpLmVxKDApLmluZGV4KCk7cz12b2lkIDA9PT1yP286dm9pZCAwPT09bz9yOm8tYTxhLXI/bzpyfXRoaXMuc2xpZGVUbyhzKX19fSx1cGRhdGU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy50aHVtYnMuc3dpcGVyO2lmKHQpe3ZhciBpPVwiYXV0b1wiPT09dC5wYXJhbXMuc2xpZGVzUGVyVmlldz90LnNsaWRlc1BlclZpZXdEeW5hbWljKCk6dC5wYXJhbXMuc2xpZGVzUGVyVmlldyxzPXRoaXMucGFyYW1zLnRodW1icy5hdXRvU2Nyb2xsT2Zmc2V0LGE9cyYmIXQucGFyYW1zLmxvb3A7aWYodGhpcy5yZWFsSW5kZXghPT10LnJlYWxJbmRleHx8YSl7dmFyIHIsbixvPXQuYWN0aXZlSW5kZXg7aWYodC5wYXJhbXMubG9vcCl7dC5zbGlkZXMuZXEobykuaGFzQ2xhc3ModC5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykmJih0Lmxvb3BGaXgoKSx0Ll9jbGllbnRMZWZ0PXQuJHdyYXBwZXJFbFswXS5jbGllbnRMZWZ0LG89dC5hY3RpdmVJbmRleCk7dmFyIGw9dC5zbGlkZXMuZXEobykucHJldkFsbCgnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyt0aGlzLnJlYWxJbmRleCsnXCJdJykuZXEoMCkuaW5kZXgoKSxkPXQuc2xpZGVzLmVxKG8pLm5leHRBbGwoJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrdGhpcy5yZWFsSW5kZXgrJ1wiXScpLmVxKDApLmluZGV4KCk7cj12b2lkIDA9PT1sP2Q6dm9pZCAwPT09ZD9sOmQtbz09by1sP286ZC1vPG8tbD9kOmwsbj10aGlzLmFjdGl2ZUluZGV4PnRoaXMucHJldmlvdXNJbmRleD9cIm5leHRcIjpcInByZXZcIn1lbHNlIG49KHI9dGhpcy5yZWFsSW5kZXgpPnRoaXMucHJldmlvdXNJbmRleD9cIm5leHRcIjpcInByZXZcIjthJiYocis9XCJuZXh0XCI9PT1uP3M6LTEqcyksdC52aXNpYmxlU2xpZGVzSW5kZXhlcyYmdC52aXNpYmxlU2xpZGVzSW5kZXhlcy5pbmRleE9mKHIpPDAmJih0LnBhcmFtcy5jZW50ZXJlZFNsaWRlcz9yPXI+bz9yLU1hdGguZmxvb3IoaS8yKSsxOnIrTWF0aC5mbG9vcihpLzIpLTE6cj5vJiYocj1yLWkrMSksdC5zbGlkZVRvKHIsZT8wOnZvaWQgMCkpfXZhciBoPTEscD10aGlzLnBhcmFtcy50aHVtYnMuc2xpZGVUaHVtYkFjdGl2ZUNsYXNzO2lmKHRoaXMucGFyYW1zLnNsaWRlc1BlclZpZXc+MSYmIXRoaXMucGFyYW1zLmNlbnRlcmVkU2xpZGVzJiYoaD10aGlzLnBhcmFtcy5zbGlkZXNQZXJWaWV3KSx0aGlzLnBhcmFtcy50aHVtYnMubXVsdGlwbGVBY3RpdmVUaHVtYnN8fChoPTEpLGg9TWF0aC5mbG9vcihoKSx0LnNsaWRlcy5yZW1vdmVDbGFzcyhwKSx0LnBhcmFtcy5sb29wfHx0LnBhcmFtcy52aXJ0dWFsJiZ0LnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpZm9yKHZhciBjPTA7YzxoO2MrPTEpdC4kd3JhcHBlckVsLmNoaWxkcmVuKCdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInKyh0aGlzLnJlYWxJbmRleCtjKSsnXCJdJykuYWRkQ2xhc3MocCk7ZWxzZSBmb3IodmFyIHU9MDt1PGg7dSs9MSl0LnNsaWRlcy5lcSh0aGlzLnJlYWxJbmRleCt1KS5hZGRDbGFzcyhwKX19fSxFZT1bSyxVLFosUSxlZSxpZSxhZSx7bmFtZTpcIm1vdXNld2hlZWxcIixwYXJhbXM6e21vdXNld2hlZWw6e2VuYWJsZWQ6ITEscmVsZWFzZU9uRWRnZXM6ITEsaW52ZXJ0OiExLGZvcmNlVG9BeGlzOiExLHNlbnNpdGl2aXR5OjEsZXZlbnRzVGFyZ2VkOlwiY29udGFpbmVyXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHttb3VzZXdoZWVsOntlbmFibGVkOiExLGVuYWJsZTpyZS5lbmFibGUuYmluZCh0aGlzKSxkaXNhYmxlOnJlLmRpc2FibGUuYmluZCh0aGlzKSxoYW5kbGU6cmUuaGFuZGxlLmJpbmQodGhpcyksaGFuZGxlTW91c2VFbnRlcjpyZS5oYW5kbGVNb3VzZUVudGVyLmJpbmQodGhpcyksaGFuZGxlTW91c2VMZWF2ZTpyZS5oYW5kbGVNb3VzZUxlYXZlLmJpbmQodGhpcyksYW5pbWF0ZVNsaWRlcjpyZS5hbmltYXRlU2xpZGVyLmJpbmQodGhpcykscmVsZWFzZVNjcm9sbDpyZS5yZWxlYXNlU2Nyb2xsLmJpbmQodGhpcyksbGFzdFNjcm9sbFRpbWU6ZC5ub3coKSxsYXN0RXZlbnRCZWZvcmVTbmFwOnZvaWQgMCxyZWNlbnRXaGVlbEV2ZW50czpbXX19KX0sb246e2luaXQ6ZnVuY3Rpb24oKXshdGhpcy5wYXJhbXMubW91c2V3aGVlbC5lbmFibGVkJiZ0aGlzLnBhcmFtcy5jc3NNb2RlJiZ0aGlzLm1vdXNld2hlZWwuZGlzYWJsZSgpLHRoaXMucGFyYW1zLm1vdXNld2hlZWwuZW5hYmxlZCYmdGhpcy5tb3VzZXdoZWVsLmVuYWJsZSgpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuY3NzTW9kZSYmdGhpcy5tb3VzZXdoZWVsLmVuYWJsZSgpLHRoaXMubW91c2V3aGVlbC5lbmFibGVkJiZ0aGlzLm1vdXNld2hlZWwuZGlzYWJsZSgpfX19LHtuYW1lOlwibmF2aWdhdGlvblwiLHBhcmFtczp7bmF2aWdhdGlvbjp7bmV4dEVsOm51bGwscHJldkVsOm51bGwsaGlkZU9uQ2xpY2s6ITEsZGlzYWJsZWRDbGFzczpcInN3aXBlci1idXR0b24tZGlzYWJsZWRcIixoaWRkZW5DbGFzczpcInN3aXBlci1idXR0b24taGlkZGVuXCIsbG9ja0NsYXNzOlwic3dpcGVyLWJ1dHRvbi1sb2NrXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHtuYXZpZ2F0aW9uOntpbml0Om5lLmluaXQuYmluZCh0aGlzKSx1cGRhdGU6bmUudXBkYXRlLmJpbmQodGhpcyksZGVzdHJveTpuZS5kZXN0cm95LmJpbmQodGhpcyksb25OZXh0Q2xpY2s6bmUub25OZXh0Q2xpY2suYmluZCh0aGlzKSxvblByZXZDbGljazpuZS5vblByZXZDbGljay5iaW5kKHRoaXMpfX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMubmF2aWdhdGlvbi5pbml0KCksdGhpcy5uYXZpZ2F0aW9uLnVwZGF0ZSgpfSx0b0VkZ2U6ZnVuY3Rpb24oKXt0aGlzLm5hdmlnYXRpb24udXBkYXRlKCl9LGZyb21FZGdlOmZ1bmN0aW9uKCl7dGhpcy5uYXZpZ2F0aW9uLnVwZGF0ZSgpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5uYXZpZ2F0aW9uLmRlc3Ryb3koKX0sY2xpY2s6ZnVuY3Rpb24oZSl7dmFyIHQsaT10aGlzLm5hdmlnYXRpb24scz1pLiRuZXh0RWwsYT1pLiRwcmV2RWw7IXRoaXMucGFyYW1zLm5hdmlnYXRpb24uaGlkZU9uQ2xpY2t8fG4oZS50YXJnZXQpLmlzKGEpfHxuKGUudGFyZ2V0KS5pcyhzKXx8KHM/dD1zLmhhc0NsYXNzKHRoaXMucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpOmEmJih0PWEuaGFzQ2xhc3ModGhpcy5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcykpLCEwPT09dD90aGlzLmVtaXQoXCJuYXZpZ2F0aW9uU2hvd1wiLHRoaXMpOnRoaXMuZW1pdChcIm5hdmlnYXRpb25IaWRlXCIsdGhpcykscyYmcy50b2dnbGVDbGFzcyh0aGlzLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKSxhJiZhLnRvZ2dsZUNsYXNzKHRoaXMucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpKX19fSx7bmFtZTpcInBhZ2luYXRpb25cIixwYXJhbXM6e3BhZ2luYXRpb246e2VsOm51bGwsYnVsbGV0RWxlbWVudDpcInNwYW5cIixjbGlja2FibGU6ITEsaGlkZU9uQ2xpY2s6ITEscmVuZGVyQnVsbGV0Om51bGwscmVuZGVyUHJvZ3Jlc3NiYXI6bnVsbCxyZW5kZXJGcmFjdGlvbjpudWxsLHJlbmRlckN1c3RvbTpudWxsLHByb2dyZXNzYmFyT3Bwb3NpdGU6ITEsdHlwZTpcImJ1bGxldHNcIixkeW5hbWljQnVsbGV0czohMSxkeW5hbWljTWFpbkJ1bGxldHM6MSxmb3JtYXRGcmFjdGlvbkN1cnJlbnQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGZvcm1hdEZyYWN0aW9uVG90YWw6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGJ1bGxldENsYXNzOlwic3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0XCIsYnVsbGV0QWN0aXZlQ2xhc3M6XCJzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlXCIsbW9kaWZpZXJDbGFzczpcInN3aXBlci1wYWdpbmF0aW9uLVwiLGN1cnJlbnRDbGFzczpcInN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnRcIix0b3RhbENsYXNzOlwic3dpcGVyLXBhZ2luYXRpb24tdG90YWxcIixoaWRkZW5DbGFzczpcInN3aXBlci1wYWdpbmF0aW9uLWhpZGRlblwiLHByb2dyZXNzYmFyRmlsbENsYXNzOlwic3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItZmlsbFwiLHByb2dyZXNzYmFyT3Bwb3NpdGVDbGFzczpcInN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLW9wcG9zaXRlXCIsY2xpY2thYmxlQ2xhc3M6XCJzd2lwZXItcGFnaW5hdGlvbi1jbGlja2FibGVcIixsb2NrQ2xhc3M6XCJzd2lwZXItcGFnaW5hdGlvbi1sb2NrXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHtwYWdpbmF0aW9uOntpbml0Om9lLmluaXQuYmluZCh0aGlzKSxyZW5kZXI6b2UucmVuZGVyLmJpbmQodGhpcyksdXBkYXRlOm9lLnVwZGF0ZS5iaW5kKHRoaXMpLGRlc3Ryb3k6b2UuZGVzdHJveS5iaW5kKHRoaXMpLGR5bmFtaWNCdWxsZXRJbmRleDowfX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMucGFnaW5hdGlvbi5pbml0KCksdGhpcy5wYWdpbmF0aW9uLnJlbmRlcigpLHRoaXMucGFnaW5hdGlvbi51cGRhdGUoKX0sYWN0aXZlSW5kZXhDaGFuZ2U6ZnVuY3Rpb24oKXsodGhpcy5wYXJhbXMubG9vcHx8dm9pZCAwPT09dGhpcy5zbmFwSW5kZXgpJiZ0aGlzLnBhZ2luYXRpb24udXBkYXRlKCl9LHNuYXBJbmRleENoYW5nZTpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxvb3B8fHRoaXMucGFnaW5hdGlvbi51cGRhdGUoKX0sc2xpZGVzTGVuZ3RoQ2hhbmdlOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMubG9vcCYmKHRoaXMucGFnaW5hdGlvbi5yZW5kZXIoKSx0aGlzLnBhZ2luYXRpb24udXBkYXRlKCkpfSxzbmFwR3JpZExlbmd0aENoYW5nZTpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxvb3B8fCh0aGlzLnBhZ2luYXRpb24ucmVuZGVyKCksdGhpcy5wYWdpbmF0aW9uLnVwZGF0ZSgpKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMucGFnaW5hdGlvbi5kZXN0cm95KCl9LGNsaWNrOmZ1bmN0aW9uKGUpe3RoaXMucGFyYW1zLnBhZ2luYXRpb24uZWwmJnRoaXMucGFyYW1zLnBhZ2luYXRpb24uaGlkZU9uQ2xpY2smJnRoaXMucGFnaW5hdGlvbi4kZWwubGVuZ3RoPjAmJiFuKGUudGFyZ2V0KS5oYXNDbGFzcyh0aGlzLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKSYmKCEwPT09dGhpcy5wYWdpbmF0aW9uLiRlbC5oYXNDbGFzcyh0aGlzLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKT90aGlzLmVtaXQoXCJwYWdpbmF0aW9uU2hvd1wiLHRoaXMpOnRoaXMuZW1pdChcInBhZ2luYXRpb25IaWRlXCIsdGhpcyksdGhpcy5wYWdpbmF0aW9uLiRlbC50b2dnbGVDbGFzcyh0aGlzLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKSl9fX0se25hbWU6XCJzY3JvbGxiYXJcIixwYXJhbXM6e3Njcm9sbGJhcjp7ZWw6bnVsbCxkcmFnU2l6ZTpcImF1dG9cIixoaWRlOiExLGRyYWdnYWJsZTohMSxzbmFwT25SZWxlYXNlOiEwLGxvY2tDbGFzczpcInN3aXBlci1zY3JvbGxiYXItbG9ja1wiLGRyYWdDbGFzczpcInN3aXBlci1zY3JvbGxiYXItZHJhZ1wifX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7c2Nyb2xsYmFyOntpbml0OmxlLmluaXQuYmluZCh0aGlzKSxkZXN0cm95OmxlLmRlc3Ryb3kuYmluZCh0aGlzKSx1cGRhdGVTaXplOmxlLnVwZGF0ZVNpemUuYmluZCh0aGlzKSxzZXRUcmFuc2xhdGU6bGUuc2V0VHJhbnNsYXRlLmJpbmQodGhpcyksc2V0VHJhbnNpdGlvbjpsZS5zZXRUcmFuc2l0aW9uLmJpbmQodGhpcyksZW5hYmxlRHJhZ2dhYmxlOmxlLmVuYWJsZURyYWdnYWJsZS5iaW5kKHRoaXMpLGRpc2FibGVEcmFnZ2FibGU6bGUuZGlzYWJsZURyYWdnYWJsZS5iaW5kKHRoaXMpLHNldERyYWdQb3NpdGlvbjpsZS5zZXREcmFnUG9zaXRpb24uYmluZCh0aGlzKSxnZXRQb2ludGVyUG9zaXRpb246bGUuZ2V0UG9pbnRlclBvc2l0aW9uLmJpbmQodGhpcyksb25EcmFnU3RhcnQ6bGUub25EcmFnU3RhcnQuYmluZCh0aGlzKSxvbkRyYWdNb3ZlOmxlLm9uRHJhZ01vdmUuYmluZCh0aGlzKSxvbkRyYWdFbmQ6bGUub25EcmFnRW5kLmJpbmQodGhpcyksaXNUb3VjaGVkOiExLHRpbWVvdXQ6bnVsbCxkcmFnVGltZW91dDpudWxsfX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMuc2Nyb2xsYmFyLmluaXQoKSx0aGlzLnNjcm9sbGJhci51cGRhdGVTaXplKCksdGhpcy5zY3JvbGxiYXIuc2V0VHJhbnNsYXRlKCl9LHVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKX0scmVzaXplOmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxiYXIudXBkYXRlU2l6ZSgpfSxvYnNlcnZlclVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKX0sc2V0VHJhbnNsYXRlOmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxiYXIuc2V0VHJhbnNsYXRlKCl9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7dGhpcy5zY3JvbGxiYXIuc2V0VHJhbnNpdGlvbihlKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuc2Nyb2xsYmFyLmRlc3Ryb3koKX19fSx7bmFtZTpcInBhcmFsbGF4XCIscGFyYW1zOntwYXJhbGxheDp7ZW5hYmxlZDohMX19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse3BhcmFsbGF4OntzZXRUcmFuc2Zvcm06ZGUuc2V0VHJhbnNmb3JtLmJpbmQodGhpcyksc2V0VHJhbnNsYXRlOmRlLnNldFRyYW5zbGF0ZS5iaW5kKHRoaXMpLHNldFRyYW5zaXRpb246ZGUuc2V0VHJhbnNpdGlvbi5iaW5kKHRoaXMpfX0pfSxvbjp7YmVmb3JlSW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLnBhcmFsbGF4LmVuYWJsZWQmJih0aGlzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzPSEwLHRoaXMub3JpZ2luYWxQYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcz0hMCl9LGluaXQ6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkJiZ0aGlzLnBhcmFsbGF4LnNldFRyYW5zbGF0ZSgpfSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkJiZ0aGlzLnBhcmFsbGF4LnNldFRyYW5zbGF0ZSgpfSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUpe3RoaXMucGFyYW1zLnBhcmFsbGF4LmVuYWJsZWQmJnRoaXMucGFyYWxsYXguc2V0VHJhbnNpdGlvbihlKX19fSx7bmFtZTpcInpvb21cIixwYXJhbXM6e3pvb206e2VuYWJsZWQ6ITEsbWF4UmF0aW86MyxtaW5SYXRpbzoxLHRvZ2dsZTohMCxjb250YWluZXJDbGFzczpcInN3aXBlci16b29tLWNvbnRhaW5lclwiLHpvb21lZFNsaWRlQ2xhc3M6XCJzd2lwZXItc2xpZGUtem9vbWVkXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9e2VuYWJsZWQ6ITEsc2NhbGU6MSxjdXJyZW50U2NhbGU6MSxpc1NjYWxpbmc6ITEsZ2VzdHVyZTp7JHNsaWRlRWw6dm9pZCAwLHNsaWRlV2lkdGg6dm9pZCAwLHNsaWRlSGVpZ2h0OnZvaWQgMCwkaW1hZ2VFbDp2b2lkIDAsJGltYWdlV3JhcEVsOnZvaWQgMCxtYXhSYXRpbzozfSxpbWFnZTp7aXNUb3VjaGVkOnZvaWQgMCxpc01vdmVkOnZvaWQgMCxjdXJyZW50WDp2b2lkIDAsY3VycmVudFk6dm9pZCAwLG1pblg6dm9pZCAwLG1pblk6dm9pZCAwLG1heFg6dm9pZCAwLG1heFk6dm9pZCAwLHdpZHRoOnZvaWQgMCxoZWlnaHQ6dm9pZCAwLHN0YXJ0WDp2b2lkIDAsc3RhcnRZOnZvaWQgMCx0b3VjaGVzU3RhcnQ6e30sdG91Y2hlc0N1cnJlbnQ6e319LHZlbG9jaXR5Ont4OnZvaWQgMCx5OnZvaWQgMCxwcmV2UG9zaXRpb25YOnZvaWQgMCxwcmV2UG9zaXRpb25ZOnZvaWQgMCxwcmV2VGltZTp2b2lkIDB9fTtcIm9uR2VzdHVyZVN0YXJ0IG9uR2VzdHVyZUNoYW5nZSBvbkdlc3R1cmVFbmQgb25Ub3VjaFN0YXJ0IG9uVG91Y2hNb3ZlIG9uVG91Y2hFbmQgb25UcmFuc2l0aW9uRW5kIHRvZ2dsZSBlbmFibGUgZGlzYWJsZSBpbiBvdXRcIi5zcGxpdChcIiBcIikuZm9yRWFjaCgoZnVuY3Rpb24oaSl7dFtpXT1oZVtpXS5iaW5kKGUpfSkpLGQuZXh0ZW5kKGUse3pvb206dH0pO3ZhciBpPTE7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUuem9vbSxcInNjYWxlXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBpfSxzZXQ6ZnVuY3Rpb24odCl7aWYoaSE9PXQpe3ZhciBzPWUuem9vbS5nZXN0dXJlLiRpbWFnZUVsP2Uuem9vbS5nZXN0dXJlLiRpbWFnZUVsWzBdOnZvaWQgMCxhPWUuem9vbS5nZXN0dXJlLiRzbGlkZUVsP2Uuem9vbS5nZXN0dXJlLiRzbGlkZUVsWzBdOnZvaWQgMDtlLmVtaXQoXCJ6b29tQ2hhbmdlXCIsdCxzLGEpfWk9dH19KX0sb246e2luaXQ6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy56b29tLmVuYWJsZWQmJnRoaXMuem9vbS5lbmFibGUoKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuem9vbS5kaXNhYmxlKCl9LHRvdWNoU3RhcnQ6ZnVuY3Rpb24oZSl7dGhpcy56b29tLmVuYWJsZWQmJnRoaXMuem9vbS5vblRvdWNoU3RhcnQoZSl9LHRvdWNoRW5kOmZ1bmN0aW9uKGUpe3RoaXMuem9vbS5lbmFibGVkJiZ0aGlzLnpvb20ub25Ub3VjaEVuZChlKX0sZG91YmxlVGFwOmZ1bmN0aW9uKGUpe3RoaXMucGFyYW1zLnpvb20uZW5hYmxlZCYmdGhpcy56b29tLmVuYWJsZWQmJnRoaXMucGFyYW1zLnpvb20udG9nZ2xlJiZ0aGlzLnpvb20udG9nZ2xlKGUpfSx0cmFuc2l0aW9uRW5kOmZ1bmN0aW9uKCl7dGhpcy56b29tLmVuYWJsZWQmJnRoaXMucGFyYW1zLnpvb20uZW5hYmxlZCYmdGhpcy56b29tLm9uVHJhbnNpdGlvbkVuZCgpfSxzbGlkZUNoYW5nZTpmdW5jdGlvbigpe3RoaXMuem9vbS5lbmFibGVkJiZ0aGlzLnBhcmFtcy56b29tLmVuYWJsZWQmJnRoaXMucGFyYW1zLmNzc01vZGUmJnRoaXMuem9vbS5vblRyYW5zaXRpb25FbmQoKX19fSx7bmFtZTpcImxhenlcIixwYXJhbXM6e2xhenk6e2VuYWJsZWQ6ITEsbG9hZFByZXZOZXh0OiExLGxvYWRQcmV2TmV4dEFtb3VudDoxLGxvYWRPblRyYW5zaXRpb25TdGFydDohMSxlbGVtZW50Q2xhc3M6XCJzd2lwZXItbGF6eVwiLGxvYWRpbmdDbGFzczpcInN3aXBlci1sYXp5LWxvYWRpbmdcIixsb2FkZWRDbGFzczpcInN3aXBlci1sYXp5LWxvYWRlZFwiLHByZWxvYWRlckNsYXNzOlwic3dpcGVyLWxhenktcHJlbG9hZGVyXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHtsYXp5Ontpbml0aWFsSW1hZ2VMb2FkZWQ6ITEsbG9hZDpwZS5sb2FkLmJpbmQodGhpcyksbG9hZEluU2xpZGU6cGUubG9hZEluU2xpZGUuYmluZCh0aGlzKX19KX0sb246e2JlZm9yZUluaXQ6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5sYXp5LmVuYWJsZWQmJnRoaXMucGFyYW1zLnByZWxvYWRJbWFnZXMmJih0aGlzLnBhcmFtcy5wcmVsb2FkSW1hZ2VzPSExKX0saW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxhenkuZW5hYmxlZCYmIXRoaXMucGFyYW1zLmxvb3AmJjA9PT10aGlzLnBhcmFtcy5pbml0aWFsU2xpZGUmJnRoaXMubGF6eS5sb2FkKCl9LHNjcm9sbDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmZyZWVNb2RlJiYhdGhpcy5wYXJhbXMuZnJlZU1vZGVTdGlja3kmJnRoaXMubGF6eS5sb2FkKCl9LHJlc2l6ZTpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxhenkuZW5hYmxlZCYmdGhpcy5sYXp5LmxvYWQoKX0sc2Nyb2xsYmFyRHJhZ01vdmU6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5sYXp5LmVuYWJsZWQmJnRoaXMubGF6eS5sb2FkKCl9LHRyYW5zaXRpb25TdGFydDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxhenkuZW5hYmxlZCYmKHRoaXMucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0fHwhdGhpcy5wYXJhbXMubGF6eS5sb2FkT25UcmFuc2l0aW9uU3RhcnQmJiF0aGlzLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkKSYmdGhpcy5sYXp5LmxvYWQoKX0sdHJhbnNpdGlvbkVuZDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxhenkuZW5hYmxlZCYmIXRoaXMucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0JiZ0aGlzLmxhenkubG9hZCgpfSxzbGlkZUNoYW5nZTpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxhenkuZW5hYmxlZCYmdGhpcy5wYXJhbXMuY3NzTW9kZSYmdGhpcy5sYXp5LmxvYWQoKX19fSx7bmFtZTpcImNvbnRyb2xsZXJcIixwYXJhbXM6e2NvbnRyb2xsZXI6e2NvbnRyb2w6dm9pZCAwLGludmVyc2U6ITEsYnk6XCJzbGlkZVwifX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7Y29udHJvbGxlcjp7Y29udHJvbDp0aGlzLnBhcmFtcy5jb250cm9sbGVyLmNvbnRyb2wsZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbjpjZS5nZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uLmJpbmQodGhpcyksc2V0VHJhbnNsYXRlOmNlLnNldFRyYW5zbGF0ZS5iaW5kKHRoaXMpLHNldFRyYW5zaXRpb246Y2Uuc2V0VHJhbnNpdGlvbi5iaW5kKHRoaXMpfX0pfSxvbjp7dXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5jb250cm9sbGVyLmNvbnRyb2wmJnRoaXMuY29udHJvbGxlci5zcGxpbmUmJih0aGlzLmNvbnRyb2xsZXIuc3BsaW5lPXZvaWQgMCxkZWxldGUgdGhpcy5jb250cm9sbGVyLnNwbGluZSl9LHJlc2l6ZTpmdW5jdGlvbigpe3RoaXMuY29udHJvbGxlci5jb250cm9sJiZ0aGlzLmNvbnRyb2xsZXIuc3BsaW5lJiYodGhpcy5jb250cm9sbGVyLnNwbGluZT12b2lkIDAsZGVsZXRlIHRoaXMuY29udHJvbGxlci5zcGxpbmUpfSxvYnNlcnZlclVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuY29udHJvbGxlci5jb250cm9sJiZ0aGlzLmNvbnRyb2xsZXIuc3BsaW5lJiYodGhpcy5jb250cm9sbGVyLnNwbGluZT12b2lkIDAsZGVsZXRlIHRoaXMuY29udHJvbGxlci5zcGxpbmUpfSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oZSx0KXt0aGlzLmNvbnRyb2xsZXIuY29udHJvbCYmdGhpcy5jb250cm9sbGVyLnNldFRyYW5zbGF0ZShlLHQpfSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUsdCl7dGhpcy5jb250cm9sbGVyLmNvbnRyb2wmJnRoaXMuY29udHJvbGxlci5zZXRUcmFuc2l0aW9uKGUsdCl9fX0se25hbWU6XCJhMTF5XCIscGFyYW1zOnthMTF5OntlbmFibGVkOiEwLG5vdGlmaWNhdGlvbkNsYXNzOlwic3dpcGVyLW5vdGlmaWNhdGlvblwiLHByZXZTbGlkZU1lc3NhZ2U6XCJQcmV2aW91cyBzbGlkZVwiLG5leHRTbGlkZU1lc3NhZ2U6XCJOZXh0IHNsaWRlXCIsZmlyc3RTbGlkZU1lc3NhZ2U6XCJUaGlzIGlzIHRoZSBmaXJzdCBzbGlkZVwiLGxhc3RTbGlkZU1lc3NhZ2U6XCJUaGlzIGlzIHRoZSBsYXN0IHNsaWRlXCIscGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2U6XCJHbyB0byBzbGlkZSB7e2luZGV4fX1cIn19LGNyZWF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7ZC5leHRlbmQoZSx7YTExeTp7bGl2ZVJlZ2lvbjpuKCc8c3BhbiBjbGFzcz1cIicrZS5wYXJhbXMuYTExeS5ub3RpZmljYXRpb25DbGFzcysnXCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCI+PC9zcGFuPicpfX0pLE9iamVjdC5rZXlzKHVlKS5mb3JFYWNoKChmdW5jdGlvbih0KXtlLmExMXlbdF09dWVbdF0uYmluZChlKX0pKX0sb246e2luaXQ6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5hMTF5LmVuYWJsZWQmJih0aGlzLmExMXkuaW5pdCgpLHRoaXMuYTExeS51cGRhdGVOYXZpZ2F0aW9uKCkpfSx0b0VkZ2U6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5hMTF5LmVuYWJsZWQmJnRoaXMuYTExeS51cGRhdGVOYXZpZ2F0aW9uKCl9LGZyb21FZGdlOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuYTExeS5lbmFibGVkJiZ0aGlzLmExMXkudXBkYXRlTmF2aWdhdGlvbigpfSxwYWdpbmF0aW9uVXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuYTExeS5lbmFibGVkJiZ0aGlzLmExMXkudXBkYXRlUGFnaW5hdGlvbigpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuYTExeS5lbmFibGVkJiZ0aGlzLmExMXkuZGVzdHJveSgpfX19LHtuYW1lOlwiaGlzdG9yeVwiLHBhcmFtczp7aGlzdG9yeTp7ZW5hYmxlZDohMSxyZXBsYWNlU3RhdGU6ITEsa2V5Olwic2xpZGVzXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHtoaXN0b3J5Ontpbml0OnZlLmluaXQuYmluZCh0aGlzKSxzZXRIaXN0b3J5OnZlLnNldEhpc3RvcnkuYmluZCh0aGlzKSxzZXRIaXN0b3J5UG9wU3RhdGU6dmUuc2V0SGlzdG9yeVBvcFN0YXRlLmJpbmQodGhpcyksc2Nyb2xsVG9TbGlkZTp2ZS5zY3JvbGxUb1NsaWRlLmJpbmQodGhpcyksZGVzdHJveTp2ZS5kZXN0cm95LmJpbmQodGhpcyl9fSl9LG9uOntpbml0OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuaGlzdG9yeS5lbmFibGVkJiZ0aGlzLmhpc3RvcnkuaW5pdCgpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuaGlzdG9yeS5lbmFibGVkJiZ0aGlzLmhpc3RvcnkuZGVzdHJveSgpfSx0cmFuc2l0aW9uRW5kOmZ1bmN0aW9uKCl7dGhpcy5oaXN0b3J5LmluaXRpYWxpemVkJiZ0aGlzLmhpc3Rvcnkuc2V0SGlzdG9yeSh0aGlzLnBhcmFtcy5oaXN0b3J5LmtleSx0aGlzLmFjdGl2ZUluZGV4KX0sc2xpZGVDaGFuZ2U6ZnVuY3Rpb24oKXt0aGlzLmhpc3RvcnkuaW5pdGlhbGl6ZWQmJnRoaXMucGFyYW1zLmNzc01vZGUmJnRoaXMuaGlzdG9yeS5zZXRIaXN0b3J5KHRoaXMucGFyYW1zLmhpc3Rvcnkua2V5LHRoaXMuYWN0aXZlSW5kZXgpfX19LHtuYW1lOlwiaGFzaC1uYXZpZ2F0aW9uXCIscGFyYW1zOntoYXNoTmF2aWdhdGlvbjp7ZW5hYmxlZDohMSxyZXBsYWNlU3RhdGU6ITEsd2F0Y2hTdGF0ZTohMX19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse2hhc2hOYXZpZ2F0aW9uOntpbml0aWFsaXplZDohMSxpbml0OmZlLmluaXQuYmluZCh0aGlzKSxkZXN0cm95OmZlLmRlc3Ryb3kuYmluZCh0aGlzKSxzZXRIYXNoOmZlLnNldEhhc2guYmluZCh0aGlzKSxvbkhhc2hDYW5nZTpmZS5vbkhhc2hDYW5nZS5iaW5kKHRoaXMpfX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQmJnRoaXMuaGFzaE5hdmlnYXRpb24uaW5pdCgpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZCYmdGhpcy5oYXNoTmF2aWdhdGlvbi5kZXN0cm95KCl9LHRyYW5zaXRpb25FbmQ6ZnVuY3Rpb24oKXt0aGlzLmhhc2hOYXZpZ2F0aW9uLmluaXRpYWxpemVkJiZ0aGlzLmhhc2hOYXZpZ2F0aW9uLnNldEhhc2goKX0sc2xpZGVDaGFuZ2U6ZnVuY3Rpb24oKXt0aGlzLmhhc2hOYXZpZ2F0aW9uLmluaXRpYWxpemVkJiZ0aGlzLnBhcmFtcy5jc3NNb2RlJiZ0aGlzLmhhc2hOYXZpZ2F0aW9uLnNldEhhc2goKX19fSx7bmFtZTpcImF1dG9wbGF5XCIscGFyYW1zOnthdXRvcGxheTp7ZW5hYmxlZDohMSxkZWxheTozZTMsd2FpdEZvclRyYW5zaXRpb246ITAsZGlzYWJsZU9uSW50ZXJhY3Rpb246ITAsc3RvcE9uTGFzdFNsaWRlOiExLHJldmVyc2VEaXJlY3Rpb246ITF9fSxjcmVhdGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2QuZXh0ZW5kKGUse2F1dG9wbGF5OntydW5uaW5nOiExLHBhdXNlZDohMSxydW46bWUucnVuLmJpbmQoZSksc3RhcnQ6bWUuc3RhcnQuYmluZChlKSxzdG9wOm1lLnN0b3AuYmluZChlKSxwYXVzZTptZS5wYXVzZS5iaW5kKGUpLG9uVmlzaWJpbGl0eUNoYW5nZTpmdW5jdGlvbigpe1wiaGlkZGVuXCI9PT1kb2N1bWVudC52aXNpYmlsaXR5U3RhdGUmJmUuYXV0b3BsYXkucnVubmluZyYmZS5hdXRvcGxheS5wYXVzZSgpLFwidmlzaWJsZVwiPT09ZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlJiZlLmF1dG9wbGF5LnBhdXNlZCYmKGUuYXV0b3BsYXkucnVuKCksZS5hdXRvcGxheS5wYXVzZWQ9ITEpfSxvblRyYW5zaXRpb25FbmQ6ZnVuY3Rpb24odCl7ZSYmIWUuZGVzdHJveWVkJiZlLiR3cmFwcGVyRWwmJnQudGFyZ2V0PT09dGhpcyYmKGUuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLGUuYXV0b3BsYXkub25UcmFuc2l0aW9uRW5kKSxlLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndlYmtpdFRyYW5zaXRpb25FbmRcIixlLmF1dG9wbGF5Lm9uVHJhbnNpdGlvbkVuZCksZS5hdXRvcGxheS5wYXVzZWQ9ITEsZS5hdXRvcGxheS5ydW5uaW5nP2UuYXV0b3BsYXkucnVuKCk6ZS5hdXRvcGxheS5zdG9wKCkpfX19KX0sb246e2luaXQ6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5hdXRvcGxheS5lbmFibGVkJiYodGhpcy5hdXRvcGxheS5zdGFydCgpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsdGhpcy5hdXRvcGxheS5vblZpc2liaWxpdHlDaGFuZ2UpKX0sYmVmb3JlVHJhbnNpdGlvblN0YXJ0OmZ1bmN0aW9uKGUsdCl7dGhpcy5hdXRvcGxheS5ydW5uaW5nJiYodHx8IXRoaXMucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uP3RoaXMuYXV0b3BsYXkucGF1c2UoZSk6dGhpcy5hdXRvcGxheS5zdG9wKCkpfSxzbGlkZXJGaXJzdE1vdmU6ZnVuY3Rpb24oKXt0aGlzLmF1dG9wbGF5LnJ1bm5pbmcmJih0aGlzLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbj90aGlzLmF1dG9wbGF5LnN0b3AoKTp0aGlzLmF1dG9wbGF5LnBhdXNlKCkpfSx0b3VjaEVuZDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmNzc01vZGUmJnRoaXMuYXV0b3BsYXkucGF1c2VkJiYhdGhpcy5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24mJnRoaXMuYXV0b3BsYXkucnVuKCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLmF1dG9wbGF5LnJ1bm5pbmcmJnRoaXMuYXV0b3BsYXkuc3RvcCgpLGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsdGhpcy5hdXRvcGxheS5vblZpc2liaWxpdHlDaGFuZ2UpfX19LHtuYW1lOlwiZWZmZWN0LWZhZGVcIixwYXJhbXM6e2ZhZGVFZmZlY3Q6e2Nyb3NzRmFkZTohMX19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse2ZhZGVFZmZlY3Q6e3NldFRyYW5zbGF0ZTpnZS5zZXRUcmFuc2xhdGUuYmluZCh0aGlzKSxzZXRUcmFuc2l0aW9uOmdlLnNldFRyYW5zaXRpb24uYmluZCh0aGlzKX19KX0sb246e2JlZm9yZUluaXQ6ZnVuY3Rpb24oKXtpZihcImZhZGVcIj09PXRoaXMucGFyYW1zLmVmZmVjdCl7dGhpcy5jbGFzc05hbWVzLnB1c2godGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcImZhZGVcIik7dmFyIGU9e3NsaWRlc1BlclZpZXc6MSxzbGlkZXNQZXJDb2x1bW46MSxzbGlkZXNQZXJHcm91cDoxLHdhdGNoU2xpZGVzUHJvZ3Jlc3M6ITAsc3BhY2VCZXR3ZWVuOjAsdmlydHVhbFRyYW5zbGF0ZTohMH07ZC5leHRlbmQodGhpcy5wYXJhbXMsZSksZC5leHRlbmQodGhpcy5vcmlnaW5hbFBhcmFtcyxlKX19LHNldFRyYW5zbGF0ZTpmdW5jdGlvbigpe1wiZmFkZVwiPT09dGhpcy5wYXJhbXMuZWZmZWN0JiZ0aGlzLmZhZGVFZmZlY3Quc2V0VHJhbnNsYXRlKCl9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7XCJmYWRlXCI9PT10aGlzLnBhcmFtcy5lZmZlY3QmJnRoaXMuZmFkZUVmZmVjdC5zZXRUcmFuc2l0aW9uKGUpfX19LHtuYW1lOlwiZWZmZWN0LWN1YmVcIixwYXJhbXM6e2N1YmVFZmZlY3Q6e3NsaWRlU2hhZG93czohMCxzaGFkb3c6ITAsc2hhZG93T2Zmc2V0OjIwLHNoYWRvd1NjYWxlOi45NH19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse2N1YmVFZmZlY3Q6e3NldFRyYW5zbGF0ZTpiZS5zZXRUcmFuc2xhdGUuYmluZCh0aGlzKSxzZXRUcmFuc2l0aW9uOmJlLnNldFRyYW5zaXRpb24uYmluZCh0aGlzKX19KX0sb246e2JlZm9yZUluaXQ6ZnVuY3Rpb24oKXtpZihcImN1YmVcIj09PXRoaXMucGFyYW1zLmVmZmVjdCl7dGhpcy5jbGFzc05hbWVzLnB1c2godGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcImN1YmVcIiksdGhpcy5jbGFzc05hbWVzLnB1c2godGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcIjNkXCIpO3ZhciBlPXtzbGlkZXNQZXJWaWV3OjEsc2xpZGVzUGVyQ29sdW1uOjEsc2xpZGVzUGVyR3JvdXA6MSx3YXRjaFNsaWRlc1Byb2dyZXNzOiEwLHJlc2lzdGFuY2VSYXRpbzowLHNwYWNlQmV0d2VlbjowLGNlbnRlcmVkU2xpZGVzOiExLHZpcnR1YWxUcmFuc2xhdGU6ITB9O2QuZXh0ZW5kKHRoaXMucGFyYW1zLGUpLGQuZXh0ZW5kKHRoaXMub3JpZ2luYWxQYXJhbXMsZSl9fSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXtcImN1YmVcIj09PXRoaXMucGFyYW1zLmVmZmVjdCYmdGhpcy5jdWJlRWZmZWN0LnNldFRyYW5zbGF0ZSgpfSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUpe1wiY3ViZVwiPT09dGhpcy5wYXJhbXMuZWZmZWN0JiZ0aGlzLmN1YmVFZmZlY3Quc2V0VHJhbnNpdGlvbihlKX19fSx7bmFtZTpcImVmZmVjdC1mbGlwXCIscGFyYW1zOntmbGlwRWZmZWN0OntzbGlkZVNoYWRvd3M6ITAsbGltaXRSb3RhdGlvbjohMH19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse2ZsaXBFZmZlY3Q6e3NldFRyYW5zbGF0ZTp3ZS5zZXRUcmFuc2xhdGUuYmluZCh0aGlzKSxzZXRUcmFuc2l0aW9uOndlLnNldFRyYW5zaXRpb24uYmluZCh0aGlzKX19KX0sb246e2JlZm9yZUluaXQ6ZnVuY3Rpb24oKXtpZihcImZsaXBcIj09PXRoaXMucGFyYW1zLmVmZmVjdCl7dGhpcy5jbGFzc05hbWVzLnB1c2godGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcImZsaXBcIiksdGhpcy5jbGFzc05hbWVzLnB1c2godGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcIjNkXCIpO3ZhciBlPXtzbGlkZXNQZXJWaWV3OjEsc2xpZGVzUGVyQ29sdW1uOjEsc2xpZGVzUGVyR3JvdXA6MSx3YXRjaFNsaWRlc1Byb2dyZXNzOiEwLHNwYWNlQmV0d2VlbjowLHZpcnR1YWxUcmFuc2xhdGU6ITB9O2QuZXh0ZW5kKHRoaXMucGFyYW1zLGUpLGQuZXh0ZW5kKHRoaXMub3JpZ2luYWxQYXJhbXMsZSl9fSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXtcImZsaXBcIj09PXRoaXMucGFyYW1zLmVmZmVjdCYmdGhpcy5mbGlwRWZmZWN0LnNldFRyYW5zbGF0ZSgpfSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUpe1wiZmxpcFwiPT09dGhpcy5wYXJhbXMuZWZmZWN0JiZ0aGlzLmZsaXBFZmZlY3Quc2V0VHJhbnNpdGlvbihlKX19fSx7bmFtZTpcImVmZmVjdC1jb3ZlcmZsb3dcIixwYXJhbXM6e2NvdmVyZmxvd0VmZmVjdDp7cm90YXRlOjUwLHN0cmV0Y2g6MCxkZXB0aDoxMDAsbW9kaWZpZXI6MSxzbGlkZVNoYWRvd3M6ITB9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHtjb3ZlcmZsb3dFZmZlY3Q6e3NldFRyYW5zbGF0ZTp5ZS5zZXRUcmFuc2xhdGUuYmluZCh0aGlzKSxzZXRUcmFuc2l0aW9uOnllLnNldFRyYW5zaXRpb24uYmluZCh0aGlzKX19KX0sb246e2JlZm9yZUluaXQ6ZnVuY3Rpb24oKXtcImNvdmVyZmxvd1wiPT09dGhpcy5wYXJhbXMuZWZmZWN0JiYodGhpcy5jbGFzc05hbWVzLnB1c2godGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcImNvdmVyZmxvd1wiKSx0aGlzLmNsYXNzTmFtZXMucHVzaCh0aGlzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzK1wiM2RcIiksdGhpcy5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcz0hMCx0aGlzLm9yaWdpbmFsUGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3M9ITApfSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXtcImNvdmVyZmxvd1wiPT09dGhpcy5wYXJhbXMuZWZmZWN0JiZ0aGlzLmNvdmVyZmxvd0VmZmVjdC5zZXRUcmFuc2xhdGUoKX0sc2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlKXtcImNvdmVyZmxvd1wiPT09dGhpcy5wYXJhbXMuZWZmZWN0JiZ0aGlzLmNvdmVyZmxvd0VmZmVjdC5zZXRUcmFuc2l0aW9uKGUpfX19LHtuYW1lOlwidGh1bWJzXCIscGFyYW1zOnt0aHVtYnM6e3N3aXBlcjpudWxsLG11bHRpcGxlQWN0aXZlVGh1bWJzOiEwLGF1dG9TY3JvbGxPZmZzZXQ6MCxzbGlkZVRodW1iQWN0aXZlQ2xhc3M6XCJzd2lwZXItc2xpZGUtdGh1bWItYWN0aXZlXCIsdGh1bWJzQ29udGFpbmVyQ2xhc3M6XCJzd2lwZXItY29udGFpbmVyLXRodW1ic1wifX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7dGh1bWJzOntzd2lwZXI6bnVsbCxpbml0OnhlLmluaXQuYmluZCh0aGlzKSx1cGRhdGU6eGUudXBkYXRlLmJpbmQodGhpcyksb25UaHVtYkNsaWNrOnhlLm9uVGh1bWJDbGljay5iaW5kKHRoaXMpfX0pfSxvbjp7YmVmb3JlSW5pdDpmdW5jdGlvbigpe3ZhciBlPXRoaXMucGFyYW1zLnRodW1icztlJiZlLnN3aXBlciYmKHRoaXMudGh1bWJzLmluaXQoKSx0aGlzLnRodW1icy51cGRhdGUoITApKX0sc2xpZGVDaGFuZ2U6ZnVuY3Rpb24oKXt0aGlzLnRodW1icy5zd2lwZXImJnRoaXMudGh1bWJzLnVwZGF0ZSgpfSx1cGRhdGU6ZnVuY3Rpb24oKXt0aGlzLnRodW1icy5zd2lwZXImJnRoaXMudGh1bWJzLnVwZGF0ZSgpfSxyZXNpemU6ZnVuY3Rpb24oKXt0aGlzLnRodW1icy5zd2lwZXImJnRoaXMudGh1bWJzLnVwZGF0ZSgpfSxvYnNlcnZlclVwZGF0ZTpmdW5jdGlvbigpe3RoaXMudGh1bWJzLnN3aXBlciYmdGhpcy50aHVtYnMudXBkYXRlKCl9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy50aHVtYnMuc3dpcGVyO3QmJnQuc2V0VHJhbnNpdGlvbihlKX0sYmVmb3JlRGVzdHJveTpmdW5jdGlvbigpe3ZhciBlPXRoaXMudGh1bWJzLnN3aXBlcjtlJiZ0aGlzLnRodW1icy5zd2lwZXJDcmVhdGVkJiZlJiZlLmRlc3Ryb3koKX19fV07cmV0dXJuIHZvaWQgMD09PWoudXNlJiYoai51c2U9ai5DbGFzcy51c2Usai5pbnN0YWxsTW9kdWxlPWouQ2xhc3MuaW5zdGFsbE1vZHVsZSksai51c2UoRWUpLGp9KSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKXtcclxuICAgICd1c2Ugc3RyaWN0J1xyXG5cclxuICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vIHN0YXJ0XHJcbiAgICAgICAgbGV0IHBJdGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nW2RhdGEtc3JjXScpKSwgdGltZXI7XHJcbiAgICBcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsZXIsIGZhbHNlKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2Nyb2xsZXIsIGZhbHNlKTtcclxuICAgICAgICBpblZpZXcoKTtcclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgLy8gdGhyb3R0bGVkIHNjcm9sbC9yZXNpemVcclxuICAgICAgICBmdW5jdGlvbiBzY3JvbGxlcihlKSB7XHJcbiAgICBcclxuICAgICAgICB0aW1lciA9IHRpbWVyIHx8IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGluVmlldyk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgLy8gaW1hZ2UgaW4gdmlldz9cclxuICAgICAgICBmdW5jdGlvbiBpblZpZXcoKSB7XHJcbiAgICBcclxuICAgICAgICB2YXIgd1QgPSB3aW5kb3cucGFnZVlPZmZzZXQsIHdCID0gd1QgKyB3aW5kb3cuaW5uZXJIZWlnaHQsIGNSZWN0LCBwVCwgcEIsIHAgPSAwO1xyXG4gICAgICAgIHdoaWxlIChwIDwgcEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNSZWN0ID0gcEl0ZW1zW3BdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBwVCA9IHdUICsgY1JlY3QudG9wO1xyXG4gICAgICAgICAgICBwQiA9IHBUICsgY1JlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHdUIDwgcEIgJiYgd0IgPiBwVCkge1xyXG4gICAgICAgICAgICAgICAgbG9hZEZ1bGxJbWFnZShwSXRlbXNbcF0pO1xyXG4gICAgICAgICAgICAgICAgcEl0ZW1zLnNwbGljZShwLCAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHArKztcclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgLy8gcmVwbGFjZSB3aXRoIGZ1bGwgaW1hZ2VcclxuICAgICAgICBmdW5jdGlvbiBsb2FkRnVsbEltYWdlKGl0ZW0pIHtcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAoIWl0ZW0gfHwgIShpdGVtLmRhdGFzZXQuc3JjIHx8IGl0ZW0uZGF0YXNldC5zcmNzZXQpKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGxvYWQgaW1hZ2VcclxuICAgICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0LnNyY3NldCkge1xyXG4gICAgICAgICAgICAgICAgaW1nLnNyY3NldCA9IGl0ZW0uZGF0YXNldC5zcmNzZXQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gaXRlbS5kYXRhc2V0LnNyYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9IGl0ZW0uY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICBpbWcuYWx0ID0gaXRlbS5hbHQ7XHJcbiAgICAgICAgICAgIGlmIChpbWcuY29tcGxldGUpIGFkZEltZygpO1xyXG4gICAgICAgICAgICBlbHNlIGltZy5vbmxvYWQgPSBhZGRJbWc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHJlcGxhY2UgaW1hZ2VcclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkSW1nKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBjbGlja1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9LCBmYWxzZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgZnVsbCBpbWFnZVxyXG4gICAgICAgICAgICAgICAgaXRlbS5iZWZvcmUoaW1nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3JlbW92ZSBwcmVsb2FkICBcclxuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICB9LCBmYWxzZSk7XHJcbn0iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3BvbHlmaWxscycpKCk7XHJcbnJlcXVpcmUoJy4uL21vZHVsZXMvbWVudScpKCk7XHJcbnJlcXVpcmUoJy4uL21vZHVsZXMvbGF6eUxvYWQnKSgpO1xyXG5sZXQgU3dpcGVyID0gcmVxdWlyZSgnLi4vbGliL3N3aXBlcicpO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgKCAvKiB3ZWJwYWNrUHJlZmV0Y2g6IHRydWUsIHdlYnBhY2tDaHVua05hbWU6IFwiZm9vdGVyXCIgKi8gJy4uL21vZHVsZXMvZm9vdGVyJykudGhlbihtb2R1bGU9PntcclxuICAgIG1vZHVsZS5kZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxuaW1wb3J0ICcuLi8uLi9zY3NzL2dsb2JhbCc7XHJcbmltcG9ydCAnLi4vLi4vc2Nzcy9wYWdlcy9ob21lL3BhZ2UnO1xyXG5cclxuXHJcbi8vc2VydmljZXMgc2xpZGVyXHJcblxyXG5sZXQgc2xpZGVzUGVyVmlldywgZ2FwO1xyXG5cclxuY2FsY1NsaWRlcigpO1xyXG5cclxubGV0IHNlcnZpY2VzU2xpZGVyID0gbmV3IFN3aXBlcignLnNlcnZpY2VzLXNsaWRlcicsIHtcclxuICBzbGlkZXNQZXJWaWV3OiBzbGlkZXNQZXJWaWV3LFxyXG4gIHNwYWNlQmV0d2VlbjogZ2FwLFxyXG4gIGF1dG9IZWlnaHQ6IHRydWUsXHJcbiAgc3BlZWQ6IDIwMDAsXHJcbiAgZ3JhYkN1cnNvcjogdHJ1ZSxcclxuICBsb29wOiB0cnVlLFxyXG4gIGF1dG9wbGF5OiB7XHJcbiAgICBkZWxheTogMjAwMCxcclxuICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICB9LFxyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKT0+e1xyXG4gIGNhbGNTbGlkZXIoKTtcclxuICB1cGRhdGVTbGlkZXIoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBjYWxjU2xpZGVyKCl7XHJcbiAgbGV0IG1heFNsaWRlV2lkdGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjkgLyAzLFxyXG4gICAgICBhbW91bnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIG1heFNsaWRlV2lkdGg7XHJcblxyXG4gIHNsaWRlc1BlclZpZXcgPSBNYXRoLnRydW5jKGFtb3VudCk7XHJcbiAgZ2FwID0gKGFtb3VudCAtIHNsaWRlc1BlclZpZXcpICogbWF4U2xpZGVXaWR0aCAvIFxyXG4gIChzbGlkZXNQZXJWaWV3IC0gMSk7XHJcblxyXG4gIGlmKHNsaWRlc1BlclZpZXcgPD0gMSl7XHJcbiAgICBzbGlkZXNQZXJWaWV3ID0gMjtcclxuICAgIGdhcCA9IDA7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTbGlkZXIoKXtcclxuICBcclxuICBzZXJ2aWNlc1NsaWRlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA9IHNsaWRlc1BlclZpZXc7XHJcbiAgc2VydmljZXNTbGlkZXIucGFyYW1zLnNwYWNlQmV0d2VlbiA9IGdhcDtcclxuICBzZXJ2aWNlc1NsaWRlci5wYXJhbXMubG9vcCA9IHRydWU7XHJcbiAgc2VydmljZXNTbGlkZXIucGFyYW1zLmF1dG9wbGF5ID0ge1xyXG4gICAgZGVsYXk6IDIwMDAsXHJcbiAgfTtcclxuICBzZXJ2aWNlc1NsaWRlci5wYXJhbXMuc3BlZWQ9IDIwMDA7XHJcbn1cclxuXHJcblxyXG5cclxubGV0IHBvcnRmb2xpb1NsaWRlciA9IG5ldyBTd2lwZXIoJy5wb3J0Zm9saW8tc2xpZGVyJywge1xyXG4gIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgc3BlZWQ6IDcwMCxcclxuICBsb29wOiB0cnVlLFxyXG4gIGF1dG9wbGF5OiB7XHJcbiAgICBkZWxheTogNTAwMCxcclxuICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICB9LFxyXG4gIHBhZ2luYXRpb246IHtcclxuICAgIGVsOiAnLnBvcnRmb2xpby1wYWdpbmF0aW9uJyxcclxuICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICB9LFxyXG59KTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=