const temperatureDataController = require('../controllers/temperatureDataController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addTemperatureData', isAuthenticated, temperatureDataController.addTemperatureData)
router.get('/allTemperatureDatas', isAuthenticated, temperatureDataController.getAllTemperatureDatas)

router.get('/:id', isAuthenticated, temperatureDataController.getOneTemperatureData)
router.put('/:id', isAuthenticated, temperatureDataController.updateTemperatureData)
router.delete('/:id', isAuthenticated, temperatureDataController.deleteTemperatureData)

module.exports = router