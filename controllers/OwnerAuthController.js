import Owner from "../models/Owner.js";
import sha1 from 'sha1'
import jwt from 'jsonwebtoken'

let OwnerAuth = async(req, res)=>{
    let {email, password} = req.body;
    let result = await Owner.find({email : email}); // array
    if(result.length == 1)
    {
        if(result[0].password == sha1(password))
        {
            if(result[0].status==1){

                let obj = { id : result[0]._id };
                let token = jwt.sign(obj, process.env.ENC_KEY);            
                res.send({success:true, token:token, name:result[0].name});
            }else{

                res.send({success:false, errType : 3});
            }
        }
        else{
            res.send({success:false, errType : 2});
        }
    }
    else{
        res.send({success:false, errType : 1});
    }
}

export {OwnerAuth}