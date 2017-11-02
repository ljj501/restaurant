var io = require('socket.io')();
io.on("connection", function(client){
    client.on('sendOrder', function(data){
        console.log(data);
        io.emit("receiveOrder", data);
    })
})
io.listen(5566)