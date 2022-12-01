// const { defineConfig } = require('@vue/cli-service');
//
// module.exports = defineConfig({
//   transpileDependencies: true,
// });

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://firebasestorage.googleapis.com',
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
