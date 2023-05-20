const noteController = require('../controllers/noteController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addNote', isAuthenticated, noteController.addNote)
router.get('/allNotes', isAuthenticated, noteController.getAllNotes)

router.get('/:id', noteController.getOneNote)
router.put('/:id', isAuthenticated, noteController.updateNote)
router.delete('/:id', isAuthenticated, noteController.deleteNote)

module.exports = router