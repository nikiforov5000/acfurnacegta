const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    esModule: true, // Enable ES module syntax
                    variable: 'data', // Set the variable name for the template
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: 'index.html',
            templateParameters: {
                title: 'My Webpack EJS Template',
                name: 'World',
            },
        }),
    ],
    devServer: {
        static: './dist',
    }
};
