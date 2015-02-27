var User = require('./userModel.js');
var Membership = require('../db/relationshipModel.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../jwtAuth.js');

module.exports = {
  parseUserUrl: function (req, res, next, userID) {
    User.find(userID).then(function (user) {
      if(!user) {
       res.status(404).send('No user with ID ' + userID + ' in database');
      } else {
        req.user = user;
        next();
      }
    });
  },

  // findUser: function (req, res, usernameOrEmail, callback) {
  //   User.findOne({where: {email: email}})
  //   .then(function (user) {
  //     if (!user) {
  //       res.status(404).send('No user with email ' + email + ' in database');
  //     } else {
  //       callback(user);
  //     }
  //   });
  // },

  signup: function (req, res, next) {
    // check to see if user already exists
    var username = req.body.username;
    var email = req.body.email
    User.find({ where:
      $or: [
        { email: email },
        { username: username }
      ]
    }).then(function(user) {
        if(user) {
            res.status(401).send('Username or email already exists in the DB');
        } else {
          var user = User.build(req.body);
            bcrypt.hash(user.password, null, null, function(err, hash) {
              user.password = hash;
              user.save()
                .complete(function(err){
                  if(err){
                    console.log('An error occurred while creating the user: ', err);
                    res.status(404).send('Error');
                  } else {
                    console.log('The user was successfully created.');
                    var token = jwt.createToken(user.username);
                    res.status(201).json({token: token});
                  }
                });
            });
        }
      })
      .catch(function (error) {
        next(error);
      });
  },

  signin: function(req, res) {
    User.find({ where:
      $or: [
        { email: req.body.usernameOrEmail },
        { username: req.body.usernameOrEmail }
      ]
    }).then(function(user){
        if(user){
          bcrypt.compare(req.body.password, user.password, function(err, result){
            if(result){
              // return jwt
              console.log('signed in!');
              var token = jwt.createToken(user.username);
              res.status(200).json({token: token});
            } else {
              console.log('Login incorrect');
              res.status(401).send('Login incorrect');
            }
          });
        } else {
          console.log('no account found with that username or email');
          res.status(401).send('No account found with that username or email');
        }
      })
  }

};
