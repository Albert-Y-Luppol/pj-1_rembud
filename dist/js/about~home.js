(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["about~home"],{

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

/***/ "../../scss/global.scss":
/*!***********************************************************!*\
  !*** E:/Front End/projects/1_rembud/src/scss/global.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
  } //before() IE9 +


  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('before')) {
        return;
      }

      Object.defineProperty(item, 'before', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function before() {
          var argArr = Array.prototype.slice.call(arguments),
              docFrag = document.createDocumentFragment();
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          this.parentNode.insertBefore(docFrag, this);
        }
      });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdCBzeW5jIG5vbnJlY3Vyc2l2ZSBeXFwuXFwvbG9nJCIsIndlYnBhY2s6Ly8vRTovRnJvbnQgRW5kL3Byb2plY3RzLzFfcmVtYnVkL3NyYy9zY3NzL2dsb2JhbC5zY3NzIiwid2VicGFjazovLy8uLi9tb2R1bGVzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4uL21vZHVsZXMvcG9seWZpbGxzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJtZW51IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWVudVdpZHRoIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInNjcm9sbGJhcldpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwidGFyZ2V0IiwiY2xvc2VzdCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImJvZHkiLCJzdHlsZSIsIm92ZXJmbG93IiwibWFyZ2luUmlnaHQiLCJsZWZ0IiwiRWxlbWVudCIsInByb3RvdHlwZSIsIm1hdGNoZXMiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsInMiLCJlbCIsImNhbGwiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwiTm9kZUxpc3QiLCJmb3JFYWNoIiwiY29uc29sZSIsImluZm8iLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiYXJyIiwiaXRlbSIsImhhc093blByb3BlcnR5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSIsImJlZm9yZSIsImFyZ0FyciIsIkFycmF5Iiwic2xpY2UiLCJhcmd1bWVudHMiLCJkb2NGcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFyZ0l0ZW0iLCJpc05vZGUiLCJOb2RlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsIlN0cmluZyIsImluc2VydEJlZm9yZSIsIkNoYXJhY3RlckRhdGEiLCJEb2N1bWVudFR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFOzs7Ozs7Ozs7OztBQ3RCQSx1Qzs7Ozs7Ozs7Ozs7QUNBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVc7QUFDeEI7O0FBRUEsTUFBSUMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBWDtBQUNBLE1BQUlDLFNBQVMsR0FBR0gsSUFBSSxDQUFDRSxhQUFMLENBQW1CLFVBQW5CLEVBQStCRSxxQkFBL0IsR0FBdURDLEtBQXZFO0FBRUEsTUFBR0YsU0FBUyxHQUFHLEdBQWYsRUFBb0JBLFNBQVMsR0FBRyxHQUFaO0FBRXBCSCxNQUFJLENBQUNNLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQVNDLENBQVQsRUFBVztBQUV0QyxRQUFJQyxjQUFjLEdBQUdDLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQlQsUUFBUSxDQUFDVSxlQUFULENBQXlCQyxXQUFsRTtBQUVBLFFBQUcsRUFBRUwsQ0FBQyxDQUFDTSxNQUFGLENBQVNDLE9BQVQsQ0FBaUIsb0JBQWpCLEtBQTBDUCxDQUFDLENBQUNNLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQixjQUFqQixDQUE1QyxDQUFILEVBQWtGO0FBRWxGZCxRQUFJLENBQUNlLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixpQkFBdEI7O0FBQ0EsUUFBR2YsUUFBUSxDQUFDZ0IsSUFBVCxDQUFjQyxLQUFkLENBQW9CQyxRQUF2QixFQUFnQztBQUM1QmxCLGNBQVEsQ0FBQ2dCLElBQVQsQ0FBY0MsS0FBZCxDQUFvQkMsUUFBcEIsR0FBK0IsRUFB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Q0FBQzdCLFNBQU4sQ0FBZ0I4QixLQUFoQixDQUFzQnhCLElBQXRCLENBQTJCeUIsU0FBM0IsQ0FBYjtBQUFBLGNBQ0VDLE9BQU8sR0FBR3RELFFBQVEsQ0FBQ3VELHNCQUFULEVBRFo7QUFHQUwsZ0JBQU0sQ0FBQ2pCLE9BQVAsQ0FBZSxVQUFVdUIsT0FBVixFQUFtQjtBQUNoQyxnQkFBSUMsTUFBTSxHQUFHRCxPQUFPLFlBQVlFLElBQWhDO0FBQ0FKLG1CQUFPLENBQUNLLFdBQVIsQ0FBb0JGLE1BQU0sR0FBR0QsT0FBSCxHQUFheEQsUUFBUSxDQUFDNEQsY0FBVCxDQUF3QkMsTUFBTSxDQUFDTCxPQUFELENBQTlCLENBQXZDO0FBQ0QsV0FIRDtBQUtBLGVBQUsxQixVQUFMLENBQWdCZ0MsWUFBaEIsQ0FBNkJSLE9BQTdCLEVBQXNDLElBQXRDO0FBQ0Q7QUFkbUMsT0FBdEM7QUFnQkQsS0FwQkQ7QUFxQkQsR0F0QkQsRUFzQkcsQ0FBQ2pDLE9BQU8sQ0FBQ0MsU0FBVCxFQUFvQnlDLGFBQWEsQ0FBQ3pDLFNBQWxDLEVBQTZDMEMsWUFBWSxDQUFDMUMsU0FBMUQsQ0F0Qkg7QUF3QkQsQ0F6REQsQyIsImZpbGUiOiJqcy9hYm91dH5ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcCA9IHtcblx0XCIuL2xvZ1wiOiBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgXlxcXFwuXFxcXC9sb2ckXCI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW1lbnUnKTtcclxuICAgIGxldCBtZW51V2lkdGggPSBtZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51PnVsJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcblxyXG4gICAgaWYobWVudVdpZHRoID4gMjUwKSBtZW51V2lkdGggPSAyNTA7XHJcblxyXG4gICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzY3JvbGxiYXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cclxuICAgICAgICBpZighKGUudGFyZ2V0LmNsb3Nlc3QoJy5tYWluLW1lbnVfX2J1cmdlcicpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5tZW51X19jb3ZlcicpKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21haW4tbWVudS0tb3BlbicpO1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW5SaWdodCA9IFwiXCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jykuc3R5bGUubGVmdCA9ICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1lbnUucXVlcnlTZWxlY3RvcignLm1lbnUnKS5zdHlsZS5sZWZ0ID0gLW1lbnVXaWR0aCArIHNjcm9sbGJhcldpZHRoICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKXtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8vY2xvc2VzdCBwb2x5ZmlsbCBmb3IgSUVcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuICB9XHJcbiAgICBcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICB2YXIgZWwgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgaWYgKEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMuY2FsbChlbCwgcykpIHJldHVybiBlbDtcclxuICAgICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlO1xyXG4gICAgICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfTtcclxuICB9XHJcblxyXG4gIC8vTm9kZUxpc3QuZm9yRWFjaCgpXHJcblxyXG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcclxuICAgIGNvbnNvbGUuaW5mbygncG9seWZpbGwgZm9yIElFMTEnKTtcclxuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzW2ldLCBpLCB0aGlzKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vYmVmb3JlKCkgSUU5ICtcclxuICAoZnVuY3Rpb24gKGFycikge1xyXG4gICAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ2JlZm9yZScpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdGVtLCAnYmVmb3JlJywge1xyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBiZWZvcmUoKSB7XHJcbiAgICAgICAgICB2YXIgYXJnQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxcclxuICAgICAgICAgICAgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgYXJnQXJyLmZvckVhY2goZnVuY3Rpb24gKGFyZ0l0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzTm9kZSA9IGFyZ0l0ZW0gaW5zdGFuY2VvZiBOb2RlO1xyXG4gICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGlzTm9kZSA/IGFyZ0l0ZW0gOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoYXJnSXRlbSkpKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGRvY0ZyYWcsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KShbRWxlbWVudC5wcm90b3R5cGUsIENoYXJhY3RlckRhdGEucHJvdG90eXBlLCBEb2N1bWVudFR5cGUucHJvdG90eXBlXSk7XHJcblxyXG59OyJdLCJzb3VyY2VSb290IjoiIn0=