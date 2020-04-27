export function mainMenu(){
    'use strict';

    let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    let menu = document.querySelector('.main-menu');
    menu.addEventListener('click', function(e){

        if(!(e.target.closest('.main-menu__burger') || e.target.closest('.menu__cover'))) return;

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