import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component} = props;

    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = window.localStorage.getItem("isUserLoggedIn");
        if(!loggedIn){
            navigate('/login');
        }
    },[])

    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected;