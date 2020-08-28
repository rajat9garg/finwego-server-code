const mongoose = require("mongoose");
const validate = require("mongoose-validator");

let UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: {
      type: String,
      lowercase: true,
      validate: [
        validate({
          validator: "isNumeric",
          arguments: [7, 20],
          message: "Not a valid phone number."
        })
      ]
    },
    email: {
      type: String,
      lowercase: true,
      validate: [
        validate({
          validator: "isEmail",
          message: "Not a valid email."
        })
      ]
    }
  });


let User = module.exports = mongoose.model("User",userSchema)