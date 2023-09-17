//Query Functions — Dirty Kitchen
const mysql = require("mysql");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

var sqlInstance = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database : 'testdb'
})

exports.readCollection = catchAsyncErrors(async (req, res) => {

  const {collection} = req.params;

  var queryStatement = `SELECT * FROM ${collection}` ; 

  sqlInstance.query(queryStatement, (err, rows, fields) => {
    if(!err){
      return res.status(200).json({
        success: true,
        rows
      })
    }else{
      res.status(200).json({
        success: false,
        result : err
      })
    }
  })
})

exports.getRowById = catchAsyncErrors(async (req, res) => {

  const {collection, id} = req.params;

  var queryStatement = `SELECT * FROM ${collection} WHERE EmpID = ${id}` ; 

  sqlInstance.query(queryStatement, (err, rows, fields) => {
    if(!err){
      return res.status(200).json({
        success: true,
        rows
      })
    }else{
      res.status(200).json({
        success: false,
        result : err
      })
    }
  })
})

exports.updateRowById = catchAsyncErrors(async (req, res) => {

  const {collection, id} = req.params;

  var queryStatement = `UPDATE ${collection} SET Salary = 999 WHERE EmpID = ${id}` ; 

  sqlInstance.query(queryStatement, (err, rows, fields) => {
    if(!err){
      return res.status(200).json({
        success: true,
        rows
      })
    }else{
      res.status(200).json({
        success: false,
        result : err
      })
    }
  })
})

exports.deleteRowById = catchAsyncErrors(async (req, res) => {

  const {collection, id} = req.params;

  var queryStatement = `DELETE FROM ${collection} WHERE EmpID = ${id}` ; 

  sqlInstance.query(queryStatement, (err, rows, fields) => {
    if(!err){
      return res.status(200).json({
        success: true,
        rows
      })
    }else{
      res.status(200).json({
        success: false,
        result : err
      })
    }
  })
})