var express = require('express');
var app = express();
var db_config = require(__dirname + '/connection.js');
var conn = db_config.init();
var bodyParser = require('body-parser');

db_config.connect(conn);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function (req, res) {
    res.send('ROOT');
});

app.get('/list', function (req, res) {
    var sql = 'SELECT * FROM cin';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else console.log(JSON.stringify(res));
    });
});


app.listen(3030, () => console.log('Server is running on port 3030...'));