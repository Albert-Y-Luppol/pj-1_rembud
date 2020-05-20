
if(module && module.hot) module.hot.accept();

// require('../html/views/en/home/home.html');

require('./scripts');

require('../scss/styles.scss')


var glob = require( 'glob' ),
    path = require( 'path' );

glob.sync( './pages/**/*.js' ).forEach( function( file ) {
  require( path.resolve( file ) );
});


glob.sync( '../scss/pages/**/*.scss' ).forEach( function( file ) {
    require( path.resolve( file ) );
});
