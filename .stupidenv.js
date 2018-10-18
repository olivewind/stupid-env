module.exports = [
  {
    name: '3.0.0-182',
    api: 'http://192.168.100.182', // API_URL
    env: { // 其他需要设定的环境变量
      CDN_URL: './',
    },
    healthcheck: {
      headers: {
        'x-dce-tenant': 'default',
      },
      path: '/dce/healthz', // 默认: '/'
      isHealthy: function (res) { // 用于检查返回参数的方法
        return res.data && res.data.Etcd === 'Healthy' && res.data.Kubernetes === 'Healthy';
      },
      timeout: 2000, // 默认: 2000 ms
    },
  },
  {
    name: '3.0.0-193',
    api: 'http://192.168.100.193',
    healthcheck: {
      path: '/dce/healthz', // 默认: '/'
      isHealthy: function (res) { // 用于检查返回参数的方法
        return res.data && res.data.Etcd === 'Healthy' && res.data.Kubernetes === 'Healthy';
      },
    },
  },
  {
    name: '2.10.3-100',
    api: 'http://192.168.100.100',
    healthcheck: {
      path: '/dce/healthz',
    },
  },
  {
    name: '2.10.3-101',
    api: 'http://192.168.100.101',
    healthcheck: {
      path: '/dce/healthz',
    },
  },
];
