import Msg from "../models/Message.js";
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'

const KEY_ID = "rzp_test_r9QcVPwqwQUWB9";
const KEY_SECRET = "BtLhTDalnBu9lUpSU4o2IuBZ";

const rzpy = new Razorpay({
    key_id : KEY_ID,
    key_secret : KEY_SECRET
});

let rzpyOrder = async(req, res)=>{
    let amount = req.body.amount;
    try{
        const order = await rzpy.orders.create({
            amount : amount*100,
            currency : 'INR'
        });
        
        res.send({success:true, orderId : order.id});
    }catch(err){
        console.log("***************", err);
    }
}


let saveMessage = async(req, res)=>{
    let token = req.body.seeker_token;
    let obj = jwt.decode(token, process.env.ENC_KEY);
    let amount = req.body.amount;
    let saveDataObj = {
        message : req.body.message,
        seeker_id : obj.id,
        owner_id : req.body.owner_id,
        property_id : req.body.property_id
    };
    
    // return;
    // await Msg.create(saveDataObj);

}

let getAllMsgByPropertyId = async(req, res)=>{
    let result = await Msg.find({property_id : req.params.pid}).populate("seeker_id").exec();
    res.send(result);
}

export {saveMessage, getAllMsgByPropertyId, rzpyOrder};