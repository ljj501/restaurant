var bodyparser = require("body-parser");
var db = require("../db.js");
var urlencode = bodyparser.urlencoded({extended: false});
var cookie = require('cookie-parser');
var session = require('express-session');
var url = require('url');
var jwt = require('jsonwebtoken');
module.exports = {
    Register: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.use(cookie());
        app.use(session({
            secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
            name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
            cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
            resave: false,
            saveUninitialized: true,    
        }))
        //过滤器
        // app.use(function(req, res, next){
        //     console.log(req.session);
        //  if(!req.session.name && url.parse(req.url).pathname != "/login"){
        //      res.send('{state: false, message: "当前没有权限访问"}');
        //      next();
        //      // next('{state: false, message: "当前没有权限访问"}');
        //  } else {
        //      next();
        //  }
        //  //你可以执行下一步操作
            
        // })
        app.post('/Welogin', function(request, response){
            var sql =`select * from login`;
            db.select(sql,'login',function(data){
                response.send(data);
            })  
        })
        app.post('/Weregister', function(request, response){
            var sql =`insert into login values(request.body.name,request.body.pass)`;
            db.insert(sql,'login',function(data){
                response.send(data);
            })  
        })
    }

}