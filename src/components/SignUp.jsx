import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../backend/firebase';

const SignUp = ({setLoggedIn, setShowSignUp }) => {
  const handleSignUp = () => {
    const auth = getAuth(app);
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;
    createUserWithEmailAndPassword(auth ,email, password)
      .then((userCredental) => {
        window.localStorage.setItem("isUserLoggedIn", true);
        setLoggedIn(true);
        setShowSignUp(false);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      }
    )  
  }

  const changeFnc = e => {
    setShowSignUp(false);
  }

  return (
    <div className='sign-up'>
        <h1>SignUp</h1>
        <input type="text" placeholder='Enter Name'/>
        <input type="email" placeholder='Enter Email' />
        <input type="password" placeholder='Enter Password'/>
        <button onClick={handleSignUp}>SignUp</button>
        <p>Already Have an account ?  <span onClick={changeFnc}> Log In </span></p>
    </div>
  )
}

export default SignUp