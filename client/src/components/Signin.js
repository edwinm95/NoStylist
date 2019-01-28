import React from 'react'
import {Link} from 'react-router-dom'
import NavBar from './NavBar'
import '../stylesheet/Signup.css'
class Signin extends React.Component{

    render(){
        const headStyle = {
            textAlign: 'center',
            fontSize: '32px'
        }
            return (
                <div>
                    < NavBar />
                    <div className="main-container">
                         <div className="fixer-container">
                            <div className="mainstyle">
                                <h1 style={headStyle}>Login to  No-Stylist</h1>
                                <div className = "socialsignupbutton">
                                    <button className="facebook">Login with Facebook</button>
                                    <button className="google">Login with Google</button>
                                </div>
                                <div className = "userinput">
                                    Username<br/>
                                    <input type='text'></input><br/>
                                    Password<br/>
                                    <input type='password'></input><br/>
                                </div>
                                <button className="signupbutton">Log in</button>
                            </div>
                            <div className = "loginstyle">
                                No account? <Link to={"/SignUp"} >Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
        );
        
    }
      

        
}

export default Signin