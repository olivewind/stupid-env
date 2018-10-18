
const fs = require('fs');
const chalk = require('chalk');
const util = require('util');

// 持久化环境变量
function writeEnv(env, filePath) {
  const e = env.env || {};
  e.API_URL = env.api;
  e.ENV_NAME = env.name;
  const data = JSON.stringify(e, null, 2);
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.log(chalk.red(`WriteFile error:${err.toString()}`));
      return;
    }
    console.log(chalk.green(`The environment has been successfully switched: ${filePath}`));
  });
}
module.exports = writeEnv;
