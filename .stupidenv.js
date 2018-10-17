module.exports = {
  '3.0.0': [
    {
      api: 'https://192.168.100.182', // API_URL
      env: { // 其他需要设定的环境变量
        CDN_URL: './',
      },
      healthcheck: {
        path: '/dce/healthz', // 默认: '/'
        isHealthy: function (res) { // 用于检查返回参数的方法
          return res.data && res.data.Etcd === 'Healthy' && res.data.Kubernetes === 'Healthy';
        },
        timeout: 2000, // 默认: 2000 ms
        retry: 3 // 默认: 1
      },
    },
    {
      api: 'https://192.168.100.193',
      healthcheck: {
        path: '/dce/healthz', // 默认: '/'
        isHealthy: function (res) { // 用于检查返回参数的方法
          return res.data && res.data.Etcd === 'Healthy' && res.data.Kubernetes === 'Healthy';
        },
      },
    },
  ],
  '2.10.3': [
    {
      api: 'https://192.168.100.100',
      healthcheck: {
        path: '/dce/healthz',
      },
    },
    {
      api: 'https://192.168.100.101',
      healthcheck: {
        path: '/dce/healthz',
      },
    },
  ],
};
