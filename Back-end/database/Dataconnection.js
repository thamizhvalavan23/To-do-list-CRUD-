import mongoose from "mongoose";

const dataconnect = async()=> {
    await mongoose.connect(`${process.env.MONGO_URL}/Task`);

    try {
        console.log("Data base connected");
        
        
    } catch (error) {
        console.log("error");
        
        
    }
}


export default dataconnect;