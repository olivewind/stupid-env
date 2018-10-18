
const fs = require('fs');
const chalk = require('chalk');

const defaultConfig = `
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
`;

// 初始化环境
function init(filePath) {
  try {
    fs.writeFileSync(filePath, defaultConfig);
  } catch (error) {
    console.log(chalk.red(`WriteFile error:${error.toString()}`));
    process.exit(0);
    return;
  }
  console.log(chalk.green(`The environment has been initialized: ${filePath}`));
  process.exit(0);
}

module.exports = init;
