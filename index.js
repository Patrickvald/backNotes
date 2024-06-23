const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const PORT = process.env.PORT || process.env.LOCALPORT
const Note = require('./models/note')

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}



app.get('/',(req,res)=>{
  res.send('<h1>Hello World¡</h1>')
})  

app.get('/api/notes',(req,res)=>{
  Note.find({}).then(notes =>{
    res.json(notes)
  })
})

app.get('/api/notes/:id',(req,res)=>{
  Note.findById(req.params.id).then(note =>{
    res.json(note)
  })
})

app.delete('/api/notes/:id',(req,res) =>{
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.send('Note deleted')
  res.status(204).end()
})

app.post('/api/notes',(req,res) =>{

  const body = req.body
  if(body.content === undefined){
    return res.status(404).json({error:'content missing'})
  }
  const note = new Note ({
    content: body.content,
    important: body.important||false
  })

  note.save().then(savedNote =>{
    res.json(savedNote)
  })
})

app.use(unknownEndpoint)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

