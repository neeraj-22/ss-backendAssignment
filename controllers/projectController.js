const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { executeQuery, checkIfCollectionExists, ingestSchemaAndData, addOrModifyColumnsIfTableExists } = require("./helperController");

const { createDBConnection } = require("../db/dbConfig");

//Sample DB file import to ingest schema on every server startup
const json = require("../sampleData.json");

//Creates schema on server startup -- Helper Function
exports.createSchema = catchAsyncErrors(async (json, collection, req, res) => {

  var queryStatement = `SHOW TABLES LIKE '${collection}';`;

  var sqlInstance = createDBConnection();

  var collectionAlreadyExists = await checkIfCollectionExists(sqlInstance, queryStatement);

  if (collectionAlreadyExists) {
    addOrModifyColumnsIfTableExists(json, collection);
    return console.log("Collection already exists");
  } else {

    var createTableQueryStatement = `CREATE TABLE ${collection} (${json.columns.map((e) => `${e.name} ${e.data_type}`).join(', ')})`;

    var columns = json.columns.map(e => e.name).join(', ');

    var insertValues = json.data.map(e => {
      const value = Object.values(e).map(val => (typeof val === 'string' ? `'${val}'` : val));
      return `(${value.join(', ')})`;
    }).join(', ');

    var insertValuesQueryStatement = `INSERT INTO ${collection} (${columns}) VALUES ${insertValues};`;

    try {
      await ingestSchemaAndData(createTableQueryStatement, insertValuesQueryStatement, req, res)
      return console.log("Value inserted")
    }
    catch (err) {
      return console.table(err)
    }
  }

})

//Creates schema on route hit -- POST -> /:collection
exports.createSchemaOnRouteHit = catchAsyncErrors(async (req, res) => {

  const { collection } = req.params;

  return this.createSchema(json, collection, req, res)

})

//Returns all records of the collection -- GET -> /read/:collection
exports.readCollection = catchAsyncErrors(async (req, res) => {

  const { collection } = req.params;

  var queryStatement = `SELECT * FROM ${collection}`;

  var sqlInstance = createDBConnection();

  executeQuery(sqlInstance, queryStatement, req, res);

})

//Returns all a particular record of the table by their id  -- GET -> /:collection/:id
exports.getRowById = catchAsyncErrors(async (req, res) => {

  const { collection, id } = req.params;
  const { searchAttribute } = req.body;

  var queryStatement = `SELECT * FROM ${collection} WHERE ${searchAttribute} = ${id}`;

  var sqlInstance = createDBConnection();

  executeQuery(sqlInstance, queryStatement, req, res);

})

//Updates the record of the collection with user provided details by their id  -- POST -> /:collection/:id
exports.updateRowById = catchAsyncErrors(async (req, res) => {

  const { collection, id } = req.params;
  const { attrToUpdate, updatedValue, searchAttribute } = req.body;

  var queryStatement = `UPDATE ${collection} SET ${attrToUpdate} = ${updatedValue} WHERE ${searchAttribute} = ${id}`;

  var sqlInstance = createDBConnection();

  executeQuery(sqlInstance, queryStatement, req, res);
})

//Deletes the record of the table by their id -- DEL -> /:collection/:id
exports.deleteRowById = catchAsyncErrors(async (req, res) => {

  const { collection, id } = req.params;
  const { searchAttribute } = req.body;

  var queryStatement = `DELETE FROM ${collection} WHERE ${searchAttribute} = ${id}`;

  var sqlInstance = createDBConnection();

  executeQuery(sqlInstance, queryStatement, req, res);
})