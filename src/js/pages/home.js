require('../modules/polyfills')();
require('../modules/menu')();
require('../modules/lazyLoad')();



import ( /* webpackPrefetch: true, webpackChunkName: "footer" */ '../modules/footer').then(module=>{
    module.default();
});

import '../../scss/global';
import '../../scss/pages/home/page';