if(process.env.NODE_env === 'producion'){
    module.exports = {
        plugins: [
            require('autoprefixer'),
            require('cssnano')
        ]
    }
}