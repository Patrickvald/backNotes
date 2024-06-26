const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength:5,
        required: true
    },
    important: Boolean,
})

noteSchema.set('toJSON',{
    //Eliminamos __v y editamos el id para volverlo un String y no un objeto, además de quitarle el _
    transform:(document, returnedObject)=>{
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Note', noteSchema)
