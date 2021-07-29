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
        client.emit("my_id", client.id);

        client.on("disconnect", () => {
            client.broadcast.emit("callEnded")
        });

        client.on("callUser", (payload) => {
            io.to(payload.userToCall).emit("callUser", {
                signal: payload.signalData,
                from:payload.from,
                name:payload.name
            });
        });

        client.on("answerCall", (payload) => {
            io.to(payload.to).emit("callAccepted", payload.signal)
        });
    })
}