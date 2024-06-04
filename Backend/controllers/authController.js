const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

const registerController = async (req,res) => {
  try {

      const {name, email, password, contact, city, sport} = req.body

      // validation
      if(!name || !email || !password || !contact || !city || !sport){
          return res.send({
              message: 'All fields must be filled'
          })
      }

      if(!validator.isEmail(email)){
          return res.send({
              message: 'Email is not valid'
          })
      }

      
  const minLength = 6;
  const hasUpperCase = true;
  const hasLowerCase = true;
  const hasNumber = true;
  const hasSpecialCharacter = true;

  //password validation
  const isValidPassword = validator.isStrongPassword(password, {
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers: hasNumber,
    hasSymbols: hasSpecialCharacter,
  });

  if (!isValidPassword) {
    return res.send({
      message:
        "Password is not strong include uppercase, lowercase and characters",
    });
  }
      //existing user
      const existingUser = await userModel.findOne({email: email})

      if(existingUser){
          return res.status(200).send({
              success: false,
              message: 'Already Registered please login',
          })
      }
      //register user
      const hashedPassword = await hashPassword(password)

      //save
      const user = await new userModel({name, email, contact, city, password: hashedPassword, sport}).save()

      res.status(201).send({
          success: true,
          message: "User Registered successfully",
          user
      })
  } catch (error) { 
      console.log(error)
      res.status().send({
          success: false,
          message:'Error in Registration',
          error
      })
  }
}

//POST LOGIN
const loginController = async (req, res) => {
    try {
      const {email, password} = req.body
  
      if(!email || !password){
          return res.status(404).send({
              success: false,
              message: 'Invalid email or password'
          })
      }
      //check user
      const user = await userModel.findOne({email})
  
      if(!user){
          return res.status(404).send({
              success: false,
              message: 'Email is not registered'
          })
      }
      const match = await comparePassword(password, user.password)
  
      if(!match){
          return res.status(200).send({
              success: false,
              message: 'Invalid Password'
          })
      }
  
      const token = await jwt.sign({_id: user._id},process.env.JWT_SECRET,{
          expiresIn: "7d",
      })
      res.status(200).send({
          success: true,
          message: 'login successfully',
          user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              contact: user.contact,
              city: user.city,
              sport: user.sport,
              role: user.role
          },
          token,
      })
  } catch (error) {
      console.log(error)
      res.status(500).send({
          success: false,
          message:'Error in Login',
          error
      })
  }
      
  };
  
  const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting users',
            error
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        } 
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting user profile',
            error
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, contact, city, sport } = req.body;
        const user = await userModel.findByIdAndUpdate(id, { name, email, contact, city, sport }, { new: true });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating user profile',
            error
        });
    }
};

module.exports = {
    registerController,
    loginController,
    getAllUsers,
    getUserProfile,
    updateUserProfile
  };