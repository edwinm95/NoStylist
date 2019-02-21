import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import * as actions from '../../actions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import AuthForm from '../Forms/AuthForm'
class Authentication extends Component{
    constructor(props){
        super(props)
        this.state = { success: false}
        this.validateAccount = this.validateAccount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirect = this.redirect.bind(this);
    }
     handleSubmit = async (values) => {

        console.log(values);
        // const params = {
        //     id: this.state.socialId,
        //     social: this.state.social,
        //     name: this.state.name,
        //     username: this.state.username,
        //     email: this.state.email,
        //     password: this.state.password,
        //     socialToken: this.state.socialToken
        // }
        // console.log(params);
        // const response = await axios.post('/auth/signup',params);
        // console.log(response);
        // const status = response.data.success;
        // if(status === false){
        //     this.props.addError(response.data.message);
        // }else{
        //     this.props.fetchUser();
        //     this.setState({success: true})
        // }
    }
    
    redirect(){
        if(this.state.success === true){
            return <Redirect to='/'/>;
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
                        </div>
                    </div>
                    <div class="col s4">
                    </div>          
                </div>
                
            </div>
        )
    }


}
export default connect(null,actions)(Authentication)