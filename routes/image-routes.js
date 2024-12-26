
const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const adminMiddleware = require('../middleware/admin.middleware.js')
const uploadMiddleware = require('../middleware/upload-middleware.js')
const {uploadImage,fetchImageController,deleteImageController} = require('../controllers/Image-controller.js')



const router = express.Router()

// upload the image 
router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImage)


// to get all the images 
router.get('/get',authMiddleware,fetchImageController)

// delete image route
//676bca3ea89f3f3428cc7758
router.delete('/:id',authMiddleware,adminMiddleware,deleteImageController)

module.exports = router