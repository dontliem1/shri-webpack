const path = require('path');
// const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
const UnusedModulesPlugin = require('./unused-modules-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs')
    },
    plugins: [
        // new StatoscopeWebpackPlugin(),
        new UnusedModulesPlugin({
            modulesSearchPath: 'components/',
            enableLogs: true
        })
    ],
    stats: {
        all: false,
        modules: true
    },
};
