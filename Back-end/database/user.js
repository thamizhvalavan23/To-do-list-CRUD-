import mongoose from "mongoose";

const userScheema = new mongoose.Schema({

    name:{type:String , required : true},
    email:{type : String , required : true},
    password:{type:String , required : true},
    country:{type:String , required : true}
})

const userModels = mongoose.models.user || mongoose.model('user' , userScheema);

export default userModels;