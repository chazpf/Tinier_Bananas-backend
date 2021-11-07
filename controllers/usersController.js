const express = require('express');
const bcrypt = require('bcrypt');
const users = express.Router();
const User = require('../models/users.js');

users.get('/', (req, res) => {
  User.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  });
});

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
      res.json({
        username: createdUser.username,
        avatar: createdUser.avatar,
        id: createdUser._id,
      });
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
        res.json({
          username: foundUser.username,
          avatar: foundUser.avatar,
          id: foundUser._id,
        });
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
  User.findById(req.body.id, (err, foundUser) => {
    if (err) {
      res.json(err.message);
    } else {
      if (req.body.username !== '') {
        foundUser.username = req.body.username;
      }
      if (req.body.avatar !== '') {
        foundUser.avatar = req.body.avatar;
      }
      foundUser.markModified('username');
      foundUser.markModified('avatar');
      foundUser.save();
      res.json(foundUser);
    }
  });
});

users.get('/:username', (req, res) => {
  User.find({ username: req.params.username }, (err, foundUser) => {
    res.json(foundUser);
  });
});

module.exports = users;
