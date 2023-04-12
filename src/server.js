const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const port = 8000
const users_collection1 = require('./userdatabase/userdata')
require('./userdatabase/mongoose_connection')
const app = express()
const bcrypt = require('bcryptjs')

app.use(bodyparser.urlencoded(
    {
    extended: true
    })
)

app.use(express.json())

let mainFolder = path.join(__dirname, "../");
app.use(express.static(mainFolder))

const hashedpassword = async (password)=>{
    const hashkey = await bcrypt.hash(password, 8)
    return hashkey
}

app.get('/', (req,res) => {
    res.sendFile(mainFolder+'home.html');
    console.log(__dirname)
})

app.get('/register', (req, res) =>{
    res.sendFile(mainFolder+"/register.html")
})

app.get('/login',(req,res)=>{
    res.sendFile(mainFolder+"/login.html")
})

app.post("/register", (req,res)=>{
    // console.log(req.body.fullname);
    let req_userdata = new users_collection1(req.body);
    // console.log(req_userdata);

    if(req_userdata.password == req_userdata.confirm_password){
        req_userdata.save()
        res.send('Registrated Successfully')
    }
    else {
        res.send("Passwords do not Match")
    }
    
})

app.post("/login", async(req,res)=>{
    let usermail = req.body.email
    let userpassword = req.body.password

    // console.log(usermail)
    // console.log(userpassword)
    // let mykey_password = await hashedpassword(userpassword)
    // console.log(mykey_password)

    let req_userdata = await users_collection1.findOne({email:usermail});
    if(req_userdata != null){
        const bcrypt_password_match = await bcrypt.compare(userpassword, req_userdata.password)
        console.log(bcrypt_password_match)
        if(bcrypt_password_match == ture) {
            res.send('Successfully Logged In')
        }
        else {
            res.send('Incorrect Password')
        }
    }
    else {
        res.send("Email does'nt exist")
    }
})

app.listen(port, ()=> {
    console.log(port + 'listen on port ${port}')
})