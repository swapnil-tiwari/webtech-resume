const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

const loginUser = async (req, res) => {
    try {
      let user = await User.findOne({ "local.email": req.body.email });
      if (!user)
        return res
          .status(200)
          .json({ message: "user not registered", user: null });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.local.password
      );
      if (!validPassword)
        return res.status(200).json({ message: "invalid password", user: null });
  
      const token = user.generateAuthToken();
      res.header("x-auth-token", token);
      return res
        .status(200)
        .json({
          message: `login success and the token is: ${token}`,
          user: user
        });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "error while signing in", user: null });
    }
  };

  const createUser = async (req, res) => {
    try {
      let user = await User.findOne({ "local.email": req.body.email });
      if(user) return res.status(200).json({ message: 'user already exist', user: null });
  
      let newUser = new User({
        method: 'local',
        local: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
        }
      });
  
      const salt = await bcrypt.genSalt(10);
      newUser.local.password = await bcrypt.hash(newUser.local.password, salt);
      await newUser.save();
      return res.status(200).json({ message: 'user created successfully', newUser })
    }
    catch (err) {
      return res.status(400).json({ message: 'error while creating user', user: null })
  
    }
  }

  const googleOAuth = async (req,res) => {
    try{
      let user = await User.findOne({"google.email": req.body.email});
      if(user) return res.status(200).json({ message: 'user already exist', user: null });

      let newUser = new User({
        method: 'google',
        google: {
          googleID: req.body.id,
          firstname: req.body.name.givenName,
          lastname: req.body.name.familyName,
          email: req.body.email,
          image: req.body.image
        }
      });
      await newUser.save();
      return res.status(200).json({ message: 'user created successfully', newUser })
    }
    catch (err) {
      return res.status(400).json({ message: 'error while creating user', user: null })
  
    }
  }

  module.exports = { loginUser,createUser,googleOAuth }