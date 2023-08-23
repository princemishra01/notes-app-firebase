import React, { useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../backend/firebase';

const Login = ({setLoggedIn , setShowSignUp }) => {
    
    const handleLogin = () => {
        const user = document.querySelector("input[type='email']").value;
        const password = document.querySelector("input[type='password']").value;

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, user, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                window.localStorage.setItem("isUserLoggedIn", true);
                setLoggedIn(true);
                setShowSignUp(false);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }

    const changeFnc = e => {
        setShowSignUp(true);
    }

    return (
        <div className='log-in'>
            <h1>Login</h1>
            <input type="email" placeholder='Enter Email'/>
            <input type="password" placeholder='Enter Password'/>
            <button onClick={handleLogin}>Login</button>
            <p>Dont have an account <span onClick={changeFnc}>Sign Up</span> </p>
        </div>
    )
}

export default Login;