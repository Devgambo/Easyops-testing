module.exports = {
  apps: [
    {
      name: 'easy-ops-testing',
      script: 'index.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        DEMO_FAILURE_MODE: 'false'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        DEMO_FAILURE_MODE: 'false'
      }
    }
  ]
};
