//Query Functions — Dirty Kitchen
const mysql = require("mysql");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

var sqlInstance = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
})

// Execute Query
exports.executeQuery = catchAsyncErrors(async (queryStatement, req, res) => {
  sqlInstance.query(queryStatement, (err, rows) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        rows
      })
    } else {
      return res.status(200).json({
        success: false,
        result: err
      })
    }
  })
})

//Check if Table exists
exports.checkIfCollectionExists = catchAsyncErrors(async (queryStatement, req, res) => {
  sqlInstance.query(queryStatement, (err, rows) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        rows
      })
    } else {
      return res.status(200).json({
        success: false,
        result: err
      })
    }
  })
})