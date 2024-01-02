const http = require('http')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(cors())
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app