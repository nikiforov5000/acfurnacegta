const config = require('./config/config');

const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ZipFilesPlugin = require('webpack-zip-files-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const {appId, routesMap, port, analyseBundle} = config;

const offset = +6;
const datetime = new Date(new Date().getTime() + offset * 3600 * 1000).toJSON().replace(/\D/g, '').substr(0, 14);

module.exports = (env, argv) => {

    const { mode } = argv;
    const routeData = (env === 'test') ? routesMap.test : (mode === 'production') ? routesMap.production : routesMap.dev;
    const webPath = path.resolve(__dirname, 'web');

    console.log(routeData);

    let plugins = [
        new CopyPlugin({
            patterns : [
                {from: './src/static', to: './'},
            ],
            options: {
                concurrency: 100,
            },
        }),

        new MiniCssExtractPlugin({
            filename: "site.min.css",
        })
    ];

    plugins.push(new HtmlWebpackPlugin({
        appId : config.appId,
        routeData,
        template: './src/html/index.ejs',
        page: 'kz',
        language: 'ru',
        filename: `./ru/index.html`,
        inject: true,
        minify: false
    }));
    plugins.push(new HtmlWebpackPlugin({
        appId : config.appId,
        routeData,
        template: './src/html/index.ejs',
        page: 'kz',
        language: 'kz',
        filename: `./kz/index.html`,
        inject: true,
        minify: false
    }));
    if ((argv.mode === 'development') && analyseBundle) {
        plugins = [
            new BundleAnalyzerPlugin(),
            ...plugins
        ];
    }
/*

    if (argv.mode === 'production') {
        plugins = [
            ...plugins,
            new ZipFilesPlugin({
                entries: [
                    {src: path.join(__dirname, './web/'), dist: `${appId}/`},
                ],
                output: path.join(__dirname, `./dist/${archiveFile}`),
                format: 'zip',
            })
        ];
    }

*/

    const conf = {
        mode: argv.mode,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'web'),
            filename: 'bundle.js?[chunkhash:6]',
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    }
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader', options: {
                                //minimize: true,
                                url: false,
                            }
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: 'resolve-url-loader', options: {
                                root: webPath,
                                engine: 'rework'
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                additionalData: (content, loaderContext) => {
                                    const {imageRoot, contentRoot} = routeData;

                                    let cssInclude = `$appId: "${appId}";$baseImageURL: "${imageRoot}";$baseContentURL: "${contentRoot}";`;

                                    if (!env.prod) {
                                        cssInclude += '@import \'fonts\';';
                                    }

                                    return cssInclude + content;
                                }
                            },
                        },
                        {
                            loader: path.resolve(__dirname, './src/loaders/px_to_vw.js'),
                            options: {maxWidth: '1440px', minWidth: '768px'}
                        },
                    ],
                },
                {
                    test: /\.ejs$/,
                    use: {
                        loader: 'ejs-compiled-loader',
                        options: {
                            beautify: true,
                            htmlmin: true,
                            htmlminOptions: {
                                removeComments: true
                            }
                        }
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|svg|tiff|woff|woff2|eot)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    },
                },
            ],
        },
        plugins,
        devServer: {
            historyApiFallback: true,
            liveReload: true,
            port,
        },
        stats: 'errors-only'
    }

    // Temp autoreload bug workaround

    if(env.prod){
        // conf.target = ['web', 'es5'];
    }

    conf.target = ['web', 'es5'];

    return conf;
};