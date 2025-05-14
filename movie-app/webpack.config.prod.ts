import { merge } from 'webpack-merge';
import { BannerPlugin } from 'webpack';
import webpackCommon from './webpack.config.common.ts';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { WebpackConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
    devServer?: {
        static?: string;
        port?: number;
        open?: boolean;
        hot?: boolean;
    };
}

const config: Configuration = merge<Configuration>(webpackCommon, {
    mode: 'production',
    output: {
        filename: 'bundle.[contenthash].js',
        path: webpackCommon.output.path,
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
        new BannerPlugin({
            banner: 'Movies App for React Mentoring - Prod',
        }),
    ],
});

export default config;