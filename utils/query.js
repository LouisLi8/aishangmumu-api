const mysql = require('mysql')
const MYSQL_CONFIG = require("../config/db.js")

const pool = mysql.createpool(MYSQL_CONFIG)

// query sql
const query= (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) {
                reject(err)
            }
            else {
                connection.query(sql, val, (err, fields) => {
                    if(err) reject(err)
                    else resolve(fields)
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    query
}