    var bodyparser = require("body-parser");
// var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var db = require("../DBHelper.js");

module.exports={
    Test:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended:false}));
        app.post("/test",function(request,response){

            db.insert('test',{'name':'JJ','age':21},function(result){
                response.send(result);
            });
        })
    }
}