const { merge } = require('webpack-merge');
const webpack = require('webpack');
const webpack_common = require('./webpack.config.common');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(webpack_common, {
    mode: 'production',
    output: {
        filename: 'bundle.[contenthash].js',
        path: webpack_common.output.path,
        clean: true,
    },
    optimization: {
        minimize: true, // Enable code minification
        minimizer: [
            new TerserPlugin(), // Minify JS
            new CssMinimizerPlugin(), // Minify CSS
        ],
        splitChunks: {
            chunks: 'all', // Split chunks from all modules
            minSize: 20000,
        },
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'Movies App for React Mentoring - Prod',
        }),
    ],
});