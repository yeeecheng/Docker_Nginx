const userController = require('../controllers/userController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/token', userController.refreshToken)

router.post('/addUser', userController.addUser)
router.get('/allUsers', isAuthenticated, userController.getAllUsers)

router.get('/:id', isAuthenticated, userController.getOneUser)
router.put('/:id', isAuthenticated, userController.updateUser)
router.delete('/:id', isAuthenticated, userController.deleteUser)

router.get('/line/:lineId', userController.getOneUserByLineId)


module.exports = router