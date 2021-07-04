const path = require('path');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs')
    },
    plugins: [
        new StatoscopeWebpackPlugin()
    ],
    stats: {
        all: false,
        modules: true
    },
};
