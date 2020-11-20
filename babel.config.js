const getLinkedBabelConfig = require('./build_utils/babel_util');

const env = process.env.BABEL_ENV;

const isEnvNodeOrTest = env === 'node' || env === 'test';

const modules = isEnvNodeOrTest ? 'commonjs' : false;

const targets = isEnvNodeOrTest
  ? {}
  : {
      browsers: ['last 1 Chrome versions'],
    };

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules,
        targets,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    'preval',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'module-resolver',
      {
        alias: {
          'ui-kit': './src/',
        },
      },
    ],
  ],
  moduleRoot: '.',
};

module.exports = getLinkedBabelConfig(babelConfig);
