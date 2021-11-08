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

users.put('update/:username', (req, res) => {
  User.findByIdAndUpdate(
    req.body.id,
    { $set: { username: req.body.username, avatar: req.body.avatar } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          username: updatedUser.username,
          avatar: updatedUser.avatar,
          id: updatedUser._id,
        });
      }
    }
  );
});

users.get('/:username', (req, res) => {
  User.find({ username: req.params.username }, (err, foundUser) => {
    res.json(foundUser);
  });
});

module.exports = users;
