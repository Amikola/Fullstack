const http = require('http')
const blogRouter = require('./controllers/blogs')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
mongoose.connect(config.MONGODB_URI)

app.use('/api/blogs', blogRouter)
app.use(cors())
app.use(express.json())



module.exports = app