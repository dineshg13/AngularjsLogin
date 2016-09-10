var port = process.env.port || 1337;
var express = require('express');
var app = express();
var path = require('path');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
var bodyParser = require('body-parser')

app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


app.listen(port);
console.log('Listening on port ' + port + '...');