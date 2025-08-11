const express = require('express');
const app = express();
const path = require('path');
const http = require('http'); 

// socket io server is step 
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// make ejs step 
app.set('view engine', "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection",function (socket){
    socket.on("send-location", function (data){
        io.emit("recived-location", {id:socket.id, ...data });
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    });
    
});
// server make it 
app.get("/", function  (req, res)  {
 res.render("index");
    // res.send("priyanshu kashyap");
});
server.listen(3000);