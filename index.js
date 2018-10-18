const program = require('commander');
const ora = require('ora');
const chalk = require('chalk');
const package = require('./package.json');
const init = require('./packages/init');
const readConfig = require('./packages/read-config');
const healthcheck = require('./packages/healthcheck');
const inquireSelect = require('./packages/inquire-select');

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
const defaultView = !program.list && !program.all && !program.select;

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
    inquireSelect(res.available, outputFilePath);
  }, rej => {
    spinner.stop();
    console.warn(chalk.red(`Healthcheck failed: ${rej.toString()}`));
  });
