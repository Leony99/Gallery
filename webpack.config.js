const mode = process.env.NODE_ENV !== 'production';
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const terserPlugin = require('terser-webpack-plugin')
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: mode ? 'development':'production',
    entry: './src/jsEntry.js', //Module to start the dependencies list
    output: {
        path: __dirname + '/dist', //Generated files path
        filename: 'script.js' //.js generated file name
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: 'style.css' //.css generated file name
        }),
        new copyPlugin({
            patterns: [
                {   //Copy html files
                    context: 'src',
                    from: '**/*.html',
                    noErrorOnMissing: true
                },
                {   //Copy assets
                    from: './src/assets', 
                    to: './assets',
                    noErrorOnMissing: true
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader, //Add .css to .css generated file
                    'css-loader' //Read imports, urls, etc
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    miniCssExtractPlugin.loader, // Add .scss to .css generated file
                    'css-loader', // Read imports, urls, etc.
                    'sass-loader' // Compile SCSS to CSS
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader' //Read image files
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
                use: 'file-loader'
            }
        ]
    },
    optimization: {
        minimizer: [
            new terserPlugin(), //.js uglifier(minimizer)
            new cssMinimizerPlugin() //.css uglifier(minimizer)
        ]
    },
    devServer: {
        static: './dist', //Static files to provide
        port: 8080 //Server port
    }
}