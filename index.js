const connectToMongo =  require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

app.use(express.json())

// this is our routes
app.use('/api/auth' , require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})