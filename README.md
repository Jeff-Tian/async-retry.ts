# async-retry.ts

> async await version of [co-retry.js](https://www.npmjs.com/package/co-retry.js), which can be used in both TypeScript and JavaScript.

[![npm download][download-image]][download-url]
[![NPM version](https://badge.fury.io/js/async-retry.ts.png)](http://badge.fury.io/js/async-retry.ts)
[![Build Status](https://travis-ci.com/Jeff-Tian/async-retry.ts.svg?branch=master)](https://travis-ci.com/Jeff-Tian/async-retry.ts)
[![Dependencies Status](https://david-dm.org/Jeff-Tian/async-retry.ts.png)](https://david-dm.org/jeff-tian/async-retry.ts)
[![Coverage Status](https://coveralls.io/repos/github/Jeff-Tian/async-retry.ts/badge.svg?branch=master)](https://coveralls.io/github/Jeff-Tian/async-retry.ts?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/Jeff-Tian/async-retry.ts)

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

[download-image]: https://img.shields.io/npm/dm/async-retry.ts.svg?style=flat-square
[download-url]: https://npmjs.org/package/async-retry.ts

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jeff-Tian_async-retry.ts)](https://sonarcloud.io
/dashboard?id=Jeff-Tian_async-retry.ts)

## 安装

```shell
npm install async-retry.ts --save
```

## 用法

### 简单示例：

#### TypeScript:

##### 非 async 版：

```typescript
import Action from 'async-retry.ts'

const action = () => {}
const handlers = [
  {
    error: 'error1',
    handler: yourHandler1,
  },
  {
    error: 'error2',
    handler: yourHandler2,
  },
]

Action.retry(action, 3, handlers)
```

##### async 版：

```typescript
import Action from 'async-retry.ts'

const action = async()=>{}
const handlers = [{
  error: 'error1',
  handler: async yourHandler1()=>{}
}, {
  error: 'error2',
  handler: async yourHandler2()=>{}
}]

await Action.retryAsync(action, 3, handlers)
```

#### JavaScript:

##### 非 async 版：

```javascript
const Action = require('async-retry.ts').default

const action = () => {}
const handlers = [
  {
    error: 'error1',
    handler: yourHandler1,
  },
  {
    error: 'error2',
    handler: yourHandler2,
  },
]

Action.retry(action, 3, handlers)
```

##### async 版

```javascript
const Action =require('async-retry.ts').default

const action = async()=>{}
const handlers = [{
  error: 'error1',
  handler: async yourHandler1()=>{}
}, {
  error: 'error2',
  handler: async yourHandler2()=>{}
}]

await Action.retryAsync(action, 3, handlers)
```

### 完整示例：

```typescript
```

## 开发

1. 修改代码后跑

   ```shell
   npm test
   ```

   确保测试通过。

2. `git commit`
3. `npm version patch/minor/major`
4. `npm publish`
