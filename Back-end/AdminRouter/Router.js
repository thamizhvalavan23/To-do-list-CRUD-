import express from 'express';
import { Login, Register, userAuth, UserDetails } from '../AdminControl/AdminControl.js';
import { allTask, DeleteTask, Taskauth, Updatedata, Upload } from '../AdminControl/TaskControl.js';

const adminRouter = express.Router();

// user API

adminRouter.post('/register' , Register);
adminRouter.post('/login' , userAuth , Login)
adminRouter.get('/user-details' ,userAuth , UserDetails)

// Task API

adminRouter.post('/task-upload', Upload )
adminRouter.get('/all-data' , allTask)
adminRouter.put('/update-data', Taskauth, Updatedata)
adminRouter.delete('/delete' ,Taskauth , DeleteTask)



export default adminRouter;