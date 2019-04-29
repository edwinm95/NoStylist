import React, {Component} from 'react'
import { BrowserRouter as  Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux'
import * as actions from '../actions'
import user from './Pages/user'
import NavBar from './Layout/NavBar'
import Banner from './Layout/Banner'
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Signin from './Pages/Signin'
import edit from './Pages/edit'
import Sell from './Pages/Sell'
import Listing from './Pages/Listing'
import Types from './Pages/addTypes'
import Sizes from './Pages/addSizes'
class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return (
                <Router>
                    <div>
                        <NavBar/>
                        <Route path = "/signup" exact component={SignUp}/>
                        <Route path = "/" exact component = {Home}/>
                        <Route path = "/home" exact component = {Home}/>
                        <Route path = "/signin" component={Signin}/>
                        <Route path = "/signin/:error" component={Signin}/>
                        <Route path = "/user" component={user}/>
                        <Route path = "/sell" component={Sell}/>
                        <Route path = "/listing/:id/:name" component={Listing} />
                        <Route path = "/listing/:id"  exact component={Listing} />
                        <Route path = "/addtypes" exact component={Types} />
                        <Route path = "/addsizes" exact component={Sizes} />
                    </div>
                </Router>
        );
    }
}

export default connect(null, actions)(App);