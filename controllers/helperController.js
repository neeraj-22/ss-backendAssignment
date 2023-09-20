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
            return res.status(500).json({
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

exports.addOrModifyColumnsIfTableExists = (json, collection) => {

    var sqlInstance = createDBConnection();

    const getColumnsQueryStatement = `SHOW COLUMNS FROM ${collection}`;

    sqlInstance.query(getColumnsQueryStatement, (err, results) => {
        if (err) {
            console.table(err);
            return;
        }

        const columns = json.columns;


        const existingColumns = results.map((row) => row.Field);
        const columnsToAdd = [];

        for (const column of columns) {
            if (!existingColumns.includes(column.name)) {
                columnsToAdd.push(`${column.name} ${column.data_type}`);
            }
        }

        if (columnsToAdd.length === 0) {
            console.log('Table exists and no columns to add.');
            endDBConnection(sqlInstance);
            return;
        }

        const alterTableQueryStatement = `ALTER TABLE ${collection} ADD COLUMN ${columnsToAdd.join(', ')}`;

        sqlInstance.query(alterTableQueryStatement, (err, rows, fields) => {
            if (!err) {
                console.log('Table altered successfully!');
            } else {
                console.table(err);
            }
            endDBConnection(sqlInstance);
            return;
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