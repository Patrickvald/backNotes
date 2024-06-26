const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose') 

mongoose.set('strictQuery',false)

logger.info('Connectin to: ', config.MONGO_URI);

mongoose.connect(config.MONGO_URI)
    .then( () =>{
        logger.info('Connected to MongoDB');
    }).catch(error => {
        logger.error('There was an error: ', error.message);       
    })



app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)


app.use(middleware.unknownEndpoint) 
app.use(middleware.errorHandler)

module.exports = app