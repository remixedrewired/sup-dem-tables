const Cache = require("../services/cacheService");

const { NotFound } = require("../constants");

module.exports = {
  cache: (req, res, next) => {
    const {
      method,
      params: { id = "" },
    } = req;

    Cache.get(id)
      .then((cached) => {
        if (cached && method === "GET") return res.send(JSON.parse(cached));

        req.cached = cached;
        next();
      })
      .catch((err) =>
        res.status(NotFound.code).send(err.message || NotFound.message),
      );
  },
};
