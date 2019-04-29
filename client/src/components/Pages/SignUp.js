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
import keys from '../../config/keys'
import styled from 'styled-components'
import {device} from '../Layout/Device'
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
    
        const SignUpContainer = styled.div`
            width: 25%;
            margin auto;
            @media only screen and ${device.tablet} {
                width: 100%;
            }
        `
        const Header = styled.div`
            text-align: center;
            margin: 30px 0;
            font-size: 32px
        `
        const SocialSignUpButtonContainer = styled.div`
            margin: 0 30px;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
        `
        const UserInputContainer = styled.div`
            text-align: left;
            color: #B2BABB;
            margin: 30px;
        `
        const SignUpButtonContainer = styled.div`
            margin: 0 30px;
        `
        const LoginLinkContainer = styled.div`
            margin: 30px 30px;
            text-align: center;
            font-size: 14px;
            padding: 14px;
        `
        return(
            <div>
                <SignUpContainer>
                    <Header>Join No-Stylist Community</Header>
                    <SocialSignUpButtonContainer>
                    <FacebookLogin
                            appId={keys.facebookClientID}
                            autoLoad={false}
                            callback={this.facebookResponse}
                            textButton="Sign Up with Facebook"
                            fields="name,email"
                            cssClass="waves-effect waves-light btn facebook"
                            icon="fab fa-facebook-f facebookicon"
                        />
                    <GoogleLogin
                        clientId={keys.googleClientID}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className="waves-effect waves-light btn google">
                            <i class="fab fa-google googleicon"></i>Sign Up with Google</button>
                            )}
                        buttonText="Login in with google"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                </SocialSignUpButtonContainer>
                <Formsy onValidSubmit={this.handleSubmit}>
                    <UserInputContainer>
                        First and Last Name<br/>
                        <MyInput name = 'name' type='text' validations="isExisty" validationError="Please enter a name" required></MyInput><br/>
                        Username<br/>
                        <MyInput name = 'username' type='text' validations="isExisty" validationError="Please enter a username" ></MyInput><br/>
                        Email Address<br/>
                        <MyInput name = 'email'type='email' validations="isEmail" validationError="This is not a valid email"></MyInput><br/>
                        Password<br/>
                        <MyInput name= 'password' type='password' validations="isEmptyString" validationError="Please enter a password" ></MyInput><br/>
                    </UserInputContainer>
                    <SignUpButtonContainer>
                        <button type="submit" className="waves-effect waves-light btn signupbutton" value = "Sign Up" >Sign Up</button>
                    </SignUpButtonContainer>
                </Formsy>
                <LoginLinkContainer>
                    Already a member?<Link to={"/Signin"} > Sign in</Link>
                </LoginLinkContainer>
                </SignUpContainer>
            </div>
        );
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

export default connect(null,actions)(SignUp)