const jwt = require('jsonwebtoken')


const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    console.log(authHeader)

    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(404).json({
            success:false,
            message:'You are not Unauthentication'
        })
    }

    // decode this token 
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decodedTokenInfo)
        req.userInfo = decodedTokenInfo;
      next()

    } catch (error) {
        return res.status(404).json({
            success:false,
            message:'You are not Unauthentication'
        })
    }
    

    
}


module.exports = authMiddleware