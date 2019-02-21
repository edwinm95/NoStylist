import React, {Component} from 'react'
import {NavLink } from "react-router-dom";
import '../stylesheet/NavBar.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {Notifications: true}
        this.removeNoticiations = this.removeNoticiations.bind(this);
    }
    renderContent () {
        switch (this.props.auth){
            case false:
                return(
                    <div>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a>SHOP</a></li>
                            <li><NavLink  to={"/Signin"} >SIGN IN</NavLink></li>
                            <li><NavLink   to={"/SignUp"} >SIGN UP</NavLink></li>
                            <li><a href="#"><i className="far fa-search icon"></i></a></li>
                        </ul>
                    </div>
                    );
            case null:
                return;
            default:
            return(
                <div>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a>FITS</a></li>
                        <li><NavLink to={"/user"}>My Account</NavLink></li>
                        <li><a href='/api/logout'>Log Out</a></li>
                        <li><a href="#"><i className="far fa-search icon"></i></a></li>
                    </ul>
               </div>
            );


        }
    }

 removeNoticiations(){
            window.setTimeout(
                function(){
                    this.props.removeError()
                }.bind(this)
            , 2000);
    }

    renderNotifications(){
        if(this.props.error){
            return(
                <div className="row">
                <div className="col s12">
                    <div className="notification">
                        <span className = "flow-text">
                            {this.props.error}
                            {this.removeNoticiations()}
                        </span>
                    </div>
                </div>
            </div>
            );
        }else{
            return(
                <div>
                </div>
            )
        }
    }

    
    render(){
        return(
            <div>
                <div className="navbar-fixed">
                    <nav className = "white">
                        <div className = "nav-wrapper navbar">
                            <NavLink className = "brand-logo logo" to={"/"}>No-Stylist</NavLink>
                            {this.renderContent()}
                        </div>
                    </nav>
                </div>
                {this.renderNotifications()}
            </div>
        )
    }
   
}

const mapStateToProps = ( state ) => {
    return { auth: state.auth,
            error: state.error };
}

export default connect(mapStateToProps,actions)(NavBar);