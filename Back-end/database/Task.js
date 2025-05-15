import mongoose from "mongoose";

const Taskscheema = new mongoose.Schema({
    title:{type:String , required : true},
    description : {type: String , required : true},
    status : {type: String , required : true},
    date : {type: String , required : true},
})



const Taskmodels = mongoose.models.Task ||  mongoose.model('Task' , Taskscheema);

export default Taskmodels;