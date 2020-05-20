mainMenu();

function mainMenu(){
    'use strict';

    let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    let menu = document.querySelector('.main-menu');
    let menuWidth = menu.querySelector('.menu>ul').getBoundingClientRect().width;

    if(menuWidth > 250) menuWidth = 250;

    menu.addEventListener('click', function(e){

        if(!(e.target.closest('.main-menu__burger') || e.target.closest('.menu__cover'))) return;

        menu.classList.toggle('main-menu--open');
        if(document.body.style.overflow){
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
