module.exports = {
  apps: [
    {
      name: 'BCXExa-App',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './src/dist/app.js',
      args: 'start',
    },
  ],
}
