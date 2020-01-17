const express = require("express");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

router.use(express.json());

//GET requests
router.get("/", (req, res) => {
  projects.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "something went wrong." })
    })
});

router.get("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  projects.get(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "something went wrong." })
    })
});

router.get("/:id/project-actions", validateProjectId, (req, res) => {
  const id = req.params.id;
  projects.getProjectActions(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "error retrieving actions for project." })
    })
});

//POST requests


//DELETE requests

//PUT requests


//custom middleware
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

module.exports = router;