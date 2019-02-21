import React,{Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

const renderField = field => 
(
    <div>
        <label>{field.input.label}</label>
        <input>{...field.input}</input>
        {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

const AuthForm = props =>  {

        const {handleSubmit} = this.props
        return(
                <form onSubmit={handleSubmit}>
                        <div className = "userinput">
                            <Field name="id" component={renderField} type ="hidden"  />
                            <Field name="social" component={renderField} type="hidden" />
                            <Field name="token" component={renderField} type ="hidden" />
                            <label htmlFor="name" >Name</label>
                            <Field name = 'name' component={renderField} type='text'  /><br/>
                            Username<br/>
                            <Field name = 'username' component={renderField} type='text' /><br/>
                            Email Address<br/>
                            <Field name = 'email'component={renderField} type='email' /> <br/>
                            Password<br/>
                            <Field name= 'password' component={renderField} type='password' /><br/>
                        </div>
                        <div className = "signupbuttoncontainer">
                            <button action="submit" className="waves-effect waves-light btn signupbutton" value = "Create Account" />
                        </div>
                    </form>
        );
        
}

function validate(formProps){
    const errors = {};
    if(!formProps.name){
        errors.name = 'Please enter a name'
    }
    if(!formProps.username){
        errors.username = 'Please enter a username'
    }
    if(!formProps.email){
        errors.email = 'Please enter an email'
    }
    if(!formProps.password){
        errors.password = 'Please enter a password'
    }
    return errors;
}



function mapStateToProps(state){
    return{
        params: state.params
    }
}



AuthForm = reduxForm({
    form: 'AuthFrom',
    validate  // a unique identifier for this form
  })(AuthForm)
  
  // You have to connect() to any reducers that you wish to connect to yourself
AuthForm = connect(mapStateToProps)(AuthForm)


export default AuthForm