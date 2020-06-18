const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
    method: {
      type: String,
      enum: ['local','google'],
      required: true
    },
    local: {
      email:{
        type:String,
        lowercase: true
      },
      firstname:{
        type: String
      },
      lastname:{
        type: String
      },
      password:{
        type:String
      }
    },
    google: {
      googleID:{
        type:String
      },
      email:{
        type:String,
        lowercase: true
      },
      firstname:{
        type:String
      },
      lastname:{
        type:String
      },
      image:{
        type:String
      }
    }
});

UserSchema.methods.generateAuthToken = function() {
  if(this.method === 'google'){
    const token = jwt.sign(
      {
        _id: this._id,
        googleID: this.googleID,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
      },
      'secret'
    );
    return token;
  }
};

// Create collection and add schema
module.exports = users = mongoose.model("users",UserSchema);