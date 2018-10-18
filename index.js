const program = require('commander');
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');

const healthcheck = require('./packages/healthcheck');
const writeEnv = require('./packages/write-env');
const readConfig = require('./packages/read-config');
const package = require('./package.json');

program
  .version(package.version)
  .option('-l, --list', 'list all available environments')
  .option('-a, --all', 'list all environments and select one')
  .option('-s, --select', 'select an available environment directly')
  // .option('-c, --config [file]', 'specify a configuration file', './.stupidenv.js')
  .option('-o, --output [file]', 'specify a file to persist environment variables', 'env.json')
  .parse(process.argv);


// 读取配置文件
let envs = readConfig(`${process.env.PWD}/.stupidenv.js`);
const defaultView = !program.list && !program.all && !program.select

// 开始检查
const spinner = ora({
  text: 'checking environments...',
  color: 'green',
}).start();

healthcheck(envs)
  .then(res => {
    spinner.stop();
    // 列出所有环境
    if (defaultView || program.all || program.list) {
      res.all.forEach(env => {
        if (env.available) {
          ora().succeed(env.name);
        } else {
          ora().fail(env.name);
        }
      });
    }
    // 仅仅列出所有环境
    if (defaultView || program.list) return;
    // 选择一个环境并且持久化
    inquireSelect(res.available);
  }, rej => {
    spinner.stop();
    console.warn(chalk.red(`Healthcheck failed: ${rej.toString()}`));
  });


// 检查结束后选择一个环境
function inquireSelect(envs) {
  const choices = envs.map(e => {
    return {
      name: e.name,
      value: e,
    };
  });

  inquirer.prompt([
    {
      name: 'envs',
      message: 'Please choose an environment:',
      type: 'list',
      choices,
    }])
    .then((answer) => {
      writeEnv(answer.envs, `${ process.env.PWD}/${program.output}`);
    });
}
