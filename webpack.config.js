const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //req webpack  webpack-cli
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDevelopment = process.env.NODE_ENV === 'development';


module.exports = {
    context: path.resolve(__dirname, './src/js/pages'),
    entry: {
        home: './home.js',
        about: './about.js',
        services: './services.js',
        portfolio: './portfolio.js',
        team: './team.js',
        vacancies: './vacancies.js',
        contact: './contact.js',
    },
    plugins: [
        //dev only-------------------------------------------------------------------------
        // new CleanWebpackPlugin(),
        //--------------------------------------------------------------------------------
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            chunks: ['home'],
            filename: 'html/en/home.html',
            template: '../../templates/pages/en/home/home.ejs',
            favicon: '../../img/favicon/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            chunks: ['about'],
            filename: 'html/en/about.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['services'],
            filename: 'html/en/services.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['portfolio'],
            filename: 'html/en/portfolio.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['team'],
            filename: 'html/en/team.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['vacancies'],
            filename: 'html/en/vacancies.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['contact'],
            filename: 'html/en/contact.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    // {
                    //     loader: 'html-loader',
                    // },
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: {
                                list: [
                                    //img
                                    {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'srcset',
                                        type: 'srcset',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-srcset',
                                        type: 'srcset',
                                    },
                                    //source
                                    {
                                        tag: 'source',
                                        attribute: 'data-src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'source',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'source',
                                        attribute: 'srcset',
                                        type: 'srcset',
                                    },
                                    {
                                        tag: 'source',
                                        attribute: 'data-srcset',
                                        type: 'srcset',
                                    },
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/, 
                use:[
                    {
                        loader: 'ejs-compiled-loader',
                        options: {
                            htmlmin: true,
                            htmlminOptions: {
                                removeComments: true
                            }
                        }
                    },
                ] 
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'imgs'
                    }
                }]
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        publicPath: '../',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: ()=>[
                                require('postcss-preset-env')({  
                                    autoprefixer: { grid: true }   
                                }),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts'
                        }
                    }
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ejs', '.scss']
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../../',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 5000,
        }
    },
    //dev only -------------------------------------------------
    devtool: 'inline-source-map',
    //-----------------------------------------------------------
    devServer: {
        host: '192.168.0.187',
        disableHostCheck: true,
        // overlay: true,
        port: 1406,
        contentBase: './dist',//contentBase: path.join(__dirname, 'dist'),
        // contentBasePublicPath: 'dist',
        compress: true,
        open: true,
        openPage: ['html/en/home.html'],
        // hot: true,
        watchContentBase: true,
        writeToDisk: true,
    },
};