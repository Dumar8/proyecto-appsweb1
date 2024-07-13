const { defineConfig } = require('@vue/cli-service');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    register: {
      entry: 'src/main_register.js',
      template: 'public/register.html',
      filename: 'register.html',
    },
    login: {
      entry: 'src/main_login.js',
      template: 'public/login.html',
      filename: 'login.html',
    },
    profile: {
      entry: 'src/main_profile.js',
      template: 'public/profile.html',
      filename: 'profile.html',
    },
    calendar: {
      entry: 'src/main_calendar.js',
      template: 'public/calendar.html',
      filename: 'calendar.html',
    },
    support: {
      entry: 'src/main_support.js',
      template: 'public/support.html',
      filename: 'support.html',
    }
  },
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html',
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        template: 'public/register.html',
        filename: 'register.html',
        chunks: ['register'],
      }),
      new HtmlWebpackPlugin({
        template: 'public/login.html',
        filename: 'login.html',
        chunks: ['login'],
      }),
      new HtmlWebpackPlugin({
        template: 'public/profile.html',
        filename: 'profile.html',
        chunks: ['profile'],
      }),
      new HtmlWebpackPlugin({
        template: 'public/calendar.html',
        filename: 'calendar.html',
        chunks: ['calendar'],
      }),
      new HtmlWebpackPlugin({
        template: 'public/support.html',
        filename: 'support.html',
        chunks: ['support'],
      })
    ]
  }
});
