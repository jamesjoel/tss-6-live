import mongoose from '../config/conn.js'

let AdminSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String
})

let Admin = mongoose.model("admin", AdminSchema);

export default Admin;