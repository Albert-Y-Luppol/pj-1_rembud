require('../modules/polyfills')();
require('../modules/menu')();

import ( /* webpackPrefetch: true, webpackChunkName: "footer" */ '../modules/footer').then(module=>{
    module.default();
});
