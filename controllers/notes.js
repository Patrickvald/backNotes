const notesRouter = require('express').Router()
const Note = require('../models/note')
  
  notesRouter.get('/', async(req,res)=>{
    const notes = await Note.find({})
      res.json(notes)
  })
  
  notesRouter.get('/:id', async(req,res, next)=>{
      const note = await Note.findById(req.params.id)
      if(note){
        res.json(note)
      }else{
        res.status(404).end()
      }
 /*    Note.findById(req.params.id).then(note =>{
      if(note){
        res.json(note)
      }else{
        res.status(404).end()
      }
    }).catch(error =>next(error)) */
  })
  
  notesRouter.delete('/:id', async(req,res,next) =>{
    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
  })
  
  notesRouter.post('/', async(req,res, next) =>{
  
    const body = req.body
    const note = new Note ({
      content: body.content,
      important: body.important||false
    })
      const savedNote = await note.save()
      res.status(201).json(savedNote)
  })
  
  notesRouter.put('/:id',(req,res,next)=>{
    const body = req.body
    const note = {
      content: body.content,
      important: body.important
    }
    Note.findByIdAndUpdate(req.params.id, note,{new:true, runValidators: true, context:'query'})
      .then(updatedNote =>{
        res.json(updatedNote)
      }).catch(error => next(error))
  })

module.exports = notesRouter