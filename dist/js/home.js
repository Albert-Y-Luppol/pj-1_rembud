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
var servicesSlider = new Swiper(".services-slider", {
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
window.addEventListener("resize", function () {
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

var portfolioSlider = new Swiper(".portfolio-slider", {
  grabCursor: true,
  speed: 700,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: ".portfolio-pagination",
    clickable: true
  }
});

/***/ }),

/***/ 0:
/*!*****************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://192.168.0.187:1409 ./home.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! E:\Front End\projects\1_rembud\node_modules\webpack-dev-server\client\index.js?http://192.168.0.187:1409 */"../../../node_modules/webpack-dev-server/client/index.js?http://192.168.0.187:1409");
module.exports = __webpack_require__(/*! ./home.js */"./home.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0U6L0Zyb250IEVuZC9wcm9qZWN0cy8xX3JlbWJ1ZC9zcmMvc2Nzcy9wYWdlcy9ob21lL3BhZ2Uuc2Nzcz80YjQzIiwid2VicGFjazovLy8uLi9saWIvc3dpcGVyLmpzIiwid2VicGFjazovLy8uLi9tb2R1bGVzL2xhenlMb2FkLmpzIiwid2VicGFjazovLy8uL2hvbWUuanMiXSwibmFtZXMiOlsiZSIsInQiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJpIiwicyIsImtleXMiLCJmb3JFYWNoIiwiYSIsImxlbmd0aCIsImRvY3VtZW50IiwiYm9keSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWN0aXZlRWxlbWVudCIsImJsdXIiLCJub2RlTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImNyZWF0ZUVsZW1lbnQiLCJjaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJzdHlsZSIsInNldEF0dHJpYnV0ZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY3JlYXRlRWxlbWVudE5TIiwiaW1wb3J0Tm9kZSIsImxvY2F0aW9uIiwiaGFzaCIsImhvc3QiLCJob3N0bmFtZSIsImhyZWYiLCJvcmlnaW4iLCJwYXRobmFtZSIsInByb3RvY29sIiwic2VhcmNoIiwid2luZG93IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInB1c2hTdGF0ZSIsImdvIiwiYmFjayIsIkN1c3RvbUV2ZW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiLCJJbWFnZSIsIkRhdGUiLCJzY3JlZW4iLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwibWF0Y2hNZWRpYSIsInIiLCJuIiwibyIsImwiLCJkIiwidHJpbSIsImluZGV4T2YiLCJoIiwiaW5uZXJIVE1MIiwicHVzaCIsIm1hdGNoIiwic3BsaXQiLCJub2RlVHlwZSIsImZuIiwicHJvdG90eXBlIiwiQ2xhc3MiLCJEb203IiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmVDbGFzcyIsInJlbW92ZSIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJ0b2dnbGVDbGFzcyIsInRvZ2dsZSIsImF0dHIiLCJhcmd1bWVudHMiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyIiwicmVtb3ZlQXR0cmlidXRlIiwiZGF0YSIsImRvbTdFbGVtZW50RGF0YVN0b3JhZ2UiLCJ0cmFuc2Zvcm0iLCJ3ZWJraXRUcmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwid2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwib24iLCJ0YXJnZXQiLCJkb203RXZlbnREYXRhIiwidW5zaGlmdCIsImlzIiwiYXBwbHkiLCJwYXJlbnRzIiwicCIsImMiLCJ1IiwidiIsImRvbTdMaXZlTGlzdGVuZXJzIiwibGlzdGVuZXIiLCJwcm94eUxpc3RlbmVyIiwiZiIsImRvbTdMaXN0ZW5lcnMiLCJvZmYiLCJkb203cHJveHkiLCJzcGxpY2UiLCJ0cmlnZ2VyIiwiZGV0YWlsIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJmaWx0ZXIiLCJkaXNwYXRjaEV2ZW50IiwidHJhbnNpdGlvbkVuZCIsImNhbGwiLCJvdXRlcldpZHRoIiwic3R5bGVzIiwib2Zmc2V0V2lkdGgiLCJwYXJzZUZsb2F0Iiwib3V0ZXJIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRUb3AiLCJjbGllbnRMZWZ0Iiwic2Nyb2xsWSIsInNjcm9sbFRvcCIsInNjcm9sbFgiLCJzY3JvbGxMZWZ0IiwidG9wIiwibGVmdCIsImNzcyIsImVhY2giLCJodG1sIiwidGV4dCIsInRleHRDb250ZW50IiwibWF0Y2hlcyIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwiaW5kZXgiLCJwcmV2aW91c1NpYmxpbmciLCJlcSIsImFwcGVuZCIsImZpcnN0Q2hpbGQiLCJhcHBlbmRDaGlsZCIsInByZXBlbmQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0IiwibmV4dEVsZW1lbnRTaWJsaW5nIiwibmV4dEFsbCIsInByZXYiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwicHJldkFsbCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJjbG9zZXN0IiwiZmluZCIsInJlbW92ZUNoaWxkIiwiZGVsZXRlUHJvcHMiLCJuZXh0VGljayIsIm5vdyIsImdldFRyYW5zbGF0ZSIsIldlYktpdENTU01hdHJpeCIsIm1hcCIsInJlcGxhY2UiLCJqb2luIiwiTW96VHJhbnNmb3JtIiwiT1RyYW5zZm9ybSIsIk1zVHJhbnNmb3JtIiwibXNUcmFuc2Zvcm0iLCJ0b1N0cmluZyIsIm00MSIsIm00MiIsInBhcnNlVXJsUXVlcnkiLCJkZWNvZGVVUklDb21wb25lbnQiLCJpc09iamVjdCIsImV4dGVuZCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJ0b3VjaCIsIkRvY3VtZW50VG91Y2giLCJwb2ludGVyRXZlbnRzIiwiUG9pbnRlckV2ZW50IiwibWF4VG91Y2hQb2ludHMiLCJvYnNlcnZlciIsInBhc3NpdmVMaXN0ZW5lciIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZ2VzdHVyZXMiLCJwYXJhbXMiLCJldmVudHNMaXN0ZW5lcnMiLCJjb21wb25lbnRzIiwiY29uZmlndXJhYmxlIiwib25jZSIsImY3cHJveHkiLCJlbWl0IiwiQXJyYXkiLCJpc0FycmF5Iiwic2xpY2UiLCJldmVudHMiLCJjb250ZXh0IiwidXNlTW9kdWxlc1BhcmFtcyIsIm1vZHVsZXMiLCJ1c2VNb2R1bGVzIiwiaW5zdGFuY2UiLCJiaW5kIiwiY3JlYXRlIiwic2V0IiwidXNlIiwiaW5zdGFsbE1vZHVsZSIsIm5hbWUiLCJwcm90byIsInN0YXRpYyIsImluc3RhbGwiLCJjb25jYXQiLCJkZWZpbmVQcm9wZXJ0aWVzIiwidXBkYXRlU2l6ZSIsIiRlbCIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJoZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpc0hvcml6b250YWwiLCJpc1ZlcnRpY2FsIiwicGFyc2VJbnQiLCJzaXplIiwidXBkYXRlU2xpZGVzIiwiJHdyYXBwZXJFbCIsInJ0bFRyYW5zbGF0ZSIsIndyb25nUlRMIiwidmlydHVhbCIsImVuYWJsZWQiLCJzbGlkZXMiLCJzbGlkZUNsYXNzIiwiY3NzTW9kZSIsInNsaWRlc09mZnNldEJlZm9yZSIsIm0iLCJzbGlkZXNPZmZzZXRBZnRlciIsImciLCJzbmFwR3JpZCIsImIiLCJ3Iiwic3BhY2VCZXR3ZWVuIiwieSIsIngiLCJFIiwiVCIsIlMiLCJ2aXJ0dWFsU2l6ZSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5SaWdodCIsIm1hcmdpbkJvdHRvbSIsInNsaWRlc1BlckNvbHVtbiIsIk1hdGgiLCJmbG9vciIsImNlaWwiLCJzbGlkZXNQZXJWaWV3Iiwic2xpZGVzUGVyQ29sdW1uRmlsbCIsIm1heCIsIkMiLCJNIiwiUCIsInoiLCJrIiwiJCIsIkwiLCJJIiwiTyIsInNsaWRlc1Blckdyb3VwIiwiRCIsIkEiLCJHIiwibWluIiwib3JkZXIiLCJIIiwiQiIsIk4iLCJyb3VuZExlbmd0aHMiLCJYIiwiViIsIlkiLCJGIiwiVyIsIlIiLCJxIiwiaiIsIksiLCJVIiwiXyIsIloiLCJzd2lwZXJTbGlkZVNpemUiLCJjZW50ZXJlZFNsaWRlcyIsImFicyIsInNsaWRlc1Blckdyb3VwU2tpcCIsImVmZmVjdCIsInNldFdyYXBwZXJTaXplIiwiUSIsIkoiLCJlZSIsInRlIiwiY2VudGVyZWRTbGlkZXNCb3VuZHMiLCJpZSIsInNlIiwiY2VudGVySW5zdWZmaWNpZW50U2xpZGVzIiwiYWUiLCJyZSIsInNsaWRlc0dyaWQiLCJzbGlkZXNTaXplc0dyaWQiLCJ3YXRjaE92ZXJmbG93IiwiY2hlY2tPdmVyZmxvdyIsIndhdGNoU2xpZGVzUHJvZ3Jlc3MiLCJ3YXRjaFNsaWRlc1Zpc2liaWxpdHkiLCJ1cGRhdGVTbGlkZXNPZmZzZXQiLCJ1cGRhdGVBdXRvSGVpZ2h0Iiwic2V0VHJhbnNpdGlvbiIsInNwZWVkIiwidmlzaWJsZVNsaWRlcyIsImFjdGl2ZUluZGV4Iiwic3dpcGVyU2xpZGVPZmZzZXQiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwidXBkYXRlU2xpZGVzUHJvZ3Jlc3MiLCJ0cmFuc2xhdGUiLCJzbGlkZVZpc2libGVDbGFzcyIsInZpc2libGVTbGlkZXNJbmRleGVzIiwibWluVHJhbnNsYXRlIiwiYXV0b0hlaWdodCIsInByb2dyZXNzIiwidXBkYXRlUHJvZ3Jlc3MiLCJtYXhUcmFuc2xhdGUiLCJpc0JlZ2lubmluZyIsImlzRW5kIiwidXBkYXRlU2xpZGVzQ2xhc3NlcyIsInJlYWxJbmRleCIsInNsaWRlQWN0aXZlQ2xhc3MiLCJzbGlkZU5leHRDbGFzcyIsInNsaWRlUHJldkNsYXNzIiwic2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyIsInNsaWRlRHVwbGljYXRlTmV4dENsYXNzIiwic2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MiLCJsb29wIiwic2xpZGVEdXBsaWNhdGVDbGFzcyIsInVwZGF0ZUFjdGl2ZUluZGV4Iiwic25hcEluZGV4Iiwibm9ybWFsaXplU2xpZGVJbmRleCIsInByZXZpb3VzSW5kZXgiLCJpbml0aWFsaXplZCIsInJ1bkNhbGxiYWNrc09uSW5pdCIsInVwZGF0ZUNsaWNrZWRTbGlkZSIsImNsaWNrZWRTbGlkZSIsImNsaWNrZWRJbmRleCIsInNsaWRlVG9DbGlja2VkU2xpZGUiLCJ2aXJ0dWFsVHJhbnNsYXRlIiwic2V0VHJhbnNsYXRlIiwid3JhcHBlckVsIiwicHJldmlvdXNUcmFuc2xhdGUiLCJ0cmFuc2xhdGVUbyIsImFuaW1hdGluZyIsInByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbiIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJvblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQiLCJkZXN0cm95ZWQiLCJ0cmFuc2l0aW9uU3RhcnQiLCJzbGlkZVRvIiwiaW5pdGlhbFNsaWRlIiwiYWxsb3dTbGlkZU5leHQiLCJhbGxvd1NsaWRlUHJldiIsInNjcm9sbFdpZHRoIiwib25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQiLCJzbGlkZVRvTG9vcCIsImxvb3BlZFNsaWRlcyIsInNsaWRlTmV4dCIsImxvb3BGaXgiLCJfY2xpZW50TGVmdCIsInNsaWRlUHJldiIsInNsaWRlUmVzZXQiLCJzbGlkZVRvQ2xvc2VzdCIsInNsaWRlc1BlclZpZXdEeW5hbWljIiwibG9vcENyZWF0ZSIsImxvb3BGaWxsR3JvdXBXaXRoQmxhbmsiLCJzbGlkZUJsYW5rQ2xhc3MiLCJsb29wQWRkaXRpb25hbFNsaWRlcyIsImNsb25lTm9kZSIsImxvb3BEZXN0cm95Iiwic2V0R3JhYkN1cnNvciIsInNpbXVsYXRlVG91Y2giLCJpc0xvY2tlZCIsImVsIiwiY3Vyc29yIiwidW5zZXRHcmFiQ3Vyc29yIiwiYXBwZW5kU2xpZGUiLCJ1cGRhdGUiLCJwcmVwZW5kU2xpZGUiLCJhZGRTbGlkZSIsInJlbW92ZVNsaWRlIiwicmVtb3ZlQWxsU2xpZGVzIiwicGxhdGZvcm0iLCJpb3MiLCJhbmRyb2lkIiwiYW5kcm9pZENocm9tZSIsImRlc2t0b3AiLCJpcGhvbmUiLCJpcG9kIiwiaXBhZCIsImVkZ2UiLCJmaXJlZm94IiwibWFjb3MiLCJ3aW5kb3dzIiwiY29yZG92YSIsInBob25lZ2FwIiwiZWxlY3Ryb24iLCJ0b0xvd2VyQ2FzZSIsIm9zIiwib3NWZXJzaW9uIiwid2ViVmlldyIsInN0YW5kYWxvbmUiLCJ3ZWJ2aWV3IiwicGl4ZWxSYXRpbyIsImRldmljZVBpeGVsUmF0aW8iLCJ0b3VjaEV2ZW50c0RhdGEiLCJ0b3VjaGVzIiwib3JpZ2luYWxFdmVudCIsInRvdWNoRXZlbnRzVGFyZ2V0IiwiaXNUb3VjaEV2ZW50IiwidHlwZSIsIndoaWNoIiwiYnV0dG9uIiwiaXNUb3VjaGVkIiwiaXNNb3ZlZCIsIm5vU3dpcGluZyIsIm5vU3dpcGluZ1NlbGVjdG9yIiwibm9Td2lwaW5nQ2xhc3MiLCJhbGxvd0NsaWNrIiwic3dpcGVIYW5kbGVyIiwiY3VycmVudFgiLCJ0YXJnZXRUb3VjaGVzIiwicGFnZVgiLCJjdXJyZW50WSIsInBhZ2VZIiwiZWRnZVN3aXBlRGV0ZWN0aW9uIiwiaU9TRWRnZVN3aXBlRGV0ZWN0aW9uIiwiZWRnZVN3aXBlVGhyZXNob2xkIiwiaU9TRWRnZVN3aXBlVGhyZXNob2xkIiwiYWxsb3dUb3VjaENhbGxiYWNrcyIsImlzU2Nyb2xsaW5nIiwic3RhcnRNb3ZpbmciLCJzdGFydFgiLCJzdGFydFkiLCJ0b3VjaFN0YXJ0VGltZSIsInN3aXBlRGlyZWN0aW9uIiwidGhyZXNob2xkIiwiYWxsb3dUaHJlc2hvbGRNb3ZlIiwiZm9ybUVsZW1lbnRzIiwiYWxsb3dUb3VjaE1vdmUiLCJ0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQiLCJ0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCIsInByZXZlbnREZWZhdWx0IiwiY2hhbmdlZFRvdWNoZXMiLCJwcmV2ZW50ZWRCeU5lc3RlZFN3aXBlciIsInRvdWNoUmVsZWFzZU9uRWRnZXMiLCJzcXJ0IiwicG93IiwiYXRhbjIiLCJQSSIsInRvdWNoQW5nbGUiLCJ0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24iLCJuZXN0ZWQiLCJzdG9wUHJvcGFnYXRpb24iLCJzdGFydFRyYW5zbGF0ZSIsImFsbG93TW9tZW50dW1Cb3VuY2UiLCJncmFiQ3Vyc29yIiwiZGlmZiIsInRvdWNoUmF0aW8iLCJjdXJyZW50VHJhbnNsYXRlIiwicmVzaXN0YW5jZVJhdGlvIiwicmVzaXN0YW5jZSIsImZvbGxvd0ZpbmdlciIsImZyZWVNb2RlIiwidmVsb2NpdGllcyIsInBvc2l0aW9uIiwidGltZSIsImxhc3RDbGlja1RpbWUiLCJmcmVlTW9kZU1vbWVudHVtIiwicG9wIiwidmVsb2NpdHkiLCJmcmVlTW9kZU1pbmltdW1WZWxvY2l0eSIsImZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvIiwiZnJlZU1vZGVNb21lbnR1bVJhdGlvIiwiZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvIiwiZnJlZU1vZGVNb21lbnR1bUJvdW5jZSIsImZyZWVNb2RlU3RpY2t5IiwibG9uZ1N3aXBlc01zIiwibG9uZ1N3aXBlcyIsImxvbmdTd2lwZXNSYXRpbyIsInNob3J0U3dpcGVzIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsImJyZWFrcG9pbnRzIiwic2V0QnJlYWtwb2ludCIsImF1dG9wbGF5IiwicnVubmluZyIsInBhdXNlZCIsInJ1biIsInByZXZlbnRDbGlja3MiLCJwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24iLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJpbml0IiwiZGlyZWN0aW9uIiwidXBkYXRlT25XaW5kb3dSZXNpemUiLCJ1bmlxdWVOYXZFbGVtZW50cyIsInByZWxvYWRJbWFnZXMiLCJ1cGRhdGVPbkltYWdlc1JlYWR5IiwicGFzc2l2ZUxpc3RlbmVycyIsImNvbnRhaW5lck1vZGlmaWVyQ2xhc3MiLCJ3cmFwcGVyQ2xhc3MiLCJzbGlkZSIsIm1hbmlwdWxhdGlvbiIsImF0dGFjaEV2ZW50cyIsInRvdWNoRXZlbnRzIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwib25TY3JvbGwiLCJvbkNsaWNrIiwic3RhcnQiLCJtb3ZlIiwiZW5kIiwicGFzc2l2ZSIsImNhcHR1cmUiLCJjYW5jZWwiLCJkZXRhY2hFdmVudHMiLCJnZXRCcmVha3BvaW50IiwiY3VycmVudEJyZWFrcG9pbnQiLCJvcmlnaW5hbFBhcmFtcyIsImNoYW5nZURpcmVjdGlvbiIsInN1YnN0ciIsInZhbHVlIiwiaW5uZXJIZWlnaHQiLCJwb2ludCIsInNvcnQiLCJpbm5lcldpZHRoIiwiY2xhc3NlcyIsImFkZENsYXNzZXMiLCJjbGFzc05hbWVzIiwicnRsIiwicmVtb3ZlQ2xhc3NlcyIsImltYWdlcyIsImxvYWRJbWFnZSIsImNvbXBsZXRlIiwib25sb2FkIiwib25lcnJvciIsInNpemVzIiwic3Jjc2V0Iiwic3JjIiwiaW1hZ2VzTG9hZGVkIiwiaW1hZ2VzVG9Mb2FkIiwiY3VycmVudFNyYyIsInBhc3NlZFBhcmFtcyIsInN3aXBlciIsInNoYWRvd1Jvb3QiLCJkaXIiLCJ0b3VjaEV2ZW50c1RvdWNoIiwidG91Y2hFdmVudHNEZXNrdG9wIiwiY2xpY2tUaW1lb3V0IiwiX19wcm90b19fIiwiZXh0ZW5kZWREZWZhdWx0cyIsImRlZmF1bHRzIiwiZGVzdHJveSIsImV4dGVuZERlZmF1bHRzIiwiZGV2aWNlIiwic3VwcG9ydCIsImlzRWRnZSIsImlzU2FmYXJpIiwiaXNVaVdlYlZpZXciLCJ0ZXN0IiwiYnJvd3NlciIsInJlc2l6ZSIsInJlc2l6ZUhhbmRsZXIiLCJvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIiLCJmdW5jIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYmtpdE11dGF0aW9uT2JzZXJ2ZXIiLCJhdHRhY2giLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImNoaWxkTGlzdCIsImNoYXJhY3RlckRhdGEiLCJvYnNlcnZlcnMiLCJvYnNlcnZlUGFyZW50cyIsIm9ic2VydmVTbGlkZUNoaWxkcmVuIiwiZGlzY29ubmVjdCIsImFkZFNsaWRlc0JlZm9yZSIsImFkZFNsaWRlc0FmdGVyIiwiZnJvbSIsInRvIiwicmVuZGVyU2xpZGUiLCJsYXp5IiwibG9hZCIsInJlbmRlckV4dGVybmFsIiwiY2FjaGUiLCJiZWZvcmVJbml0IiwiaGFuZGxlIiwia2V5Q29kZSIsImNoYXJDb2RlIiwic2hpZnRLZXkiLCJhbHRLZXkiLCJjdHJsS2V5IiwibWV0YUtleSIsImtleWJvYXJkIiwib25seUluVmlld3BvcnQiLCJyZXR1cm5WYWx1ZSIsImVuYWJsZSIsImRpc2FibGUiLCJsYXN0U2Nyb2xsVGltZSIsImxhc3RFdmVudEJlZm9yZVNuYXAiLCJyZWNlbnRXaGVlbEV2ZW50cyIsImV2ZW50Iiwib253aGVlbCIsImltcGxlbWVudGF0aW9uIiwiaGFzRmVhdHVyZSIsIm5vcm1hbGl6ZSIsIndoZWVsRGVsdGEiLCJ3aGVlbERlbHRhWSIsIndoZWVsRGVsdGFYIiwiYXhpcyIsIkhPUklaT05UQUxfQVhJUyIsImRlbHRhWSIsImRlbHRhWCIsImRlbHRhTW9kZSIsInNwaW5YIiwic3BpblkiLCJwaXhlbFgiLCJwaXhlbFkiLCJoYW5kbGVNb3VzZUVudGVyIiwibW91c2VFbnRlcmVkIiwiaGFuZGxlTW91c2VMZWF2ZSIsIm1vdXNld2hlZWwiLCJldmVudHNUYXJnZWQiLCJyZWxlYXNlT25FZGdlcyIsImZvcmNlVG9BeGlzIiwiaW52ZXJ0IiwiZGVsdGEiLCJzaWduIiwic2Vuc2l0aXZpdHkiLCJ0aW1lb3V0Iiwic2hpZnQiLCJhdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uIiwic3RvcCIsInJhdyIsImFuaW1hdGVTbGlkZXIiLCJyZWxlYXNlU2Nyb2xsIiwiZ2V0VGltZSIsIm5lIiwiJG5leHRFbCIsIiRwcmV2RWwiLCJkaXNhYmxlZENsYXNzIiwibG9ja0NsYXNzIiwib25QcmV2Q2xpY2siLCJvbk5leHRDbGljayIsIm9lIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiYnVsbGV0cyIsImR5bmFtaWNCdWxsZXRzIiwiYnVsbGV0U2l6ZSIsImR5bmFtaWNNYWluQnVsbGV0cyIsImR5bmFtaWNCdWxsZXRJbmRleCIsImJ1bGxldEFjdGl2ZUNsYXNzIiwiY3VycmVudENsYXNzIiwiZm9ybWF0RnJhY3Rpb25DdXJyZW50IiwidG90YWxDbGFzcyIsImZvcm1hdEZyYWN0aW9uVG90YWwiLCJwcm9ncmVzc2Jhck9wcG9zaXRlIiwicHJvZ3Jlc3NiYXJGaWxsQ2xhc3MiLCJyZW5kZXJDdXN0b20iLCJyZW5kZXIiLCJyZW5kZXJCdWxsZXQiLCJidWxsZXRDbGFzcyIsImJ1bGxldEVsZW1lbnQiLCJyZW5kZXJGcmFjdGlvbiIsInJlbmRlclByb2dyZXNzYmFyIiwiY2xpY2thYmxlIiwiY2xpY2thYmxlQ2xhc3MiLCJtb2RpZmllckNsYXNzIiwicHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzIiwiaGlkZGVuQ2xhc3MiLCJsZSIsInNjcm9sbGJhciIsImRyYWdTaXplIiwidHJhY2tTaXplIiwiJGRyYWdFbCIsImhpZGUiLCJvcGFjaXR5IiwiZGlzcGxheSIsImRpdmlkZXIiLCJtb3ZlRGl2aWRlciIsImdldFBvaW50ZXJQb3NpdGlvbiIsImNsaWVudFgiLCJjbGllbnRZIiwic2V0RHJhZ1Bvc2l0aW9uIiwiZHJhZ1N0YXJ0UG9zIiwib25EcmFnU3RhcnQiLCJkcmFnVGltZW91dCIsIm9uRHJhZ01vdmUiLCJvbkRyYWdFbmQiLCJzbmFwT25SZWxlYXNlIiwiZW5hYmxlRHJhZ2dhYmxlIiwiZGlzYWJsZURyYWdnYWJsZSIsImRyYWdDbGFzcyIsImRyYWdFbCIsImRyYWdnYWJsZSIsImRlIiwic2V0VHJhbnNmb3JtIiwicGFyYWxsYXgiLCJoZSIsImdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMiLCJvbkdlc3R1cmVTdGFydCIsInpvb20iLCJnZXN0dXJlIiwiZmFrZUdlc3R1cmVUb3VjaGVkIiwiZmFrZUdlc3R1cmVNb3ZlZCIsInNjYWxlU3RhcnQiLCIkc2xpZGVFbCIsIiRpbWFnZUVsIiwiJGltYWdlV3JhcEVsIiwiY29udGFpbmVyQ2xhc3MiLCJtYXhSYXRpbyIsImlzU2NhbGluZyIsIm9uR2VzdHVyZUNoYW5nZSIsInNjYWxlTW92ZSIsInNjYWxlIiwiY3VycmVudFNjYWxlIiwibWluUmF0aW8iLCJvbkdlc3R1cmVFbmQiLCJpbWFnZSIsInRvdWNoZXNTdGFydCIsInNsaWRlV2lkdGgiLCJzbGlkZUhlaWdodCIsIm1pblgiLCJtYXhYIiwibWluWSIsIm1heFkiLCJ0b3VjaGVzQ3VycmVudCIsInByZXZQb3NpdGlvblgiLCJwcmV2UG9zaXRpb25ZIiwicHJldlRpbWUiLCJvblRyYW5zaXRpb25FbmQiLCJvdXQiLCJpbiIsInpvb21lZFNsaWRlQ2xhc3MiLCJwZSIsImxvYWRJblNsaWRlIiwiZWxlbWVudENsYXNzIiwibG9hZGVkQ2xhc3MiLCJsb2FkaW5nQ2xhc3MiLCJwcmVsb2FkZXJDbGFzcyIsImluaXRpYWxJbWFnZUxvYWRlZCIsImxvYWRQcmV2TmV4dCIsImxvYWRQcmV2TmV4dEFtb3VudCIsImNlIiwiTGluZWFyU3BsaW5lIiwibGFzdEluZGV4IiwiaW50ZXJwb2xhdGUiLCJnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uIiwiY29udHJvbGxlciIsInNwbGluZSIsImNvbnRyb2wiLCJieSIsImludmVyc2UiLCJ1ZSIsIm1ha2VFbEZvY3VzYWJsZSIsIm1ha2VFbE5vdEZvY3VzYWJsZSIsImFkZEVsUm9sZSIsImFkZEVsTGFiZWwiLCJkaXNhYmxlRWwiLCJlbmFibGVFbCIsIm9uRW50ZXJLZXkiLCJhMTF5Iiwibm90aWZ5IiwibGFzdFNsaWRlTWVzc2FnZSIsIm5leHRTbGlkZU1lc3NhZ2UiLCJmaXJzdFNsaWRlTWVzc2FnZSIsInByZXZTbGlkZU1lc3NhZ2UiLCJjbGljayIsImxpdmVSZWdpb24iLCJ1cGRhdGVOYXZpZ2F0aW9uIiwidXBkYXRlUGFnaW5hdGlvbiIsInBhZ2luYXRpb25CdWxsZXRNZXNzYWdlIiwidmUiLCJoYXNoTmF2aWdhdGlvbiIsInBhdGhzIiwiZ2V0UGF0aFZhbHVlcyIsImtleSIsInNjcm9sbFRvU2xpZGUiLCJzZXRIaXN0b3J5UG9wU3RhdGUiLCJzZXRIaXN0b3J5Iiwic2x1Z2lmeSIsImluY2x1ZGVzIiwic3RhdGUiLCJmZSIsIm9uSGFzaENhbmdlIiwic2V0SGFzaCIsIndhdGNoU3RhdGUiLCJtZSIsImRlbGF5IiwicmV2ZXJzZURpcmVjdGlvbiIsInN0b3BPbkxhc3RTbGlkZSIsInBhdXNlIiwid2FpdEZvclRyYW5zaXRpb24iLCJnZSIsImZhZGVFZmZlY3QiLCJjcm9zc0ZhZGUiLCJiZSIsImN1YmVFZmZlY3QiLCJzaGFkb3ciLCJzbGlkZVNoYWRvd3MiLCJzaGFkb3dPZmZzZXQiLCJzaGFkb3dTY2FsZSIsInNpbiIsImNvcyIsIndlIiwiZmxpcEVmZmVjdCIsImxpbWl0Um90YXRpb24iLCJ6SW5kZXgiLCJyb3VuZCIsInllIiwiY292ZXJmbG93RWZmZWN0Iiwicm90YXRlIiwiZGVwdGgiLCJtb2RpZmllciIsInN0cmV0Y2giLCJwcmVmaXhlZFBvaW50ZXJFdmVudHMiLCJwZXJzcGVjdGl2ZU9yaWdpbiIsInhlIiwidGh1bWJzIiwic3dpcGVyQ3JlYXRlZCIsInRodW1ic0NvbnRhaW5lckNsYXNzIiwib25UaHVtYkNsaWNrIiwic2xpZGVUaHVtYkFjdGl2ZUNsYXNzIiwiYXV0b1Njcm9sbE9mZnNldCIsIm11bHRpcGxlQWN0aXZlVGh1bWJzIiwiRWUiLCJoaWRlT25DbGljayIsInRvRWRnZSIsImZyb21FZGdlIiwiYWN0aXZlSW5kZXhDaGFuZ2UiLCJzbmFwSW5kZXhDaGFuZ2UiLCJzbGlkZXNMZW5ndGhDaGFuZ2UiLCJzbmFwR3JpZExlbmd0aENoYW5nZSIsIm9ic2VydmVyVXBkYXRlIiwidG91Y2hTdGFydCIsInRvdWNoRW5kIiwiZG91YmxlVGFwIiwic2xpZGVDaGFuZ2UiLCJsb2FkT25UcmFuc2l0aW9uU3RhcnQiLCJzY3JvbGwiLCJzY3JvbGxiYXJEcmFnTW92ZSIsIm5vdGlmaWNhdGlvbkNsYXNzIiwicGFnaW5hdGlvblVwZGF0ZSIsImRpc2FibGVPbkludGVyYWN0aW9uIiwib25WaXNpYmlsaXR5Q2hhbmdlIiwidmlzaWJpbGl0eVN0YXRlIiwiYmVmb3JlVHJhbnNpdGlvblN0YXJ0Iiwic2xpZGVyRmlyc3RNb3ZlIiwiYmVmb3JlRGVzdHJveSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJwSXRlbXMiLCJ0aW1lciIsInNjcm9sbGVyIiwiaW5WaWV3Iiwid1QiLCJwYWdlWU9mZnNldCIsIndCIiwiY1JlY3QiLCJwVCIsInBCIiwibG9hZEZ1bGxJbWFnZSIsIml0ZW0iLCJkYXRhc2V0IiwiaW1nIiwiY2xhc3NOYW1lIiwiYWx0IiwiYWRkSW1nIiwiYmVmb3JlIiwicmVxdWlyZSIsIlN3aXBlciIsInRoZW4iLCJkZWZhdWx0IiwiZ2FwIiwiY2FsY1NsaWRlciIsInNlcnZpY2VzU2xpZGVyIiwidXBkYXRlU2xpZGVyIiwibWF4U2xpZGVXaWR0aCIsImFtb3VudCIsInRydW5jIiwicG9ydGZvbGlvU2xpZGVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLDRDQUE0QyxrQkFBa0I7UUFDOUQ7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTs7UUFFQTtRQUNBLGlDQUFpQzs7UUFFakM7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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c0IrSCxLQUF0QixHQUE4QixJQUE5QjtBQUNEOztBQUVELElBQUl1a0IsZUFBZSxHQUFHLElBQUlWLE1BQUosQ0FBVyxtQkFBWCxFQUFnQztBQUNwRGphLFlBQVUsRUFBRSxJQUR3QztBQUVwRDVKLE9BQUssRUFBRSxHQUY2QztBQUdwRHlCLE1BQUksRUFBRSxJQUg4QztBQUlwRGlLLFVBQVEsRUFBRTtBQUNSa1QsU0FBSyxFQUFFLElBREM7QUFFUnVELHdCQUFvQixFQUFFO0FBRmQsR0FKMEM7QUFRcER2TSxZQUFVLEVBQUU7QUFDVm5SLE1BQUUsRUFBRSx1QkFETTtBQUVWd1MsYUFBUyxFQUFFO0FBRkQ7QUFSd0MsQ0FBaEMsQ0FBdEIsQyIsImZpbGUiOiJqcy9ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG4gXHRcdHZhciBwcmVmZXRjaENodW5rcyA9IGRhdGFbM10gfHwgW107XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuIFx0XHRkZWZlcnJlZFByZWZldGNoLnB1c2guYXBwbHkoZGVmZXJyZWRQcmVmZXRjaCwgcHJlZmV0Y2hDaHVua3MpO1xuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKGRlZmVycmVkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcbiBcdFx0XHQvLyBjaHVuayBwcmVmZXRjaGluZyBmb3IgamF2YXNjcmlwdFxuIFx0XHRcdGRlZmVycmVkUHJlZmV0Y2guZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBudWxsO1xuIFx0XHRcdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuIFx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0bGluay5yZWwgPSBcInByZWZldGNoXCI7XG4gXHRcdFx0XHRcdGxpbmsuYXMgPSBcInNjcmlwdFwiO1xuIFx0XHRcdFx0XHRsaW5rLmhyZWYgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcbiBcdFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9KTtcbiBcdFx0XHRkZWZlcnJlZFByZWZldGNoLmxlbmd0aCA9IDA7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaG9tZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW10sIGRlZmVycmVkUHJlZmV0Y2ggPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwianMvXCIgKyAoe1wiZm9vdGVyXCI6XCJmb290ZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi4vLi4vXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0dmFyIHN0YXJ0dXBSZXN1bHQgPSAoZnVuY3Rpb24oKSB7XG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc35hYm91dH5jb250YWN0fmhvbWV+cG9ydGZvbGlvfnNlcnZpY2VzfnRlYW1+dmFjYW5jaWVzXCIsXCJhYm91dH5ob21lXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fSkoKTtcblxuIFx0d2VicGFja0pzb25wQ2FsbGJhY2soW1tdLCB7fSwgMCwgW1wiZm9vdGVyXCJdXSk7XG4gXHRyZXR1cm4gc3RhcnR1cFJlc3VsdDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8qKlxyXG4gKiBTd2lwZXIgNS40LjFcclxuICogTW9zdCBtb2Rlcm4gbW9iaWxlIHRvdWNoIHNsaWRlciBhbmQgZnJhbWV3b3JrIHdpdGggaGFyZHdhcmUgYWNjZWxlcmF0ZWQgdHJhbnNpdGlvbnNcclxuICogaHR0cDovL3N3aXBlcmpzLmNvbVxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIwIFZsYWRpbWlyIEtoYXJsYW1waWRpXHJcbiAqXHJcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKlxyXG4gKiBSZWxlYXNlZCBvbjogTWF5IDIwLCAyMDIwXHJcbiAqL1xyXG5cclxuIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9ZXx8c2VsZikuU3dpcGVyPXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUpe3JldHVybiBudWxsIT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJlwiY29uc3RydWN0b3JcImluIGUmJmUuY29uc3RydWN0b3I9PT1PYmplY3R9ZnVuY3Rpb24gdChpLHMpe3ZvaWQgMD09PWkmJihpPXt9KSx2b2lkIDA9PT1zJiYocz17fSksT2JqZWN0LmtleXMocykuZm9yRWFjaCgoZnVuY3Rpb24oYSl7dm9pZCAwPT09aVthXT9pW2FdPXNbYV06ZShzW2FdKSYmZShpW2FdKSYmT2JqZWN0LmtleXMoc1thXSkubGVuZ3RoPjAmJnQoaVthXSxzW2FdKX0pKX12YXIgaT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQ/ZG9jdW1lbnQ6e30scz17Ym9keTp7fSxhZGRFdmVudExpc3RlbmVyOmZ1bmN0aW9uKCl7fSxyZW1vdmVFdmVudExpc3RlbmVyOmZ1bmN0aW9uKCl7fSxhY3RpdmVFbGVtZW50OntibHVyOmZ1bmN0aW9uKCl7fSxub2RlTmFtZTpcIlwifSxxdWVyeVNlbGVjdG9yOmZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9LHF1ZXJ5U2VsZWN0b3JBbGw6ZnVuY3Rpb24oKXtyZXR1cm5bXX0sZ2V0RWxlbWVudEJ5SWQ6ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH0sY3JlYXRlRXZlbnQ6ZnVuY3Rpb24oKXtyZXR1cm57aW5pdEV2ZW50OmZ1bmN0aW9uKCl7fX19LGNyZWF0ZUVsZW1lbnQ6ZnVuY3Rpb24oKXtyZXR1cm57Y2hpbGRyZW46W10sY2hpbGROb2RlczpbXSxzdHlsZTp7fSxzZXRBdHRyaWJ1dGU6ZnVuY3Rpb24oKXt9LGdldEVsZW1lbnRzQnlUYWdOYW1lOmZ1bmN0aW9uKCl7cmV0dXJuW119fX0sY3JlYXRlRWxlbWVudE5TOmZ1bmN0aW9uKCl7cmV0dXJue319LGltcG9ydE5vZGU6ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH0sbG9jYXRpb246e2hhc2g6XCJcIixob3N0OlwiXCIsaG9zdG5hbWU6XCJcIixocmVmOlwiXCIsb3JpZ2luOlwiXCIscGF0aG5hbWU6XCJcIixwcm90b2NvbDpcIlwiLHNlYXJjaDpcIlwifX07dChpLHMpO3ZhciBhPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9O3QoYSx7ZG9jdW1lbnQ6cyxuYXZpZ2F0b3I6e3VzZXJBZ2VudDpcIlwifSxsb2NhdGlvbjp7aGFzaDpcIlwiLGhvc3Q6XCJcIixob3N0bmFtZTpcIlwiLGhyZWY6XCJcIixvcmlnaW46XCJcIixwYXRobmFtZTpcIlwiLHByb3RvY29sOlwiXCIsc2VhcmNoOlwiXCJ9LGhpc3Rvcnk6e3JlcGxhY2VTdGF0ZTpmdW5jdGlvbigpe30scHVzaFN0YXRlOmZ1bmN0aW9uKCl7fSxnbzpmdW5jdGlvbigpe30sYmFjazpmdW5jdGlvbigpe319LEN1c3RvbUV2ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9LGFkZEV2ZW50TGlzdGVuZXI6ZnVuY3Rpb24oKXt9LHJlbW92ZUV2ZW50TGlzdGVuZXI6ZnVuY3Rpb24oKXt9LGdldENvbXB1dGVkU3R5bGU6ZnVuY3Rpb24oKXtyZXR1cm57Z2V0UHJvcGVydHlWYWx1ZTpmdW5jdGlvbigpe3JldHVyblwiXCJ9fX0sSW1hZ2U6ZnVuY3Rpb24oKXt9LERhdGU6ZnVuY3Rpb24oKXt9LHNjcmVlbjp7fSxzZXRUaW1lb3V0OmZ1bmN0aW9uKCl7fSxjbGVhclRpbWVvdXQ6ZnVuY3Rpb24oKXt9LG1hdGNoTWVkaWE6ZnVuY3Rpb24oKXtyZXR1cm57fX19KTt2YXIgcj1mdW5jdGlvbihlKXtmb3IodmFyIHQ9MDt0PGUubGVuZ3RoO3QrPTEpdGhpc1t0XT1lW3RdO3JldHVybiB0aGlzLmxlbmd0aD1lLmxlbmd0aCx0aGlzfTtmdW5jdGlvbiBuKGUsdCl7dmFyIHM9W10sbj0wO2lmKGUmJiF0JiZlIGluc3RhbmNlb2YgcilyZXR1cm4gZTtpZihlKWlmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXt2YXIgbyxsLGQ9ZS50cmltKCk7aWYoZC5pbmRleE9mKFwiPFwiKT49MCYmZC5pbmRleE9mKFwiPlwiKT49MCl7dmFyIGg9XCJkaXZcIjtmb3IoMD09PWQuaW5kZXhPZihcIjxsaVwiKSYmKGg9XCJ1bFwiKSwwPT09ZC5pbmRleE9mKFwiPHRyXCIpJiYoaD1cInRib2R5XCIpLDAhPT1kLmluZGV4T2YoXCI8dGRcIikmJjAhPT1kLmluZGV4T2YoXCI8dGhcIil8fChoPVwidHJcIiksMD09PWQuaW5kZXhPZihcIjx0Ym9keVwiKSYmKGg9XCJ0YWJsZVwiKSwwPT09ZC5pbmRleE9mKFwiPG9wdGlvblwiKSYmKGg9XCJzZWxlY3RcIiksKGw9aS5jcmVhdGVFbGVtZW50KGgpKS5pbm5lckhUTUw9ZCxuPTA7bjxsLmNoaWxkTm9kZXMubGVuZ3RoO24rPTEpcy5wdXNoKGwuY2hpbGROb2Rlc1tuXSl9ZWxzZSBmb3Iobz10fHxcIiNcIiE9PWVbMF18fGUubWF0Y2goL1sgLjw+On5dLyk/KHR8fGkpLnF1ZXJ5U2VsZWN0b3JBbGwoZS50cmltKCkpOltpLmdldEVsZW1lbnRCeUlkKGUudHJpbSgpLnNwbGl0KFwiI1wiKVsxXSldLG49MDtuPG8ubGVuZ3RoO24rPTEpb1tuXSYmcy5wdXNoKG9bbl0pfWVsc2UgaWYoZS5ub2RlVHlwZXx8ZT09PWF8fGU9PT1pKXMucHVzaChlKTtlbHNlIGlmKGUubGVuZ3RoPjAmJmVbMF0ubm9kZVR5cGUpZm9yKG49MDtuPGUubGVuZ3RoO24rPTEpcy5wdXNoKGVbbl0pO3JldHVybiBuZXcgcihzKX1mdW5jdGlvbiBvKGUpe2Zvcih2YXIgdD1bXSxpPTA7aTxlLmxlbmd0aDtpKz0xKS0xPT09dC5pbmRleE9mKGVbaV0pJiZ0LnB1c2goZVtpXSk7cmV0dXJuIHR9bi5mbj1yLnByb3RvdHlwZSxuLkNsYXNzPXIsbi5Eb203PXI7dmFyIGw9e2FkZENsYXNzOmZ1bmN0aW9uKGUpe2lmKHZvaWQgMD09PWUpcmV0dXJuIHRoaXM7Zm9yKHZhciB0PWUuc3BsaXQoXCIgXCIpLGk9MDtpPHQubGVuZ3RoO2krPTEpZm9yKHZhciBzPTA7czx0aGlzLmxlbmd0aDtzKz0xKXZvaWQgMCE9PXRoaXNbc10mJnZvaWQgMCE9PXRoaXNbc10uY2xhc3NMaXN0JiZ0aGlzW3NdLmNsYXNzTGlzdC5hZGQodFtpXSk7cmV0dXJuIHRoaXN9LHJlbW92ZUNsYXNzOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLnNwbGl0KFwiIFwiKSxpPTA7aTx0Lmxlbmd0aDtpKz0xKWZvcih2YXIgcz0wO3M8dGhpcy5sZW5ndGg7cys9MSl2b2lkIDAhPT10aGlzW3NdJiZ2b2lkIDAhPT10aGlzW3NdLmNsYXNzTGlzdCYmdGhpc1tzXS5jbGFzc0xpc3QucmVtb3ZlKHRbaV0pO3JldHVybiB0aGlzfSxoYXNDbGFzczpmdW5jdGlvbihlKXtyZXR1cm4hIXRoaXNbMF0mJnRoaXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKGUpfSx0b2dnbGVDbGFzczpmdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5zcGxpdChcIiBcIiksaT0wO2k8dC5sZW5ndGg7aSs9MSlmb3IodmFyIHM9MDtzPHRoaXMubGVuZ3RoO3MrPTEpdm9pZCAwIT09dGhpc1tzXSYmdm9pZCAwIT09dGhpc1tzXS5jbGFzc0xpc3QmJnRoaXNbc10uY2xhc3NMaXN0LnRvZ2dsZSh0W2ldKTtyZXR1cm4gdGhpc30sYXR0cjpmdW5jdGlvbihlLHQpe3ZhciBpPWFyZ3VtZW50cztpZigxPT09YXJndW1lbnRzLmxlbmd0aCYmXCJzdHJpbmdcIj09dHlwZW9mIGUpcmV0dXJuIHRoaXNbMF0/dGhpc1swXS5nZXRBdHRyaWJ1dGUoZSk6dm9pZCAwO2Zvcih2YXIgcz0wO3M8dGhpcy5sZW5ndGg7cys9MSlpZigyPT09aS5sZW5ndGgpdGhpc1tzXS5zZXRBdHRyaWJ1dGUoZSx0KTtlbHNlIGZvcih2YXIgYSBpbiBlKXRoaXNbc11bYV09ZVthXSx0aGlzW3NdLnNldEF0dHJpYnV0ZShhLGVbYV0pO3JldHVybiB0aGlzfSxyZW1vdmVBdHRyOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0wO3Q8dGhpcy5sZW5ndGg7dCs9MSl0aGlzW3RdLnJlbW92ZUF0dHJpYnV0ZShlKTtyZXR1cm4gdGhpc30sZGF0YTpmdW5jdGlvbihlLHQpe3ZhciBpO2lmKHZvaWQgMCE9PXQpe2Zvcih2YXIgcz0wO3M8dGhpcy5sZW5ndGg7cys9MSkoaT10aGlzW3NdKS5kb203RWxlbWVudERhdGFTdG9yYWdlfHwoaS5kb203RWxlbWVudERhdGFTdG9yYWdlPXt9KSxpLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2VbZV09dDtyZXR1cm4gdGhpc31pZihpPXRoaXNbMF0pe2lmKGkuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSYmZSBpbiBpLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UpcmV0dXJuIGkuZG9tN0VsZW1lbnREYXRhU3RvcmFnZVtlXTt2YXIgYT1pLmdldEF0dHJpYnV0ZShcImRhdGEtXCIrZSk7cmV0dXJuIGF8fHZvaWQgMH19LHRyYW5zZm9ybTpmdW5jdGlvbihlKXtmb3IodmFyIHQ9MDt0PHRoaXMubGVuZ3RoO3QrPTEpe3ZhciBpPXRoaXNbdF0uc3R5bGU7aS53ZWJraXRUcmFuc2Zvcm09ZSxpLnRyYW5zZm9ybT1lfXJldHVybiB0aGlzfSx0cmFuc2l0aW9uOmZ1bmN0aW9uKGUpe1wic3RyaW5nXCIhPXR5cGVvZiBlJiYoZSs9XCJtc1wiKTtmb3IodmFyIHQ9MDt0PHRoaXMubGVuZ3RoO3QrPTEpe3ZhciBpPXRoaXNbdF0uc3R5bGU7aS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb249ZSxpLnRyYW5zaXRpb25EdXJhdGlvbj1lfXJldHVybiB0aGlzfSxvbjpmdW5jdGlvbigpe2Zvcih2YXIgZSx0PVtdLGk9YXJndW1lbnRzLmxlbmd0aDtpLS07KXRbaV09YXJndW1lbnRzW2ldO3ZhciBzPXRbMF0sYT10WzFdLHI9dFsyXSxvPXRbM107ZnVuY3Rpb24gbChlKXt2YXIgdD1lLnRhcmdldDtpZih0KXt2YXIgaT1lLnRhcmdldC5kb203RXZlbnREYXRhfHxbXTtpZihpLmluZGV4T2YoZSk8MCYmaS51bnNoaWZ0KGUpLG4odCkuaXMoYSkpci5hcHBseSh0LGkpO2Vsc2UgZm9yKHZhciBzPW4odCkucGFyZW50cygpLG89MDtvPHMubGVuZ3RoO28rPTEpbihzW29dKS5pcyhhKSYmci5hcHBseShzW29dLGkpfX1mdW5jdGlvbiBkKGUpe3ZhciB0PWUmJmUudGFyZ2V0JiZlLnRhcmdldC5kb203RXZlbnREYXRhfHxbXTt0LmluZGV4T2YoZSk8MCYmdC51bnNoaWZ0KGUpLHIuYXBwbHkodGhpcyx0KX1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0WzFdJiYocz0oZT10KVswXSxyPWVbMV0sbz1lWzJdLGE9dm9pZCAwKSxvfHwobz0hMSk7Zm9yKHZhciBoLHA9cy5zcGxpdChcIiBcIiksYz0wO2M8dGhpcy5sZW5ndGg7Yys9MSl7dmFyIHU9dGhpc1tjXTtpZihhKWZvcihoPTA7aDxwLmxlbmd0aDtoKz0xKXt2YXIgdj1wW2hdO3UuZG9tN0xpdmVMaXN0ZW5lcnN8fCh1LmRvbTdMaXZlTGlzdGVuZXJzPXt9KSx1LmRvbTdMaXZlTGlzdGVuZXJzW3ZdfHwodS5kb203TGl2ZUxpc3RlbmVyc1t2XT1bXSksdS5kb203TGl2ZUxpc3RlbmVyc1t2XS5wdXNoKHtsaXN0ZW5lcjpyLHByb3h5TGlzdGVuZXI6bH0pLHUuYWRkRXZlbnRMaXN0ZW5lcih2LGwsbyl9ZWxzZSBmb3IoaD0wO2g8cC5sZW5ndGg7aCs9MSl7dmFyIGY9cFtoXTt1LmRvbTdMaXN0ZW5lcnN8fCh1LmRvbTdMaXN0ZW5lcnM9e30pLHUuZG9tN0xpc3RlbmVyc1tmXXx8KHUuZG9tN0xpc3RlbmVyc1tmXT1bXSksdS5kb203TGlzdGVuZXJzW2ZdLnB1c2goe2xpc3RlbmVyOnIscHJveHlMaXN0ZW5lcjpkfSksdS5hZGRFdmVudExpc3RlbmVyKGYsZCxvKX19cmV0dXJuIHRoaXN9LG9mZjpmdW5jdGlvbigpe2Zvcih2YXIgZSx0PVtdLGk9YXJndW1lbnRzLmxlbmd0aDtpLS07KXRbaV09YXJndW1lbnRzW2ldO3ZhciBzPXRbMF0sYT10WzFdLHI9dFsyXSxuPXRbM107XCJmdW5jdGlvblwiPT10eXBlb2YgdFsxXSYmKHM9KGU9dClbMF0scj1lWzFdLG49ZVsyXSxhPXZvaWQgMCksbnx8KG49ITEpO2Zvcih2YXIgbz1zLnNwbGl0KFwiIFwiKSxsPTA7bDxvLmxlbmd0aDtsKz0xKWZvcih2YXIgZD1vW2xdLGg9MDtoPHRoaXMubGVuZ3RoO2grPTEpe3ZhciBwPXRoaXNbaF0sYz12b2lkIDA7aWYoIWEmJnAuZG9tN0xpc3RlbmVycz9jPXAuZG9tN0xpc3RlbmVyc1tkXTphJiZwLmRvbTdMaXZlTGlzdGVuZXJzJiYoYz1wLmRvbTdMaXZlTGlzdGVuZXJzW2RdKSxjJiZjLmxlbmd0aClmb3IodmFyIHU9Yy5sZW5ndGgtMTt1Pj0wO3UtPTEpe3ZhciB2PWNbdV07ciYmdi5saXN0ZW5lcj09PXJ8fHImJnYubGlzdGVuZXImJnYubGlzdGVuZXIuZG9tN3Byb3h5JiZ2Lmxpc3RlbmVyLmRvbTdwcm94eT09PXI/KHAucmVtb3ZlRXZlbnRMaXN0ZW5lcihkLHYucHJveHlMaXN0ZW5lcixuKSxjLnNwbGljZSh1LDEpKTpyfHwocC5yZW1vdmVFdmVudExpc3RlbmVyKGQsdi5wcm94eUxpc3RlbmVyLG4pLGMuc3BsaWNlKHUsMSkpfX1yZXR1cm4gdGhpc30sdHJpZ2dlcjpmdW5jdGlvbigpe2Zvcih2YXIgZT1bXSx0PWFyZ3VtZW50cy5sZW5ndGg7dC0tOyllW3RdPWFyZ3VtZW50c1t0XTtmb3IodmFyIHM9ZVswXS5zcGxpdChcIiBcIikscj1lWzFdLG49MDtuPHMubGVuZ3RoO24rPTEpZm9yKHZhciBvPXNbbl0sbD0wO2w8dGhpcy5sZW5ndGg7bCs9MSl7dmFyIGQ9dGhpc1tsXSxoPXZvaWQgMDt0cnl7aD1uZXcgYS5DdXN0b21FdmVudChvLHtkZXRhaWw6cixidWJibGVzOiEwLGNhbmNlbGFibGU6ITB9KX1jYXRjaChlKXsoaD1pLmNyZWF0ZUV2ZW50KFwiRXZlbnRcIikpLmluaXRFdmVudChvLCEwLCEwKSxoLmRldGFpbD1yfWQuZG9tN0V2ZW50RGF0YT1lLmZpbHRlcigoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdD4wfSkpLGQuZGlzcGF0Y2hFdmVudChoKSxkLmRvbTdFdmVudERhdGE9W10sZGVsZXRlIGQuZG9tN0V2ZW50RGF0YX1yZXR1cm4gdGhpc30sdHJhbnNpdGlvbkVuZDpmdW5jdGlvbihlKXt2YXIgdCxpPVtcIndlYmtpdFRyYW5zaXRpb25FbmRcIixcInRyYW5zaXRpb25lbmRcIl0scz10aGlzO2Z1bmN0aW9uIGEocil7aWYoci50YXJnZXQ9PT10aGlzKWZvcihlLmNhbGwodGhpcyxyKSx0PTA7dDxpLmxlbmd0aDt0Kz0xKXMub2ZmKGlbdF0sYSl9aWYoZSlmb3IodD0wO3Q8aS5sZW5ndGg7dCs9MSlzLm9uKGlbdF0sYSk7cmV0dXJuIHRoaXN9LG91dGVyV2lkdGg6ZnVuY3Rpb24oZSl7aWYodGhpcy5sZW5ndGg+MCl7aWYoZSl7dmFyIHQ9dGhpcy5zdHlsZXMoKTtyZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aCtwYXJzZUZsb2F0KHQuZ2V0UHJvcGVydHlWYWx1ZShcIm1hcmdpbi1yaWdodFwiKSkrcGFyc2VGbG9hdCh0LmdldFByb3BlcnR5VmFsdWUoXCJtYXJnaW4tbGVmdFwiKSl9cmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGh9cmV0dXJuIG51bGx9LG91dGVySGVpZ2h0OmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoPjApe2lmKGUpe3ZhciB0PXRoaXMuc3R5bGVzKCk7cmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0K3BhcnNlRmxvYXQodC5nZXRQcm9wZXJ0eVZhbHVlKFwibWFyZ2luLXRvcFwiKSkrcGFyc2VGbG9hdCh0LmdldFByb3BlcnR5VmFsdWUoXCJtYXJnaW4tYm90dG9tXCIpKX1yZXR1cm4gdGhpc1swXS5vZmZzZXRIZWlnaHR9cmV0dXJuIG51bGx9LG9mZnNldDpmdW5jdGlvbigpe2lmKHRoaXMubGVuZ3RoPjApe3ZhciBlPXRoaXNbMF0sdD1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHM9aS5ib2R5LHI9ZS5jbGllbnRUb3B8fHMuY2xpZW50VG9wfHwwLG49ZS5jbGllbnRMZWZ0fHxzLmNsaWVudExlZnR8fDAsbz1lPT09YT9hLnNjcm9sbFk6ZS5zY3JvbGxUb3AsbD1lPT09YT9hLnNjcm9sbFg6ZS5zY3JvbGxMZWZ0O3JldHVybnt0b3A6dC50b3Arby1yLGxlZnQ6dC5sZWZ0K2wtbn19cmV0dXJuIG51bGx9LGNzczpmdW5jdGlvbihlLHQpe3ZhciBpO2lmKDE9PT1hcmd1bWVudHMubGVuZ3RoKXtpZihcInN0cmluZ1wiIT10eXBlb2YgZSl7Zm9yKGk9MDtpPHRoaXMubGVuZ3RoO2krPTEpZm9yKHZhciBzIGluIGUpdGhpc1tpXS5zdHlsZVtzXT1lW3NdO3JldHVybiB0aGlzfWlmKHRoaXNbMF0pcmV0dXJuIGEuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzWzBdLG51bGwpLmdldFByb3BlcnR5VmFsdWUoZSl9aWYoMj09PWFyZ3VtZW50cy5sZW5ndGgmJlwic3RyaW5nXCI9PXR5cGVvZiBlKXtmb3IoaT0wO2k8dGhpcy5sZW5ndGg7aSs9MSl0aGlzW2ldLnN0eWxlW2VdPXQ7cmV0dXJuIHRoaXN9cmV0dXJuIHRoaXN9LGVhY2g6ZnVuY3Rpb24oZSl7aWYoIWUpcmV0dXJuIHRoaXM7Zm9yKHZhciB0PTA7dDx0aGlzLmxlbmd0aDt0Kz0xKWlmKCExPT09ZS5jYWxsKHRoaXNbdF0sdCx0aGlzW3RdKSlyZXR1cm4gdGhpcztyZXR1cm4gdGhpc30saHRtbDpmdW5jdGlvbihlKXtpZih2b2lkIDA9PT1lKXJldHVybiB0aGlzWzBdP3RoaXNbMF0uaW5uZXJIVE1MOnZvaWQgMDtmb3IodmFyIHQ9MDt0PHRoaXMubGVuZ3RoO3QrPTEpdGhpc1t0XS5pbm5lckhUTUw9ZTtyZXR1cm4gdGhpc30sdGV4dDpmdW5jdGlvbihlKXtpZih2b2lkIDA9PT1lKXJldHVybiB0aGlzWzBdP3RoaXNbMF0udGV4dENvbnRlbnQudHJpbSgpOm51bGw7Zm9yKHZhciB0PTA7dDx0aGlzLmxlbmd0aDt0Kz0xKXRoaXNbdF0udGV4dENvbnRlbnQ9ZTtyZXR1cm4gdGhpc30saXM6ZnVuY3Rpb24oZSl7dmFyIHQscyxvPXRoaXNbMF07aWYoIW98fHZvaWQgMD09PWUpcmV0dXJuITE7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpe2lmKG8ubWF0Y2hlcylyZXR1cm4gby5tYXRjaGVzKGUpO2lmKG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yKXJldHVybiBvLndlYmtpdE1hdGNoZXNTZWxlY3RvcihlKTtpZihvLm1zTWF0Y2hlc1NlbGVjdG9yKXJldHVybiBvLm1zTWF0Y2hlc1NlbGVjdG9yKGUpO2Zvcih0PW4oZSkscz0wO3M8dC5sZW5ndGg7cys9MSlpZih0W3NdPT09bylyZXR1cm4hMDtyZXR1cm4hMX1pZihlPT09aSlyZXR1cm4gbz09PWk7aWYoZT09PWEpcmV0dXJuIG89PT1hO2lmKGUubm9kZVR5cGV8fGUgaW5zdGFuY2VvZiByKXtmb3IodD1lLm5vZGVUeXBlP1tlXTplLHM9MDtzPHQubGVuZ3RoO3MrPTEpaWYodFtzXT09PW8pcmV0dXJuITA7cmV0dXJuITF9cmV0dXJuITF9LGluZGV4OmZ1bmN0aW9uKCl7dmFyIGUsdD10aGlzWzBdO2lmKHQpe2ZvcihlPTA7bnVsbCE9PSh0PXQucHJldmlvdXNTaWJsaW5nKTspMT09PXQubm9kZVR5cGUmJihlKz0xKTtyZXR1cm4gZX19LGVxOmZ1bmN0aW9uKGUpe2lmKHZvaWQgMD09PWUpcmV0dXJuIHRoaXM7dmFyIHQsaT10aGlzLmxlbmd0aDtyZXR1cm4gbmV3IHIoZT5pLTE/W106ZTwwPyh0PWkrZSk8MD9bXTpbdGhpc1t0XV06W3RoaXNbZV1dKX0sYXBwZW5kOmZ1bmN0aW9uKCl7Zm9yKHZhciBlLHQ9W10scz1hcmd1bWVudHMubGVuZ3RoO3MtLTspdFtzXT1hcmd1bWVudHNbc107Zm9yKHZhciBhPTA7YTx0Lmxlbmd0aDthKz0xKXtlPXRbYV07Zm9yKHZhciBuPTA7bjx0aGlzLmxlbmd0aDtuKz0xKWlmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXt2YXIgbz1pLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Zm9yKG8uaW5uZXJIVE1MPWU7by5maXJzdENoaWxkOyl0aGlzW25dLmFwcGVuZENoaWxkKG8uZmlyc3RDaGlsZCl9ZWxzZSBpZihlIGluc3RhbmNlb2Ygcilmb3IodmFyIGw9MDtsPGUubGVuZ3RoO2wrPTEpdGhpc1tuXS5hcHBlbmRDaGlsZChlW2xdKTtlbHNlIHRoaXNbbl0uYXBwZW5kQ2hpbGQoZSl9cmV0dXJuIHRoaXN9LHByZXBlbmQ6ZnVuY3Rpb24oZSl7dmFyIHQscztmb3IodD0wO3Q8dGhpcy5sZW5ndGg7dCs9MSlpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7dmFyIGE9aS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2ZvcihhLmlubmVySFRNTD1lLHM9YS5jaGlsZE5vZGVzLmxlbmd0aC0xO3M+PTA7cy09MSl0aGlzW3RdLmluc2VydEJlZm9yZShhLmNoaWxkTm9kZXNbc10sdGhpc1t0XS5jaGlsZE5vZGVzWzBdKX1lbHNlIGlmKGUgaW5zdGFuY2VvZiByKWZvcihzPTA7czxlLmxlbmd0aDtzKz0xKXRoaXNbdF0uaW5zZXJ0QmVmb3JlKGVbc10sdGhpc1t0XS5jaGlsZE5vZGVzWzBdKTtlbHNlIHRoaXNbdF0uaW5zZXJ0QmVmb3JlKGUsdGhpc1t0XS5jaGlsZE5vZGVzWzBdKTtyZXR1cm4gdGhpc30sbmV4dDpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5sZW5ndGg+MD9lP3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nJiZuKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKS5pcyhlKT9uZXcgcihbdGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmddKTpuZXcgcihbXSk6dGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmc/bmV3IHIoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk6bmV3IHIoW10pOm5ldyByKFtdKX0sbmV4dEFsbDpmdW5jdGlvbihlKXt2YXIgdD1bXSxpPXRoaXNbMF07aWYoIWkpcmV0dXJuIG5ldyByKFtdKTtmb3IoO2kubmV4dEVsZW1lbnRTaWJsaW5nOyl7dmFyIHM9aS5uZXh0RWxlbWVudFNpYmxpbmc7ZT9uKHMpLmlzKGUpJiZ0LnB1c2gocyk6dC5wdXNoKHMpLGk9c31yZXR1cm4gbmV3IHIodCl9LHByZXY6ZnVuY3Rpb24oZSl7aWYodGhpcy5sZW5ndGg+MCl7dmFyIHQ9dGhpc1swXTtyZXR1cm4gZT90LnByZXZpb3VzRWxlbWVudFNpYmxpbmcmJm4odC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKS5pcyhlKT9uZXcgcihbdC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk6bmV3IHIoW10pOnQucHJldmlvdXNFbGVtZW50U2libGluZz9uZXcgcihbdC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk6bmV3IHIoW10pfXJldHVybiBuZXcgcihbXSl9LHByZXZBbGw6ZnVuY3Rpb24oZSl7dmFyIHQ9W10saT10aGlzWzBdO2lmKCFpKXJldHVybiBuZXcgcihbXSk7Zm9yKDtpLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7KXt2YXIgcz1pLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7ZT9uKHMpLmlzKGUpJiZ0LnB1c2gocyk6dC5wdXNoKHMpLGk9c31yZXR1cm4gbmV3IHIodCl9LHBhcmVudDpmdW5jdGlvbihlKXtmb3IodmFyIHQ9W10saT0wO2k8dGhpcy5sZW5ndGg7aSs9MSludWxsIT09dGhpc1tpXS5wYXJlbnROb2RlJiYoZT9uKHRoaXNbaV0ucGFyZW50Tm9kZSkuaXMoZSkmJnQucHVzaCh0aGlzW2ldLnBhcmVudE5vZGUpOnQucHVzaCh0aGlzW2ldLnBhcmVudE5vZGUpKTtyZXR1cm4gbihvKHQpKX0scGFyZW50czpmdW5jdGlvbihlKXtmb3IodmFyIHQ9W10saT0wO2k8dGhpcy5sZW5ndGg7aSs9MSlmb3IodmFyIHM9dGhpc1tpXS5wYXJlbnROb2RlO3M7KWU/bihzKS5pcyhlKSYmdC5wdXNoKHMpOnQucHVzaChzKSxzPXMucGFyZW50Tm9kZTtyZXR1cm4gbihvKHQpKX0sY2xvc2VzdDpmdW5jdGlvbihlKXt2YXIgdD10aGlzO3JldHVybiB2b2lkIDA9PT1lP25ldyByKFtdKToodC5pcyhlKXx8KHQ9dC5wYXJlbnRzKGUpLmVxKDApKSx0KX0sZmluZDpmdW5jdGlvbihlKXtmb3IodmFyIHQ9W10saT0wO2k8dGhpcy5sZW5ndGg7aSs9MSlmb3IodmFyIHM9dGhpc1tpXS5xdWVyeVNlbGVjdG9yQWxsKGUpLGE9MDthPHMubGVuZ3RoO2ErPTEpdC5wdXNoKHNbYV0pO3JldHVybiBuZXcgcih0KX0sY2hpbGRyZW46ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLGk9MDtpPHRoaXMubGVuZ3RoO2krPTEpZm9yKHZhciBzPXRoaXNbaV0uY2hpbGROb2RlcyxhPTA7YTxzLmxlbmd0aDthKz0xKWU/MT09PXNbYV0ubm9kZVR5cGUmJm4oc1thXSkuaXMoZSkmJnQucHVzaChzW2FdKToxPT09c1thXS5ub2RlVHlwZSYmdC5wdXNoKHNbYV0pO3JldHVybiBuZXcgcihvKHQpKX0sZmlsdGVyOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxpPTA7aTx0aGlzLmxlbmd0aDtpKz0xKWUuY2FsbCh0aGlzW2ldLGksdGhpc1tpXSkmJnQucHVzaCh0aGlzW2ldKTtyZXR1cm4gbmV3IHIodCl9LHJlbW92ZTpmdW5jdGlvbigpe2Zvcih2YXIgZT0wO2U8dGhpcy5sZW5ndGg7ZSs9MSl0aGlzW2VdLnBhcmVudE5vZGUmJnRoaXNbZV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzW2VdKTtyZXR1cm4gdGhpc30sYWRkOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9YXJndW1lbnRzLmxlbmd0aDt0LS07KWVbdF09YXJndW1lbnRzW3RdO3ZhciBpLHMsYT10aGlzO2ZvcihpPTA7aTxlLmxlbmd0aDtpKz0xKXt2YXIgcj1uKGVbaV0pO2ZvcihzPTA7czxyLmxlbmd0aDtzKz0xKWFbYS5sZW5ndGhdPXJbc10sYS5sZW5ndGgrPTF9cmV0dXJuIGF9LHN0eWxlczpmdW5jdGlvbigpe3JldHVybiB0aGlzWzBdP2EuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzWzBdLG51bGwpOnt9fX07T2JqZWN0LmtleXMobCkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7bi5mbltlXT1uLmZuW2VdfHxsW2VdfSkpO3ZhciBkPXtkZWxldGVQcm9wczpmdW5jdGlvbihlKXt2YXIgdD1lO09iamVjdC5rZXlzKHQpLmZvckVhY2goKGZ1bmN0aW9uKGUpe3RyeXt0W2VdPW51bGx9Y2F0Y2goZSl7fXRyeXtkZWxldGUgdFtlXX1jYXRjaChlKXt9fSkpfSxuZXh0VGljazpmdW5jdGlvbihlLHQpe3JldHVybiB2b2lkIDA9PT10JiYodD0wKSxzZXRUaW1lb3V0KGUsdCl9LG5vdzpmdW5jdGlvbigpe3JldHVybiBEYXRlLm5vdygpfSxnZXRUcmFuc2xhdGU6ZnVuY3Rpb24oZSx0KXt2YXIgaSxzLHI7dm9pZCAwPT09dCYmKHQ9XCJ4XCIpO3ZhciBuPWEuZ2V0Q29tcHV0ZWRTdHlsZShlLG51bGwpO3JldHVybiBhLldlYktpdENTU01hdHJpeD8oKHM9bi50cmFuc2Zvcm18fG4ud2Via2l0VHJhbnNmb3JtKS5zcGxpdChcIixcIikubGVuZ3RoPjYmJihzPXMuc3BsaXQoXCIsIFwiKS5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBlLnJlcGxhY2UoXCIsXCIsXCIuXCIpfSkpLmpvaW4oXCIsIFwiKSkscj1uZXcgYS5XZWJLaXRDU1NNYXRyaXgoXCJub25lXCI9PT1zP1wiXCI6cykpOmk9KHI9bi5Nb3pUcmFuc2Zvcm18fG4uT1RyYW5zZm9ybXx8bi5Nc1RyYW5zZm9ybXx8bi5tc1RyYW5zZm9ybXx8bi50cmFuc2Zvcm18fG4uZ2V0UHJvcGVydHlWYWx1ZShcInRyYW5zZm9ybVwiKS5yZXBsYWNlKFwidHJhbnNsYXRlKFwiLFwibWF0cml4KDEsIDAsIDAsIDEsXCIpKS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSxcInhcIj09PXQmJihzPWEuV2ViS2l0Q1NTTWF0cml4P3IubTQxOjE2PT09aS5sZW5ndGg/cGFyc2VGbG9hdChpWzEyXSk6cGFyc2VGbG9hdChpWzRdKSksXCJ5XCI9PT10JiYocz1hLldlYktpdENTU01hdHJpeD9yLm00MjoxNj09PWkubGVuZ3RoP3BhcnNlRmxvYXQoaVsxM10pOnBhcnNlRmxvYXQoaVs1XSkpLHN8fDB9LHBhcnNlVXJsUXVlcnk6ZnVuY3Rpb24oZSl7dmFyIHQsaSxzLHIsbj17fSxvPWV8fGEubG9jYXRpb24uaHJlZjtpZihcInN0cmluZ1wiPT10eXBlb2YgbyYmby5sZW5ndGgpZm9yKHI9KGk9KG89by5pbmRleE9mKFwiP1wiKT4tMT9vLnJlcGxhY2UoL1xcUypcXD8vLFwiXCIpOlwiXCIpLnNwbGl0KFwiJlwiKS5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVyblwiXCIhPT1lfSkpKS5sZW5ndGgsdD0wO3Q8cjt0Kz0xKXM9aVt0XS5yZXBsYWNlKC8jXFxTKy9nLFwiXCIpLnNwbGl0KFwiPVwiKSxuW2RlY29kZVVSSUNvbXBvbmVudChzWzBdKV09dm9pZCAwPT09c1sxXT92b2lkIDA6ZGVjb2RlVVJJQ29tcG9uZW50KHNbMV0pfHxcIlwiO3JldHVybiBufSxpc09iamVjdDpmdW5jdGlvbihlKXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgZSYmbnVsbCE9PWUmJmUuY29uc3RydWN0b3ImJmUuY29uc3RydWN0b3I9PT1PYmplY3R9LGV4dGVuZDpmdW5jdGlvbigpe2Zvcih2YXIgZT1bXSx0PWFyZ3VtZW50cy5sZW5ndGg7dC0tOyllW3RdPWFyZ3VtZW50c1t0XTtmb3IodmFyIGk9T2JqZWN0KGVbMF0pLHM9MTtzPGUubGVuZ3RoO3MrPTEpe3ZhciBhPWVbc107aWYobnVsbCE9YSlmb3IodmFyIHI9T2JqZWN0LmtleXMoT2JqZWN0KGEpKSxuPTAsbz1yLmxlbmd0aDtuPG87bis9MSl7dmFyIGw9cltuXSxoPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYSxsKTt2b2lkIDAhPT1oJiZoLmVudW1lcmFibGUmJihkLmlzT2JqZWN0KGlbbF0pJiZkLmlzT2JqZWN0KGFbbF0pP2QuZXh0ZW5kKGlbbF0sYVtsXSk6IWQuaXNPYmplY3QoaVtsXSkmJmQuaXNPYmplY3QoYVtsXSk/KGlbbF09e30sZC5leHRlbmQoaVtsXSxhW2xdKSk6aVtsXT1hW2xdKX19cmV0dXJuIGl9fSxoPXt0b3VjaDohIShcIm9udG91Y2hzdGFydFwiaW4gYXx8YS5Eb2N1bWVudFRvdWNoJiZpIGluc3RhbmNlb2YgYS5Eb2N1bWVudFRvdWNoKSxwb2ludGVyRXZlbnRzOiEhYS5Qb2ludGVyRXZlbnQmJlwibWF4VG91Y2hQb2ludHNcImluIGEubmF2aWdhdG9yJiZhLm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cz49MCxvYnNlcnZlcjpcIk11dGF0aW9uT2JzZXJ2ZXJcImluIGF8fFwiV2Via2l0TXV0YXRpb25PYnNlcnZlclwiaW4gYSxwYXNzaXZlTGlzdGVuZXI6ZnVuY3Rpb24oKXt2YXIgZT0hMTt0cnl7dmFyIHQ9T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFwicGFzc2l2ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtlPSEwfX0pO2EuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlTGlzdGVuZXJcIixudWxsLHQpfWNhdGNoKGUpe31yZXR1cm4gZX0oKSxnZXN0dXJlczpcIm9uZ2VzdHVyZXN0YXJ0XCJpbiBhfSxwPWZ1bmN0aW9uKGUpe3ZvaWQgMD09PWUmJihlPXt9KTt2YXIgdD10aGlzO3QucGFyYW1zPWUsdC5ldmVudHNMaXN0ZW5lcnM9e30sdC5wYXJhbXMmJnQucGFyYW1zLm9uJiZPYmplY3Qua2V5cyh0LnBhcmFtcy5vbikuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dC5vbihlLHQucGFyYW1zLm9uW2VdKX0pKX0sYz17Y29tcG9uZW50czp7Y29uZmlndXJhYmxlOiEwfX07cC5wcm90b3R5cGUub249ZnVuY3Rpb24oZSx0LGkpe3ZhciBzPXRoaXM7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm4gczt2YXIgYT1pP1widW5zaGlmdFwiOlwicHVzaFwiO3JldHVybiBlLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChmdW5jdGlvbihlKXtzLmV2ZW50c0xpc3RlbmVyc1tlXXx8KHMuZXZlbnRzTGlzdGVuZXJzW2VdPVtdKSxzLmV2ZW50c0xpc3RlbmVyc1tlXVthXSh0KX0pKSxzfSxwLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKGUsdCxpKXt2YXIgcz10aGlzO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJuIHM7ZnVuY3Rpb24gYSgpe2Zvcih2YXIgaT1bXSxyPWFyZ3VtZW50cy5sZW5ndGg7ci0tOylpW3JdPWFyZ3VtZW50c1tyXTtzLm9mZihlLGEpLGEuZjdwcm94eSYmZGVsZXRlIGEuZjdwcm94eSx0LmFwcGx5KHMsaSl9cmV0dXJuIGEuZjdwcm94eT10LHMub24oZSxhLGkpfSxwLnByb3RvdHlwZS5vZmY9ZnVuY3Rpb24oZSx0KXt2YXIgaT10aGlzO3JldHVybiBpLmV2ZW50c0xpc3RlbmVycz8oZS5zcGxpdChcIiBcIikuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dm9pZCAwPT09dD9pLmV2ZW50c0xpc3RlbmVyc1tlXT1bXTppLmV2ZW50c0xpc3RlbmVyc1tlXSYmaS5ldmVudHNMaXN0ZW5lcnNbZV0ubGVuZ3RoJiZpLmV2ZW50c0xpc3RlbmVyc1tlXS5mb3JFYWNoKChmdW5jdGlvbihzLGEpeyhzPT09dHx8cy5mN3Byb3h5JiZzLmY3cHJveHk9PT10KSYmaS5ldmVudHNMaXN0ZW5lcnNbZV0uc3BsaWNlKGEsMSl9KSl9KSksaSk6aX0scC5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbigpe2Zvcih2YXIgZT1bXSx0PWFyZ3VtZW50cy5sZW5ndGg7dC0tOyllW3RdPWFyZ3VtZW50c1t0XTt2YXIgaSxzLGEscj10aGlzO2lmKCFyLmV2ZW50c0xpc3RlbmVycylyZXR1cm4gcjtcInN0cmluZ1wiPT10eXBlb2YgZVswXXx8QXJyYXkuaXNBcnJheShlWzBdKT8oaT1lWzBdLHM9ZS5zbGljZSgxLGUubGVuZ3RoKSxhPXIpOihpPWVbMF0uZXZlbnRzLHM9ZVswXS5kYXRhLGE9ZVswXS5jb250ZXh0fHxyKTt2YXIgbj1BcnJheS5pc0FycmF5KGkpP2k6aS5zcGxpdChcIiBcIik7cmV0dXJuIG4uZm9yRWFjaCgoZnVuY3Rpb24oZSl7aWYoci5ldmVudHNMaXN0ZW5lcnMmJnIuZXZlbnRzTGlzdGVuZXJzW2VdKXt2YXIgdD1bXTtyLmV2ZW50c0xpc3RlbmVyc1tlXS5mb3JFYWNoKChmdW5jdGlvbihlKXt0LnB1c2goZSl9KSksdC5mb3JFYWNoKChmdW5jdGlvbihlKXtlLmFwcGx5KGEscyl9KSl9fSkpLHJ9LHAucHJvdG90eXBlLnVzZU1vZHVsZXNQYXJhbXM9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpczt0Lm1vZHVsZXMmJk9iamVjdC5rZXlzKHQubW9kdWxlcykuZm9yRWFjaCgoZnVuY3Rpb24oaSl7dmFyIHM9dC5tb2R1bGVzW2ldO3MucGFyYW1zJiZkLmV4dGVuZChlLHMucGFyYW1zKX0pKX0scC5wcm90b3R5cGUudXNlTW9kdWxlcz1mdW5jdGlvbihlKXt2b2lkIDA9PT1lJiYoZT17fSk7dmFyIHQ9dGhpczt0Lm1vZHVsZXMmJk9iamVjdC5rZXlzKHQubW9kdWxlcykuZm9yRWFjaCgoZnVuY3Rpb24oaSl7dmFyIHM9dC5tb2R1bGVzW2ldLGE9ZVtpXXx8e307cy5pbnN0YW5jZSYmT2JqZWN0LmtleXMocy5pbnN0YW5jZSkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIGk9cy5pbnN0YW5jZVtlXTt0W2VdPVwiZnVuY3Rpb25cIj09dHlwZW9mIGk/aS5iaW5kKHQpOml9KSkscy5vbiYmdC5vbiYmT2JqZWN0LmtleXMocy5vbikuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dC5vbihlLHMub25bZV0pfSkpLHMuY3JlYXRlJiZzLmNyZWF0ZS5iaW5kKHQpKGEpfSkpfSxjLmNvbXBvbmVudHMuc2V0PWZ1bmN0aW9uKGUpe3RoaXMudXNlJiZ0aGlzLnVzZShlKX0scC5pbnN0YWxsTW9kdWxlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxpPWFyZ3VtZW50cy5sZW5ndGgtMTtpLS0gPjA7KXRbaV09YXJndW1lbnRzW2krMV07dmFyIHM9dGhpcztzLnByb3RvdHlwZS5tb2R1bGVzfHwocy5wcm90b3R5cGUubW9kdWxlcz17fSk7dmFyIGE9ZS5uYW1lfHxPYmplY3Qua2V5cyhzLnByb3RvdHlwZS5tb2R1bGVzKS5sZW5ndGgrXCJfXCIrZC5ub3coKTtyZXR1cm4gcy5wcm90b3R5cGUubW9kdWxlc1thXT1lLGUucHJvdG8mJk9iamVjdC5rZXlzKGUucHJvdG8pLmZvckVhY2goKGZ1bmN0aW9uKHQpe3MucHJvdG90eXBlW3RdPWUucHJvdG9bdF19KSksZS5zdGF0aWMmJk9iamVjdC5rZXlzKGUuc3RhdGljKS5mb3JFYWNoKChmdW5jdGlvbih0KXtzW3RdPWUuc3RhdGljW3RdfSkpLGUuaW5zdGFsbCYmZS5pbnN0YWxsLmFwcGx5KHMsdCksc30scC51c2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLGk9YXJndW1lbnRzLmxlbmd0aC0xO2ktLSA+MDspdFtpXT1hcmd1bWVudHNbaSsxXTt2YXIgcz10aGlzO3JldHVybiBBcnJheS5pc0FycmF5KGUpPyhlLmZvckVhY2goKGZ1bmN0aW9uKGUpe3JldHVybiBzLmluc3RhbGxNb2R1bGUoZSl9KSkscyk6cy5pbnN0YWxsTW9kdWxlLmFwcGx5KHMsW2VdLmNvbmNhdCh0KSl9LE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHAsYyk7dmFyIHU9e3VwZGF0ZVNpemU6ZnVuY3Rpb24oKXt2YXIgZSx0LGk9dGhpcy4kZWw7ZT12b2lkIDAhPT10aGlzLnBhcmFtcy53aWR0aD90aGlzLnBhcmFtcy53aWR0aDppWzBdLmNsaWVudFdpZHRoLHQ9dm9pZCAwIT09dGhpcy5wYXJhbXMuaGVpZ2h0P3RoaXMucGFyYW1zLmhlaWdodDppWzBdLmNsaWVudEhlaWdodCwwPT09ZSYmdGhpcy5pc0hvcml6b250YWwoKXx8MD09PXQmJnRoaXMuaXNWZXJ0aWNhbCgpfHwoZT1lLXBhcnNlSW50KGkuY3NzKFwicGFkZGluZy1sZWZ0XCIpLDEwKS1wYXJzZUludChpLmNzcyhcInBhZGRpbmctcmlnaHRcIiksMTApLHQ9dC1wYXJzZUludChpLmNzcyhcInBhZGRpbmctdG9wXCIpLDEwKS1wYXJzZUludChpLmNzcyhcInBhZGRpbmctYm90dG9tXCIpLDEwKSxkLmV4dGVuZCh0aGlzLHt3aWR0aDplLGhlaWdodDp0LHNpemU6dGhpcy5pc0hvcml6b250YWwoKT9lOnR9KSl9LHVwZGF0ZVNsaWRlczpmdW5jdGlvbigpe3ZhciBlPXRoaXMucGFyYW1zLHQ9dGhpcy4kd3JhcHBlckVsLGk9dGhpcy5zaXplLHM9dGhpcy5ydGxUcmFuc2xhdGUscj10aGlzLndyb25nUlRMLG49dGhpcy52aXJ0dWFsJiZlLnZpcnR1YWwuZW5hYmxlZCxvPW4/dGhpcy52aXJ0dWFsLnNsaWRlcy5sZW5ndGg6dGhpcy5zbGlkZXMubGVuZ3RoLGw9dC5jaGlsZHJlbihcIi5cIit0aGlzLnBhcmFtcy5zbGlkZUNsYXNzKSxoPW4/dGhpcy52aXJ0dWFsLnNsaWRlcy5sZW5ndGg6bC5sZW5ndGgscD1bXSxjPVtdLHU9W107ZnVuY3Rpb24gdih0KXtyZXR1cm4hZS5jc3NNb2RlfHx0IT09bC5sZW5ndGgtMX12YXIgZj1lLnNsaWRlc09mZnNldEJlZm9yZTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBmJiYoZj1lLnNsaWRlc09mZnNldEJlZm9yZS5jYWxsKHRoaXMpKTt2YXIgbT1lLnNsaWRlc09mZnNldEFmdGVyO1wiZnVuY3Rpb25cIj09dHlwZW9mIG0mJihtPWUuc2xpZGVzT2Zmc2V0QWZ0ZXIuY2FsbCh0aGlzKSk7dmFyIGc9dGhpcy5zbmFwR3JpZC5sZW5ndGgsYj10aGlzLnNuYXBHcmlkLmxlbmd0aCx3PWUuc3BhY2VCZXR3ZWVuLHk9LWYseD0wLEU9MDtpZih2b2lkIDAhPT1pKXt2YXIgVCxTO1wic3RyaW5nXCI9PXR5cGVvZiB3JiZ3LmluZGV4T2YoXCIlXCIpPj0wJiYodz1wYXJzZUZsb2F0KHcucmVwbGFjZShcIiVcIixcIlwiKSkvMTAwKmkpLHRoaXMudmlydHVhbFNpemU9LXcscz9sLmNzcyh7bWFyZ2luTGVmdDpcIlwiLG1hcmdpblRvcDpcIlwifSk6bC5jc3Moe21hcmdpblJpZ2h0OlwiXCIsbWFyZ2luQm90dG9tOlwiXCJ9KSxlLnNsaWRlc1BlckNvbHVtbj4xJiYoVD1NYXRoLmZsb29yKGgvZS5zbGlkZXNQZXJDb2x1bW4pPT09aC90aGlzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4/aDpNYXRoLmNlaWwoaC9lLnNsaWRlc1BlckNvbHVtbikqZS5zbGlkZXNQZXJDb2x1bW4sXCJhdXRvXCIhPT1lLnNsaWRlc1BlclZpZXcmJlwicm93XCI9PT1lLnNsaWRlc1BlckNvbHVtbkZpbGwmJihUPU1hdGgubWF4KFQsZS5zbGlkZXNQZXJWaWV3KmUuc2xpZGVzUGVyQ29sdW1uKSkpO2Zvcih2YXIgQyxNPWUuc2xpZGVzUGVyQ29sdW1uLFA9VC9NLHo9TWF0aC5mbG9vcihoL2Uuc2xpZGVzUGVyQ29sdW1uKSxrPTA7azxoO2srPTEpe1M9MDt2YXIgJD1sLmVxKGspO2lmKGUuc2xpZGVzUGVyQ29sdW1uPjEpe3ZhciBMPXZvaWQgMCxJPXZvaWQgMCxPPXZvaWQgMDtpZihcInJvd1wiPT09ZS5zbGlkZXNQZXJDb2x1bW5GaWxsJiZlLnNsaWRlc1Blckdyb3VwPjEpe3ZhciBEPU1hdGguZmxvb3Ioay8oZS5zbGlkZXNQZXJHcm91cCplLnNsaWRlc1BlckNvbHVtbikpLEE9ay1lLnNsaWRlc1BlckNvbHVtbiplLnNsaWRlc1Blckdyb3VwKkQsRz0wPT09RD9lLnNsaWRlc1Blckdyb3VwOk1hdGgubWluKE1hdGguY2VpbCgoaC1EKk0qZS5zbGlkZXNQZXJHcm91cCkvTSksZS5zbGlkZXNQZXJHcm91cCk7TD0oST1BLShPPU1hdGguZmxvb3IoQS9HKSkqRytEKmUuc2xpZGVzUGVyR3JvdXApK08qVC9NLCQuY3NzKHtcIi13ZWJraXQtYm94LW9yZGluYWwtZ3JvdXBcIjpMLFwiLW1vei1ib3gtb3JkaW5hbC1ncm91cFwiOkwsXCItbXMtZmxleC1vcmRlclwiOkwsXCItd2Via2l0LW9yZGVyXCI6TCxvcmRlcjpMfSl9ZWxzZVwiY29sdW1uXCI9PT1lLnNsaWRlc1BlckNvbHVtbkZpbGw/KE89ay0oST1NYXRoLmZsb29yKGsvTSkpKk0sKEk+enx8ST09PXomJk89PT1NLTEpJiYoTys9MSk+PU0mJihPPTAsSSs9MSkpOkk9ay0oTz1NYXRoLmZsb29yKGsvUCkpKlA7JC5jc3MoXCJtYXJnaW4tXCIrKHRoaXMuaXNIb3Jpem9udGFsKCk/XCJ0b3BcIjpcImxlZnRcIiksMCE9PU8mJmUuc3BhY2VCZXR3ZWVuJiZlLnNwYWNlQmV0d2VlbitcInB4XCIpfWlmKFwibm9uZVwiIT09JC5jc3MoXCJkaXNwbGF5XCIpKXtpZihcImF1dG9cIj09PWUuc2xpZGVzUGVyVmlldyl7dmFyIEg9YS5nZXRDb21wdXRlZFN0eWxlKCRbMF0sbnVsbCksQj0kWzBdLnN0eWxlLnRyYW5zZm9ybSxOPSRbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtO2lmKEImJigkWzBdLnN0eWxlLnRyYW5zZm9ybT1cIm5vbmVcIiksTiYmKCRbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtPVwibm9uZVwiKSxlLnJvdW5kTGVuZ3RocylTPXRoaXMuaXNIb3Jpem9udGFsKCk/JC5vdXRlcldpZHRoKCEwKTokLm91dGVySGVpZ2h0KCEwKTtlbHNlIGlmKHRoaXMuaXNIb3Jpem9udGFsKCkpe3ZhciBYPXBhcnNlRmxvYXQoSC5nZXRQcm9wZXJ0eVZhbHVlKFwid2lkdGhcIikpLFY9cGFyc2VGbG9hdChILmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLWxlZnRcIikpLFk9cGFyc2VGbG9hdChILmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXJpZ2h0XCIpKSxGPXBhcnNlRmxvYXQoSC5nZXRQcm9wZXJ0eVZhbHVlKFwibWFyZ2luLWxlZnRcIikpLFc9cGFyc2VGbG9hdChILmdldFByb3BlcnR5VmFsdWUoXCJtYXJnaW4tcmlnaHRcIikpLFI9SC5nZXRQcm9wZXJ0eVZhbHVlKFwiYm94LXNpemluZ1wiKTtTPVImJlwiYm9yZGVyLWJveFwiPT09Uj9YK0YrVzpYK1YrWStGK1d9ZWxzZXt2YXIgcT1wYXJzZUZsb2F0KEguZ2V0UHJvcGVydHlWYWx1ZShcImhlaWdodFwiKSksaj1wYXJzZUZsb2F0KEguZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctdG9wXCIpKSxLPXBhcnNlRmxvYXQoSC5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1ib3R0b21cIikpLFU9cGFyc2VGbG9hdChILmdldFByb3BlcnR5VmFsdWUoXCJtYXJnaW4tdG9wXCIpKSxfPXBhcnNlRmxvYXQoSC5nZXRQcm9wZXJ0eVZhbHVlKFwibWFyZ2luLWJvdHRvbVwiKSksWj1ILmdldFByb3BlcnR5VmFsdWUoXCJib3gtc2l6aW5nXCIpO1M9WiYmXCJib3JkZXItYm94XCI9PT1aP3ErVStfOnEraitLK1UrX31CJiYoJFswXS5zdHlsZS50cmFuc2Zvcm09QiksTiYmKCRbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtPU4pLGUucm91bmRMZW5ndGhzJiYoUz1NYXRoLmZsb29yKFMpKX1lbHNlIFM9KGktKGUuc2xpZGVzUGVyVmlldy0xKSp3KS9lLnNsaWRlc1BlclZpZXcsZS5yb3VuZExlbmd0aHMmJihTPU1hdGguZmxvb3IoUykpLGxba10mJih0aGlzLmlzSG9yaXpvbnRhbCgpP2xba10uc3R5bGUud2lkdGg9UytcInB4XCI6bFtrXS5zdHlsZS5oZWlnaHQ9UytcInB4XCIpO2xba10mJihsW2tdLnN3aXBlclNsaWRlU2l6ZT1TKSx1LnB1c2goUyksZS5jZW50ZXJlZFNsaWRlcz8oeT15K1MvMit4LzIrdywwPT09eCYmMCE9PWsmJih5PXktaS8yLXcpLDA9PT1rJiYoeT15LWkvMi13KSxNYXRoLmFicyh5KTwuMDAxJiYoeT0wKSxlLnJvdW5kTGVuZ3RocyYmKHk9TWF0aC5mbG9vcih5KSksRSVlLnNsaWRlc1Blckdyb3VwPT0wJiZwLnB1c2goeSksYy5wdXNoKHkpKTooZS5yb3VuZExlbmd0aHMmJih5PU1hdGguZmxvb3IoeSkpLChFLU1hdGgubWluKHRoaXMucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCxFKSkldGhpcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXA9PTAmJnAucHVzaCh5KSxjLnB1c2goeSkseT15K1MrdyksdGhpcy52aXJ0dWFsU2l6ZSs9Uyt3LHg9UyxFKz0xfX1pZih0aGlzLnZpcnR1YWxTaXplPU1hdGgubWF4KHRoaXMudmlydHVhbFNpemUsaSkrbSxzJiZyJiYoXCJzbGlkZVwiPT09ZS5lZmZlY3R8fFwiY292ZXJmbG93XCI9PT1lLmVmZmVjdCkmJnQuY3NzKHt3aWR0aDp0aGlzLnZpcnR1YWxTaXplK2Uuc3BhY2VCZXR3ZWVuK1wicHhcIn0pLGUuc2V0V3JhcHBlclNpemUmJih0aGlzLmlzSG9yaXpvbnRhbCgpP3QuY3NzKHt3aWR0aDp0aGlzLnZpcnR1YWxTaXplK2Uuc3BhY2VCZXR3ZWVuK1wicHhcIn0pOnQuY3NzKHtoZWlnaHQ6dGhpcy52aXJ0dWFsU2l6ZStlLnNwYWNlQmV0d2VlbitcInB4XCJ9KSksZS5zbGlkZXNQZXJDb2x1bW4+MSYmKHRoaXMudmlydHVhbFNpemU9KFMrZS5zcGFjZUJldHdlZW4pKlQsdGhpcy52aXJ0dWFsU2l6ZT1NYXRoLmNlaWwodGhpcy52aXJ0dWFsU2l6ZS9lLnNsaWRlc1BlckNvbHVtbiktZS5zcGFjZUJldHdlZW4sdGhpcy5pc0hvcml6b250YWwoKT90LmNzcyh7d2lkdGg6dGhpcy52aXJ0dWFsU2l6ZStlLnNwYWNlQmV0d2VlbitcInB4XCJ9KTp0LmNzcyh7aGVpZ2h0OnRoaXMudmlydHVhbFNpemUrZS5zcGFjZUJldHdlZW4rXCJweFwifSksZS5jZW50ZXJlZFNsaWRlcykpe0M9W107Zm9yKHZhciBRPTA7UTxwLmxlbmd0aDtRKz0xKXt2YXIgSj1wW1FdO2Uucm91bmRMZW5ndGhzJiYoSj1NYXRoLmZsb29yKEopKSxwW1FdPHRoaXMudmlydHVhbFNpemUrcFswXSYmQy5wdXNoKEopfXA9Q31pZighZS5jZW50ZXJlZFNsaWRlcyl7Qz1bXTtmb3IodmFyIGVlPTA7ZWU8cC5sZW5ndGg7ZWUrPTEpe3ZhciB0ZT1wW2VlXTtlLnJvdW5kTGVuZ3RocyYmKHRlPU1hdGguZmxvb3IodGUpKSxwW2VlXTw9dGhpcy52aXJ0dWFsU2l6ZS1pJiZDLnB1c2godGUpfXA9QyxNYXRoLmZsb29yKHRoaXMudmlydHVhbFNpemUtaSktTWF0aC5mbG9vcihwW3AubGVuZ3RoLTFdKT4xJiZwLnB1c2godGhpcy52aXJ0dWFsU2l6ZS1pKX1pZigwPT09cC5sZW5ndGgmJihwPVswXSksMCE9PWUuc3BhY2VCZXR3ZWVuJiYodGhpcy5pc0hvcml6b250YWwoKT9zP2wuZmlsdGVyKHYpLmNzcyh7bWFyZ2luTGVmdDp3K1wicHhcIn0pOmwuZmlsdGVyKHYpLmNzcyh7bWFyZ2luUmlnaHQ6dytcInB4XCJ9KTpsLmZpbHRlcih2KS5jc3Moe21hcmdpbkJvdHRvbTp3K1wicHhcIn0pKSxlLmNlbnRlcmVkU2xpZGVzJiZlLmNlbnRlcmVkU2xpZGVzQm91bmRzKXt2YXIgaWU9MDt1LmZvckVhY2goKGZ1bmN0aW9uKHQpe2llKz10KyhlLnNwYWNlQmV0d2Vlbj9lLnNwYWNlQmV0d2VlbjowKX0pKTt2YXIgc2U9KGllLT1lLnNwYWNlQmV0d2VlbiktaTtwPXAubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gZTwwPy1mOmU+c2U/c2UrbTplfSkpfWlmKGUuY2VudGVySW5zdWZmaWNpZW50U2xpZGVzKXt2YXIgYWU9MDtpZih1LmZvckVhY2goKGZ1bmN0aW9uKHQpe2FlKz10KyhlLnNwYWNlQmV0d2Vlbj9lLnNwYWNlQmV0d2VlbjowKX0pKSwoYWUtPWUuc3BhY2VCZXR3ZWVuKTxpKXt2YXIgcmU9KGktYWUpLzI7cC5mb3JFYWNoKChmdW5jdGlvbihlLHQpe3BbdF09ZS1yZX0pKSxjLmZvckVhY2goKGZ1bmN0aW9uKGUsdCl7Y1t0XT1lK3JlfSkpfX1kLmV4dGVuZCh0aGlzLHtzbGlkZXM6bCxzbmFwR3JpZDpwLHNsaWRlc0dyaWQ6YyxzbGlkZXNTaXplc0dyaWQ6dX0pLGghPT1vJiZ0aGlzLmVtaXQoXCJzbGlkZXNMZW5ndGhDaGFuZ2VcIikscC5sZW5ndGghPT1nJiYodGhpcy5wYXJhbXMud2F0Y2hPdmVyZmxvdyYmdGhpcy5jaGVja092ZXJmbG93KCksdGhpcy5lbWl0KFwic25hcEdyaWRMZW5ndGhDaGFuZ2VcIikpLGMubGVuZ3RoIT09YiYmdGhpcy5lbWl0KFwic2xpZGVzR3JpZExlbmd0aENoYW5nZVwiKSwoZS53YXRjaFNsaWRlc1Byb2dyZXNzfHxlLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkmJnRoaXMudXBkYXRlU2xpZGVzT2Zmc2V0KCl9fSx1cGRhdGVBdXRvSGVpZ2h0OmZ1bmN0aW9uKGUpe3ZhciB0LGk9W10scz0wO2lmKFwibnVtYmVyXCI9PXR5cGVvZiBlP3RoaXMuc2V0VHJhbnNpdGlvbihlKTohMD09PWUmJnRoaXMuc2V0VHJhbnNpdGlvbih0aGlzLnBhcmFtcy5zcGVlZCksXCJhdXRvXCIhPT10aGlzLnBhcmFtcy5zbGlkZXNQZXJWaWV3JiZ0aGlzLnBhcmFtcy5zbGlkZXNQZXJWaWV3PjEpaWYodGhpcy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpdGhpcy52aXNpYmxlU2xpZGVzLmVhY2goKGZ1bmN0aW9uKGUsdCl7aS5wdXNoKHQpfSkpO2Vsc2UgZm9yKHQ9MDt0PE1hdGguY2VpbCh0aGlzLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTt0Kz0xKXt2YXIgYT10aGlzLmFjdGl2ZUluZGV4K3Q7aWYoYT50aGlzLnNsaWRlcy5sZW5ndGgpYnJlYWs7aS5wdXNoKHRoaXMuc2xpZGVzLmVxKGEpWzBdKX1lbHNlIGkucHVzaCh0aGlzLnNsaWRlcy5lcSh0aGlzLmFjdGl2ZUluZGV4KVswXSk7Zm9yKHQ9MDt0PGkubGVuZ3RoO3QrPTEpaWYodm9pZCAwIT09aVt0XSl7dmFyIHI9aVt0XS5vZmZzZXRIZWlnaHQ7cz1yPnM/cjpzfXMmJnRoaXMuJHdyYXBwZXJFbC5jc3MoXCJoZWlnaHRcIixzK1wicHhcIil9LHVwZGF0ZVNsaWRlc09mZnNldDpmdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLnNsaWRlcyx0PTA7dDxlLmxlbmd0aDt0Kz0xKWVbdF0uc3dpcGVyU2xpZGVPZmZzZXQ9dGhpcy5pc0hvcml6b250YWwoKT9lW3RdLm9mZnNldExlZnQ6ZVt0XS5vZmZzZXRUb3B9LHVwZGF0ZVNsaWRlc1Byb2dyZXNzOmZ1bmN0aW9uKGUpe3ZvaWQgMD09PWUmJihlPXRoaXMmJnRoaXMudHJhbnNsYXRlfHwwKTt2YXIgdD10aGlzLnBhcmFtcyxpPXRoaXMuc2xpZGVzLHM9dGhpcy5ydGxUcmFuc2xhdGU7aWYoMCE9PWkubGVuZ3RoKXt2b2lkIDA9PT1pWzBdLnN3aXBlclNsaWRlT2Zmc2V0JiZ0aGlzLnVwZGF0ZVNsaWRlc09mZnNldCgpO3ZhciBhPS1lO3MmJihhPWUpLGkucmVtb3ZlQ2xhc3ModC5zbGlkZVZpc2libGVDbGFzcyksdGhpcy52aXNpYmxlU2xpZGVzSW5kZXhlcz1bXSx0aGlzLnZpc2libGVTbGlkZXM9W107Zm9yKHZhciByPTA7cjxpLmxlbmd0aDtyKz0xKXt2YXIgbz1pW3JdLGw9KGErKHQuY2VudGVyZWRTbGlkZXM/dGhpcy5taW5UcmFuc2xhdGUoKTowKS1vLnN3aXBlclNsaWRlT2Zmc2V0KS8oby5zd2lwZXJTbGlkZVNpemUrdC5zcGFjZUJldHdlZW4pO2lmKHQud2F0Y2hTbGlkZXNWaXNpYmlsaXR5fHx0LmNlbnRlcmVkU2xpZGVzJiZ0LmF1dG9IZWlnaHQpe3ZhciBkPS0oYS1vLnN3aXBlclNsaWRlT2Zmc2V0KSxoPWQrdGhpcy5zbGlkZXNTaXplc0dyaWRbcl07KGQ+PTAmJmQ8dGhpcy5zaXplLTF8fGg+MSYmaDw9dGhpcy5zaXplfHxkPD0wJiZoPj10aGlzLnNpemUpJiYodGhpcy52aXNpYmxlU2xpZGVzLnB1c2gobyksdGhpcy52aXNpYmxlU2xpZGVzSW5kZXhlcy5wdXNoKHIpLGkuZXEocikuYWRkQ2xhc3ModC5zbGlkZVZpc2libGVDbGFzcykpfW8ucHJvZ3Jlc3M9cz8tbDpsfXRoaXMudmlzaWJsZVNsaWRlcz1uKHRoaXMudmlzaWJsZVNsaWRlcyl9fSx1cGRhdGVQcm9ncmVzczpmdW5jdGlvbihlKXtpZih2b2lkIDA9PT1lKXt2YXIgdD10aGlzLnJ0bFRyYW5zbGF0ZT8tMToxO2U9dGhpcyYmdGhpcy50cmFuc2xhdGUmJnRoaXMudHJhbnNsYXRlKnR8fDB9dmFyIGk9dGhpcy5wYXJhbXMscz10aGlzLm1heFRyYW5zbGF0ZSgpLXRoaXMubWluVHJhbnNsYXRlKCksYT10aGlzLnByb2dyZXNzLHI9dGhpcy5pc0JlZ2lubmluZyxuPXRoaXMuaXNFbmQsbz1yLGw9bjswPT09cz8oYT0wLHI9ITAsbj0hMCk6KHI9KGE9KGUtdGhpcy5taW5UcmFuc2xhdGUoKSkvcyk8PTAsbj1hPj0xKSxkLmV4dGVuZCh0aGlzLHtwcm9ncmVzczphLGlzQmVnaW5uaW5nOnIsaXNFbmQ6bn0pLChpLndhdGNoU2xpZGVzUHJvZ3Jlc3N8fGkud2F0Y2hTbGlkZXNWaXNpYmlsaXR5fHxpLmNlbnRlcmVkU2xpZGVzJiZpLmF1dG9IZWlnaHQpJiZ0aGlzLnVwZGF0ZVNsaWRlc1Byb2dyZXNzKGUpLHImJiFvJiZ0aGlzLmVtaXQoXCJyZWFjaEJlZ2lubmluZyB0b0VkZ2VcIiksbiYmIWwmJnRoaXMuZW1pdChcInJlYWNoRW5kIHRvRWRnZVwiKSwobyYmIXJ8fGwmJiFuKSYmdGhpcy5lbWl0KFwiZnJvbUVkZ2VcIiksdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIixhKX0sdXBkYXRlU2xpZGVzQ2xhc3NlczpmdW5jdGlvbigpe3ZhciBlLHQ9dGhpcy5zbGlkZXMsaT10aGlzLnBhcmFtcyxzPXRoaXMuJHdyYXBwZXJFbCxhPXRoaXMuYWN0aXZlSW5kZXgscj10aGlzLnJlYWxJbmRleCxuPXRoaXMudmlydHVhbCYmaS52aXJ0dWFsLmVuYWJsZWQ7dC5yZW1vdmVDbGFzcyhpLnNsaWRlQWN0aXZlQ2xhc3MrXCIgXCIraS5zbGlkZU5leHRDbGFzcytcIiBcIitpLnNsaWRlUHJldkNsYXNzK1wiIFwiK2kuc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcytcIiBcIitpLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzK1wiIFwiK2kuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpLChlPW4/dGhpcy4kd3JhcHBlckVsLmZpbmQoXCIuXCIraS5zbGlkZUNsYXNzKydbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK2ErJ1wiXScpOnQuZXEoYSkpLmFkZENsYXNzKGkuc2xpZGVBY3RpdmVDbGFzcyksaS5sb29wJiYoZS5oYXNDbGFzcyhpLnNsaWRlRHVwbGljYXRlQ2xhc3MpP3MuY2hpbGRyZW4oXCIuXCIraS5zbGlkZUNsYXNzK1wiOm5vdCguXCIraS5zbGlkZUR1cGxpY2F0ZUNsYXNzKycpW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytyKydcIl0nKS5hZGRDbGFzcyhpLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpOnMuY2hpbGRyZW4oXCIuXCIraS5zbGlkZUNsYXNzK1wiLlwiK2kuc2xpZGVEdXBsaWNhdGVDbGFzcysnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytyKydcIl0nKS5hZGRDbGFzcyhpLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpKTt2YXIgbz1lLm5leHRBbGwoXCIuXCIraS5zbGlkZUNsYXNzKS5lcSgwKS5hZGRDbGFzcyhpLnNsaWRlTmV4dENsYXNzKTtpLmxvb3AmJjA9PT1vLmxlbmd0aCYmKG89dC5lcSgwKSkuYWRkQ2xhc3MoaS5zbGlkZU5leHRDbGFzcyk7dmFyIGw9ZS5wcmV2QWxsKFwiLlwiK2kuc2xpZGVDbGFzcykuZXEoMCkuYWRkQ2xhc3MoaS5zbGlkZVByZXZDbGFzcyk7aS5sb29wJiYwPT09bC5sZW5ndGgmJihsPXQuZXEoLTEpKS5hZGRDbGFzcyhpLnNsaWRlUHJldkNsYXNzKSxpLmxvb3AmJihvLmhhc0NsYXNzKGkuc2xpZGVEdXBsaWNhdGVDbGFzcyk/cy5jaGlsZHJlbihcIi5cIitpLnNsaWRlQ2xhc3MrXCI6bm90KC5cIitpLnNsaWRlRHVwbGljYXRlQ2xhc3MrJylbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK28uYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpKydcIl0nKS5hZGRDbGFzcyhpLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKTpzLmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVDbGFzcytcIi5cIitpLnNsaWRlRHVwbGljYXRlQ2xhc3MrJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrby5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIikrJ1wiXScpLmFkZENsYXNzKGkuc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MpLGwuaGFzQ2xhc3MoaS5zbGlkZUR1cGxpY2F0ZUNsYXNzKT9zLmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVDbGFzcytcIjpub3QoLlwiK2kuc2xpZGVEdXBsaWNhdGVDbGFzcysnKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrbC5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIikrJ1wiXScpLmFkZENsYXNzKGkuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpOnMuY2hpbGRyZW4oXCIuXCIraS5zbGlkZUNsYXNzK1wiLlwiK2kuc2xpZGVEdXBsaWNhdGVDbGFzcysnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytsLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSsnXCJdJykuYWRkQ2xhc3MoaS5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcykpfSx1cGRhdGVBY3RpdmVJbmRleDpmdW5jdGlvbihlKXt2YXIgdCxpPXRoaXMucnRsVHJhbnNsYXRlP3RoaXMudHJhbnNsYXRlOi10aGlzLnRyYW5zbGF0ZSxzPXRoaXMuc2xpZGVzR3JpZCxhPXRoaXMuc25hcEdyaWQscj10aGlzLnBhcmFtcyxuPXRoaXMuYWN0aXZlSW5kZXgsbz10aGlzLnJlYWxJbmRleCxsPXRoaXMuc25hcEluZGV4LGg9ZTtpZih2b2lkIDA9PT1oKXtmb3IodmFyIHA9MDtwPHMubGVuZ3RoO3ArPTEpdm9pZCAwIT09c1twKzFdP2k+PXNbcF0mJmk8c1twKzFdLShzW3ArMV0tc1twXSkvMj9oPXA6aT49c1twXSYmaTxzW3ArMV0mJihoPXArMSk6aT49c1twXSYmKGg9cCk7ci5ub3JtYWxpemVTbGlkZUluZGV4JiYoaDwwfHx2b2lkIDA9PT1oKSYmKGg9MCl9aWYoYS5pbmRleE9mKGkpPj0wKXQ9YS5pbmRleE9mKGkpO2Vsc2V7dmFyIGM9TWF0aC5taW4oci5zbGlkZXNQZXJHcm91cFNraXAsaCk7dD1jK01hdGguZmxvb3IoKGgtYykvci5zbGlkZXNQZXJHcm91cCl9aWYodD49YS5sZW5ndGgmJih0PWEubGVuZ3RoLTEpLGghPT1uKXt2YXIgdT1wYXJzZUludCh0aGlzLnNsaWRlcy5lcShoKS5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIil8fGgsMTApO2QuZXh0ZW5kKHRoaXMse3NuYXBJbmRleDp0LHJlYWxJbmRleDp1LHByZXZpb3VzSW5kZXg6bixhY3RpdmVJbmRleDpofSksdGhpcy5lbWl0KFwiYWN0aXZlSW5kZXhDaGFuZ2VcIiksdGhpcy5lbWl0KFwic25hcEluZGV4Q2hhbmdlXCIpLG8hPT11JiZ0aGlzLmVtaXQoXCJyZWFsSW5kZXhDaGFuZ2VcIiksKHRoaXMuaW5pdGlhbGl6ZWR8fHRoaXMucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCkmJnRoaXMuZW1pdChcInNsaWRlQ2hhbmdlXCIpfWVsc2UgdCE9PWwmJih0aGlzLnNuYXBJbmRleD10LHRoaXMuZW1pdChcInNuYXBJbmRleENoYW5nZVwiKSl9LHVwZGF0ZUNsaWNrZWRTbGlkZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnBhcmFtcyxpPW4oZS50YXJnZXQpLmNsb3Nlc3QoXCIuXCIrdC5zbGlkZUNsYXNzKVswXSxzPSExO2lmKGkpZm9yKHZhciBhPTA7YTx0aGlzLnNsaWRlcy5sZW5ndGg7YSs9MSl0aGlzLnNsaWRlc1thXT09PWkmJihzPSEwKTtpZighaXx8IXMpcmV0dXJuIHRoaXMuY2xpY2tlZFNsaWRlPXZvaWQgMCx2b2lkKHRoaXMuY2xpY2tlZEluZGV4PXZvaWQgMCk7dGhpcy5jbGlja2VkU2xpZGU9aSx0aGlzLnZpcnR1YWwmJnRoaXMucGFyYW1zLnZpcnR1YWwuZW5hYmxlZD90aGlzLmNsaWNrZWRJbmRleD1wYXJzZUludChuKGkpLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSwxMCk6dGhpcy5jbGlja2VkSW5kZXg9bihpKS5pbmRleCgpLHQuc2xpZGVUb0NsaWNrZWRTbGlkZSYmdm9pZCAwIT09dGhpcy5jbGlja2VkSW5kZXgmJnRoaXMuY2xpY2tlZEluZGV4IT09dGhpcy5hY3RpdmVJbmRleCYmdGhpcy5zbGlkZVRvQ2xpY2tlZFNsaWRlKCl9fTt2YXIgdj17Z2V0VHJhbnNsYXRlOmZ1bmN0aW9uKGUpe3ZvaWQgMD09PWUmJihlPXRoaXMuaXNIb3Jpem9udGFsKCk/XCJ4XCI6XCJ5XCIpO3ZhciB0PXRoaXMucGFyYW1zLGk9dGhpcy5ydGxUcmFuc2xhdGUscz10aGlzLnRyYW5zbGF0ZSxhPXRoaXMuJHdyYXBwZXJFbDtpZih0LnZpcnR1YWxUcmFuc2xhdGUpcmV0dXJuIGk/LXM6cztpZih0LmNzc01vZGUpcmV0dXJuIHM7dmFyIHI9ZC5nZXRUcmFuc2xhdGUoYVswXSxlKTtyZXR1cm4gaSYmKHI9LXIpLHJ8fDB9LHNldFRyYW5zbGF0ZTpmdW5jdGlvbihlLHQpe3ZhciBpPXRoaXMucnRsVHJhbnNsYXRlLHM9dGhpcy5wYXJhbXMsYT10aGlzLiR3cmFwcGVyRWwscj10aGlzLndyYXBwZXJFbCxuPXRoaXMucHJvZ3Jlc3Msbz0wLGw9MDt0aGlzLmlzSG9yaXpvbnRhbCgpP289aT8tZTplOmw9ZSxzLnJvdW5kTGVuZ3RocyYmKG89TWF0aC5mbG9vcihvKSxsPU1hdGguZmxvb3IobCkpLHMuY3NzTW9kZT9yW3RoaXMuaXNIb3Jpem9udGFsKCk/XCJzY3JvbGxMZWZ0XCI6XCJzY3JvbGxUb3BcIl09dGhpcy5pc0hvcml6b250YWwoKT8tbzotbDpzLnZpcnR1YWxUcmFuc2xhdGV8fGEudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoXCIrbytcInB4LCBcIitsK1wicHgsIDBweClcIiksdGhpcy5wcmV2aW91c1RyYW5zbGF0ZT10aGlzLnRyYW5zbGF0ZSx0aGlzLnRyYW5zbGF0ZT10aGlzLmlzSG9yaXpvbnRhbCgpP286bDt2YXIgZD10aGlzLm1heFRyYW5zbGF0ZSgpLXRoaXMubWluVHJhbnNsYXRlKCk7KDA9PT1kPzA6KGUtdGhpcy5taW5UcmFuc2xhdGUoKSkvZCkhPT1uJiZ0aGlzLnVwZGF0ZVByb2dyZXNzKGUpLHRoaXMuZW1pdChcInNldFRyYW5zbGF0ZVwiLHRoaXMudHJhbnNsYXRlLHQpfSxtaW5UcmFuc2xhdGU6ZnVuY3Rpb24oKXtyZXR1cm4tdGhpcy5zbmFwR3JpZFswXX0sbWF4VHJhbnNsYXRlOmZ1bmN0aW9uKCl7cmV0dXJuLXRoaXMuc25hcEdyaWRbdGhpcy5zbmFwR3JpZC5sZW5ndGgtMV19LHRyYW5zbGF0ZVRvOmZ1bmN0aW9uKGUsdCxpLHMsYSl7dmFyIHI7dm9pZCAwPT09ZSYmKGU9MCksdm9pZCAwPT09dCYmKHQ9dGhpcy5wYXJhbXMuc3BlZWQpLHZvaWQgMD09PWkmJihpPSEwKSx2b2lkIDA9PT1zJiYocz0hMCk7dmFyIG49dGhpcyxvPW4ucGFyYW1zLGw9bi53cmFwcGVyRWw7aWYobi5hbmltYXRpbmcmJm8ucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKXJldHVybiExO3ZhciBkLGg9bi5taW5UcmFuc2xhdGUoKSxwPW4ubWF4VHJhbnNsYXRlKCk7aWYoZD1zJiZlPmg/aDpzJiZlPHA/cDplLG4udXBkYXRlUHJvZ3Jlc3MoZCksby5jc3NNb2RlKXt2YXIgYz1uLmlzSG9yaXpvbnRhbCgpO3JldHVybiAwPT09dD9sW2M/XCJzY3JvbGxMZWZ0XCI6XCJzY3JvbGxUb3BcIl09LWQ6bC5zY3JvbGxUbz9sLnNjcm9sbFRvKCgocj17fSlbYz9cImxlZnRcIjpcInRvcFwiXT0tZCxyLmJlaGF2aW9yPVwic21vb3RoXCIscikpOmxbYz9cInNjcm9sbExlZnRcIjpcInNjcm9sbFRvcFwiXT0tZCwhMH1yZXR1cm4gMD09PXQ/KG4uc2V0VHJhbnNpdGlvbigwKSxuLnNldFRyYW5zbGF0ZShkKSxpJiYobi5lbWl0KFwiYmVmb3JlVHJhbnNpdGlvblN0YXJ0XCIsdCxhKSxuLmVtaXQoXCJ0cmFuc2l0aW9uRW5kXCIpKSk6KG4uc2V0VHJhbnNpdGlvbih0KSxuLnNldFRyYW5zbGF0ZShkKSxpJiYobi5lbWl0KFwiYmVmb3JlVHJhbnNpdGlvblN0YXJ0XCIsdCxhKSxuLmVtaXQoXCJ0cmFuc2l0aW9uU3RhcnRcIikpLG4uYW5pbWF0aW5nfHwobi5hbmltYXRpbmc9ITAsbi5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmR8fChuLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZD1mdW5jdGlvbihlKXtuJiYhbi5kZXN0cm95ZWQmJmUudGFyZ2V0PT09dGhpcyYmKG4uJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLG4ub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSxuLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndlYmtpdFRyYW5zaXRpb25FbmRcIixuLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCksbi5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ9bnVsbCxkZWxldGUgbi5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQsaSYmbi5lbWl0KFwidHJhbnNpdGlvbkVuZFwiKSl9KSxuLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIixuLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCksbi4kd3JhcHBlckVsWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsbi5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpKSksITB9fTt2YXIgZj17c2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlLHQpe3RoaXMucGFyYW1zLmNzc01vZGV8fHRoaXMuJHdyYXBwZXJFbC50cmFuc2l0aW9uKGUpLHRoaXMuZW1pdChcInNldFRyYW5zaXRpb25cIixlLHQpfSx0cmFuc2l0aW9uU3RhcnQ6ZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT1lJiYoZT0hMCk7dmFyIGk9dGhpcy5hY3RpdmVJbmRleCxzPXRoaXMucGFyYW1zLGE9dGhpcy5wcmV2aW91c0luZGV4O2lmKCFzLmNzc01vZGUpe3MuYXV0b0hlaWdodCYmdGhpcy51cGRhdGVBdXRvSGVpZ2h0KCk7dmFyIHI9dDtpZihyfHwocj1pPmE/XCJuZXh0XCI6aTxhP1wicHJldlwiOlwicmVzZXRcIiksdGhpcy5lbWl0KFwidHJhbnNpdGlvblN0YXJ0XCIpLGUmJmkhPT1hKXtpZihcInJlc2V0XCI9PT1yKXJldHVybiB2b2lkIHRoaXMuZW1pdChcInNsaWRlUmVzZXRUcmFuc2l0aW9uU3RhcnRcIik7dGhpcy5lbWl0KFwic2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnRcIiksXCJuZXh0XCI9PT1yP3RoaXMuZW1pdChcInNsaWRlTmV4dFRyYW5zaXRpb25TdGFydFwiKTp0aGlzLmVtaXQoXCJzbGlkZVByZXZUcmFuc2l0aW9uU3RhcnRcIil9fX0sdHJhbnNpdGlvbkVuZDpmdW5jdGlvbihlLHQpe3ZvaWQgMD09PWUmJihlPSEwKTt2YXIgaT10aGlzLmFjdGl2ZUluZGV4LHM9dGhpcy5wcmV2aW91c0luZGV4LGE9dGhpcy5wYXJhbXM7aWYodGhpcy5hbmltYXRpbmc9ITEsIWEuY3NzTW9kZSl7dGhpcy5zZXRUcmFuc2l0aW9uKDApO3ZhciByPXQ7aWYocnx8KHI9aT5zP1wibmV4dFwiOmk8cz9cInByZXZcIjpcInJlc2V0XCIpLHRoaXMuZW1pdChcInRyYW5zaXRpb25FbmRcIiksZSYmaSE9PXMpe2lmKFwicmVzZXRcIj09PXIpcmV0dXJuIHZvaWQgdGhpcy5lbWl0KFwic2xpZGVSZXNldFRyYW5zaXRpb25FbmRcIik7dGhpcy5lbWl0KFwic2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kXCIpLFwibmV4dFwiPT09cj90aGlzLmVtaXQoXCJzbGlkZU5leHRUcmFuc2l0aW9uRW5kXCIpOnRoaXMuZW1pdChcInNsaWRlUHJldlRyYW5zaXRpb25FbmRcIil9fX19O3ZhciBtPXtzbGlkZVRvOmZ1bmN0aW9uKGUsdCxpLHMpe3ZhciBhO3ZvaWQgMD09PWUmJihlPTApLHZvaWQgMD09PXQmJih0PXRoaXMucGFyYW1zLnNwZWVkKSx2b2lkIDA9PT1pJiYoaT0hMCk7dmFyIHI9dGhpcyxuPWU7bjwwJiYobj0wKTt2YXIgbz1yLnBhcmFtcyxsPXIuc25hcEdyaWQsZD1yLnNsaWRlc0dyaWQsaD1yLnByZXZpb3VzSW5kZXgscD1yLmFjdGl2ZUluZGV4LGM9ci5ydGxUcmFuc2xhdGUsdT1yLndyYXBwZXJFbDtpZihyLmFuaW1hdGluZyYmby5wcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb24pcmV0dXJuITE7dmFyIHY9TWF0aC5taW4oci5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLG4pLGY9ditNYXRoLmZsb29yKChuLXYpL3IucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtmPj1sLmxlbmd0aCYmKGY9bC5sZW5ndGgtMSksKHB8fG8uaW5pdGlhbFNsaWRlfHwwKT09PShofHwwKSYmaSYmci5lbWl0KFwiYmVmb3JlU2xpZGVDaGFuZ2VTdGFydFwiKTt2YXIgbSxnPS1sW2ZdO2lmKHIudXBkYXRlUHJvZ3Jlc3MoZyksby5ub3JtYWxpemVTbGlkZUluZGV4KWZvcih2YXIgYj0wO2I8ZC5sZW5ndGg7Yis9MSktTWF0aC5mbG9vcigxMDAqZyk+PU1hdGguZmxvb3IoMTAwKmRbYl0pJiYobj1iKTtpZihyLmluaXRpYWxpemVkJiZuIT09cCl7aWYoIXIuYWxsb3dTbGlkZU5leHQmJmc8ci50cmFuc2xhdGUmJmc8ci5taW5UcmFuc2xhdGUoKSlyZXR1cm4hMTtpZighci5hbGxvd1NsaWRlUHJldiYmZz5yLnRyYW5zbGF0ZSYmZz5yLm1heFRyYW5zbGF0ZSgpJiYocHx8MCkhPT1uKXJldHVybiExfWlmKG09bj5wP1wibmV4dFwiOm48cD9cInByZXZcIjpcInJlc2V0XCIsYyYmLWc9PT1yLnRyYW5zbGF0ZXx8IWMmJmc9PT1yLnRyYW5zbGF0ZSlyZXR1cm4gci51cGRhdGVBY3RpdmVJbmRleChuKSxvLmF1dG9IZWlnaHQmJnIudXBkYXRlQXV0b0hlaWdodCgpLHIudXBkYXRlU2xpZGVzQ2xhc3NlcygpLFwic2xpZGVcIiE9PW8uZWZmZWN0JiZyLnNldFRyYW5zbGF0ZShnKSxcInJlc2V0XCIhPT1tJiYoci50cmFuc2l0aW9uU3RhcnQoaSxtKSxyLnRyYW5zaXRpb25FbmQoaSxtKSksITE7aWYoby5jc3NNb2RlKXt2YXIgdz1yLmlzSG9yaXpvbnRhbCgpLHk9LWc7cmV0dXJuIGMmJih5PXUuc2Nyb2xsV2lkdGgtdS5vZmZzZXRXaWR0aC15KSwwPT09dD91W3c/XCJzY3JvbGxMZWZ0XCI6XCJzY3JvbGxUb3BcIl09eTp1LnNjcm9sbFRvP3Uuc2Nyb2xsVG8oKChhPXt9KVt3P1wibGVmdFwiOlwidG9wXCJdPXksYS5iZWhhdmlvcj1cInNtb290aFwiLGEpKTp1W3c/XCJzY3JvbGxMZWZ0XCI6XCJzY3JvbGxUb3BcIl09eSwhMH1yZXR1cm4gMD09PXQ/KHIuc2V0VHJhbnNpdGlvbigwKSxyLnNldFRyYW5zbGF0ZShnKSxyLnVwZGF0ZUFjdGl2ZUluZGV4KG4pLHIudXBkYXRlU2xpZGVzQ2xhc3NlcygpLHIuZW1pdChcImJlZm9yZVRyYW5zaXRpb25TdGFydFwiLHQscyksci50cmFuc2l0aW9uU3RhcnQoaSxtKSxyLnRyYW5zaXRpb25FbmQoaSxtKSk6KHIuc2V0VHJhbnNpdGlvbih0KSxyLnNldFRyYW5zbGF0ZShnKSxyLnVwZGF0ZUFjdGl2ZUluZGV4KG4pLHIudXBkYXRlU2xpZGVzQ2xhc3NlcygpLHIuZW1pdChcImJlZm9yZVRyYW5zaXRpb25TdGFydFwiLHQscyksci50cmFuc2l0aW9uU3RhcnQoaSxtKSxyLmFuaW1hdGluZ3x8KHIuYW5pbWF0aW5nPSEwLHIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmR8fChyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKGUpe3ImJiFyLmRlc3Ryb3llZCYmZS50YXJnZXQ9PT10aGlzJiYoci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCksci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCksci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZD1udWxsLGRlbGV0ZSByLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kLHIudHJhbnNpdGlvbkVuZChpLG0pKX0pLHIuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLHIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpLHIuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLHIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpKSksITB9LHNsaWRlVG9Mb29wOmZ1bmN0aW9uKGUsdCxpLHMpe3ZvaWQgMD09PWUmJihlPTApLHZvaWQgMD09PXQmJih0PXRoaXMucGFyYW1zLnNwZWVkKSx2b2lkIDA9PT1pJiYoaT0hMCk7dmFyIGE9ZTtyZXR1cm4gdGhpcy5wYXJhbXMubG9vcCYmKGErPXRoaXMubG9vcGVkU2xpZGVzKSx0aGlzLnNsaWRlVG8oYSx0LGkscyl9LHNsaWRlTmV4dDpmdW5jdGlvbihlLHQsaSl7dm9pZCAwPT09ZSYmKGU9dGhpcy5wYXJhbXMuc3BlZWQpLHZvaWQgMD09PXQmJih0PSEwKTt2YXIgcz10aGlzLnBhcmFtcyxhPXRoaXMuYW5pbWF0aW5nLHI9dGhpcy5hY3RpdmVJbmRleDxzLnNsaWRlc1Blckdyb3VwU2tpcD8xOnMuc2xpZGVzUGVyR3JvdXA7aWYocy5sb29wKXtpZihhKXJldHVybiExO3RoaXMubG9vcEZpeCgpLHRoaXMuX2NsaWVudExlZnQ9dGhpcy4kd3JhcHBlckVsWzBdLmNsaWVudExlZnR9cmV0dXJuIHRoaXMuc2xpZGVUbyh0aGlzLmFjdGl2ZUluZGV4K3IsZSx0LGkpfSxzbGlkZVByZXY6ZnVuY3Rpb24oZSx0LGkpe3ZvaWQgMD09PWUmJihlPXRoaXMucGFyYW1zLnNwZWVkKSx2b2lkIDA9PT10JiYodD0hMCk7dmFyIHM9dGhpcy5wYXJhbXMsYT10aGlzLmFuaW1hdGluZyxyPXRoaXMuc25hcEdyaWQsbj10aGlzLnNsaWRlc0dyaWQsbz10aGlzLnJ0bFRyYW5zbGF0ZTtpZihzLmxvb3Ape2lmKGEpcmV0dXJuITE7dGhpcy5sb29wRml4KCksdGhpcy5fY2xpZW50TGVmdD10aGlzLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdH1mdW5jdGlvbiBsKGUpe3JldHVybiBlPDA/LU1hdGguZmxvb3IoTWF0aC5hYnMoZSkpOk1hdGguZmxvb3IoZSl9dmFyIGQsaD1sKG8/dGhpcy50cmFuc2xhdGU6LXRoaXMudHJhbnNsYXRlKSxwPXIubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gbChlKX0pKSxjPShuLm1hcCgoZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSl9KSkscltwLmluZGV4T2YoaCldLHJbcC5pbmRleE9mKGgpLTFdKTtyZXR1cm4gdm9pZCAwPT09YyYmcy5jc3NNb2RlJiZyLmZvckVhY2goKGZ1bmN0aW9uKGUpeyFjJiZoPj1lJiYoYz1lKX0pKSx2b2lkIDAhPT1jJiYoZD1uLmluZGV4T2YoYykpPDAmJihkPXRoaXMuYWN0aXZlSW5kZXgtMSksdGhpcy5zbGlkZVRvKGQsZSx0LGkpfSxzbGlkZVJlc2V0OmZ1bmN0aW9uKGUsdCxpKXtyZXR1cm4gdm9pZCAwPT09ZSYmKGU9dGhpcy5wYXJhbXMuc3BlZWQpLHZvaWQgMD09PXQmJih0PSEwKSx0aGlzLnNsaWRlVG8odGhpcy5hY3RpdmVJbmRleCxlLHQsaSl9LHNsaWRlVG9DbG9zZXN0OmZ1bmN0aW9uKGUsdCxpLHMpe3ZvaWQgMD09PWUmJihlPXRoaXMucGFyYW1zLnNwZWVkKSx2b2lkIDA9PT10JiYodD0hMCksdm9pZCAwPT09cyYmKHM9LjUpO3ZhciBhPXRoaXMuYWN0aXZlSW5kZXgscj1NYXRoLm1pbih0aGlzLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsYSksbj1yK01hdGguZmxvb3IoKGEtcikvdGhpcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApLG89dGhpcy5ydGxUcmFuc2xhdGU/dGhpcy50cmFuc2xhdGU6LXRoaXMudHJhbnNsYXRlO2lmKG8+PXRoaXMuc25hcEdyaWRbbl0pe3ZhciBsPXRoaXMuc25hcEdyaWRbbl07by1sPih0aGlzLnNuYXBHcmlkW24rMV0tbCkqcyYmKGErPXRoaXMucGFyYW1zLnNsaWRlc1Blckdyb3VwKX1lbHNle3ZhciBkPXRoaXMuc25hcEdyaWRbbi0xXTtvLWQ8PSh0aGlzLnNuYXBHcmlkW25dLWQpKnMmJihhLT10aGlzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCl9cmV0dXJuIGE9TWF0aC5tYXgoYSwwKSxhPU1hdGgubWluKGEsdGhpcy5zbGlkZXNHcmlkLmxlbmd0aC0xKSx0aGlzLnNsaWRlVG8oYSxlLHQsaSl9LHNsaWRlVG9DbGlja2VkU2xpZGU6ZnVuY3Rpb24oKXt2YXIgZSx0PXRoaXMsaT10LnBhcmFtcyxzPXQuJHdyYXBwZXJFbCxhPVwiYXV0b1wiPT09aS5zbGlkZXNQZXJWaWV3P3Quc2xpZGVzUGVyVmlld0R5bmFtaWMoKTppLnNsaWRlc1BlclZpZXcscj10LmNsaWNrZWRJbmRleDtpZihpLmxvb3Ape2lmKHQuYW5pbWF0aW5nKXJldHVybjtlPXBhcnNlSW50KG4odC5jbGlja2VkU2xpZGUpLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSwxMCksaS5jZW50ZXJlZFNsaWRlcz9yPHQubG9vcGVkU2xpZGVzLWEvMnx8cj50LnNsaWRlcy5sZW5ndGgtdC5sb29wZWRTbGlkZXMrYS8yPyh0Lmxvb3BGaXgoKSxyPXMuY2hpbGRyZW4oXCIuXCIraS5zbGlkZUNsYXNzKydbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK2UrJ1wiXTpub3QoLicraS5zbGlkZUR1cGxpY2F0ZUNsYXNzK1wiKVwiKS5lcSgwKS5pbmRleCgpLGQubmV4dFRpY2soKGZ1bmN0aW9uKCl7dC5zbGlkZVRvKHIpfSkpKTp0LnNsaWRlVG8ocik6cj50LnNsaWRlcy5sZW5ndGgtYT8odC5sb29wRml4KCkscj1zLmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVDbGFzcysnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytlKydcIl06bm90KC4nK2kuc2xpZGVEdXBsaWNhdGVDbGFzcytcIilcIikuZXEoMCkuaW5kZXgoKSxkLm5leHRUaWNrKChmdW5jdGlvbigpe3Quc2xpZGVUbyhyKX0pKSk6dC5zbGlkZVRvKHIpfWVsc2UgdC5zbGlkZVRvKHIpfX07dmFyIGc9e2xvb3BDcmVhdGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS5wYXJhbXMscz1lLiR3cmFwcGVyRWw7cy5jaGlsZHJlbihcIi5cIit0LnNsaWRlQ2xhc3MrXCIuXCIrdC5zbGlkZUR1cGxpY2F0ZUNsYXNzKS5yZW1vdmUoKTt2YXIgYT1zLmNoaWxkcmVuKFwiLlwiK3Quc2xpZGVDbGFzcyk7aWYodC5sb29wRmlsbEdyb3VwV2l0aEJsYW5rKXt2YXIgcj10LnNsaWRlc1Blckdyb3VwLWEubGVuZ3RoJXQuc2xpZGVzUGVyR3JvdXA7aWYociE9PXQuc2xpZGVzUGVyR3JvdXApe2Zvcih2YXIgbz0wO288cjtvKz0xKXt2YXIgbD1uKGkuY3JlYXRlRWxlbWVudChcImRpdlwiKSkuYWRkQ2xhc3ModC5zbGlkZUNsYXNzK1wiIFwiK3Quc2xpZGVCbGFua0NsYXNzKTtzLmFwcGVuZChsKX1hPXMuY2hpbGRyZW4oXCIuXCIrdC5zbGlkZUNsYXNzKX19XCJhdXRvXCIhPT10LnNsaWRlc1BlclZpZXd8fHQubG9vcGVkU2xpZGVzfHwodC5sb29wZWRTbGlkZXM9YS5sZW5ndGgpLGUubG9vcGVkU2xpZGVzPU1hdGguY2VpbChwYXJzZUZsb2F0KHQubG9vcGVkU2xpZGVzfHx0LnNsaWRlc1BlclZpZXcsMTApKSxlLmxvb3BlZFNsaWRlcys9dC5sb29wQWRkaXRpb25hbFNsaWRlcyxlLmxvb3BlZFNsaWRlcz5hLmxlbmd0aCYmKGUubG9vcGVkU2xpZGVzPWEubGVuZ3RoKTt2YXIgZD1bXSxoPVtdO2EuZWFjaCgoZnVuY3Rpb24odCxpKXt2YXIgcz1uKGkpO3Q8ZS5sb29wZWRTbGlkZXMmJmgucHVzaChpKSx0PGEubGVuZ3RoJiZ0Pj1hLmxlbmd0aC1lLmxvb3BlZFNsaWRlcyYmZC5wdXNoKGkpLHMuYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIsdCl9KSk7Zm9yKHZhciBwPTA7cDxoLmxlbmd0aDtwKz0xKXMuYXBwZW5kKG4oaFtwXS5jbG9uZU5vZGUoITApKS5hZGRDbGFzcyh0LnNsaWRlRHVwbGljYXRlQ2xhc3MpKTtmb3IodmFyIGM9ZC5sZW5ndGgtMTtjPj0wO2MtPTEpcy5wcmVwZW5kKG4oZFtjXS5jbG9uZU5vZGUoITApKS5hZGRDbGFzcyh0LnNsaWRlRHVwbGljYXRlQ2xhc3MpKX0sbG9vcEZpeDpmdW5jdGlvbigpe3RoaXMuZW1pdChcImJlZm9yZUxvb3BGaXhcIik7dmFyIGUsdD10aGlzLmFjdGl2ZUluZGV4LGk9dGhpcy5zbGlkZXMscz10aGlzLmxvb3BlZFNsaWRlcyxhPXRoaXMuYWxsb3dTbGlkZVByZXYscj10aGlzLmFsbG93U2xpZGVOZXh0LG49dGhpcy5zbmFwR3JpZCxvPXRoaXMucnRsVHJhbnNsYXRlO3RoaXMuYWxsb3dTbGlkZVByZXY9ITAsdGhpcy5hbGxvd1NsaWRlTmV4dD0hMDt2YXIgbD0tblt0XS10aGlzLmdldFRyYW5zbGF0ZSgpO2lmKHQ8cyllPWkubGVuZ3RoLTMqcyt0LGUrPXMsdGhpcy5zbGlkZVRvKGUsMCwhMSwhMCkmJjAhPT1sJiZ0aGlzLnNldFRyYW5zbGF0ZSgobz8tdGhpcy50cmFuc2xhdGU6dGhpcy50cmFuc2xhdGUpLWwpO2Vsc2UgaWYodD49aS5sZW5ndGgtcyl7ZT0taS5sZW5ndGgrdCtzLGUrPXMsdGhpcy5zbGlkZVRvKGUsMCwhMSwhMCkmJjAhPT1sJiZ0aGlzLnNldFRyYW5zbGF0ZSgobz8tdGhpcy50cmFuc2xhdGU6dGhpcy50cmFuc2xhdGUpLWwpfXRoaXMuYWxsb3dTbGlkZVByZXY9YSx0aGlzLmFsbG93U2xpZGVOZXh0PXIsdGhpcy5lbWl0KFwibG9vcEZpeFwiKX0sbG9vcERlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLiR3cmFwcGVyRWwsdD10aGlzLnBhcmFtcyxpPXRoaXMuc2xpZGVzO2UuY2hpbGRyZW4oXCIuXCIrdC5zbGlkZUNsYXNzK1wiLlwiK3Quc2xpZGVEdXBsaWNhdGVDbGFzcytcIiwuXCIrdC5zbGlkZUNsYXNzK1wiLlwiK3Quc2xpZGVCbGFua0NsYXNzKS5yZW1vdmUoKSxpLnJlbW92ZUF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKX19O3ZhciBiPXtzZXRHcmFiQ3Vyc29yOmZ1bmN0aW9uKGUpe2lmKCEoaC50b3VjaHx8IXRoaXMucGFyYW1zLnNpbXVsYXRlVG91Y2h8fHRoaXMucGFyYW1zLndhdGNoT3ZlcmZsb3cmJnRoaXMuaXNMb2NrZWR8fHRoaXMucGFyYW1zLmNzc01vZGUpKXt2YXIgdD10aGlzLmVsO3Quc3R5bGUuY3Vyc29yPVwibW92ZVwiLHQuc3R5bGUuY3Vyc29yPWU/XCItd2Via2l0LWdyYWJiaW5nXCI6XCItd2Via2l0LWdyYWJcIix0LnN0eWxlLmN1cnNvcj1lP1wiLW1vei1ncmFiYmluXCI6XCItbW96LWdyYWJcIix0LnN0eWxlLmN1cnNvcj1lP1wiZ3JhYmJpbmdcIjpcImdyYWJcIn19LHVuc2V0R3JhYkN1cnNvcjpmdW5jdGlvbigpe2gudG91Y2h8fHRoaXMucGFyYW1zLndhdGNoT3ZlcmZsb3cmJnRoaXMuaXNMb2NrZWR8fHRoaXMucGFyYW1zLmNzc01vZGV8fCh0aGlzLmVsLnN0eWxlLmN1cnNvcj1cIlwiKX19O3ZhciB3LHkseCxFLFQsUyxDLE0sUCx6LGssJCxMLEksTyxEPXthcHBlbmRTbGlkZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLiR3cmFwcGVyRWwsaT10aGlzLnBhcmFtcztpZihpLmxvb3AmJnRoaXMubG9vcERlc3Ryb3koKSxcIm9iamVjdFwiPT10eXBlb2YgZSYmXCJsZW5ndGhcImluIGUpZm9yKHZhciBzPTA7czxlLmxlbmd0aDtzKz0xKWVbc10mJnQuYXBwZW5kKGVbc10pO2Vsc2UgdC5hcHBlbmQoZSk7aS5sb29wJiZ0aGlzLmxvb3BDcmVhdGUoKSxpLm9ic2VydmVyJiZoLm9ic2VydmVyfHx0aGlzLnVwZGF0ZSgpfSxwcmVwZW5kU2xpZGU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5wYXJhbXMsaT10aGlzLiR3cmFwcGVyRWwscz10aGlzLmFjdGl2ZUluZGV4O3QubG9vcCYmdGhpcy5sb29wRGVzdHJveSgpO3ZhciBhPXMrMTtpZihcIm9iamVjdFwiPT10eXBlb2YgZSYmXCJsZW5ndGhcImluIGUpe2Zvcih2YXIgcj0wO3I8ZS5sZW5ndGg7cis9MSllW3JdJiZpLnByZXBlbmQoZVtyXSk7YT1zK2UubGVuZ3RofWVsc2UgaS5wcmVwZW5kKGUpO3QubG9vcCYmdGhpcy5sb29wQ3JlYXRlKCksdC5vYnNlcnZlciYmaC5vYnNlcnZlcnx8dGhpcy51cGRhdGUoKSx0aGlzLnNsaWRlVG8oYSwwLCExKX0sYWRkU2xpZGU6ZnVuY3Rpb24oZSx0KXt2YXIgaT10aGlzLiR3cmFwcGVyRWwscz10aGlzLnBhcmFtcyxhPXRoaXMuYWN0aXZlSW5kZXg7cy5sb29wJiYoYS09dGhpcy5sb29wZWRTbGlkZXMsdGhpcy5sb29wRGVzdHJveSgpLHRoaXMuc2xpZGVzPWkuY2hpbGRyZW4oXCIuXCIrcy5zbGlkZUNsYXNzKSk7dmFyIHI9dGhpcy5zbGlkZXMubGVuZ3RoO2lmKGU8PTApdGhpcy5wcmVwZW5kU2xpZGUodCk7ZWxzZSBpZihlPj1yKXRoaXMuYXBwZW5kU2xpZGUodCk7ZWxzZXtmb3IodmFyIG49YT5lP2ErMTphLG89W10sbD1yLTE7bD49ZTtsLT0xKXt2YXIgZD10aGlzLnNsaWRlcy5lcShsKTtkLnJlbW92ZSgpLG8udW5zaGlmdChkKX1pZihcIm9iamVjdFwiPT10eXBlb2YgdCYmXCJsZW5ndGhcImluIHQpe2Zvcih2YXIgcD0wO3A8dC5sZW5ndGg7cCs9MSl0W3BdJiZpLmFwcGVuZCh0W3BdKTtuPWE+ZT9hK3QubGVuZ3RoOmF9ZWxzZSBpLmFwcGVuZCh0KTtmb3IodmFyIGM9MDtjPG8ubGVuZ3RoO2MrPTEpaS5hcHBlbmQob1tjXSk7cy5sb29wJiZ0aGlzLmxvb3BDcmVhdGUoKSxzLm9ic2VydmVyJiZoLm9ic2VydmVyfHx0aGlzLnVwZGF0ZSgpLHMubG9vcD90aGlzLnNsaWRlVG8obit0aGlzLmxvb3BlZFNsaWRlcywwLCExKTp0aGlzLnNsaWRlVG8obiwwLCExKX19LHJlbW92ZVNsaWRlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLGk9dGhpcy4kd3JhcHBlckVsLHM9dGhpcy5hY3RpdmVJbmRleDt0Lmxvb3AmJihzLT10aGlzLmxvb3BlZFNsaWRlcyx0aGlzLmxvb3BEZXN0cm95KCksdGhpcy5zbGlkZXM9aS5jaGlsZHJlbihcIi5cIit0LnNsaWRlQ2xhc3MpKTt2YXIgYSxyPXM7aWYoXCJvYmplY3RcIj09dHlwZW9mIGUmJlwibGVuZ3RoXCJpbiBlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rPTEpYT1lW25dLHRoaXMuc2xpZGVzW2FdJiZ0aGlzLnNsaWRlcy5lcShhKS5yZW1vdmUoKSxhPHImJihyLT0xKTtyPU1hdGgubWF4KHIsMCl9ZWxzZSBhPWUsdGhpcy5zbGlkZXNbYV0mJnRoaXMuc2xpZGVzLmVxKGEpLnJlbW92ZSgpLGE8ciYmKHItPTEpLHI9TWF0aC5tYXgociwwKTt0Lmxvb3AmJnRoaXMubG9vcENyZWF0ZSgpLHQub2JzZXJ2ZXImJmgub2JzZXJ2ZXJ8fHRoaXMudXBkYXRlKCksdC5sb29wP3RoaXMuc2xpZGVUbyhyK3RoaXMubG9vcGVkU2xpZGVzLDAsITEpOnRoaXMuc2xpZGVUbyhyLDAsITEpfSxyZW1vdmVBbGxTbGlkZXM6ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD0wO3Q8dGhpcy5zbGlkZXMubGVuZ3RoO3QrPTEpZS5wdXNoKHQpO3RoaXMucmVtb3ZlU2xpZGUoZSl9fSxBPSh3PWEubmF2aWdhdG9yLnBsYXRmb3JtLHk9YS5uYXZpZ2F0b3IudXNlckFnZW50LHg9e2lvczohMSxhbmRyb2lkOiExLGFuZHJvaWRDaHJvbWU6ITEsZGVza3RvcDohMSxpcGhvbmU6ITEsaXBvZDohMSxpcGFkOiExLGVkZ2U6ITEsaWU6ITEsZmlyZWZveDohMSxtYWNvczohMSx3aW5kb3dzOiExLGNvcmRvdmE6ISghYS5jb3Jkb3ZhJiYhYS5waG9uZWdhcCkscGhvbmVnYXA6ISghYS5jb3Jkb3ZhJiYhYS5waG9uZWdhcCksZWxlY3Ryb246ITF9LEU9YS5zY3JlZW4ud2lkdGgsVD1hLnNjcmVlbi5oZWlnaHQsUz15Lm1hdGNoKC8oQW5kcm9pZCk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKSxDPXkubWF0Y2goLyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvKSxNPXkubWF0Y2goLyhpUG9kKSguKk9TXFxzKFtcXGRfXSspKT8vKSxQPSFDJiZ5Lm1hdGNoKC8oaVBob25lXFxzT1N8aU9TKVxccyhbXFxkX10rKS8pLHo9eS5pbmRleE9mKFwiTVNJRSBcIik+PTB8fHkuaW5kZXhPZihcIlRyaWRlbnQvXCIpPj0wLGs9eS5pbmRleE9mKFwiRWRnZS9cIik+PTAsJD15LmluZGV4T2YoXCJHZWNrby9cIik+PTAmJnkuaW5kZXhPZihcIkZpcmVmb3gvXCIpPj0wLEw9XCJXaW4zMlwiPT09dyxJPXkudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiZWxlY3Ryb25cIik+PTAsTz1cIk1hY0ludGVsXCI9PT13LCFDJiZPJiZoLnRvdWNoJiYoMTAyND09PUUmJjEzNjY9PT1UfHw4MzQ9PT1FJiYxMTk0PT09VHx8ODM0PT09RSYmMTExMj09PVR8fDc2OD09PUUmJjEwMjQ9PT1UKSYmKEM9eS5tYXRjaCgvKFZlcnNpb24pXFwvKFtcXGQuXSspLyksTz0hMSkseC5pZT16LHguZWRnZT1rLHguZmlyZWZveD0kLFMmJiFMJiYoeC5vcz1cImFuZHJvaWRcIix4Lm9zVmVyc2lvbj1TWzJdLHguYW5kcm9pZD0hMCx4LmFuZHJvaWRDaHJvbWU9eS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJjaHJvbWVcIik+PTApLChDfHxQfHxNKSYmKHgub3M9XCJpb3NcIix4Lmlvcz0hMCksUCYmIU0mJih4Lm9zVmVyc2lvbj1QWzJdLnJlcGxhY2UoL18vZyxcIi5cIikseC5pcGhvbmU9ITApLEMmJih4Lm9zVmVyc2lvbj1DWzJdLnJlcGxhY2UoL18vZyxcIi5cIikseC5pcGFkPSEwKSxNJiYoeC5vc1ZlcnNpb249TVszXT9NWzNdLnJlcGxhY2UoL18vZyxcIi5cIik6bnVsbCx4Lmlwb2Q9ITApLHguaW9zJiZ4Lm9zVmVyc2lvbiYmeS5pbmRleE9mKFwiVmVyc2lvbi9cIik+PTAmJlwiMTBcIj09PXgub3NWZXJzaW9uLnNwbGl0KFwiLlwiKVswXSYmKHgub3NWZXJzaW9uPXkudG9Mb3dlckNhc2UoKS5zcGxpdChcInZlcnNpb24vXCIpWzFdLnNwbGl0KFwiIFwiKVswXSkseC53ZWJWaWV3PSEoIShQfHxDfHxNKXx8IXkubWF0Y2goLy4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaSkmJiFhLm5hdmlnYXRvci5zdGFuZGFsb25lKXx8YS5tYXRjaE1lZGlhJiZhLm1hdGNoTWVkaWEoXCIoZGlzcGxheS1tb2RlOiBzdGFuZGFsb25lKVwiKS5tYXRjaGVzLHgud2Vidmlldz14LndlYlZpZXcseC5zdGFuZGFsb25lPXgud2ViVmlldyx4LmRlc2t0b3A9ISh4Lmlvc3x8eC5hbmRyb2lkKXx8SSx4LmRlc2t0b3AmJih4LmVsZWN0cm9uPUkseC5tYWNvcz1PLHgud2luZG93cz1MLHgubWFjb3MmJih4Lm9zPVwibWFjb3NcIikseC53aW5kb3dzJiYoeC5vcz1cIndpbmRvd3NcIikpLHgucGl4ZWxSYXRpbz1hLmRldmljZVBpeGVsUmF0aW98fDEseCk7ZnVuY3Rpb24gRyhlKXt2YXIgdD10aGlzLnRvdWNoRXZlbnRzRGF0YSxzPXRoaXMucGFyYW1zLHI9dGhpcy50b3VjaGVzO2lmKCF0aGlzLmFuaW1hdGluZ3x8IXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKXt2YXIgbz1lO28ub3JpZ2luYWxFdmVudCYmKG89by5vcmlnaW5hbEV2ZW50KTt2YXIgbD1uKG8udGFyZ2V0KTtpZigoXCJ3cmFwcGVyXCIhPT1zLnRvdWNoRXZlbnRzVGFyZ2V0fHxsLmNsb3Nlc3QodGhpcy53cmFwcGVyRWwpLmxlbmd0aCkmJih0LmlzVG91Y2hFdmVudD1cInRvdWNoc3RhcnRcIj09PW8udHlwZSwodC5pc1RvdWNoRXZlbnR8fCEoXCJ3aGljaFwiaW4gbyl8fDMhPT1vLndoaWNoKSYmISghdC5pc1RvdWNoRXZlbnQmJlwiYnV0dG9uXCJpbiBvJiZvLmJ1dHRvbj4wfHx0LmlzVG91Y2hlZCYmdC5pc01vdmVkKSkpaWYocy5ub1N3aXBpbmcmJmwuY2xvc2VzdChzLm5vU3dpcGluZ1NlbGVjdG9yP3Mubm9Td2lwaW5nU2VsZWN0b3I6XCIuXCIrcy5ub1N3aXBpbmdDbGFzcylbMF0pdGhpcy5hbGxvd0NsaWNrPSEwO2Vsc2UgaWYoIXMuc3dpcGVIYW5kbGVyfHxsLmNsb3Nlc3Qocy5zd2lwZUhhbmRsZXIpWzBdKXtyLmN1cnJlbnRYPVwidG91Y2hzdGFydFwiPT09by50eXBlP28udGFyZ2V0VG91Y2hlc1swXS5wYWdlWDpvLnBhZ2VYLHIuY3VycmVudFk9XCJ0b3VjaHN0YXJ0XCI9PT1vLnR5cGU/by50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZOm8ucGFnZVk7dmFyIGg9ci5jdXJyZW50WCxwPXIuY3VycmVudFksYz1zLmVkZ2VTd2lwZURldGVjdGlvbnx8cy5pT1NFZGdlU3dpcGVEZXRlY3Rpb24sdT1zLmVkZ2VTd2lwZVRocmVzaG9sZHx8cy5pT1NFZGdlU3dpcGVUaHJlc2hvbGQ7aWYoIWN8fCEoaDw9dXx8aD49YS5zY3JlZW4ud2lkdGgtdSkpe2lmKGQuZXh0ZW5kKHQse2lzVG91Y2hlZDohMCxpc01vdmVkOiExLGFsbG93VG91Y2hDYWxsYmFja3M6ITAsaXNTY3JvbGxpbmc6dm9pZCAwLHN0YXJ0TW92aW5nOnZvaWQgMH0pLHIuc3RhcnRYPWgsci5zdGFydFk9cCx0LnRvdWNoU3RhcnRUaW1lPWQubm93KCksdGhpcy5hbGxvd0NsaWNrPSEwLHRoaXMudXBkYXRlU2l6ZSgpLHRoaXMuc3dpcGVEaXJlY3Rpb249dm9pZCAwLHMudGhyZXNob2xkPjAmJih0LmFsbG93VGhyZXNob2xkTW92ZT0hMSksXCJ0b3VjaHN0YXJ0XCIhPT1vLnR5cGUpe3ZhciB2PSEwO2wuaXModC5mb3JtRWxlbWVudHMpJiYodj0hMSksaS5hY3RpdmVFbGVtZW50JiZuKGkuYWN0aXZlRWxlbWVudCkuaXModC5mb3JtRWxlbWVudHMpJiZpLmFjdGl2ZUVsZW1lbnQhPT1sWzBdJiZpLmFjdGl2ZUVsZW1lbnQuYmx1cigpO3ZhciBmPXYmJnRoaXMuYWxsb3dUb3VjaE1vdmUmJnMudG91Y2hTdGFydFByZXZlbnREZWZhdWx0OyhzLnRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0fHxmKSYmby5wcmV2ZW50RGVmYXVsdCgpfXRoaXMuZW1pdChcInRvdWNoU3RhcnRcIixvKX19fX1mdW5jdGlvbiBIKGUpe3ZhciB0PXRoaXMudG91Y2hFdmVudHNEYXRhLHM9dGhpcy5wYXJhbXMsYT10aGlzLnRvdWNoZXMscj10aGlzLnJ0bFRyYW5zbGF0ZSxvPWU7aWYoby5vcmlnaW5hbEV2ZW50JiYobz1vLm9yaWdpbmFsRXZlbnQpLHQuaXNUb3VjaGVkKXtpZighdC5pc1RvdWNoRXZlbnR8fFwidG91Y2htb3ZlXCI9PT1vLnR5cGUpe3ZhciBsPVwidG91Y2htb3ZlXCI9PT1vLnR5cGUmJm8udGFyZ2V0VG91Y2hlcyYmKG8udGFyZ2V0VG91Y2hlc1swXXx8by5jaGFuZ2VkVG91Y2hlc1swXSksaD1cInRvdWNobW92ZVwiPT09by50eXBlP2wucGFnZVg6by5wYWdlWCxwPVwidG91Y2htb3ZlXCI9PT1vLnR5cGU/bC5wYWdlWTpvLnBhZ2VZO2lmKG8ucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIpcmV0dXJuIGEuc3RhcnRYPWgsdm9pZChhLnN0YXJ0WT1wKTtpZighdGhpcy5hbGxvd1RvdWNoTW92ZSlyZXR1cm4gdGhpcy5hbGxvd0NsaWNrPSExLHZvaWQodC5pc1RvdWNoZWQmJihkLmV4dGVuZChhLHtzdGFydFg6aCxzdGFydFk6cCxjdXJyZW50WDpoLGN1cnJlbnRZOnB9KSx0LnRvdWNoU3RhcnRUaW1lPWQubm93KCkpKTtpZih0LmlzVG91Y2hFdmVudCYmcy50b3VjaFJlbGVhc2VPbkVkZ2VzJiYhcy5sb29wKWlmKHRoaXMuaXNWZXJ0aWNhbCgpKXtpZihwPGEuc3RhcnRZJiZ0aGlzLnRyYW5zbGF0ZTw9dGhpcy5tYXhUcmFuc2xhdGUoKXx8cD5hLnN0YXJ0WSYmdGhpcy50cmFuc2xhdGU+PXRoaXMubWluVHJhbnNsYXRlKCkpcmV0dXJuIHQuaXNUb3VjaGVkPSExLHZvaWQodC5pc01vdmVkPSExKX1lbHNlIGlmKGg8YS5zdGFydFgmJnRoaXMudHJhbnNsYXRlPD10aGlzLm1heFRyYW5zbGF0ZSgpfHxoPmEuc3RhcnRYJiZ0aGlzLnRyYW5zbGF0ZT49dGhpcy5taW5UcmFuc2xhdGUoKSlyZXR1cm47aWYodC5pc1RvdWNoRXZlbnQmJmkuYWN0aXZlRWxlbWVudCYmby50YXJnZXQ9PT1pLmFjdGl2ZUVsZW1lbnQmJm4oby50YXJnZXQpLmlzKHQuZm9ybUVsZW1lbnRzKSlyZXR1cm4gdC5pc01vdmVkPSEwLHZvaWQodGhpcy5hbGxvd0NsaWNrPSExKTtpZih0LmFsbG93VG91Y2hDYWxsYmFja3MmJnRoaXMuZW1pdChcInRvdWNoTW92ZVwiLG8pLCEoby50YXJnZXRUb3VjaGVzJiZvLnRhcmdldFRvdWNoZXMubGVuZ3RoPjEpKXthLmN1cnJlbnRYPWgsYS5jdXJyZW50WT1wO3ZhciBjPWEuY3VycmVudFgtYS5zdGFydFgsdT1hLmN1cnJlbnRZLWEuc3RhcnRZO2lmKCEodGhpcy5wYXJhbXMudGhyZXNob2xkJiZNYXRoLnNxcnQoTWF0aC5wb3coYywyKStNYXRoLnBvdyh1LDIpKTx0aGlzLnBhcmFtcy50aHJlc2hvbGQpKXt2YXIgdjtpZih2b2lkIDA9PT10LmlzU2Nyb2xsaW5nKXRoaXMuaXNIb3Jpem9udGFsKCkmJmEuY3VycmVudFk9PT1hLnN0YXJ0WXx8dGhpcy5pc1ZlcnRpY2FsKCkmJmEuY3VycmVudFg9PT1hLnN0YXJ0WD90LmlzU2Nyb2xsaW5nPSExOmMqYyt1KnU+PTI1JiYodj0xODAqTWF0aC5hdGFuMihNYXRoLmFicyh1KSxNYXRoLmFicyhjKSkvTWF0aC5QSSx0LmlzU2Nyb2xsaW5nPXRoaXMuaXNIb3Jpem9udGFsKCk/dj5zLnRvdWNoQW5nbGU6OTAtdj5zLnRvdWNoQW5nbGUpO2lmKHQuaXNTY3JvbGxpbmcmJnRoaXMuZW1pdChcInRvdWNoTW92ZU9wcG9zaXRlXCIsbyksdm9pZCAwPT09dC5zdGFydE1vdmluZyYmKGEuY3VycmVudFg9PT1hLnN0YXJ0WCYmYS5jdXJyZW50WT09PWEuc3RhcnRZfHwodC5zdGFydE1vdmluZz0hMCkpLHQuaXNTY3JvbGxpbmcpdC5pc1RvdWNoZWQ9ITE7ZWxzZSBpZih0LnN0YXJ0TW92aW5nKXt0aGlzLmFsbG93Q2xpY2s9ITEsIXMuY3NzTW9kZSYmby5jYW5jZWxhYmxlJiZvLnByZXZlbnREZWZhdWx0KCkscy50b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24mJiFzLm5lc3RlZCYmby5zdG9wUHJvcGFnYXRpb24oKSx0LmlzTW92ZWR8fChzLmxvb3AmJnRoaXMubG9vcEZpeCgpLHQuc3RhcnRUcmFuc2xhdGU9dGhpcy5nZXRUcmFuc2xhdGUoKSx0aGlzLnNldFRyYW5zaXRpb24oMCksdGhpcy5hbmltYXRpbmcmJnRoaXMuJHdyYXBwZXJFbC50cmlnZ2VyKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIpLHQuYWxsb3dNb21lbnR1bUJvdW5jZT0hMSwhcy5ncmFiQ3Vyc29yfHwhMCE9PXRoaXMuYWxsb3dTbGlkZU5leHQmJiEwIT09dGhpcy5hbGxvd1NsaWRlUHJldnx8dGhpcy5zZXRHcmFiQ3Vyc29yKCEwKSx0aGlzLmVtaXQoXCJzbGlkZXJGaXJzdE1vdmVcIixvKSksdGhpcy5lbWl0KFwic2xpZGVyTW92ZVwiLG8pLHQuaXNNb3ZlZD0hMDt2YXIgZj10aGlzLmlzSG9yaXpvbnRhbCgpP2M6dTthLmRpZmY9ZixmKj1zLnRvdWNoUmF0aW8sciYmKGY9LWYpLHRoaXMuc3dpcGVEaXJlY3Rpb249Zj4wP1wicHJldlwiOlwibmV4dFwiLHQuY3VycmVudFRyYW5zbGF0ZT1mK3Quc3RhcnRUcmFuc2xhdGU7dmFyIG09ITAsZz1zLnJlc2lzdGFuY2VSYXRpbztpZihzLnRvdWNoUmVsZWFzZU9uRWRnZXMmJihnPTApLGY+MCYmdC5jdXJyZW50VHJhbnNsYXRlPnRoaXMubWluVHJhbnNsYXRlKCk/KG09ITEscy5yZXNpc3RhbmNlJiYodC5jdXJyZW50VHJhbnNsYXRlPXRoaXMubWluVHJhbnNsYXRlKCktMStNYXRoLnBvdygtdGhpcy5taW5UcmFuc2xhdGUoKSt0LnN0YXJ0VHJhbnNsYXRlK2YsZykpKTpmPDAmJnQuY3VycmVudFRyYW5zbGF0ZTx0aGlzLm1heFRyYW5zbGF0ZSgpJiYobT0hMSxzLnJlc2lzdGFuY2UmJih0LmN1cnJlbnRUcmFuc2xhdGU9dGhpcy5tYXhUcmFuc2xhdGUoKSsxLU1hdGgucG93KHRoaXMubWF4VHJhbnNsYXRlKCktdC5zdGFydFRyYW5zbGF0ZS1mLGcpKSksbSYmKG8ucHJldmVudGVkQnlOZXN0ZWRTd2lwZXI9ITApLCF0aGlzLmFsbG93U2xpZGVOZXh0JiZcIm5leHRcIj09PXRoaXMuc3dpcGVEaXJlY3Rpb24mJnQuY3VycmVudFRyYW5zbGF0ZTx0LnN0YXJ0VHJhbnNsYXRlJiYodC5jdXJyZW50VHJhbnNsYXRlPXQuc3RhcnRUcmFuc2xhdGUpLCF0aGlzLmFsbG93U2xpZGVQcmV2JiZcInByZXZcIj09PXRoaXMuc3dpcGVEaXJlY3Rpb24mJnQuY3VycmVudFRyYW5zbGF0ZT50LnN0YXJ0VHJhbnNsYXRlJiYodC5jdXJyZW50VHJhbnNsYXRlPXQuc3RhcnRUcmFuc2xhdGUpLHMudGhyZXNob2xkPjApe2lmKCEoTWF0aC5hYnMoZik+cy50aHJlc2hvbGR8fHQuYWxsb3dUaHJlc2hvbGRNb3ZlKSlyZXR1cm4gdm9pZCh0LmN1cnJlbnRUcmFuc2xhdGU9dC5zdGFydFRyYW5zbGF0ZSk7aWYoIXQuYWxsb3dUaHJlc2hvbGRNb3ZlKXJldHVybiB0LmFsbG93VGhyZXNob2xkTW92ZT0hMCxhLnN0YXJ0WD1hLmN1cnJlbnRYLGEuc3RhcnRZPWEuY3VycmVudFksdC5jdXJyZW50VHJhbnNsYXRlPXQuc3RhcnRUcmFuc2xhdGUsdm9pZChhLmRpZmY9dGhpcy5pc0hvcml6b250YWwoKT9hLmN1cnJlbnRYLWEuc3RhcnRYOmEuY3VycmVudFktYS5zdGFydFkpfXMuZm9sbG93RmluZ2VyJiYhcy5jc3NNb2RlJiYoKHMuZnJlZU1vZGV8fHMud2F0Y2hTbGlkZXNQcm9ncmVzc3x8cy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpJiYodGhpcy51cGRhdGVBY3RpdmVJbmRleCgpLHRoaXMudXBkYXRlU2xpZGVzQ2xhc3NlcygpKSxzLmZyZWVNb2RlJiYoMD09PXQudmVsb2NpdGllcy5sZW5ndGgmJnQudmVsb2NpdGllcy5wdXNoKHtwb3NpdGlvbjphW3RoaXMuaXNIb3Jpem9udGFsKCk/XCJzdGFydFhcIjpcInN0YXJ0WVwiXSx0aW1lOnQudG91Y2hTdGFydFRpbWV9KSx0LnZlbG9jaXRpZXMucHVzaCh7cG9zaXRpb246YVt0aGlzLmlzSG9yaXpvbnRhbCgpP1wiY3VycmVudFhcIjpcImN1cnJlbnRZXCJdLHRpbWU6ZC5ub3coKX0pKSx0aGlzLnVwZGF0ZVByb2dyZXNzKHQuY3VycmVudFRyYW5zbGF0ZSksdGhpcy5zZXRUcmFuc2xhdGUodC5jdXJyZW50VHJhbnNsYXRlKSl9fX19fWVsc2UgdC5zdGFydE1vdmluZyYmdC5pc1Njcm9sbGluZyYmdGhpcy5lbWl0KFwidG91Y2hNb3ZlT3Bwb3NpdGVcIixvKX1mdW5jdGlvbiBCKGUpe3ZhciB0PXRoaXMsaT10LnRvdWNoRXZlbnRzRGF0YSxzPXQucGFyYW1zLGE9dC50b3VjaGVzLHI9dC5ydGxUcmFuc2xhdGUsbj10LiR3cmFwcGVyRWwsbz10LnNsaWRlc0dyaWQsbD10LnNuYXBHcmlkLGg9ZTtpZihoLm9yaWdpbmFsRXZlbnQmJihoPWgub3JpZ2luYWxFdmVudCksaS5hbGxvd1RvdWNoQ2FsbGJhY2tzJiZ0LmVtaXQoXCJ0b3VjaEVuZFwiLGgpLGkuYWxsb3dUb3VjaENhbGxiYWNrcz0hMSwhaS5pc1RvdWNoZWQpcmV0dXJuIGkuaXNNb3ZlZCYmcy5ncmFiQ3Vyc29yJiZ0LnNldEdyYWJDdXJzb3IoITEpLGkuaXNNb3ZlZD0hMSx2b2lkKGkuc3RhcnRNb3Zpbmc9ITEpO3MuZ3JhYkN1cnNvciYmaS5pc01vdmVkJiZpLmlzVG91Y2hlZCYmKCEwPT09dC5hbGxvd1NsaWRlTmV4dHx8ITA9PT10LmFsbG93U2xpZGVQcmV2KSYmdC5zZXRHcmFiQ3Vyc29yKCExKTt2YXIgcCxjPWQubm93KCksdT1jLWkudG91Y2hTdGFydFRpbWU7aWYodC5hbGxvd0NsaWNrJiYodC51cGRhdGVDbGlja2VkU2xpZGUoaCksdC5lbWl0KFwidGFwIGNsaWNrXCIsaCksdTwzMDAmJmMtaS5sYXN0Q2xpY2tUaW1lPDMwMCYmdC5lbWl0KFwiZG91YmxlVGFwIGRvdWJsZUNsaWNrXCIsaCkpLGkubGFzdENsaWNrVGltZT1kLm5vdygpLGQubmV4dFRpY2soKGZ1bmN0aW9uKCl7dC5kZXN0cm95ZWR8fCh0LmFsbG93Q2xpY2s9ITApfSkpLCFpLmlzVG91Y2hlZHx8IWkuaXNNb3ZlZHx8IXQuc3dpcGVEaXJlY3Rpb258fDA9PT1hLmRpZmZ8fGkuY3VycmVudFRyYW5zbGF0ZT09PWkuc3RhcnRUcmFuc2xhdGUpcmV0dXJuIGkuaXNUb3VjaGVkPSExLGkuaXNNb3ZlZD0hMSx2b2lkKGkuc3RhcnRNb3Zpbmc9ITEpO2lmKGkuaXNUb3VjaGVkPSExLGkuaXNNb3ZlZD0hMSxpLnN0YXJ0TW92aW5nPSExLHA9cy5mb2xsb3dGaW5nZXI/cj90LnRyYW5zbGF0ZTotdC50cmFuc2xhdGU6LWkuY3VycmVudFRyYW5zbGF0ZSwhcy5jc3NNb2RlKWlmKHMuZnJlZU1vZGUpe2lmKHA8LXQubWluVHJhbnNsYXRlKCkpcmV0dXJuIHZvaWQgdC5zbGlkZVRvKHQuYWN0aXZlSW5kZXgpO2lmKHA+LXQubWF4VHJhbnNsYXRlKCkpcmV0dXJuIHZvaWQodC5zbGlkZXMubGVuZ3RoPGwubGVuZ3RoP3Quc2xpZGVUbyhsLmxlbmd0aC0xKTp0LnNsaWRlVG8odC5zbGlkZXMubGVuZ3RoLTEpKTtpZihzLmZyZWVNb2RlTW9tZW50dW0pe2lmKGkudmVsb2NpdGllcy5sZW5ndGg+MSl7dmFyIHY9aS52ZWxvY2l0aWVzLnBvcCgpLGY9aS52ZWxvY2l0aWVzLnBvcCgpLG09di5wb3NpdGlvbi1mLnBvc2l0aW9uLGc9di50aW1lLWYudGltZTt0LnZlbG9jaXR5PW0vZyx0LnZlbG9jaXR5Lz0yLE1hdGguYWJzKHQudmVsb2NpdHkpPHMuZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHkmJih0LnZlbG9jaXR5PTApLChnPjE1MHx8ZC5ub3coKS12LnRpbWU+MzAwKSYmKHQudmVsb2NpdHk9MCl9ZWxzZSB0LnZlbG9jaXR5PTA7dC52ZWxvY2l0eSo9cy5mcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbyxpLnZlbG9jaXRpZXMubGVuZ3RoPTA7dmFyIGI9MWUzKnMuZnJlZU1vZGVNb21lbnR1bVJhdGlvLHc9dC52ZWxvY2l0eSpiLHk9dC50cmFuc2xhdGUrdztyJiYoeT0teSk7dmFyIHgsRSxUPSExLFM9MjAqTWF0aC5hYnModC52ZWxvY2l0eSkqcy5mcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW87aWYoeTx0Lm1heFRyYW5zbGF0ZSgpKXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZT8oeSt0Lm1heFRyYW5zbGF0ZSgpPC1TJiYoeT10Lm1heFRyYW5zbGF0ZSgpLVMpLHg9dC5tYXhUcmFuc2xhdGUoKSxUPSEwLGkuYWxsb3dNb21lbnR1bUJvdW5jZT0hMCk6eT10Lm1heFRyYW5zbGF0ZSgpLHMubG9vcCYmcy5jZW50ZXJlZFNsaWRlcyYmKEU9ITApO2Vsc2UgaWYoeT50Lm1pblRyYW5zbGF0ZSgpKXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZT8oeS10Lm1pblRyYW5zbGF0ZSgpPlMmJih5PXQubWluVHJhbnNsYXRlKCkrUykseD10Lm1pblRyYW5zbGF0ZSgpLFQ9ITAsaS5hbGxvd01vbWVudHVtQm91bmNlPSEwKTp5PXQubWluVHJhbnNsYXRlKCkscy5sb29wJiZzLmNlbnRlcmVkU2xpZGVzJiYoRT0hMCk7ZWxzZSBpZihzLmZyZWVNb2RlU3RpY2t5KXtmb3IodmFyIEMsTT0wO008bC5sZW5ndGg7TSs9MSlpZihsW01dPi15KXtDPU07YnJlYWt9eT0tKHk9TWF0aC5hYnMobFtDXS15KTxNYXRoLmFicyhsW0MtMV0teSl8fFwibmV4dFwiPT09dC5zd2lwZURpcmVjdGlvbj9sW0NdOmxbQy0xXSl9aWYoRSYmdC5vbmNlKFwidHJhbnNpdGlvbkVuZFwiLChmdW5jdGlvbigpe3QubG9vcEZpeCgpfSkpLDAhPT10LnZlbG9jaXR5KXtpZihiPXI/TWF0aC5hYnMoKC15LXQudHJhbnNsYXRlKS90LnZlbG9jaXR5KTpNYXRoLmFicygoeS10LnRyYW5zbGF0ZSkvdC52ZWxvY2l0eSkscy5mcmVlTW9kZVN0aWNreSl7dmFyIFA9TWF0aC5hYnMoKHI/LXk6eSktdC50cmFuc2xhdGUpLHo9dC5zbGlkZXNTaXplc0dyaWRbdC5hY3RpdmVJbmRleF07Yj1QPHo/cy5zcGVlZDpQPDIqej8xLjUqcy5zcGVlZDoyLjUqcy5zcGVlZH19ZWxzZSBpZihzLmZyZWVNb2RlU3RpY2t5KXJldHVybiB2b2lkIHQuc2xpZGVUb0Nsb3Nlc3QoKTtzLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UmJlQ/KHQudXBkYXRlUHJvZ3Jlc3MoeCksdC5zZXRUcmFuc2l0aW9uKGIpLHQuc2V0VHJhbnNsYXRlKHkpLHQudHJhbnNpdGlvblN0YXJ0KCEwLHQuc3dpcGVEaXJlY3Rpb24pLHQuYW5pbWF0aW5nPSEwLG4udHJhbnNpdGlvbkVuZCgoZnVuY3Rpb24oKXt0JiYhdC5kZXN0cm95ZWQmJmkuYWxsb3dNb21lbnR1bUJvdW5jZSYmKHQuZW1pdChcIm1vbWVudHVtQm91bmNlXCIpLHQuc2V0VHJhbnNpdGlvbihzLnNwZWVkKSxzZXRUaW1lb3V0KChmdW5jdGlvbigpe3Quc2V0VHJhbnNsYXRlKHgpLG4udHJhbnNpdGlvbkVuZCgoZnVuY3Rpb24oKXt0JiYhdC5kZXN0cm95ZWQmJnQudHJhbnNpdGlvbkVuZCgpfSkpfSksMCkpfSkpKTp0LnZlbG9jaXR5Pyh0LnVwZGF0ZVByb2dyZXNzKHkpLHQuc2V0VHJhbnNpdGlvbihiKSx0LnNldFRyYW5zbGF0ZSh5KSx0LnRyYW5zaXRpb25TdGFydCghMCx0LnN3aXBlRGlyZWN0aW9uKSx0LmFuaW1hdGluZ3x8KHQuYW5pbWF0aW5nPSEwLG4udHJhbnNpdGlvbkVuZCgoZnVuY3Rpb24oKXt0JiYhdC5kZXN0cm95ZWQmJnQudHJhbnNpdGlvbkVuZCgpfSkpKSk6dC51cGRhdGVQcm9ncmVzcyh5KSx0LnVwZGF0ZUFjdGl2ZUluZGV4KCksdC51cGRhdGVTbGlkZXNDbGFzc2VzKCl9ZWxzZSBpZihzLmZyZWVNb2RlU3RpY2t5KXJldHVybiB2b2lkIHQuc2xpZGVUb0Nsb3Nlc3QoKTsoIXMuZnJlZU1vZGVNb21lbnR1bXx8dT49cy5sb25nU3dpcGVzTXMpJiYodC51cGRhdGVQcm9ncmVzcygpLHQudXBkYXRlQWN0aXZlSW5kZXgoKSx0LnVwZGF0ZVNsaWRlc0NsYXNzZXMoKSl9ZWxzZXtmb3IodmFyIGs9MCwkPXQuc2xpZGVzU2l6ZXNHcmlkWzBdLEw9MDtMPG8ubGVuZ3RoO0wrPUw8cy5zbGlkZXNQZXJHcm91cFNraXA/MTpzLnNsaWRlc1Blckdyb3VwKXt2YXIgST1MPHMuc2xpZGVzUGVyR3JvdXBTa2lwLTE/MTpzLnNsaWRlc1Blckdyb3VwO3ZvaWQgMCE9PW9bTCtJXT9wPj1vW0xdJiZwPG9bTCtJXSYmKGs9TCwkPW9bTCtJXS1vW0xdKTpwPj1vW0xdJiYoaz1MLCQ9b1tvLmxlbmd0aC0xXS1vW28ubGVuZ3RoLTJdKX12YXIgTz0ocC1vW2tdKS8kLEQ9azxzLnNsaWRlc1Blckdyb3VwU2tpcC0xPzE6cy5zbGlkZXNQZXJHcm91cDtpZih1PnMubG9uZ1N3aXBlc01zKXtpZighcy5sb25nU3dpcGVzKXJldHVybiB2b2lkIHQuc2xpZGVUbyh0LmFjdGl2ZUluZGV4KTtcIm5leHRcIj09PXQuc3dpcGVEaXJlY3Rpb24mJihPPj1zLmxvbmdTd2lwZXNSYXRpbz90LnNsaWRlVG8oaytEKTp0LnNsaWRlVG8oaykpLFwicHJldlwiPT09dC5zd2lwZURpcmVjdGlvbiYmKE8+MS1zLmxvbmdTd2lwZXNSYXRpbz90LnNsaWRlVG8oaytEKTp0LnNsaWRlVG8oaykpfWVsc2V7aWYoIXMuc2hvcnRTd2lwZXMpcmV0dXJuIHZvaWQgdC5zbGlkZVRvKHQuYWN0aXZlSW5kZXgpO3QubmF2aWdhdGlvbiYmKGgudGFyZ2V0PT09dC5uYXZpZ2F0aW9uLm5leHRFbHx8aC50YXJnZXQ9PT10Lm5hdmlnYXRpb24ucHJldkVsKT9oLnRhcmdldD09PXQubmF2aWdhdGlvbi5uZXh0RWw/dC5zbGlkZVRvKGsrRCk6dC5zbGlkZVRvKGspOihcIm5leHRcIj09PXQuc3dpcGVEaXJlY3Rpb24mJnQuc2xpZGVUbyhrK0QpLFwicHJldlwiPT09dC5zd2lwZURpcmVjdGlvbiYmdC5zbGlkZVRvKGspKX19fWZ1bmN0aW9uIE4oKXt2YXIgZT10aGlzLnBhcmFtcyx0PXRoaXMuZWw7aWYoIXR8fDAhPT10Lm9mZnNldFdpZHRoKXtlLmJyZWFrcG9pbnRzJiZ0aGlzLnNldEJyZWFrcG9pbnQoKTt2YXIgaT10aGlzLmFsbG93U2xpZGVOZXh0LHM9dGhpcy5hbGxvd1NsaWRlUHJldixhPXRoaXMuc25hcEdyaWQ7dGhpcy5hbGxvd1NsaWRlTmV4dD0hMCx0aGlzLmFsbG93U2xpZGVQcmV2PSEwLHRoaXMudXBkYXRlU2l6ZSgpLHRoaXMudXBkYXRlU2xpZGVzKCksdGhpcy51cGRhdGVTbGlkZXNDbGFzc2VzKCksKFwiYXV0b1wiPT09ZS5zbGlkZXNQZXJWaWV3fHxlLnNsaWRlc1BlclZpZXc+MSkmJnRoaXMuaXNFbmQmJiF0aGlzLnBhcmFtcy5jZW50ZXJlZFNsaWRlcz90aGlzLnNsaWRlVG8odGhpcy5zbGlkZXMubGVuZ3RoLTEsMCwhMSwhMCk6dGhpcy5zbGlkZVRvKHRoaXMuYWN0aXZlSW5kZXgsMCwhMSwhMCksdGhpcy5hdXRvcGxheSYmdGhpcy5hdXRvcGxheS5ydW5uaW5nJiZ0aGlzLmF1dG9wbGF5LnBhdXNlZCYmdGhpcy5hdXRvcGxheS5ydW4oKSx0aGlzLmFsbG93U2xpZGVQcmV2PXMsdGhpcy5hbGxvd1NsaWRlTmV4dD1pLHRoaXMucGFyYW1zLndhdGNoT3ZlcmZsb3cmJmEhPT10aGlzLnNuYXBHcmlkJiZ0aGlzLmNoZWNrT3ZlcmZsb3coKX19ZnVuY3Rpb24gWChlKXt0aGlzLmFsbG93Q2xpY2t8fCh0aGlzLnBhcmFtcy5wcmV2ZW50Q2xpY2tzJiZlLnByZXZlbnREZWZhdWx0KCksdGhpcy5wYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uJiZ0aGlzLmFuaW1hdGluZyYmKGUuc3RvcFByb3BhZ2F0aW9uKCksZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSkpfWZ1bmN0aW9uIFYoKXt2YXIgZT10aGlzLndyYXBwZXJFbCx0PXRoaXMucnRsVHJhbnNsYXRlO3RoaXMucHJldmlvdXNUcmFuc2xhdGU9dGhpcy50cmFuc2xhdGUsdGhpcy5pc0hvcml6b250YWwoKT90aGlzLnRyYW5zbGF0ZT10P2Uuc2Nyb2xsV2lkdGgtZS5vZmZzZXRXaWR0aC1lLnNjcm9sbExlZnQ6LWUuc2Nyb2xsTGVmdDp0aGlzLnRyYW5zbGF0ZT0tZS5zY3JvbGxUb3AsLTA9PT10aGlzLnRyYW5zbGF0ZSYmKHRoaXMudHJhbnNsYXRlPTApLHRoaXMudXBkYXRlQWN0aXZlSW5kZXgoKSx0aGlzLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTt2YXIgaT10aGlzLm1heFRyYW5zbGF0ZSgpLXRoaXMubWluVHJhbnNsYXRlKCk7KDA9PT1pPzA6KHRoaXMudHJhbnNsYXRlLXRoaXMubWluVHJhbnNsYXRlKCkpL2kpIT09dGhpcy5wcm9ncmVzcyYmdGhpcy51cGRhdGVQcm9ncmVzcyh0Py10aGlzLnRyYW5zbGF0ZTp0aGlzLnRyYW5zbGF0ZSksdGhpcy5lbWl0KFwic2V0VHJhbnNsYXRlXCIsdGhpcy50cmFuc2xhdGUsITEpfXZhciBZPSExO2Z1bmN0aW9uIEYoKXt9dmFyIFc9e2luaXQ6ITAsZGlyZWN0aW9uOlwiaG9yaXpvbnRhbFwiLHRvdWNoRXZlbnRzVGFyZ2V0OlwiY29udGFpbmVyXCIsaW5pdGlhbFNsaWRlOjAsc3BlZWQ6MzAwLGNzc01vZGU6ITEsdXBkYXRlT25XaW5kb3dSZXNpemU6ITAscHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uOiExLGVkZ2VTd2lwZURldGVjdGlvbjohMSxlZGdlU3dpcGVUaHJlc2hvbGQ6MjAsZnJlZU1vZGU6ITEsZnJlZU1vZGVNb21lbnR1bTohMCxmcmVlTW9kZU1vbWVudHVtUmF0aW86MSxmcmVlTW9kZU1vbWVudHVtQm91bmNlOiEwLGZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbzoxLGZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvOjEsZnJlZU1vZGVTdGlja3k6ITEsZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHk6LjAyLGF1dG9IZWlnaHQ6ITEsc2V0V3JhcHBlclNpemU6ITEsdmlydHVhbFRyYW5zbGF0ZTohMSxlZmZlY3Q6XCJzbGlkZVwiLGJyZWFrcG9pbnRzOnZvaWQgMCxzcGFjZUJldHdlZW46MCxzbGlkZXNQZXJWaWV3OjEsc2xpZGVzUGVyQ29sdW1uOjEsc2xpZGVzUGVyQ29sdW1uRmlsbDpcImNvbHVtblwiLHNsaWRlc1Blckdyb3VwOjEsc2xpZGVzUGVyR3JvdXBTa2lwOjAsY2VudGVyZWRTbGlkZXM6ITEsY2VudGVyZWRTbGlkZXNCb3VuZHM6ITEsc2xpZGVzT2Zmc2V0QmVmb3JlOjAsc2xpZGVzT2Zmc2V0QWZ0ZXI6MCxub3JtYWxpemVTbGlkZUluZGV4OiEwLGNlbnRlckluc3VmZmljaWVudFNsaWRlczohMSx3YXRjaE92ZXJmbG93OiExLHJvdW5kTGVuZ3RoczohMSx0b3VjaFJhdGlvOjEsdG91Y2hBbmdsZTo0NSxzaW11bGF0ZVRvdWNoOiEwLHNob3J0U3dpcGVzOiEwLGxvbmdTd2lwZXM6ITAsbG9uZ1N3aXBlc1JhdGlvOi41LGxvbmdTd2lwZXNNczozMDAsZm9sbG93RmluZ2VyOiEwLGFsbG93VG91Y2hNb3ZlOiEwLHRocmVzaG9sZDowLHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjohMSx0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ6ITAsdG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQ6ITEsdG91Y2hSZWxlYXNlT25FZGdlczohMSx1bmlxdWVOYXZFbGVtZW50czohMCxyZXNpc3RhbmNlOiEwLHJlc2lzdGFuY2VSYXRpbzouODUsd2F0Y2hTbGlkZXNQcm9ncmVzczohMSx3YXRjaFNsaWRlc1Zpc2liaWxpdHk6ITEsZ3JhYkN1cnNvcjohMSxwcmV2ZW50Q2xpY2tzOiEwLHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjohMCxzbGlkZVRvQ2xpY2tlZFNsaWRlOiExLHByZWxvYWRJbWFnZXM6ITAsdXBkYXRlT25JbWFnZXNSZWFkeTohMCxsb29wOiExLGxvb3BBZGRpdGlvbmFsU2xpZGVzOjAsbG9vcGVkU2xpZGVzOm51bGwsbG9vcEZpbGxHcm91cFdpdGhCbGFuazohMSxhbGxvd1NsaWRlUHJldjohMCxhbGxvd1NsaWRlTmV4dDohMCxzd2lwZUhhbmRsZXI6bnVsbCxub1N3aXBpbmc6ITAsbm9Td2lwaW5nQ2xhc3M6XCJzd2lwZXItbm8tc3dpcGluZ1wiLG5vU3dpcGluZ1NlbGVjdG9yOm51bGwscGFzc2l2ZUxpc3RlbmVyczohMCxjb250YWluZXJNb2RpZmllckNsYXNzOlwic3dpcGVyLWNvbnRhaW5lci1cIixzbGlkZUNsYXNzOlwic3dpcGVyLXNsaWRlXCIsc2xpZGVCbGFua0NsYXNzOlwic3dpcGVyLXNsaWRlLWludmlzaWJsZS1ibGFua1wiLHNsaWRlQWN0aXZlQ2xhc3M6XCJzd2lwZXItc2xpZGUtYWN0aXZlXCIsc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzczpcInN3aXBlci1zbGlkZS1kdXBsaWNhdGUtYWN0aXZlXCIsc2xpZGVWaXNpYmxlQ2xhc3M6XCJzd2lwZXItc2xpZGUtdmlzaWJsZVwiLHNsaWRlRHVwbGljYXRlQ2xhc3M6XCJzd2lwZXItc2xpZGUtZHVwbGljYXRlXCIsc2xpZGVOZXh0Q2xhc3M6XCJzd2lwZXItc2xpZGUtbmV4dFwiLHNsaWRlRHVwbGljYXRlTmV4dENsYXNzOlwic3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1uZXh0XCIsc2xpZGVQcmV2Q2xhc3M6XCJzd2lwZXItc2xpZGUtcHJldlwiLHNsaWRlRHVwbGljYXRlUHJldkNsYXNzOlwic3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1wcmV2XCIsd3JhcHBlckNsYXNzOlwic3dpcGVyLXdyYXBwZXJcIixydW5DYWxsYmFja3NPbkluaXQ6ITB9LFI9e3VwZGF0ZTp1LHRyYW5zbGF0ZTp2LHRyYW5zaXRpb246ZixzbGlkZTptLGxvb3A6ZyxncmFiQ3Vyc29yOmIsbWFuaXB1bGF0aW9uOkQsZXZlbnRzOnthdHRhY2hFdmVudHM6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnBhcmFtcyx0PXRoaXMudG91Y2hFdmVudHMscz10aGlzLmVsLGE9dGhpcy53cmFwcGVyRWw7dGhpcy5vblRvdWNoU3RhcnQ9Ry5iaW5kKHRoaXMpLHRoaXMub25Ub3VjaE1vdmU9SC5iaW5kKHRoaXMpLHRoaXMub25Ub3VjaEVuZD1CLmJpbmQodGhpcyksZS5jc3NNb2RlJiYodGhpcy5vblNjcm9sbD1WLmJpbmQodGhpcykpLHRoaXMub25DbGljaz1YLmJpbmQodGhpcyk7dmFyIHI9ISFlLm5lc3RlZDtpZighaC50b3VjaCYmaC5wb2ludGVyRXZlbnRzKXMuYWRkRXZlbnRMaXN0ZW5lcih0LnN0YXJ0LHRoaXMub25Ub3VjaFN0YXJ0LCExKSxpLmFkZEV2ZW50TGlzdGVuZXIodC5tb3ZlLHRoaXMub25Ub3VjaE1vdmUsciksaS5hZGRFdmVudExpc3RlbmVyKHQuZW5kLHRoaXMub25Ub3VjaEVuZCwhMSk7ZWxzZXtpZihoLnRvdWNoKXt2YXIgbj0hKFwidG91Y2hzdGFydFwiIT09dC5zdGFydHx8IWgucGFzc2l2ZUxpc3RlbmVyfHwhZS5wYXNzaXZlTGlzdGVuZXJzKSYme3Bhc3NpdmU6ITAsY2FwdHVyZTohMX07cy5hZGRFdmVudExpc3RlbmVyKHQuc3RhcnQsdGhpcy5vblRvdWNoU3RhcnQsbikscy5hZGRFdmVudExpc3RlbmVyKHQubW92ZSx0aGlzLm9uVG91Y2hNb3ZlLGgucGFzc2l2ZUxpc3RlbmVyP3twYXNzaXZlOiExLGNhcHR1cmU6cn06cikscy5hZGRFdmVudExpc3RlbmVyKHQuZW5kLHRoaXMub25Ub3VjaEVuZCxuKSx0LmNhbmNlbCYmcy5hZGRFdmVudExpc3RlbmVyKHQuY2FuY2VsLHRoaXMub25Ub3VjaEVuZCxuKSxZfHwoaS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLEYpLFk9ITApfShlLnNpbXVsYXRlVG91Y2gmJiFBLmlvcyYmIUEuYW5kcm9pZHx8ZS5zaW11bGF0ZVRvdWNoJiYhaC50b3VjaCYmQS5pb3MpJiYocy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsdGhpcy5vblRvdWNoU3RhcnQsITEpLGkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMub25Ub3VjaE1vdmUsciksaS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMub25Ub3VjaEVuZCwhMSkpfShlLnByZXZlbnRDbGlja3N8fGUucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uKSYmcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9uQ2xpY2ssITApLGUuY3NzTW9kZSYmYS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbCksZS51cGRhdGVPbldpbmRvd1Jlc2l6ZT90aGlzLm9uKEEuaW9zfHxBLmFuZHJvaWQ/XCJyZXNpemUgb3JpZW50YXRpb25jaGFuZ2Ugb2JzZXJ2ZXJVcGRhdGVcIjpcInJlc2l6ZSBvYnNlcnZlclVwZGF0ZVwiLE4sITApOnRoaXMub24oXCJvYnNlcnZlclVwZGF0ZVwiLE4sITApfSxkZXRhY2hFdmVudHM6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnBhcmFtcyx0PXRoaXMudG91Y2hFdmVudHMscz10aGlzLmVsLGE9dGhpcy53cmFwcGVyRWwscj0hIWUubmVzdGVkO2lmKCFoLnRvdWNoJiZoLnBvaW50ZXJFdmVudHMpcy5yZW1vdmVFdmVudExpc3RlbmVyKHQuc3RhcnQsdGhpcy5vblRvdWNoU3RhcnQsITEpLGkucmVtb3ZlRXZlbnRMaXN0ZW5lcih0Lm1vdmUsdGhpcy5vblRvdWNoTW92ZSxyKSxpLnJlbW92ZUV2ZW50TGlzdGVuZXIodC5lbmQsdGhpcy5vblRvdWNoRW5kLCExKTtlbHNle2lmKGgudG91Y2gpe3ZhciBuPSEoXCJvblRvdWNoU3RhcnRcIiE9PXQuc3RhcnR8fCFoLnBhc3NpdmVMaXN0ZW5lcnx8IWUucGFzc2l2ZUxpc3RlbmVycykmJntwYXNzaXZlOiEwLGNhcHR1cmU6ITF9O3MucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LnN0YXJ0LHRoaXMub25Ub3VjaFN0YXJ0LG4pLHMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0Lm1vdmUsdGhpcy5vblRvdWNoTW92ZSxyKSxzLnJlbW92ZUV2ZW50TGlzdGVuZXIodC5lbmQsdGhpcy5vblRvdWNoRW5kLG4pLHQuY2FuY2VsJiZzLnJlbW92ZUV2ZW50TGlzdGVuZXIodC5jYW5jZWwsdGhpcy5vblRvdWNoRW5kLG4pfShlLnNpbXVsYXRlVG91Y2gmJiFBLmlvcyYmIUEuYW5kcm9pZHx8ZS5zaW11bGF0ZVRvdWNoJiYhaC50b3VjaCYmQS5pb3MpJiYocy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsdGhpcy5vblRvdWNoU3RhcnQsITEpLGkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMub25Ub3VjaE1vdmUsciksaS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMub25Ub3VjaEVuZCwhMSkpfShlLnByZXZlbnRDbGlja3N8fGUucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uKSYmcy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9uQ2xpY2ssITApLGUuY3NzTW9kZSYmYS5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbCksdGhpcy5vZmYoQS5pb3N8fEEuYW5kcm9pZD9cInJlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZSBvYnNlcnZlclVwZGF0ZVwiOlwicmVzaXplIG9ic2VydmVyVXBkYXRlXCIsTil9fSxicmVha3BvaW50czp7c2V0QnJlYWtwb2ludDpmdW5jdGlvbigpe3ZhciBlPXRoaXMuYWN0aXZlSW5kZXgsdD10aGlzLmluaXRpYWxpemVkLGk9dGhpcy5sb29wZWRTbGlkZXM7dm9pZCAwPT09aSYmKGk9MCk7dmFyIHM9dGhpcy5wYXJhbXMsYT10aGlzLiRlbCxyPXMuYnJlYWtwb2ludHM7aWYociYmKCFyfHwwIT09T2JqZWN0LmtleXMocikubGVuZ3RoKSl7dmFyIG49dGhpcy5nZXRCcmVha3BvaW50KHIpO2lmKG4mJnRoaXMuY3VycmVudEJyZWFrcG9pbnQhPT1uKXt2YXIgbz1uIGluIHI/cltuXTp2b2lkIDA7byYmW1wic2xpZGVzUGVyVmlld1wiLFwic3BhY2VCZXR3ZWVuXCIsXCJzbGlkZXNQZXJHcm91cFwiLFwic2xpZGVzUGVyR3JvdXBTa2lwXCIsXCJzbGlkZXNQZXJDb2x1bW5cIl0uZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIHQ9b1tlXTt2b2lkIDAhPT10JiYob1tlXT1cInNsaWRlc1BlclZpZXdcIiE9PWV8fFwiQVVUT1wiIT09dCYmXCJhdXRvXCIhPT10P1wic2xpZGVzUGVyVmlld1wiPT09ZT9wYXJzZUZsb2F0KHQpOnBhcnNlSW50KHQsMTApOlwiYXV0b1wiKX0pKTt2YXIgbD1vfHx0aGlzLm9yaWdpbmFsUGFyYW1zLGg9cy5zbGlkZXNQZXJDb2x1bW4+MSxwPWwuc2xpZGVzUGVyQ29sdW1uPjE7aCYmIXA/YS5yZW1vdmVDbGFzcyhzLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MrXCJtdWx0aXJvdyBcIitzLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MrXCJtdWx0aXJvdy1jb2x1bW5cIik6IWgmJnAmJihhLmFkZENsYXNzKHMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcIm11bHRpcm93XCIpLFwiY29sdW1uXCI9PT1sLnNsaWRlc1BlckNvbHVtbkZpbGwmJmEuYWRkQ2xhc3Mocy5jb250YWluZXJNb2RpZmllckNsYXNzK1wibXVsdGlyb3ctY29sdW1uXCIpKTt2YXIgYz1sLmRpcmVjdGlvbiYmbC5kaXJlY3Rpb24hPT1zLmRpcmVjdGlvbix1PXMubG9vcCYmKGwuc2xpZGVzUGVyVmlldyE9PXMuc2xpZGVzUGVyVmlld3x8Yyk7YyYmdCYmdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKSxkLmV4dGVuZCh0aGlzLnBhcmFtcyxsKSxkLmV4dGVuZCh0aGlzLHthbGxvd1RvdWNoTW92ZTp0aGlzLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSxhbGxvd1NsaWRlTmV4dDp0aGlzLnBhcmFtcy5hbGxvd1NsaWRlTmV4dCxhbGxvd1NsaWRlUHJldjp0aGlzLnBhcmFtcy5hbGxvd1NsaWRlUHJldn0pLHRoaXMuY3VycmVudEJyZWFrcG9pbnQ9bix1JiZ0JiYodGhpcy5sb29wRGVzdHJveSgpLHRoaXMubG9vcENyZWF0ZSgpLHRoaXMudXBkYXRlU2xpZGVzKCksdGhpcy5zbGlkZVRvKGUtaSt0aGlzLmxvb3BlZFNsaWRlcywwLCExKSksdGhpcy5lbWl0KFwiYnJlYWtwb2ludFwiLGwpfX19LGdldEJyZWFrcG9pbnQ6ZnVuY3Rpb24oZSl7aWYoZSl7dmFyIHQ9ITEsaT1PYmplY3Qua2V5cyhlKS5tYXAoKGZ1bmN0aW9uKGUpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlJiYwPT09ZS5pbmRleE9mKFwiQFwiKSl7dmFyIHQ9cGFyc2VGbG9hdChlLnN1YnN0cigxKSk7cmV0dXJue3ZhbHVlOmEuaW5uZXJIZWlnaHQqdCxwb2ludDplfX1yZXR1cm57dmFsdWU6ZSxwb2ludDplfX0pKTtpLnNvcnQoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHBhcnNlSW50KGUudmFsdWUsMTApLXBhcnNlSW50KHQudmFsdWUsMTApfSkpO2Zvcih2YXIgcz0wO3M8aS5sZW5ndGg7cys9MSl7dmFyIHI9aVtzXSxuPXIucG9pbnQ7ci52YWx1ZTw9YS5pbm5lcldpZHRoJiYodD1uKX1yZXR1cm4gdHx8XCJtYXhcIn19fSxjaGVja092ZXJmbG93OntjaGVja092ZXJmbG93OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wYXJhbXMsdD10aGlzLmlzTG9ja2VkLGk9dGhpcy5zbGlkZXMubGVuZ3RoPjAmJmUuc2xpZGVzT2Zmc2V0QmVmb3JlK2Uuc3BhY2VCZXR3ZWVuKih0aGlzLnNsaWRlcy5sZW5ndGgtMSkrdGhpcy5zbGlkZXNbMF0ub2Zmc2V0V2lkdGgqdGhpcy5zbGlkZXMubGVuZ3RoO2Uuc2xpZGVzT2Zmc2V0QmVmb3JlJiZlLnNsaWRlc09mZnNldEFmdGVyJiZpP3RoaXMuaXNMb2NrZWQ9aTw9dGhpcy5zaXplOnRoaXMuaXNMb2NrZWQ9MT09PXRoaXMuc25hcEdyaWQubGVuZ3RoLHRoaXMuYWxsb3dTbGlkZU5leHQ9IXRoaXMuaXNMb2NrZWQsdGhpcy5hbGxvd1NsaWRlUHJldj0hdGhpcy5pc0xvY2tlZCx0IT09dGhpcy5pc0xvY2tlZCYmdGhpcy5lbWl0KHRoaXMuaXNMb2NrZWQ/XCJsb2NrXCI6XCJ1bmxvY2tcIiksdCYmdCE9PXRoaXMuaXNMb2NrZWQmJih0aGlzLmlzRW5kPSExLHRoaXMubmF2aWdhdGlvbi51cGRhdGUoKSl9fSxjbGFzc2VzOnthZGRDbGFzc2VzOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5jbGFzc05hbWVzLHQ9dGhpcy5wYXJhbXMsaT10aGlzLnJ0bCxzPXRoaXMuJGVsLGE9W107YS5wdXNoKFwiaW5pdGlhbGl6ZWRcIiksYS5wdXNoKHQuZGlyZWN0aW9uKSx0LmZyZWVNb2RlJiZhLnB1c2goXCJmcmVlLW1vZGVcIiksdC5hdXRvSGVpZ2h0JiZhLnB1c2goXCJhdXRvaGVpZ2h0XCIpLGkmJmEucHVzaChcInJ0bFwiKSx0LnNsaWRlc1BlckNvbHVtbj4xJiYoYS5wdXNoKFwibXVsdGlyb3dcIiksXCJjb2x1bW5cIj09PXQuc2xpZGVzUGVyQ29sdW1uRmlsbCYmYS5wdXNoKFwibXVsdGlyb3ctY29sdW1uXCIpKSxBLmFuZHJvaWQmJmEucHVzaChcImFuZHJvaWRcIiksQS5pb3MmJmEucHVzaChcImlvc1wiKSx0LmNzc01vZGUmJmEucHVzaChcImNzcy1tb2RlXCIpLGEuZm9yRWFjaCgoZnVuY3Rpb24oaSl7ZS5wdXNoKHQuY29udGFpbmVyTW9kaWZpZXJDbGFzcytpKX0pKSxzLmFkZENsYXNzKGUuam9pbihcIiBcIikpfSxyZW1vdmVDbGFzc2VzOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy4kZWwsdD10aGlzLmNsYXNzTmFtZXM7ZS5yZW1vdmVDbGFzcyh0LmpvaW4oXCIgXCIpKX19LGltYWdlczp7bG9hZEltYWdlOmZ1bmN0aW9uKGUsdCxpLHMscixvKXt2YXIgbDtmdW5jdGlvbiBkKCl7byYmbygpfW4oZSkucGFyZW50KFwicGljdHVyZVwiKVswXXx8ZS5jb21wbGV0ZSYmcj9kKCk6dD8oKGw9bmV3IGEuSW1hZ2UpLm9ubG9hZD1kLGwub25lcnJvcj1kLHMmJihsLnNpemVzPXMpLGkmJihsLnNyY3NldD1pKSx0JiYobC5zcmM9dCkpOmQoKX0scHJlbG9hZEltYWdlczpmdW5jdGlvbigpe3ZhciBlPXRoaXM7ZnVuY3Rpb24gdCgpe251bGwhPWUmJmUmJiFlLmRlc3Ryb3llZCYmKHZvaWQgMCE9PWUuaW1hZ2VzTG9hZGVkJiYoZS5pbWFnZXNMb2FkZWQrPTEpLGUuaW1hZ2VzTG9hZGVkPT09ZS5pbWFnZXNUb0xvYWQubGVuZ3RoJiYoZS5wYXJhbXMudXBkYXRlT25JbWFnZXNSZWFkeSYmZS51cGRhdGUoKSxlLmVtaXQoXCJpbWFnZXNSZWFkeVwiKSkpfWUuaW1hZ2VzVG9Mb2FkPWUuJGVsLmZpbmQoXCJpbWdcIik7Zm9yKHZhciBpPTA7aTxlLmltYWdlc1RvTG9hZC5sZW5ndGg7aSs9MSl7dmFyIHM9ZS5pbWFnZXNUb0xvYWRbaV07ZS5sb2FkSW1hZ2UocyxzLmN1cnJlbnRTcmN8fHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpLHMuc3Jjc2V0fHxzLmdldEF0dHJpYnV0ZShcInNyY3NldFwiKSxzLnNpemVzfHxzLmdldEF0dHJpYnV0ZShcInNpemVzXCIpLCEwLHQpfX19fSxxPXt9LGo9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdCgpe2Zvcih2YXIgaSxzLGEscj1bXSxvPWFyZ3VtZW50cy5sZW5ndGg7by0tOylyW29dPWFyZ3VtZW50c1tvXTsxPT09ci5sZW5ndGgmJnJbMF0uY29uc3RydWN0b3ImJnJbMF0uY29uc3RydWN0b3I9PT1PYmplY3Q/YT1yWzBdOihzPShpPXIpWzBdLGE9aVsxXSksYXx8KGE9e30pLGE9ZC5leHRlbmQoe30sYSkscyYmIWEuZWwmJihhLmVsPXMpLGUuY2FsbCh0aGlzLGEpLE9iamVjdC5rZXlzKFIpLmZvckVhY2goKGZ1bmN0aW9uKGUpe09iamVjdC5rZXlzKFJbZV0pLmZvckVhY2goKGZ1bmN0aW9uKGkpe3QucHJvdG90eXBlW2ldfHwodC5wcm90b3R5cGVbaV09UltlXVtpXSl9KSl9KSk7dmFyIGw9dGhpczt2b2lkIDA9PT1sLm1vZHVsZXMmJihsLm1vZHVsZXM9e30pLE9iamVjdC5rZXlzKGwubW9kdWxlcykuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIHQ9bC5tb2R1bGVzW2VdO2lmKHQucGFyYW1zKXt2YXIgaT1PYmplY3Qua2V5cyh0LnBhcmFtcylbMF0scz10LnBhcmFtc1tpXTtpZihcIm9iamVjdFwiIT10eXBlb2Ygc3x8bnVsbD09PXMpcmV0dXJuO2lmKCEoaSBpbiBhKXx8IShcImVuYWJsZWRcImluIHMpKXJldHVybjshMD09PWFbaV0mJihhW2ldPXtlbmFibGVkOiEwfSksXCJvYmplY3RcIiE9dHlwZW9mIGFbaV18fFwiZW5hYmxlZFwiaW4gYVtpXXx8KGFbaV0uZW5hYmxlZD0hMCksYVtpXXx8KGFbaV09e2VuYWJsZWQ6ITF9KX19KSk7dmFyIHA9ZC5leHRlbmQoe30sVyk7bC51c2VNb2R1bGVzUGFyYW1zKHApLGwucGFyYW1zPWQuZXh0ZW5kKHt9LHAscSxhKSxsLm9yaWdpbmFsUGFyYW1zPWQuZXh0ZW5kKHt9LGwucGFyYW1zKSxsLnBhc3NlZFBhcmFtcz1kLmV4dGVuZCh7fSxhKSxsLiQ9bjt2YXIgYz1uKGwucGFyYW1zLmVsKTtpZihzPWNbMF0pe2lmKGMubGVuZ3RoPjEpe3ZhciB1PVtdO3JldHVybiBjLmVhY2goKGZ1bmN0aW9uKGUsaSl7dmFyIHM9ZC5leHRlbmQoe30sYSx7ZWw6aX0pO3UucHVzaChuZXcgdChzKSl9KSksdX12YXIgdixmLG07cmV0dXJuIHMuc3dpcGVyPWwsYy5kYXRhKFwic3dpcGVyXCIsbCkscyYmcy5zaGFkb3dSb290JiZzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcj8odj1uKHMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLlwiK2wucGFyYW1zLndyYXBwZXJDbGFzcykpKS5jaGlsZHJlbj1mdW5jdGlvbihlKXtyZXR1cm4gYy5jaGlsZHJlbihlKX06dj1jLmNoaWxkcmVuKFwiLlwiK2wucGFyYW1zLndyYXBwZXJDbGFzcyksZC5leHRlbmQobCx7JGVsOmMsZWw6cywkd3JhcHBlckVsOnYsd3JhcHBlckVsOnZbMF0sY2xhc3NOYW1lczpbXSxzbGlkZXM6bigpLHNsaWRlc0dyaWQ6W10sc25hcEdyaWQ6W10sc2xpZGVzU2l6ZXNHcmlkOltdLGlzSG9yaXpvbnRhbDpmdW5jdGlvbigpe3JldHVyblwiaG9yaXpvbnRhbFwiPT09bC5wYXJhbXMuZGlyZWN0aW9ufSxpc1ZlcnRpY2FsOmZ1bmN0aW9uKCl7cmV0dXJuXCJ2ZXJ0aWNhbFwiPT09bC5wYXJhbXMuZGlyZWN0aW9ufSxydGw6XCJydGxcIj09PXMuZGlyLnRvTG93ZXJDYXNlKCl8fFwicnRsXCI9PT1jLmNzcyhcImRpcmVjdGlvblwiKSxydGxUcmFuc2xhdGU6XCJob3Jpem9udGFsXCI9PT1sLnBhcmFtcy5kaXJlY3Rpb24mJihcInJ0bFwiPT09cy5kaXIudG9Mb3dlckNhc2UoKXx8XCJydGxcIj09PWMuY3NzKFwiZGlyZWN0aW9uXCIpKSx3cm9uZ1JUTDpcIi13ZWJraXQtYm94XCI9PT12LmNzcyhcImRpc3BsYXlcIiksYWN0aXZlSW5kZXg6MCxyZWFsSW5kZXg6MCxpc0JlZ2lubmluZzohMCxpc0VuZDohMSx0cmFuc2xhdGU6MCxwcmV2aW91c1RyYW5zbGF0ZTowLHByb2dyZXNzOjAsdmVsb2NpdHk6MCxhbmltYXRpbmc6ITEsYWxsb3dTbGlkZU5leHQ6bC5wYXJhbXMuYWxsb3dTbGlkZU5leHQsYWxsb3dTbGlkZVByZXY6bC5wYXJhbXMuYWxsb3dTbGlkZVByZXYsdG91Y2hFdmVudHM6KGY9W1widG91Y2hzdGFydFwiLFwidG91Y2htb3ZlXCIsXCJ0b3VjaGVuZFwiLFwidG91Y2hjYW5jZWxcIl0sbT1bXCJtb3VzZWRvd25cIixcIm1vdXNlbW92ZVwiLFwibW91c2V1cFwiXSxoLnBvaW50ZXJFdmVudHMmJihtPVtcInBvaW50ZXJkb3duXCIsXCJwb2ludGVybW92ZVwiLFwicG9pbnRlcnVwXCJdKSxsLnRvdWNoRXZlbnRzVG91Y2g9e3N0YXJ0OmZbMF0sbW92ZTpmWzFdLGVuZDpmWzJdLGNhbmNlbDpmWzNdfSxsLnRvdWNoRXZlbnRzRGVza3RvcD17c3RhcnQ6bVswXSxtb3ZlOm1bMV0sZW5kOm1bMl19LGgudG91Y2h8fCFsLnBhcmFtcy5zaW11bGF0ZVRvdWNoP2wudG91Y2hFdmVudHNUb3VjaDpsLnRvdWNoRXZlbnRzRGVza3RvcCksdG91Y2hFdmVudHNEYXRhOntpc1RvdWNoZWQ6dm9pZCAwLGlzTW92ZWQ6dm9pZCAwLGFsbG93VG91Y2hDYWxsYmFja3M6dm9pZCAwLHRvdWNoU3RhcnRUaW1lOnZvaWQgMCxpc1Njcm9sbGluZzp2b2lkIDAsY3VycmVudFRyYW5zbGF0ZTp2b2lkIDAsc3RhcnRUcmFuc2xhdGU6dm9pZCAwLGFsbG93VGhyZXNob2xkTW92ZTp2b2lkIDAsZm9ybUVsZW1lbnRzOlwiaW5wdXQsIHNlbGVjdCwgb3B0aW9uLCB0ZXh0YXJlYSwgYnV0dG9uLCB2aWRlbywgbGFiZWxcIixsYXN0Q2xpY2tUaW1lOmQubm93KCksY2xpY2tUaW1lb3V0OnZvaWQgMCx2ZWxvY2l0aWVzOltdLGFsbG93TW9tZW50dW1Cb3VuY2U6dm9pZCAwLGlzVG91Y2hFdmVudDp2b2lkIDAsc3RhcnRNb3Zpbmc6dm9pZCAwfSxhbGxvd0NsaWNrOiEwLGFsbG93VG91Y2hNb3ZlOmwucGFyYW1zLmFsbG93VG91Y2hNb3ZlLHRvdWNoZXM6e3N0YXJ0WDowLHN0YXJ0WTowLGN1cnJlbnRYOjAsY3VycmVudFk6MCxkaWZmOjB9LGltYWdlc1RvTG9hZDpbXSxpbWFnZXNMb2FkZWQ6MH0pLGwudXNlTW9kdWxlcygpLGwucGFyYW1zLmluaXQmJmwuaW5pdCgpLGx9fWUmJih0Ll9fcHJvdG9fXz1lKSx0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGUmJmUucHJvdG90eXBlKSx0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj10O3ZhciBpPXtleHRlbmRlZERlZmF1bHRzOntjb25maWd1cmFibGU6ITB9LGRlZmF1bHRzOntjb25maWd1cmFibGU6ITB9LENsYXNzOntjb25maWd1cmFibGU6ITB9LCQ6e2NvbmZpZ3VyYWJsZTohMH19O3JldHVybiB0LnByb3RvdHlwZS5zbGlkZXNQZXJWaWV3RHluYW1pYz1mdW5jdGlvbigpe3ZhciBlPXRoaXMucGFyYW1zLHQ9dGhpcy5zbGlkZXMsaT10aGlzLnNsaWRlc0dyaWQscz10aGlzLnNpemUsYT10aGlzLmFjdGl2ZUluZGV4LHI9MTtpZihlLmNlbnRlcmVkU2xpZGVzKXtmb3IodmFyIG4sbz10W2FdLnN3aXBlclNsaWRlU2l6ZSxsPWErMTtsPHQubGVuZ3RoO2wrPTEpdFtsXSYmIW4mJihyKz0xLChvKz10W2xdLnN3aXBlclNsaWRlU2l6ZSk+cyYmKG49ITApKTtmb3IodmFyIGQ9YS0xO2Q+PTA7ZC09MSl0W2RdJiYhbiYmKHIrPTEsKG8rPXRbZF0uc3dpcGVyU2xpZGVTaXplKT5zJiYobj0hMCkpfWVsc2UgZm9yKHZhciBoPWErMTtoPHQubGVuZ3RoO2grPTEpaVtoXS1pW2FdPHMmJihyKz0xKTtyZXR1cm4gcn0sdC5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZihlJiYhZS5kZXN0cm95ZWQpe3ZhciB0PWUuc25hcEdyaWQsaT1lLnBhcmFtcztpLmJyZWFrcG9pbnRzJiZlLnNldEJyZWFrcG9pbnQoKSxlLnVwZGF0ZVNpemUoKSxlLnVwZGF0ZVNsaWRlcygpLGUudXBkYXRlUHJvZ3Jlc3MoKSxlLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKSxlLnBhcmFtcy5mcmVlTW9kZT8ocygpLGUucGFyYW1zLmF1dG9IZWlnaHQmJmUudXBkYXRlQXV0b0hlaWdodCgpKTooKFwiYXV0b1wiPT09ZS5wYXJhbXMuc2xpZGVzUGVyVmlld3x8ZS5wYXJhbXMuc2xpZGVzUGVyVmlldz4xKSYmZS5pc0VuZCYmIWUucGFyYW1zLmNlbnRlcmVkU2xpZGVzP2Uuc2xpZGVUbyhlLnNsaWRlcy5sZW5ndGgtMSwwLCExLCEwKTplLnNsaWRlVG8oZS5hY3RpdmVJbmRleCwwLCExLCEwKSl8fHMoKSxpLndhdGNoT3ZlcmZsb3cmJnQhPT1lLnNuYXBHcmlkJiZlLmNoZWNrT3ZlcmZsb3coKSxlLmVtaXQoXCJ1cGRhdGVcIil9ZnVuY3Rpb24gcygpe3ZhciB0PWUucnRsVHJhbnNsYXRlPy0xKmUudHJhbnNsYXRlOmUudHJhbnNsYXRlLGk9TWF0aC5taW4oTWF0aC5tYXgodCxlLm1heFRyYW5zbGF0ZSgpKSxlLm1pblRyYW5zbGF0ZSgpKTtlLnNldFRyYW5zbGF0ZShpKSxlLnVwZGF0ZUFjdGl2ZUluZGV4KCksZS51cGRhdGVTbGlkZXNDbGFzc2VzKCl9fSx0LnByb3RvdHlwZS5jaGFuZ2VEaXJlY3Rpb249ZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT10JiYodD0hMCk7dmFyIGk9dGhpcy5wYXJhbXMuZGlyZWN0aW9uO3JldHVybiBlfHwoZT1cImhvcml6b250YWxcIj09PWk/XCJ2ZXJ0aWNhbFwiOlwiaG9yaXpvbnRhbFwiKSxlPT09aXx8XCJob3Jpem9udGFsXCIhPT1lJiZcInZlcnRpY2FsXCIhPT1lfHwodGhpcy4kZWwucmVtb3ZlQ2xhc3MoXCJcIit0aGlzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzK2kpLmFkZENsYXNzKFwiXCIrdGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytlKSx0aGlzLnBhcmFtcy5kaXJlY3Rpb249ZSx0aGlzLnNsaWRlcy5lYWNoKChmdW5jdGlvbih0LGkpe1widmVydGljYWxcIj09PWU/aS5zdHlsZS53aWR0aD1cIlwiOmkuc3R5bGUuaGVpZ2h0PVwiXCJ9KSksdGhpcy5lbWl0KFwiY2hhbmdlRGlyZWN0aW9uXCIpLHQmJnRoaXMudXBkYXRlKCkpLHRoaXN9LHQucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt0aGlzLmluaXRpYWxpemVkfHwodGhpcy5lbWl0KFwiYmVmb3JlSW5pdFwiKSx0aGlzLnBhcmFtcy5icmVha3BvaW50cyYmdGhpcy5zZXRCcmVha3BvaW50KCksdGhpcy5hZGRDbGFzc2VzKCksdGhpcy5wYXJhbXMubG9vcCYmdGhpcy5sb29wQ3JlYXRlKCksdGhpcy51cGRhdGVTaXplKCksdGhpcy51cGRhdGVTbGlkZXMoKSx0aGlzLnBhcmFtcy53YXRjaE92ZXJmbG93JiZ0aGlzLmNoZWNrT3ZlcmZsb3coKSx0aGlzLnBhcmFtcy5ncmFiQ3Vyc29yJiZ0aGlzLnNldEdyYWJDdXJzb3IoKSx0aGlzLnBhcmFtcy5wcmVsb2FkSW1hZ2VzJiZ0aGlzLnByZWxvYWRJbWFnZXMoKSx0aGlzLnBhcmFtcy5sb29wP3RoaXMuc2xpZGVUbyh0aGlzLnBhcmFtcy5pbml0aWFsU2xpZGUrdGhpcy5sb29wZWRTbGlkZXMsMCx0aGlzLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpOnRoaXMuc2xpZGVUbyh0aGlzLnBhcmFtcy5pbml0aWFsU2xpZGUsMCx0aGlzLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpLHRoaXMuYXR0YWNoRXZlbnRzKCksdGhpcy5pbml0aWFsaXplZD0hMCx0aGlzLmVtaXQoXCJpbml0XCIpKX0sdC5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbihlLHQpe3ZvaWQgMD09PWUmJihlPSEwKSx2b2lkIDA9PT10JiYodD0hMCk7dmFyIGk9dGhpcyxzPWkucGFyYW1zLGE9aS4kZWwscj1pLiR3cmFwcGVyRWwsbj1pLnNsaWRlcztyZXR1cm4gdm9pZCAwPT09aS5wYXJhbXN8fGkuZGVzdHJveWVkfHwoaS5lbWl0KFwiYmVmb3JlRGVzdHJveVwiKSxpLmluaXRpYWxpemVkPSExLGkuZGV0YWNoRXZlbnRzKCkscy5sb29wJiZpLmxvb3BEZXN0cm95KCksdCYmKGkucmVtb3ZlQ2xhc3NlcygpLGEucmVtb3ZlQXR0cihcInN0eWxlXCIpLHIucmVtb3ZlQXR0cihcInN0eWxlXCIpLG4mJm4ubGVuZ3RoJiZuLnJlbW92ZUNsYXNzKFtzLnNsaWRlVmlzaWJsZUNsYXNzLHMuc2xpZGVBY3RpdmVDbGFzcyxzLnNsaWRlTmV4dENsYXNzLHMuc2xpZGVQcmV2Q2xhc3NdLmpvaW4oXCIgXCIpKS5yZW1vdmVBdHRyKFwic3R5bGVcIikucmVtb3ZlQXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpKSxpLmVtaXQoXCJkZXN0cm95XCIpLE9iamVjdC5rZXlzKGkuZXZlbnRzTGlzdGVuZXJzKS5mb3JFYWNoKChmdW5jdGlvbihlKXtpLm9mZihlKX0pKSwhMSE9PWUmJihpLiRlbFswXS5zd2lwZXI9bnVsbCxpLiRlbC5kYXRhKFwic3dpcGVyXCIsbnVsbCksZC5kZWxldGVQcm9wcyhpKSksaS5kZXN0cm95ZWQ9ITApLG51bGx9LHQuZXh0ZW5kRGVmYXVsdHM9ZnVuY3Rpb24oZSl7ZC5leHRlbmQocSxlKX0saS5leHRlbmRlZERlZmF1bHRzLmdldD1mdW5jdGlvbigpe3JldHVybiBxfSxpLmRlZmF1bHRzLmdldD1mdW5jdGlvbigpe3JldHVybiBXfSxpLkNsYXNzLmdldD1mdW5jdGlvbigpe3JldHVybiBlfSxpLiQuZ2V0PWZ1bmN0aW9uKCl7cmV0dXJuIG59LE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHQsaSksdH0ocCksSz17bmFtZTpcImRldmljZVwiLHByb3RvOntkZXZpY2U6QX0sc3RhdGljOntkZXZpY2U6QX19LFU9e25hbWU6XCJzdXBwb3J0XCIscHJvdG86e3N1cHBvcnQ6aH0sc3RhdGljOntzdXBwb3J0Omh9fSxfPXtpc0VkZ2U6ISFhLm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2UvZyksaXNTYWZhcmk6ZnVuY3Rpb24oKXt2YXIgZT1hLm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtyZXR1cm4gZS5pbmRleE9mKFwic2FmYXJpXCIpPj0wJiZlLmluZGV4T2YoXCJjaHJvbWVcIik8MCYmZS5pbmRleE9mKFwiYW5kcm9pZFwiKTwwfSgpLGlzVWlXZWJWaWV3Oi8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0KD8hLipTYWZhcmkpL2kudGVzdChhLm5hdmlnYXRvci51c2VyQWdlbnQpfSxaPXtuYW1lOlwiYnJvd3NlclwiLHByb3RvOnticm93c2VyOl99LHN0YXRpYzp7YnJvd3NlcjpffX0sUT17bmFtZTpcInJlc2l6ZVwiLGNyZWF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7ZC5leHRlbmQoZSx7cmVzaXplOntyZXNpemVIYW5kbGVyOmZ1bmN0aW9uKCl7ZSYmIWUuZGVzdHJveWVkJiZlLmluaXRpYWxpemVkJiYoZS5lbWl0KFwiYmVmb3JlUmVzaXplXCIpLGUuZW1pdChcInJlc2l6ZVwiKSl9LG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcjpmdW5jdGlvbigpe2UmJiFlLmRlc3Ryb3llZCYmZS5pbml0aWFsaXplZCYmZS5lbWl0KFwib3JpZW50YXRpb25jaGFuZ2VcIil9fX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe2EuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMucmVzaXplLnJlc2l6ZUhhbmRsZXIpLGEuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsdGhpcy5yZXNpemUub3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKX0sZGVzdHJveTpmdW5jdGlvbigpe2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMucmVzaXplLnJlc2l6ZUhhbmRsZXIpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsdGhpcy5yZXNpemUub3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKX19fSxKPXtmdW5jOmEuTXV0YXRpb25PYnNlcnZlcnx8YS5XZWJraXRNdXRhdGlvbk9ic2VydmVyLGF0dGFjaDpmdW5jdGlvbihlLHQpe3ZvaWQgMD09PXQmJih0PXt9KTt2YXIgaT10aGlzLHM9bmV3KDAsSi5mdW5jKSgoZnVuY3Rpb24oZSl7aWYoMSE9PWUubGVuZ3RoKXt2YXIgdD1mdW5jdGlvbigpe2kuZW1pdChcIm9ic2VydmVyVXBkYXRlXCIsZVswXSl9O2EucmVxdWVzdEFuaW1hdGlvbkZyYW1lP2EucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHQpOmEuc2V0VGltZW91dCh0LDApfWVsc2UgaS5lbWl0KFwib2JzZXJ2ZXJVcGRhdGVcIixlWzBdKX0pKTtzLm9ic2VydmUoZSx7YXR0cmlidXRlczp2b2lkIDA9PT10LmF0dHJpYnV0ZXN8fHQuYXR0cmlidXRlcyxjaGlsZExpc3Q6dm9pZCAwPT09dC5jaGlsZExpc3R8fHQuY2hpbGRMaXN0LGNoYXJhY3RlckRhdGE6dm9pZCAwPT09dC5jaGFyYWN0ZXJEYXRhfHx0LmNoYXJhY3RlckRhdGF9KSxpLm9ic2VydmVyLm9ic2VydmVycy5wdXNoKHMpfSxpbml0OmZ1bmN0aW9uKCl7aWYoaC5vYnNlcnZlciYmdGhpcy5wYXJhbXMub2JzZXJ2ZXIpe2lmKHRoaXMucGFyYW1zLm9ic2VydmVQYXJlbnRzKWZvcih2YXIgZT10aGlzLiRlbC5wYXJlbnRzKCksdD0wO3Q8ZS5sZW5ndGg7dCs9MSl0aGlzLm9ic2VydmVyLmF0dGFjaChlW3RdKTt0aGlzLm9ic2VydmVyLmF0dGFjaCh0aGlzLiRlbFswXSx7Y2hpbGRMaXN0OnRoaXMucGFyYW1zLm9ic2VydmVTbGlkZUNoaWxkcmVufSksdGhpcy5vYnNlcnZlci5hdHRhY2godGhpcy4kd3JhcHBlckVsWzBdLHthdHRyaWJ1dGVzOiExfSl9fSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5vYnNlcnZlci5vYnNlcnZlcnMuZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5kaXNjb25uZWN0KCl9KSksdGhpcy5vYnNlcnZlci5vYnNlcnZlcnM9W119fSxlZT17bmFtZTpcIm9ic2VydmVyXCIscGFyYW1zOntvYnNlcnZlcjohMSxvYnNlcnZlUGFyZW50czohMSxvYnNlcnZlU2xpZGVDaGlsZHJlbjohMX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7b2JzZXJ2ZXI6e2luaXQ6Si5pbml0LmJpbmQodGhpcyksYXR0YWNoOkouYXR0YWNoLmJpbmQodGhpcyksZGVzdHJveTpKLmRlc3Ryb3kuYmluZCh0aGlzKSxvYnNlcnZlcnM6W119fSl9LG9uOntpbml0OmZ1bmN0aW9uKCl7dGhpcy5vYnNlcnZlci5pbml0KCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLm9ic2VydmVyLmRlc3Ryb3koKX19fSx0ZT17dXBkYXRlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMsaT10LnBhcmFtcyxzPWkuc2xpZGVzUGVyVmlldyxhPWkuc2xpZGVzUGVyR3JvdXAscj1pLmNlbnRlcmVkU2xpZGVzLG49dC5wYXJhbXMudmlydHVhbCxvPW4uYWRkU2xpZGVzQmVmb3JlLGw9bi5hZGRTbGlkZXNBZnRlcixoPXQudmlydHVhbCxwPWguZnJvbSxjPWgudG8sdT1oLnNsaWRlcyx2PWguc2xpZGVzR3JpZCxmPWgucmVuZGVyU2xpZGUsbT1oLm9mZnNldDt0LnVwZGF0ZUFjdGl2ZUluZGV4KCk7dmFyIGcsYix3LHk9dC5hY3RpdmVJbmRleHx8MDtnPXQucnRsVHJhbnNsYXRlP1wicmlnaHRcIjp0LmlzSG9yaXpvbnRhbCgpP1wibGVmdFwiOlwidG9wXCIscj8oYj1NYXRoLmZsb29yKHMvMikrYStvLHc9TWF0aC5mbG9vcihzLzIpK2ErbCk6KGI9cysoYS0xKStvLHc9YStsKTt2YXIgeD1NYXRoLm1heCgoeXx8MCktdywwKSxFPU1hdGgubWluKCh5fHwwKStiLHUubGVuZ3RoLTEpLFQ9KHQuc2xpZGVzR3JpZFt4XXx8MCktKHQuc2xpZGVzR3JpZFswXXx8MCk7ZnVuY3Rpb24gUygpe3QudXBkYXRlU2xpZGVzKCksdC51cGRhdGVQcm9ncmVzcygpLHQudXBkYXRlU2xpZGVzQ2xhc3NlcygpLHQubGF6eSYmdC5wYXJhbXMubGF6eS5lbmFibGVkJiZ0LmxhenkubG9hZCgpfWlmKGQuZXh0ZW5kKHQudmlydHVhbCx7ZnJvbTp4LHRvOkUsb2Zmc2V0OlQsc2xpZGVzR3JpZDp0LnNsaWRlc0dyaWR9KSxwPT09eCYmYz09PUUmJiFlKXJldHVybiB0LnNsaWRlc0dyaWQhPT12JiZUIT09bSYmdC5zbGlkZXMuY3NzKGcsVCtcInB4XCIpLHZvaWQgdC51cGRhdGVQcm9ncmVzcygpO2lmKHQucGFyYW1zLnZpcnR1YWwucmVuZGVyRXh0ZXJuYWwpcmV0dXJuIHQucGFyYW1zLnZpcnR1YWwucmVuZGVyRXh0ZXJuYWwuY2FsbCh0LHtvZmZzZXQ6VCxmcm9tOngsdG86RSxzbGlkZXM6ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD14O3Q8PUU7dCs9MSllLnB1c2godVt0XSk7cmV0dXJuIGV9KCl9KSx2b2lkIFMoKTt2YXIgQz1bXSxNPVtdO2lmKGUpdC4kd3JhcHBlckVsLmZpbmQoXCIuXCIrdC5wYXJhbXMuc2xpZGVDbGFzcykucmVtb3ZlKCk7ZWxzZSBmb3IodmFyIFA9cDtQPD1jO1ArPTEpKFA8eHx8UD5FKSYmdC4kd3JhcHBlckVsLmZpbmQoXCIuXCIrdC5wYXJhbXMuc2xpZGVDbGFzcysnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytQKydcIl0nKS5yZW1vdmUoKTtmb3IodmFyIHo9MDt6PHUubGVuZ3RoO3orPTEpej49eCYmejw9RSYmKHZvaWQgMD09PWN8fGU/TS5wdXNoKHopOih6PmMmJk0ucHVzaCh6KSx6PHAmJkMucHVzaCh6KSkpO00uZm9yRWFjaCgoZnVuY3Rpb24oZSl7dC4kd3JhcHBlckVsLmFwcGVuZChmKHVbZV0sZSkpfSkpLEMuc29ydCgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC1lfSkpLmZvckVhY2goKGZ1bmN0aW9uKGUpe3QuJHdyYXBwZXJFbC5wcmVwZW5kKGYodVtlXSxlKSl9KSksdC4kd3JhcHBlckVsLmNoaWxkcmVuKFwiLnN3aXBlci1zbGlkZVwiKS5jc3MoZyxUK1wicHhcIiksUygpfSxyZW5kZXJTbGlkZTpmdW5jdGlvbihlLHQpe3ZhciBpPXRoaXMucGFyYW1zLnZpcnR1YWw7aWYoaS5jYWNoZSYmdGhpcy52aXJ0dWFsLmNhY2hlW3RdKXJldHVybiB0aGlzLnZpcnR1YWwuY2FjaGVbdF07dmFyIHM9aS5yZW5kZXJTbGlkZT9uKGkucmVuZGVyU2xpZGUuY2FsbCh0aGlzLGUsdCkpOm4oJzxkaXYgY2xhc3M9XCInK3RoaXMucGFyYW1zLnNsaWRlQ2xhc3MrJ1wiIGRhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyt0KydcIj4nK2UrXCI8L2Rpdj5cIik7cmV0dXJuIHMuYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpfHxzLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiLHQpLGkuY2FjaGUmJih0aGlzLnZpcnR1YWwuY2FjaGVbdF09cyksc30sYXBwZW5kU2xpZGU6ZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGUmJlwibGVuZ3RoXCJpbiBlKWZvcih2YXIgdD0wO3Q8ZS5sZW5ndGg7dCs9MSllW3RdJiZ0aGlzLnZpcnR1YWwuc2xpZGVzLnB1c2goZVt0XSk7ZWxzZSB0aGlzLnZpcnR1YWwuc2xpZGVzLnB1c2goZSk7dGhpcy52aXJ0dWFsLnVwZGF0ZSghMCl9LHByZXBlbmRTbGlkZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLmFjdGl2ZUluZGV4LGk9dCsxLHM9MTtpZihBcnJheS5pc0FycmF5KGUpKXtmb3IodmFyIGE9MDthPGUubGVuZ3RoO2ErPTEpZVthXSYmdGhpcy52aXJ0dWFsLnNsaWRlcy51bnNoaWZ0KGVbYV0pO2k9dCtlLmxlbmd0aCxzPWUubGVuZ3RofWVsc2UgdGhpcy52aXJ0dWFsLnNsaWRlcy51bnNoaWZ0KGUpO2lmKHRoaXMucGFyYW1zLnZpcnR1YWwuY2FjaGUpe3ZhciByPXRoaXMudmlydHVhbC5jYWNoZSxuPXt9O09iamVjdC5rZXlzKHIpLmZvckVhY2goKGZ1bmN0aW9uKGUpe3ZhciB0PXJbZV0saT10LmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKTtpJiZ0LmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiLHBhcnNlSW50KGksMTApKzEpLG5bcGFyc2VJbnQoZSwxMCkrc109dH0pKSx0aGlzLnZpcnR1YWwuY2FjaGU9bn10aGlzLnZpcnR1YWwudXBkYXRlKCEwKSx0aGlzLnNsaWRlVG8oaSwwKX0scmVtb3ZlU2xpZGU6ZnVuY3Rpb24oZSl7aWYobnVsbCE9ZSl7dmFyIHQ9dGhpcy5hY3RpdmVJbmRleDtpZihBcnJheS5pc0FycmF5KGUpKWZvcih2YXIgaT1lLmxlbmd0aC0xO2k+PTA7aS09MSl0aGlzLnZpcnR1YWwuc2xpZGVzLnNwbGljZShlW2ldLDEpLHRoaXMucGFyYW1zLnZpcnR1YWwuY2FjaGUmJmRlbGV0ZSB0aGlzLnZpcnR1YWwuY2FjaGVbZVtpXV0sZVtpXTx0JiYodC09MSksdD1NYXRoLm1heCh0LDApO2Vsc2UgdGhpcy52aXJ0dWFsLnNsaWRlcy5zcGxpY2UoZSwxKSx0aGlzLnBhcmFtcy52aXJ0dWFsLmNhY2hlJiZkZWxldGUgdGhpcy52aXJ0dWFsLmNhY2hlW2VdLGU8dCYmKHQtPTEpLHQ9TWF0aC5tYXgodCwwKTt0aGlzLnZpcnR1YWwudXBkYXRlKCEwKSx0aGlzLnNsaWRlVG8odCwwKX19LHJlbW92ZUFsbFNsaWRlczpmdW5jdGlvbigpe3RoaXMudmlydHVhbC5zbGlkZXM9W10sdGhpcy5wYXJhbXMudmlydHVhbC5jYWNoZSYmKHRoaXMudmlydHVhbC5jYWNoZT17fSksdGhpcy52aXJ0dWFsLnVwZGF0ZSghMCksdGhpcy5zbGlkZVRvKDAsMCl9fSxpZT17bmFtZTpcInZpcnR1YWxcIixwYXJhbXM6e3ZpcnR1YWw6e2VuYWJsZWQ6ITEsc2xpZGVzOltdLGNhY2hlOiEwLHJlbmRlclNsaWRlOm51bGwscmVuZGVyRXh0ZXJuYWw6bnVsbCxhZGRTbGlkZXNCZWZvcmU6MCxhZGRTbGlkZXNBZnRlcjowfX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7dmlydHVhbDp7dXBkYXRlOnRlLnVwZGF0ZS5iaW5kKHRoaXMpLGFwcGVuZFNsaWRlOnRlLmFwcGVuZFNsaWRlLmJpbmQodGhpcykscHJlcGVuZFNsaWRlOnRlLnByZXBlbmRTbGlkZS5iaW5kKHRoaXMpLHJlbW92ZVNsaWRlOnRlLnJlbW92ZVNsaWRlLmJpbmQodGhpcykscmVtb3ZlQWxsU2xpZGVzOnRlLnJlbW92ZUFsbFNsaWRlcy5iaW5kKHRoaXMpLHJlbmRlclNsaWRlOnRlLnJlbmRlclNsaWRlLmJpbmQodGhpcyksc2xpZGVzOnRoaXMucGFyYW1zLnZpcnR1YWwuc2xpZGVzLGNhY2hlOnt9fX0pfSxvbjp7YmVmb3JlSW5pdDpmdW5jdGlvbigpe2lmKHRoaXMucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCl7dGhpcy5jbGFzc05hbWVzLnB1c2godGhpcy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcytcInZpcnR1YWxcIik7dmFyIGU9e3dhdGNoU2xpZGVzUHJvZ3Jlc3M6ITB9O2QuZXh0ZW5kKHRoaXMucGFyYW1zLGUpLGQuZXh0ZW5kKHRoaXMub3JpZ2luYWxQYXJhbXMsZSksdGhpcy5wYXJhbXMuaW5pdGlhbFNsaWRlfHx0aGlzLnZpcnR1YWwudXBkYXRlKCl9fSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQmJnRoaXMudmlydHVhbC51cGRhdGUoKX19fSxzZT17aGFuZGxlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucnRsVHJhbnNsYXRlLHM9ZTtzLm9yaWdpbmFsRXZlbnQmJihzPXMub3JpZ2luYWxFdmVudCk7dmFyIHI9cy5rZXlDb2RlfHxzLmNoYXJDb2RlO2lmKCF0aGlzLmFsbG93U2xpZGVOZXh0JiYodGhpcy5pc0hvcml6b250YWwoKSYmMzk9PT1yfHx0aGlzLmlzVmVydGljYWwoKSYmNDA9PT1yfHwzND09PXIpKXJldHVybiExO2lmKCF0aGlzLmFsbG93U2xpZGVQcmV2JiYodGhpcy5pc0hvcml6b250YWwoKSYmMzc9PT1yfHx0aGlzLmlzVmVydGljYWwoKSYmMzg9PT1yfHwzMz09PXIpKXJldHVybiExO2lmKCEocy5zaGlmdEtleXx8cy5hbHRLZXl8fHMuY3RybEtleXx8cy5tZXRhS2V5fHxpLmFjdGl2ZUVsZW1lbnQmJmkuYWN0aXZlRWxlbWVudC5ub2RlTmFtZSYmKFwiaW5wdXRcIj09PWkuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpfHxcInRleHRhcmVhXCI9PT1pLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkpKXtpZih0aGlzLnBhcmFtcy5rZXlib2FyZC5vbmx5SW5WaWV3cG9ydCYmKDMzPT09cnx8MzQ9PT1yfHwzNz09PXJ8fDM5PT09cnx8Mzg9PT1yfHw0MD09PXIpKXt2YXIgbj0hMTtpZih0aGlzLiRlbC5wYXJlbnRzKFwiLlwiK3RoaXMucGFyYW1zLnNsaWRlQ2xhc3MpLmxlbmd0aD4wJiYwPT09dGhpcy4kZWwucGFyZW50cyhcIi5cIit0aGlzLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKS5sZW5ndGgpcmV0dXJuO3ZhciBvPWEuaW5uZXJXaWR0aCxsPWEuaW5uZXJIZWlnaHQsZD10aGlzLiRlbC5vZmZzZXQoKTt0JiYoZC5sZWZ0LT10aGlzLiRlbFswXS5zY3JvbGxMZWZ0KTtmb3IodmFyIGg9W1tkLmxlZnQsZC50b3BdLFtkLmxlZnQrdGhpcy53aWR0aCxkLnRvcF0sW2QubGVmdCxkLnRvcCt0aGlzLmhlaWdodF0sW2QubGVmdCt0aGlzLndpZHRoLGQudG9wK3RoaXMuaGVpZ2h0XV0scD0wO3A8aC5sZW5ndGg7cCs9MSl7dmFyIGM9aFtwXTtjWzBdPj0wJiZjWzBdPD1vJiZjWzFdPj0wJiZjWzFdPD1sJiYobj0hMCl9aWYoIW4pcmV0dXJufXRoaXMuaXNIb3Jpem9udGFsKCk/KDMzIT09ciYmMzQhPT1yJiYzNyE9PXImJjM5IT09cnx8KHMucHJldmVudERlZmF1bHQ/cy5wcmV2ZW50RGVmYXVsdCgpOnMucmV0dXJuVmFsdWU9ITEpLCgzNCE9PXImJjM5IT09cnx8dCkmJigzMyE9PXImJjM3IT09cnx8IXQpfHx0aGlzLnNsaWRlTmV4dCgpLCgzMyE9PXImJjM3IT09cnx8dCkmJigzNCE9PXImJjM5IT09cnx8IXQpfHx0aGlzLnNsaWRlUHJldigpKTooMzMhPT1yJiYzNCE9PXImJjM4IT09ciYmNDAhPT1yfHwocy5wcmV2ZW50RGVmYXVsdD9zLnByZXZlbnREZWZhdWx0KCk6cy5yZXR1cm5WYWx1ZT0hMSksMzQhPT1yJiY0MCE9PXJ8fHRoaXMuc2xpZGVOZXh0KCksMzMhPT1yJiYzOCE9PXJ8fHRoaXMuc2xpZGVQcmV2KCkpLHRoaXMuZW1pdChcImtleVByZXNzXCIscil9fSxlbmFibGU6ZnVuY3Rpb24oKXt0aGlzLmtleWJvYXJkLmVuYWJsZWR8fChuKGkpLm9uKFwia2V5ZG93blwiLHRoaXMua2V5Ym9hcmQuaGFuZGxlKSx0aGlzLmtleWJvYXJkLmVuYWJsZWQ9ITApfSxkaXNhYmxlOmZ1bmN0aW9uKCl7dGhpcy5rZXlib2FyZC5lbmFibGVkJiYobihpKS5vZmYoXCJrZXlkb3duXCIsdGhpcy5rZXlib2FyZC5oYW5kbGUpLHRoaXMua2V5Ym9hcmQuZW5hYmxlZD0hMSl9fSxhZT17bmFtZTpcImtleWJvYXJkXCIscGFyYW1zOntrZXlib2FyZDp7ZW5hYmxlZDohMSxvbmx5SW5WaWV3cG9ydDohMH19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse2tleWJvYXJkOntlbmFibGVkOiExLGVuYWJsZTpzZS5lbmFibGUuYmluZCh0aGlzKSxkaXNhYmxlOnNlLmRpc2FibGUuYmluZCh0aGlzKSxoYW5kbGU6c2UuaGFuZGxlLmJpbmQodGhpcyl9fSl9LG9uOntpbml0OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMua2V5Ym9hcmQuZW5hYmxlZCYmdGhpcy5rZXlib2FyZC5lbmFibGUoKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMua2V5Ym9hcmQuZW5hYmxlZCYmdGhpcy5rZXlib2FyZC5kaXNhYmxlKCl9fX07dmFyIHJlPXtsYXN0U2Nyb2xsVGltZTpkLm5vdygpLGxhc3RFdmVudEJlZm9yZVNuYXA6dm9pZCAwLHJlY2VudFdoZWVsRXZlbnRzOltdLGV2ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIGEubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiZmlyZWZveFwiKT4tMT9cIkRPTU1vdXNlU2Nyb2xsXCI6ZnVuY3Rpb24oKXt2YXIgZT1cIm9ud2hlZWxcImluIGk7aWYoIWUpe3ZhciB0PWkuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0LnNldEF0dHJpYnV0ZShcIm9ud2hlZWxcIixcInJldHVybjtcIiksZT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0Lm9ud2hlZWx9cmV0dXJuIWUmJmkuaW1wbGVtZW50YXRpb24mJmkuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSYmITAhPT1pLmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoXCJcIixcIlwiKSYmKGU9aS5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKFwiRXZlbnRzLndoZWVsXCIsXCIzLjBcIikpLGV9KCk/XCJ3aGVlbFwiOlwibW91c2V3aGVlbFwifSxub3JtYWxpemU6ZnVuY3Rpb24oZSl7dmFyIHQ9MCxpPTAscz0wLGE9MDtyZXR1cm5cImRldGFpbFwiaW4gZSYmKGk9ZS5kZXRhaWwpLFwid2hlZWxEZWx0YVwiaW4gZSYmKGk9LWUud2hlZWxEZWx0YS8xMjApLFwid2hlZWxEZWx0YVlcImluIGUmJihpPS1lLndoZWVsRGVsdGFZLzEyMCksXCJ3aGVlbERlbHRhWFwiaW4gZSYmKHQ9LWUud2hlZWxEZWx0YVgvMTIwKSxcImF4aXNcImluIGUmJmUuYXhpcz09PWUuSE9SSVpPTlRBTF9BWElTJiYodD1pLGk9MCkscz0xMCp0LGE9MTAqaSxcImRlbHRhWVwiaW4gZSYmKGE9ZS5kZWx0YVkpLFwiZGVsdGFYXCJpbiBlJiYocz1lLmRlbHRhWCksZS5zaGlmdEtleSYmIXMmJihzPWEsYT0wKSwoc3x8YSkmJmUuZGVsdGFNb2RlJiYoMT09PWUuZGVsdGFNb2RlPyhzKj00MCxhKj00MCk6KHMqPTgwMCxhKj04MDApKSxzJiYhdCYmKHQ9czwxPy0xOjEpLGEmJiFpJiYoaT1hPDE/LTE6MSkse3NwaW5YOnQsc3Bpblk6aSxwaXhlbFg6cyxwaXhlbFk6YX19LGhhbmRsZU1vdXNlRW50ZXI6ZnVuY3Rpb24oKXt0aGlzLm1vdXNlRW50ZXJlZD0hMH0saGFuZGxlTW91c2VMZWF2ZTpmdW5jdGlvbigpe3RoaXMubW91c2VFbnRlcmVkPSExfSxoYW5kbGU6ZnVuY3Rpb24oZSl7dmFyIHQ9ZSxpPXRoaXMscz1pLnBhcmFtcy5tb3VzZXdoZWVsO2kucGFyYW1zLmNzc01vZGUmJnQucHJldmVudERlZmF1bHQoKTt2YXIgYT1pLiRlbDtpZihcImNvbnRhaW5lclwiIT09aS5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQmJihhPW4oaS5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQpKSwhaS5tb3VzZUVudGVyZWQmJiFhWzBdLmNvbnRhaW5zKHQudGFyZ2V0KSYmIXMucmVsZWFzZU9uRWRnZXMpcmV0dXJuITA7dC5vcmlnaW5hbEV2ZW50JiYodD10Lm9yaWdpbmFsRXZlbnQpO3ZhciByPTAsbz1pLnJ0bFRyYW5zbGF0ZT8tMToxLGw9cmUubm9ybWFsaXplKHQpO2lmKHMuZm9yY2VUb0F4aXMpaWYoaS5pc0hvcml6b250YWwoKSl7aWYoIShNYXRoLmFicyhsLnBpeGVsWCk+TWF0aC5hYnMobC5waXhlbFkpKSlyZXR1cm4hMDtyPWwucGl4ZWxYKm99ZWxzZXtpZighKE1hdGguYWJzKGwucGl4ZWxZKT5NYXRoLmFicyhsLnBpeGVsWCkpKXJldHVybiEwO3I9bC5waXhlbFl9ZWxzZSByPU1hdGguYWJzKGwucGl4ZWxYKT5NYXRoLmFicyhsLnBpeGVsWSk/LWwucGl4ZWxYKm86LWwucGl4ZWxZO2lmKDA9PT1yKXJldHVybiEwO2lmKHMuaW52ZXJ0JiYocj0tciksaS5wYXJhbXMuZnJlZU1vZGUpe3ZhciBoPXt0aW1lOmQubm93KCksZGVsdGE6TWF0aC5hYnMociksZGlyZWN0aW9uOk1hdGguc2lnbihyKX0scD1pLm1vdXNld2hlZWwubGFzdEV2ZW50QmVmb3JlU25hcCxjPXAmJmgudGltZTxwLnRpbWUrNTAwJiZoLmRlbHRhPD1wLmRlbHRhJiZoLmRpcmVjdGlvbj09PXAuZGlyZWN0aW9uO2lmKCFjKXtpLm1vdXNld2hlZWwubGFzdEV2ZW50QmVmb3JlU25hcD12b2lkIDAsaS5wYXJhbXMubG9vcCYmaS5sb29wRml4KCk7dmFyIHU9aS5nZXRUcmFuc2xhdGUoKStyKnMuc2Vuc2l0aXZpdHksdj1pLmlzQmVnaW5uaW5nLGY9aS5pc0VuZDtpZih1Pj1pLm1pblRyYW5zbGF0ZSgpJiYodT1pLm1pblRyYW5zbGF0ZSgpKSx1PD1pLm1heFRyYW5zbGF0ZSgpJiYodT1pLm1heFRyYW5zbGF0ZSgpKSxpLnNldFRyYW5zaXRpb24oMCksaS5zZXRUcmFuc2xhdGUodSksaS51cGRhdGVQcm9ncmVzcygpLGkudXBkYXRlQWN0aXZlSW5kZXgoKSxpLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKSwoIXYmJmkuaXNCZWdpbm5pbmd8fCFmJiZpLmlzRW5kKSYmaS51cGRhdGVTbGlkZXNDbGFzc2VzKCksaS5wYXJhbXMuZnJlZU1vZGVTdGlja3kpe2NsZWFyVGltZW91dChpLm1vdXNld2hlZWwudGltZW91dCksaS5tb3VzZXdoZWVsLnRpbWVvdXQ9dm9pZCAwO3ZhciBtPWkubW91c2V3aGVlbC5yZWNlbnRXaGVlbEV2ZW50czttLmxlbmd0aD49MTUmJm0uc2hpZnQoKTt2YXIgZz1tLmxlbmd0aD9tW20ubGVuZ3RoLTFdOnZvaWQgMCxiPW1bMF07aWYobS5wdXNoKGgpLGcmJihoLmRlbHRhPmcuZGVsdGF8fGguZGlyZWN0aW9uIT09Zy5kaXJlY3Rpb24pKW0uc3BsaWNlKDApO2Vsc2UgaWYobS5sZW5ndGg+PTE1JiZoLnRpbWUtYi50aW1lPDUwMCYmYi5kZWx0YS1oLmRlbHRhPj0xJiZoLmRlbHRhPD02KXt2YXIgdz1yPjA/Ljg6LjI7aS5tb3VzZXdoZWVsLmxhc3RFdmVudEJlZm9yZVNuYXA9aCxtLnNwbGljZSgwKSxpLm1vdXNld2hlZWwudGltZW91dD1kLm5leHRUaWNrKChmdW5jdGlvbigpe2kuc2xpZGVUb0Nsb3Nlc3QoaS5wYXJhbXMuc3BlZWQsITAsdm9pZCAwLHcpfSksMCl9aS5tb3VzZXdoZWVsLnRpbWVvdXR8fChpLm1vdXNld2hlZWwudGltZW91dD1kLm5leHRUaWNrKChmdW5jdGlvbigpe2kubW91c2V3aGVlbC5sYXN0RXZlbnRCZWZvcmVTbmFwPWgsbS5zcGxpY2UoMCksaS5zbGlkZVRvQ2xvc2VzdChpLnBhcmFtcy5zcGVlZCwhMCx2b2lkIDAsLjUpfSksNTAwKSl9aWYoY3x8aS5lbWl0KFwic2Nyb2xsXCIsdCksaS5wYXJhbXMuYXV0b3BsYXkmJmkucGFyYW1zLmF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb24mJmkuYXV0b3BsYXkuc3RvcCgpLHU9PT1pLm1pblRyYW5zbGF0ZSgpfHx1PT09aS5tYXhUcmFuc2xhdGUoKSlyZXR1cm4hMH19ZWxzZXt2YXIgeT17dGltZTpkLm5vdygpLGRlbHRhOk1hdGguYWJzKHIpLGRpcmVjdGlvbjpNYXRoLnNpZ24ocikscmF3OmV9LHg9aS5tb3VzZXdoZWVsLnJlY2VudFdoZWVsRXZlbnRzO3gubGVuZ3RoPj0yJiZ4LnNoaWZ0KCk7dmFyIEU9eC5sZW5ndGg/eFt4Lmxlbmd0aC0xXTp2b2lkIDA7aWYoeC5wdXNoKHkpLEU/KHkuZGlyZWN0aW9uIT09RS5kaXJlY3Rpb258fHkuZGVsdGE+RS5kZWx0YXx8eS50aW1lPkUudGltZSsxNTApJiZpLm1vdXNld2hlZWwuYW5pbWF0ZVNsaWRlcih5KTppLm1vdXNld2hlZWwuYW5pbWF0ZVNsaWRlcih5KSxpLm1vdXNld2hlZWwucmVsZWFzZVNjcm9sbCh5KSlyZXR1cm4hMH1yZXR1cm4gdC5wcmV2ZW50RGVmYXVsdD90LnByZXZlbnREZWZhdWx0KCk6dC5yZXR1cm5WYWx1ZT0hMSwhMX0sYW5pbWF0ZVNsaWRlcjpmdW5jdGlvbihlKXtyZXR1cm4gZS5kZWx0YT49NiYmZC5ub3coKS10aGlzLm1vdXNld2hlZWwubGFzdFNjcm9sbFRpbWU8NjB8fChlLmRpcmVjdGlvbjwwP3RoaXMuaXNFbmQmJiF0aGlzLnBhcmFtcy5sb29wfHx0aGlzLmFuaW1hdGluZ3x8KHRoaXMuc2xpZGVOZXh0KCksdGhpcy5lbWl0KFwic2Nyb2xsXCIsZS5yYXcpKTp0aGlzLmlzQmVnaW5uaW5nJiYhdGhpcy5wYXJhbXMubG9vcHx8dGhpcy5hbmltYXRpbmd8fCh0aGlzLnNsaWRlUHJldigpLHRoaXMuZW1pdChcInNjcm9sbFwiLGUucmF3KSksdGhpcy5tb3VzZXdoZWVsLmxhc3RTY3JvbGxUaW1lPShuZXcgYS5EYXRlKS5nZXRUaW1lKCksITEpfSxyZWxlYXNlU2Nyb2xsOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLm1vdXNld2hlZWw7aWYoZS5kaXJlY3Rpb248MCl7aWYodGhpcy5pc0VuZCYmIXRoaXMucGFyYW1zLmxvb3AmJnQucmVsZWFzZU9uRWRnZXMpcmV0dXJuITB9ZWxzZSBpZih0aGlzLmlzQmVnaW5uaW5nJiYhdGhpcy5wYXJhbXMubG9vcCYmdC5yZWxlYXNlT25FZGdlcylyZXR1cm4hMDtyZXR1cm4hMX0sZW5hYmxlOmZ1bmN0aW9uKCl7dmFyIGU9cmUuZXZlbnQoKTtpZih0aGlzLnBhcmFtcy5jc3NNb2RlKXJldHVybiB0aGlzLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKGUsdGhpcy5tb3VzZXdoZWVsLmhhbmRsZSksITA7aWYoIWUpcmV0dXJuITE7aWYodGhpcy5tb3VzZXdoZWVsLmVuYWJsZWQpcmV0dXJuITE7dmFyIHQ9dGhpcy4kZWw7cmV0dXJuXCJjb250YWluZXJcIiE9PXRoaXMucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkJiYodD1uKHRoaXMucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkKSksdC5vbihcIm1vdXNlZW50ZXJcIix0aGlzLm1vdXNld2hlZWwuaGFuZGxlTW91c2VFbnRlciksdC5vbihcIm1vdXNlbGVhdmVcIix0aGlzLm1vdXNld2hlZWwuaGFuZGxlTW91c2VMZWF2ZSksdC5vbihlLHRoaXMubW91c2V3aGVlbC5oYW5kbGUpLHRoaXMubW91c2V3aGVlbC5lbmFibGVkPSEwLCEwfSxkaXNhYmxlOmZ1bmN0aW9uKCl7dmFyIGU9cmUuZXZlbnQoKTtpZih0aGlzLnBhcmFtcy5jc3NNb2RlKXJldHVybiB0aGlzLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKGUsdGhpcy5tb3VzZXdoZWVsLmhhbmRsZSksITA7aWYoIWUpcmV0dXJuITE7aWYoIXRoaXMubW91c2V3aGVlbC5lbmFibGVkKXJldHVybiExO3ZhciB0PXRoaXMuJGVsO3JldHVyblwiY29udGFpbmVyXCIhPT10aGlzLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCYmKHQ9bih0aGlzLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCkpLHQub2ZmKGUsdGhpcy5tb3VzZXdoZWVsLmhhbmRsZSksdGhpcy5tb3VzZXdoZWVsLmVuYWJsZWQ9ITEsITB9fSxuZT17dXBkYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wYXJhbXMubmF2aWdhdGlvbjtpZighdGhpcy5wYXJhbXMubG9vcCl7dmFyIHQ9dGhpcy5uYXZpZ2F0aW9uLGk9dC4kbmV4dEVsLHM9dC4kcHJldkVsO3MmJnMubGVuZ3RoPjAmJih0aGlzLmlzQmVnaW5uaW5nP3MuYWRkQ2xhc3MoZS5kaXNhYmxlZENsYXNzKTpzLnJlbW92ZUNsYXNzKGUuZGlzYWJsZWRDbGFzcyksc1t0aGlzLnBhcmFtcy53YXRjaE92ZXJmbG93JiZ0aGlzLmlzTG9ja2VkP1wiYWRkQ2xhc3NcIjpcInJlbW92ZUNsYXNzXCJdKGUubG9ja0NsYXNzKSksaSYmaS5sZW5ndGg+MCYmKHRoaXMuaXNFbmQ/aS5hZGRDbGFzcyhlLmRpc2FibGVkQ2xhc3MpOmkucmVtb3ZlQ2xhc3MoZS5kaXNhYmxlZENsYXNzKSxpW3RoaXMucGFyYW1zLndhdGNoT3ZlcmZsb3cmJnRoaXMuaXNMb2NrZWQ/XCJhZGRDbGFzc1wiOlwicmVtb3ZlQ2xhc3NcIl0oZS5sb2NrQ2xhc3MpKX19LG9uUHJldkNsaWNrOmZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSx0aGlzLmlzQmVnaW5uaW5nJiYhdGhpcy5wYXJhbXMubG9vcHx8dGhpcy5zbGlkZVByZXYoKX0sb25OZXh0Q2xpY2s6ZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuaXNFbmQmJiF0aGlzLnBhcmFtcy5sb29wfHx0aGlzLnNsaWRlTmV4dCgpfSxpbml0OmZ1bmN0aW9uKCl7dmFyIGUsdCxpPXRoaXMucGFyYW1zLm5hdmlnYXRpb247KGkubmV4dEVsfHxpLnByZXZFbCkmJihpLm5leHRFbCYmKGU9bihpLm5leHRFbCksdGhpcy5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMmJlwic3RyaW5nXCI9PXR5cGVvZiBpLm5leHRFbCYmZS5sZW5ndGg+MSYmMT09PXRoaXMuJGVsLmZpbmQoaS5uZXh0RWwpLmxlbmd0aCYmKGU9dGhpcy4kZWwuZmluZChpLm5leHRFbCkpKSxpLnByZXZFbCYmKHQ9bihpLnByZXZFbCksdGhpcy5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMmJlwic3RyaW5nXCI9PXR5cGVvZiBpLnByZXZFbCYmdC5sZW5ndGg+MSYmMT09PXRoaXMuJGVsLmZpbmQoaS5wcmV2RWwpLmxlbmd0aCYmKHQ9dGhpcy4kZWwuZmluZChpLnByZXZFbCkpKSxlJiZlLmxlbmd0aD4wJiZlLm9uKFwiY2xpY2tcIix0aGlzLm5hdmlnYXRpb24ub25OZXh0Q2xpY2spLHQmJnQubGVuZ3RoPjAmJnQub24oXCJjbGlja1wiLHRoaXMubmF2aWdhdGlvbi5vblByZXZDbGljayksZC5leHRlbmQodGhpcy5uYXZpZ2F0aW9uLHskbmV4dEVsOmUsbmV4dEVsOmUmJmVbMF0sJHByZXZFbDp0LHByZXZFbDp0JiZ0WzBdfSkpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5uYXZpZ2F0aW9uLHQ9ZS4kbmV4dEVsLGk9ZS4kcHJldkVsO3QmJnQubGVuZ3RoJiYodC5vZmYoXCJjbGlja1wiLHRoaXMubmF2aWdhdGlvbi5vbk5leHRDbGljayksdC5yZW1vdmVDbGFzcyh0aGlzLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3MpKSxpJiZpLmxlbmd0aCYmKGkub2ZmKFwiY2xpY2tcIix0aGlzLm5hdmlnYXRpb24ub25QcmV2Q2xpY2spLGkucmVtb3ZlQ2xhc3ModGhpcy5wYXJhbXMubmF2aWdhdGlvbi5kaXNhYmxlZENsYXNzKSl9fSxvZT17dXBkYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5ydGwsdD10aGlzLnBhcmFtcy5wYWdpbmF0aW9uO2lmKHQuZWwmJnRoaXMucGFnaW5hdGlvbi5lbCYmdGhpcy5wYWdpbmF0aW9uLiRlbCYmMCE9PXRoaXMucGFnaW5hdGlvbi4kZWwubGVuZ3RoKXt2YXIgaSxzPXRoaXMudmlydHVhbCYmdGhpcy5wYXJhbXMudmlydHVhbC5lbmFibGVkP3RoaXMudmlydHVhbC5zbGlkZXMubGVuZ3RoOnRoaXMuc2xpZGVzLmxlbmd0aCxhPXRoaXMucGFnaW5hdGlvbi4kZWwscj10aGlzLnBhcmFtcy5sb29wP01hdGguY2VpbCgocy0yKnRoaXMubG9vcGVkU2xpZGVzKS90aGlzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk6dGhpcy5zbmFwR3JpZC5sZW5ndGg7aWYodGhpcy5wYXJhbXMubG9vcD8oKGk9TWF0aC5jZWlsKCh0aGlzLmFjdGl2ZUluZGV4LXRoaXMubG9vcGVkU2xpZGVzKS90aGlzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCkpPnMtMS0yKnRoaXMubG9vcGVkU2xpZGVzJiYoaS09cy0yKnRoaXMubG9vcGVkU2xpZGVzKSxpPnItMSYmKGktPXIpLGk8MCYmXCJidWxsZXRzXCIhPT10aGlzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSYmKGk9citpKSk6aT12b2lkIDAhPT10aGlzLnNuYXBJbmRleD90aGlzLnNuYXBJbmRleDp0aGlzLmFjdGl2ZUluZGV4fHwwLFwiYnVsbGV0c1wiPT09dC50eXBlJiZ0aGlzLnBhZ2luYXRpb24uYnVsbGV0cyYmdGhpcy5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoPjApe3ZhciBvLGwsZCxoPXRoaXMucGFnaW5hdGlvbi5idWxsZXRzO2lmKHQuZHluYW1pY0J1bGxldHMmJih0aGlzLnBhZ2luYXRpb24uYnVsbGV0U2l6ZT1oLmVxKDApW3RoaXMuaXNIb3Jpem9udGFsKCk/XCJvdXRlcldpZHRoXCI6XCJvdXRlckhlaWdodFwiXSghMCksYS5jc3ModGhpcy5pc0hvcml6b250YWwoKT9cIndpZHRoXCI6XCJoZWlnaHRcIix0aGlzLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSoodC5keW5hbWljTWFpbkJ1bGxldHMrNCkrXCJweFwiKSx0LmR5bmFtaWNNYWluQnVsbGV0cz4xJiZ2b2lkIDAhPT10aGlzLnByZXZpb3VzSW5kZXgmJih0aGlzLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4Kz1pLXRoaXMucHJldmlvdXNJbmRleCx0aGlzLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4PnQuZHluYW1pY01haW5CdWxsZXRzLTE/dGhpcy5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleD10LmR5bmFtaWNNYWluQnVsbGV0cy0xOnRoaXMucGFnaW5hdGlvbi5keW5hbWljQnVsbGV0SW5kZXg8MCYmKHRoaXMucGFnaW5hdGlvbi5keW5hbWljQnVsbGV0SW5kZXg9MCkpLG89aS10aGlzLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4LGQ9KChsPW8rKE1hdGgubWluKGgubGVuZ3RoLHQuZHluYW1pY01haW5CdWxsZXRzKS0xKSkrbykvMiksaC5yZW1vdmVDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiIFwiK3QuYnVsbGV0QWN0aXZlQ2xhc3MrXCItbmV4dCBcIit0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW5leHQtbmV4dCBcIit0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLXByZXYgXCIrdC5idWxsZXRBY3RpdmVDbGFzcytcIi1wcmV2LXByZXYgXCIrdC5idWxsZXRBY3RpdmVDbGFzcytcIi1tYWluXCIpLGEubGVuZ3RoPjEpaC5lYWNoKChmdW5jdGlvbihlLHMpe3ZhciBhPW4ocykscj1hLmluZGV4KCk7cj09PWkmJmEuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcyksdC5keW5hbWljQnVsbGV0cyYmKHI+PW8mJnI8PWwmJmEuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1tYWluXCIpLHI9PT1vJiZhLnByZXYoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLXByZXZcIikucHJldigpLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItcHJldi1wcmV2XCIpLHI9PT1sJiZhLm5leHQoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW5leHRcIikubmV4dCgpLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItbmV4dC1uZXh0XCIpKX0pKTtlbHNle3ZhciBwPWguZXEoaSksYz1wLmluZGV4KCk7aWYocC5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzKSx0LmR5bmFtaWNCdWxsZXRzKXtmb3IodmFyIHU9aC5lcShvKSx2PWguZXEobCksZj1vO2Y8PWw7Zis9MSloLmVxKGYpLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItbWFpblwiKTtpZih0aGlzLnBhcmFtcy5sb29wKWlmKGM+PWgubGVuZ3RoLXQuZHluYW1pY01haW5CdWxsZXRzKXtmb3IodmFyIG09dC5keW5hbWljTWFpbkJ1bGxldHM7bT49MDttLT0xKWguZXEoaC5sZW5ndGgtbSkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1tYWluXCIpO2guZXEoaC5sZW5ndGgtdC5keW5hbWljTWFpbkJ1bGxldHMtMSkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1wcmV2XCIpfWVsc2UgdS5wcmV2KCkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1wcmV2XCIpLnByZXYoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLXByZXYtcHJldlwiKSx2Lm5leHQoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW5leHRcIikubmV4dCgpLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItbmV4dC1uZXh0XCIpO2Vsc2UgdS5wcmV2KCkuYWRkQ2xhc3ModC5idWxsZXRBY3RpdmVDbGFzcytcIi1wcmV2XCIpLnByZXYoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLXByZXYtcHJldlwiKSx2Lm5leHQoKS5hZGRDbGFzcyh0LmJ1bGxldEFjdGl2ZUNsYXNzK1wiLW5leHRcIikubmV4dCgpLmFkZENsYXNzKHQuYnVsbGV0QWN0aXZlQ2xhc3MrXCItbmV4dC1uZXh0XCIpfX1pZih0LmR5bmFtaWNCdWxsZXRzKXt2YXIgZz1NYXRoLm1pbihoLmxlbmd0aCx0LmR5bmFtaWNNYWluQnVsbGV0cys0KSxiPSh0aGlzLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSpnLXRoaXMucGFnaW5hdGlvbi5idWxsZXRTaXplKS8yLWQqdGhpcy5wYWdpbmF0aW9uLmJ1bGxldFNpemUsdz1lP1wicmlnaHRcIjpcImxlZnRcIjtoLmNzcyh0aGlzLmlzSG9yaXpvbnRhbCgpP3c6XCJ0b3BcIixiK1wicHhcIil9fWlmKFwiZnJhY3Rpb25cIj09PXQudHlwZSYmKGEuZmluZChcIi5cIit0LmN1cnJlbnRDbGFzcykudGV4dCh0LmZvcm1hdEZyYWN0aW9uQ3VycmVudChpKzEpKSxhLmZpbmQoXCIuXCIrdC50b3RhbENsYXNzKS50ZXh0KHQuZm9ybWF0RnJhY3Rpb25Ub3RhbChyKSkpLFwicHJvZ3Jlc3NiYXJcIj09PXQudHlwZSl7dmFyIHk7eT10LnByb2dyZXNzYmFyT3Bwb3NpdGU/dGhpcy5pc0hvcml6b250YWwoKT9cInZlcnRpY2FsXCI6XCJob3Jpem9udGFsXCI6dGhpcy5pc0hvcml6b250YWwoKT9cImhvcml6b250YWxcIjpcInZlcnRpY2FsXCI7dmFyIHg9KGkrMSkvcixFPTEsVD0xO1wiaG9yaXpvbnRhbFwiPT09eT9FPXg6VD14LGEuZmluZChcIi5cIit0LnByb2dyZXNzYmFyRmlsbENsYXNzKS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGVYKFwiK0UrXCIpIHNjYWxlWShcIitUK1wiKVwiKS50cmFuc2l0aW9uKHRoaXMucGFyYW1zLnNwZWVkKX1cImN1c3RvbVwiPT09dC50eXBlJiZ0LnJlbmRlckN1c3RvbT8oYS5odG1sKHQucmVuZGVyQ3VzdG9tKHRoaXMsaSsxLHIpKSx0aGlzLmVtaXQoXCJwYWdpbmF0aW9uUmVuZGVyXCIsdGhpcyxhWzBdKSk6dGhpcy5lbWl0KFwicGFnaW5hdGlvblVwZGF0ZVwiLHRoaXMsYVswXSksYVt0aGlzLnBhcmFtcy53YXRjaE92ZXJmbG93JiZ0aGlzLmlzTG9ja2VkP1wiYWRkQ2xhc3NcIjpcInJlbW92ZUNsYXNzXCJdKHQubG9ja0NsYXNzKX19LHJlbmRlcjpmdW5jdGlvbigpe3ZhciBlPXRoaXMucGFyYW1zLnBhZ2luYXRpb247aWYoZS5lbCYmdGhpcy5wYWdpbmF0aW9uLmVsJiZ0aGlzLnBhZ2luYXRpb24uJGVsJiYwIT09dGhpcy5wYWdpbmF0aW9uLiRlbC5sZW5ndGgpe3ZhciB0PXRoaXMudmlydHVhbCYmdGhpcy5wYXJhbXMudmlydHVhbC5lbmFibGVkP3RoaXMudmlydHVhbC5zbGlkZXMubGVuZ3RoOnRoaXMuc2xpZGVzLmxlbmd0aCxpPXRoaXMucGFnaW5hdGlvbi4kZWwscz1cIlwiO2lmKFwiYnVsbGV0c1wiPT09ZS50eXBlKXtmb3IodmFyIGE9dGhpcy5wYXJhbXMubG9vcD9NYXRoLmNlaWwoKHQtMip0aGlzLmxvb3BlZFNsaWRlcykvdGhpcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApOnRoaXMuc25hcEdyaWQubGVuZ3RoLHI9MDtyPGE7cis9MSllLnJlbmRlckJ1bGxldD9zKz1lLnJlbmRlckJ1bGxldC5jYWxsKHRoaXMscixlLmJ1bGxldENsYXNzKTpzKz1cIjxcIitlLmJ1bGxldEVsZW1lbnQrJyBjbGFzcz1cIicrZS5idWxsZXRDbGFzcysnXCI+PC8nK2UuYnVsbGV0RWxlbWVudCtcIj5cIjtpLmh0bWwocyksdGhpcy5wYWdpbmF0aW9uLmJ1bGxldHM9aS5maW5kKFwiLlwiK2UuYnVsbGV0Q2xhc3MpfVwiZnJhY3Rpb25cIj09PWUudHlwZSYmKHM9ZS5yZW5kZXJGcmFjdGlvbj9lLnJlbmRlckZyYWN0aW9uLmNhbGwodGhpcyxlLmN1cnJlbnRDbGFzcyxlLnRvdGFsQ2xhc3MpOic8c3BhbiBjbGFzcz1cIicrZS5jdXJyZW50Q2xhc3MrJ1wiPjwvc3Bhbj4gLyA8c3BhbiBjbGFzcz1cIicrZS50b3RhbENsYXNzKydcIj48L3NwYW4+JyxpLmh0bWwocykpLFwicHJvZ3Jlc3NiYXJcIj09PWUudHlwZSYmKHM9ZS5yZW5kZXJQcm9ncmVzc2Jhcj9lLnJlbmRlclByb2dyZXNzYmFyLmNhbGwodGhpcyxlLnByb2dyZXNzYmFyRmlsbENsYXNzKTonPHNwYW4gY2xhc3M9XCInK2UucHJvZ3Jlc3NiYXJGaWxsQ2xhc3MrJ1wiPjwvc3Bhbj4nLGkuaHRtbChzKSksXCJjdXN0b21cIiE9PWUudHlwZSYmdGhpcy5lbWl0KFwicGFnaW5hdGlvblJlbmRlclwiLHRoaXMucGFnaW5hdGlvbi4kZWxbMF0pfX0saW5pdDpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLnBhcmFtcy5wYWdpbmF0aW9uO2lmKHQuZWwpe3ZhciBpPW4odC5lbCk7MCE9PWkubGVuZ3RoJiYoZS5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMmJlwic3RyaW5nXCI9PXR5cGVvZiB0LmVsJiZpLmxlbmd0aD4xJiYxPT09ZS4kZWwuZmluZCh0LmVsKS5sZW5ndGgmJihpPWUuJGVsLmZpbmQodC5lbCkpLFwiYnVsbGV0c1wiPT09dC50eXBlJiZ0LmNsaWNrYWJsZSYmaS5hZGRDbGFzcyh0LmNsaWNrYWJsZUNsYXNzKSxpLmFkZENsYXNzKHQubW9kaWZpZXJDbGFzcyt0LnR5cGUpLFwiYnVsbGV0c1wiPT09dC50eXBlJiZ0LmR5bmFtaWNCdWxsZXRzJiYoaS5hZGRDbGFzcyhcIlwiK3QubW9kaWZpZXJDbGFzcyt0LnR5cGUrXCItZHluYW1pY1wiKSxlLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4PTAsdC5keW5hbWljTWFpbkJ1bGxldHM8MSYmKHQuZHluYW1pY01haW5CdWxsZXRzPTEpKSxcInByb2dyZXNzYmFyXCI9PT10LnR5cGUmJnQucHJvZ3Jlc3NiYXJPcHBvc2l0ZSYmaS5hZGRDbGFzcyh0LnByb2dyZXNzYmFyT3Bwb3NpdGVDbGFzcyksdC5jbGlja2FibGUmJmkub24oXCJjbGlja1wiLFwiLlwiK3QuYnVsbGV0Q2xhc3MsKGZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKTt2YXIgaT1uKHRoaXMpLmluZGV4KCkqZS5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7ZS5wYXJhbXMubG9vcCYmKGkrPWUubG9vcGVkU2xpZGVzKSxlLnNsaWRlVG8oaSl9KSksZC5leHRlbmQoZS5wYWdpbmF0aW9uLHskZWw6aSxlbDppWzBdfSkpfX0sZGVzdHJveTpmdW5jdGlvbigpe3ZhciBlPXRoaXMucGFyYW1zLnBhZ2luYXRpb247aWYoZS5lbCYmdGhpcy5wYWdpbmF0aW9uLmVsJiZ0aGlzLnBhZ2luYXRpb24uJGVsJiYwIT09dGhpcy5wYWdpbmF0aW9uLiRlbC5sZW5ndGgpe3ZhciB0PXRoaXMucGFnaW5hdGlvbi4kZWw7dC5yZW1vdmVDbGFzcyhlLmhpZGRlbkNsYXNzKSx0LnJlbW92ZUNsYXNzKGUubW9kaWZpZXJDbGFzcytlLnR5cGUpLHRoaXMucGFnaW5hdGlvbi5idWxsZXRzJiZ0aGlzLnBhZ2luYXRpb24uYnVsbGV0cy5yZW1vdmVDbGFzcyhlLmJ1bGxldEFjdGl2ZUNsYXNzKSxlLmNsaWNrYWJsZSYmdC5vZmYoXCJjbGlja1wiLFwiLlwiK2UuYnVsbGV0Q2xhc3MpfX19LGxlPXtzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXtpZih0aGlzLnBhcmFtcy5zY3JvbGxiYXIuZWwmJnRoaXMuc2Nyb2xsYmFyLmVsKXt2YXIgZT10aGlzLnNjcm9sbGJhcix0PXRoaXMucnRsVHJhbnNsYXRlLGk9dGhpcy5wcm9ncmVzcyxzPWUuZHJhZ1NpemUsYT1lLnRyYWNrU2l6ZSxyPWUuJGRyYWdFbCxuPWUuJGVsLG89dGhpcy5wYXJhbXMuc2Nyb2xsYmFyLGw9cyxkPShhLXMpKmk7dD8oZD0tZCk+MD8obD1zLWQsZD0wKTotZCtzPmEmJihsPWErZCk6ZDwwPyhsPXMrZCxkPTApOmQrcz5hJiYobD1hLWQpLHRoaXMuaXNIb3Jpem9udGFsKCk/KHIudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoXCIrZCtcInB4LCAwLCAwKVwiKSxyWzBdLnN0eWxlLndpZHRoPWwrXCJweFwiKTooci50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwcHgsIFwiK2QrXCJweCwgMClcIiksclswXS5zdHlsZS5oZWlnaHQ9bCtcInB4XCIpLG8uaGlkZSYmKGNsZWFyVGltZW91dCh0aGlzLnNjcm9sbGJhci50aW1lb3V0KSxuWzBdLnN0eWxlLm9wYWNpdHk9MSx0aGlzLnNjcm9sbGJhci50aW1lb3V0PXNldFRpbWVvdXQoKGZ1bmN0aW9uKCl7blswXS5zdHlsZS5vcGFjaXR5PTAsbi50cmFuc2l0aW9uKDQwMCl9KSwxZTMpKX19LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7dGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmVsJiZ0aGlzLnNjcm9sbGJhci5lbCYmdGhpcy5zY3JvbGxiYXIuJGRyYWdFbC50cmFuc2l0aW9uKGUpfSx1cGRhdGVTaXplOmZ1bmN0aW9uKCl7aWYodGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmVsJiZ0aGlzLnNjcm9sbGJhci5lbCl7dmFyIGU9dGhpcy5zY3JvbGxiYXIsdD1lLiRkcmFnRWwsaT1lLiRlbDt0WzBdLnN0eWxlLndpZHRoPVwiXCIsdFswXS5zdHlsZS5oZWlnaHQ9XCJcIjt2YXIgcyxhPXRoaXMuaXNIb3Jpem9udGFsKCk/aVswXS5vZmZzZXRXaWR0aDppWzBdLm9mZnNldEhlaWdodCxyPXRoaXMuc2l6ZS90aGlzLnZpcnR1YWxTaXplLG49ciooYS90aGlzLnNpemUpO3M9XCJhdXRvXCI9PT10aGlzLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemU/YSpyOnBhcnNlSW50KHRoaXMucGFyYW1zLnNjcm9sbGJhci5kcmFnU2l6ZSwxMCksdGhpcy5pc0hvcml6b250YWwoKT90WzBdLnN0eWxlLndpZHRoPXMrXCJweFwiOnRbMF0uc3R5bGUuaGVpZ2h0PXMrXCJweFwiLGlbMF0uc3R5bGUuZGlzcGxheT1yPj0xP1wibm9uZVwiOlwiXCIsdGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmhpZGUmJihpWzBdLnN0eWxlLm9wYWNpdHk9MCksZC5leHRlbmQoZSx7dHJhY2tTaXplOmEsZGl2aWRlcjpyLG1vdmVEaXZpZGVyOm4sZHJhZ1NpemU6c30pLGUuJGVsW3RoaXMucGFyYW1zLndhdGNoT3ZlcmZsb3cmJnRoaXMuaXNMb2NrZWQ/XCJhZGRDbGFzc1wiOlwicmVtb3ZlQ2xhc3NcIl0odGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmxvY2tDbGFzcyl9fSxnZXRQb2ludGVyUG9zaXRpb246ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuaXNIb3Jpem9udGFsKCk/XCJ0b3VjaHN0YXJ0XCI9PT1lLnR5cGV8fFwidG91Y2htb3ZlXCI9PT1lLnR5cGU/ZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFg6ZS5jbGllbnRYOlwidG91Y2hzdGFydFwiPT09ZS50eXBlfHxcInRvdWNobW92ZVwiPT09ZS50eXBlP2UudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZOmUuY2xpZW50WX0sc2V0RHJhZ1Bvc2l0aW9uOmZ1bmN0aW9uKGUpe3ZhciB0LGk9dGhpcy5zY3JvbGxiYXIscz10aGlzLnJ0bFRyYW5zbGF0ZSxhPWkuJGVsLHI9aS5kcmFnU2l6ZSxuPWkudHJhY2tTaXplLG89aS5kcmFnU3RhcnRQb3M7dD0oaS5nZXRQb2ludGVyUG9zaXRpb24oZSktYS5vZmZzZXQoKVt0aGlzLmlzSG9yaXpvbnRhbCgpP1wibGVmdFwiOlwidG9wXCJdLShudWxsIT09bz9vOnIvMikpLyhuLXIpLHQ9TWF0aC5tYXgoTWF0aC5taW4odCwxKSwwKSxzJiYodD0xLXQpO3ZhciBsPXRoaXMubWluVHJhbnNsYXRlKCkrKHRoaXMubWF4VHJhbnNsYXRlKCktdGhpcy5taW5UcmFuc2xhdGUoKSkqdDt0aGlzLnVwZGF0ZVByb2dyZXNzKGwpLHRoaXMuc2V0VHJhbnNsYXRlKGwpLHRoaXMudXBkYXRlQWN0aXZlSW5kZXgoKSx0aGlzLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKX0sb25EcmFnU3RhcnQ6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5wYXJhbXMuc2Nyb2xsYmFyLGk9dGhpcy5zY3JvbGxiYXIscz10aGlzLiR3cmFwcGVyRWwsYT1pLiRlbCxyPWkuJGRyYWdFbDt0aGlzLnNjcm9sbGJhci5pc1RvdWNoZWQ9ITAsdGhpcy5zY3JvbGxiYXIuZHJhZ1N0YXJ0UG9zPWUudGFyZ2V0PT09clswXXx8ZS50YXJnZXQ9PT1yP2kuZ2V0UG9pbnRlclBvc2l0aW9uKGUpLWUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3RoaXMuaXNIb3Jpem9udGFsKCk/XCJsZWZ0XCI6XCJ0b3BcIl06bnVsbCxlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKSxzLnRyYW5zaXRpb24oMTAwKSxyLnRyYW5zaXRpb24oMTAwKSxpLnNldERyYWdQb3NpdGlvbihlKSxjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxiYXIuZHJhZ1RpbWVvdXQpLGEudHJhbnNpdGlvbigwKSx0LmhpZGUmJmEuY3NzKFwib3BhY2l0eVwiLDEpLHRoaXMucGFyYW1zLmNzc01vZGUmJnRoaXMuJHdyYXBwZXJFbC5jc3MoXCJzY3JvbGwtc25hcC10eXBlXCIsXCJub25lXCIpLHRoaXMuZW1pdChcInNjcm9sbGJhckRyYWdTdGFydFwiLGUpfSxvbkRyYWdNb3ZlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuc2Nyb2xsYmFyLGk9dGhpcy4kd3JhcHBlckVsLHM9dC4kZWwsYT10LiRkcmFnRWw7dGhpcy5zY3JvbGxiYXIuaXNUb3VjaGVkJiYoZS5wcmV2ZW50RGVmYXVsdD9lLnByZXZlbnREZWZhdWx0KCk6ZS5yZXR1cm5WYWx1ZT0hMSx0LnNldERyYWdQb3NpdGlvbihlKSxpLnRyYW5zaXRpb24oMCkscy50cmFuc2l0aW9uKDApLGEudHJhbnNpdGlvbigwKSx0aGlzLmVtaXQoXCJzY3JvbGxiYXJEcmFnTW92ZVwiLGUpKX0sb25EcmFnRW5kOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLnNjcm9sbGJhcixpPXRoaXMuc2Nyb2xsYmFyLHM9dGhpcy4kd3JhcHBlckVsLGE9aS4kZWw7dGhpcy5zY3JvbGxiYXIuaXNUb3VjaGVkJiYodGhpcy5zY3JvbGxiYXIuaXNUb3VjaGVkPSExLHRoaXMucGFyYW1zLmNzc01vZGUmJih0aGlzLiR3cmFwcGVyRWwuY3NzKFwic2Nyb2xsLXNuYXAtdHlwZVwiLFwiXCIpLHMudHJhbnNpdGlvbihcIlwiKSksdC5oaWRlJiYoY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsYmFyLmRyYWdUaW1lb3V0KSx0aGlzLnNjcm9sbGJhci5kcmFnVGltZW91dD1kLm5leHRUaWNrKChmdW5jdGlvbigpe2EuY3NzKFwib3BhY2l0eVwiLDApLGEudHJhbnNpdGlvbig0MDApfSksMWUzKSksdGhpcy5lbWl0KFwic2Nyb2xsYmFyRHJhZ0VuZFwiLGUpLHQuc25hcE9uUmVsZWFzZSYmdGhpcy5zbGlkZVRvQ2xvc2VzdCgpKX0sZW5hYmxlRHJhZ2dhYmxlOmZ1bmN0aW9uKCl7aWYodGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmVsKXt2YXIgZT10aGlzLnNjcm9sbGJhcix0PXRoaXMudG91Y2hFdmVudHNUb3VjaCxzPXRoaXMudG91Y2hFdmVudHNEZXNrdG9wLGE9dGhpcy5wYXJhbXMscj1lLiRlbFswXSxuPSEoIWgucGFzc2l2ZUxpc3RlbmVyfHwhYS5wYXNzaXZlTGlzdGVuZXJzKSYme3Bhc3NpdmU6ITEsY2FwdHVyZTohMX0sbz0hKCFoLnBhc3NpdmVMaXN0ZW5lcnx8IWEucGFzc2l2ZUxpc3RlbmVycykmJntwYXNzaXZlOiEwLGNhcHR1cmU6ITF9O2gudG91Y2g/KHIuYWRkRXZlbnRMaXN0ZW5lcih0LnN0YXJ0LHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ1N0YXJ0LG4pLHIuYWRkRXZlbnRMaXN0ZW5lcih0Lm1vdmUsdGhpcy5zY3JvbGxiYXIub25EcmFnTW92ZSxuKSxyLmFkZEV2ZW50TGlzdGVuZXIodC5lbmQsdGhpcy5zY3JvbGxiYXIub25EcmFnRW5kLG8pKTooci5hZGRFdmVudExpc3RlbmVyKHMuc3RhcnQsdGhpcy5zY3JvbGxiYXIub25EcmFnU3RhcnQsbiksaS5hZGRFdmVudExpc3RlbmVyKHMubW92ZSx0aGlzLnNjcm9sbGJhci5vbkRyYWdNb3ZlLG4pLGkuYWRkRXZlbnRMaXN0ZW5lcihzLmVuZCx0aGlzLnNjcm9sbGJhci5vbkRyYWdFbmQsbykpfX0sZGlzYWJsZURyYWdnYWJsZTpmdW5jdGlvbigpe2lmKHRoaXMucGFyYW1zLnNjcm9sbGJhci5lbCl7dmFyIGU9dGhpcy5zY3JvbGxiYXIsdD10aGlzLnRvdWNoRXZlbnRzVG91Y2gscz10aGlzLnRvdWNoRXZlbnRzRGVza3RvcCxhPXRoaXMucGFyYW1zLHI9ZS4kZWxbMF0sbj0hKCFoLnBhc3NpdmVMaXN0ZW5lcnx8IWEucGFzc2l2ZUxpc3RlbmVycykmJntwYXNzaXZlOiExLGNhcHR1cmU6ITF9LG89ISghaC5wYXNzaXZlTGlzdGVuZXJ8fCFhLnBhc3NpdmVMaXN0ZW5lcnMpJiZ7cGFzc2l2ZTohMCxjYXB0dXJlOiExfTtoLnRvdWNoPyhyLnJlbW92ZUV2ZW50TGlzdGVuZXIodC5zdGFydCx0aGlzLnNjcm9sbGJhci5vbkRyYWdTdGFydCxuKSxyLnJlbW92ZUV2ZW50TGlzdGVuZXIodC5tb3ZlLHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ01vdmUsbiksci5yZW1vdmVFdmVudExpc3RlbmVyKHQuZW5kLHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ0VuZCxvKSk6KHIucmVtb3ZlRXZlbnRMaXN0ZW5lcihzLnN0YXJ0LHRoaXMuc2Nyb2xsYmFyLm9uRHJhZ1N0YXJ0LG4pLGkucmVtb3ZlRXZlbnRMaXN0ZW5lcihzLm1vdmUsdGhpcy5zY3JvbGxiYXIub25EcmFnTW92ZSxuKSxpLnJlbW92ZUV2ZW50TGlzdGVuZXIocy5lbmQsdGhpcy5zY3JvbGxiYXIub25EcmFnRW5kLG8pKX19LGluaXQ6ZnVuY3Rpb24oKXtpZih0aGlzLnBhcmFtcy5zY3JvbGxiYXIuZWwpe3ZhciBlPXRoaXMuc2Nyb2xsYmFyLHQ9dGhpcy4kZWwsaT10aGlzLnBhcmFtcy5zY3JvbGxiYXIscz1uKGkuZWwpO3RoaXMucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzJiZcInN0cmluZ1wiPT10eXBlb2YgaS5lbCYmcy5sZW5ndGg+MSYmMT09PXQuZmluZChpLmVsKS5sZW5ndGgmJihzPXQuZmluZChpLmVsKSk7dmFyIGE9cy5maW5kKFwiLlwiK3RoaXMucGFyYW1zLnNjcm9sbGJhci5kcmFnQ2xhc3MpOzA9PT1hLmxlbmd0aCYmKGE9bignPGRpdiBjbGFzcz1cIicrdGhpcy5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdDbGFzcysnXCI+PC9kaXY+Jykscy5hcHBlbmQoYSkpLGQuZXh0ZW5kKGUseyRlbDpzLGVsOnNbMF0sJGRyYWdFbDphLGRyYWdFbDphWzBdfSksaS5kcmFnZ2FibGUmJmUuZW5hYmxlRHJhZ2dhYmxlKCl9fSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxiYXIuZGlzYWJsZURyYWdnYWJsZSgpfX0sZGU9e3NldFRyYW5zZm9ybTpmdW5jdGlvbihlLHQpe3ZhciBpPXRoaXMucnRsLHM9bihlKSxhPWk/LTE6MSxyPXMuYXR0cihcImRhdGEtc3dpcGVyLXBhcmFsbGF4XCIpfHxcIjBcIixvPXMuYXR0cihcImRhdGEtc3dpcGVyLXBhcmFsbGF4LXhcIiksbD1zLmF0dHIoXCJkYXRhLXN3aXBlci1wYXJhbGxheC15XCIpLGQ9cy5hdHRyKFwiZGF0YS1zd2lwZXItcGFyYWxsYXgtc2NhbGVcIiksaD1zLmF0dHIoXCJkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5XCIpO2lmKG98fGw/KG89b3x8XCIwXCIsbD1sfHxcIjBcIik6dGhpcy5pc0hvcml6b250YWwoKT8obz1yLGw9XCIwXCIpOihsPXIsbz1cIjBcIiksbz1vLmluZGV4T2YoXCIlXCIpPj0wP3BhcnNlSW50KG8sMTApKnQqYStcIiVcIjpvKnQqYStcInB4XCIsbD1sLmluZGV4T2YoXCIlXCIpPj0wP3BhcnNlSW50KGwsMTApKnQrXCIlXCI6bCp0K1wicHhcIixudWxsIT1oKXt2YXIgcD1oLShoLTEpKigxLU1hdGguYWJzKHQpKTtzWzBdLnN0eWxlLm9wYWNpdHk9cH1pZihudWxsPT1kKXMudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoXCIrbytcIiwgXCIrbCtcIiwgMHB4KVwiKTtlbHNle3ZhciBjPWQtKGQtMSkqKDEtTWF0aC5hYnModCkpO3MudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoXCIrbytcIiwgXCIrbCtcIiwgMHB4KSBzY2FsZShcIitjK1wiKVwiKX19LHNldFRyYW5zbGF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLiRlbCxpPWUuc2xpZGVzLHM9ZS5wcm9ncmVzcyxhPWUuc25hcEdyaWQ7dC5jaGlsZHJlbihcIltkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZV1cIikuZWFjaCgoZnVuY3Rpb24odCxpKXtlLnBhcmFsbGF4LnNldFRyYW5zZm9ybShpLHMpfSkpLGkuZWFjaCgoZnVuY3Rpb24odCxpKXt2YXIgcj1pLnByb2dyZXNzO2UucGFyYW1zLnNsaWRlc1Blckdyb3VwPjEmJlwiYXV0b1wiIT09ZS5wYXJhbXMuc2xpZGVzUGVyVmlldyYmKHIrPU1hdGguY2VpbCh0LzIpLXMqKGEubGVuZ3RoLTEpKSxyPU1hdGgubWluKE1hdGgubWF4KHIsLTEpLDEpLG4oaSkuZmluZChcIltkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZV1cIikuZWFjaCgoZnVuY3Rpb24odCxpKXtlLnBhcmFsbGF4LnNldFRyYW5zZm9ybShpLHIpfSkpfSkpfSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUpe3ZvaWQgMD09PWUmJihlPXRoaXMucGFyYW1zLnNwZWVkKTt0aGlzLiRlbC5maW5kKFwiW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlXVwiKS5lYWNoKChmdW5jdGlvbih0LGkpe3ZhciBzPW4oaSksYT1wYXJzZUludChzLmF0dHIoXCJkYXRhLXN3aXBlci1wYXJhbGxheC1kdXJhdGlvblwiKSwxMCl8fGU7MD09PWUmJihhPTApLHMudHJhbnNpdGlvbihhKX0pKX19LGhlPXtnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzOmZ1bmN0aW9uKGUpe2lmKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGg8MilyZXR1cm4gMTt2YXIgdD1lLnRhcmdldFRvdWNoZXNbMF0ucGFnZVgsaT1lLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkscz1lLnRhcmdldFRvdWNoZXNbMV0ucGFnZVgsYT1lLnRhcmdldFRvdWNoZXNbMV0ucGFnZVk7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhzLXQsMikrTWF0aC5wb3coYS1pLDIpKX0sb25HZXN0dXJlU3RhcnQ6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5wYXJhbXMuem9vbSxpPXRoaXMuem9vbSxzPWkuZ2VzdHVyZTtpZihpLmZha2VHZXN0dXJlVG91Y2hlZD0hMSxpLmZha2VHZXN0dXJlTW92ZWQ9ITEsIWguZ2VzdHVyZXMpe2lmKFwidG91Y2hzdGFydFwiIT09ZS50eXBlfHxcInRvdWNoc3RhcnRcIj09PWUudHlwZSYmZS50YXJnZXRUb3VjaGVzLmxlbmd0aDwyKXJldHVybjtpLmZha2VHZXN0dXJlVG91Y2hlZD0hMCxzLnNjYWxlU3RhcnQ9aGUuZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlcyhlKX1zLiRzbGlkZUVsJiZzLiRzbGlkZUVsLmxlbmd0aHx8KHMuJHNsaWRlRWw9bihlLnRhcmdldCkuY2xvc2VzdChcIi5cIit0aGlzLnBhcmFtcy5zbGlkZUNsYXNzKSwwPT09cy4kc2xpZGVFbC5sZW5ndGgmJihzLiRzbGlkZUVsPXRoaXMuc2xpZGVzLmVxKHRoaXMuYWN0aXZlSW5kZXgpKSxzLiRpbWFnZUVsPXMuJHNsaWRlRWwuZmluZChcImltZywgc3ZnLCBjYW52YXMsIHBpY3R1cmUsIC5zd2lwZXItem9vbS10YXJnZXRcIikscy4kaW1hZ2VXcmFwRWw9cy4kaW1hZ2VFbC5wYXJlbnQoXCIuXCIrdC5jb250YWluZXJDbGFzcykscy5tYXhSYXRpbz1zLiRpbWFnZVdyYXBFbC5hdHRyKFwiZGF0YS1zd2lwZXItem9vbVwiKXx8dC5tYXhSYXRpbywwIT09cy4kaW1hZ2VXcmFwRWwubGVuZ3RoKT8ocy4kaW1hZ2VFbCYmcy4kaW1hZ2VFbC50cmFuc2l0aW9uKDApLHRoaXMuem9vbS5pc1NjYWxpbmc9ITApOnMuJGltYWdlRWw9dm9pZCAwfSxvbkdlc3R1cmVDaGFuZ2U6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5wYXJhbXMuem9vbSxpPXRoaXMuem9vbSxzPWkuZ2VzdHVyZTtpZighaC5nZXN0dXJlcyl7aWYoXCJ0b3VjaG1vdmVcIiE9PWUudHlwZXx8XCJ0b3VjaG1vdmVcIj09PWUudHlwZSYmZS50YXJnZXRUb3VjaGVzLmxlbmd0aDwyKXJldHVybjtpLmZha2VHZXN0dXJlTW92ZWQ9ITAscy5zY2FsZU1vdmU9aGUuZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlcyhlKX1zLiRpbWFnZUVsJiYwIT09cy4kaW1hZ2VFbC5sZW5ndGgmJihpLnNjYWxlPWguZ2VzdHVyZXM/ZS5zY2FsZSppLmN1cnJlbnRTY2FsZTpzLnNjYWxlTW92ZS9zLnNjYWxlU3RhcnQqaS5jdXJyZW50U2NhbGUsaS5zY2FsZT5zLm1heFJhdGlvJiYoaS5zY2FsZT1zLm1heFJhdGlvLTErTWF0aC5wb3coaS5zY2FsZS1zLm1heFJhdGlvKzEsLjUpKSxpLnNjYWxlPHQubWluUmF0aW8mJihpLnNjYWxlPXQubWluUmF0aW8rMS1NYXRoLnBvdyh0Lm1pblJhdGlvLWkuc2NhbGUrMSwuNSkpLHMuJGltYWdlRWwudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKFwiK2kuc2NhbGUrXCIpXCIpKX0sb25HZXN0dXJlRW5kOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyYW1zLnpvb20saT10aGlzLnpvb20scz1pLmdlc3R1cmU7aWYoIWguZ2VzdHVyZXMpe2lmKCFpLmZha2VHZXN0dXJlVG91Y2hlZHx8IWkuZmFrZUdlc3R1cmVNb3ZlZClyZXR1cm47aWYoXCJ0b3VjaGVuZFwiIT09ZS50eXBlfHxcInRvdWNoZW5kXCI9PT1lLnR5cGUmJmUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoPDImJiFBLmFuZHJvaWQpcmV0dXJuO2kuZmFrZUdlc3R1cmVUb3VjaGVkPSExLGkuZmFrZUdlc3R1cmVNb3ZlZD0hMX1zLiRpbWFnZUVsJiYwIT09cy4kaW1hZ2VFbC5sZW5ndGgmJihpLnNjYWxlPU1hdGgubWF4KE1hdGgubWluKGkuc2NhbGUscy5tYXhSYXRpbyksdC5taW5SYXRpbykscy4kaW1hZ2VFbC50cmFuc2l0aW9uKHRoaXMucGFyYW1zLnNwZWVkKS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoXCIraS5zY2FsZStcIilcIiksaS5jdXJyZW50U2NhbGU9aS5zY2FsZSxpLmlzU2NhbGluZz0hMSwxPT09aS5zY2FsZSYmKHMuJHNsaWRlRWw9dm9pZCAwKSl9LG9uVG91Y2hTdGFydDpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnpvb20saT10Lmdlc3R1cmUscz10LmltYWdlO2kuJGltYWdlRWwmJjAhPT1pLiRpbWFnZUVsLmxlbmd0aCYmKHMuaXNUb3VjaGVkfHwoQS5hbmRyb2lkJiZlLmNhbmNlbGFibGUmJmUucHJldmVudERlZmF1bHQoKSxzLmlzVG91Y2hlZD0hMCxzLnRvdWNoZXNTdGFydC54PVwidG91Y2hzdGFydFwiPT09ZS50eXBlP2UudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDplLnBhZ2VYLHMudG91Y2hlc1N0YXJ0Lnk9XCJ0b3VjaHN0YXJ0XCI9PT1lLnR5cGU/ZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZOmUucGFnZVkpKX0sb25Ub3VjaE1vdmU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy56b29tLGk9dC5nZXN0dXJlLHM9dC5pbWFnZSxhPXQudmVsb2NpdHk7aWYoaS4kaW1hZ2VFbCYmMCE9PWkuJGltYWdlRWwubGVuZ3RoJiYodGhpcy5hbGxvd0NsaWNrPSExLHMuaXNUb3VjaGVkJiZpLiRzbGlkZUVsKSl7cy5pc01vdmVkfHwocy53aWR0aD1pLiRpbWFnZUVsWzBdLm9mZnNldFdpZHRoLHMuaGVpZ2h0PWkuJGltYWdlRWxbMF0ub2Zmc2V0SGVpZ2h0LHMuc3RhcnRYPWQuZ2V0VHJhbnNsYXRlKGkuJGltYWdlV3JhcEVsWzBdLFwieFwiKXx8MCxzLnN0YXJ0WT1kLmdldFRyYW5zbGF0ZShpLiRpbWFnZVdyYXBFbFswXSxcInlcIil8fDAsaS5zbGlkZVdpZHRoPWkuJHNsaWRlRWxbMF0ub2Zmc2V0V2lkdGgsaS5zbGlkZUhlaWdodD1pLiRzbGlkZUVsWzBdLm9mZnNldEhlaWdodCxpLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDApLHRoaXMucnRsJiYocy5zdGFydFg9LXMuc3RhcnRYLHMuc3RhcnRZPS1zLnN0YXJ0WSkpO3ZhciByPXMud2lkdGgqdC5zY2FsZSxuPXMuaGVpZ2h0KnQuc2NhbGU7aWYoIShyPGkuc2xpZGVXaWR0aCYmbjxpLnNsaWRlSGVpZ2h0KSl7aWYocy5taW5YPU1hdGgubWluKGkuc2xpZGVXaWR0aC8yLXIvMiwwKSxzLm1heFg9LXMubWluWCxzLm1pblk9TWF0aC5taW4oaS5zbGlkZUhlaWdodC8yLW4vMiwwKSxzLm1heFk9LXMubWluWSxzLnRvdWNoZXNDdXJyZW50Lng9XCJ0b3VjaG1vdmVcIj09PWUudHlwZT9lLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg6ZS5wYWdlWCxzLnRvdWNoZXNDdXJyZW50Lnk9XCJ0b3VjaG1vdmVcIj09PWUudHlwZT9lLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk6ZS5wYWdlWSwhcy5pc01vdmVkJiYhdC5pc1NjYWxpbmcpe2lmKHRoaXMuaXNIb3Jpem9udGFsKCkmJihNYXRoLmZsb29yKHMubWluWCk9PT1NYXRoLmZsb29yKHMuc3RhcnRYKSYmcy50b3VjaGVzQ3VycmVudC54PHMudG91Y2hlc1N0YXJ0Lnh8fE1hdGguZmxvb3Iocy5tYXhYKT09PU1hdGguZmxvb3Iocy5zdGFydFgpJiZzLnRvdWNoZXNDdXJyZW50Lng+cy50b3VjaGVzU3RhcnQueCkpcmV0dXJuIHZvaWQocy5pc1RvdWNoZWQ9ITEpO2lmKCF0aGlzLmlzSG9yaXpvbnRhbCgpJiYoTWF0aC5mbG9vcihzLm1pblkpPT09TWF0aC5mbG9vcihzLnN0YXJ0WSkmJnMudG91Y2hlc0N1cnJlbnQueTxzLnRvdWNoZXNTdGFydC55fHxNYXRoLmZsb29yKHMubWF4WSk9PT1NYXRoLmZsb29yKHMuc3RhcnRZKSYmcy50b3VjaGVzQ3VycmVudC55PnMudG91Y2hlc1N0YXJ0LnkpKXJldHVybiB2b2lkKHMuaXNUb3VjaGVkPSExKX1lLmNhbmNlbGFibGUmJmUucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpLHMuaXNNb3ZlZD0hMCxzLmN1cnJlbnRYPXMudG91Y2hlc0N1cnJlbnQueC1zLnRvdWNoZXNTdGFydC54K3Muc3RhcnRYLHMuY3VycmVudFk9cy50b3VjaGVzQ3VycmVudC55LXMudG91Y2hlc1N0YXJ0Lnkrcy5zdGFydFkscy5jdXJyZW50WDxzLm1pblgmJihzLmN1cnJlbnRYPXMubWluWCsxLU1hdGgucG93KHMubWluWC1zLmN1cnJlbnRYKzEsLjgpKSxzLmN1cnJlbnRYPnMubWF4WCYmKHMuY3VycmVudFg9cy5tYXhYLTErTWF0aC5wb3cocy5jdXJyZW50WC1zLm1heFgrMSwuOCkpLHMuY3VycmVudFk8cy5taW5ZJiYocy5jdXJyZW50WT1zLm1pblkrMS1NYXRoLnBvdyhzLm1pblktcy5jdXJyZW50WSsxLC44KSkscy5jdXJyZW50WT5zLm1heFkmJihzLmN1cnJlbnRZPXMubWF4WS0xK01hdGgucG93KHMuY3VycmVudFktcy5tYXhZKzEsLjgpKSxhLnByZXZQb3NpdGlvblh8fChhLnByZXZQb3NpdGlvblg9cy50b3VjaGVzQ3VycmVudC54KSxhLnByZXZQb3NpdGlvbll8fChhLnByZXZQb3NpdGlvblk9cy50b3VjaGVzQ3VycmVudC55KSxhLnByZXZUaW1lfHwoYS5wcmV2VGltZT1EYXRlLm5vdygpKSxhLng9KHMudG91Y2hlc0N1cnJlbnQueC1hLnByZXZQb3NpdGlvblgpLyhEYXRlLm5vdygpLWEucHJldlRpbWUpLzIsYS55PShzLnRvdWNoZXNDdXJyZW50LnktYS5wcmV2UG9zaXRpb25ZKS8oRGF0ZS5ub3coKS1hLnByZXZUaW1lKS8yLE1hdGguYWJzKHMudG91Y2hlc0N1cnJlbnQueC1hLnByZXZQb3NpdGlvblgpPDImJihhLng9MCksTWF0aC5hYnMocy50b3VjaGVzQ3VycmVudC55LWEucHJldlBvc2l0aW9uWSk8MiYmKGEueT0wKSxhLnByZXZQb3NpdGlvblg9cy50b3VjaGVzQ3VycmVudC54LGEucHJldlBvc2l0aW9uWT1zLnRvdWNoZXNDdXJyZW50LnksYS5wcmV2VGltZT1EYXRlLm5vdygpLGkuJGltYWdlV3JhcEVsLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKFwiK3MuY3VycmVudFgrXCJweCwgXCIrcy5jdXJyZW50WStcInB4LDApXCIpfX19LG9uVG91Y2hFbmQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnpvb20sdD1lLmdlc3R1cmUsaT1lLmltYWdlLHM9ZS52ZWxvY2l0eTtpZih0LiRpbWFnZUVsJiYwIT09dC4kaW1hZ2VFbC5sZW5ndGgpe2lmKCFpLmlzVG91Y2hlZHx8IWkuaXNNb3ZlZClyZXR1cm4gaS5pc1RvdWNoZWQ9ITEsdm9pZChpLmlzTW92ZWQ9ITEpO2kuaXNUb3VjaGVkPSExLGkuaXNNb3ZlZD0hMTt2YXIgYT0zMDAscj0zMDAsbj1zLngqYSxvPWkuY3VycmVudFgrbixsPXMueSpyLGQ9aS5jdXJyZW50WStsOzAhPT1zLngmJihhPU1hdGguYWJzKChvLWkuY3VycmVudFgpL3MueCkpLDAhPT1zLnkmJihyPU1hdGguYWJzKChkLWkuY3VycmVudFkpL3MueSkpO3ZhciBoPU1hdGgubWF4KGEscik7aS5jdXJyZW50WD1vLGkuY3VycmVudFk9ZDt2YXIgcD1pLndpZHRoKmUuc2NhbGUsYz1pLmhlaWdodCplLnNjYWxlO2kubWluWD1NYXRoLm1pbih0LnNsaWRlV2lkdGgvMi1wLzIsMCksaS5tYXhYPS1pLm1pblgsaS5taW5ZPU1hdGgubWluKHQuc2xpZGVIZWlnaHQvMi1jLzIsMCksaS5tYXhZPS1pLm1pblksaS5jdXJyZW50WD1NYXRoLm1heChNYXRoLm1pbihpLmN1cnJlbnRYLGkubWF4WCksaS5taW5YKSxpLmN1cnJlbnRZPU1hdGgubWF4KE1hdGgubWluKGkuY3VycmVudFksaS5tYXhZKSxpLm1pblkpLHQuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oaCkudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoXCIraS5jdXJyZW50WCtcInB4LCBcIitpLmN1cnJlbnRZK1wicHgsMClcIil9fSxvblRyYW5zaXRpb25FbmQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnpvb20sdD1lLmdlc3R1cmU7dC4kc2xpZGVFbCYmdGhpcy5wcmV2aW91c0luZGV4IT09dGhpcy5hY3RpdmVJbmRleCYmKHQuJGltYWdlRWwmJnQuJGltYWdlRWwudHJhbnNmb3JtKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpXCIpLHQuJGltYWdlV3JhcEVsJiZ0LiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwLDAsMClcIiksZS5zY2FsZT0xLGUuY3VycmVudFNjYWxlPTEsdC4kc2xpZGVFbD12b2lkIDAsdC4kaW1hZ2VFbD12b2lkIDAsdC4kaW1hZ2VXcmFwRWw9dm9pZCAwKX0sdG9nZ2xlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuem9vbTt0LnNjYWxlJiYxIT09dC5zY2FsZT90Lm91dCgpOnQuaW4oZSl9LGluOmZ1bmN0aW9uKGUpe3ZhciB0LGkscyxhLHIsbixvLGwsZCxoLHAsYyx1LHYsZixtLGc9dGhpcy56b29tLGI9dGhpcy5wYXJhbXMuem9vbSx3PWcuZ2VzdHVyZSx5PWcuaW1hZ2U7KHcuJHNsaWRlRWx8fCh0aGlzLnBhcmFtcy52aXJ0dWFsJiZ0aGlzLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQmJnRoaXMudmlydHVhbD93LiRzbGlkZUVsPXRoaXMuJHdyYXBwZXJFbC5jaGlsZHJlbihcIi5cIit0aGlzLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKTp3LiRzbGlkZUVsPXRoaXMuc2xpZGVzLmVxKHRoaXMuYWN0aXZlSW5kZXgpLHcuJGltYWdlRWw9dy4kc2xpZGVFbC5maW5kKFwiaW1nLCBzdmcsIGNhbnZhcywgcGljdHVyZSwgLnN3aXBlci16b29tLXRhcmdldFwiKSx3LiRpbWFnZVdyYXBFbD13LiRpbWFnZUVsLnBhcmVudChcIi5cIitiLmNvbnRhaW5lckNsYXNzKSksdy4kaW1hZ2VFbCYmMCE9PXcuJGltYWdlRWwubGVuZ3RoKSYmKHcuJHNsaWRlRWwuYWRkQ2xhc3MoXCJcIitiLnpvb21lZFNsaWRlQ2xhc3MpLHZvaWQgMD09PXkudG91Y2hlc1N0YXJ0LngmJmU/KHQ9XCJ0b3VjaGVuZFwiPT09ZS50eXBlP2UuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg6ZS5wYWdlWCxpPVwidG91Y2hlbmRcIj09PWUudHlwZT9lLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZOmUucGFnZVkpOih0PXkudG91Y2hlc1N0YXJ0LngsaT15LnRvdWNoZXNTdGFydC55KSxnLnNjYWxlPXcuJGltYWdlV3JhcEVsLmF0dHIoXCJkYXRhLXN3aXBlci16b29tXCIpfHxiLm1heFJhdGlvLGcuY3VycmVudFNjYWxlPXcuJGltYWdlV3JhcEVsLmF0dHIoXCJkYXRhLXN3aXBlci16b29tXCIpfHxiLm1heFJhdGlvLGU/KGY9dy4kc2xpZGVFbFswXS5vZmZzZXRXaWR0aCxtPXcuJHNsaWRlRWxbMF0ub2Zmc2V0SGVpZ2h0LHM9dy4kc2xpZGVFbC5vZmZzZXQoKS5sZWZ0K2YvMi10LGE9dy4kc2xpZGVFbC5vZmZzZXQoKS50b3ArbS8yLWksbz13LiRpbWFnZUVsWzBdLm9mZnNldFdpZHRoLGw9dy4kaW1hZ2VFbFswXS5vZmZzZXRIZWlnaHQsZD1vKmcuc2NhbGUsaD1sKmcuc2NhbGUsdT0tKHA9TWF0aC5taW4oZi8yLWQvMiwwKSksdj0tKGM9TWF0aC5taW4obS8yLWgvMiwwKSksKHI9cypnLnNjYWxlKTxwJiYocj1wKSxyPnUmJihyPXUpLChuPWEqZy5zY2FsZSk8YyYmKG49Yyksbj52JiYobj12KSk6KHI9MCxuPTApLHcuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZChcIityK1wicHgsIFwiK24rXCJweCwwKVwiKSx3LiRpbWFnZUVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoXCIrZy5zY2FsZStcIilcIikpfSxvdXQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnpvb20sdD10aGlzLnBhcmFtcy56b29tLGk9ZS5nZXN0dXJlO2kuJHNsaWRlRWx8fCh0aGlzLnBhcmFtcy52aXJ0dWFsJiZ0aGlzLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQmJnRoaXMudmlydHVhbD9pLiRzbGlkZUVsPXRoaXMuJHdyYXBwZXJFbC5jaGlsZHJlbihcIi5cIit0aGlzLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKTppLiRzbGlkZUVsPXRoaXMuc2xpZGVzLmVxKHRoaXMuYWN0aXZlSW5kZXgpLGkuJGltYWdlRWw9aS4kc2xpZGVFbC5maW5kKFwiaW1nLCBzdmcsIGNhbnZhcywgcGljdHVyZSwgLnN3aXBlci16b29tLXRhcmdldFwiKSxpLiRpbWFnZVdyYXBFbD1pLiRpbWFnZUVsLnBhcmVudChcIi5cIit0LmNvbnRhaW5lckNsYXNzKSksaS4kaW1hZ2VFbCYmMCE9PWkuJGltYWdlRWwubGVuZ3RoJiYoZS5zY2FsZT0xLGUuY3VycmVudFNjYWxlPTEsaS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKDAsMCwwKVwiKSxpLiRpbWFnZUVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoMSlcIiksaS4kc2xpZGVFbC5yZW1vdmVDbGFzcyhcIlwiK3Quem9vbWVkU2xpZGVDbGFzcyksaS4kc2xpZGVFbD12b2lkIDApfSxlbmFibGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnpvb207aWYoIWUuZW5hYmxlZCl7ZS5lbmFibGVkPSEwO3ZhciB0PSEoXCJ0b3VjaHN0YXJ0XCIhPT10aGlzLnRvdWNoRXZlbnRzLnN0YXJ0fHwhaC5wYXNzaXZlTGlzdGVuZXJ8fCF0aGlzLnBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzKSYme3Bhc3NpdmU6ITAsY2FwdHVyZTohMX0saT0haC5wYXNzaXZlTGlzdGVuZXJ8fHtwYXNzaXZlOiExLGNhcHR1cmU6ITB9LHM9XCIuXCIrdGhpcy5wYXJhbXMuc2xpZGVDbGFzcztoLmdlc3R1cmVzPyh0aGlzLiR3cmFwcGVyRWwub24oXCJnZXN0dXJlc3RhcnRcIixzLGUub25HZXN0dXJlU3RhcnQsdCksdGhpcy4kd3JhcHBlckVsLm9uKFwiZ2VzdHVyZWNoYW5nZVwiLHMsZS5vbkdlc3R1cmVDaGFuZ2UsdCksdGhpcy4kd3JhcHBlckVsLm9uKFwiZ2VzdHVyZWVuZFwiLHMsZS5vbkdlc3R1cmVFbmQsdCkpOlwidG91Y2hzdGFydFwiPT09dGhpcy50b3VjaEV2ZW50cy5zdGFydCYmKHRoaXMuJHdyYXBwZXJFbC5vbih0aGlzLnRvdWNoRXZlbnRzLnN0YXJ0LHMsZS5vbkdlc3R1cmVTdGFydCx0KSx0aGlzLiR3cmFwcGVyRWwub24odGhpcy50b3VjaEV2ZW50cy5tb3ZlLHMsZS5vbkdlc3R1cmVDaGFuZ2UsaSksdGhpcy4kd3JhcHBlckVsLm9uKHRoaXMudG91Y2hFdmVudHMuZW5kLHMsZS5vbkdlc3R1cmVFbmQsdCksdGhpcy50b3VjaEV2ZW50cy5jYW5jZWwmJnRoaXMuJHdyYXBwZXJFbC5vbih0aGlzLnRvdWNoRXZlbnRzLmNhbmNlbCxzLGUub25HZXN0dXJlRW5kLHQpKSx0aGlzLiR3cmFwcGVyRWwub24odGhpcy50b3VjaEV2ZW50cy5tb3ZlLFwiLlwiK3RoaXMucGFyYW1zLnpvb20uY29udGFpbmVyQ2xhc3MsZS5vblRvdWNoTW92ZSxpKX19LGRpc2FibGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnpvb207aWYoZS5lbmFibGVkKXt0aGlzLnpvb20uZW5hYmxlZD0hMTt2YXIgdD0hKFwidG91Y2hzdGFydFwiIT09dGhpcy50b3VjaEV2ZW50cy5zdGFydHx8IWgucGFzc2l2ZUxpc3RlbmVyfHwhdGhpcy5wYXJhbXMucGFzc2l2ZUxpc3RlbmVycykmJntwYXNzaXZlOiEwLGNhcHR1cmU6ITF9LGk9IWgucGFzc2l2ZUxpc3RlbmVyfHx7cGFzc2l2ZTohMSxjYXB0dXJlOiEwfSxzPVwiLlwiK3RoaXMucGFyYW1zLnNsaWRlQ2xhc3M7aC5nZXN0dXJlcz8odGhpcy4kd3JhcHBlckVsLm9mZihcImdlc3R1cmVzdGFydFwiLHMsZS5vbkdlc3R1cmVTdGFydCx0KSx0aGlzLiR3cmFwcGVyRWwub2ZmKFwiZ2VzdHVyZWNoYW5nZVwiLHMsZS5vbkdlc3R1cmVDaGFuZ2UsdCksdGhpcy4kd3JhcHBlckVsLm9mZihcImdlc3R1cmVlbmRcIixzLGUub25HZXN0dXJlRW5kLHQpKTpcInRvdWNoc3RhcnRcIj09PXRoaXMudG91Y2hFdmVudHMuc3RhcnQmJih0aGlzLiR3cmFwcGVyRWwub2ZmKHRoaXMudG91Y2hFdmVudHMuc3RhcnQscyxlLm9uR2VzdHVyZVN0YXJ0LHQpLHRoaXMuJHdyYXBwZXJFbC5vZmYodGhpcy50b3VjaEV2ZW50cy5tb3ZlLHMsZS5vbkdlc3R1cmVDaGFuZ2UsaSksdGhpcy4kd3JhcHBlckVsLm9mZih0aGlzLnRvdWNoRXZlbnRzLmVuZCxzLGUub25HZXN0dXJlRW5kLHQpLHRoaXMudG91Y2hFdmVudHMuY2FuY2VsJiZ0aGlzLiR3cmFwcGVyRWwub2ZmKHRoaXMudG91Y2hFdmVudHMuY2FuY2VsLHMsZS5vbkdlc3R1cmVFbmQsdCkpLHRoaXMuJHdyYXBwZXJFbC5vZmYodGhpcy50b3VjaEV2ZW50cy5tb3ZlLFwiLlwiK3RoaXMucGFyYW1zLnpvb20uY29udGFpbmVyQ2xhc3MsZS5vblRvdWNoTW92ZSxpKX19fSxwZT17bG9hZEluU2xpZGU6ZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT10JiYodD0hMCk7dmFyIGk9dGhpcyxzPWkucGFyYW1zLmxhenk7aWYodm9pZCAwIT09ZSYmMCE9PWkuc2xpZGVzLmxlbmd0aCl7dmFyIGE9aS52aXJ0dWFsJiZpLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ/aS4kd3JhcHBlckVsLmNoaWxkcmVuKFwiLlwiK2kucGFyYW1zLnNsaWRlQ2xhc3MrJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrZSsnXCJdJyk6aS5zbGlkZXMuZXEoZSkscj1hLmZpbmQoXCIuXCIrcy5lbGVtZW50Q2xhc3MrXCI6bm90KC5cIitzLmxvYWRlZENsYXNzK1wiKTpub3QoLlwiK3MubG9hZGluZ0NsYXNzK1wiKVwiKTshYS5oYXNDbGFzcyhzLmVsZW1lbnRDbGFzcyl8fGEuaGFzQ2xhc3Mocy5sb2FkZWRDbGFzcyl8fGEuaGFzQ2xhc3Mocy5sb2FkaW5nQ2xhc3MpfHwocj1yLmFkZChhWzBdKSksMCE9PXIubGVuZ3RoJiZyLmVhY2goKGZ1bmN0aW9uKGUscil7dmFyIG89bihyKTtvLmFkZENsYXNzKHMubG9hZGluZ0NsYXNzKTt2YXIgbD1vLmF0dHIoXCJkYXRhLWJhY2tncm91bmRcIiksZD1vLmF0dHIoXCJkYXRhLXNyY1wiKSxoPW8uYXR0cihcImRhdGEtc3Jjc2V0XCIpLHA9by5hdHRyKFwiZGF0YS1zaXplc1wiKSxjPW8ucGFyZW50KFwicGljdHVyZVwiKTtpLmxvYWRJbWFnZShvWzBdLGR8fGwsaCxwLCExLChmdW5jdGlvbigpe2lmKG51bGwhPWkmJmkmJighaXx8aS5wYXJhbXMpJiYhaS5kZXN0cm95ZWQpe2lmKGw/KG8uY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCd1cmwoXCInK2wrJ1wiKScpLG8ucmVtb3ZlQXR0cihcImRhdGEtYmFja2dyb3VuZFwiKSk6KGgmJihvLmF0dHIoXCJzcmNzZXRcIixoKSxvLnJlbW92ZUF0dHIoXCJkYXRhLXNyY3NldFwiKSkscCYmKG8uYXR0cihcInNpemVzXCIscCksby5yZW1vdmVBdHRyKFwiZGF0YS1zaXplc1wiKSksYy5sZW5ndGgmJmMuY2hpbGRyZW4oXCJzb3VyY2VcIikuZWFjaCgoZnVuY3Rpb24oZSx0KXt2YXIgaT1uKHQpO2kuYXR0cihcImRhdGEtc3Jjc2V0XCIpJiYoaS5hdHRyKFwic3Jjc2V0XCIsaS5hdHRyKFwiZGF0YS1zcmNzZXRcIikpLGkucmVtb3ZlQXR0cihcImRhdGEtc3Jjc2V0XCIpKX0pKSxkJiYoby5hdHRyKFwic3JjXCIsZCksby5yZW1vdmVBdHRyKFwiZGF0YS1zcmNcIikpKSxvLmFkZENsYXNzKHMubG9hZGVkQ2xhc3MpLnJlbW92ZUNsYXNzKHMubG9hZGluZ0NsYXNzKSxhLmZpbmQoXCIuXCIrcy5wcmVsb2FkZXJDbGFzcykucmVtb3ZlKCksaS5wYXJhbXMubG9vcCYmdCl7dmFyIGU9YS5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIik7aWYoYS5oYXNDbGFzcyhpLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSl7dmFyIHI9aS4kd3JhcHBlckVsLmNoaWxkcmVuKCdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK2UrJ1wiXTpub3QoLicraS5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcytcIilcIik7aS5sYXp5LmxvYWRJblNsaWRlKHIuaW5kZXgoKSwhMSl9ZWxzZXt2YXIgdT1pLiR3cmFwcGVyRWwuY2hpbGRyZW4oXCIuXCIraS5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcysnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJytlKydcIl0nKTtpLmxhenkubG9hZEluU2xpZGUodS5pbmRleCgpLCExKX19aS5lbWl0KFwibGF6eUltYWdlUmVhZHlcIixhWzBdLG9bMF0pLGkucGFyYW1zLmF1dG9IZWlnaHQmJmkudXBkYXRlQXV0b0hlaWdodCgpfX0pKSxpLmVtaXQoXCJsYXp5SW1hZ2VMb2FkXCIsYVswXSxvWzBdKX0pKX19LGxvYWQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kd3JhcHBlckVsLGk9ZS5wYXJhbXMscz1lLnNsaWRlcyxhPWUuYWN0aXZlSW5kZXgscj1lLnZpcnR1YWwmJmkudmlydHVhbC5lbmFibGVkLG89aS5sYXp5LGw9aS5zbGlkZXNQZXJWaWV3O2Z1bmN0aW9uIGQoZSl7aWYocil7aWYodC5jaGlsZHJlbihcIi5cIitpLnNsaWRlQ2xhc3MrJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrZSsnXCJdJykubGVuZ3RoKXJldHVybiEwfWVsc2UgaWYoc1tlXSlyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiBoKGUpe3JldHVybiByP24oZSkuYXR0cihcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpOm4oZSkuaW5kZXgoKX1pZihcImF1dG9cIj09PWwmJihsPTApLGUubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWR8fChlLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkPSEwKSxlLnBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpdC5jaGlsZHJlbihcIi5cIitpLnNsaWRlVmlzaWJsZUNsYXNzKS5lYWNoKChmdW5jdGlvbih0LGkpe3ZhciBzPXI/bihpKS5hdHRyKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIik6bihpKS5pbmRleCgpO2UubGF6eS5sb2FkSW5TbGlkZShzKX0pKTtlbHNlIGlmKGw+MSlmb3IodmFyIHA9YTtwPGErbDtwKz0xKWQocCkmJmUubGF6eS5sb2FkSW5TbGlkZShwKTtlbHNlIGUubGF6eS5sb2FkSW5TbGlkZShhKTtpZihvLmxvYWRQcmV2TmV4dClpZihsPjF8fG8ubG9hZFByZXZOZXh0QW1vdW50JiZvLmxvYWRQcmV2TmV4dEFtb3VudD4xKXtmb3IodmFyIGM9by5sb2FkUHJldk5leHRBbW91bnQsdT1sLHY9TWF0aC5taW4oYSt1K01hdGgubWF4KGMsdSkscy5sZW5ndGgpLGY9TWF0aC5tYXgoYS1NYXRoLm1heCh1LGMpLDApLG09YStsO208djttKz0xKWQobSkmJmUubGF6eS5sb2FkSW5TbGlkZShtKTtmb3IodmFyIGc9ZjtnPGE7Zys9MSlkKGcpJiZlLmxhenkubG9hZEluU2xpZGUoZyl9ZWxzZXt2YXIgYj10LmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVOZXh0Q2xhc3MpO2IubGVuZ3RoPjAmJmUubGF6eS5sb2FkSW5TbGlkZShoKGIpKTt2YXIgdz10LmNoaWxkcmVuKFwiLlwiK2kuc2xpZGVQcmV2Q2xhc3MpO3cubGVuZ3RoPjAmJmUubGF6eS5sb2FkSW5TbGlkZShoKHcpKX19fSxjZT17TGluZWFyU3BsaW5lOmZ1bmN0aW9uKGUsdCl7dmFyIGkscyxhLHIsbixvPWZ1bmN0aW9uKGUsdCl7Zm9yKHM9LTEsaT1lLmxlbmd0aDtpLXM+MTspZVthPWkrcz4+MV08PXQ/cz1hOmk9YTtyZXR1cm4gaX07cmV0dXJuIHRoaXMueD1lLHRoaXMueT10LHRoaXMubGFzdEluZGV4PWUubGVuZ3RoLTEsdGhpcy5pbnRlcnBvbGF0ZT1mdW5jdGlvbihlKXtyZXR1cm4gZT8obj1vKHRoaXMueCxlKSxyPW4tMSwoZS10aGlzLnhbcl0pKih0aGlzLnlbbl0tdGhpcy55W3JdKS8odGhpcy54W25dLXRoaXMueFtyXSkrdGhpcy55W3JdKTowfSx0aGlzfSxnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uOmZ1bmN0aW9uKGUpe3RoaXMuY29udHJvbGxlci5zcGxpbmV8fCh0aGlzLmNvbnRyb2xsZXIuc3BsaW5lPXRoaXMucGFyYW1zLmxvb3A/bmV3IGNlLkxpbmVhclNwbGluZSh0aGlzLnNsaWRlc0dyaWQsZS5zbGlkZXNHcmlkKTpuZXcgY2UuTGluZWFyU3BsaW5lKHRoaXMuc25hcEdyaWQsZS5zbmFwR3JpZCkpfSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oZSx0KXt2YXIgaSxzLGE9dGhpcyxyPWEuY29udHJvbGxlci5jb250cm9sO2Z1bmN0aW9uIG4oZSl7dmFyIHQ9YS5ydGxUcmFuc2xhdGU/LWEudHJhbnNsYXRlOmEudHJhbnNsYXRlO1wic2xpZGVcIj09PWEucGFyYW1zLmNvbnRyb2xsZXIuYnkmJihhLmNvbnRyb2xsZXIuZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbihlKSxzPS1hLmNvbnRyb2xsZXIuc3BsaW5lLmludGVycG9sYXRlKC10KSkscyYmXCJjb250YWluZXJcIiE9PWEucGFyYW1zLmNvbnRyb2xsZXIuYnl8fChpPShlLm1heFRyYW5zbGF0ZSgpLWUubWluVHJhbnNsYXRlKCkpLyhhLm1heFRyYW5zbGF0ZSgpLWEubWluVHJhbnNsYXRlKCkpLHM9KHQtYS5taW5UcmFuc2xhdGUoKSkqaStlLm1pblRyYW5zbGF0ZSgpKSxhLnBhcmFtcy5jb250cm9sbGVyLmludmVyc2UmJihzPWUubWF4VHJhbnNsYXRlKCktcyksZS51cGRhdGVQcm9ncmVzcyhzKSxlLnNldFRyYW5zbGF0ZShzLGEpLGUudXBkYXRlQWN0aXZlSW5kZXgoKSxlLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKX1pZihBcnJheS5pc0FycmF5KHIpKWZvcih2YXIgbz0wO288ci5sZW5ndGg7bys9MSlyW29dIT09dCYmcltvXWluc3RhbmNlb2YgaiYmbihyW29dKTtlbHNlIHIgaW5zdGFuY2VvZiBqJiZ0IT09ciYmbihyKX0sc2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlLHQpe3ZhciBpLHM9dGhpcyxhPXMuY29udHJvbGxlci5jb250cm9sO2Z1bmN0aW9uIHIodCl7dC5zZXRUcmFuc2l0aW9uKGUscyksMCE9PWUmJih0LnRyYW5zaXRpb25TdGFydCgpLHQucGFyYW1zLmF1dG9IZWlnaHQmJmQubmV4dFRpY2soKGZ1bmN0aW9uKCl7dC51cGRhdGVBdXRvSGVpZ2h0KCl9KSksdC4kd3JhcHBlckVsLnRyYW5zaXRpb25FbmQoKGZ1bmN0aW9uKCl7YSYmKHQucGFyYW1zLmxvb3AmJlwic2xpZGVcIj09PXMucGFyYW1zLmNvbnRyb2xsZXIuYnkmJnQubG9vcEZpeCgpLHQudHJhbnNpdGlvbkVuZCgpKX0pKSl9aWYoQXJyYXkuaXNBcnJheShhKSlmb3IoaT0wO2k8YS5sZW5ndGg7aSs9MSlhW2ldIT09dCYmYVtpXWluc3RhbmNlb2YgaiYmcihhW2ldKTtlbHNlIGEgaW5zdGFuY2VvZiBqJiZ0IT09YSYmcihhKX19LHVlPXttYWtlRWxGb2N1c2FibGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuYXR0cihcInRhYkluZGV4XCIsXCIwXCIpLGV9LG1ha2VFbE5vdEZvY3VzYWJsZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5hdHRyKFwidGFiSW5kZXhcIixcIi0xXCIpLGV9LGFkZEVsUm9sZTpmdW5jdGlvbihlLHQpe3JldHVybiBlLmF0dHIoXCJyb2xlXCIsdCksZX0sYWRkRWxMYWJlbDpmdW5jdGlvbihlLHQpe3JldHVybiBlLmF0dHIoXCJhcmlhLWxhYmVsXCIsdCksZX0sZGlzYWJsZUVsOmZ1bmN0aW9uKGUpe3JldHVybiBlLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsITApLGV9LGVuYWJsZUVsOmZ1bmN0aW9uKGUpe3JldHVybiBlLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsITEpLGV9LG9uRW50ZXJLZXk6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5wYXJhbXMuYTExeTtpZigxMz09PWUua2V5Q29kZSl7dmFyIGk9bihlLnRhcmdldCk7dGhpcy5uYXZpZ2F0aW9uJiZ0aGlzLm5hdmlnYXRpb24uJG5leHRFbCYmaS5pcyh0aGlzLm5hdmlnYXRpb24uJG5leHRFbCkmJih0aGlzLmlzRW5kJiYhdGhpcy5wYXJhbXMubG9vcHx8dGhpcy5zbGlkZU5leHQoKSx0aGlzLmlzRW5kP3RoaXMuYTExeS5ub3RpZnkodC5sYXN0U2xpZGVNZXNzYWdlKTp0aGlzLmExMXkubm90aWZ5KHQubmV4dFNsaWRlTWVzc2FnZSkpLHRoaXMubmF2aWdhdGlvbiYmdGhpcy5uYXZpZ2F0aW9uLiRwcmV2RWwmJmkuaXModGhpcy5uYXZpZ2F0aW9uLiRwcmV2RWwpJiYodGhpcy5pc0JlZ2lubmluZyYmIXRoaXMucGFyYW1zLmxvb3B8fHRoaXMuc2xpZGVQcmV2KCksdGhpcy5pc0JlZ2lubmluZz90aGlzLmExMXkubm90aWZ5KHQuZmlyc3RTbGlkZU1lc3NhZ2UpOnRoaXMuYTExeS5ub3RpZnkodC5wcmV2U2xpZGVNZXNzYWdlKSksdGhpcy5wYWdpbmF0aW9uJiZpLmlzKFwiLlwiK3RoaXMucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpJiZpWzBdLmNsaWNrKCl9fSxub3RpZnk6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5hMTF5LmxpdmVSZWdpb247MCE9PXQubGVuZ3RoJiYodC5odG1sKFwiXCIpLHQuaHRtbChlKSl9LHVwZGF0ZU5hdmlnYXRpb246ZnVuY3Rpb24oKXtpZighdGhpcy5wYXJhbXMubG9vcCYmdGhpcy5uYXZpZ2F0aW9uKXt2YXIgZT10aGlzLm5hdmlnYXRpb24sdD1lLiRuZXh0RWwsaT1lLiRwcmV2RWw7aSYmaS5sZW5ndGg+MCYmKHRoaXMuaXNCZWdpbm5pbmc/KHRoaXMuYTExeS5kaXNhYmxlRWwoaSksdGhpcy5hMTF5Lm1ha2VFbE5vdEZvY3VzYWJsZShpKSk6KHRoaXMuYTExeS5lbmFibGVFbChpKSx0aGlzLmExMXkubWFrZUVsRm9jdXNhYmxlKGkpKSksdCYmdC5sZW5ndGg+MCYmKHRoaXMuaXNFbmQ/KHRoaXMuYTExeS5kaXNhYmxlRWwodCksdGhpcy5hMTF5Lm1ha2VFbE5vdEZvY3VzYWJsZSh0KSk6KHRoaXMuYTExeS5lbmFibGVFbCh0KSx0aGlzLmExMXkubWFrZUVsRm9jdXNhYmxlKHQpKSl9fSx1cGRhdGVQYWdpbmF0aW9uOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUucGFyYW1zLmExMXk7ZS5wYWdpbmF0aW9uJiZlLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSYmZS5wYWdpbmF0aW9uLmJ1bGxldHMmJmUucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCYmZS5wYWdpbmF0aW9uLmJ1bGxldHMuZWFjaCgoZnVuY3Rpb24oaSxzKXt2YXIgYT1uKHMpO2UuYTExeS5tYWtlRWxGb2N1c2FibGUoYSksZS5hMTF5LmFkZEVsUm9sZShhLFwiYnV0dG9uXCIpLGUuYTExeS5hZGRFbExhYmVsKGEsdC5wYWdpbmF0aW9uQnVsbGV0TWVzc2FnZS5yZXBsYWNlKC9cXHtcXHtpbmRleFxcfVxcfS8sYS5pbmRleCgpKzEpKX0pKX0saW5pdDpmdW5jdGlvbigpe3RoaXMuJGVsLmFwcGVuZCh0aGlzLmExMXkubGl2ZVJlZ2lvbik7dmFyIGUsdCxpPXRoaXMucGFyYW1zLmExMXk7dGhpcy5uYXZpZ2F0aW9uJiZ0aGlzLm5hdmlnYXRpb24uJG5leHRFbCYmKGU9dGhpcy5uYXZpZ2F0aW9uLiRuZXh0RWwpLHRoaXMubmF2aWdhdGlvbiYmdGhpcy5uYXZpZ2F0aW9uLiRwcmV2RWwmJih0PXRoaXMubmF2aWdhdGlvbi4kcHJldkVsKSxlJiYodGhpcy5hMTF5Lm1ha2VFbEZvY3VzYWJsZShlKSx0aGlzLmExMXkuYWRkRWxSb2xlKGUsXCJidXR0b25cIiksdGhpcy5hMTF5LmFkZEVsTGFiZWwoZSxpLm5leHRTbGlkZU1lc3NhZ2UpLGUub24oXCJrZXlkb3duXCIsdGhpcy5hMTF5Lm9uRW50ZXJLZXkpKSx0JiYodGhpcy5hMTF5Lm1ha2VFbEZvY3VzYWJsZSh0KSx0aGlzLmExMXkuYWRkRWxSb2xlKHQsXCJidXR0b25cIiksdGhpcy5hMTF5LmFkZEVsTGFiZWwodCxpLnByZXZTbGlkZU1lc3NhZ2UpLHQub24oXCJrZXlkb3duXCIsdGhpcy5hMTF5Lm9uRW50ZXJLZXkpKSx0aGlzLnBhZ2luYXRpb24mJnRoaXMucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlJiZ0aGlzLnBhZ2luYXRpb24uYnVsbGV0cyYmdGhpcy5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoJiZ0aGlzLnBhZ2luYXRpb24uJGVsLm9uKFwia2V5ZG93blwiLFwiLlwiK3RoaXMucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MsdGhpcy5hMTF5Lm9uRW50ZXJLZXkpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dmFyIGUsdDt0aGlzLmExMXkubGl2ZVJlZ2lvbiYmdGhpcy5hMTF5LmxpdmVSZWdpb24ubGVuZ3RoPjAmJnRoaXMuYTExeS5saXZlUmVnaW9uLnJlbW92ZSgpLHRoaXMubmF2aWdhdGlvbiYmdGhpcy5uYXZpZ2F0aW9uLiRuZXh0RWwmJihlPXRoaXMubmF2aWdhdGlvbi4kbmV4dEVsKSx0aGlzLm5hdmlnYXRpb24mJnRoaXMubmF2aWdhdGlvbi4kcHJldkVsJiYodD10aGlzLm5hdmlnYXRpb24uJHByZXZFbCksZSYmZS5vZmYoXCJrZXlkb3duXCIsdGhpcy5hMTF5Lm9uRW50ZXJLZXkpLHQmJnQub2ZmKFwia2V5ZG93blwiLHRoaXMuYTExeS5vbkVudGVyS2V5KSx0aGlzLnBhZ2luYXRpb24mJnRoaXMucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlJiZ0aGlzLnBhZ2luYXRpb24uYnVsbGV0cyYmdGhpcy5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoJiZ0aGlzLnBhZ2luYXRpb24uJGVsLm9mZihcImtleWRvd25cIixcIi5cIit0aGlzLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzLHRoaXMuYTExeS5vbkVudGVyS2V5KX19LHZlPXtpbml0OmZ1bmN0aW9uKCl7aWYodGhpcy5wYXJhbXMuaGlzdG9yeSl7aWYoIWEuaGlzdG9yeXx8IWEuaGlzdG9yeS5wdXNoU3RhdGUpcmV0dXJuIHRoaXMucGFyYW1zLmhpc3RvcnkuZW5hYmxlZD0hMSx2b2lkKHRoaXMucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQ9ITApO3ZhciBlPXRoaXMuaGlzdG9yeTtlLmluaXRpYWxpemVkPSEwLGUucGF0aHM9dmUuZ2V0UGF0aFZhbHVlcygpLChlLnBhdGhzLmtleXx8ZS5wYXRocy52YWx1ZSkmJihlLnNjcm9sbFRvU2xpZGUoMCxlLnBhdGhzLnZhbHVlLHRoaXMucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCksdGhpcy5wYXJhbXMuaGlzdG9yeS5yZXBsYWNlU3RhdGV8fGEuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsdGhpcy5oaXN0b3J5LnNldEhpc3RvcnlQb3BTdGF0ZSkpfX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlfHxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLHRoaXMuaGlzdG9yeS5zZXRIaXN0b3J5UG9wU3RhdGUpfSxzZXRIaXN0b3J5UG9wU3RhdGU6ZnVuY3Rpb24oKXt0aGlzLmhpc3RvcnkucGF0aHM9dmUuZ2V0UGF0aFZhbHVlcygpLHRoaXMuaGlzdG9yeS5zY3JvbGxUb1NsaWRlKHRoaXMucGFyYW1zLnNwZWVkLHRoaXMuaGlzdG9yeS5wYXRocy52YWx1ZSwhMSl9LGdldFBhdGhWYWx1ZXM6ZnVuY3Rpb24oKXt2YXIgZT1hLmxvY2F0aW9uLnBhdGhuYW1lLnNsaWNlKDEpLnNwbGl0KFwiL1wiKS5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVyblwiXCIhPT1lfSkpLHQ9ZS5sZW5ndGg7cmV0dXJue2tleTplW3QtMl0sdmFsdWU6ZVt0LTFdfX0sc2V0SGlzdG9yeTpmdW5jdGlvbihlLHQpe2lmKHRoaXMuaGlzdG9yeS5pbml0aWFsaXplZCYmdGhpcy5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKXt2YXIgaT10aGlzLnNsaWRlcy5lcSh0KSxzPXZlLnNsdWdpZnkoaS5hdHRyKFwiZGF0YS1oaXN0b3J5XCIpKTthLmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKGUpfHwocz1lK1wiL1wiK3MpO3ZhciByPWEuaGlzdG9yeS5zdGF0ZTtyJiZyLnZhbHVlPT09c3x8KHRoaXMucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlP2EuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe3ZhbHVlOnN9LG51bGwscyk6YS5oaXN0b3J5LnB1c2hTdGF0ZSh7dmFsdWU6c30sbnVsbCxzKSl9fSxzbHVnaWZ5OmZ1bmN0aW9uKGUpe3JldHVybiBlLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxzKy9nLFwiLVwiKS5yZXBsYWNlKC9bXlxcdy1dKy9nLFwiXCIpLnJlcGxhY2UoLy0tKy9nLFwiLVwiKS5yZXBsYWNlKC9eLSsvLFwiXCIpLnJlcGxhY2UoLy0rJC8sXCJcIil9LHNjcm9sbFRvU2xpZGU6ZnVuY3Rpb24oZSx0LGkpe2lmKHQpZm9yKHZhciBzPTAsYT10aGlzLnNsaWRlcy5sZW5ndGg7czxhO3MrPTEpe3ZhciByPXRoaXMuc2xpZGVzLmVxKHMpO2lmKHZlLnNsdWdpZnkoci5hdHRyKFwiZGF0YS1oaXN0b3J5XCIpKT09PXQmJiFyLmhhc0NsYXNzKHRoaXMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKXt2YXIgbj1yLmluZGV4KCk7dGhpcy5zbGlkZVRvKG4sZSxpKX19ZWxzZSB0aGlzLnNsaWRlVG8oMCxlLGkpfX0sZmU9e29uSGFzaENhbmdlOmZ1bmN0aW9uKCl7dGhpcy5lbWl0KFwiaGFzaENoYW5nZVwiKTt2YXIgZT1pLmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIixcIlwiKTtpZihlIT09dGhpcy5zbGlkZXMuZXEodGhpcy5hY3RpdmVJbmRleCkuYXR0cihcImRhdGEtaGFzaFwiKSl7dmFyIHQ9dGhpcy4kd3JhcHBlckVsLmNoaWxkcmVuKFwiLlwiK3RoaXMucGFyYW1zLnNsaWRlQ2xhc3MrJ1tkYXRhLWhhc2g9XCInK2UrJ1wiXScpLmluZGV4KCk7aWYodm9pZCAwPT09dClyZXR1cm47dGhpcy5zbGlkZVRvKHQpfX0sc2V0SGFzaDpmdW5jdGlvbigpe2lmKHRoaXMuaGFzaE5hdmlnYXRpb24uaW5pdGlhbGl6ZWQmJnRoaXMucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpaWYodGhpcy5wYXJhbXMuaGFzaE5hdmlnYXRpb24ucmVwbGFjZVN0YXRlJiZhLmhpc3RvcnkmJmEuaGlzdG9yeS5yZXBsYWNlU3RhdGUpYS5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLG51bGwsXCIjXCIrdGhpcy5zbGlkZXMuZXEodGhpcy5hY3RpdmVJbmRleCkuYXR0cihcImRhdGEtaGFzaFwiKXx8XCJcIiksdGhpcy5lbWl0KFwiaGFzaFNldFwiKTtlbHNle3ZhciBlPXRoaXMuc2xpZGVzLmVxKHRoaXMuYWN0aXZlSW5kZXgpLHQ9ZS5hdHRyKFwiZGF0YS1oYXNoXCIpfHxlLmF0dHIoXCJkYXRhLWhpc3RvcnlcIik7aS5sb2NhdGlvbi5oYXNoPXR8fFwiXCIsdGhpcy5lbWl0KFwiaGFzaFNldFwiKX19LGluaXQ6ZnVuY3Rpb24oKXtpZighKCF0aGlzLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkfHx0aGlzLnBhcmFtcy5oaXN0b3J5JiZ0aGlzLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpKXt0aGlzLmhhc2hOYXZpZ2F0aW9uLmluaXRpYWxpemVkPSEwO3ZhciBlPWkubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLFwiXCIpO2lmKGUpZm9yKHZhciB0PTAscz10aGlzLnNsaWRlcy5sZW5ndGg7dDxzO3QrPTEpe3ZhciByPXRoaXMuc2xpZGVzLmVxKHQpO2lmKChyLmF0dHIoXCJkYXRhLWhhc2hcIil8fHIuYXR0cihcImRhdGEtaGlzdG9yeVwiKSk9PT1lJiYhci5oYXNDbGFzcyh0aGlzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSl7dmFyIG89ci5pbmRleCgpO3RoaXMuc2xpZGVUbyhvLDAsdGhpcy5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0LCEwKX19dGhpcy5wYXJhbXMuaGFzaE5hdmlnYXRpb24ud2F0Y2hTdGF0ZSYmbihhKS5vbihcImhhc2hjaGFuZ2VcIix0aGlzLmhhc2hOYXZpZ2F0aW9uLm9uSGFzaENhbmdlKX19LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi53YXRjaFN0YXRlJiZuKGEpLm9mZihcImhhc2hjaGFuZ2VcIix0aGlzLmhhc2hOYXZpZ2F0aW9uLm9uSGFzaENhbmdlKX19LG1lPXtydW46ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS5zbGlkZXMuZXEoZS5hY3RpdmVJbmRleCksaT1lLnBhcmFtcy5hdXRvcGxheS5kZWxheTt0LmF0dHIoXCJkYXRhLXN3aXBlci1hdXRvcGxheVwiKSYmKGk9dC5hdHRyKFwiZGF0YS1zd2lwZXItYXV0b3BsYXlcIil8fGUucGFyYW1zLmF1dG9wbGF5LmRlbGF5KSxjbGVhclRpbWVvdXQoZS5hdXRvcGxheS50aW1lb3V0KSxlLmF1dG9wbGF5LnRpbWVvdXQ9ZC5uZXh0VGljaygoZnVuY3Rpb24oKXtlLnBhcmFtcy5hdXRvcGxheS5yZXZlcnNlRGlyZWN0aW9uP2UucGFyYW1zLmxvb3A/KGUubG9vcEZpeCgpLGUuc2xpZGVQcmV2KGUucGFyYW1zLnNwZWVkLCEwLCEwKSxlLmVtaXQoXCJhdXRvcGxheVwiKSk6ZS5pc0JlZ2lubmluZz9lLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGU/ZS5hdXRvcGxheS5zdG9wKCk6KGUuc2xpZGVUbyhlLnNsaWRlcy5sZW5ndGgtMSxlLnBhcmFtcy5zcGVlZCwhMCwhMCksZS5lbWl0KFwiYXV0b3BsYXlcIikpOihlLnNsaWRlUHJldihlLnBhcmFtcy5zcGVlZCwhMCwhMCksZS5lbWl0KFwiYXV0b3BsYXlcIikpOmUucGFyYW1zLmxvb3A/KGUubG9vcEZpeCgpLGUuc2xpZGVOZXh0KGUucGFyYW1zLnNwZWVkLCEwLCEwKSxlLmVtaXQoXCJhdXRvcGxheVwiKSk6ZS5pc0VuZD9lLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGU/ZS5hdXRvcGxheS5zdG9wKCk6KGUuc2xpZGVUbygwLGUucGFyYW1zLnNwZWVkLCEwLCEwKSxlLmVtaXQoXCJhdXRvcGxheVwiKSk6KGUuc2xpZGVOZXh0KGUucGFyYW1zLnNwZWVkLCEwLCEwKSxlLmVtaXQoXCJhdXRvcGxheVwiKSksZS5wYXJhbXMuY3NzTW9kZSYmZS5hdXRvcGxheS5ydW5uaW5nJiZlLmF1dG9wbGF5LnJ1bigpfSksaSl9LHN0YXJ0OmZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMD09PXRoaXMuYXV0b3BsYXkudGltZW91dCYmKCF0aGlzLmF1dG9wbGF5LnJ1bm5pbmcmJih0aGlzLmF1dG9wbGF5LnJ1bm5pbmc9ITAsdGhpcy5lbWl0KFwiYXV0b3BsYXlTdGFydFwiKSx0aGlzLmF1dG9wbGF5LnJ1bigpLCEwKSl9LHN0b3A6ZnVuY3Rpb24oKXtyZXR1cm4hIXRoaXMuYXV0b3BsYXkucnVubmluZyYmKHZvaWQgMCE9PXRoaXMuYXV0b3BsYXkudGltZW91dCYmKHRoaXMuYXV0b3BsYXkudGltZW91dCYmKGNsZWFyVGltZW91dCh0aGlzLmF1dG9wbGF5LnRpbWVvdXQpLHRoaXMuYXV0b3BsYXkudGltZW91dD12b2lkIDApLHRoaXMuYXV0b3BsYXkucnVubmluZz0hMSx0aGlzLmVtaXQoXCJhdXRvcGxheVN0b3BcIiksITApKX0scGF1c2U6ZnVuY3Rpb24oZSl7dGhpcy5hdXRvcGxheS5ydW5uaW5nJiYodGhpcy5hdXRvcGxheS5wYXVzZWR8fCh0aGlzLmF1dG9wbGF5LnRpbWVvdXQmJmNsZWFyVGltZW91dCh0aGlzLmF1dG9wbGF5LnRpbWVvdXQpLHRoaXMuYXV0b3BsYXkucGF1c2VkPSEwLDAhPT1lJiZ0aGlzLnBhcmFtcy5hdXRvcGxheS53YWl0Rm9yVHJhbnNpdGlvbj8odGhpcy4kd3JhcHBlckVsWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsdGhpcy5hdXRvcGxheS5vblRyYW5zaXRpb25FbmQpLHRoaXMuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLHRoaXMuYXV0b3BsYXkub25UcmFuc2l0aW9uRW5kKSk6KHRoaXMuYXV0b3BsYXkucGF1c2VkPSExLHRoaXMuYXV0b3BsYXkucnVuKCkpKSl9fSxnZT17c2V0VHJhbnNsYXRlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPXRoaXMuc2xpZGVzLHQ9MDt0PGUubGVuZ3RoO3QrPTEpe3ZhciBpPXRoaXMuc2xpZGVzLmVxKHQpLHM9LWlbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7dGhpcy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZXx8KHMtPXRoaXMudHJhbnNsYXRlKTt2YXIgYT0wO3RoaXMuaXNIb3Jpem9udGFsKCl8fChhPXMscz0wKTt2YXIgcj10aGlzLnBhcmFtcy5mYWRlRWZmZWN0LmNyb3NzRmFkZT9NYXRoLm1heCgxLU1hdGguYWJzKGlbMF0ucHJvZ3Jlc3MpLDApOjErTWF0aC5taW4oTWF0aC5tYXgoaVswXS5wcm9ncmVzcywtMSksMCk7aS5jc3Moe29wYWNpdHk6cn0pLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKFwiK3MrXCJweCwgXCIrYStcInB4LCAwcHgpXCIpfX0sc2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlKXt2YXIgdD10aGlzLGk9dC5zbGlkZXMscz10LiR3cmFwcGVyRWw7aWYoaS50cmFuc2l0aW9uKGUpLHQucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUmJjAhPT1lKXt2YXIgYT0hMTtpLnRyYW5zaXRpb25FbmQoKGZ1bmN0aW9uKCl7aWYoIWEmJnQmJiF0LmRlc3Ryb3llZCl7YT0hMCx0LmFuaW1hdGluZz0hMTtmb3IodmFyIGU9W1wid2Via2l0VHJhbnNpdGlvbkVuZFwiLFwidHJhbnNpdGlvbmVuZFwiXSxpPTA7aTxlLmxlbmd0aDtpKz0xKXMudHJpZ2dlcihlW2ldKX19KSl9fX0sYmU9e3NldFRyYW5zbGF0ZTpmdW5jdGlvbigpe3ZhciBlLHQ9dGhpcy4kZWwsaT10aGlzLiR3cmFwcGVyRWwscz10aGlzLnNsaWRlcyxhPXRoaXMud2lkdGgscj10aGlzLmhlaWdodCxvPXRoaXMucnRsVHJhbnNsYXRlLGw9dGhpcy5zaXplLGQ9dGhpcy5wYXJhbXMuY3ViZUVmZmVjdCxoPXRoaXMuaXNIb3Jpem9udGFsKCkscD10aGlzLnZpcnR1YWwmJnRoaXMucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCxjPTA7ZC5zaGFkb3cmJihoPygwPT09KGU9aS5maW5kKFwiLnN3aXBlci1jdWJlLXNoYWRvd1wiKSkubGVuZ3RoJiYoZT1uKCc8ZGl2IGNsYXNzPVwic3dpcGVyLWN1YmUtc2hhZG93XCI+PC9kaXY+JyksaS5hcHBlbmQoZSkpLGUuY3NzKHtoZWlnaHQ6YStcInB4XCJ9KSk6MD09PShlPXQuZmluZChcIi5zd2lwZXItY3ViZS1zaGFkb3dcIikpLmxlbmd0aCYmKGU9bignPGRpdiBjbGFzcz1cInN3aXBlci1jdWJlLXNoYWRvd1wiPjwvZGl2PicpLHQuYXBwZW5kKGUpKSk7Zm9yKHZhciB1PTA7dTxzLmxlbmd0aDt1Kz0xKXt2YXIgdj1zLmVxKHUpLGY9dTtwJiYoZj1wYXJzZUludCh2LmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSwxMCkpO3ZhciBtPTkwKmYsZz1NYXRoLmZsb29yKG0vMzYwKTtvJiYobT0tbSxnPU1hdGguZmxvb3IoLW0vMzYwKSk7dmFyIGI9TWF0aC5tYXgoTWF0aC5taW4odlswXS5wcm9ncmVzcywxKSwtMSksdz0wLHk9MCx4PTA7ZiU0PT0wPyh3PTQqLWcqbCx4PTApOihmLTEpJTQ9PTA/KHc9MCx4PTQqLWcqbCk6KGYtMiklND09MD8odz1sKzQqZypsLHg9bCk6KGYtMyklND09MCYmKHc9LWwseD0zKmwrNCpsKmcpLG8mJih3PS13KSxofHwoeT13LHc9MCk7dmFyIEU9XCJyb3RhdGVYKFwiKyhoPzA6LW0pK1wiZGVnKSByb3RhdGVZKFwiKyhoP206MCkrXCJkZWcpIHRyYW5zbGF0ZTNkKFwiK3crXCJweCwgXCIreStcInB4LCBcIit4K1wicHgpXCI7aWYoYjw9MSYmYj4tMSYmKGM9OTAqZis5MCpiLG8mJihjPTkwKi1mLTkwKmIpKSx2LnRyYW5zZm9ybShFKSxkLnNsaWRlU2hhZG93cyl7dmFyIFQ9aD92LmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0XCIpOnYuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LXRvcFwiKSxTPWg/di5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHRcIik6di5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tXCIpOzA9PT1ULmxlbmd0aCYmKFQ9bignPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJysoaD9cImxlZnRcIjpcInRvcFwiKSsnXCI+PC9kaXY+Jyksdi5hcHBlbmQoVCkpLDA9PT1TLmxlbmd0aCYmKFM9bignPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJysoaD9cInJpZ2h0XCI6XCJib3R0b21cIikrJ1wiPjwvZGl2PicpLHYuYXBwZW5kKFMpKSxULmxlbmd0aCYmKFRbMF0uc3R5bGUub3BhY2l0eT1NYXRoLm1heCgtYiwwKSksUy5sZW5ndGgmJihTWzBdLnN0eWxlLm9wYWNpdHk9TWF0aC5tYXgoYiwwKSl9fWlmKGkuY3NzKHtcIi13ZWJraXQtdHJhbnNmb3JtLW9yaWdpblwiOlwiNTAlIDUwJSAtXCIrbC8yK1wicHhcIixcIi1tb3otdHJhbnNmb3JtLW9yaWdpblwiOlwiNTAlIDUwJSAtXCIrbC8yK1wicHhcIixcIi1tcy10cmFuc2Zvcm0tb3JpZ2luXCI6XCI1MCUgNTAlIC1cIitsLzIrXCJweFwiLFwidHJhbnNmb3JtLW9yaWdpblwiOlwiNTAlIDUwJSAtXCIrbC8yK1wicHhcIn0pLGQuc2hhZG93KWlmKGgpZS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwcHgsIFwiKyhhLzIrZC5zaGFkb3dPZmZzZXQpK1wicHgsIFwiKy1hLzIrXCJweCkgcm90YXRlWCg5MGRlZykgcm90YXRlWigwZGVnKSBzY2FsZShcIitkLnNoYWRvd1NjYWxlK1wiKVwiKTtlbHNle3ZhciBDPU1hdGguYWJzKGMpLTkwKk1hdGguZmxvb3IoTWF0aC5hYnMoYykvOTApLE09MS41LShNYXRoLnNpbigyKkMqTWF0aC5QSS8zNjApLzIrTWF0aC5jb3MoMipDKk1hdGguUEkvMzYwKS8yKSxQPWQuc2hhZG93U2NhbGUsej1kLnNoYWRvd1NjYWxlL00saz1kLnNoYWRvd09mZnNldDtlLnRyYW5zZm9ybShcInNjYWxlM2QoXCIrUCtcIiwgMSwgXCIreitcIikgdHJhbnNsYXRlM2QoMHB4LCBcIisoci8yK2spK1wicHgsIFwiKy1yLzIveitcInB4KSByb3RhdGVYKC05MGRlZylcIil9dmFyICQ9Xy5pc1NhZmFyaXx8Xy5pc1VpV2ViVmlldz8tbC8yOjA7aS50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUzZCgwcHgsMCxcIiskK1wicHgpIHJvdGF0ZVgoXCIrKHRoaXMuaXNIb3Jpem9udGFsKCk/MDpjKStcImRlZykgcm90YXRlWShcIisodGhpcy5pc0hvcml6b250YWwoKT8tYzowKStcImRlZylcIil9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy4kZWw7dGhpcy5zbGlkZXMudHJhbnNpdGlvbihlKS5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0XCIpLnRyYW5zaXRpb24oZSksdGhpcy5wYXJhbXMuY3ViZUVmZmVjdC5zaGFkb3cmJiF0aGlzLmlzSG9yaXpvbnRhbCgpJiZ0LmZpbmQoXCIuc3dpcGVyLWN1YmUtc2hhZG93XCIpLnRyYW5zaXRpb24oZSl9fSx3ZT17c2V0VHJhbnNsYXRlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPXRoaXMuc2xpZGVzLHQ9dGhpcy5ydGxUcmFuc2xhdGUsaT0wO2k8ZS5sZW5ndGg7aSs9MSl7dmFyIHM9ZS5lcShpKSxhPXNbMF0ucHJvZ3Jlc3M7dGhpcy5wYXJhbXMuZmxpcEVmZmVjdC5saW1pdFJvdGF0aW9uJiYoYT1NYXRoLm1heChNYXRoLm1pbihzWzBdLnByb2dyZXNzLDEpLC0xKSk7dmFyIHI9LTE4MCphLG89MCxsPS1zWzBdLnN3aXBlclNsaWRlT2Zmc2V0LGQ9MDtpZih0aGlzLmlzSG9yaXpvbnRhbCgpP3QmJihyPS1yKTooZD1sLGw9MCxvPS1yLHI9MCksc1swXS5zdHlsZS56SW5kZXg9LU1hdGguYWJzKE1hdGgucm91bmQoYSkpK2UubGVuZ3RoLHRoaXMucGFyYW1zLmZsaXBFZmZlY3Quc2xpZGVTaGFkb3dzKXt2YXIgaD10aGlzLmlzSG9yaXpvbnRhbCgpP3MuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnRcIik6cy5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wXCIpLHA9dGhpcy5pc0hvcml6b250YWwoKT9zLmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodFwiKTpzLmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b21cIik7MD09PWgubGVuZ3RoJiYoaD1uKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nKyh0aGlzLmlzSG9yaXpvbnRhbCgpP1wibGVmdFwiOlwidG9wXCIpKydcIj48L2Rpdj4nKSxzLmFwcGVuZChoKSksMD09PXAubGVuZ3RoJiYocD1uKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nKyh0aGlzLmlzSG9yaXpvbnRhbCgpP1wicmlnaHRcIjpcImJvdHRvbVwiKSsnXCI+PC9kaXY+Jykscy5hcHBlbmQocCkpLGgubGVuZ3RoJiYoaFswXS5zdHlsZS5vcGFjaXR5PU1hdGgubWF4KC1hLDApKSxwLmxlbmd0aCYmKHBbMF0uc3R5bGUub3BhY2l0eT1NYXRoLm1heChhLDApKX1zLnRyYW5zZm9ybShcInRyYW5zbGF0ZTNkKFwiK2wrXCJweCwgXCIrZCtcInB4LCAwcHgpIHJvdGF0ZVgoXCIrbytcImRlZykgcm90YXRlWShcIityK1wiZGVnKVwiKX19LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcyxpPXQuc2xpZGVzLHM9dC5hY3RpdmVJbmRleCxhPXQuJHdyYXBwZXJFbDtpZihpLnRyYW5zaXRpb24oZSkuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdFwiKS50cmFuc2l0aW9uKGUpLHQucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUmJjAhPT1lKXt2YXIgcj0hMTtpLmVxKHMpLnRyYW5zaXRpb25FbmQoKGZ1bmN0aW9uKCl7aWYoIXImJnQmJiF0LmRlc3Ryb3llZCl7cj0hMCx0LmFuaW1hdGluZz0hMTtmb3IodmFyIGU9W1wid2Via2l0VHJhbnNpdGlvbkVuZFwiLFwidHJhbnNpdGlvbmVuZFwiXSxpPTA7aTxlLmxlbmd0aDtpKz0xKWEudHJpZ2dlcihlW2ldKX19KSl9fX0seWU9e3NldFRyYW5zbGF0ZTpmdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLndpZHRoLHQ9dGhpcy5oZWlnaHQsaT10aGlzLnNsaWRlcyxzPXRoaXMuJHdyYXBwZXJFbCxhPXRoaXMuc2xpZGVzU2l6ZXNHcmlkLHI9dGhpcy5wYXJhbXMuY292ZXJmbG93RWZmZWN0LG89dGhpcy5pc0hvcml6b250YWwoKSxsPXRoaXMudHJhbnNsYXRlLGQ9bz9lLzItbDp0LzItbCxwPW8/ci5yb3RhdGU6LXIucm90YXRlLGM9ci5kZXB0aCx1PTAsdj1pLmxlbmd0aDt1PHY7dSs9MSl7dmFyIGY9aS5lcSh1KSxtPWFbdV0sZz0oZC1mWzBdLnN3aXBlclNsaWRlT2Zmc2V0LW0vMikvbSpyLm1vZGlmaWVyLGI9bz9wKmc6MCx3PW8/MDpwKmcseT0tYypNYXRoLmFicyhnKSx4PXIuc3RyZXRjaDtcInN0cmluZ1wiPT10eXBlb2YgeCYmLTEhPT14LmluZGV4T2YoXCIlXCIpJiYoeD1wYXJzZUZsb2F0KHIuc3RyZXRjaCkvMTAwKm0pO3ZhciBFPW8/MDp4KmcsVD1vP3gqZzowO01hdGguYWJzKFQpPC4wMDEmJihUPTApLE1hdGguYWJzKEUpPC4wMDEmJihFPTApLE1hdGguYWJzKHkpPC4wMDEmJih5PTApLE1hdGguYWJzKGIpPC4wMDEmJihiPTApLE1hdGguYWJzKHcpPC4wMDEmJih3PTApO3ZhciBTPVwidHJhbnNsYXRlM2QoXCIrVCtcInB4LFwiK0UrXCJweCxcIit5K1wicHgpICByb3RhdGVYKFwiK3crXCJkZWcpIHJvdGF0ZVkoXCIrYitcImRlZylcIjtpZihmLnRyYW5zZm9ybShTKSxmWzBdLnN0eWxlLnpJbmRleD0xLU1hdGguYWJzKE1hdGgucm91bmQoZykpLHIuc2xpZGVTaGFkb3dzKXt2YXIgQz1vP2YuZmluZChcIi5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnRcIik6Zi5maW5kKFwiLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wXCIpLE09bz9mLmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodFwiKTpmLmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b21cIik7MD09PUMubGVuZ3RoJiYoQz1uKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nKyhvP1wibGVmdFwiOlwidG9wXCIpKydcIj48L2Rpdj4nKSxmLmFwcGVuZChDKSksMD09PU0ubGVuZ3RoJiYoTT1uKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nKyhvP1wicmlnaHRcIjpcImJvdHRvbVwiKSsnXCI+PC9kaXY+JyksZi5hcHBlbmQoTSkpLEMubGVuZ3RoJiYoQ1swXS5zdHlsZS5vcGFjaXR5PWc+MD9nOjApLE0ubGVuZ3RoJiYoTVswXS5zdHlsZS5vcGFjaXR5PS1nPjA/LWc6MCl9fShoLnBvaW50ZXJFdmVudHN8fGgucHJlZml4ZWRQb2ludGVyRXZlbnRzKSYmKHNbMF0uc3R5bGUucGVyc3BlY3RpdmVPcmlnaW49ZCtcInB4IDUwJVwiKX0sc2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlKXt0aGlzLnNsaWRlcy50cmFuc2l0aW9uKGUpLmZpbmQoXCIuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnRcIikudHJhbnNpdGlvbihlKX19LHhlPXtpbml0OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wYXJhbXMudGh1bWJzLHQ9dGhpcy5jb25zdHJ1Y3RvcjtlLnN3aXBlciBpbnN0YW5jZW9mIHQ/KHRoaXMudGh1bWJzLnN3aXBlcj1lLnN3aXBlcixkLmV4dGVuZCh0aGlzLnRodW1icy5zd2lwZXIub3JpZ2luYWxQYXJhbXMse3dhdGNoU2xpZGVzUHJvZ3Jlc3M6ITAsc2xpZGVUb0NsaWNrZWRTbGlkZTohMX0pLGQuZXh0ZW5kKHRoaXMudGh1bWJzLnN3aXBlci5wYXJhbXMse3dhdGNoU2xpZGVzUHJvZ3Jlc3M6ITAsc2xpZGVUb0NsaWNrZWRTbGlkZTohMX0pKTpkLmlzT2JqZWN0KGUuc3dpcGVyKSYmKHRoaXMudGh1bWJzLnN3aXBlcj1uZXcgdChkLmV4dGVuZCh7fSxlLnN3aXBlcix7d2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiEwLHdhdGNoU2xpZGVzUHJvZ3Jlc3M6ITAsc2xpZGVUb0NsaWNrZWRTbGlkZTohMX0pKSx0aGlzLnRodW1icy5zd2lwZXJDcmVhdGVkPSEwKSx0aGlzLnRodW1icy5zd2lwZXIuJGVsLmFkZENsYXNzKHRoaXMucGFyYW1zLnRodW1icy50aHVtYnNDb250YWluZXJDbGFzcyksdGhpcy50aHVtYnMuc3dpcGVyLm9uKFwidGFwXCIsdGhpcy50aHVtYnMub25UaHVtYkNsaWNrKX0sb25UaHVtYkNsaWNrOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy50aHVtYnMuc3dpcGVyO2lmKGUpe3ZhciB0PWUuY2xpY2tlZEluZGV4LGk9ZS5jbGlja2VkU2xpZGU7aWYoIShpJiZuKGkpLmhhc0NsYXNzKHRoaXMucGFyYW1zLnRodW1icy5zbGlkZVRodW1iQWN0aXZlQ2xhc3MpfHxudWxsPT10KSl7dmFyIHM7aWYocz1lLnBhcmFtcy5sb29wP3BhcnNlSW50KG4oZS5jbGlja2VkU2xpZGUpLmF0dHIoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSwxMCk6dCx0aGlzLnBhcmFtcy5sb29wKXt2YXIgYT10aGlzLmFjdGl2ZUluZGV4O3RoaXMuc2xpZGVzLmVxKGEpLmhhc0NsYXNzKHRoaXMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpJiYodGhpcy5sb29wRml4KCksdGhpcy5fY2xpZW50TGVmdD10aGlzLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdCxhPXRoaXMuYWN0aXZlSW5kZXgpO3ZhciByPXRoaXMuc2xpZGVzLmVxKGEpLnByZXZBbGwoJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrcysnXCJdJykuZXEoMCkuaW5kZXgoKSxvPXRoaXMuc2xpZGVzLmVxKGEpLm5leHRBbGwoJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrcysnXCJdJykuZXEoMCkuaW5kZXgoKTtzPXZvaWQgMD09PXI/bzp2b2lkIDA9PT1vP3I6by1hPGEtcj9vOnJ9dGhpcy5zbGlkZVRvKHMpfX19LHVwZGF0ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnRodW1icy5zd2lwZXI7aWYodCl7dmFyIGk9XCJhdXRvXCI9PT10LnBhcmFtcy5zbGlkZXNQZXJWaWV3P3Quc2xpZGVzUGVyVmlld0R5bmFtaWMoKTp0LnBhcmFtcy5zbGlkZXNQZXJWaWV3LHM9dGhpcy5wYXJhbXMudGh1bWJzLmF1dG9TY3JvbGxPZmZzZXQsYT1zJiYhdC5wYXJhbXMubG9vcDtpZih0aGlzLnJlYWxJbmRleCE9PXQucmVhbEluZGV4fHxhKXt2YXIgcixuLG89dC5hY3RpdmVJbmRleDtpZih0LnBhcmFtcy5sb29wKXt0LnNsaWRlcy5lcShvKS5oYXNDbGFzcyh0LnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSYmKHQubG9vcEZpeCgpLHQuX2NsaWVudExlZnQ9dC4kd3JhcHBlckVsWzBdLmNsaWVudExlZnQsbz10LmFjdGl2ZUluZGV4KTt2YXIgbD10LnNsaWRlcy5lcShvKS5wcmV2QWxsKCdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInK3RoaXMucmVhbEluZGV4KydcIl0nKS5lcSgwKS5pbmRleCgpLGQ9dC5zbGlkZXMuZXEobykubmV4dEFsbCgnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyt0aGlzLnJlYWxJbmRleCsnXCJdJykuZXEoMCkuaW5kZXgoKTtyPXZvaWQgMD09PWw/ZDp2b2lkIDA9PT1kP2w6ZC1vPT1vLWw/bzpkLW88by1sP2Q6bCxuPXRoaXMuYWN0aXZlSW5kZXg+dGhpcy5wcmV2aW91c0luZGV4P1wibmV4dFwiOlwicHJldlwifWVsc2Ugbj0ocj10aGlzLnJlYWxJbmRleCk+dGhpcy5wcmV2aW91c0luZGV4P1wibmV4dFwiOlwicHJldlwiO2EmJihyKz1cIm5leHRcIj09PW4/czotMSpzKSx0LnZpc2libGVTbGlkZXNJbmRleGVzJiZ0LnZpc2libGVTbGlkZXNJbmRleGVzLmluZGV4T2Yocik8MCYmKHQucGFyYW1zLmNlbnRlcmVkU2xpZGVzP3I9cj5vP3ItTWF0aC5mbG9vcihpLzIpKzE6citNYXRoLmZsb29yKGkvMiktMTpyPm8mJihyPXItaSsxKSx0LnNsaWRlVG8ocixlPzA6dm9pZCAwKSl9dmFyIGg9MSxwPXRoaXMucGFyYW1zLnRodW1icy5zbGlkZVRodW1iQWN0aXZlQ2xhc3M7aWYodGhpcy5wYXJhbXMuc2xpZGVzUGVyVmlldz4xJiYhdGhpcy5wYXJhbXMuY2VudGVyZWRTbGlkZXMmJihoPXRoaXMucGFyYW1zLnNsaWRlc1BlclZpZXcpLHRoaXMucGFyYW1zLnRodW1icy5tdWx0aXBsZUFjdGl2ZVRodW1ic3x8KGg9MSksaD1NYXRoLmZsb29yKGgpLHQuc2xpZGVzLnJlbW92ZUNsYXNzKHApLHQucGFyYW1zLmxvb3B8fHQucGFyYW1zLnZpcnR1YWwmJnQucGFyYW1zLnZpcnR1YWwuZW5hYmxlZClmb3IodmFyIGM9MDtjPGg7Yys9MSl0LiR3cmFwcGVyRWwuY2hpbGRyZW4oJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicrKHRoaXMucmVhbEluZGV4K2MpKydcIl0nKS5hZGRDbGFzcyhwKTtlbHNlIGZvcih2YXIgdT0wO3U8aDt1Kz0xKXQuc2xpZGVzLmVxKHRoaXMucmVhbEluZGV4K3UpLmFkZENsYXNzKHApfX19LEVlPVtLLFUsWixRLGVlLGllLGFlLHtuYW1lOlwibW91c2V3aGVlbFwiLHBhcmFtczp7bW91c2V3aGVlbDp7ZW5hYmxlZDohMSxyZWxlYXNlT25FZGdlczohMSxpbnZlcnQ6ITEsZm9yY2VUb0F4aXM6ITEsc2Vuc2l0aXZpdHk6MSxldmVudHNUYXJnZWQ6XCJjb250YWluZXJcIn19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse21vdXNld2hlZWw6e2VuYWJsZWQ6ITEsZW5hYmxlOnJlLmVuYWJsZS5iaW5kKHRoaXMpLGRpc2FibGU6cmUuZGlzYWJsZS5iaW5kKHRoaXMpLGhhbmRsZTpyZS5oYW5kbGUuYmluZCh0aGlzKSxoYW5kbGVNb3VzZUVudGVyOnJlLmhhbmRsZU1vdXNlRW50ZXIuYmluZCh0aGlzKSxoYW5kbGVNb3VzZUxlYXZlOnJlLmhhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKSxhbmltYXRlU2xpZGVyOnJlLmFuaW1hdGVTbGlkZXIuYmluZCh0aGlzKSxyZWxlYXNlU2Nyb2xsOnJlLnJlbGVhc2VTY3JvbGwuYmluZCh0aGlzKSxsYXN0U2Nyb2xsVGltZTpkLm5vdygpLGxhc3RFdmVudEJlZm9yZVNuYXA6dm9pZCAwLHJlY2VudFdoZWVsRXZlbnRzOltdfX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpeyF0aGlzLnBhcmFtcy5tb3VzZXdoZWVsLmVuYWJsZWQmJnRoaXMucGFyYW1zLmNzc01vZGUmJnRoaXMubW91c2V3aGVlbC5kaXNhYmxlKCksdGhpcy5wYXJhbXMubW91c2V3aGVlbC5lbmFibGVkJiZ0aGlzLm1vdXNld2hlZWwuZW5hYmxlKCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5jc3NNb2RlJiZ0aGlzLm1vdXNld2hlZWwuZW5hYmxlKCksdGhpcy5tb3VzZXdoZWVsLmVuYWJsZWQmJnRoaXMubW91c2V3aGVlbC5kaXNhYmxlKCl9fX0se25hbWU6XCJuYXZpZ2F0aW9uXCIscGFyYW1zOntuYXZpZ2F0aW9uOntuZXh0RWw6bnVsbCxwcmV2RWw6bnVsbCxoaWRlT25DbGljazohMSxkaXNhYmxlZENsYXNzOlwic3dpcGVyLWJ1dHRvbi1kaXNhYmxlZFwiLGhpZGRlbkNsYXNzOlwic3dpcGVyLWJ1dHRvbi1oaWRkZW5cIixsb2NrQ2xhc3M6XCJzd2lwZXItYnV0dG9uLWxvY2tcIn19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse25hdmlnYXRpb246e2luaXQ6bmUuaW5pdC5iaW5kKHRoaXMpLHVwZGF0ZTpuZS51cGRhdGUuYmluZCh0aGlzKSxkZXN0cm95Om5lLmRlc3Ryb3kuYmluZCh0aGlzKSxvbk5leHRDbGljazpuZS5vbk5leHRDbGljay5iaW5kKHRoaXMpLG9uUHJldkNsaWNrOm5lLm9uUHJldkNsaWNrLmJpbmQodGhpcyl9fSl9LG9uOntpbml0OmZ1bmN0aW9uKCl7dGhpcy5uYXZpZ2F0aW9uLmluaXQoKSx0aGlzLm5hdmlnYXRpb24udXBkYXRlKCl9LHRvRWRnZTpmdW5jdGlvbigpe3RoaXMubmF2aWdhdGlvbi51cGRhdGUoKX0sZnJvbUVkZ2U6ZnVuY3Rpb24oKXt0aGlzLm5hdmlnYXRpb24udXBkYXRlKCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLm5hdmlnYXRpb24uZGVzdHJveSgpfSxjbGljazpmdW5jdGlvbihlKXt2YXIgdCxpPXRoaXMubmF2aWdhdGlvbixzPWkuJG5leHRFbCxhPWkuJHByZXZFbDshdGhpcy5wYXJhbXMubmF2aWdhdGlvbi5oaWRlT25DbGlja3x8bihlLnRhcmdldCkuaXMoYSl8fG4oZS50YXJnZXQpLmlzKHMpfHwocz90PXMuaGFzQ2xhc3ModGhpcy5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk6YSYmKHQ9YS5oYXNDbGFzcyh0aGlzLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKSksITA9PT10P3RoaXMuZW1pdChcIm5hdmlnYXRpb25TaG93XCIsdGhpcyk6dGhpcy5lbWl0KFwibmF2aWdhdGlvbkhpZGVcIix0aGlzKSxzJiZzLnRvZ2dsZUNsYXNzKHRoaXMucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpLGEmJmEudG9nZ2xlQ2xhc3ModGhpcy5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcykpfX19LHtuYW1lOlwicGFnaW5hdGlvblwiLHBhcmFtczp7cGFnaW5hdGlvbjp7ZWw6bnVsbCxidWxsZXRFbGVtZW50Olwic3BhblwiLGNsaWNrYWJsZTohMSxoaWRlT25DbGljazohMSxyZW5kZXJCdWxsZXQ6bnVsbCxyZW5kZXJQcm9ncmVzc2JhcjpudWxsLHJlbmRlckZyYWN0aW9uOm51bGwscmVuZGVyQ3VzdG9tOm51bGwscHJvZ3Jlc3NiYXJPcHBvc2l0ZTohMSx0eXBlOlwiYnVsbGV0c1wiLGR5bmFtaWNCdWxsZXRzOiExLGR5bmFtaWNNYWluQnVsbGV0czoxLGZvcm1hdEZyYWN0aW9uQ3VycmVudDpmdW5jdGlvbihlKXtyZXR1cm4gZX0sZm9ybWF0RnJhY3Rpb25Ub3RhbDpmdW5jdGlvbihlKXtyZXR1cm4gZX0sYnVsbGV0Q2xhc3M6XCJzd2lwZXItcGFnaW5hdGlvbi1idWxsZXRcIixidWxsZXRBY3RpdmVDbGFzczpcInN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmVcIixtb2RpZmllckNsYXNzOlwic3dpcGVyLXBhZ2luYXRpb24tXCIsY3VycmVudENsYXNzOlwic3dpcGVyLXBhZ2luYXRpb24tY3VycmVudFwiLHRvdGFsQ2xhc3M6XCJzd2lwZXItcGFnaW5hdGlvbi10b3RhbFwiLGhpZGRlbkNsYXNzOlwic3dpcGVyLXBhZ2luYXRpb24taGlkZGVuXCIscHJvZ3Jlc3NiYXJGaWxsQ2xhc3M6XCJzd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1maWxsXCIscHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzOlwic3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItb3Bwb3NpdGVcIixjbGlja2FibGVDbGFzczpcInN3aXBlci1wYWdpbmF0aW9uLWNsaWNrYWJsZVwiLGxvY2tDbGFzczpcInN3aXBlci1wYWdpbmF0aW9uLWxvY2tcIn19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse3BhZ2luYXRpb246e2luaXQ6b2UuaW5pdC5iaW5kKHRoaXMpLHJlbmRlcjpvZS5yZW5kZXIuYmluZCh0aGlzKSx1cGRhdGU6b2UudXBkYXRlLmJpbmQodGhpcyksZGVzdHJveTpvZS5kZXN0cm95LmJpbmQodGhpcyksZHluYW1pY0J1bGxldEluZGV4OjB9fSl9LG9uOntpbml0OmZ1bmN0aW9uKCl7dGhpcy5wYWdpbmF0aW9uLmluaXQoKSx0aGlzLnBhZ2luYXRpb24ucmVuZGVyKCksdGhpcy5wYWdpbmF0aW9uLnVwZGF0ZSgpfSxhY3RpdmVJbmRleENoYW5nZTpmdW5jdGlvbigpeyh0aGlzLnBhcmFtcy5sb29wfHx2b2lkIDA9PT10aGlzLnNuYXBJbmRleCkmJnRoaXMucGFnaW5hdGlvbi51cGRhdGUoKX0sc25hcEluZGV4Q2hhbmdlOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMubG9vcHx8dGhpcy5wYWdpbmF0aW9uLnVwZGF0ZSgpfSxzbGlkZXNMZW5ndGhDaGFuZ2U6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5sb29wJiYodGhpcy5wYWdpbmF0aW9uLnJlbmRlcigpLHRoaXMucGFnaW5hdGlvbi51cGRhdGUoKSl9LHNuYXBHcmlkTGVuZ3RoQ2hhbmdlOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMubG9vcHx8KHRoaXMucGFnaW5hdGlvbi5yZW5kZXIoKSx0aGlzLnBhZ2luYXRpb24udXBkYXRlKCkpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5wYWdpbmF0aW9uLmRlc3Ryb3koKX0sY2xpY2s6ZnVuY3Rpb24oZSl7dGhpcy5wYXJhbXMucGFnaW5hdGlvbi5lbCYmdGhpcy5wYXJhbXMucGFnaW5hdGlvbi5oaWRlT25DbGljayYmdGhpcy5wYWdpbmF0aW9uLiRlbC5sZW5ndGg+MCYmIW4oZS50YXJnZXQpLmhhc0NsYXNzKHRoaXMucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpJiYoITA9PT10aGlzLnBhZ2luYXRpb24uJGVsLmhhc0NsYXNzKHRoaXMucGFyYW1zLnBhZ2luYXRpb24uaGlkZGVuQ2xhc3MpP3RoaXMuZW1pdChcInBhZ2luYXRpb25TaG93XCIsdGhpcyk6dGhpcy5lbWl0KFwicGFnaW5hdGlvbkhpZGVcIix0aGlzKSx0aGlzLnBhZ2luYXRpb24uJGVsLnRvZ2dsZUNsYXNzKHRoaXMucGFyYW1zLnBhZ2luYXRpb24uaGlkZGVuQ2xhc3MpKX19fSx7bmFtZTpcInNjcm9sbGJhclwiLHBhcmFtczp7c2Nyb2xsYmFyOntlbDpudWxsLGRyYWdTaXplOlwiYXV0b1wiLGhpZGU6ITEsZHJhZ2dhYmxlOiExLHNuYXBPblJlbGVhc2U6ITAsbG9ja0NsYXNzOlwic3dpcGVyLXNjcm9sbGJhci1sb2NrXCIsZHJhZ0NsYXNzOlwic3dpcGVyLXNjcm9sbGJhci1kcmFnXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHtzY3JvbGxiYXI6e2luaXQ6bGUuaW5pdC5iaW5kKHRoaXMpLGRlc3Ryb3k6bGUuZGVzdHJveS5iaW5kKHRoaXMpLHVwZGF0ZVNpemU6bGUudXBkYXRlU2l6ZS5iaW5kKHRoaXMpLHNldFRyYW5zbGF0ZTpsZS5zZXRUcmFuc2xhdGUuYmluZCh0aGlzKSxzZXRUcmFuc2l0aW9uOmxlLnNldFRyYW5zaXRpb24uYmluZCh0aGlzKSxlbmFibGVEcmFnZ2FibGU6bGUuZW5hYmxlRHJhZ2dhYmxlLmJpbmQodGhpcyksZGlzYWJsZURyYWdnYWJsZTpsZS5kaXNhYmxlRHJhZ2dhYmxlLmJpbmQodGhpcyksc2V0RHJhZ1Bvc2l0aW9uOmxlLnNldERyYWdQb3NpdGlvbi5iaW5kKHRoaXMpLGdldFBvaW50ZXJQb3NpdGlvbjpsZS5nZXRQb2ludGVyUG9zaXRpb24uYmluZCh0aGlzKSxvbkRyYWdTdGFydDpsZS5vbkRyYWdTdGFydC5iaW5kKHRoaXMpLG9uRHJhZ01vdmU6bGUub25EcmFnTW92ZS5iaW5kKHRoaXMpLG9uRHJhZ0VuZDpsZS5vbkRyYWdFbmQuYmluZCh0aGlzKSxpc1RvdWNoZWQ6ITEsdGltZW91dDpudWxsLGRyYWdUaW1lb3V0Om51bGx9fSl9LG9uOntpbml0OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxiYXIuaW5pdCgpLHRoaXMuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKSx0aGlzLnNjcm9sbGJhci5zZXRUcmFuc2xhdGUoKX0sdXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxiYXIudXBkYXRlU2l6ZSgpfSxyZXNpemU6ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbGJhci51cGRhdGVTaXplKCl9LG9ic2VydmVyVXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxiYXIudXBkYXRlU2l6ZSgpfSxzZXRUcmFuc2xhdGU6ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbGJhci5zZXRUcmFuc2xhdGUoKX0sc2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlKXt0aGlzLnNjcm9sbGJhci5zZXRUcmFuc2l0aW9uKGUpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxiYXIuZGVzdHJveSgpfX19LHtuYW1lOlwicGFyYWxsYXhcIixwYXJhbXM6e3BhcmFsbGF4OntlbmFibGVkOiExfX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7cGFyYWxsYXg6e3NldFRyYW5zZm9ybTpkZS5zZXRUcmFuc2Zvcm0uYmluZCh0aGlzKSxzZXRUcmFuc2xhdGU6ZGUuc2V0VHJhbnNsYXRlLmJpbmQodGhpcyksc2V0VHJhbnNpdGlvbjpkZS5zZXRUcmFuc2l0aW9uLmJpbmQodGhpcyl9fSl9LG9uOntiZWZvcmVJbml0OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMucGFyYWxsYXguZW5hYmxlZCYmKHRoaXMucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3M9ITAsdGhpcy5vcmlnaW5hbFBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzPSEwKX0saW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLnBhcmFsbGF4LmVuYWJsZWQmJnRoaXMucGFyYWxsYXguc2V0VHJhbnNsYXRlKCl9LHNldFRyYW5zbGF0ZTpmdW5jdGlvbigpe3RoaXMucGFyYW1zLnBhcmFsbGF4LmVuYWJsZWQmJnRoaXMucGFyYWxsYXguc2V0VHJhbnNsYXRlKCl9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7dGhpcy5wYXJhbXMucGFyYWxsYXguZW5hYmxlZCYmdGhpcy5wYXJhbGxheC5zZXRUcmFuc2l0aW9uKGUpfX19LHtuYW1lOlwiem9vbVwiLHBhcmFtczp7em9vbTp7ZW5hYmxlZDohMSxtYXhSYXRpbzozLG1pblJhdGlvOjEsdG9nZ2xlOiEwLGNvbnRhaW5lckNsYXNzOlwic3dpcGVyLXpvb20tY29udGFpbmVyXCIsem9vbWVkU2xpZGVDbGFzczpcInN3aXBlci1zbGlkZS16b29tZWRcIn19LGNyZWF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD17ZW5hYmxlZDohMSxzY2FsZToxLGN1cnJlbnRTY2FsZToxLGlzU2NhbGluZzohMSxnZXN0dXJlOnskc2xpZGVFbDp2b2lkIDAsc2xpZGVXaWR0aDp2b2lkIDAsc2xpZGVIZWlnaHQ6dm9pZCAwLCRpbWFnZUVsOnZvaWQgMCwkaW1hZ2VXcmFwRWw6dm9pZCAwLG1heFJhdGlvOjN9LGltYWdlOntpc1RvdWNoZWQ6dm9pZCAwLGlzTW92ZWQ6dm9pZCAwLGN1cnJlbnRYOnZvaWQgMCxjdXJyZW50WTp2b2lkIDAsbWluWDp2b2lkIDAsbWluWTp2b2lkIDAsbWF4WDp2b2lkIDAsbWF4WTp2b2lkIDAsd2lkdGg6dm9pZCAwLGhlaWdodDp2b2lkIDAsc3RhcnRYOnZvaWQgMCxzdGFydFk6dm9pZCAwLHRvdWNoZXNTdGFydDp7fSx0b3VjaGVzQ3VycmVudDp7fX0sdmVsb2NpdHk6e3g6dm9pZCAwLHk6dm9pZCAwLHByZXZQb3NpdGlvblg6dm9pZCAwLHByZXZQb3NpdGlvblk6dm9pZCAwLHByZXZUaW1lOnZvaWQgMH19O1wib25HZXN0dXJlU3RhcnQgb25HZXN0dXJlQ2hhbmdlIG9uR2VzdHVyZUVuZCBvblRvdWNoU3RhcnQgb25Ub3VjaE1vdmUgb25Ub3VjaEVuZCBvblRyYW5zaXRpb25FbmQgdG9nZ2xlIGVuYWJsZSBkaXNhYmxlIGluIG91dFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChmdW5jdGlvbihpKXt0W2ldPWhlW2ldLmJpbmQoZSl9KSksZC5leHRlbmQoZSx7em9vbTp0fSk7dmFyIGk9MTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZS56b29tLFwic2NhbGVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGl9LHNldDpmdW5jdGlvbih0KXtpZihpIT09dCl7dmFyIHM9ZS56b29tLmdlc3R1cmUuJGltYWdlRWw/ZS56b29tLmdlc3R1cmUuJGltYWdlRWxbMF06dm9pZCAwLGE9ZS56b29tLmdlc3R1cmUuJHNsaWRlRWw/ZS56b29tLmdlc3R1cmUuJHNsaWRlRWxbMF06dm9pZCAwO2UuZW1pdChcInpvb21DaGFuZ2VcIix0LHMsYSl9aT10fX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLnpvb20uZW5hYmxlZCYmdGhpcy56b29tLmVuYWJsZSgpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy56b29tLmRpc2FibGUoKX0sdG91Y2hTdGFydDpmdW5jdGlvbihlKXt0aGlzLnpvb20uZW5hYmxlZCYmdGhpcy56b29tLm9uVG91Y2hTdGFydChlKX0sdG91Y2hFbmQ6ZnVuY3Rpb24oZSl7dGhpcy56b29tLmVuYWJsZWQmJnRoaXMuem9vbS5vblRvdWNoRW5kKGUpfSxkb3VibGVUYXA6ZnVuY3Rpb24oZSl7dGhpcy5wYXJhbXMuem9vbS5lbmFibGVkJiZ0aGlzLnpvb20uZW5hYmxlZCYmdGhpcy5wYXJhbXMuem9vbS50b2dnbGUmJnRoaXMuem9vbS50b2dnbGUoZSl9LHRyYW5zaXRpb25FbmQ6ZnVuY3Rpb24oKXt0aGlzLnpvb20uZW5hYmxlZCYmdGhpcy5wYXJhbXMuem9vbS5lbmFibGVkJiZ0aGlzLnpvb20ub25UcmFuc2l0aW9uRW5kKCl9LHNsaWRlQ2hhbmdlOmZ1bmN0aW9uKCl7dGhpcy56b29tLmVuYWJsZWQmJnRoaXMucGFyYW1zLnpvb20uZW5hYmxlZCYmdGhpcy5wYXJhbXMuY3NzTW9kZSYmdGhpcy56b29tLm9uVHJhbnNpdGlvbkVuZCgpfX19LHtuYW1lOlwibGF6eVwiLHBhcmFtczp7bGF6eTp7ZW5hYmxlZDohMSxsb2FkUHJldk5leHQ6ITEsbG9hZFByZXZOZXh0QW1vdW50OjEsbG9hZE9uVHJhbnNpdGlvblN0YXJ0OiExLGVsZW1lbnRDbGFzczpcInN3aXBlci1sYXp5XCIsbG9hZGluZ0NsYXNzOlwic3dpcGVyLWxhenktbG9hZGluZ1wiLGxvYWRlZENsYXNzOlwic3dpcGVyLWxhenktbG9hZGVkXCIscHJlbG9hZGVyQ2xhc3M6XCJzd2lwZXItbGF6eS1wcmVsb2FkZXJcIn19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse2xhenk6e2luaXRpYWxJbWFnZUxvYWRlZDohMSxsb2FkOnBlLmxvYWQuYmluZCh0aGlzKSxsb2FkSW5TbGlkZTpwZS5sb2FkSW5TbGlkZS5iaW5kKHRoaXMpfX0pfSxvbjp7YmVmb3JlSW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxhenkuZW5hYmxlZCYmdGhpcy5wYXJhbXMucHJlbG9hZEltYWdlcyYmKHRoaXMucGFyYW1zLnByZWxvYWRJbWFnZXM9ITEpfSxpbml0OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMubGF6eS5lbmFibGVkJiYhdGhpcy5wYXJhbXMubG9vcCYmMD09PXRoaXMucGFyYW1zLmluaXRpYWxTbGlkZSYmdGhpcy5sYXp5LmxvYWQoKX0sc2Nyb2xsOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuZnJlZU1vZGUmJiF0aGlzLnBhcmFtcy5mcmVlTW9kZVN0aWNreSYmdGhpcy5sYXp5LmxvYWQoKX0scmVzaXplOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMubGF6eS5lbmFibGVkJiZ0aGlzLmxhenkubG9hZCgpfSxzY3JvbGxiYXJEcmFnTW92ZTpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmxhenkuZW5hYmxlZCYmdGhpcy5sYXp5LmxvYWQoKX0sdHJhbnNpdGlvblN0YXJ0OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMubGF6eS5lbmFibGVkJiYodGhpcy5wYXJhbXMubGF6eS5sb2FkT25UcmFuc2l0aW9uU3RhcnR8fCF0aGlzLnBhcmFtcy5sYXp5LmxvYWRPblRyYW5zaXRpb25TdGFydCYmIXRoaXMubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpJiZ0aGlzLmxhenkubG9hZCgpfSx0cmFuc2l0aW9uRW5kOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMubGF6eS5lbmFibGVkJiYhdGhpcy5wYXJhbXMubGF6eS5sb2FkT25UcmFuc2l0aW9uU3RhcnQmJnRoaXMubGF6eS5sb2FkKCl9LHNsaWRlQ2hhbmdlOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMubGF6eS5lbmFibGVkJiZ0aGlzLnBhcmFtcy5jc3NNb2RlJiZ0aGlzLmxhenkubG9hZCgpfX19LHtuYW1lOlwiY29udHJvbGxlclwiLHBhcmFtczp7Y29udHJvbGxlcjp7Y29udHJvbDp2b2lkIDAsaW52ZXJzZTohMSxieTpcInNsaWRlXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHtjb250cm9sbGVyOntjb250cm9sOnRoaXMucGFyYW1zLmNvbnRyb2xsZXIuY29udHJvbCxnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uOmNlLmdldEludGVycG9sYXRlRnVuY3Rpb24uYmluZCh0aGlzKSxzZXRUcmFuc2xhdGU6Y2Uuc2V0VHJhbnNsYXRlLmJpbmQodGhpcyksc2V0VHJhbnNpdGlvbjpjZS5zZXRUcmFuc2l0aW9uLmJpbmQodGhpcyl9fSl9LG9uOnt1cGRhdGU6ZnVuY3Rpb24oKXt0aGlzLmNvbnRyb2xsZXIuY29udHJvbCYmdGhpcy5jb250cm9sbGVyLnNwbGluZSYmKHRoaXMuY29udHJvbGxlci5zcGxpbmU9dm9pZCAwLGRlbGV0ZSB0aGlzLmNvbnRyb2xsZXIuc3BsaW5lKX0scmVzaXplOmZ1bmN0aW9uKCl7dGhpcy5jb250cm9sbGVyLmNvbnRyb2wmJnRoaXMuY29udHJvbGxlci5zcGxpbmUmJih0aGlzLmNvbnRyb2xsZXIuc3BsaW5lPXZvaWQgMCxkZWxldGUgdGhpcy5jb250cm9sbGVyLnNwbGluZSl9LG9ic2VydmVyVXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy5jb250cm9sbGVyLmNvbnRyb2wmJnRoaXMuY29udHJvbGxlci5zcGxpbmUmJih0aGlzLmNvbnRyb2xsZXIuc3BsaW5lPXZvaWQgMCxkZWxldGUgdGhpcy5jb250cm9sbGVyLnNwbGluZSl9LHNldFRyYW5zbGF0ZTpmdW5jdGlvbihlLHQpe3RoaXMuY29udHJvbGxlci5jb250cm9sJiZ0aGlzLmNvbnRyb2xsZXIuc2V0VHJhbnNsYXRlKGUsdCl9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSx0KXt0aGlzLmNvbnRyb2xsZXIuY29udHJvbCYmdGhpcy5jb250cm9sbGVyLnNldFRyYW5zaXRpb24oZSx0KX19fSx7bmFtZTpcImExMXlcIixwYXJhbXM6e2ExMXk6e2VuYWJsZWQ6ITAsbm90aWZpY2F0aW9uQ2xhc3M6XCJzd2lwZXItbm90aWZpY2F0aW9uXCIscHJldlNsaWRlTWVzc2FnZTpcIlByZXZpb3VzIHNsaWRlXCIsbmV4dFNsaWRlTWVzc2FnZTpcIk5leHQgc2xpZGVcIixmaXJzdFNsaWRlTWVzc2FnZTpcIlRoaXMgaXMgdGhlIGZpcnN0IHNsaWRlXCIsbGFzdFNsaWRlTWVzc2FnZTpcIlRoaXMgaXMgdGhlIGxhc3Qgc2xpZGVcIixwYWdpbmF0aW9uQnVsbGV0TWVzc2FnZTpcIkdvIHRvIHNsaWRlIHt7aW5kZXh9fVwifX0sY3JlYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztkLmV4dGVuZChlLHthMTF5OntsaXZlUmVnaW9uOm4oJzxzcGFuIGNsYXNzPVwiJytlLnBhcmFtcy5hMTF5Lm5vdGlmaWNhdGlvbkNsYXNzKydcIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIiBhcmlhLWF0b21pYz1cInRydWVcIj48L3NwYW4+Jyl9fSksT2JqZWN0LmtleXModWUpLmZvckVhY2goKGZ1bmN0aW9uKHQpe2UuYTExeVt0XT11ZVt0XS5iaW5kKGUpfSkpfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmExMXkuZW5hYmxlZCYmKHRoaXMuYTExeS5pbml0KCksdGhpcy5hMTF5LnVwZGF0ZU5hdmlnYXRpb24oKSl9LHRvRWRnZTpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmExMXkuZW5hYmxlZCYmdGhpcy5hMTF5LnVwZGF0ZU5hdmlnYXRpb24oKX0sZnJvbUVkZ2U6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5hMTF5LmVuYWJsZWQmJnRoaXMuYTExeS51cGRhdGVOYXZpZ2F0aW9uKCl9LHBhZ2luYXRpb25VcGRhdGU6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5hMTF5LmVuYWJsZWQmJnRoaXMuYTExeS51cGRhdGVQYWdpbmF0aW9uKCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5hMTF5LmVuYWJsZWQmJnRoaXMuYTExeS5kZXN0cm95KCl9fX0se25hbWU6XCJoaXN0b3J5XCIscGFyYW1zOntoaXN0b3J5OntlbmFibGVkOiExLHJlcGxhY2VTdGF0ZTohMSxrZXk6XCJzbGlkZXNcIn19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse2hpc3Rvcnk6e2luaXQ6dmUuaW5pdC5iaW5kKHRoaXMpLHNldEhpc3Rvcnk6dmUuc2V0SGlzdG9yeS5iaW5kKHRoaXMpLHNldEhpc3RvcnlQb3BTdGF0ZTp2ZS5zZXRIaXN0b3J5UG9wU3RhdGUuYmluZCh0aGlzKSxzY3JvbGxUb1NsaWRlOnZlLnNjcm9sbFRvU2xpZGUuYmluZCh0aGlzKSxkZXN0cm95OnZlLmRlc3Ryb3kuYmluZCh0aGlzKX19KX0sb246e2luaXQ6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQmJnRoaXMuaGlzdG9yeS5pbml0KCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQmJnRoaXMuaGlzdG9yeS5kZXN0cm95KCl9LHRyYW5zaXRpb25FbmQ6ZnVuY3Rpb24oKXt0aGlzLmhpc3RvcnkuaW5pdGlhbGl6ZWQmJnRoaXMuaGlzdG9yeS5zZXRIaXN0b3J5KHRoaXMucGFyYW1zLmhpc3Rvcnkua2V5LHRoaXMuYWN0aXZlSW5kZXgpfSxzbGlkZUNoYW5nZTpmdW5jdGlvbigpe3RoaXMuaGlzdG9yeS5pbml0aWFsaXplZCYmdGhpcy5wYXJhbXMuY3NzTW9kZSYmdGhpcy5oaXN0b3J5LnNldEhpc3RvcnkodGhpcy5wYXJhbXMuaGlzdG9yeS5rZXksdGhpcy5hY3RpdmVJbmRleCl9fX0se25hbWU6XCJoYXNoLW5hdmlnYXRpb25cIixwYXJhbXM6e2hhc2hOYXZpZ2F0aW9uOntlbmFibGVkOiExLHJlcGxhY2VTdGF0ZTohMSx3YXRjaFN0YXRlOiExfX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7aGFzaE5hdmlnYXRpb246e2luaXRpYWxpemVkOiExLGluaXQ6ZmUuaW5pdC5iaW5kKHRoaXMpLGRlc3Ryb3k6ZmUuZGVzdHJveS5iaW5kKHRoaXMpLHNldEhhc2g6ZmUuc2V0SGFzaC5iaW5kKHRoaXMpLG9uSGFzaENhbmdlOmZlLm9uSGFzaENhbmdlLmJpbmQodGhpcyl9fSl9LG9uOntpbml0OmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZCYmdGhpcy5oYXNoTmF2aWdhdGlvbi5pbml0KCl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkJiZ0aGlzLmhhc2hOYXZpZ2F0aW9uLmRlc3Ryb3koKX0sdHJhbnNpdGlvbkVuZDpmdW5jdGlvbigpe3RoaXMuaGFzaE5hdmlnYXRpb24uaW5pdGlhbGl6ZWQmJnRoaXMuaGFzaE5hdmlnYXRpb24uc2V0SGFzaCgpfSxzbGlkZUNoYW5nZTpmdW5jdGlvbigpe3RoaXMuaGFzaE5hdmlnYXRpb24uaW5pdGlhbGl6ZWQmJnRoaXMucGFyYW1zLmNzc01vZGUmJnRoaXMuaGFzaE5hdmlnYXRpb24uc2V0SGFzaCgpfX19LHtuYW1lOlwiYXV0b3BsYXlcIixwYXJhbXM6e2F1dG9wbGF5OntlbmFibGVkOiExLGRlbGF5OjNlMyx3YWl0Rm9yVHJhbnNpdGlvbjohMCxkaXNhYmxlT25JbnRlcmFjdGlvbjohMCxzdG9wT25MYXN0U2xpZGU6ITEscmV2ZXJzZURpcmVjdGlvbjohMX19LGNyZWF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7ZC5leHRlbmQoZSx7YXV0b3BsYXk6e3J1bm5pbmc6ITEscGF1c2VkOiExLHJ1bjptZS5ydW4uYmluZChlKSxzdGFydDptZS5zdGFydC5iaW5kKGUpLHN0b3A6bWUuc3RvcC5iaW5kKGUpLHBhdXNlOm1lLnBhdXNlLmJpbmQoZSksb25WaXNpYmlsaXR5Q2hhbmdlOmZ1bmN0aW9uKCl7XCJoaWRkZW5cIj09PWRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSYmZS5hdXRvcGxheS5ydW5uaW5nJiZlLmF1dG9wbGF5LnBhdXNlKCksXCJ2aXNpYmxlXCI9PT1kb2N1bWVudC52aXNpYmlsaXR5U3RhdGUmJmUuYXV0b3BsYXkucGF1c2VkJiYoZS5hdXRvcGxheS5ydW4oKSxlLmF1dG9wbGF5LnBhdXNlZD0hMSl9LG9uVHJhbnNpdGlvbkVuZDpmdW5jdGlvbih0KXtlJiYhZS5kZXN0cm95ZWQmJmUuJHdyYXBwZXJFbCYmdC50YXJnZXQ9PT10aGlzJiYoZS4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsZS5hdXRvcGxheS5vblRyYW5zaXRpb25FbmQpLGUuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLGUuYXV0b3BsYXkub25UcmFuc2l0aW9uRW5kKSxlLmF1dG9wbGF5LnBhdXNlZD0hMSxlLmF1dG9wbGF5LnJ1bm5pbmc/ZS5hdXRvcGxheS5ydW4oKTplLmF1dG9wbGF5LnN0b3AoKSl9fX0pfSxvbjp7aW5pdDpmdW5jdGlvbigpe3RoaXMucGFyYW1zLmF1dG9wbGF5LmVuYWJsZWQmJih0aGlzLmF1dG9wbGF5LnN0YXJ0KCksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIix0aGlzLmF1dG9wbGF5Lm9uVmlzaWJpbGl0eUNoYW5nZSkpfSxiZWZvcmVUcmFuc2l0aW9uU3RhcnQ6ZnVuY3Rpb24oZSx0KXt0aGlzLmF1dG9wbGF5LnJ1bm5pbmcmJih0fHwhdGhpcy5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24/dGhpcy5hdXRvcGxheS5wYXVzZShlKTp0aGlzLmF1dG9wbGF5LnN0b3AoKSl9LHNsaWRlckZpcnN0TW92ZTpmdW5jdGlvbigpe3RoaXMuYXV0b3BsYXkucnVubmluZyYmKHRoaXMucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uP3RoaXMuYXV0b3BsYXkuc3RvcCgpOnRoaXMuYXV0b3BsYXkucGF1c2UoKSl9LHRvdWNoRW5kOmZ1bmN0aW9uKCl7dGhpcy5wYXJhbXMuY3NzTW9kZSYmdGhpcy5hdXRvcGxheS5wYXVzZWQmJiF0aGlzLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbiYmdGhpcy5hdXRvcGxheS5ydW4oKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuYXV0b3BsYXkucnVubmluZyYmdGhpcy5hdXRvcGxheS5zdG9wKCksZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIix0aGlzLmF1dG9wbGF5Lm9uVmlzaWJpbGl0eUNoYW5nZSl9fX0se25hbWU6XCJlZmZlY3QtZmFkZVwiLHBhcmFtczp7ZmFkZUVmZmVjdDp7Y3Jvc3NGYWRlOiExfX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7ZmFkZUVmZmVjdDp7c2V0VHJhbnNsYXRlOmdlLnNldFRyYW5zbGF0ZS5iaW5kKHRoaXMpLHNldFRyYW5zaXRpb246Z2Uuc2V0VHJhbnNpdGlvbi5iaW5kKHRoaXMpfX0pfSxvbjp7YmVmb3JlSW5pdDpmdW5jdGlvbigpe2lmKFwiZmFkZVwiPT09dGhpcy5wYXJhbXMuZWZmZWN0KXt0aGlzLmNsYXNzTmFtZXMucHVzaCh0aGlzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzK1wiZmFkZVwiKTt2YXIgZT17c2xpZGVzUGVyVmlldzoxLHNsaWRlc1BlckNvbHVtbjoxLHNsaWRlc1Blckdyb3VwOjEsd2F0Y2hTbGlkZXNQcm9ncmVzczohMCxzcGFjZUJldHdlZW46MCx2aXJ0dWFsVHJhbnNsYXRlOiEwfTtkLmV4dGVuZCh0aGlzLnBhcmFtcyxlKSxkLmV4dGVuZCh0aGlzLm9yaWdpbmFsUGFyYW1zLGUpfX0sc2V0VHJhbnNsYXRlOmZ1bmN0aW9uKCl7XCJmYWRlXCI9PT10aGlzLnBhcmFtcy5lZmZlY3QmJnRoaXMuZmFkZUVmZmVjdC5zZXRUcmFuc2xhdGUoKX0sc2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlKXtcImZhZGVcIj09PXRoaXMucGFyYW1zLmVmZmVjdCYmdGhpcy5mYWRlRWZmZWN0LnNldFRyYW5zaXRpb24oZSl9fX0se25hbWU6XCJlZmZlY3QtY3ViZVwiLHBhcmFtczp7Y3ViZUVmZmVjdDp7c2xpZGVTaGFkb3dzOiEwLHNoYWRvdzohMCxzaGFkb3dPZmZzZXQ6MjAsc2hhZG93U2NhbGU6Ljk0fX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7Y3ViZUVmZmVjdDp7c2V0VHJhbnNsYXRlOmJlLnNldFRyYW5zbGF0ZS5iaW5kKHRoaXMpLHNldFRyYW5zaXRpb246YmUuc2V0VHJhbnNpdGlvbi5iaW5kKHRoaXMpfX0pfSxvbjp7YmVmb3JlSW5pdDpmdW5jdGlvbigpe2lmKFwiY3ViZVwiPT09dGhpcy5wYXJhbXMuZWZmZWN0KXt0aGlzLmNsYXNzTmFtZXMucHVzaCh0aGlzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzK1wiY3ViZVwiKSx0aGlzLmNsYXNzTmFtZXMucHVzaCh0aGlzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzK1wiM2RcIik7dmFyIGU9e3NsaWRlc1BlclZpZXc6MSxzbGlkZXNQZXJDb2x1bW46MSxzbGlkZXNQZXJHcm91cDoxLHdhdGNoU2xpZGVzUHJvZ3Jlc3M6ITAscmVzaXN0YW5jZVJhdGlvOjAsc3BhY2VCZXR3ZWVuOjAsY2VudGVyZWRTbGlkZXM6ITEsdmlydHVhbFRyYW5zbGF0ZTohMH07ZC5leHRlbmQodGhpcy5wYXJhbXMsZSksZC5leHRlbmQodGhpcy5vcmlnaW5hbFBhcmFtcyxlKX19LHNldFRyYW5zbGF0ZTpmdW5jdGlvbigpe1wiY3ViZVwiPT09dGhpcy5wYXJhbXMuZWZmZWN0JiZ0aGlzLmN1YmVFZmZlY3Quc2V0VHJhbnNsYXRlKCl9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7XCJjdWJlXCI9PT10aGlzLnBhcmFtcy5lZmZlY3QmJnRoaXMuY3ViZUVmZmVjdC5zZXRUcmFuc2l0aW9uKGUpfX19LHtuYW1lOlwiZWZmZWN0LWZsaXBcIixwYXJhbXM6e2ZsaXBFZmZlY3Q6e3NsaWRlU2hhZG93czohMCxsaW1pdFJvdGF0aW9uOiEwfX0sY3JlYXRlOmZ1bmN0aW9uKCl7ZC5leHRlbmQodGhpcyx7ZmxpcEVmZmVjdDp7c2V0VHJhbnNsYXRlOndlLnNldFRyYW5zbGF0ZS5iaW5kKHRoaXMpLHNldFRyYW5zaXRpb246d2Uuc2V0VHJhbnNpdGlvbi5iaW5kKHRoaXMpfX0pfSxvbjp7YmVmb3JlSW5pdDpmdW5jdGlvbigpe2lmKFwiZmxpcFwiPT09dGhpcy5wYXJhbXMuZWZmZWN0KXt0aGlzLmNsYXNzTmFtZXMucHVzaCh0aGlzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzK1wiZmxpcFwiKSx0aGlzLmNsYXNzTmFtZXMucHVzaCh0aGlzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzK1wiM2RcIik7dmFyIGU9e3NsaWRlc1BlclZpZXc6MSxzbGlkZXNQZXJDb2x1bW46MSxzbGlkZXNQZXJHcm91cDoxLHdhdGNoU2xpZGVzUHJvZ3Jlc3M6ITAsc3BhY2VCZXR3ZWVuOjAsdmlydHVhbFRyYW5zbGF0ZTohMH07ZC5leHRlbmQodGhpcy5wYXJhbXMsZSksZC5leHRlbmQodGhpcy5vcmlnaW5hbFBhcmFtcyxlKX19LHNldFRyYW5zbGF0ZTpmdW5jdGlvbigpe1wiZmxpcFwiPT09dGhpcy5wYXJhbXMuZWZmZWN0JiZ0aGlzLmZsaXBFZmZlY3Quc2V0VHJhbnNsYXRlKCl9LHNldFRyYW5zaXRpb246ZnVuY3Rpb24oZSl7XCJmbGlwXCI9PT10aGlzLnBhcmFtcy5lZmZlY3QmJnRoaXMuZmxpcEVmZmVjdC5zZXRUcmFuc2l0aW9uKGUpfX19LHtuYW1lOlwiZWZmZWN0LWNvdmVyZmxvd1wiLHBhcmFtczp7Y292ZXJmbG93RWZmZWN0Ontyb3RhdGU6NTAsc3RyZXRjaDowLGRlcHRoOjEwMCxtb2RpZmllcjoxLHNsaWRlU2hhZG93czohMH19LGNyZWF0ZTpmdW5jdGlvbigpe2QuZXh0ZW5kKHRoaXMse2NvdmVyZmxvd0VmZmVjdDp7c2V0VHJhbnNsYXRlOnllLnNldFRyYW5zbGF0ZS5iaW5kKHRoaXMpLHNldFRyYW5zaXRpb246eWUuc2V0VHJhbnNpdGlvbi5iaW5kKHRoaXMpfX0pfSxvbjp7YmVmb3JlSW5pdDpmdW5jdGlvbigpe1wiY292ZXJmbG93XCI9PT10aGlzLnBhcmFtcy5lZmZlY3QmJih0aGlzLmNsYXNzTmFtZXMucHVzaCh0aGlzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzK1wiY292ZXJmbG93XCIpLHRoaXMuY2xhc3NOYW1lcy5wdXNoKHRoaXMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MrXCIzZFwiKSx0aGlzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzPSEwLHRoaXMub3JpZ2luYWxQYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcz0hMCl9LHNldFRyYW5zbGF0ZTpmdW5jdGlvbigpe1wiY292ZXJmbG93XCI9PT10aGlzLnBhcmFtcy5lZmZlY3QmJnRoaXMuY292ZXJmbG93RWZmZWN0LnNldFRyYW5zbGF0ZSgpfSxzZXRUcmFuc2l0aW9uOmZ1bmN0aW9uKGUpe1wiY292ZXJmbG93XCI9PT10aGlzLnBhcmFtcy5lZmZlY3QmJnRoaXMuY292ZXJmbG93RWZmZWN0LnNldFRyYW5zaXRpb24oZSl9fX0se25hbWU6XCJ0aHVtYnNcIixwYXJhbXM6e3RodW1iczp7c3dpcGVyOm51bGwsbXVsdGlwbGVBY3RpdmVUaHVtYnM6ITAsYXV0b1Njcm9sbE9mZnNldDowLHNsaWRlVGh1bWJBY3RpdmVDbGFzczpcInN3aXBlci1zbGlkZS10aHVtYi1hY3RpdmVcIix0aHVtYnNDb250YWluZXJDbGFzczpcInN3aXBlci1jb250YWluZXItdGh1bWJzXCJ9fSxjcmVhdGU6ZnVuY3Rpb24oKXtkLmV4dGVuZCh0aGlzLHt0aHVtYnM6e3N3aXBlcjpudWxsLGluaXQ6eGUuaW5pdC5iaW5kKHRoaXMpLHVwZGF0ZTp4ZS51cGRhdGUuYmluZCh0aGlzKSxvblRodW1iQ2xpY2s6eGUub25UaHVtYkNsaWNrLmJpbmQodGhpcyl9fSl9LG9uOntiZWZvcmVJbml0OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wYXJhbXMudGh1bWJzO2UmJmUuc3dpcGVyJiYodGhpcy50aHVtYnMuaW5pdCgpLHRoaXMudGh1bWJzLnVwZGF0ZSghMCkpfSxzbGlkZUNoYW5nZTpmdW5jdGlvbigpe3RoaXMudGh1bWJzLnN3aXBlciYmdGhpcy50aHVtYnMudXBkYXRlKCl9LHVwZGF0ZTpmdW5jdGlvbigpe3RoaXMudGh1bWJzLnN3aXBlciYmdGhpcy50aHVtYnMudXBkYXRlKCl9LHJlc2l6ZTpmdW5jdGlvbigpe3RoaXMudGh1bWJzLnN3aXBlciYmdGhpcy50aHVtYnMudXBkYXRlKCl9LG9ic2VydmVyVXBkYXRlOmZ1bmN0aW9uKCl7dGhpcy50aHVtYnMuc3dpcGVyJiZ0aGlzLnRodW1icy51cGRhdGUoKX0sc2V0VHJhbnNpdGlvbjpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnRodW1icy5zd2lwZXI7dCYmdC5zZXRUcmFuc2l0aW9uKGUpfSxiZWZvcmVEZXN0cm95OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy50aHVtYnMuc3dpcGVyO2UmJnRoaXMudGh1bWJzLnN3aXBlckNyZWF0ZWQmJmUmJmUuZGVzdHJveSgpfX19XTtyZXR1cm4gdm9pZCAwPT09ai51c2UmJihqLnVzZT1qLkNsYXNzLnVzZSxqLmluc3RhbGxNb2R1bGU9ai5DbGFzcy5pbnN0YWxsTW9kdWxlKSxqLnVzZShFZSksan0pKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgJ3VzZSBzdHJpY3QnXHJcblxyXG4gICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gc3RhcnRcclxuICAgICAgICBsZXQgcEl0ZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWdbZGF0YS1zcmNdJykpLCB0aW1lcjtcclxuICAgIFxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxlciwgZmFsc2UpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzY3JvbGxlciwgZmFsc2UpO1xyXG4gICAgICAgIGluVmlldygpO1xyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAvLyB0aHJvdHRsZWQgc2Nyb2xsL3Jlc2l6ZVxyXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbGVyKGUpIHtcclxuICAgIFxyXG4gICAgICAgIHRpbWVyID0gdGltZXIgfHwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaW5WaWV3KTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAvLyBpbWFnZSBpbiB2aWV3P1xyXG4gICAgICAgIGZ1bmN0aW9uIGluVmlldygpIHtcclxuICAgIFxyXG4gICAgICAgIHZhciB3VCA9IHdpbmRvdy5wYWdlWU9mZnNldCwgd0IgPSB3VCArIHdpbmRvdy5pbm5lckhlaWdodCwgY1JlY3QsIHBULCBwQiwgcCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKHAgPCBwSXRlbXMubGVuZ3RoKSB7XHJcbiAgICBcclxuICAgICAgICAgICAgY1JlY3QgPSBwSXRlbXNbcF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHBUID0gd1QgKyBjUmVjdC50b3A7XHJcbiAgICAgICAgICAgIHBCID0gcFQgKyBjUmVjdC5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAod1QgPCBwQiAmJiB3QiA+IHBUKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkRnVsbEltYWdlKHBJdGVtc1twXSk7XHJcbiAgICAgICAgICAgICAgICBwSXRlbXMuc3BsaWNlKHAsIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgcCsrO1xyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAvLyByZXBsYWNlIHdpdGggZnVsbCBpbWFnZVxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRGdWxsSW1hZ2UoaXRlbSkge1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmICghaXRlbSB8fCAhKGl0ZW0uZGF0YXNldC5zcmMgfHwgaXRlbS5kYXRhc2V0LnNyY3NldCkpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gbG9hZCBpbWFnZVxyXG4gICAgICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmRhdGFzZXQuc3Jjc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3Jjc2V0ID0gaXRlbS5kYXRhc2V0LnNyY3NldDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBpdGVtLmRhdGFzZXQuc3JjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gaXRlbS5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgIGltZy5hbHQgPSBpdGVtLmFsdDtcclxuICAgICAgICAgICAgaWYgKGltZy5jb21wbGV0ZSkgYWRkSW1nKCk7XHJcbiAgICAgICAgICAgIGVsc2UgaW1nLm9ubG9hZCA9IGFkZEltZztcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gcmVwbGFjZSBpbWFnZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRJbWcoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGNsaWNrXHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0sIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBmdWxsIGltYWdlXHJcbiAgICAgICAgICAgICAgICBpdGVtLmJlZm9yZShpbWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHByZWxvYWQgIFxyXG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIH1cclxuICBcclxuICAgIH0sIGZhbHNlKTtcclxufSIsInJlcXVpcmUoXCIuLi9tb2R1bGVzL3BvbHlmaWxsc1wiKSgpO1xyXG5yZXF1aXJlKFwiLi4vbW9kdWxlcy9tZW51XCIpKCk7XHJcbnJlcXVpcmUoXCIuLi9tb2R1bGVzL2xhenlMb2FkXCIpKCk7XHJcbmxldCBTd2lwZXIgPSByZXF1aXJlKFwiLi4vbGliL3N3aXBlclwiKTtcclxuXHJcbmltcG9ydChcclxuICAvKiB3ZWJwYWNrUHJlZmV0Y2g6IHRydWUsIHdlYnBhY2tDaHVua05hbWU6IFwiZm9vdGVyXCIgKi8gXCIuLi9tb2R1bGVzL2Zvb3RlclwiXHJcbikudGhlbigobW9kdWxlKSA9PiB7XHJcbiAgbW9kdWxlLmRlZmF1bHQoKTtcclxufSk7XHJcblxyXG5pbXBvcnQgXCIuLi8uLi9zY3NzL2dsb2JhbFwiO1xyXG5pbXBvcnQgXCIuLi8uLi9zY3NzL3BhZ2VzL2hvbWUvcGFnZVwiO1xyXG5cclxuLy9zZXJ2aWNlcyBzbGlkZXJcclxuXHJcbmxldCBzbGlkZXNQZXJWaWV3LCBnYXA7XHJcblxyXG5jYWxjU2xpZGVyKCk7XHJcblxyXG5sZXQgc2VydmljZXNTbGlkZXIgPSBuZXcgU3dpcGVyKFwiLnNlcnZpY2VzLXNsaWRlclwiLCB7XHJcbiAgc2xpZGVzUGVyVmlldzogc2xpZGVzUGVyVmlldyxcclxuICBzcGFjZUJldHdlZW46IGdhcCxcclxuICBhdXRvSGVpZ2h0OiB0cnVlLFxyXG4gIHNwZWVkOiAyMDAwLFxyXG4gIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgbG9vcDogdHJ1ZSxcclxuICBhdXRvcGxheToge1xyXG4gICAgZGVsYXk6IDIwMDAsXHJcbiAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXHJcbiAgfSxcclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgY2FsY1NsaWRlcigpO1xyXG4gIHVwZGF0ZVNsaWRlcigpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNhbGNTbGlkZXIoKSB7XHJcbiAgbGV0IG1heFNsaWRlV2lkdGggPSAod2luZG93LmlubmVySGVpZ2h0ICogMC45KSAvIDMsXHJcbiAgICBhbW91bnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIG1heFNsaWRlV2lkdGg7XHJcblxyXG4gIHNsaWRlc1BlclZpZXcgPSBNYXRoLnRydW5jKGFtb3VudCk7XHJcbiAgZ2FwID0gKChhbW91bnQgLSBzbGlkZXNQZXJWaWV3KSAqIG1heFNsaWRlV2lkdGgpIC8gKHNsaWRlc1BlclZpZXcgLSAxKTtcclxuXHJcbiAgaWYgKHNsaWRlc1BlclZpZXcgPD0gMSkge1xyXG4gICAgc2xpZGVzUGVyVmlldyA9IDI7XHJcbiAgICBnYXAgPSAwO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2xpZGVyKCkge1xyXG4gIHNlcnZpY2VzU2xpZGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID0gc2xpZGVzUGVyVmlldztcclxuICBzZXJ2aWNlc1NsaWRlci5wYXJhbXMuc3BhY2VCZXR3ZWVuID0gZ2FwO1xyXG4gIHNlcnZpY2VzU2xpZGVyLnBhcmFtcy5sb29wID0gdHJ1ZTtcclxuICBzZXJ2aWNlc1NsaWRlci5wYXJhbXMuYXV0b3BsYXkgPSB7XHJcbiAgICBkZWxheTogMjAwMCxcclxuICB9O1xyXG4gIHNlcnZpY2VzU2xpZGVyLnBhcmFtcy5zcGVlZCA9IDIwMDA7XHJcbn1cclxuXHJcbmxldCBwb3J0Zm9saW9TbGlkZXIgPSBuZXcgU3dpcGVyKFwiLnBvcnRmb2xpby1zbGlkZXJcIiwge1xyXG4gIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgc3BlZWQ6IDcwMCxcclxuICBsb29wOiB0cnVlLFxyXG4gIGF1dG9wbGF5OiB7XHJcbiAgICBkZWxheTogNTAwMCxcclxuICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICB9LFxyXG4gIHBhZ2luYXRpb246IHtcclxuICAgIGVsOiBcIi5wb3J0Zm9saW8tcGFnaW5hdGlvblwiLFxyXG4gICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9