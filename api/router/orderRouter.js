module.exports = {
    order:function(app, db){
        //打开时显示
        app.post('/getOrder', function(request, response){
            var pageSize = 6;
            db.select(`select * from saleorder limit ${pageSize}`, 'saleorder', function(data){
                response.send(data);
            })  
        })
        //打开订单详情时显示
        app.post('/getOrderDetalis', function(request, response){
            var pageSize = 6;
            db.orderSelect(`select * from orderdetalis where ordercode='${request.body.ordercode}' limit ${pageSize}`, 'orderdetalis', request.body.ordercode, function(data){
                response.send(data);
            })  
        })
        //修改数据
        app.post('/changeOrder', function(request, response){
            var sql =`update orderdetalis set status='已做' where id=${request.body.id}`;
            db.update(sql, function(data){
                response.send(data);
            })  
        })

        //web传送订单
        app.post('/sentWetOrder',function(request,response){
            console.log(request.body)
        })
        //获取订单
        app.post('/Webgetorder', function(request, response){
            var sql =`select * from orderdetalis`;
            db.select(sql,'orderdetalis',function(data){
                response.send(data);
            })  
        })
        //订单修改
        app.post('/Webdeleted', function(request, response){
            var sql =`update orderdetalis set status='取消' where name = ${request.body.name}`;
            db.update(sql, function(data){
                response.send(data);
                console.log(data) 
            })

        })
    }
}