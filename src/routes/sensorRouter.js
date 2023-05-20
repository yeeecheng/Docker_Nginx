const sensorController = require('../controllers/sensorController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addSensor', sensorController.addSensor)
router.get('/allSensors', sensorController.getAllSensors)

router.get('/:id', sensorController.getOneSensor)
router.put('/:id', isAuthenticated, sensorController.updateSensor)
router.delete('/:id', isAuthenticated, sensorController.deleteSensor)

module.exports = router