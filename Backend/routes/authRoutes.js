const express = require('express')
const {registerController, 
    loginController,
    getAllUsers,
    getUserProfile,
    updateUserProfile

} = require('../controllers/authController')
const {isAdmin, requireSignIn } = require('../middlewares/authMiddleware')

const router = express.Router()

//POST REGISTER
router.post('/register', registerController)

//POST LOGIN
router.post('/login',loginController)

//GET ALL USERS
router.get('/getUsers', requireSignIn, isAdmin, getAllUsers)

//USER PROFILE
router.get('/user/:id',requireSignIn, getUserProfile);

//UPDATE USER PROFILE
router.put('/updateuser/:id',requireSignIn, updateUserProfile)

module.exports = router