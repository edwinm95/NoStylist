import React from 'react'
import {NavLink } from "react-router-dom";
import '../stylesheet/NavBar.css'
const NavBar = () => {
    return(
        <div className = "navbar">
            <NavLink className = "logo" to={"/"}>No-Stylist</NavLink>
            <a>EXPLORE</a>
            <NavLink className = "signuplink" to={"/SignUp"} >SIGN UP</NavLink>
            <NavLink className = "signinlink" to={"/Signin"} >SIGN IN</NavLink>
        </div>
    )
}

export default NavBar