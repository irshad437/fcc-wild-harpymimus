const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
require('./db')
var addNewUser = require('./helper').addNewUser
var getAllUsers = require('./helper').getAllUsers
var addExcercise = require('./helper').addExcercise
var getExcercises = require('./helper').getExcercises

// mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// POST /api/exercise/new-user
app.post('/api/exercise/new-user', function(req, res){
  addNewUser(req, res)
})

// Get all users
app.get('/api/exercise/users', function(req, res){
  getAllUsers(req, res)
})

// Add an excercise
app.post('/api/exercise/add', function(req, res){
  addExcercise(req, res)
})

// get user's excercises
app.get('/api/exercise/log', function(req, res){
  getExcercises(req, res)
})



// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})