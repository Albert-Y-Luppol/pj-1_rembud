(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[function(e,t){e.exports=function(){"use strict";Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(Element.prototype.matches.call(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),"NodeList"in window&&!NodeList.prototype.forEach&&(console.info("polyfill for IE11"),NodeList.prototype.forEach=function(e,t){t=t||window;for(var o=0;o<this.length;o++)e.call(t,this[o],o,this)})}},function(e,t){e.exports=function(){"use strict";let e=document.querySelector(".main-menu"),t=e.querySelector(".menu>ul").getBoundingClientRect().width;t>250&&(t=250),e.addEventListener("click",(function(o){let n=window.innerWidth-document.documentElement.clientWidth;(o.target.closest(".main-menu__burger")||o.target.closest(".menu__cover"))&&(e.classList.toggle("main-menu--open"),document.body.style.overflow?(document.body.style.overflow="",document.body.style.marginRight="",e.querySelector(".menu").style.left=""):(document.body.style.overflow="hidden",document.body.style.marginRight=n+"px",e.querySelector(".menu").style.left=-t+n+"px"))}))}},,function(e,t,o){}]]);