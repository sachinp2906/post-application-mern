const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const postUser = require('../models/post')

router.post('/createpost' , requireLogin.verify, async (req , res)=> {
   const {title , body} = req.body
      if(!title || !body) return res.status(400).send({status : false , message : "all fields are required"})
      
      else{
        req.user.password = undefined
        const post = {
            title : title,
            body : body,
            postedBy : req.user
        }
        const createPost = await postUser.create(post)
        return res.status(201).send(createPost)
    }
})


// through this we can access all the post of every user
router.get('/allpost' , (req ,res)=> {
     postUser.find()
     .populate("postedBy" ,"_id name")
     .then(posts => {
        return res.status(200).send({posts})
     })
     .catch(err=>{
        console.log(err)
     })
} )

// through this we can access the post of only that user who is logged in
router.get('/mypost' , requireLogin.verify ,(req ,res)=>{
   postUser.find({postedBy:req.user._id})
   .populate("postedBy" , "_id name")
   .then(mypost=>{
      res.status(200).send({mypost})
   })
   .catch(err=>{
      console.log(err)
   })
})

module.exports = router