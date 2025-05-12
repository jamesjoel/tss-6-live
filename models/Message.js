import mongoose from '../config/conn.js'

let MsgSchema = mongoose.Schema({
    message : String,
    owner_id : { type : mongoose.Schema.Types.ObjectId, ref : 'owner' },
    seeker_id : {type : mongoose.Schema.Types.ObjectId, ref : 'seeker'},
    property_id : {type :mongoose.Schema.Types.ObjectId, ref : 'property'}
}, {timestamps : true});

let Msg = mongoose.model("message", MsgSchema);

export default Msg;