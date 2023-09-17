const express = require("express");
const { readCollection, getRowById, updateRowById, deleteRowById } = require("../controllers/helperFunctions");
const { reactTest } = require("../controllers/projectController");

const router = express.Router();

router.post("/test/:nameTest", reactTest)

//read
router.get("/read/:collection", readCollection)
router.get("/read/:collection/:id", getRowById)

//UPDATE
router.post("/read/:collection/:id", updateRowById)

//DEL
router.delete("/read/:collection/:id", deleteRowById)

module.exports = router;

// POST /:collection
// GET /:collection/:id
// POST /:collection/:id
// DELETE /:collection/:id