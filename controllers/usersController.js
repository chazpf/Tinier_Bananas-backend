const express = require('express');
const bcrypt = require('bcrypt');
const users = express.Router();
const User = require('../models/users');

users.get('/new', (req, res) => {
  res.send('new user page');
});

module.exports = users;
