const express = require("express");
const helmet = require("helmet");

const server = express();
const projectRouter = require("../routes/projectRouter");
const actionRouter = require("../routes/actionRouter");

server.use(helmet());
server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
    res.send(`<h2>Web Node-API Web 25 Sprint Challenge!</h2>`)
})

module.exports = server;