const express = require("express");

const { readCollection, getRowById, updateRowById, deleteRowById, createSchemaOnRouteHit } = require("../controllers/projectController");

const router = express.Router();

//Create -- Ingest Schema route
router.post("/:collection", createSchemaOnRouteHit)

//read
router.get("/read/:collection", readCollection)
router.get("/:collection/:id", getRowById)

//UPDATE
router.post("/:collection/:id", updateRowById)

//DEL
router.delete("/:collection/:id", deleteRowById)

module.exports = router;