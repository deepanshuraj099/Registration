const mongoose = require('mongoose')
const user_collection1 = require('./userdata')
mongoose.connect('mongodb://127.0.0.1:27017/myuserdata')
.then(()=>{console.log('Mongoose Connection successful')})
.catch((err)=> {console.log(err)})