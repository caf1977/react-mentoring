import { Configuration as WebpackConfiguration } from 'webpack';
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import webpackCommon from './webpack.config.common.ts';
import { BannerPlugin } from 'webpack';

interface Configuration extends WebpackConfiguration {
    devServer?: {
        static?: string;
        port?: number;
        open?: boolean;
        hot?: boolean;
    };
}

const config: Configuration = merge<Configuration>(webpackCommon, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 3000,
        open: true,
        hot: true,
    },
    plugins: [
        new BannerPlugin({
            banner: 'This is a custom banner!',
        }),
    ],
});

export default config;