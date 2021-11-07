// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);

// socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://fierce-mesa-54468.herokuapp.com',
      'http://localhost:3000',
      'https://fierce-mesa-54468.herokuapp.com',
    ],
  },
});

const roomList = {};

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  const room = socket.handshake.query.roomName;
  socket.join(room);

  if (roomList[room]) {
    roomList[room] = [...roomList[room], username];
  } else {
    roomList[room] = [socket.handshake.query.username]
  }

  io.to(room).emit('joined', roomList[room]);
  
  socket.on('send-message', ({ sender, text, avatar }) => {
    io.to(room).emit('receive-message', { sender, text, avatar });
  });

  socket.on('begin-game', turnOrder => {
    io.to(room).emit('game-has-begun', turnOrder);
  });

  socket.on('end-game', () => {
    io.to(room).emit('game-has-ended');
  });

  socket.on('disconnect', () => {
    socket.leave(room);
    const index = roomList[room].indexOf(username);
    roomList[room].splice(index, 1);
    if (roomList[room].length === 0) delete roomList[room];
    socket.broadcast.to(room).emit('joined', roomList[room]);
  });
});

// Environmental variables
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const db = mongoose.connection;
mongoose.connect(MONGODB_URI);
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

/////////////////
// CONTROLLERS
const usersController = require('./controllers/usersController');
app.use('/users', usersController);
/////////////////

// Routes
app.get('/', (req, res) => {
  res.send('exquisite corpse');
});

// Listener
server.listen(PORT, () => console.log('Listening on port: ', PORT));
