
module.exports = [
  {
    name: '1.1.1.1',
    api: 'https://1.1.1.1',
    healthcheck: {
      path: '/healthz',
      isHealthy: function (res) {
        return res.data === 'Healthy';
      },
      timeout: 2000,
    },
  },
];
