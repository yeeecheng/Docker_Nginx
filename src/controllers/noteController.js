const db = require('../models')
const Note = db.notes

// main work

// 1. create note

const addNote = async (req, res) => {
    let info = {
        title: req.body.title,
        comment: req.body.comment,
        icon: req.body.icon,
        smallBlockId: req.body.smallBlockId,
        farmId: req.body.farmId,
        sensorId: req.body.sensorId,
    }
    try{
        var note = await Note.create(info)
        res.status(200).send(note)
    }catch(err){
        res.status(400).send()
        console.log(err)
    }
}

// 2. get all notes

const getAllNotes = async (req, res) => {
    try{
        let notes = await Note.findAll({})
        res.status(200).send(notes)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single note by id

const getOneNote = async (req, res) => {
    try{
        let id = req.params.id
        let note = await Note.findByPk(id, { 
            include: {
                model: db.smallBlocks,
                as: "smallBlock",
                include: {
                    model: db.blocks,
                    as: "block",
                }
            },
        })
        res.status(200).send(note)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update note by id

const updateNote = async (req, res) => {
    try{
        let id = req.params.id
        let note = await Note.update(req.body, {where: { id: id }})
        res.status(200).send(note)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete note by id

const deleteNote = async (req, res) => {
    try{
        let id = req.params.id
        await Note.destroy({where: { id: id }})
        res.status(200).send('Note is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    addNote,
    getAllNotes,
    getOneNote,
    updateNote,
    deleteNote
}