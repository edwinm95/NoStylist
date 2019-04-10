import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import reduxThunk from  'redux-thunk'
import {createStore , applyMiddleware} from 'redux'
import '@fortawesome/fontawesome-pro/css/all.min.css'
import  'materialize-css/dist/css/materialize.min.css'
import './components/stylesheet/Signup.css'
import './components/stylesheet/main.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers , {}, applyMiddleware(reduxThunk))
ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>, 
document.querySelector('#root'))