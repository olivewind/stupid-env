# stupid-env
一个用于检查和快速切换环境变量的命令行工具

## 开始
``` bash
npm install -g stupid-env
```

## 使用
``` bash
stupidenv --h                    # 帮助
  stupidenv --all                # 列出所有环境情况
  stupidenv --ava                # 列出所有可用的环境
  stupidenv --config ./config.js # 用于指定配置文件，默认是: ./.stupidenv.js
```

> 一旦你选择了某个环境，那么对应的 API_URL 以及 config.env 下的环境都将会被正确设置


``` javascript
// ./.stupidenv.js
module.exports = {
  '3.0.0': [
    {
      api: 'https://192.168.100.182',
      healthcheck: {
        path: '/dce/healthz', // 默认: '/'
        isHealthy: function (res) { // 用于检查返回参数的方法
          return res.data === 'Healthy';
        },
        timeout: 2000, // 默认: 2000 ms
        retry: 3 // 默认: 1
      },
    },
  ],
  '2.0.0': [
    {
      api: 'https://192.168.100.100',
      healthcheck: {
        path: '/dce/healthz',
      },
    },
  ],
}
```