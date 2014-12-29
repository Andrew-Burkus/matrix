var express = require('express');
var app = express();

app.use(express.static('./public'));

var port = process.env.port || 8080;
app.listen(port, function() {
    console.log('running on: ' + port);
});
