import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Appcontext } from '../Appcontext/Appcontext';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [isLogin, setIsLogin] = useState("Register");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("")

    


    const { setToken  , token , fetchuserDetails , useInfo , navigate} = useContext(Appcontext);

    const handlsubmite = async (event) => {

        event.preventDefault();

        try {

            if (isLogin === "Register") {

                
                
                            const { data } = await axios.post("https://to-do-r09w.onrender.com/api/admin/register",{name , email , password , country})
                
                            if (data.success) {
                                localStorage.setItem('token', data.token)
                                setToken(data.token)
                                console.log("Register successfully." , token);
                                toast.success(data.message);
                              
                
                              setName("");
                                 setEmail("");
                                   setPassword("")
                                 setCountry('')
                            }else{
                                console.log("api not working");
                                
                            }         
            } else{

            const {data} = await axios.post("https://to-do-r09w.onrender.com/api/admin/login",{email , password} , {headers : {token}});

            if (data.success) {
                setToken(data.token)
                console.log("Login successfully.");
                toast.success(data.message);
               
            }else{
                console.log('error');
                toast.error(data.message)
                console.log(token);
                

                
            }
            }

        } catch (error) {
            toast.error(data.message)
            console.log(error);


        }



    }

    return (
        <div>

            <div className='justify-center m-auto items-center flex w-full h-[100vh]'>
                <form onSubmit={handlsubmite} className='w-[500px] shadow-lg grid mb-7 p-5'>
                    <div className='flex justify-center items-center text-center mt-3'>
                        <h1 className='font-sans text-2xl font-bold text-gray-700'>{isLogin}</h1>
                        <hr className='w-24 h-1 bg-yellow-500 mt-2 ml-2'></hr>
                    </div>
                    <div className='w-full justify-start grid mt-7'>
                        {
                            isLogin === "Register" ? <input className='w-[450px] h-10 border-2 pl-3 border-gray-400 rounded-md' type='text' placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} required autoComplete='off' /> : " "
                        }
                        <input className='w-[450px] h-10 border-2 pl-3 border-gray-400 rounded-md mt-4' type='text' placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
                        <input className='w-[450px] h-10 border-2 pl-3 border-gray-400 rounded-md mt-4 ' type='text' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='off' />
                        {
                            isLogin === "Register" ?
                                <input className='w-[450px] h-10 border-2 pl-3 border-gray-400 rounded-md mt-4 ' type='text' placeholder='Country' name='country' value={country} onChange={(e) => setCountry(e.target.value)} required autoComplete='off' /> : ""

                        }

                    </div>
                    <div className='fles justify-between items-center flex mt-3'>
                        <div>
                            <input type="checkbox" />
                            {
                                isLogin === "Register" ? <span className='ml-1 text-sm text-gray-500'>accespt term&condition</span> : <span className='ml-1 text-sm text-gray-500'>Remember me</span>
                            }
                        </div>
                        <div>
                            {
                                isLogin === "Register" ? <span className='mr-1 text-sm text-gray-600'>Already have account?<i className='underline text-yellow-800 cursor-pointer text-md' onClick={() => setIsLogin("Login")}>Login</i></span> : <span className='mr-1 text-sm text-gray-600'>Create Account?<i className='underline text-yellow-800 cursor-pointer text-md' onClick={() => setIsLogin("Register")}>here</i></span>
                            }

                        </div>
                    </div>
                    {
                        isLogin === 'Register' ? <button className='border-2 border-black bg-yellow-600 text-white cursor-pointer mt-5 h-[40px] rounded-md' type='submite'>CREAT ACCOUNT</button> : <button className='border-2 border-black bg-yellow-600 text-white cursor-pointer mt-5 h-[40px] rounded-md' type='submite'>Login</button>
                    }

                </form>
            </div>


        </div>
    )
}

export default Login
