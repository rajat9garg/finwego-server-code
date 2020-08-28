const express = require("express");
const Router = express.Router();
const { to } = require("../handlers/async.handler");
const {User} = require("../database")
const { sendError, sendSuccess } = require("../handlers/response.handler");

const user = async (req, res, next) => {
  req.checkBody("name", "Name not found in the request", 404).notEmpty();
  req.checkBody("Email", "Email not found in the request", 404).notEmpty();
  req.checkBody("ph_no", "Phone not found in the request", 404).notEmpty();

  if (req.validationErrors()) {
    return sendError(res, req.validationErrors(), HTTP_CODES.NOT_FOUND);
  }

  let name = req.body.name
  let email = req.body.email
  let phone = req.body.ph_no

  let user, userError;

  [user, userError] = await to(userModel.find({ phone: phone }));

  if(userError) return sendError(res,{err,userError},422)
  
  if(user){
      return sendError(res,{message : "User already exist"},204)
  }

  let userModel = new User({
      name : name,
      phone : phone,
      email : email
  })

  let userInsert,userInsertError;

  [userInsert,userInsertError]  = await to(User.save())

  if(userInsertError) return sendError(res, err, 422);

  return sendSuccess( res,
    { msg: "User Added"},
    200)

};

module.exports.user = user;
