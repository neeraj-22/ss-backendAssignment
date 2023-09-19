const { endDBConnection, createDBConnection } = require("../db/dbConfig");

exports.executeQuery = (sqlInstance, queryStatement, req, res) => {
    
    return sqlInstance.query(queryStatement, (err, rows, fields) => {

        endDBConnection(sqlInstance);

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

}

exports.checkIfCollectionExists = (sqlInstance, queryStatement) => {

    return new Promise((resolve, reject) => {
        sqlInstance.query(queryStatement, (err, rows, fields) => {
            if (err) {
                endDBConnection(sqlInstance);
                reject(err);
            } else {
                endDBConnection(sqlInstance);
                resolve(rows.length > 0);
            }
        });
    });

}

exports.ingestSchemaAndData = (createTableQueryStatement, insertValuesQueryStatement, req, res) => {

    var sqlInstance = createDBConnection();

    return new Promise((resolve, reject) => {
        sqlInstance.query(createTableQueryStatement, (err, rows, fields) => {
            if (!err) {
                sqlInstance.query(insertValuesQueryStatement, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows.length);
                    } else {
                        reject(err);
                    }
                });
            } else {
                reject(err);
            }
        });
    }
    )

}