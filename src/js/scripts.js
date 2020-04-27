export default function mainMenu(){
    'use strict';
    let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    let menu = document.querySelector('.main-menu');
    document.querySelector('.main-menu__burger').addEventListener('click', function(){
        menu.classList.toggle('main-menu--open');
        if(document.body.style.overflow){
            document.body.style.overflow = "";
            document.body.style.marginRight = "";
        } else {
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = scrollbarWidth + "px";
        }
    });
};