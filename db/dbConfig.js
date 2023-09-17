const mysql = require("mysql");

var mySqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
})

exports.connectToDB = () => {
    mySqlConnection.connect((err) => {
        if (!err) {
            return console.log('DB connected Successfully');
        }
        else {
            return console.log('DB connection failed');
        }
    })
    // return console.log("DB Connected Test")
}

