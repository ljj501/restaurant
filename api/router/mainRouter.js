var path = require('path');

var express = require('express');

var db = require('../db.js');

var bodyparser = require('body-parser');

var dishRouter = require('./dishRouter.js');

var orderRouter = require('./orderRouter.js');

var classRouter = require('./classRouter.js');

module.exports = {
    allRouter: function(app){
        
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
        
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));

        app.use(express.static(path.resolve(__dirname , '../')));

        //菜品管理
        dishRouter.dish(app, db);
        //订单管理
        orderRouter.order(app, db);
        //订单管理
        classRouter.dishClass(app, db);


    }
}