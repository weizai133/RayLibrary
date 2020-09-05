const redis = require("redis");
const { promisify } = require("util");

const redis_client = redis.createClient({ host: '127.0.0.1', port: '6379' });
redis_client.on("error", (error) => {
	logger.error(error)
});

const redisSet = promisify(redis_client.set).bind(redis_client);
const redisGet = promisify(redis_client.get).bind(redis_client);

const redisHSet = promisify(redis_client.HSET).bind(redis_client);
const redisHGet = promisify(redis_client.HGET).bind(redis_client);

module.exports = {
  redisSet,
  redisGet,
  redisHSet,
  redisHGet
}

