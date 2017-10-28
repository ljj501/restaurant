var express = require('express');
var app = express();

var db = require('./db.js');

app.all('*', function(req, res, next) {
    // res.writeHead(200, {"Content-Type"})
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      	res.sendStatus(200);/*让options请求快速返回*/
    } else{
      	next();
    }
});


app.get('/getgoods', function(request, response){
	db.select('select * from test limit 10', function(rows){
		response.send(rows);
	})
	
})

app.listen(88);