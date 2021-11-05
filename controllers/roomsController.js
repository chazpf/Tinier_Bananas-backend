const express = require('express');
const rooms = express.Router();
const Room = require('../models/rooms.js');

rooms.post('/new', (req, res) => {
  Room.create(req.body, (err, createdRoom) => {
    if(err){
      res.json(err.message);
    } else {
      res.json(createdRoom);
    }
  });
});

rooms.put('/join')

module.exports = room;
