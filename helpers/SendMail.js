import nodemailer from 'nodemailer';
let transporter = nodemailer.createTransport({
    host : "smtp-relay.brevo.com",
    port : 587,
    secure : false,
    auth : {
        user : "870885002@smtp-brevo.com",
        pass : "QH8dFVscj19GwK7B"
    }
})


let SendMail = async(to, sub, msg)=>{
    let mailOpt = {
        from : "james.steppingstone@gmail.com",
        to : to,
        subject : sub,
        html : msg
    }

    await transporter.sendMail(mailOpt)
}


export default SendMail;

/*
let mailOpt = {
            from : "james.steppingstone@gmail.com",
            to : result[0].email,
            subject : "OTP for Reset Password",
            html : 
        }

        transporter.sendMail(mailOpt, async(err, info)=>{
            if(err){
                console.log("---------", err)
            }
            else{
               
            }
        })

*/