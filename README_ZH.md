# stupid-env
一个用于检查、快速切换、持久化环境变量的命令行工具

[![stupid-env](https://img.shields.io/npm/v/stupid-env.svg?style=flat-square)](https://www.npmjs.org/package/stupid-env)
[![NPM downloads](https://img.shields.io/npm/dt/stupid-env.svg?style=flat-square)](https://npmjs.org/package/stupid-env)

[English](README.md) | 简体中文

## 开始
``` bash
npm install -g stupid-env
```

## 使用
``` bash
stupidenv -h               # 帮助
  stupidenv -l             # 列出所有环境
  stupidenv -a             # 列出所有环境，并且选择其中一个
  stupidenv -s             # 直接选择一个可用的环境
  stupidenv -o ./env.json  # 指定用于环境变量持久化的文件，默认是: ./.env.json
```

> 一旦你选择了某个环境，那么对应的环境变量将会被正确地持久化

``` javascript
// 你需要在项目根目录正确配置 ’.stupidenv.js‘ 文件
module.exports = [
  {
    name: '182',
    api: 'https://192.168.100.182', // 会被合并进 env 成为 API_URL
    env: {
      CDN_URL: 'https://192.168.100.182/cdn', // 其他需要一起被设置的环境变量
    },
    healthcheck: {
      path: '/dce/healthz', // 默认: '/'
      headers: {
        token: 'mytoken',
      },
      isHealthy: function (res) { // 用于检查返回参数的方法
        return res.data === 'Healthy';
      },
      timeout: 2000, // 默认: 2000 ms
    },
  },
  {
    name: '100',
    api: 'https://192.168.100.100',
    healthcheck: {
      path: '/dce/healthz',
    },
  },
];
```