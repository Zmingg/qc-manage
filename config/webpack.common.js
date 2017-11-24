const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: ['vue','vuex','vue-router']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'QcManage - Blog',
            filename: 'index.html',
            template: 'src/index.html'
        })
    ]


};