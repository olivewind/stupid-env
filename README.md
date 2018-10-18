# stupid-env
A cli for checking and quickly switching and persisting environment variables

English | [简体中文](README_ZH.md)

## Getting started
``` bash
npm install -g stupid-env
```

## Usage
``` bash
stupidenv -h               # help
  stupidenv -l             # list all environments
  stupidenv -a             # list all environments and choose one
  stupidenv -s             # choose an available environment directly
  stupidenv -o ./env.json # specify environment variable persistence file，default: ./env.json
```
> Once you have selected an environment, the corresponding environment variables will be properly persisted.


``` javascript
// You need to properly configure the `.stupidenv.js` file in the project root directory.
module.exports = [
  {
    name: '182',
    api: 'https://192.168.100.182',
    healthcheck: {
      path: '/dce/healthz', // default: '/'
      isHealthy: function (res) {
        return res.data === 'Healthy';
      },
      timeout: 2000, // default: 2000 ms
    },
  },
  {
    name: '100',
    api: 'https://192.168.100.100',
    healthcheck: {
      path: '/dce/healthz',
    },
  },
];
```