var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kbdnrx88@6710",
    database: "timetable"
});
con.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed\ error:' + JSON.stringify(err, undefined, 2));
});

module.exports = con;