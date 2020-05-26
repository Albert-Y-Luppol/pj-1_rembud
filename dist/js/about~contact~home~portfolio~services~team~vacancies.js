(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["about~contact~home~portfolio~services~team~vacancies"],{

/***/ "../../../node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "../../../node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "../modules/menu.js":
/*!**************************!*\
  !*** ../modules/menu.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  'use strict';

  var menu = document.querySelector('.main-menu');
  var menuWidth = menu.querySelector('.menu>ul').getBoundingClientRect().width;
  if (menuWidth > 250) menuWidth = 250;
  menu.addEventListener('click', function (e) {
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (!(e.target.closest('.main-menu__burger') || e.target.closest('.menu__cover'))) return;
    menu.classList.toggle('main-menu--open');

    if (document.body.style.overflow) {
      document.body.style.overflow = "";
      document.body.style.marginRight = "";
      menu.querySelector('.menu').style.left = '';
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = scrollbarWidth + "px";
      menu.querySelector('.menu').style.left = -menuWidth + scrollbarWidth + 'px';
    }
  });
};

/***/ }),

/***/ "../modules/polyfills.js":
/*!*******************************!*\
  !*** ../modules/polyfills.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  'use strict'; //closest polyfill for IE

  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;

      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);

      return null;
    };
  } //NodeList.forEach()


  if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');

    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;

      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  } //classList
  // 1. String.prototype.trim polyfill


  if (!"".trim) String.prototype.trim = function () {
    return this.replace(/^[\s﻿]+|[\s﻿]+$/g, '');
  };

  (function (window) {
    "use strict"; // prevent global namespace pollution

    if (!window.DOMException) (DOMException = function DOMException(reason) {
      this.message = reason;
    }).prototype = new Error();

    var wsRE = /[\11\12\14\15\40]/,
        wsIndex = 0,
        checkIfValidClassListEntry = function checkIfValidClassListEntry(O, V) {
      if (V === "") throw new DOMException("Failed to execute '" + O + "' on 'DOMTokenList': The token provided must not be empty.");
      if ((wsIndex = V.search(wsRE)) !== -1) throw new DOMException("Failed to execute '" + O + "' on 'DOMTokenList': " + "The token provided ('" + V[wsIndex] + "') contains HTML space characters, which are not valid in tokens.");
    }; // 2. Implement the barebones DOMTokenList livelyness polyfill


    if (typeof DOMTokenList !== "function") (function (window) {
      var document = window.document,
          Object = window.Object,
          hasOwnProp = Object.prototype.hasOwnProperty;
      var defineProperty = Object.defineProperty,
          allowTokenListConstruction = 0,
          skipPropChange = 0;

      function DOMTokenList() {
        if (!allowTokenListConstruction) throw TypeError("Illegal constructor"); // internally let it through
      }

      DOMTokenList.prototype.toString = DOMTokenList.prototype.toLocaleString = function () {
        return this.value;
      };

      DOMTokenList.prototype.add = function () {
        a: for (var v = 0, argLen = arguments.length, val = "", ele = this[" uCL"], proto = ele[" uCLp"]; v !== argLen; ++v) {
          val = arguments[v] + "", checkIfValidClassListEntry("add", val);

          for (var i = 0, Len = proto.length, resStr = val; i !== Len; ++i) {
            if (this[i] === val) continue a;else resStr += " " + this[i];
          }

          this[Len] = val, proto.length += 1, proto.value = resStr;
        }

        skipPropChange = 1, ele.className = proto.value, skipPropChange = 0;
      };

      DOMTokenList.prototype.remove = function () {
        for (var v = 0, argLen = arguments.length, val = "", ele = this[" uCL"], proto = ele[" uCLp"]; v !== argLen; ++v) {
          val = arguments[v] + "", checkIfValidClassListEntry("remove", val);

          for (var i = 0, Len = proto.length, resStr = "", is = 0; i !== Len; ++i) {
            if (is) {
              this[i - 1] = this[i];
            } else {
              if (this[i] !== val) {
                resStr += this[i] + " ";
              } else {
                is = 1;
              }
            }
          }

          if (!is) continue;
          delete this[Len], proto.length -= 1, proto.value = resStr;
        }

        skipPropChange = 1, ele.className = proto.value, skipPropChange = 0;
      };

      window.DOMTokenList = DOMTokenList;

      function whenPropChanges() {
        var evt = window.event,
            prop = evt.propertyName;

        if (!skipPropChange && (prop === "className" || prop === "classList" && !defineProperty)) {
          var target = evt.srcElement,
              protoObjProto = target[" uCLp"],
              strval = "" + target[prop];
          var tokens = strval.trim().split(wsRE),
              resTokenList = target[prop === "classList" ? " uCL" : "classList"];
          var oldLen = protoObjProto.length;

          a: for (var cI = 0, cLen = protoObjProto.length = tokens.length, sub = 0; cI !== cLen; ++cI) {
            for (var innerI = 0; innerI !== cI; ++innerI) {
              if (tokens[innerI] === tokens[cI]) {
                sub++;
                continue a;
              }
            }

            resTokenList[cI - sub] = tokens[cI];
          }

          for (var i = cLen - sub; i < oldLen; ++i) {
            delete resTokenList[i];
          } //remove trailing indexs


          if (prop !== "classList") return;
          skipPropChange = 1, target.classList = resTokenList, target.className = strval;
          skipPropChange = 0, resTokenList.length = tokens.length - sub;
        }
      }

      function polyfillClassList(ele) {
        if (!ele || !("innerHTML" in ele)) throw TypeError("Illegal invocation");
        ele.detachEvent("onpropertychange", whenPropChanges); // prevent duplicate handler infinite loop

        allowTokenListConstruction = 1;

        try {
          var _protoObj = function _protoObj() {};

          _protoObj.prototype = new DOMTokenList();
        } finally {
          allowTokenListConstruction = 0;
        }

        var protoObjProto = protoObj.prototype,
            resTokenList = new protoObj();

        a: for (var toks = ele.className.trim().split(wsRE), cI = 0, cLen = toks.length, sub = 0; cI !== cLen; ++cI) {
          for (var innerI = 0; innerI !== cI; ++innerI) {
            if (toks[innerI] === toks[cI]) {
              sub++;
              continue a;
            }
          }

          this[cI - sub] = toks[cI];
        }

        protoObjProto.length = cLen - sub, protoObjProto.value = ele.className, protoObjProto[" uCL"] = ele;

        if (defineProperty) {
          defineProperty(ele, "classList", {
            // IE8 & IE9 allow defineProperty on the DOM
            enumerable: 1,
            get: function get() {
              return resTokenList;
            },
            configurable: 0,
            set: function set(newVal) {
              skipPropChange = 1, ele.className = protoObjProto.value = newVal += "", skipPropChange = 0;
              var toks = newVal.trim().split(wsRE),
                  oldLen = protoObjProto.length;

              a: for (var cI = 0, cLen = protoObjProto.length = toks.length, sub = 0; cI !== cLen; ++cI) {
                for (var innerI = 0; innerI !== cI; ++innerI) {
                  if (toks[innerI] === toks[cI]) {
                    sub++;
                    continue a;
                  }
                }

                resTokenList[cI - sub] = toks[cI];
              }

              for (var i = cLen - sub; i < oldLen; ++i) {
                delete resTokenList[i];
              } //remove trailing indexs

            }
          });
          defineProperty(ele, " uCLp", {
            // for accessing the hidden prototype
            enumerable: 0,
            configurable: 0,
            writeable: 0,
            value: protoObj.prototype
          });
          defineProperty(protoObjProto, " uCL", {
            enumerable: 0,
            configurable: 0,
            writeable: 0,
            value: ele
          });
        } else {
          ele.classList = resTokenList, ele[" uCL"] = resTokenList, ele[" uCLp"] = protoObj.prototype;
        }

        ele.attachEvent("onpropertychange", whenPropChanges);
      }

      try {
        // Much faster & cleaner version for IE8 & IE9:
        // Should work in IE8 because Element.prototype instanceof Node is true according to the specs
        window.Object.defineProperty(window.Element.prototype, "classList", {
          enumerable: 1,
          get: function get(val) {
            if (!hasOwnProp.call(this, "classList")) polyfillClassList(this);
            return this.classList;
          },
          configurable: 0,
          set: function set(val) {
            this.className = val;
          }
        });
      } catch (e) {
        // Less performant fallback for older browsers (IE 6-8):
        window[" uCL"] = polyfillClassList; // the below code ensures polyfillClassList is applied to all current and future elements in the doc.

        document.documentElement.firstChild.appendChild(document.createElement('style')).styleSheet.cssText = '_*{x-uCLp:expression(!this.hasOwnProperty("classList")&&window[" uCL"](this))}' + //  IE6
        '[class]{x-uCLp/**/:expression(!this.hasOwnProperty("classList")&&window[" uCL"](this))}' //IE7-8
        ;
      }
    })(window); // 3. Patch in unsupported methods in DOMTokenList

    (function (DOMTokenListProto, testClass) {
      if (!DOMTokenListProto.item) DOMTokenListProto.item = function (i) {
        function NullCheck(n) {
          return n === void 0 ? null : n;
        }

        return NullCheck(this[i]);
      };
      if (!DOMTokenListProto.toggle || testClass.toggle("a", 0) !== false) DOMTokenListProto.toggle = function (val) {
        if (arguments.length > 1) return this[arguments[1] ? "add" : "remove"](val), !!arguments[1];
        var oldValue = this.value;
        return this.remove(oldValue), oldValue === this.value && (this.add(val), true)
        /*|| false*/
        ;
      };
      if (!DOMTokenListProto.replace || typeof testClass.replace("a", "b") !== "boolean") DOMTokenListProto.replace = function (oldToken, newToken) {
        checkIfValidClassListEntry("replace", oldToken), checkIfValidClassListEntry("replace", newToken);
        var oldValue = this.value;
        return this.remove(oldToken), this.value !== oldValue && (this.add(newToken), true);
      };
      if (!DOMTokenListProto.contains) DOMTokenListProto.contains = function (value) {
        for (var i = 0, Len = this.length; i !== Len; ++i) {
          if (this[i] === value) return true;
        }

        return false;
      };
      if (!DOMTokenListProto.forEach) DOMTokenListProto.forEach = function (f) {
        if (arguments.length === 1) for (var i = 0, Len = this.length; i !== Len; ++i) {
          f(this[i], i, this);
        } else for (var i = 0, Len = this.length, tArg = arguments[1]; i !== Len; ++i) {
          f.call(tArg, this[i], i, this);
        }
      };
      if (!DOMTokenListProto.entries) DOMTokenListProto.entries = function () {
        var nextIndex = 0,
            that = this;
        return {
          next: function next() {
            return nextIndex < that.length ? {
              value: [nextIndex, that[nextIndex++]],
              done: false
            } : {
              done: true
            };
          }
        };
      };
      if (!DOMTokenListProto.values) DOMTokenListProto.values = function () {
        var nextIndex = 0,
            that = this;
        return {
          next: function next() {
            return nextIndex < that.length ? {
              value: that[nextIndex++],
              done: false
            } : {
              done: true
            };
          }
        };
      };
      if (!DOMTokenListProto.keys) DOMTokenListProto.keys = function () {
        var nextIndex = 0,
            that = this;
        return {
          next: function next() {
            return nextIndex < that.length ? {
              value: nextIndex++,
              done: false
            } : {
              done: true
            };
          }
        };
      };
    })(window.DOMTokenList.prototype, window.document.createElement("div").classList);
  })(window);
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdCBzeW5jIG5vbnJlY3Vyc2l2ZSBeXFwuXFwvbG9nJCIsIndlYnBhY2s6Ly8vLi4vbW9kdWxlcy9tZW51LmpzIiwid2VicGFjazovLy8uLi9tb2R1bGVzL3BvbHlmaWxscy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWVudSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm1lbnVXaWR0aCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzY3JvbGxiYXJXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsInRhcmdldCIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJib2R5Iiwic3R5bGUiLCJvdmVyZmxvdyIsIm1hcmdpblJpZ2h0IiwibGVmdCIsIkVsZW1lbnQiLCJwcm90b3R5cGUiLCJtYXRjaGVzIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJzIiwiZWwiLCJjYWxsIiwicGFyZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsIk5vZGVMaXN0IiwiZm9yRWFjaCIsImNvbnNvbGUiLCJpbmZvIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiaSIsImxlbmd0aCIsInRyaW0iLCJTdHJpbmciLCJyZXBsYWNlIiwiRE9NRXhjZXB0aW9uIiwicmVhc29uIiwibWVzc2FnZSIsIkVycm9yIiwid3NSRSIsIndzSW5kZXgiLCJjaGVja0lmVmFsaWRDbGFzc0xpc3RFbnRyeSIsIk8iLCJWIiwic2VhcmNoIiwiRE9NVG9rZW5MaXN0IiwiT2JqZWN0IiwiaGFzT3duUHJvcCIsImhhc093blByb3BlcnR5IiwiZGVmaW5lUHJvcGVydHkiLCJhbGxvd1Rva2VuTGlzdENvbnN0cnVjdGlvbiIsInNraXBQcm9wQ2hhbmdlIiwiVHlwZUVycm9yIiwidG9TdHJpbmciLCJ0b0xvY2FsZVN0cmluZyIsInZhbHVlIiwiYWRkIiwiYSIsInYiLCJhcmdMZW4iLCJhcmd1bWVudHMiLCJ2YWwiLCJlbGUiLCJwcm90byIsIkxlbiIsInJlc1N0ciIsImNsYXNzTmFtZSIsInJlbW92ZSIsImlzIiwid2hlblByb3BDaGFuZ2VzIiwiZXZ0IiwiZXZlbnQiLCJwcm9wIiwicHJvcGVydHlOYW1lIiwic3JjRWxlbWVudCIsInByb3RvT2JqUHJvdG8iLCJzdHJ2YWwiLCJ0b2tlbnMiLCJzcGxpdCIsInJlc1Rva2VuTGlzdCIsIm9sZExlbiIsImNJIiwiY0xlbiIsInN1YiIsImlubmVySSIsInBvbHlmaWxsQ2xhc3NMaXN0IiwiZGV0YWNoRXZlbnQiLCJwcm90b09iaiIsInRva3MiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiY29uZmlndXJhYmxlIiwic2V0IiwibmV3VmFsIiwid3JpdGVhYmxlIiwiYXR0YWNoRXZlbnQiLCJmaXJzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJET01Ub2tlbkxpc3RQcm90byIsInRlc3RDbGFzcyIsIml0ZW0iLCJOdWxsQ2hlY2siLCJuIiwib2xkVmFsdWUiLCJvbGRUb2tlbiIsIm5ld1Rva2VuIiwiY29udGFpbnMiLCJmIiwidEFyZyIsImVudHJpZXMiLCJuZXh0SW5kZXgiLCJ0aGF0IiwibmV4dCIsImRvbmUiLCJ2YWx1ZXMiLCJrZXlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RTs7Ozs7Ozs7Ozs7QUN0QkFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixZQUFXO0FBQ3hCOztBQUVBLE1BQUlDLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFlBQXZCLENBQVg7QUFDQSxN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QVMsR0FBRyxDQUFoQjtBQUFBLFlBQW1CQyxJQUFJLEdBQUcsSUFBMUI7QUFDQSxlQUFPO0FBQUNDLGNBQUksRUFBRSxnQkFBVztBQUNyQixtQkFBT0YsU0FBUyxHQUFDQyxJQUFJLENBQUNuRixNQUFmLEdBQXdCO0FBQUN3QixtQkFBSyxFQUFFMEQsU0FBUyxFQUFqQjtBQUFxQkcsa0JBQUksRUFBRTtBQUEzQixhQUF4QixHQUE0RDtBQUFDQSxrQkFBSSxFQUFFO0FBQVAsYUFBbkU7QUFDSDtBQUZNLFNBQVA7QUFHSCxPQUw0QjtBQU1oQyxLQXpDRCxFQXlDR3BILE1BQU0sQ0FBQzZDLFlBQVAsQ0FBb0IvQixTQXpDdkIsRUF5Q2tDZCxNQUFNLENBQUNSLFFBQVAsQ0FBZ0IwRyxhQUFoQixDQUE4QixLQUE5QixFQUFxQzVGLFNBekN2RTtBQTBDQyxHQS9JRCxFQStJR04sTUEvSUg7QUFnSkQsQ0FwTEQsQyIsImZpbGUiOiJqcy9hYm91dH5jb250YWN0fmhvbWV+cG9ydGZvbGlvfnNlcnZpY2VzfnRlYW1+dmFjYW5jaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcCA9IHtcblx0XCIuL2xvZ1wiOiBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgXlxcXFwuXFxcXC9sb2ckXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW1lbnUnKTtcclxuICAgIGxldCBtZW51V2lkdGggPSBtZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51PnVsJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcblxyXG4gICAgaWYobWVudVdpZHRoID4gMjUwKSBtZW51V2lkdGggPSAyNTA7XHJcblxyXG4gICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzY3JvbGxiYXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cclxuICAgICAgICBpZighKGUudGFyZ2V0LmNsb3Nlc3QoJy5tYWluLW1lbnVfX2J1cmdlcicpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5tZW51X19jb3ZlcicpKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21haW4tbWVudS0tb3BlbicpO1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW5SaWdodCA9IFwiXCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jykuc3R5bGUubGVmdCA9ICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1lbnUucXVlcnlTZWxlY3RvcignLm1lbnUnKS5zdHlsZS5sZWZ0ID0gLW1lbnVXaWR0aCArIHNjcm9sbGJhcldpZHRoICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKXtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8vY2xvc2VzdCBwb2x5ZmlsbCBmb3IgSUVcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuICB9XHJcbiAgICBcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICB2YXIgZWwgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgaWYgKEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMuY2FsbChlbCwgcykpIHJldHVybiBlbDtcclxuICAgICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlO1xyXG4gICAgICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfTtcclxuICB9XHJcblxyXG4gIC8vTm9kZUxpc3QuZm9yRWFjaCgpXHJcblxyXG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcclxuICAgIGNvbnNvbGUuaW5mbygncG9seWZpbGwgZm9yIElFMTEnKTtcclxuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzW2ldLCBpLCB0aGlzKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vY2xhc3NMaXN0XHJcblxyXG4gIC8vIDEuIFN0cmluZy5wcm90b3R5cGUudHJpbSBwb2x5ZmlsbFxyXG4gIGlmICghXCJcIi50cmltKSBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5yZXBsYWNlKC9eW1xcc++7v10rfFtcXHPvu79dKyQvZywgJycpOyB9O1xyXG4gIChmdW5jdGlvbih3aW5kb3cpe1widXNlIHN0cmljdFwiOyAvLyBwcmV2ZW50IGdsb2JhbCBuYW1lc3BhY2UgcG9sbHV0aW9uXHJcbiAgaWYoIXdpbmRvdy5ET01FeGNlcHRpb24pIChET01FeGNlcHRpb24gPSBmdW5jdGlvbihyZWFzb24pe3RoaXMubWVzc2FnZSA9IHJlYXNvbn0pLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcclxuICB2YXIgd3NSRSA9IC9bXFwxMVxcMTJcXDE0XFwxNVxcNDBdLywgd3NJbmRleCA9IDAsIGNoZWNrSWZWYWxpZENsYXNzTGlzdEVudHJ5ID0gZnVuY3Rpb24oTywgVikge1xyXG4gICAgaWYgKFYgPT09IFwiXCIpIHRocm93IG5ldyBET01FeGNlcHRpb24oXHJcbiAgICAgIFwiRmFpbGVkIHRvIGV4ZWN1dGUgJ1wiICsgTyArIFwiJyBvbiAnRE9NVG9rZW5MaXN0JzogVGhlIHRva2VuIHByb3ZpZGVkIG11c3Qgbm90IGJlIGVtcHR5LlwiICk7XHJcbiAgICBpZigod3NJbmRleD1WLnNlYXJjaCh3c1JFKSkhPT0tMSkgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcIkZhaWxlZCB0byBleGVjdXRlICdcIitPK1wiJyBvbiAnRE9NVG9rZW5MaXN0JzogXCIgK1xyXG4gICAgICBcIlRoZSB0b2tlbiBwcm92aWRlZCAoJ1wiK1Zbd3NJbmRleF0rXCInKSBjb250YWlucyBIVE1MIHNwYWNlIGNoYXJhY3RlcnMsIHdoaWNoIGFyZSBub3QgdmFsaWQgaW4gdG9rZW5zLlwiKTtcclxuICB9XHJcbiAgLy8gMi4gSW1wbGVtZW50IHRoZSBiYXJlYm9uZXMgRE9NVG9rZW5MaXN0IGxpdmVseW5lc3MgcG9seWZpbGxcclxuICBpZiAodHlwZW9mIERPTVRva2VuTGlzdCAhPT0gXCJmdW5jdGlvblwiKSAoZnVuY3Rpb24od2luZG93KXtcclxuICAgICAgdmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LCBPYmplY3QgPSB3aW5kb3cuT2JqZWN0LCBoYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgdmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5LCBhbGxvd1Rva2VuTGlzdENvbnN0cnVjdGlvbiA9IDAsIHNraXBQcm9wQ2hhbmdlID0gMDtcclxuICAgICAgZnVuY3Rpb24gRE9NVG9rZW5MaXN0KCl7XHJcbiAgICAgICAgICBpZiAoIWFsbG93VG9rZW5MaXN0Q29uc3RydWN0aW9uKSB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGNvbnN0cnVjdG9yXCIpOyAvLyBpbnRlcm5hbGx5IGxldCBpdCB0aHJvdWdoXHJcbiAgICAgIH1cclxuICAgICAgRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9Mb2NhbGVTdHJpbmcgPSBmdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtcclxuICAgICAgRE9NVG9rZW5MaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgYTogZm9yKHZhciB2PTAsIGFyZ0xlbj1hcmd1bWVudHMubGVuZ3RoLHZhbD1cIlwiLGVsZT10aGlzW1wiIHVDTFwiXSxwcm90bz1lbGVbXCIgdUNMcFwiXTsgdiE9PWFyZ0xlbjsgKyt2KSB7XHJcbiAgICAgICAgICAgICAgdmFsID0gYXJndW1lbnRzW3ZdICsgXCJcIiwgY2hlY2tJZlZhbGlkQ2xhc3NMaXN0RW50cnkoXCJhZGRcIiwgdmFsKTtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpPTAsIExlbj1wcm90by5sZW5ndGgsIHJlc1N0cj12YWw7IGkgIT09IExlbjsgKytpKVxyXG4gICAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSA9PT0gdmFsKSBjb250aW51ZSBhOyBlbHNlIHJlc1N0ciArPSBcIiBcIiArIHRoaXNbaV07XHJcbiAgICAgICAgICAgICAgdGhpc1tMZW5dID0gdmFsLCBwcm90by5sZW5ndGggKz0gMSwgcHJvdG8udmFsdWUgPSByZXNTdHI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBza2lwUHJvcENoYW5nZSA9IDEsIGVsZS5jbGFzc05hbWUgPSBwcm90by52YWx1ZSwgc2tpcFByb3BDaGFuZ2UgPSAwO1xyXG4gICAgICB9O1xyXG4gICAgICBET01Ub2tlbkxpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBmb3IgKHZhciB2PTAsIGFyZ0xlbj1hcmd1bWVudHMubGVuZ3RoLHZhbD1cIlwiLGVsZT10aGlzW1wiIHVDTFwiXSxwcm90bz1lbGVbXCIgdUNMcFwiXTsgdiAhPT0gYXJnTGVuOyArK3YpIHtcclxuICAgICAgICAgICAgICB2YWwgPSBhcmd1bWVudHNbdl0gKyBcIlwiLCBjaGVja0lmVmFsaWRDbGFzc0xpc3RFbnRyeShcInJlbW92ZVwiLCB2YWwpO1xyXG4gICAgICAgICAgICAgIGZvciAodmFyIGk9MCwgTGVuPXByb3RvLmxlbmd0aCwgcmVzU3RyPVwiXCIsIGlzPTA7IGkgIT09IExlbjsgKytpKVxyXG4gICAgICAgICAgICAgICAgICBpZihpcyl7IHRoaXNbaS0xXT10aGlzW2ldIH1lbHNleyBpZih0aGlzW2ldICE9PSB2YWwpeyByZXNTdHIrPXRoaXNbaV0rXCIgXCI7IH1lbHNleyBpcz0xOyB9IH1cclxuICAgICAgICAgICAgICBpZiAoIWlzKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICBkZWxldGUgdGhpc1tMZW5dLCBwcm90by5sZW5ndGggLT0gMSwgcHJvdG8udmFsdWUgPSByZXNTdHI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBza2lwUHJvcENoYW5nZSA9IDEsIGVsZS5jbGFzc05hbWUgPSBwcm90by52YWx1ZSwgc2tpcFByb3BDaGFuZ2UgPSAwO1xyXG4gICAgICB9O1xyXG4gICAgICB3aW5kb3cuRE9NVG9rZW5MaXN0ID0gRE9NVG9rZW5MaXN0O1xyXG4gICAgICBmdW5jdGlvbiB3aGVuUHJvcENoYW5nZXMoKXtcclxuICAgICAgICAgIHZhciBldnQgPSB3aW5kb3cuZXZlbnQsIHByb3AgPSBldnQucHJvcGVydHlOYW1lO1xyXG4gICAgICAgICAgaWYgKCAhc2tpcFByb3BDaGFuZ2UgJiYgKHByb3A9PT1cImNsYXNzTmFtZVwiIHx8IChwcm9wPT09XCJjbGFzc0xpc3RcIiAmJiAhZGVmaW5lUHJvcGVydHkpKSApIHtcclxuICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZ0LnNyY0VsZW1lbnQsIHByb3RvT2JqUHJvdG8gPSB0YXJnZXRbXCIgdUNMcFwiXSwgc3RydmFsID0gXCJcIiArIHRhcmdldFtwcm9wXTtcclxuICAgICAgICAgICAgICB2YXIgdG9rZW5zPXN0cnZhbC50cmltKCkuc3BsaXQod3NSRSksIHJlc1Rva2VuTGlzdD10YXJnZXRbcHJvcD09PVwiY2xhc3NMaXN0XCI/XCIgdUNMXCI6XCJjbGFzc0xpc3RcIl07XHJcbiAgICAgICAgICAgICAgdmFyIG9sZExlbiA9IHByb3RvT2JqUHJvdG8ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIGE6IGZvcih2YXIgY0kgPSAwLCBjTGVuID0gcHJvdG9PYmpQcm90by5sZW5ndGggPSB0b2tlbnMubGVuZ3RoLCBzdWIgPSAwOyBjSSAhPT0gY0xlbjsgKytjSSl7XHJcbiAgICAgICAgICAgICAgICAgIGZvcih2YXIgaW5uZXJJPTA7IGlubmVySSE9PWNJOyArK2lubmVySSkgaWYodG9rZW5zW2lubmVySV09PT10b2tlbnNbY0ldKSB7c3ViKys7IGNvbnRpbnVlIGE7fVxyXG4gICAgICAgICAgICAgICAgICByZXNUb2tlbkxpc3RbY0ktc3ViXSA9IHRva2Vuc1tjSV07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGZvciAodmFyIGk9Y0xlbi1zdWI7IGkgPCBvbGRMZW47ICsraSkgZGVsZXRlIHJlc1Rva2VuTGlzdFtpXTsgLy9yZW1vdmUgdHJhaWxpbmcgaW5kZXhzXHJcbiAgICAgICAgICAgICAgaWYocHJvcCAhPT0gXCJjbGFzc0xpc3RcIikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIHNraXBQcm9wQ2hhbmdlID0gMSwgdGFyZ2V0LmNsYXNzTGlzdCA9IHJlc1Rva2VuTGlzdCwgdGFyZ2V0LmNsYXNzTmFtZSA9IHN0cnZhbDtcclxuICAgICAgICAgICAgICBza2lwUHJvcENoYW5nZSA9IDAsIHJlc1Rva2VuTGlzdC5sZW5ndGggPSB0b2tlbnMubGVuZ3RoIC0gc3ViO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGZ1bmN0aW9uIHBvbHlmaWxsQ2xhc3NMaXN0KGVsZSl7XHJcbiAgICAgICAgICBpZiAoIWVsZSB8fCAhKFwiaW5uZXJIVE1MXCIgaW4gZWxlKSkgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBpbnZvY2F0aW9uXCIpO1xyXG4gICAgICAgICAgZWxlLmRldGFjaEV2ZW50KCBcIm9ucHJvcGVydHljaGFuZ2VcIiwgd2hlblByb3BDaGFuZ2VzICk7IC8vIHByZXZlbnQgZHVwbGljYXRlIGhhbmRsZXIgaW5maW5pdGUgbG9vcFxyXG4gICAgICAgICAgYWxsb3dUb2tlbkxpc3RDb25zdHJ1Y3Rpb24gPSAxO1xyXG4gICAgICAgICAgdHJ5eyBmdW5jdGlvbiBwcm90b09iaigpe30gcHJvdG9PYmoucHJvdG90eXBlID0gbmV3IERPTVRva2VuTGlzdCgpOyB9XHJcbiAgICAgICAgICBmaW5hbGx5IHsgYWxsb3dUb2tlbkxpc3RDb25zdHJ1Y3Rpb24gPSAwIH1cclxuICAgICAgICAgIHZhciBwcm90b09ialByb3RvID0gcHJvdG9PYmoucHJvdG90eXBlLCByZXNUb2tlbkxpc3QgPSBuZXcgcHJvdG9PYmooKTtcclxuICAgICAgICAgIGE6IGZvcih2YXIgdG9rcz1lbGUuY2xhc3NOYW1lLnRyaW0oKS5zcGxpdCh3c1JFKSwgY0k9MCwgY0xlbj10b2tzLmxlbmd0aCwgc3ViPTA7IGNJICE9PSBjTGVuOyArK2NJKXtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpbm5lckk9MDsgaW5uZXJJICE9PSBjSTsgKytpbm5lckkpIGlmICh0b2tzW2lubmVySV0gPT09IHRva3NbY0ldKSB7IHN1YisrOyBjb250aW51ZSBhOyB9XHJcbiAgICAgICAgICAgICAgdGhpc1tjSS1zdWJdID0gdG9rc1tjSV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwcm90b09ialByb3RvLmxlbmd0aCA9IGNMZW4tc3ViLCBwcm90b09ialByb3RvLnZhbHVlID0gZWxlLmNsYXNzTmFtZSwgcHJvdG9PYmpQcm90b1tcIiB1Q0xcIl0gPSBlbGU7XHJcbiAgICAgICAgICBpZiAoZGVmaW5lUHJvcGVydHkpIHsgZGVmaW5lUHJvcGVydHkoZWxlLCBcImNsYXNzTGlzdFwiLCB7IC8vIElFOCAmIElFOSBhbGxvdyBkZWZpbmVQcm9wZXJ0eSBvbiB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogICAxLCBnZXQ6IGZ1bmN0aW9uKCl7cmV0dXJuIHJlc1Rva2VuTGlzdH0sXHJcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiAwLCBzZXQ6IGZ1bmN0aW9uKG5ld1ZhbCl7XHJcbiAgICAgICAgICAgICAgICAgIHNraXBQcm9wQ2hhbmdlID0gMSwgZWxlLmNsYXNzTmFtZSA9IHByb3RvT2JqUHJvdG8udmFsdWUgPSAobmV3VmFsICs9IFwiXCIpLCBza2lwUHJvcENoYW5nZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgIHZhciB0b2tzID0gbmV3VmFsLnRyaW0oKS5zcGxpdCh3c1JFKSwgb2xkTGVuID0gcHJvdG9PYmpQcm90by5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgIGE6IGZvcih2YXIgY0kgPSAwLCBjTGVuID0gcHJvdG9PYmpQcm90by5sZW5ndGggPSB0b2tzLmxlbmd0aCwgc3ViID0gMDsgY0kgIT09IGNMZW47ICsrY0kpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpbm5lckk9MDsgaW5uZXJJIT09Y0k7ICsraW5uZXJJKSBpZih0b2tzW2lubmVySV09PT10b2tzW2NJXSkge3N1YisrOyBjb250aW51ZSBhO31cclxuICAgICAgICAgICAgICAgICAgICAgIHJlc1Rva2VuTGlzdFtjSS1zdWJdID0gdG9rc1tjSV07XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaT1jTGVuLXN1YjsgaSA8IG9sZExlbjsgKytpKSBkZWxldGUgcmVzVG9rZW5MaXN0W2ldOyAvL3JlbW92ZSB0cmFpbGluZyBpbmRleHNcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTsgZGVmaW5lUHJvcGVydHkoZWxlLCBcIiB1Q0xwXCIsIHsgLy8gZm9yIGFjY2Vzc2luZyB0aGUgaGlkZGVuIHByb3RvdHlwZVxyXG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IDAsIGNvbmZpZ3VyYWJsZTogMCwgd3JpdGVhYmxlOiAwLCB2YWx1ZTogcHJvdG9PYmoucHJvdG90eXBlXHJcbiAgICAgICAgICB9KTsgZGVmaW5lUHJvcGVydHkocHJvdG9PYmpQcm90bywgXCIgdUNMXCIsIHtcclxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiAwLCBjb25maWd1cmFibGU6IDAsIHdyaXRlYWJsZTogMCwgdmFsdWU6IGVsZVxyXG4gICAgICAgICAgfSk7IH0gZWxzZSB7IGVsZS5jbGFzc0xpc3Q9cmVzVG9rZW5MaXN0LCBlbGVbXCIgdUNMXCJdPXJlc1Rva2VuTGlzdCwgZWxlW1wiIHVDTHBcIl09cHJvdG9PYmoucHJvdG90eXBlOyB9XHJcbiAgICAgICAgICBlbGUuYXR0YWNoRXZlbnQoIFwib25wcm9wZXJ0eWNoYW5nZVwiLCB3aGVuUHJvcENoYW5nZXMgKTtcclxuICAgICAgfVxyXG4gICAgICB0cnkgeyAvLyBNdWNoIGZhc3RlciAmIGNsZWFuZXIgdmVyc2lvbiBmb3IgSUU4ICYgSUU5OlxyXG4gICAgICAgICAgLy8gU2hvdWxkIHdvcmsgaW4gSUU4IGJlY2F1c2UgRWxlbWVudC5wcm90b3R5cGUgaW5zdGFuY2VvZiBOb2RlIGlzIHRydWUgYWNjb3JkaW5nIHRvIHRoZSBzcGVjc1xyXG4gICAgICAgICAgd2luZG93Lk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUsIFwiY2xhc3NMaXN0XCIsIHtcclxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiAxLCAgIGdldDogZnVuY3Rpb24odmFsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzT3duUHJvcC5jYWxsKHRoaXMsIFwiY2xhc3NMaXN0XCIpKSBwb2x5ZmlsbENsYXNzTGlzdCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjb25maWd1cmFibGU6IDAsIHNldDogZnVuY3Rpb24odmFsKXt0aGlzLmNsYXNzTmFtZSA9IHZhbH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoKGUpIHsgLy8gTGVzcyBwZXJmb3JtYW50IGZhbGxiYWNrIGZvciBvbGRlciBicm93c2VycyAoSUUgNi04KTpcclxuICAgICAgICAgIHdpbmRvd1tcIiB1Q0xcIl0gPSBwb2x5ZmlsbENsYXNzTGlzdDtcclxuICAgICAgICAgIC8vIHRoZSBiZWxvdyBjb2RlIGVuc3VyZXMgcG9seWZpbGxDbGFzc0xpc3QgaXMgYXBwbGllZCB0byBhbGwgY3VycmVudCBhbmQgZnV0dXJlIGVsZW1lbnRzIGluIHRoZSBkb2MuXHJcbiAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZmlyc3RDaGlsZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpKS5zdHlsZVNoZWV0LmNzc1RleHQ9KFxyXG4gICAgICAgICAgICAgICdfKnt4LXVDTHA6ZXhwcmVzc2lvbighdGhpcy5oYXNPd25Qcm9wZXJ0eShcImNsYXNzTGlzdFwiKSYmd2luZG93W1wiIHVDTFwiXSh0aGlzKSl9JyArIC8vICBJRTZcclxuICAgICAgICAgICAgICAnW2NsYXNzXXt4LXVDTHAvKiovOmV4cHJlc3Npb24oIXRoaXMuaGFzT3duUHJvcGVydHkoXCJjbGFzc0xpc3RcIikmJndpbmRvd1tcIiB1Q0xcIl0odGhpcykpfScgLy9JRTctOFxyXG4gICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gIH0pKHdpbmRvdyk7XHJcbiAgLy8gMy4gUGF0Y2ggaW4gdW5zdXBwb3J0ZWQgbWV0aG9kcyBpbiBET01Ub2tlbkxpc3RcclxuICAoZnVuY3Rpb24oRE9NVG9rZW5MaXN0UHJvdG8sIHRlc3RDbGFzcyl7XHJcbiAgICAgIGlmICghRE9NVG9rZW5MaXN0UHJvdG8uaXRlbSkgRE9NVG9rZW5MaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgICAgZnVuY3Rpb24gTnVsbENoZWNrKG4pIHtyZXR1cm4gbj09PXZvaWQgMCA/IG51bGwgOiBufSByZXR1cm4gTnVsbENoZWNrKHRoaXNbaV0pO1xyXG4gICAgICB9O1xyXG4gICAgICBpZiAoIURPTVRva2VuTGlzdFByb3RvLnRvZ2dsZSB8fCB0ZXN0Q2xhc3MudG9nZ2xlKFwiYVwiLDApIT09ZmFsc2UpIERPTVRva2VuTGlzdFByb3RvLnRvZ2dsZT1mdW5jdGlvbih2YWwpe1xyXG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSByZXR1cm4gKHRoaXNbYXJndW1lbnRzWzFdID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJdKHZhbCksICEhYXJndW1lbnRzWzFdKTtcclxuICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgICByZXR1cm4gKHRoaXMucmVtb3ZlKG9sZFZhbHVlKSwgb2xkVmFsdWUgPT09IHRoaXMudmFsdWUgJiYgKHRoaXMuYWRkKHZhbCksIHRydWUpIC8qfHwgZmFsc2UqLyk7XHJcbiAgICAgIH07XHJcbiAgICAgIGlmICghRE9NVG9rZW5MaXN0UHJvdG8ucmVwbGFjZSB8fCB0eXBlb2YgdGVzdENsYXNzLnJlcGxhY2UoXCJhXCIsIFwiYlwiKSAhPT0gXCJib29sZWFuXCIpXHJcbiAgICAgICAgICBET01Ub2tlbkxpc3RQcm90by5yZXBsYWNlID0gZnVuY3Rpb24ob2xkVG9rZW4sIG5ld1Rva2VuKXtcclxuICAgICAgICAgICAgICBjaGVja0lmVmFsaWRDbGFzc0xpc3RFbnRyeShcInJlcGxhY2VcIiwgb2xkVG9rZW4pLCBjaGVja0lmVmFsaWRDbGFzc0xpc3RFbnRyeShcInJlcGxhY2VcIiwgbmV3VG9rZW4pO1xyXG4gICAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnJlbW92ZShvbGRUb2tlbiksIHRoaXMudmFsdWUgIT09IG9sZFZhbHVlICYmICh0aGlzLmFkZChuZXdUb2tlbiksIHRydWUpKTtcclxuICAgICAgICAgIH07XHJcbiAgICAgIGlmICghRE9NVG9rZW5MaXN0UHJvdG8uY29udGFpbnMpIERPTVRva2VuTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgICAgICAgZm9yICh2YXIgaT0wLExlbj10aGlzLmxlbmd0aDsgaSAhPT0gTGVuOyArK2kpIGlmICh0aGlzW2ldID09PSB2YWx1ZSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH07XHJcbiAgICAgIGlmICghRE9NVG9rZW5MaXN0UHJvdG8uZm9yRWFjaCkgRE9NVG9rZW5MaXN0UHJvdG8uZm9yRWFjaCA9IGZ1bmN0aW9uKGYpe1xyXG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIGZvciAodmFyIGkgPSAwLCBMZW4gPSB0aGlzLmxlbmd0aDsgaSAhPT0gTGVuOyArK2kpIGYoIHRoaXNbaV0sIGksIHRoaXMpO1xyXG4gICAgICAgICAgZWxzZSBmb3IgKHZhciBpPTAsTGVuPXRoaXMubGVuZ3RoLHRBcmc9YXJndW1lbnRzWzFdOyBpICE9PSBMZW47ICsraSkgZi5jYWxsKHRBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xyXG4gICAgICB9O1xyXG4gICAgICBpZiAoIURPTVRva2VuTGlzdFByb3RvLmVudHJpZXMpIERPTVRva2VuTGlzdFByb3RvLmVudHJpZXMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIG5leHRJbmRleCA9IDAsIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgcmV0dXJuIHtuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gbmV4dEluZGV4PHRoYXQubGVuZ3RoID8ge3ZhbHVlOiBbbmV4dEluZGV4LCB0aGF0W25leHRJbmRleCsrXV0sIGRvbmU6IGZhbHNlfSA6IHtkb25lOiB0cnVlfTtcclxuICAgICAgICAgIH19O1xyXG4gICAgICB9O1xyXG4gICAgICBpZiAoIURPTVRva2VuTGlzdFByb3RvLnZhbHVlcykgRE9NVG9rZW5MaXN0UHJvdG8udmFsdWVzID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBuZXh0SW5kZXggPSAwLCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgIHJldHVybiB7bmV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHRJbmRleDx0aGF0Lmxlbmd0aCA/IHt2YWx1ZTogdGhhdFtuZXh0SW5kZXgrK10sIGRvbmU6IGZhbHNlfSA6IHtkb25lOiB0cnVlfTtcclxuICAgICAgICAgIH19O1xyXG4gICAgICB9O1xyXG4gICAgICBpZiAoIURPTVRva2VuTGlzdFByb3RvLmtleXMpIERPTVRva2VuTGlzdFByb3RvLmtleXMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIG5leHRJbmRleCA9IDAsIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgcmV0dXJuIHtuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gbmV4dEluZGV4PHRoYXQubGVuZ3RoID8ge3ZhbHVlOiBuZXh0SW5kZXgrKywgZG9uZTogZmFsc2V9IDoge2RvbmU6IHRydWV9O1xyXG4gICAgICAgICAgfX07XHJcbiAgICAgIH07XHJcbiAgfSkod2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGUsIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLmNsYXNzTGlzdCk7XHJcbiAgfSkod2luZG93KTtcclxufTsiXSwic291cmNlUm9vdCI6IiJ9