module.exports = {
  apps: [
    {
      name: "image.ditotisi.com",
      script: "dist/server.js", // The entry point of your application
      instances: 1, // Number of instances to run (adjust as needed)
      autorestart: true,
      watch: false, // Set to true if you want to enable file watching
      max_memory_restart: "500M", // Restart if memory usage exceeds this
      env: {
        NODE_ENV: "production", // Adjust as needed
        PORT: 4000, // Specify your desired port
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 4000,
      },
    },
  ],
};
