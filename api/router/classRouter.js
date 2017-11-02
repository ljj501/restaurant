module.exports = {
    dishClass:function(app, db){
        //打开时显示
        app.post('/getClassDish', function(request, response){
            var pageSize = 10;
            db.select(`select * from dishclass limit ${pageSize}`, 'dishclass', function(data){
                response.send(data);
            })  
        })
        //改變分類
        app.post('/changeClass', function(request, response){
            var newData = request.body;
            var sql =`update dishclass set status='${newData.status}' where id=${newData.id}`;
            var newSql = `update dishname set status='${newData.status}' where classify='${newData.classify}'`;
            db.updateClass(sql, newSql, function(data){
                response.send(data);
            })  
        })
        //web
        app.post('/getWebClass', function(request, response){
            db.select(`select * from dishclass`, 'dishclass', function(data){
                response.send(data);
            })  
        })
    }
}