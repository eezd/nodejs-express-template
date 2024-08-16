const { name } = require("./package.json");
const path = require("path");

module.exports = {
  apps: [
    {
      name,
      script: path.resolve(__dirname, "./server/bin/www"),
      // instances: require('os').cpus().length,
      instances: 2,
      autorestart: true,
      watch: true,
      env_production: {
        NODE_ENV: "production",
        PORT: 3500,
      },
    },
  ],
};
