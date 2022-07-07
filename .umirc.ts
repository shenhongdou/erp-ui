import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'erp-ui',
  favicon: 'https://img01.weeecdn.com/static/www/favicon.ico',
  logo: 'https://img01.weeecdn.com/static/www/_next/static/images/logo-1acb335df5c7433d696d506dce4784a4.svg',
  outputPath: 'dist',
  base: '/erp-ui',
  publicPath: '/erp-ui/',
  lessLoader: {
    test: /\.less$/i,
    use: [
      // compiles Less to CSS
      "style-loader",
      "css-loader",
      "less-loader",
    ],
  }
  // more config: https://d.umijs.org/config
});
