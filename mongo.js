const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
if(process.argv.length<3){
    console.log('give password as argumen');
    process.exit(1)
}

const password = process.argv[2]

const url = MONGO_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */

Note.find({/*important:true si quiesesmos filtrar*/}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })