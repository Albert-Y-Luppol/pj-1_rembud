module.exports = function (){
    'use strict';

    //closest polyfill for IE
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
      
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
          var el = this;
      
          do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
          } while (el !== null && el.nodeType === 1);
          return null;
        };
    }

    //NodeList.forEach()

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