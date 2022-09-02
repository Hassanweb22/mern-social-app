const express = require('express')
const app = express()
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

app.use(cors())
// init bodyparser
app.use(express.json())

app.get('/', (req, res) => res.send('API Running...'))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at Port ${PORT}`))