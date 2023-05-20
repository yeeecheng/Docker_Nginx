const blockController = require('../controllers/blockController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addBlock', isAuthenticated, blockController.addBlock)
router.get('/allBlocks', isAuthenticated, blockController.getAllBlocks)

router.get('/:id', isAuthenticated, blockController.getOneBlock)
router.put('/:id', isAuthenticated, blockController.updateBlock)
router.delete('/:id', isAuthenticated, blockController.deleteBlock)

module.exports = router