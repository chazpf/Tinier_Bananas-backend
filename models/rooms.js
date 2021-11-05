const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  members: [],
  gameInProgress: { type: Boolean, default: false },
  messages: [],
  currentTurn: String
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;
