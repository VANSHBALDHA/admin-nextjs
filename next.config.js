const path = require('path')

module.exports = {
    optimizeFonts: false,
    // output: 'export',
    eslint: {
        ignoreDuringBuilds: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    
    // distDir: 'build',
}