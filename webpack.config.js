const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/app.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'imgs',
                        esModule: false
                    }
                }
            },
            {
                test: /\.mp3$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'sounds'
                        }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ],
    },
    devServer: {
        open: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'breakout games',
        })
    ]

}