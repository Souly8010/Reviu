module.exports = {
  apps: [{
    name: "reviu-backend",
    script: "src/app.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      DB_HOST: "srv1705.hstgr.io",
      DB_USER: "u449192225_souly",
      DB_PASSWORD: "Jett108001@!",
      DB_NAME: "u449192225_auth"
    }
  }]
}
