const express = require("express");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

const { validateProjectId, validateProjectInfo } = require("../middleware/middleware");

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
router.post("/", validateProjectInfo, (req, res) => {
  const body = req.body;
  projects.insert(body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: "something went wrong." })
    })
});

//DELETE requests
router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  projects.remove(id)
  .then(deleted => {
      res.status(200).json({message: "project successfully deleted", deleted})
  })
  .catch(error => {
      console.log(error)
      res.status(500).json({errorMessage: "error removing project"}, error)
  })
});

//PUT requests
router.put("/:id", validateProjectId, validateProjectInfo, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  projects.update(id, body)
  .then(data => {
      res.status(201).json(data)
  })
  .catch(error => {
      console.log(error)
      res.status(500).json({errorMessage: "error updating the project."})
  })
});


module.exports = router;