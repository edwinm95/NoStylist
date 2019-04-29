import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import Authentication from '../Layout/Authentication'
import styled from 'styled-components'
import axios from 'axios'
import * as actions from '../../actions'
import keys  from '../../config/keys'
import {device} from '../Layout/Device'
import Formsy from 'formsy-react'
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
        const headStyle = {
            textAlign: 'center',
            fontSize: '32px'
        }
        const SignInContainer = styled.div`
            width: 25%;
            postion: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
            @media only screen and ${device.tablet} {
                width: 100%;
            }
        `
        const SocialSignUpButton = styled.div`
            margin: 30px 30px;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
        `
        const UserInputContainer = styled.div`
            text-align: left;
            font-size: 14px;
            color: #ccc;
            margin: 30px;
        `
        const UsernameInput = styled.input`
            border: 2px solid palevioletred;
        `
        const PasswordInput = styled.input`
            type: "password";
            name: "password";

        `
        const LoginLinkComponent = styled.div`
            align: left;
            text-align: center;
            padding: 14px;
            font-size: 14px;
        `
        const SigninButtonContainer = styled.div`
            margin: 30px 30px;
        `

        return(
            <div>
                <SignInContainer>
                    <h1 style={headStyle}>Login to No-Stylist</h1>
                    <SocialSignUpButton>
                        <FacebookLogin
                            appId={keys.facebookClientID}
                            autoLoad={false}
                            callback={this.facebookResponse}
                            fields="name,email"
                            cssClass="waves-effect waves-light btn facebook"
                            icon="fab fa-facebook-f facebookicon"
                        />
                        <GoogleLogin
                            clientId={keys.googleClientID}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className="waves-effect waves-light btn google">
                                <i class="fab fa-google googleicon"></i>Login with Google</button>
                                )}
                            onSuccess={this.googleResponse}
                            onFailure={this.googleResponse}
                        />
                        <div class="g-signin2" data-onsuccess="onSignIn">
                        </div>
                    </SocialSignUpButton>
                    <form action="/auth/login" method="post">
                        <UserInputContainer>
                            Username<br/>
                            <UsernameInput type="text" name="username"/>
                            Password<br/>
                            <PasswordInput type="password" name="password"/>
                        </UserInputContainer>
                        <SigninButtonContainer>
                            <button type="submit" className="waves-effect waves-light btn signupbutton">Submit</button>
                        </SigninButtonContainer>
                    </form>
                    <LoginLinkComponent>
                        No account? <Link to={"/SignUp"} >Sign up</Link>
                    </LoginLinkComponent>
                </SignInContainer>

            </div>
        );
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
                return(
                    <div>
                        <Authentication  {...props}/>
                    </div>
                )
            }
        
    }
      

        
}

export default connect(null,actions)(Signin)