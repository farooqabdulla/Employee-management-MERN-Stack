const mongoose = require('mongoose')

const dburl = 'mongodb+srv://farooqabdulla15:test123@cluster0.oxtxuhk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dburl)

let userSchema = mongoose.Schema({
    first_name : String,
    last_name : String,
    email : String,
    gender : String,
    avatar : String,
    domain : String,
    available : String
})

module.exports = mongoose.model('userModel',userSchema)