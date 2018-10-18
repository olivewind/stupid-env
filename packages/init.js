
const fs = require('fs');
const chalk = require('chalk');

const defaultConfig = `
module.exports = [
  {
    name: '100.100',
    api: 'http://192.168.100.100',
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
function init(configFilePath) {
  // 先看看能不能找到已有的配置文件
  try {
    fs.readFileSync(configFilePath);
    console.log(chalk.red('You have already initialized, do not re-initialized.'));
    process.exit(0);
  } catch (e) {
  }

  try {
    fs.writeFileSync(configFilePath, defaultConfig);
  } catch (error) {
    console.log(chalk.red(`WriteFile error:${error.toString()}`));
    process.exit(0);
    return;
  }
  console.log(chalk.green(`The environment has been initialized: ${configFilePath}`));
  process.exit(0);
}

module.exports = init;
