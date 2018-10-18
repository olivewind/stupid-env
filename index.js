const program = require('commander');
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');

const healthcheck = require('./packages/healthcheck');
const writeEnv = require('./packages/write-env');
const readConfig = require('./packages/read-config');
const readLastEnv = require('./packages/read-lastenv');

const init = require('./packages/init');
const package = require('./package.json');

program
  .version(package.version)
  .option('-l, --list', 'list all available environments')
  .option('-a, --all', 'list all environments and select one')
  .option('-s, --select', 'select an available environment directly')
  // .option('-c, --config [file]', 'specify a configuration file', './.stupidenv.js')
  .option('-o, --output [file]', 'specify a file to persist environment variables', '.env.json')
  .command('init', 'initialization environment')
  .parse(process.argv);

const configFilePath = `${process.env.PWD}/.stupidenv.js`;
const outputFilePath = `${process.env.PWD}/${program.output}`;

// 初始化环境
if (program.args[0] === 'init') {
  init(configFilePath);
}

// 读取配置文件
let envs = readConfig(configFilePath);
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
    if (res.available.length === 0) {
      console.warn(chalk.red('No environment available.'));
      process.exit(0);
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
