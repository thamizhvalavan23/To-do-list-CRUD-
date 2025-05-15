import Taskmodels from '../database/Task.js';
import jwt from 'jsonwebtoken'

// creating Post API 

export const Upload = async(req , res)=> {
    const {title , description , status , date} = req.body;

    if (!title || !description || !status || !date) {

        res.send({success: false , message : "Some details missing."})
        
    }

    try {

        const tasks = {title , description , status , date};
        const task = new Taskmodels(tasks)
        await task.save();

        const token = jwt.sign({id: task._id} , process.env.SEC_RET);

        res.send({success:true , message : "Creating successfully." , token})


        
    } catch (error) {

        res.send({success: false , message : "Uploading error."})
        console.log(error);
        
        
    }
}

// creating get Api

export const allTask = async (req , res)=> {

    try {

        const allData = await Taskmodels.find();

        if (!allData) {

            req.send({success: false , message : "No data available"})
            
        }

        res.send({success: true , message: "all Data" , allData})
        
    } catch (error) {

        res.send({success: false , message : "Finding error."})
        console.log(error);
        
    }
}

// creating Task auth 

export const Taskauth = async(req , res , next)=> {

    try {

        const {atoken} = req.headers;

        if (!atoken) {

            return res.send({success : false , message : "Task Token error"})
            
        }

        const Taskdecode = jwt.verify(atoken , process.env.SEC_RET);

        req.Userid = Taskdecode.id

        console.log(req.Userid);
        console.log(Taskdecode);
        

        next();
        
        
    } catch (error) {

        res.send({success: false , message : "Task auth error."})
        console.log(error);
        
    }
}

// creating Update API 

export const Updatedata = async(req , res)=> {

    const {taskid ,title , description , status , date
        
    } = req.body;

    //const Userid = req.Userid;

    if (!title || !description || !status || !date) {

        res.send({success: false , message : "Some details missing."})
        
    }

    try {

    const taskmanegar = await Taskmodels.findByIdAndUpdate(taskid,{title , description , status , date});
        return res.send({success:true , message: "Updated successfully." , taskmanegar , taskid})

        
    } catch (error) {

        res.send({success: false , message : "Update error."})
        console.log(error);
        
    }
}

// creating Delete data API 

export const DeleteTask = async(req , res)=> {

    try {

        const Userid = req.Userid;

        const delData = await Taskmodels.findByIdAndDelete(Userid);

        res.send({success:true , message : "deleted successfully." , delData})
        
    } catch (error) {
        res.send({success: false , message : "Delete error."})
        console.log(error);
        
        
    }
}