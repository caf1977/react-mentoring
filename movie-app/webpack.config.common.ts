import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default {
    entry: './src/index.tsx', // Entry file
    output: {
        filename: 'bundle.js', // Output file name
        path: path.resolve(process.cwd(), 'dist'), // Output directory
        clean: true, // Cleans the output directory
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Match `.js` or `.jsx` files
                exclude: /node_modules/, // Exclude `node_modules`
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
                    },
                },
            },
            {
                test: /\.css$/i, // Match `.css` files
                use: ['style-loader', 'css-loader'], // CSS and style loaders
            },
            {
                test: /\.tsx?$/, // Match `.ts` or `.tsx` files
                use: [
                    {
                        loader: 'ts-loader', // TypeScript loader
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // HTML template file
            title: 'Movies APP', // HTML title
            meta: {
                description: 'This is a movies app', // Meta description
            },
        }),
        new BundleAnalyzerPlugin(), // Bundle analyzer plugin
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'], // Supported extensions
    },
};