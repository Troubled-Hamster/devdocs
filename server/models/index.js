var Sequelize = require('sequelize');
var db = require('../db.js');

//set up the models
var User = require('./user.js');
var Question = require('./question.js');
var Answer = require('./answer.js');
var Example = require('./example.js');
var DocSet = require('./docSet.js');
var DocElement = require('./docElement.js');

//set up join tables
// var UserAnswerVotes = require('./userAnswerVotes.js');
// var UserQuestionVotes = require('./userQuestionVotes.js');
// var UserExampleVotes = require('./userExampleVotes.js');

// sync everything up with the DB
DocSet.sync().then(function() {
  return DocElement.sync();
}).then(function() {
  return User.sync();
}).then(function() {
  return Question.sync();
}).then(function() {
  return Answer.sync();
}).then(function() {
  return Example.sync();
})

// .then(function(){
//   return UserAnswerVotes.sync(); 
// }).then(function() {
//   return UserExampleVotes.sync();
// }).then(function() {
//   return UserQuestionVotes.sync();
// });

//define relationships
Answer.belongsTo(User);
Answer.belongsTo(Question);

DocElement.hasMany(Question);
DocElement.hasMany(Example);

// DocSet.hasMany(DocElement);

User.hasMany(Answer);
User.hasMany(Example);
// User.hasMany(Tips);
// User.hasMany(Feedback);

Question.belongsTo(User);
User.hasMany(Question);

Question.hasMany(Answer);

Example.belongsTo(User);

//sync everything up with the DB
DocSet.sync().then(function() {
  return DocElement.sync();
}).then(function() {
  return User.sync();
}).then(function() {
  return Question.sync();  
}).then(function() {
  return Answer.sync();
}).then(function() {
  return Example.sync();
})

// .then(function(){
//   return UserAnswerVotes.sync();  
// }).then(function() {
//   return UserExampleVotes.sync();  
// }).then(function() {
//   return UserQuestionVotes.sync();
// });

module.exports = db;
