const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

function logger(req, res, next){
  console.log(`${req.method} ${req.originalUrl} at ${new Date().toISOString()}`)
  next();
};

function validateProjectId(req, res, next) {
  const id = req.params.id;
  projects.get(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "invalid id." })
      } else {
        next();
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "something went wrong." })
    })
};

function validateProjectInfo(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "missing user data." })
  } else if (!body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else if (!body.description) {
    res.status(400).json({ message: "missing required description field" })
  } else {
    next();
  }
};

module.exports = {
  logger,
  validateProjectId,
  validateProjectInfo
}