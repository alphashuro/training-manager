module.exports = function (wallaby) {
  var load = require;

  return {
    files: [
      'client/modules/**/components/*.jsx',
      'client/modules/**/actions/*.js',
      'client/modules/**/containers/*.js',
      'client/modules/**/libs/*.js'
    ],
    tests: [
      'client/**/tests/*.js'
    ],
    compilers: {
      '**/*.js*': wallaby.compilers.babel({
        babel: load('babel-core'),
        presets: [ 'es2015', 'stage-2', 'react' ]
      })
    },
    testFramework: 'mocha',
    env: {
      type: 'node'
    }
  };
};
