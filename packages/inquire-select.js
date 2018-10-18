const inquirer = require('inquirer');
const writeEnv = require('./write-env');
const readLastEnv = require('./read-lastenv');

// 检查结束后选择一个环境
function inquireSelect(envs, outputFilePath) {
  // 默认选中上一次的选择
  const lastEnv = readLastEnv(outputFilePath) || {};
  let defaultIndex = 0;
  const choices = envs.map((e, index) => {
    if (e.name === lastEnv.ENV_NAME) {
      defaultIndex = index;
      return {
        name: `${e.name}(last time you chose this env)`,
        value: e,
      };
    }
    return {
      name: e.name,
      value: e,
    };
  });

  inquirer.prompt([
    {
      name: 'targetEnv',
      message: 'Please choose an environment:',
      type: 'list',
      default: defaultIndex,
      choices,
    }])
    .then((answer) => {
      writeEnv(answer.targetEnv, outputFilePath);
    });
}

module.exports = inquireSelect;
