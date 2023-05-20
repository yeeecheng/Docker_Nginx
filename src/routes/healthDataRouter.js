const healthDataController = require('../controllers/healthDataController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addHealthData', isAuthenticated, healthDataController.addHealthData)
router.get('/allHealthDatas', isAuthenticated, healthDataController.getAllHealthDatas)

router.get('/:id', isAuthenticated, healthDataController.getOneHealthData)
router.put('/:id', isAuthenticated, healthDataController.updateHealthData)
router.delete('/:id', isAuthenticated, healthDataController.deleteHealthData)

module.exports = router