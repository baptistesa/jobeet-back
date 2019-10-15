
var express = require('express'),
  http = require('http');
var router = express.Router();
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var db = require("../sql/init");

server.listen(3001);


io.on('connection', (socket) => {

  socket.on('send-user', (message) => {
    io.sockets.in(message.id_room).emit('message',
      {
        message: message.text,
        id_exp: message.id_exp,
        id_dest: message.id_dest,
        offre: message.id_offre,
        room: message.id_room
      });
    db.query("INSERT INTO messages(id_exp, id_offre, message, id_dest, id_room) VALUES(?, ?, ?, ?, ?)", [message.id_exp, message.id_offre, message.text, message.id_dest, message.id_room], function (errors, results, fields) {

    })
  })

  socket.on('join', (data) => {
    socket.join(data.id_room);
    socket.nickname = data.nickname;
  });

  socket.on("writing", data => {
    io.sockets.in(data.id_room).emit("writing", {
      status : true,
      id : data.id
    })
  })

  socket.on("nowriting", data => {
    io.sockets.in(data.id_room).emit("nowriting", {
      status : false,
      id : data.id
    })
  })

});

/* GET home page. DO NOT TOUCH*/
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
