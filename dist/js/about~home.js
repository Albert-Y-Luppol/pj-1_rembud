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
  }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdCBzeW5jIG5vbnJlY3Vyc2l2ZSBeXFwuXFwvbG9nJCIsIndlYnBhY2s6Ly8vRTovRnJvbnQgRW5kL3Byb2plY3RzLzFfcmVtYnVkL3NyYy9zY3NzL2dsb2JhbC5zY3NzIiwid2VicGFjazovLy8uLi9tb2R1bGVzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4uL21vZHVsZXMvcG9seWZpbGxzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJtZW51IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWVudVdpZHRoIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInNjcm9sbGJhcldpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwidGFyZ2V0IiwiY2xvc2VzdCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImJvZHkiLCJzdHlsZSIsIm92ZXJmbG93IiwibWFyZ2luUmlnaHQiLCJsZWZ0IiwiRWxlbWVudCIsInByb3RvdHlwZSIsIm1hdGNoZXMiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsInMiLCJlbCIsImNhbGwiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwiTm9kZUxpc3QiLCJmb3JFYWNoIiwiY29uc29sZSIsImluZm8iLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RTs7Ozs7Ozs7Ozs7QUN0QkEsdUM7Ozs7Ozs7Ozs7O0FDQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixZQUFX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LE9BQW5CLEdBQTZCLFVBQVVHLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCO0FBQ3hEQSxhQUFPLEdBQUdBLE9BQU8sSUFBSTdCLE1BQXJCOztBQUNBLFdBQUssSUFBSThCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0MsTUFBekIsRUFBaUNELENBQUMsRUFBbEMsRUFBc0M7QUFDcENGLGdCQUFRLENBQUNSLElBQVQsQ0FBY1MsT0FBZCxFQUF1QixLQUFLQyxDQUFMLENBQXZCLEVBQWdDQSxDQUFoQyxFQUFtQyxJQUFuQztBQUNEO0FBQ0YsS0FMRDtBQU1EO0FBQ0osQ0EvQkQsQyIsImZpbGUiOiJqcy9hYm91dH5ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcCA9IHtcblx0XCIuL2xvZ1wiOiBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgXlxcXFwuXFxcXC9sb2ckXCI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW1lbnUnKTtcclxuICAgIGxldCBtZW51V2lkdGggPSBtZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51PnVsJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcblxyXG4gICAgaWYobWVudVdpZHRoID4gMjUwKSBtZW51V2lkdGggPSAyNTA7XHJcblxyXG4gICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzY3JvbGxiYXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cclxuICAgICAgICBpZighKGUudGFyZ2V0LmNsb3Nlc3QoJy5tYWluLW1lbnVfX2J1cmdlcicpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5tZW51X19jb3ZlcicpKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21haW4tbWVudS0tb3BlbicpO1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW5SaWdodCA9IFwiXCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jykuc3R5bGUubGVmdCA9ICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1lbnUucXVlcnlTZWxlY3RvcignLm1lbnUnKS5zdHlsZS5sZWZ0ID0gLW1lbnVXaWR0aCArIHNjcm9sbGJhcldpZHRoICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvL2Nsb3Nlc3QgcG9seWZpbGwgZm9yIElFXHJcbiAgICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xyXG4gICAgfVxyXG4gICAgICBcclxuICAgIGlmICghRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xyXG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICB2YXIgZWwgPSB0aGlzO1xyXG4gICAgICBcclxuICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMuY2FsbChlbCwgcykpIHJldHVybiBlbDtcclxuICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICB9IHdoaWxlIChlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSk7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vTm9kZUxpc3QuZm9yRWFjaCgpXHJcblxyXG4gICAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xyXG4gICAgICBjb25zb2xlLmluZm8oJ3BvbHlmaWxsIGZvciBJRTExJyk7XHJcbiAgICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzW2ldLCBpLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==