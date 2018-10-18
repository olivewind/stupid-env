// 读上一次的环境变量
function readLastEnv(filePath) {
  let env = null;
  try {
    env = require(filePath);
  } catch (error) {
  }
  return env;
}

module.exports = readLastEnv;
