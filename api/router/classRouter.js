module.exports = {
    dishClass:function(app, db){
        //打开时显示
        app.post('/getClassDish', function(request, response){
            var pageSize = 6;
            db.select(`select * from dishclass limit ${pageSize}`, 'dishclass', function(data){
                response.send(data);
            })  
        })
    }
}