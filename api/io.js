var io = require('socket.io')();
io.on("connection", function(client){
    client.on('sendOrder', function(data){
        io.emit("receiveOrder", data);
    })
    client.on('sendCook',function(data){
        console.log(data)
    })
})
io.listen(5566)