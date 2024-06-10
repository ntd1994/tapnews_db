module.exports = {
    apps: [{
      name: "Front-End",
      instances: 1,
      autorestart: true,
      script: ".output/server/index.mjs",
      env: {
        PORT: '8080',
      },
    }]
  }
