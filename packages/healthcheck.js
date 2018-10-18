const axios = require('axios');

function checkOne(singleEnv) {
  const { name, api, env = {}, healthcheck = {}} = singleEnv;
  const result = {
    name,
    api,
    env,
    available: false,
  };
  const http = axios.create({
    headers: healthcheck.headers || {},
    timeout: healthcheck.timeout || 2000,
    baseURL: singleEnv.api,
  });

  return new Promise((resolve) => {

    http.get(healthcheck.path || '/')
      .then(res => {
        if (healthcheck.isHealthy) {
          result.available = healthcheck.isHealthy(res);
          resolve(result);
          return;
        }
        result.available = true;
        resolve(result);
      }, () => {
        result.available = false;
        resolve(result);
      });
  }); 
}

function check(envs) {
  const result = {
    all: [],
    available: [],
  };

  return new Promise((resolve) => {
    const checkedQueue = [];

    envs.forEach(env => {
      checkOne(env)
        .then(res => {
          checkedQueue.push(res);
          if (envs.length === checkedQueue.length) {
            result.all = checkedQueue;
            result.available = checkedQueue.filter(e => e.available);
            return resolve(result);
          } 
        });
    });
   
  });
}

module.exports = check;
