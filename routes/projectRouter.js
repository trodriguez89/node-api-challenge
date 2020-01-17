const express = require("express");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

router.use(express.json());

module.exports = router;