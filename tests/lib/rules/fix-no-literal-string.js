/**
 * @fileoverview disallow literal string
 * @author edvardchen
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-literal-string'),
  RuleTester = require('eslint').RuleTester,
  path = require('path');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const message = 'disallow literal string';
const errors = [{ message }]; // default errors

var ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

// ruleTester.run('no-literal-string', rule, usual);
// ruleTester.run('no-literal-string', rule, jsx);

// testing replacment

const fixableProblems = {
  valid: [
    {
      code: `<BowedHeroSection bgImage={'/images/aboutHero.jpg'}/>`,
      options: [{ ignore: [/^(\.?\/.+)+/] }],
    },
  ],
  invalid: [
    {
      code: '<div>foo</div>',
      errors,
      filename: 'a.jsx',
      output: `<div>{ t(\`foo\`, \`foo\`) }</div>`,
    },
    {
      code: '<div>very long string. More than 20 characters</div>',
      errors,
      filename: 'filename.jsx',
      output: `<div>{ t(\`filename-1564207621\`, \`very long string. More than 20 characters\`) }</div>`,
    },
    {
      code: '<div>very long string. More than 20 characters</div>',
      errors,
      filename: '/path/to/filename.jsx',
      output: `<div>{ t(\`filename-1564207621\`, \`very long string. More than 20 characters\`) }</div>`,
    },
    {
      code: `<Cmt prop="string prop" />`,
      errors,
      filename: 'filename.jsx',
      output: `<Cmt prop={ t(\`string prop\`, \`string prop\`) } />`,
    },
    {
      code: `<Cmt prop={'inter prop'} />`,
      errors,
      filename: 'filename.jsx',
      output: `<Cmt prop={ t(\`inter prop\`, \`inter prop\`) } />`,
    },
  ],
};
ruleTester.run('no-literal-string', rule, fixableProblems);
