import Seeker from '../models/Seeker.js'
import jwt from 'jsonwebtoken'
import sha1 from 'sha1'

import rand from 'string-random'
import SendMail from '../helpers/SendMail.js'


let SeekerProfile = async(req, res)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization;
        let obj = jwt.decode(token, process.env.ENC_KEY);
        if(obj){
            let result = await Seeker.find({_id : obj.id});
            res.send(result);
        }else{
            res.send({success:false});
        }
    }
    else{
        res.send({success:false});
    }
}

let EditSeekerProfile = async(req, res)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization;
        let obj = jwt.decode(token, process.env.ENC_KEY);
        if(obj){
            let id = obj.id;
            let result = await Seeker.updateMany({_id : id}, req.body);
            res.send({success:true});
        }else{
            res.send({success:false});
        }
    }
    else{
        res.send({success:false});
    }
}

const updatePass = async(req, res)=>{
    if(req.headers.authorization){

        let token = req.headers.authorization;
        let obj = jwt.decode(token, process.env.ENC_KEY);
        if(obj){
            let id = obj.id;
            let result = await Seeker.find({_id : id });
            if(result[0].password == sha1(req.body.password)){
                await Seeker.updateMany({_id : id}, {password : sha1(req.body.newpass)});
                res.send({success:true, errType : 1})

            }else{
                res.send({success:false, errType : 1})
            }
        }else{

        }

    }else{
        res.send({success:false});
    }
}

let getOtp = async(req, res)=>{
    let username = req.body.username;
    let result = await Seeker.find({email:username});
    
    if(result.length == 1){
        
        let otp = rand(6, {letters: false});
        await SendMail(result[0].email, 'OTP for Reset Password', `<div style="width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd;">
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee;">
      <h1 style="color : #005555; font-weight : 'bold'; text-shadow: 2px 2px 2px #000;">Study-Hive</h1>
      <h2>OTP Verification</h2>
    </div>
    <div style="padding: 20px;">
      <p>Hi,</p>
      <p>To verify your account, please use the following One-Time Password ${otp}</p>
      <div style="text-align: center; font-size: 24px; font-weight: bold;">
        
        ${otp}
      </div>
      <p>This OTP is valid for 5 minutes. If you did not request this verification, please ignore this email.</p>
      <p>Thank you,</p>
      <p>The Study-Hive Team</p>
    </div>
    <div style="text-align: center; font-size: 0.8em; color: #777; padding-top: 20px;">
      &copy; 2025 Your Company. All rights reserved.
    </div>`);
    await Seeker.updateMany({_id : result[0]._id} , {otp : otp})
    res.send({success:true});

    }else{
        res.send({success:false});
    }
}

let checkOtp = async(req, res)=>{
    let otp = req.body.otp;
    let result = await Seeker.find({otp:otp});
    if(result.length==1){

        res.send({success:true, userid : result[0]._id, email : result[0].email});
    }
    else{
        res.send({success:false});
    }
}

let changePass = async(req, res)=>{
    // console.log(req.body);
    let id = req.body.userid;
    await Seeker.updateMany({_id : id }, {password : sha1(req.body.password)});
    res.send({success:true});
}

export {SeekerProfile,getOtp, EditSeekerProfile, updatePass, checkOtp, changePass}