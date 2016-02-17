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
    },
    setup: function( wallaby ) {
      var jsdom = require('jsdom').jsdom;

      var exposedProperties = [
        'window', 'navigator', 'document'
      ];

      global.document = jsdom('');
      global.window = document.defaultView;
      Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
          exposedProperties.push(property);
          global[property] = document.defaultView[property];
        }
      });
      global.navigator = {
        userAgent: 'node.js'
      };
    }
  };
};

