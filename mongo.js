const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('give password as argumen');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://patrickvValdivia:BPOFBhg8rllrtZiD@clusterpat.suoywpo.mongodb.net/noteApp?retryWrites=true&w=majority&appName=ClusterPat`

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