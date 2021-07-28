module.exports = (server) => {
    const io = require('socket.io')(server.listen(8000, () => {
        console.log("Server is active...")
    }), {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    io.on("connection", (client) => {
        console.log("What is socket", client);
        console.log("Socket is active to be connected")
        client.emit("my_msg", client.id);

        client.on("disconnect", () => {
            client.broadcast.emit("callEnded")
        });

        client.on("callUser", ({
            userToCall,
            signalData,
            from,
            name
        }) => {
            io.to(userToCall).emit("callUser", {
                signal: signalData,
                from,
                name
            });
        });

        client.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal)
        });
    })
}