import React from  'react'
import '../stylesheet/Signup.css'
import NavBar from './NavBar'
import {Link} from 'react-router-dom'

const SignUp = () => {

    const main = {
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: '1px'
    }

    const headStyle = {
        textAlign: 'center',
        fontSize: '32px'
    }
    return (
        <div>
            <NavBar/>
            <div className="main-container">
                <div className="fixer-container">
                    <div className="mainstyle">
                        <h1 style={headStyle}>Join No-Stylist Community</h1>
                        <div className = "socialsignupbutton">
                            <button className="facebook">Sign up with Facebook</button>
                            <button className="google">Sign up with Google</button>
                        </div>
                        <div className = "userinput">
                            <label>First and Last Name</label><br/>
                            <input type='text'></input><br/>
                            Username<br/>
                            <input type='text'></input><br/>
                            Email Address<br/>
                            <input type='email'></input><br/>
                            Password<br/>
                            <input type='password'></input><br/>
                        </div>
                    <button className="signupbutton">Sign up</button>
                    </div>
                    <div className = "loginstyle">
                         Already a member?<Link to={"/Signin"} >Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp