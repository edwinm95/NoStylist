import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import scriptLoader from 'react-async-script-loader'
import PropTypes from 'prop-types'
import keys from '../../config/keys'
class PaypalCheckoutButton extends Component {
    constructor(props){
        super(props)
        window.React = React;
        window.ReactDOM = ReactDOM;
        this.state = {
            client: keys.paypalClientID,
            showButton: false,
            commit: true,
            env: 'sandbox'
        }
    }
    componentDidMount(){
        const {
            isScriptLoaded,
            isScriptLoadSuceed
        } = this.props;
        if(isScriptLoadSuceed&& isScriptLoadSuceed){
            this.setState({showButton: true})
        }
    }
}
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalCheckoutButton);