const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlPlugins = generateHtmlPlugins('./src/html/views');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');


function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `html/${name}.html`,
            template: path.resolve(__dirname, `${templateDir}`,`${name}.${extension}`),
            inject: false,
        })
    })
}



module.exports = {
    entry: [
        './src/js/main.js',
    ],
    output: {
        filename: 'js/main.js'
    },
    module: {
        rules: [

            //js

            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            //html packing

            {
                test: /\.html$/,
                include: path.resolve(__dirname, './src/html/includes'),
                use: ['raw-loader']
            },

            //sass

            {
                test: /\.(css|sass|scss)$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        //resolve ur() and @import inside CSS
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                        }
                    },
                    {
                        // autoprefixer and minify
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({grid: "autoplace"})
                            ],
                            sourceMap: true,
                        }
                    },
                    {
                        // transform SASS => CSS
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            implementation: require('sass')
                        }
                    }
                ]
            },

            // //img
            // {
            //     test: /\.(png|jpe?g|gif|svg|ico)$/,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 name: '[path][name].[ext]'.replace('src/', ''),
            //             },
            //         }
            //     ],
            // },

            //fonts
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        // Using file-loader too
                        loader: "file-loader",
                        options: {
                            name: '[name].[hash].[ext]',
                            publicPath: '../fonts',
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: './css/styles.min.css',
        }),

        // new webpack.HotModuleReplacementPlugin(),

        new CopyPlugin([
            { from: 'src/img', to: 'img' },
          ]),
    ].concat(htmlPlugins),

    devServer: {
        host: '192.168.0.102',
        // disableHostCheck: true,
        // overlay: true,
        port: 1409,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: true,
        openPage: ['html/home.html'],
        // hot: true,
        watchContentBase: true,
        writeToDisk: true,
    },

};