
const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// register user 
const registerUser = async (req,res) =>{
    try {
        const {username,email,password,role} = req.body;
        // if the user is already existis in our database
        const ExistingUser = await User.findOne({$or:[{username},{email}]})
        if(ExistingUser){
            return res.status(400).json({
                success:false,
                message:'User is already exists! Please try a different email'
            })
        }
        // hash user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // create a new user and save in our database 
        const newUser = new User({username,email,password:hashedPassword,role:role || 'user'})
        await newUser.save()

        if(newUser){
            res.status(201).json({
                success:true,
                message:"User created successfully"
            })
        }else{
            res.status(404).json({
                success:false,
                message:"Unable to register user! Please try again"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Something went wrong! Please try again'
        })
    }
}

// login User 
const loginUser = async (req,res) =>{
    try {
        const {username,password} = req.body

        //find if the current user is exists in database or not
        const user  = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                success:false,
                message:'Invalid username '
            })
        }
        // if the password is correct or not 
        const isPasswordMatch = await bcrypt.compare(password, user.password)
    
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message: 'Invalid password'
            })
        }

        // create a user token 
        const accessToken = jwt.sign({
            userId:user._id,
            username:user.username,
            role:user.role
        }, process.env.JWT_SECRET_KEY,{
            expiresIn:'20m'
        })
    
        res.status(200).json({
            success:true,
            message:'Logged in successfully',
            accessToken
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again"
        })
    }
}

const changePassword = async (req,res)=>{
    try {
        const userId = req.userInfo.userId;

        // extract old and new password 
        const {oldPassword,newPassword} = req.body;

        // find the current logged in user 
        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        }
        // check if the old password is correct 
        const isPasswordMatch = await bcrypt.compare(oldPassword,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Old password is not correct! Please try again"
            })
        }

        // hash the new password here 
        const salt = await bcrypt.genSalt(10);
        const newhashedPassword = await bcrypt.hash(newPassword,salt);

        // update user password 
        user.password = newhashedPassword;
        await user.save()

        res.status(200).json({
            success:true,
            message:'Password changed successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong. Please try again"
        })
    }
}

module.exports = {registerUser,loginUser,changePassword}