import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import keys from '../../config/keys'
class PaypalButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      clientID: keys.paypalClientID,
      clientSecret: keys.paypalClientSecret
    }

  }

  componentDidMount(){
    const params = {
      client_id: keys.paypalClientID,
      response_type: 'code',
      scope: 'openid',
      redirect_uri: 'http://localhost:3000'
    }
    const url = 'https://www.sandbox.paypal.com/signin/authorize'
    window.paypal.use( ['login'], function (login) {
      login.render ({
        "appid":"AXk_I2ryG8eyUZUcwocFTqraVAxaa7exAwAJ87rR182Miv5sKduLBQ4zHkSrCCsbTklCuQf6gZI_1OOq",
        "authend":"sandbox",
        "scopes":"openid",
        "containerid":"cwppButton",
        "locale":"en-us",
        "buttonType":"CWP",
        "buttonSize":"sm",
        "returnurl":"http://localhost:5000/paypal/connect"
      });
    });
  }

  render() {
    return(
        <div>
            <span id='cwppButton'/>
        </div>
    );
  }
}


export default PaypalButton
