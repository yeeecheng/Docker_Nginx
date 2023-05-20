const farmController = require('../controllers/farmController')

const router = require('express').Router()
// const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addFarm', farmController.addFarm)
router.get('/allFarms', farmController.getAllFarms)
router.get('/email', farmController.sendEmailToFarmEveryday)

router.get('/:id', farmController.getOneFarm)
router.put('/:id', farmController.updateFarm)
router.delete('/:id', farmController.deleteFarm)

module.exports = router