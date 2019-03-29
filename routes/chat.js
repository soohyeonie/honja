var express = require('express');
var router = express.Router();
var models = require('../models');
var url = require('url');
var querystring = require('querystring');
var qObj;
var name;

router.get('/',function(req,res,next){
    let body = req.body;
    let cookies = req.cookies;
    var parsedUrl = url.parse(req.url);
    qObj = querystring.parse(parsedUrl.query);
    name = cookies.activate;

    res.render('chat', {
        name : name,
        roomnumber: qObj.id
    });
})

module.exports = function(io){

    io.on('connection', function(socket){ //3

        var roomnumber;
        socket.on('joinRoom',function(data){
            roomnumber = data;
            socket.join(roomnumber);
            console.log('JOIN ROOM LIST', roomnumber);

        console.log('user connected: ', socket.id);  //3-1

        io.to(socket.id).emit('change name');   //3-1

        models.chatmsg.findAll({
            where: {roomnumber : roomnumber}
        })
        .then( result => {
            io.to(roomnumber).emit('set chat',result);
            
            //result.forEach( x=>
            //    {
            //        var msg = x.name + " : " + x.text;
            //        io.emit('receive message', msg);
            //    }
            //);
        })
        .catch( err => {
            console.log(err);
        });
    
        socket.on('disconnect', function(){ //3-2
            console.log('user disconnected: ', socket.id);
        });
    
        socket.on('send message', function(name,text){ //3-3
            models.chatmsg.create({
                roomnumber: roomnumber,
                name: name,
                text: text
            })
            .then( result => {
                var msg = name + ' : ' + text;
                console.log(msg);
                io.to(roomnumber).emit('receive message', msg);
            })
            .catch( err=> {
                console.log(err);
            });        
        });
        })
    });

    return router;
}