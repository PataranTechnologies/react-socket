const express=require('express')
const socketio=require('socket.io')
const http=require('http')
const app=express();
const port=process.env.port || 5000
const server=http.createServer(app);
const io=socketio(server);
const router =require('./router')
const UserManager= require('./users.js');
const { use } = require('./router');

app.use(router)

io.on('connection',(socket)=>{

    socket.on('join',({name,room},callback)=>{

           const {error,user} =UserManager.addUser({id:socket.id,name:name,room:room})

           if (error) return callback(error)

           socket.emit("message",{user:"admin",text:`${user.name} ,Welcome to chat room`})
           socket.broadcast.to(user.room).emit("message", {user:"admin",text:`${user.name} has joined the room`})
           socket.emit("roomData",{users:UserManager.getUsersByRoom(user.room)});
           socket.join(user.room)

    })

    socket.on('sendMessage',(message,callback)=>
    {
     const user=UserManager.getUser(socket.id);

     io.to(user.room).emit("message",{user:user.name,text:message});

     socket.emit("roomData",{users:UserManager.getUsersByRoom(user.room)});

     callback();

    })

    socket.on('disconnect',()=>
    {
        let user= UserManager.removeUser(socket.id);
        io.to(user.room).emit("message",{user:user.name,text:`${user.name}, Has left the Chat`})
        socket.off();
        return user;
    })




})
server.listen(port,()=>{
    console.log("server has started : "+port);
})