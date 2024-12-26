
const cloudinary = require('../config/cloudinary.js')


const uploadToCloudinary = async (filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath)
        return{
            url:result.secure_url,
            publicId:result.public_id
        }
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong.Please upload a different image')
    }
}

module.exports = {uploadToCloudinary}