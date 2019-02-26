import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import * as actions from '../../actions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import MyInput from '../Forms/MyInput'
import Formsy from 'formsy-react'
class Authentication extends Component{
    constructor(props){
        super(props)
        this.state = { 
                    success: false,
                    id: this.props.id,
                    name: this.props.name,
                    email: this.props.email,
                    social: this.props.social,
                    token: this.props.token,
                }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirect = this.redirect.bind(this);
    }
     handleSubmit = async (values) => {
        
        const params = {
            id: values.id,
            social: values.social,
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            socialToken: values.token
        }
        const response = await axios.post('/auth/signup',params);
        console.log(response);
        const status = response.data.success;
        if(status === false){
            this.props.addError(response.data.message);
        }else{
            this.props.fetchUser();
            this.setState({success: true})
        }
    }
    
    redirect(){
        if(this.state.success === true){
            return (<Redirect to='/'/>);
        }
    }
    render(){
        return (
            <div>
                {this.redirect()}
                <div className="row">
                </div>
                 <div class="row">
                    <div class="col s4">
                    </div>
                    <div class="col s4">
                        <div className="mainstyle">
                            <Formsy onValidSubmit={this.handleSubmit}>
                                <div className = "userinput">
                                    <MyInput name="id"  value={this.state.id} type ="hidden"  />
                                    <MyInput name="social"  value= {this.state.social} type="hidden" />
                                    <MyInput name="token" type ="hidden" value={this.state.token}  />
                                    Name<br/>
                                    <MyInput name = 'name' type='text' value={this.state.name}   /><br/>
                                    Username<br/>
                                    <MyInput name = 'username'  type='text' /><br/>
                                    Email Address<br/>
                                    <MyInput name = 'email' type='email' value={this.state.email} /> <br/>
                                    Password<br/>
                                    <MyInput name= 'password'  type='password'  /><br/>
                                </div>
                                <div className="signupbuttoncontainer">
                                    <button type="submit" className="waves-effect waves-light btn signupbutton" value = "Create Account" >
                                        Create Account
                                    </button>
                                </div>
                            </Formsy> 
                        </div>
                    </div>
                    <div class="col s4">
                    </div>          
                </div>
                
            </div>
        );
    }


}

export default connect(null,actions)(Authentication)