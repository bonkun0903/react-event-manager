module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb/hooks'],
  env: {
    browser: true,
    jquery: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'react/function-component-definition': [
      1,
      { namedComponents: 'arrow-function' },
    ],
    'no-console': 0,
    'no-alert': 0,
  },
};
