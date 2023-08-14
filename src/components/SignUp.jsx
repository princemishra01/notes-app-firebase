import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../backend/firebase';
import { Link , useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const SignUp = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
      const loggedIn = window.localStorage.getItem("isUserLoggedIn");
      if(loggedIn){
          navigate('/');
      }
    },[]);

  const handleSignUp = () => {
    const auth = getAuth(app);
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;
    createUserWithEmailAndPassword(auth ,email, password)
      .then((userCredental) => {
        // const user = userCredental.user;
        window.localStorage.setItem("isUserLoggedIn", true);
        navigate('/');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      }
    )  
  }

  return (
    <div className='sign-up'>
        <h1>SignUp</h1>
        <input type="text" placeholder='Enter Name'/>
        <input type="email" placeholder='Enter Email' />
        <input type="password" placeholder='Enter Password'/>
        <button onClick={handleSignUp}>SignUp</button>
        <p>Already Have an account ?  <Link to = '/Login'> Log In </Link></p>
    </div>
  )
}

export default SignUp