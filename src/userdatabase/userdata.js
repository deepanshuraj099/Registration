const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const users_schema1 = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    confirm_password:{
        type:String,
        required:true
    }
})

users_schema1.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    this.confirm_password = await bcrypt.hash(this.confirm_password, 12)

})

const users_collection1 = new mongoose.model('user_collection1', users_schema1)
module.exports = users_collection1;