const mongoose = require('mongoose') 

mongoose.set('strictQuery',false)

const url = process.env.MONGO_URI

console.log('Connectin to: ', url);

mongoose.connect(url)
    .then(result =>{
        console.log('Connected to MongoDB');
    }).catch(error => {
        console.log('There was an error: ', error.message);       
    })

const noteSchema = new mongoose.Schema({
    content: String,
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
