let redis;
if (process.env.NODE_ENV === "production") {
  redis = require("redis").createClient(process.env.REDIS_URL);
} else {
  redis = require("redis").createClient();
}
const util = require("util");

class Cache {
  constructor() {
    this.cache = redis;
    this.ttl = 3600;
  }

  get(key) {
    const getAsync = util.promisify(this.cache.get).bind(this.cache);

    return getAsync(key)
      .then((value) => value)
      .catch((err) => err);
  }

  set(key, value) {
    return this.cache.setex(key, this.ttl, JSON.stringify(value));
  }

  delete(key) {
    return this.cache.del(key);
  }
}

module.exports = new Cache();
