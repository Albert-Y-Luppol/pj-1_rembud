require('../scss/styles.scss');


// function importAll(r) {
//     return r.keys().map(r);
// }
  
// const images = importAll(require.context('../img', true, /\.(png|jpe?g|svg|ico)$/));

if(module && module.hot) module.hot.accept();

import mainMenu from './scripts';

mainMenu();