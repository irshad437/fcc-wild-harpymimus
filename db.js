const mongoose = require('mongoose')

mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track', { useNewUrlParser: true })
.then(con => {
  console.log('DB connected...')
})
.catch(err => {
  console.log('DB connection error: ' + err)
  process.exit(0)
})