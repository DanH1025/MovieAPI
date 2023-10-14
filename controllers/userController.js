require('dotenv').config()

var bcrypt = require("bcryptjs");
const user = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');




// register user 
const registerUser = async(req,res)=>{
   const {username , email , password } = req.body
   try {
    const exists = await user.findOne({email: email})
    if(exists){
      return res.status(409).json({
        message: 'User already exists'
      })
    }else{
      const uuid = uuidv4()
      const hashedPassword =  await bcrypt.hash(password, 8);
      const userSchema = new user({
        userName : username,
        email : email,
        password: hashedPassword,
        uuid: uuid
      })
      try {
         const reg = await userSchema.save()
         return res.status(200).json({
          message: 'Successfully created user',
          payload: reg
         })
      } catch (error) { 
          return res.status(500).json({
            message: 'Error saving user',
            error: error
          })
      }
    }   
   } catch (error) {
      //failed to create user schema 
      return res.status(400).json({
        message: 'Failed to create user',
        error: error
      })
   }
}

//user login
const login = async (req,res)=> {
  const {email, password} = req.body

  try {
      const exists = await user.findOne({email: email})
      if(exists){
        if(await bcrypt.compare(password, exists.password)){
          return res.status(200).json(exists)
        }else{
          return res.status(409).json({
            message: 'Failed to authenticate password'
          })
        }
      }else{
        return res.status(204).json({
          message: 'Email not found'
        })
      }
  } catch (error) {
    return res.status(400).json({
      message: 'Failed to login',
      error: error
    })
  }
}
 
//get all user
const getAllUsers = async(req,res)=>{
  try {
    const users = await user.find({})
    if(users?.length === 0){
      return res.status(404).json({
        message: 'No users found',
        error: error
      })
    }
    return res.status(200).json(users)
  } catch (error) {
    return res.status(502).json({
      message: 'Failed to get all users',
      error: error
    })
  }
}

// get user by mongo ID
const getUserById = async (req,res)=>{
    const id = req.params._id
    try {
       const users = await user.findOne({_id:id})
       if(!users){
         return res.status(404).json({
          messsage: 'User not found'
         })
       }
       return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error
      })
    }
}

// get user by UUID

const getUserByUUID = async (req,res)=>{
  const uuid = req.params.uuid
  try {
     const users = await user.findOne({uuid:uuid})
     if(!users){
       return res.status(404).json({
        messsage: 'User not found'
       })
     }
     return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error
    })
  }
}

//update username
const updateUserName = async (req, res)=>{
  const {uuid , username} = req.params
  try {
    const exists = await user.findOne({uuid: uuid})
    if(!exists){
      return res.status(404).json({
        message: 'User not found'
      })
    }
    try {
      const update = await user.updateOne({uuid: uuid}, {$set: {userName: username}})
      return res.status(200).json({
        message: 'Successfully updated user',
        payload: update
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error
    })
  }
}



module.exports ={
    registerUser,
    login,
    getAllUsers,
    getUserById,
    getUserByUUID,
    updateUserName
}