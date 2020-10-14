const path = require('path');
// 清理dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩js
const TerserJSPlugin = require('terser-webpack-plugin')
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 服务
const Webpack = require('webpack');

module.exports = {
    mode:'development',
	devServer: {    //本地服务配置
        contentBase: path.join(__dirname, 'public'),  // 需要挂载文件目录
        progress: false,  // 是否显示进度条
        compress: false,  // 是否压缩
        port: 8888,  // 端口号
    },
    entry: './src/index.js',
    output: {
        filename: 'pb.js',
        path: path.resolve(__dirname,'public')
    },
	optimization: {
		minimize: true,
		minimizer: [
            // new TerserJSPlugin({}),    // js压缩可配置
            new OptimizeCSSAssetsPlugin({}),    // css压缩可配置
		],
	},
	module: {
		rules:[
			{
				test: /\.(sc|sa|c)ss$/,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
			test:/\.js$/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['@babel/preset-env']
					}
				},
				exclude:/node_modules/,
				include: path.resolve(__dirname, 'src')
			},
			{
				test:/\.svg$/,
				use:{
					loader:'svg-inline-loader',
					options:{
					}
				}
			},
		]
	},
	resolve: {
        extensions: ['.js']
    },
	resolve:{
		alias:{
			'@':path.resolve(__dirname,'../src')
		}
	},
	plugins:[
		// new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'pb.css'
		}),
		new Webpack.HotModuleReplacementPlugin()
    ]
}
