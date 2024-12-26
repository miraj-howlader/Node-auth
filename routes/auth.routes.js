
const express = require('express')
const { registerUser, loginUser,changePassword } = require('../controllers/auth.controller.js')


const router = express.Router()
const authmiddleware = require('../middleware/auth.middleware.js')
// all routes are related to user and authorization 
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/change-password',authmiddleware,changePassword)



module.exports = router