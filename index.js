const connectToMongo =  require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// this is our routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/product' , require('./routes/product'))
app.use('/api/customer' , require('./routes/customer'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})