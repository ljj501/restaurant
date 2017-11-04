var io = require('socket.io')();
io.on("connection", function(client){
    client.on('sendOrder', function(data){
        io.emit("receiveOrder", data);
    })
    client.on('Cooked',function(data){
        io.emit("receiveStatus", data);
    })
})
io.listen(5566)