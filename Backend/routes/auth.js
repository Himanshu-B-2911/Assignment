var passport = require('passport');
var config = require('../config/setting');
require('../config/passport')(passport);
 
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Login = require("../models/login");

router.post('/register', function(req, res) {
  console.log(req.body,res.body)
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass full name, username and password.'});
  } else {
    var newLogin = new Login({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newLogin.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login', function(req, res) {
  console.log(req.body)
    Login.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.post('/logout', passport.authenticate('jwt', { session: false}), function(req, res) {
    req.logout();
    res.json({success: true});
  });
  

module.exports = router;