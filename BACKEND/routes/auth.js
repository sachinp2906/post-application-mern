const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')


router.post('/signup' ,async (req ,res)=> {
    try{
    let {name , email , password} = req.body
    if(!email || !name || !password) return res.status(400).send("all the fields are required")
    const hashPassword = bcrypt.hashSync(password , 10)
    let findEmail = await userModel.findOne({email : email})
    if(findEmail) {
        return res.status(400).send({status : false , message : "user already exist"})
    }
    else{
        let createUser = await userModel.create({name :name , email : email , password : hashPassword})
        return res.status(201).send({status : true , message : "user succesfully created" , data : createUser})
    }
    }catch(err) {
        return res.status(500).send({status : false , message : err.message})
    }
})

router.post('/signin' ,async (req ,res) => {
    try{
  const {email , password} = req.body
  if(!email || !password) return res.send({status : false , message : "both mail and password is required"})
  const findUser = await userModel.findOne({email : email})
  if(!findUser) return res.status(404).send({status : false , message : "no user found"})
  const decodePassword = await bcrypt.compare(password , findUser.password)
  if(!decodePassword) return res.status(400).send({status : false , message : "incorrect password"})
  else{
    const token = jwt.sign({_id : findUser._id} , 'secret-key' , {expiresIn : "24h"})
    return res.status(200).send({status : true , message : "user login succesfully" , data : token})
  }
}
catch(err) {
    return res.status(500).send({status : false , message : err.message})
}
})

module.exports = router