const logger = require('./logger')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

  //Error a través del middleware para endpoint desconocido
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  //Error a través del middleware para solicitudes que den error
const errorHandler = (error, req, res, next)=>{
    console.log(error.message)
    if(error.name === 'CastError'){
      return res.status(400).send({error:'Wrong Id'})
    }else if(error.name === 'ValidationError'){
      return res.status(400).json({error:error.message})
    }
    next(error)
  }

  module.exports = {
    requestLogger, unknownEndpoint, errorHandler
  }