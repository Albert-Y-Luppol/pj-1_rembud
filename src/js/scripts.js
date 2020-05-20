
//= ./lib/_polyfills.js

insertReusableComponents();

// functions


function insertReusableComponents(){
    insertSvgSprite();
    insertMenu();
}

function insertSvgSprite(){
    let url='../../parts/svg-sprite.html'

    fetch(url)
        .then(response=>response.text())
        .then((html)=>{
            document.body.querySelector('.body').insertAdjacentHTML('beforeend',html);
        });
}

function insertMenu(){
    let url='../parts/header.html'

    fetch(url)
        .then(response=>response.text())
        .then((html)=>{
            document.body.querySelector('.body').insertAdjacentHTML('afterbegin',html);
            //= ./lib/_menu
        });
};
