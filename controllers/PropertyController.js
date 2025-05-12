import Prop from '../models/Property.js'
import jwt from 'jsonwebtoken'
import path from 'path'
let SaveProperty = async(req, res)=>{
    
    let photo = req.files.photo;
    req.body.image = photo.name;
    req.body.amenity = req.body.amenity.split(",");
    // red, green, blue   --- ["red", "green", "blue"]

    
    
    


    if(req.body.deposite==''){
        delete req.body.deposite;
    }
    if(req.body.amenity==''){
        req.body.amenity = [];
    }

    if(req.headers.authorization){
        let token = req.headers.authorization;
        let obj = jwt.decode(token, process.env.ENC_KEY);
        if(obj){
            let id = obj.id;
            req.body.owner_id = id;
            await photo.mv(path.resolve()+"/assets/upload_images/"+photo.name);
            await Prop.create(req.body);
            res.send({success:true});
        }else{
            res.send({success:false});
        }
    }
    else{
        res.send({success:false});
    }
}


let getAllProperty = async(req, res)=>{
    let result = await Prop.find();
    res.send(result);
}

let getAllPropertyByOwnerAdmin = async(req, res)=>{
    
    let ownerid = req.params.id;
    let result = await Prop.find({owner_id : ownerid});
    res.send(result);
}


let getAllPropertyByOwner = async(req, res)=>{
    if(req.headers.authorization)
    {
        let token = req.headers.authorization;
        let obj = jwt.decode(token, process.env.ENC_KEY);
        if(obj){
            let id = obj.id;
            let result = await Prop.find({owner_id : id});
            res.send(result);
        }else{
            res.send({success:false});
        }
    }
    else{
        res.send({success:false});
    }
}

let getAllPropertyWithOwner = async(req, res)=>{
    let result = await Prop.find().populate("owner_id").exec();
    res.send(result);
}

let getAllPropertyById = async(req, res)=>{
    let id = req.params.id;
    let result = await Prop.find({_id : id}).populate("owner_id").exec();
    res.send(result);
}

export {SaveProperty,getAllPropertyById, getAllPropertyByOwnerAdmin, getAllPropertyWithOwner, getAllProperty, getAllPropertyByOwner}
/*
    CLIENT       SERVER
*/