var express = require('express');

var mainRouter = require('./router/mainRouter.js');

var app = express();

<<<<<<< HEAD
app.get('/getgoods', function(request, response)
{

	db.select('select * from orderdata limit 10', function(rows){
        // console.log(rows)
		response.send(rows);
	})
	
})
=======
mainRouter.allRouter(app);
>>>>>>> e3c63fa42b25ab4636bc4f6419b810c4e9e80682

app.listen(88);