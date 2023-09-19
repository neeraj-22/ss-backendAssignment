const mysql = require("mysql");

exports.connectToDB = () => {

    mySqlConnection.connect((err) => {
        if (!err) {
            return console.log('DB connected Successfully');
        }
        else {
            return console.log('DB connection failed');
        }
    })
    
}

exports.createDBConnection = () => {

    var sqlInstance = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'testdb'
    })

    return sqlInstance;

}

exports.endDBConnection = (sqlInstance) => {
    
     sqlInstance.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
            return;
        }
        console.log('MySQL connection closed');
    });
    
}

