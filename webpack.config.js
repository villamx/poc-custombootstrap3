/* 
 * 
 */

var webpack = require('webpack'),
        /*moves every require("style.css") in entry chunks into a separate css output file.*/
        PluginExtractText = require('extract-text-webpack-plugin');

var config = {
    /* [string, array, object] for the bundle. */
    entry: {
        source: './source/main.js',
        styles: './source/stylesheets.scss',
        vendor: ['jquery', 'bootstrap-sass']
    },
    /* options affecting the output of the compilation. */
    output: {
        filename: '[name].js'
    },
    /* options passed via CLI arguments override this configuration */
    devServer: {
        contentBase: './public',
        inline: true,
        colors: true,
        watch: true,
        hot: true,
        port: 8181
    },
    /* options affecting the normal modules (NormalModuleFactory). */
    module: {
        loaders: [
            {test: /\.scss$/i, loader: PluginExtractText.extract(['css', 'sass'])},
            /* bootstrap-sass */
            {test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/, loader: 'file'}
            /*,
             {
             test: /\.scss$/,
             loaders: ['style', 'css', 'sass']
             }*/
        ]
    },
    plugins: [
        new PluginExtractText('[name].css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.optimize.DedupePlugin()
    ]
};

module.exports = config;
