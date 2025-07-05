// more see: http://eslint.cn

module.exports = {
  // 设置当前文件的目录为根目录
  root: true,
  // 开启项目可运行的环境
  env: { browser: true, es2020: true, node: true },
  // 忽略的检查文件，与.eslintignore 文件规则相同
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  // 自动检测React版本
  settings: {
    react: {
      version: 'detect'
    }
  },
  // 指定语法解析规则
  parser: '@typescript-eslint/parser',
  // 指定解析器选项，优先级低于parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  // 配置插件
  plugins: ['react', 'react-refresh', '@typescript-eslint', 'react-hooks', 'prettier'],
  // 继承的检查规则
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  /* 自定义检查规则
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // 基础语法规则  http://eslint.cn/docs/rules
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-dupe-args': 'error', //禁止函数的形参出现相同的变量名
    'no-dupe-keys': 'error', //禁止对象属性中出现相同的属性名
    'no-empty': 'error', //禁止出现空语句块
    'no-redeclare': 'error', //禁止多个地方声明同一变量
    'no-irregular-whitespace': 'off', // 禁止不规则的空白
    'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
    'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
    'prefer-const': 'off', // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const

    // ts语法规则配置  https://typescript-eslint.io/rules
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用 @ts-ignore
    '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
    '@typescript-eslint/explicit-function-return-type': 'off', // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
    '@typescript-eslint/no-var-requires': 'off', // 不允许在 import 语句中使用 require 语句
    '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
    '@typescript-eslint/no-use-before-define': 'off', // 禁止在变量定义之前使用它们
    '@typescript-eslint/ban-ts-comment': 'off', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 要求导出函数和类的公共类方法的显式返回和参数类型

    // react语法配置
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off', //关闭文件中,使用jsx时，缺少'import React, { Component } from 'react''语句的错误
    'react/jsx-uses-react': 'off', //关闭文件中,使用jsx时，缺少'import React'语句的错误
    'react-hooks/rules-of-hooks': 'error', // 确保 react Hooks 在函数中顶层运行的规则
    'react-hooks/exhaustive-deps': 'off', // 关闭useEffect依赖检查
    'react/prop-types': 'off' // 关闭prop-types检查
  }
}
