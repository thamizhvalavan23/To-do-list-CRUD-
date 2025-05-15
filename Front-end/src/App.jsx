import React, { useContext } from 'react';
import Login from './Formpage/Login.jsx';
import { ToastContainer } from 'react-toastify';
import { Appcontext } from './Appcontext/Appcontext.jsx';
import Home from './Taskmanagemnet/Home.jsx';

const App = () => {

  const { token } = useContext(Appcontext)
  return token ?(
          <div>
            <ToastContainer />
            <Home />
          </div>
  ) :( 
    <>
            <ToastContainer />
            <Login />
    </>
    


  )
}

export default App
