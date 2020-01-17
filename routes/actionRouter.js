const express = require("express");
const actions = require("../data/helpers/actionModel");
const router = express.Router();
const { validateActionId, validateActionInfo } = require("../middleware/middleware");
const { validateProjectId } = require("../middleware/middleware");

//GET requests
router.get("/", (req, res) => {
    actions.get()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "something went wrong"})
    })
});

router.get("/:id", validateActionId, (req, res) => {
    const id = req.params.id;
    actions.get(id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "error retrieving actions"})
    })
});

//POST requests
router.post("/project/:id/actions", validateProjectId, validateActionInfo, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    actions.insert({...body, project_id: id})
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "error posting new action"})
    })
});

//DELETE requests
router.delete("/:id", validateActionId, (req, res) => {
    const id = req.params.id;
    actions.remove(id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "error removing action."})
    })
});

//PUT requests
router.put("/:id", validateActionId, validateActionInfo, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    actions.update(id, body)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "error modifying action."})
    })
});


module.exports = router;