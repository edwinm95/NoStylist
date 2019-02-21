import React,{Component} from  'react'
import {Link} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import Authentication from '../Layout/Authentication'
import {connect} from 'react-redux'
import * as actions from '../../actions'
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            showForm: true,
            socialid: '',
           socialemail: '',
           socialname: '',
           social :'',
           socialToken: ''

        }
        this.renderSignUpForm = this.renderSignUpForm.bind(this);
    }
    
    googleResponse = (response) => {
        this.setState({
            showForm: false,
            social: 'Google',
            socialid: response.profileObj.googleId,
            socialemail: response.profileObj.email,
            socialname: response.profileObj.givenName,
            socialToken: response.accessToken
        })
    };
    facebookResponse = (response) => {
        this.setState({
            showForm: false,
            social: 'Facebook',
            socialid: response.id,
            socialemail:  response.email,
            socialname: response.name,
            socialToken: response.accessToken
        })
    }
    renderSignUpForm(){
        const facebook = this.props.facebook;
        const google = this.props.google;
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
                                    <form action="/auth/signup" method="post">
                                    <div className = "userinput">
                                        First and Last Name<br/>
                                        <input name = 'name' type='text'></input><br/>
                                        Username<br/>
                                        <input name = 'username' type='text'></input><br/>
                                        Email Address<br/>
                                        <input name = 'email'type='email'></input><br/>
                                        Password<br/>
                                        <input name= 'password' type='password'></input><br/>
                                    </div>
                                    <div className = "signupbuttoncontainer">
                                        <input type="submit" className="waves-effect waves-light btn signupbutton" value = "Sign Up" />
                                    </div>
                                    </form>
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
        if(this.state.showForm === true){
            return(
                <div>
                {this.renderSignUpForm()}
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
            this.props.addParams(props)
            return(
                <div>
                    <Authentication />
                </div>
            )
        }
    }
}
const mapStateToProps = (state) =>{
    return {google: state.google, facebook: state.facebook}
}

export default connect(mapStateToProps,actions)(SignUp)