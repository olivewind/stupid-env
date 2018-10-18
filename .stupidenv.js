module.exports = [
  {
    name: '2.76',
    api: 'http://192.168.2.76',
    healthcheck: {
      path: '/dce/healthz',
      isHealthy: function (res) {
        return res.data.Etcd === 'Healthy' && res.data.Kubernetes === 'Healthy';
      },
    },
  },
  {
    name: '100.193',
    api: 'http://192.168.100.193',
    healthcheck: {
      path: '/dce/healthz',
      isHealthy: function (res) {
        return res.data.Etcd === 'Healthy' && res.data.Kubernetes === 'Healthy';
      },
    },
  },
  {
    name: '100.100',
    api: 'http://192.168.100.100',
    healthcheck: {
      path: '/dce/healthz',
      isHealthy: function (res) {
        return res.data.Etcd === 'Healthy' && res.data.Kubernetes === 'Healthy';
      },
    },
  },
];