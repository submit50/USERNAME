const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'kbdnrx88@6710',
    database: 'timetable'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed\ error:' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;