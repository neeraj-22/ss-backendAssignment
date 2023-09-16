const express = require("express");
const { reactTest } = require("../controllers/projectController");

const router = express.Router();

router.post("/test/:nameTest", reactTest)

module.exports = router;

// POST /:collection
// GET /:collection/:id
// POST /:collection/:id
// DELETE /:collection/:id