const { merge } = require('webpack-merge');
const webpack = require('webpack');
const webpack_common = require('./webpack.config.common');

module.exports = merge(webpack_common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 3000,
        open: true,
        hot: true,
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'Movies App for React Mentoring - Dev',
        }),
    ],
});