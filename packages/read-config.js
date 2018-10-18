const chalk = require('chalk');

function readConfig(filePath) {
  let envs = [];
  // 获取配置文件
  try {
    envs = require(filePath);
  } catch (error) {
    console.log(chalk.red('No available configuration files found, Please check and try again.'));
    process.exit(0);
  }
  if (!Array.isArray(envs) || envs.length === 0) {
    console.log(chalk.red('No environment, please check the configuration file, Please check and try again.'));
    process.exit(0);
  }
  return envs;
}

module.exports = readConfig;
