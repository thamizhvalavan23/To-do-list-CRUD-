import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModels from '../database/user.js';
import Transport from './Nodemail.js';

// user Register API with welcome message using nodemailer

export const Register = async (req, res) => {

    const { name, email, password, country } = req.body;

    if (!name || !email || !password || !country) {
        res.send({ success: false, message: "Some details missing." })
    }

    try {

        // email validator

        if (!validator.isEmail(email)) {

            res.send({ success: false, message: "invalid email." })

        }
        // hasing password
        const salt = await bcrypt.genSalt(10)

        const hasinghpassword = await bcrypt.hash(password, salt);

        const alreadyRegister = await userModels.findOne({email});

        // check the email is already register

        if (alreadyRegister) {

            res.send({ success: false, message: "email already register." })

        } else {
            const users = { name, email, password: hasinghpassword, country };

            const user = new userModels(users);

            await user.save();
            const token = jwt.sign({id:user._id}, process.env.SEC_RET)
            res.send({ success: true, message: "Register successfully.", token })



        }

        // sending welcome message using nodemailer

        const mailoption = {
            from: "thamizhvalavan21@gmail.com",
            to: email,
            subject: "Welcome on board",
            text: "Thank you for Register. Now you can create your task."
        }

        Transport.sendMail(mailoption, (error, info) => {
            if (error) {
                return console.log("Error: ", error);
            }
            console.log("Email sent: ", info.response);
        });

        // jwt token genarator


       
        console.log({ email, mailoption });



    } catch (error) {

        res.send({ success: false, message: "User register error." })
        console.log(error);

    }

}

// auth user 

export const userAuth = async (req, res, next) => {

    try {

        const { token } = req.headers;

        if (!token) {
           return res.send({ success: false, message: "Token not available." })
        }

        const tokendecode = jwt.verify(token, process.env.SEC_RET)

        req.userId = tokendecode.id;
        console.log(req.userId);
        
        next()

    } catch (error) {
       return res.send({ success: false, message: "error." })
        console.log(error);


    }

}


// user Login

export const Login = async (req, res) => {

    const { email, password , userId} = req.body;

    try {

        const useEmail = await userModels.findOne({ email });

        if (!useEmail) {
          return  res.send({ success: false, message: "invalid email." })
        }

        const comparePass = await bcrypt.compare(password, useEmail.password)

        if (!comparePass) {
            return res.send({success:false , message: "Invalid email or password" });
        }

        const token = jwt.sign({ id:useEmail._id}, process.env.SEC_RET)

        return res.send({success:true , message: "Login successfully." , userid:req.userId , token})

    } catch (error) {


        console.log(error);
       return res.send({ success: false, message: "Login error." })

    }

}

// fetching userData from userId

export const UserDetails = async(req , res)=> {

    
    try {
        const userId = req.userId;

        const Useinfo = await userModels.findById(userId).select('-password');

        if (!Useinfo) {
             return res.send({success:false , message : "user not availabe"})
            
        }

        const token = jwt.sign({id : Useinfo._id} , process.env.SEC_RET)

        return res.send({success:true , message:"user Found." , Useinfo})
        
    } catch (error) {

        console.log(error);
       return res.send({ success: false, message: "Data Fetch error." })

        
    }
}