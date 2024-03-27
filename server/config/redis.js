const Redis = require('ioredis');

const redis = new Redis({
  password: process.env.PASS_REDIS,
  username: "default",
  host: process.env.HOST_REDIS,
  port: 15858,
  db: 0,
});

module.exports = {
    redis
};
