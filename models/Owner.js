import mongoose from '../config/conn.js'

let OwnerSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    address : String,
    contact : String,
    status : { type : Number, default : 1 },
}, {timestamps:true})

let Owner = mongoose.model("owner", OwnerSchema);

export default Owner;