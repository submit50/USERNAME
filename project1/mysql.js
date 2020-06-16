const mysql = require('mysql');
const con = require('./connection');
const connect = require('./timetable');
const express = require('express');
const path = require('path')

var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



app.post('/saveprofile', async(req, res) => {
    console.log(req.body)
    await onData(req.body)
});

/*app.post('/delinfo', async(req, res) => {
    console.log(req.body.unid)
    await delet(req.body)
})*/
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'login.html'));
});

app.post('/login', (req, res) => {
    console.log(req.body.username, req.body.email);
    connect.connect(function(err) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
    
        var login = `INSERT INTO login(Username,Email,Password) VALUES('${username}','${email}','${password}');`
        connect.query(login, function(err, result) {
            if (err) throw err;
            console.log("Login Perfectly done.");
        });
    });

});

app.get('/reg', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Client', 'app.html'));
});
app.get('/alreg', (req, res) =>{
    res.sendFile(path.resolve(__dirname,'Client', 'help.html'));
});
app.get('/del', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'del.html'));
});

app.post('/del', (req, res) => {
    con.connect(function(err) {
        var unid = req.body.UniqID;
        console.log(req.body.UniqID);
        var sql = `DELETE FROM employee WHERE UniqID='${unid}';`
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
        });
    });
});

app.get('/query', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'help.html'));
})
app.get('/ask', (req, res) => {
        res.sendFile(path.join(__dirname, 'Client', 'query.html'));
    })
    /*app.get('/del', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'Client', 'del.html'));
    })*/
app.listen(3000, () => console.log('Express server is running at port no: 3000'));

const onData = async({ uid, name, email, phone, prof }) => {
    var sql = `INSERT INTO employee(UniqID, Name, EmailId, PhoneNo, Profession) VALUES('${uid}', '${name}', '${email}', ${phone}, '${prof}');`
    console.log("Inserting data", uid)
    return new Promise((resolve, reject) => {
        con.query(sql, function(err, result) {
            if (err) reject(err);
            console.log("1 record inserted");

            resolve()
        });
    });
}