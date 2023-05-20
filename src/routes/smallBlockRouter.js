const smallBlockController = require('../controllers/smallBlockController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addSmallBlock', isAuthenticated, smallBlockController.addSmallBlock)
router.get('/allSmallBlocks', isAuthenticated, smallBlockController.getAllSmallBlocks)

router.get('/:id', isAuthenticated, smallBlockController.getOneSmallBlock)
router.get('/new/:id', isAuthenticated, smallBlockController.getOneSmallBlockNewest)
router.get('/line/:id', isAuthenticated, smallBlockController.getOneSmallBlockNewestByLine)
router.put('/:id', isAuthenticated, smallBlockController.updateSmallBlock)
router.delete('/:id', isAuthenticated, smallBlockController.deleteSmallBlock)

module.exports = router