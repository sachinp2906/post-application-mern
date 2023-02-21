const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
app.use(express.json())
require('./models/user')
require('./models/post')
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


mongoose.connect('mongodb+srv://sachinfu:2906@sachinfu.fcpe6tc.mongodb.net/create-post-mern' , {
    useNewUrlParser : true
},mongoose.set('strictQuery', true))
.then(()=> {
    console.log("connected with db")
})
.catch(err => console.log(err))


app.listen(PORT , ()=> {
    console.log('backend running on port 3000')
})
