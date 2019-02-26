import React,{Component} from  'react'
import {Link, Redirect} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import Authentication from '../Layout/Authentication'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import axios from 'axios'
import MyInput from '../Forms/MyInput'
import Formsy from 'formsy-react'
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
           showAuthenticationForm: false,
           socialid: '',
           socialemail: '',
           socialname: '',
           social :'',
           socialToken: '',
           success: false,
           nameisEmpty: false,
           usernameisEmpty: false,
           emailisEmpty: false,
           passwordisEmpty: false

        }
        this.renderSignUpForm = this.renderSignUpForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    googleResponse = async (response) => {
        this.setState({
            social: 'Google',
            socialid: response.profileObj.googleId,
            socialemail: response.profileObj.email,
            socialname: response.profileObj.givenName,
            socialToken: response.accessToken
        })
        try{
            const params = {
                id: this.state.socialid,
                username: this.state.socialid,
                password: this.state.socialid,
            }
            const response = await axios.post('/auth/google',params)
            const userSuccessfullyLoggedin = response.data.success; 
            if(userSuccessfullyLoggedin === true){
                this.props.fetchUser();
                this.setState({success: true})
            }else{
                this.setState({showAuthenticationForm: true})
            }
        }catch(error){
        console.log(error);
    }
    };
    redirectToHome(){
        if(this.state.success === true){
            return (
                <div>
                    <Redirect to='/'/>
                </div>
            );
        }
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
                this.setState({showAuthenticationForm: true})
            }
        }catch(error){
            console.log(error)
        }
    }
    handleSubmit = async(values) => {
        console.log(values);
        const {username, email, password, name} = values
        try{
            if(username === '' || username === undefined){
                this.setState({
                    usernameisEmpty: true
                })
            }
            if(name === '' || name === undefined){
                this.setState({
                    nameisEmpty: true
                })
            }
            if(email === '' || email === undefined){
                this.setState({
                    emailisEmpty: true
                })
            }
            if(password === '' || password === undefined){
                this.setState({
                    passwordisEmpty: true
                })
            }
            // if(!this.state.nameisEmpty && !this.state.emailisEmpty && !this.state.passwordisEmpty && !this.state.usernameisEmpty){
            //     const response = await axios.post('/auth/signup',values)
            //     console.log(response);
            // }

        }catch(error){
            console.log(error)
        }
    }
    renderSignUpForm(){
        const facebook = this.props.facebook;
        const google = this.props.google;
        const usernameEmpty = this.state.usernameisEmpty
        const main = {
            textAlign: 'center',
            borderStyle: 'solid',
            borderWidth: '1px'
        }
    
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
                                    <h1 style={headStyle}>Join No-Stylist Community</h1>
                                    <div className = "socialsignupbutton">
                                    <FacebookLogin
                                            appId={facebook}
                                            autoLoad={false}
                                            callback={this.facebookResponse}
                                            textButton="Sign Up with Facebook"
                                            fields="name,email"
                                            cssClass="waves-effect waves-light btn facebook"
                                            icon="fab fa-facebook-f facebookicon"
                                        />
                                    <GoogleLogin
                                        clientId={google}
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick} className="waves-effect waves-light btn google">
                                            <i class="fab fa-google googleicon"></i>Sign Up with Google</button>
                                            )}
                                        buttonText="Login in with google"
                                        onSuccess={this.googleResponse}
                                        onFailure={this.googleResponse}
                                    />
                                    </div>
                                    <Formsy onValidSubmit={this.handleSubmit}>
                                    <div className = "userinput">
                                        First and Last Name<br/>
                                        <MyInput name = 'name' type='text' validations="isUndefined" validationError="Please enter a name" ></MyInput><br/>
                                        Username<br/>
                                        <MyInput name = 'username' type='text' validations="isEmptyString" validationError="Please enter a username" ></MyInput><br/>
                                        Email Address<br/>
                                        <MyInput name = 'email'type='email' validations="isEmail" validationError="This is not a valid email"></MyInput><br/>
                                        Password<br/>
                                        <MyInput name= 'password' type='password' validations="isEmptyString" validationError="Please enter a password" ></MyInput><br/>
                                    </div>
                                    <div className = "signupbuttoncontainer">
                                        <input type="submit" className="waves-effect waves-light btn signupbutton" value = "Sign Up" />
                                    </div>
                                    </Formsy>
                                </div>
                                <div className = "loginstyle">
                                    Already a member?<Link to={"/Signin"} > Sign in</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s4">
                    </div>
                </div>
            </div>
            );
        }
    }
    render(){
        if(this.state.showAuthenticationForm === false){
            console.log(this.state)
            return(
                <div>
                {this.renderSignUpForm()}
                {this.redirectToHome()}
                </div>
            )
        }else{
            let props ={
                id: this.state.socialid,
                social : this.state.social,
                name: this.state.socialname,
                email: this.state.socialemail,
                token: this.state.socialToken
            }
            return(
                <div>
                    <Authentication {...props}/>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) =>{
    return {google: state.google, facebook: state.facebook}
}

export default connect(mapStateToProps,actions)(SignUp)