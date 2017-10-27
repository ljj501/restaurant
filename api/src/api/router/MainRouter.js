// var userRouter = require("./UserRouter.js");

// var productRouter = require("./ProductRouter.js");

// var purchaseRouter = require('./PurchaseRouter.js');

// var merberRouter = require("./MerberRouter.js");

// var staffRouter = require("./StaffRouter.js");

// var stockRouter = require("./StockRouter.js");

// var putawayRouter = require("./PutawayRouter.js");

// var orderformRouter = require("./OrderForm.js");
var testRouter = require('./test.js');

var path = require('path');

var  express = require('express');
module.exports = {
    Register: function(app){
        // //跨域
        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1');
            if(req.method=="OPTIONS") {
              res.send(200);/*让options请求快速返回*/
            } else{
              next();
            }
        });
        app.use(express.static(path.resolve(__dirname , '../')));

        // userRouter.Register(app);
        testRouter.Test(app)
    }

}