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
      res.json(err.message);
    } else {
      res.json(createdUser);
    }
  });
});

users.put('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.json('Oops, database error. Please try again');
    } else {
      if (!foundUser) {
        res.json('Username and password do not match. Please try again.');
      } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({ username: foundUser.username, room: foundUser.room });
      } else {
        res.json('Username and password do not match. Please try again.');
      }
    }
  });
});

users.delete('/:username', (req, res) => {
  const { username } = req.params;
  User.findOneAndDelete({ username: username }, (err, deletedUser) => {
    if (err) {
      res.json('Oops, database error. User not deleted.');
    } else {
      res.json(deletedUser);
    }
  });
});

users.put('/:username', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.json('Something went wrong');
      } else {
        res.json(updatedUser);
      }
    }
  );
});

module.exports = users;
