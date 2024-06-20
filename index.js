const express = require('express')
const app = express()

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
app.use(express.static(path.join(__dirname,'dist')))

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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/',(req,res)=>{
    res.send('<h1>Hello World¡</h1>')
}) 
/* app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
}); */

app.get('/api/notes',(req,res)=>{
    res.json(notes)
})

app.get('/api/notes/:id',(req,res)=>{
  const id = Number(req.params.id)
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, typeof id, note.id === id)
    return note.id === id
  })
  if(note){
    res.json(note)
  }else{

      res.statusMessage ='Page was not found'
      res.status(404).send('Page was not found').end()   
  }
})

app.delete('/api/notes/:id',(req,res) =>{
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.send('Note deleted')
  res.status(204).end()
})

const generateId = ()=>{
    const maxId = notes.length > 0 ? Math.max(...notes.map(n=> n.id)):0
    return maxId +1
    //notes.map(n => n.id) crea un nuevo array que contiene todos los ids de las notas. Math.max devuelve el valor máximo de los números que se le pasan. Sin embargo, notes.map(n => n.id) es un array, por lo que no se puede asignar directamente como parámetro a Math.max. El array se puede transformar en números individuales mediante el uso de la sintaxis de spread (tres puntos) ....
}
app.post('/api/notes',(req,res) =>{

  const body = req.body
  if(!body.content){
    return res.status(404).json({error:'content missing'})
  }
  const note = {
    content: body.content,
    important: Boolean(body.important)||false,
    id: generateId()
  }

  notes = notes.concat(note)
  res.json(notes)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

