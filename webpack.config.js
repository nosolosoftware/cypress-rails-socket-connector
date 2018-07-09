const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

const findCommands = () => {
  const commands = {};

  fs.readdirSync('./src/js/commands').forEach(command => {
    commands[path.basename(command, '.js')] = `./src/js/commands/${command}`;
  });
  return commands;
};

module.exports = [
  {
    entry: './src/js/index.js',
    target: 'node',
    output: {
      libraryTarget: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],
          loader: 'babel-loader',
          query: {
            presets: [
              ['env', {
                targets: {
                  node: '8.2.1'
                }
              }]
            ],
            plugins: ['transform-object-rest-spread']
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js'],
      modules: [
        path.resolve('./src'),
        'node_modules'
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist'])
    ]
  },
  {
    entry: findCommands(),
    target: 'node',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'commands')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],
          loader: 'babel-loader',
          query: {
            presets: [
              ['env', {
                targets: {
                  node: '8.2.1'
                }
              }]
            ]
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['commands'])
    ]
  }
];
