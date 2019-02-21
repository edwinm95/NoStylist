import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import Authentication from '../Layout/Authentication'
import axios from 'axios'
import * as actions from '../../actions'
class Signin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           showForm: false,
           socialid: '',
           socialemail: '',
           socialname: '',
           social :'',
           success: false,
           renderAuthenticationForm: false
        }
        this.googleResponse = this.googleResponse.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    facebookResponse = async (response) => {
        this.setState({
            social: 'Facebook',
            socialid: response.id,
            socialemail:  response.email,
            socialname: response.name,
            socialToken: response.accessToken
        })
        const params = {
            id: this.state.socialid,
            username: this.state.socialid,
            password: this.state.socialid,
        }
        try{
            const response = await axios.post('/auth/facebook',params)
            const userSuccessfullyLoggedin = response.data.success; 
            if(userSuccessfullyLoggedin === true){
                this.props.fetchUser();
                this.setState({success: true})
            }else{
                this.setState({showForm: true})
            }
        }catch(error){
            console.log(error)
        }
    }

    googleResponse = async (googleResponse) => {
        this.setState({
            social: 'Google',
            socialid: googleResponse.profileObj.googleId,
            socialemail: googleResponse.profileObj.email,
            socialname: googleResponse.profileObj.givenName,
            socialToken: googleResponse.accessToken
        })

        const params = {
            id: this.state.socialid,
            username: this.state.socialid,
            password: this.state.socialid,
        }
        try{
            const response = await axios.post('/auth/google',params)
            const userSuccessfullyLoggedin = response.data.success; 
            if(userSuccessfullyLoggedin === true){
                this.props.fetchUser();
                this.setState({success: true})
            }else{
                this.setState({showForm: true})
            }
        }catch(error){
            console.log(error);
        }
    }
    redirectToHome(){
        if(this.state.success === true){
            return (
                <div>
                    <Redirect to='/'/>
                </div>
            );
        }
    }

    renderLoginForm(){
        const facebook = this.props.facebook;
        const google = this.props.google;
        const headStyle = {
            textAlign: 'center',
            fontSize: '32px'
        }
        if(google && facebook){
                return(
                    <div>
                    <div className="row">
                    </div>
                    <div class="row">
                        <div class="col s4">
                        </div>
                         <div class="col s4">
                            <div className="main-container">
                                <div className="fixer-container">
                                    <div className="mainstyle">
                                        <h1 style={headStyle}>Login to No-Stylist</h1>
                                        <div className = "socialsignupbutton">
                                        <FacebookLogin
                                            appId={facebook}
                                            autoLoad={false}
                                            callback={this.facebookResponse}
                                            fields="name,email"
                                            cssClass="waves-effect waves-light btn facebook"
                                            icon="fab fa-facebook-f facebookicon"
                                        />
    
                                        <GoogleLogin
                                            clientId={google}
                                            render={renderProps => (
                                                <button onClick={renderProps.onClick} className="waves-effect waves-light btn google">
                                                <i class="fab fa-google googleicon"></i>Login with Google</button>
                                                )}
                                            onSuccess={this.googleResponse}
                                            onFailure={this.googleResponse}
                                        />
                                            
                                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                                        </div>
                                        <form action="/auth/login" method="post">
                                            <div className = "userinput">
                                                Username<br/>
                                                <input name = 'username' type='text'></input><br/>
                                                Password<br/>
                                                <input name= 'password' type='password'></input><br/>
                                            </div>
                                            <div className = "signupbuttoncontainer">
                                                <input type="submit" className="waves-effect waves-light btn signupbutton" value = "Sign In" />
                                            </div>
                                </form>
                                    </div>
                                    <div className = "loginstyle">
                                        No account? <Link to={"/SignUp"} >Sign up</Link>
                                    </div>
                                </div>
                            </div>
                        <div class="col s4">
                        </div>
                    </div>    
                </div>
                </div>
                );
        }
    }

    render(){
            if(this.state.showForm === false){
                return (
                    <div>
                        {this.redirectToHome()}
                        {this.renderLoginForm()}
                    </div>
                    );
            }else{
                let props ={
                    socialId: this.state.socialid,
                    social : this.state.social,
                    name: this.state.socialname,
                    email: this.state.socialemail,
                    socialToken: this.state.socialToken
                }
                this.props.addParams(props)
                return(
                    <div>
                        <Authentication  />
                    </div>
                )
            }
        
    }
      

        
}
const mapStateToProps = (state) =>{
    return { google: state.google,
             facebook: state.facebook 
            };
}

export default connect(mapStateToProps,actions)(Signin)