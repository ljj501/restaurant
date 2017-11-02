var express = require('express');

var mainRouter = require('./router/mainRouter.js');

var app = express();

mainRouter.allRouter(app);

app.listen(88);