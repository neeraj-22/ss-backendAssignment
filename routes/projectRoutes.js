const express = require("express");

const { readCollection, getRowById, updateRowById, deleteRowById, createSchema, createSchemaOnRouteHit, test } = require("../controllers/projectController");

const router = express.Router();

//test routes
// router.get("/test", test)
router.post("/:collection", createSchemaOnRouteHit)

//read
router.get("/read/:collection", readCollection)
router.get("/:collection/:id", getRowById)

//UPDATE
router.post("/:collection/:id", updateRowById)

//DEL
router.delete("/:collection/:id", deleteRowById)

module.exports = router;

// POST /:collection
// GET /:collection/:id
// POST /:collection/:id
// DELETE /:collection/:id