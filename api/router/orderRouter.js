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
            db.select(`select * from orderdetalis limit ${pageSize}`, 'orderdetalis', function(data){
                response.send(data);
            })  
        })
    }
}