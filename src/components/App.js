import React from 'react'
import NavBar from './NavBar'
import Banner from './Banner'
import { BrowserRouter as  Router, Route, Link } from "react-router-dom";
import SignUp from './SignUp';
import Home from './Home';
import Signin from './Signin'
class App extends React.Component {

    render () {
        return (
            <Router>
            <div>
                <Route path = "/signup" component={SignUp}/>
                <Route path = "/" exact component = {Home}/>
                <Route path = "/signin" component={Signin}/>
             </div>
        </Router>
        );
    }
}

export default App