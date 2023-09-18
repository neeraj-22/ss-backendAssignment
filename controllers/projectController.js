//Query Functions — Dirty Kitchen
const mysql = require("mysql");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { checkIfCollectionExists, executeQuery } = require("./helperFunctions");

var sqlInstance = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
})

//Creates schema on server startup
exports.createSchema = catchAsyncErrors(async (json, req, res) => {

  /*
    ! First Check if table doesn't exist
      ?Need a fetch tables from db function and match it with the json.table_name
      ?If table exists then need to fetch column names and modify as with the json file
      ?If data is present then only exec below functions
        ?Insert Values function -- .map() function to create a query each time and put values.
          ?A further optimization could be -- if there are no unique columns in json then put multiple values and run a single query
    var createTableQueryStatement = `CREATE TABLE ${json.table_name} (${json.columns.map((e) => `${e.name} ${e.data_type}`).join(', ')})`;
    var insertValuesQueryStatement = `INSERT INTO ${json.table_name} (${json.columns.map((e) => `${e.name}`).join(', ')}) VALUES ${json.data.map((e) => Object.values(e))`;
  */

  // const doesTableExists = checkIfCollectionExists();

  var createTableQueryStatement = `CREATE TABLE ${json.table_name} (${json.columns.map((e) => `${e.name} ${e.data_type}`).join(', ')})`;

  var columns = json.columns.map(e => e.name).join(', ');

  var insertValues = json.data.map(e => {
    const value = Object.values(e).map(val => (typeof val === 'string' ? `'${val}'` : val));
    return `(${value.join(', ')})`;
  }).join(', ');

  var insertValuesQueryStatement = `INSERT INTO ${'employeebs'} (${columns}) VALUES ${insertValues};`

  sqlInstance.query(createTableQueryStatement, (err, rows, fields) => {
    if (!err) {
      sqlInstance.query(insertValuesQueryStatement, (err, rows, fields) => {
        if (!err) {
          return console.log("Values Inserted")
        } else {
          return console.log(err)
        }
      })
      // return console.log("Fin")
    } else {
      return console.table(err)

    }
  })

  // executeQuery(createTableQueryStatement);
  // executeQuery(insertValuesQueryStatement);

  // return console.log("Hello", insertValuesQueryStatement);

})

//Creates schema on route hit
exports.createSchemaOnRouteHit = catchAsyncErrors(async (req, res) => {

  const { collection } = req.params;

  return console.log("Hello", collection);

})

//Returns all records of the table
exports.readCollection = catchAsyncErrors(async (req, res) => {

  const { collection } = req.params;

  var queryStatement = `SELECT * FROM ${collection}`;

  sqlInstance.query(queryStatement, (err, rows, fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        rows
      })
    } else {
      res.status(200).json({
        success: false,
        result: err
      })
    }
  })
})

//Returns all a particular record of the table by their id
exports.getRowById = catchAsyncErrors(async (req, res) => {

  const { collection, id } = req.params;

  var queryStatement = `SELECT * FROM ${collection} WHERE EmpID = ${id}`;

  sqlInstance.query(queryStatement, (err, rows, fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        rows
      })
    } else {
      res.status(200).json({
        success: false,
        result: err
      })
    }
  })
})

//Updates the record of the table with user provided details by their id
exports.updateRowById = catchAsyncErrors(async (req, res) => {

  const { collection, id } = req.params;

  /*
    *Updating dynamically what user selects 
    const { colName, updatedValue } = req.body; --> update Salary with colName and 999 with updatedValue

    TODO:  Put a check if any column with colName exists and if the updatedValue matches its type
  */

  var queryStatement = `UPDATE ${collection} SET Salary = 999 WHERE EmpID = ${id}`;

  sqlInstance.query(queryStatement, (err, rows, fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        rows
      })
    } else {
      res.status(200).json({
        success: false,
        result: err
      })
    }
  })
})

//Deletes the record of the table by their id
exports.deleteRowById = catchAsyncErrors(async (req, res) => {

  const { collection, id } = req.params;

  var queryStatement = `DELETE FROM ${collection} WHERE EmpID = ${id}`;

  sqlInstance.query(queryStatement, (err, rows, fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        rows
      })
    } else {
      res.status(200).json({
        success: false,
        result: err
      })
    }
  })
})