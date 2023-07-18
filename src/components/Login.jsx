import React, { useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../backend/firebase';
import { Link , useNavigate} from 'react-router-dom';
// import { useAuthState } from "react-firebase-hooks/auth";

const loggedIn = window.localStorage.getItem("isUserLoggedIn");


const Login = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        if(loggedIn){
            navigate('/');
        }
    },[])

    const handleLogin = () => {
        const user = document.querySelector("input[type='email']").value;
        const password = document.querySelector("input[type='password']").value;

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, user, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);
                window.localStorage.setItem("isUserLoggedIn", true);
                navigate("/");
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }

    return (
        <div className='log-in'>
            <h1>Login</h1>
            <input type="email" placeholder='Enter Email'/>
            <input type="password" placeholder='Enter Password'/>
            <button onClick={handleLogin}>Login</button>
            <p>Dont have an account <Link to = '/signup'>  Sign Up </Link></p>
        </div>
    )
}

export default Login;