var User = require('./models').User
var Excercise = require('./models').Excercise

exports.addNewUser = function(req, res){
  let username = req.body.username
  if(!username){
    res.json({status: 'error', message: 'Please specify username'})
  }
  let newUser = new User({username: username})
  newUser.save()
  .then(data => {
    // username and _id
    res.json(data)
  })
  .catch(err => {
    if(err.code === 11000){
      res.json({status: 'error', message: 'Username already exists'})
    }
    res.json({status: 'error', message: err.message})
  })
}

exports.getAllUsers = function(req, res){
  User.find({})
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json({status: 'error', message: 'Please specify username'})
  })
}

exports.addExcercise = function(req, res){
  let userId = req.body.userId
  let duration = req.body.duration
  let description = req.body.description
  let date = req.body.date
  if(!userId || !duration || !description){
    res.json({status: 'error', message: 'Please specify required fields'})
  }
  let newExcercise = new Excercise({
    userId: userId,
    duration: duration,
    description: description,
    date: date || new Date()
  })
  newExcercise.save()
  .then(data => {
    // username and _id
    res.json(data)
  })
  .catch(err => {
    res.json({status: 'error', message: 'Please specify username'})
  })
}

// GET users's exercise log: GET /api/exercise/log?{userId}[&from][&to][&limit]
exports.getExcercises = function(req, res){
  var returnData = {};
  let userId = req.query.userId
  if(!userId){
    res.json({status: 'error', message: 'Please specify username'})
  }
  User.findOne({_id: userId})
  .then(userData => {
    returnData.username = userData.username
    returnData._id = userData._id
    
    let userToFind = {
      userId: userId
    }
    if(req.query.from && req.query.to){
      userToFind.from = {"$gte": new Date(req.query.from), "$lt": new Date(req.query.to)}
    }
    
    let limit = 100
    if(req.query.limit){
      let limit = req.query.limit
    }
    Excercise.find(userToFind)
    .limit(limit)
    .then(userExcercises => {
      returnData.count = userExcercises.length
      returnData.log = userExcercises
      res.json(returnData)
    })
  })
  .catch(err => {
    res.json({status: 'error', message: 'Please valid specify username'})
  })
}