# stupid-env
A cli for checking and quickly switching stupid development environments

## Getting started
``` bash
npm install -g stupid-env
```

## Usage
``` bash
stupidenv --h                    # help
  stupidenv --all                # list all environments
  stupidenv --ava                # list all available environments
  stupidenv --config ./config.js # default: ./.stupidenv.js
```
> Once you have selected an environment, the environment variable named API_URL will be set correctly.


``` javascript
// ./.stupidenv.js
module.exports = {
  '3.0.0': [
    {
      api: 'https://192.168.100.182',
      healthcheck: {
        path: '/dce/healthz', // default: '/'
        isHealthy: function (res) {
          return res.data === 'Healthy';
        },
        timeout: 2000, // default: 2000 ms
        retry: 3 // default: 1
      },
    },
  ],
  '2.10.3': [
    {
      api: 'https://192.168.100.100',
      healthcheck: {
        path: '/dce/healthz',
      },
    },
  ],
}
```