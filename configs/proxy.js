module.exports = {
  '/mock': {
    target: 'http://rap2.taobao.org:38080/app/mock/248309',
    changeOrigin: true,
    pathRewrite: {
      '/mock': '/',
    },
  },
}
