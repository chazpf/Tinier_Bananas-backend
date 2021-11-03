const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const db = mongoose.connection;
mongoose.connect(MONGODB_URI);

app.use(express.json());
app.use(cors());

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

app.get('/', (req, res) => {
  res.send('exquisite corpse');
});

app.listen(PORT, () => console.log('Listening on port: ', PORT));
