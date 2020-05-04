require('../scss/styles.scss');

import gsap from './libs/gsap.min.js';


// function importAll(r) {
//     return r.keys().map(r);
// }
  
// const images = importAll(require.context('../img', true, /\.(png|jpe?g|svg|ico)$/));

if(module && module.hot) module.hot.accept();

import {mainMenu} from './scripts';

import {footerBG} from './libs/footer';

import {polyfills} from './libs/polyfills';

polyfills();

mainMenu();

footerBG();