/* webpack.config.js */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
/*const dev = require('webpack-dev-server');*/


module.exports = {
    context: path.resolve(__dirname, ''),
    /*mode: "development",*/


    // Tell Webpack which file kicks off our app.
    entry: {
        main: './src/index.js'
    },
        // Tell Weback to output our bundle to ./dist/bundle.js
    output: {
        filename: 'app.[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    // These rules tell Webpack how to process different module types.
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.
    module: {
        rules: [
            {
                // If you see a file that ends in .html, send it to these loaders.
                test: /\.css$/i,
                // This is an example of chained loaders in Webpack.
                // Chained loaders run last to first. So it will run
                // polymer-webpack-loader, and hand the output to
                // babel-loader. This let's us transpile JS in our `<script>` elements.
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    // Enable the Webpack dev server which will build, serve, and reload our
    // project on changes.
    devServer: {
        /*compress: true,*/
        port: 3333
    },
    plugins: [

        // This plugin will generate an index.html file for us that can be used
        // by the Webpack dev server.
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),

        new CleanWebpackPlugin(),

    ]
};