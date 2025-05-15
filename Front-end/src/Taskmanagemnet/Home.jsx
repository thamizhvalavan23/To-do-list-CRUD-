import React, { useContext, useEffect, useId, useState } from 'react'
import { Appcontext } from '../Appcontext/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import App from '../App'

const Home = () => {

    const {setAtoken , useInfo , token , atoken} = useContext(Appcontext)

    const [Taskdata , setTaskdata] = useState([])

   

    const [title , setTitle] = useState("");
    const [description , setDescription] = useState('');
    const [status , setStatus ] = useState("");
    const [date , setDate] = useState("");

    const {setToken} = useContext(Appcontext)

    const [updateForm , setUpdateForm] = useState(false);

    const [usid , setUsid] = useState(false)

    const updatedData = {
        taskid:usid,
        title: title,
        description: description,
        status: status,
        date: date,
      };

      const delUpdate = async(usid)=> {
        // event.preventDefault()

        try {

            const {data} = await axios.delete("https://to-do-r09w.onrender.com/api/admin/delete",{headers:{atoken}});

            if (data.success) {
                toast.success("Deleted successfully.")
                console.log("deleted");
                
                
            }else{
                console.log("dele error");
                toast.error(data.message)
                
            }

            
        } catch (error) {
            console.log(error);
            
            
        }
    }
    


    const allTask = async()=> {

        try {

            const {data} = await axios.get("https://to-do-r09w.onrender.com/api/admin/all-data",{});

            if (data.success) {

                setTaskdata(data.allData);        
                
            }else{
                console.log("not found data");
                
            }


            
        } catch (error) {
            console.log(error);
            
            
        }

    }

    const handlsubmite= async(event)=> {

        event.preventDefault()
        try {

            if (updateForm === "True"){
                
                
                            const {data} = await axios.put("https://to-do-r09w.onrender.com/api/admin/update-data",updatedData,{headers:{atoken}})
                
                            if (data.success) {
                                console.log(data.taskmanegar);
                                toast.success(data.message)
                                setTitle("");
                                setDate("");
                                setDescription("");
                                setStatus("");
                                setUpdateForm(false)
                                console.log(usid);
                                
                            }else{
                                console.log(" update not work");
                                toast.error(data.message)
                                console.log(atoken);
                                
                            }
                            
            }else{

                const {data} = await axios.post("https://to-do-r09w.onrender.com/api/admin/task-upload",{title , description , status , date})
                
                if (data.success) {
                    setAtoken(data.token)
                    localStorage.setItem('atoken', data.token)
                    setTitle("");
                    setDate("");
                    setDescription("");
                    setStatus("")
                    toast.success(data.message)
                    console.log(data.token);
                    setUpdateForm(false)
                    console.log(atoken);
                   
                    
                    // 68219cc2d685567cb71edcf9
                    //
                    
                    
                }else{
                    console.log("register nto work");

                    
                }

            }


        } catch (error) {

           // toast.error(data.message)

            console.log("error");
            
            
        }
    }

    useEffect(()=>{
        if (token) {
            allTask()
            
        }

    },[])

  return (
    <div className='w-[80%]'>
        <div className= {updateForm ? "opacity-5" : ""}>
        <div className='flex justify-between bg-yellow-500 h-20 rounded-sm mt-14 ml-28 items-center w-full p-5'>
            <div className='flex gap-1 justify-center items-center text-center'>
            <i class="fa-solid fa-circle-user"></i>
            <h1 className='text-2xl font-serif text-white'>{useInfo.name}</h1>
            </div>
            <div className='border p-3 h-9 w-36 text-center rounded-md border-black bg-white items-center justify-center'>
                <h1 onClick={()=> setUpdateForm("show")} className='font-serif cursor-pointer text-center items-center justify-center'> NEW TASK</h1>
            </div>
                
        </div>

        <div className='w-full mt-2 ml-28 flex'>
            <table className='font-sans border-collapse w-full border'>
                <thead>
                    <tr className='bg-orange-300'>
                        <th className='border border2 border-solid p-4 text-left'>No</th>
                        <th className='border border2 border-solid p-4 text-left'>Task</th>
                        <th className='border border2 border-solid p-4 text-left'>Description</th>
                        <th className='border border2 border-solid p-4 text-left'>Status</th>
                        <th className='border border2 border-solid p-4 text-left'>Date</th>
                        <th className='border border2 border-solid p-4 text-left'>Actions</th>
                    </tr>
                    </thead>
                    <tbody className=''>
                    {
                        Taskdata.map((list , index)=> (
                    <tr className='justify-between' key={index}>
                        <td className='border border2 border-solid p-4'>{index+1}</td>
                        <td className='border border2 border-solid p-4'>{list.title}</td>
                        <td className='border border2 border-solid p-4'>{list.description}</td>
                        <td className='border border2 border-solid p-4'><input type='checkbox' className='mr-2'/>{list.status}</td>
                        <td className='border border2 border-solid p-4'>{list.date}</td>
                        <td className='border border2 border-solid p-4'><i onClick={()=> setUpdateForm("True")} class="fa-solid fa-pen"> <span onClick={()=>setUsid(list._id)}>EDI</span></i>  <i class="fa-solid fa-trash"> <span onClick={()=>delUpdate(list._id)}>Del</span></i></td>
                    </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
        </div>
        {
            updateForm  ? 
        
        
        <div className='justify-center m-auto items-center flex w-full h-[100vh] top-[-15px] left-5 absolute'>
                <form onSubmit={handlsubmite} className='w-[500px] shadow-lg grid mb-7 p-5'>
                    <div className='flex justify-center items-center text-center mt-3'>
                        <h1 className='font-sans text-2xl font-bold text-gray-700'>Update</h1>
                        <hr className='w-24 h-1 bg-yellow-500 mt-2 ml-2'></hr>
                    </div>
                    <div className='w-full justify-start grid mt-7'>
                        
                         <input className='w-[450px] h-10 border-2 pl-3 border-gray-400 rounded-md' type='text' placeholder='Title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} required autoComplete='off' />

                        <input className='w-[450px] h-10 border-2 pl-3 border-gray-400 rounded-md mt-4' type='text' placeholder='Description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} required autoComplete='off' />
                        <input className='w-[450px] h-10 border-2 pl-3 border-gray-400 rounded-md mt-4 ' type='text' placeholder='Status' name='status' value={status} onChange={(e) => setStatus(e.target.value)} required autoComplete='off' />
                                <input className='w-[450px] h-10 border-2 pl-3 border-gray-400 rounded-md mt-4 ' type='text' placeholder='Date' name='date' value={date} onChange={(e) => setDate(e.target.value)} required autoComplete='off' />


                    </div>
                    <div className='justify-between items-center flex'>

                   <button className='border-2 border-black bg-yellow-600 w-max p-3 text-white cursor-pointer mt-5 h-[45px] rounded-md' type='submite'>SAVE</button> 
                  <button onClick={()=> setUpdateForm(false)} className='border-2 border-black w-max p-3  bg-yellow-600 text-white cursor-pointer mt-5 h-[45px] rounded-md' type='submite'>CANCEL</button>

                    </div>
                        

                </form>
            </div>
           : ""


            } 

    </div>
  )
}

export default Home