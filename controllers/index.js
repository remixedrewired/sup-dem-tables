const Planning = require("../models");

const { OK, NotFound, NoContent } = require("../constants");

module.exports = {
  createOne: async (req, res) => {},

  getAll: (req, res) =>
    Planning.find()
      .then((plannings) => res.status(OK.code).send(plannings))
      .catch((err) =>
        res.status(NotFound.code).send(err.message || NotFound.message),
      ),

  getOne: (req, res) => {},

  updateOne: (req, res) => {},

  deleteOne: (req, res) => {
    const {
      params: { id = "" },
    } = req;

    return Planning.findByIdAndRemove({ _id: id })
      .then(() => res.status(NoContent.code).send(NoContent.message))
      .catch((err) =>
        res.status(NotFound.code).send(err.message || NotFound.message),
      );
  },
};
