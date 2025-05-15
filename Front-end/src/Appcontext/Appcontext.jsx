import { createContext, useState , useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Appcontext = createContext();


const Appcontextprovider = (props)=> {

    const [token , setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : " ")
    const [atoken , setAtoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : " ")

    const [useInfo , setUseInfo] = useState(false)

    const navigate = useNavigate()

    const fetchuserDetails = async(event)=> {

        //event.preventDefault();

        try {

            const {data} = await axios.get("https://to-do-r09w.onrender.com/api/admin/user-details" ,{headers:{token}})

            if (data.success) {
                
                setUseInfo(data.Useinfo)
                
            }else{
                console.log("data fetch error");
                
            }
            
        } catch (error) {

            console.log(error);
            
        }

    }





    const value = {
        token , setToken , fetchuserDetails , useInfo, atoken , setAtoken , navigate

    }

      useEffect(()=> {
    
            if (token) {
                fetchuserDetails(); 
                console.log(useInfo);
                
            }
    
    
        },[token])

    return(
        <div>
            <Appcontext.Provider value={value}>
                {props.children}
            </Appcontext.Provider>

        </div>
    )

}

export default Appcontextprovider