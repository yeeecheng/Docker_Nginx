const humidityDataController = require('../controllers/humidityDataController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addHumidityData', isAuthenticated, humidityDataController.addHumidityData)
router.get('/allHumidityDatas', isAuthenticated, humidityDataController.getAllHumidityDatas)

router.get('/:id', isAuthenticated, humidityDataController.getOneHumidityData)
router.put('/:id', isAuthenticated, humidityDataController.updateHumidityData)
router.delete('/:id', isAuthenticated, humidityDataController.deleteHumidityData)

module.exports = router