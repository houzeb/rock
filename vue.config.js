const path = require('path')
const ip = require('ip')

function resolve(dir)
{
	return path.join(__dirname, './', dir)
}
// let projectname = process.argv[3] // 获取执行哪个文件

module.exports = {
	publicPath: '/',
	// outputDir: 'dist'+ (projectname === 'index' ? '' : projectname), //标识是打包哪个文件
	pluginOptions: {

	},
	productionSourceMap: false,
	css: {
		loaderOptions: {
			less: {
				modifyVars: {
					'menu-item-height': '54px',
					'menu-inline-toplevel-item-height': '54px',
					'layout-sider-background': '#29304a',
					'menu-dark-bg': '#29304a',
					'menu-dark-item-active-bg': '#707EAE'
				},
				javascriptEnabled: true
			}
		}
	},
	/**
	 * @desc 包含运行时编译器
	 */
	runtimeCompiler: true,
	/**
	 * @desc 开发服务器设置
	 */
	devServer: {
		disableHostCheck: true,
		// host: ip.address(),
		port: '8003',
		/**
		 * @desc 代理
		 */
		proxy: {
			'/s1': {
				target: 'http://localhost:10000',
				changeOrigin: true,
				pathRewrite: {
					'^/s1(.*)': '$1',
				},
			},
		},
	},
	lintOnSave: false,
	chainWebpack: config =>
	{
		config.optimization.splitChunks({
			minSize: 50000,
			cacheGroups: {
				// antd: {
				// 	test: /ant-design/,
				// 	name: 'antd',
				// 	chunks: 'all',
				// 	priority: 10,
				// 	reuseExistingChunk: true,
				// },
				// echarts: {
				// 	test: /echarts/,
				// 	name: 'echarts',
				// 	chunks: 'all',
				// 	priority: 20,
				// 	reuseExistingChunk: true,
				// },
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					priority: 5,
					reuseExistingChunk: true,
				},
			},
		});
		// config.optimization.runtimeChunk({
		// 	name: entryPoint => `runtime~${entryPoint.name}`,
		// });
	}
}
