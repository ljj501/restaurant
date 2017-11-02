module.exports = {
    //进入显示
    dish:function(app, db){
        
        //打开时显示
        app.post('/getDish', function(request, response){
            var pageSize = 6;
            db.select(`select * from dishname limit ${pageSize}`, 'dishname', function(data){
                response.send(data);
            })  
        })
        //分页
        app.post('/getTurnPage', function(request, response){
            var pageSize = 6;
            if(request.body.findClass){
                var newData = request.body;
                var sql = `select * from dishname where ${newData.findClass} regexp '${newData.findContent}' limit ${(newData.pageNumber - 1) * pageSize}, ${pageSize} `;
                var totalSql = `select count(id) from dishname where ${newData.findClass} regexp '${newData.findContent}'`;
                db.search(totalSql, sql, function(data){
                    response.send(data);
                }) 
            } else {
                var sql = `select * from dishname limit ${(request.body.pageNumber - 1) * pageSize}, ${pageSize}`;
                db.select(sql, 'dishname',function(data){
                    response.send(data);
                })  
            }
        })
        //修改数据
        app.post('/getChange', function(request, response){
            var sql = 'update dishname set ';
            for( key in request.body){
                if(key != 'edit'&& key != 'id'){
                    sql += `${key}='${request.body[key]}',`;
                }
            }
            sql = `${sql.slice(0,-1)} where id=${request.body.id}`;
            db.update(sql, function(data){
                response.send(data);
            })  
        })
        //查找分类
        app.post('/getDishClass', function(request, response){
            db.selectClass("select classify from dishclass", function(data){
                response.send(data);
            })  
        })
        //查找分类里最后一個編碼
        app.post('/getDishNumber', function(request, response){
            var classify = request.body.classify;
            var sql = `select number from dishname where classify='${classify}' order by number desc limit 1`;
            db.selectNumber(sql, function(data){
                response.send(data);
            })  
        })
        //添加菜品
        app.post('/addDish', function(request, response){
            var newData = request.body;
            var sql = `insert into dishname (name, classify, number, picture, price, time, creatDate, status) values ('${newData.name}', '${newData.classify}','${newData.number}','${newData.picture}','${newData.price}','${newData.time}','${newData.creatDate}','${newData.status}')`;
            db.insert(sql, function(data){
                response.send(data);
            })  
        })
        //探索
        app.post('/searchDish', function(request, response){
            var newData = request.body;
            var sql = `select * from dishname where ${newData.findClass} regexp '${newData.findContent}' limit 6`;
            var totalSql = `select count(id) from dishname where ${newData.findClass} regexp '${newData.findContent}'`;
            db.search(totalSql, sql, function(data){
                response.send(data);
            })  
        })

        //web获取所有菜品
      app.post('/getWebGoods', function(request, response){
        db.select(`select * from dishname`, 'dishname', function(data){
            response.send(data);
        })  
        })

    }
}