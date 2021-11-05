const express = require('express');
const bcrypt = require('bcrypt');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (req, res) => {
  res.send('new user page');
});

users.post('/new', (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
      res.json(err.message);
    } else {
      console.log('user is created', createdUser);
      res.json(createdUser);
    }
  });
});

users.put('/login', (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.json('Oops, database error. Please try again');
    } else {
      if (!foundUser) {
        res.json('Username and password do not match. Please try again.');
      } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({ username: foundUser.username });
      } else {
        res.json('Username and password do not match. Please try again.');
      }
    }
  });
});

module.exports = users;
