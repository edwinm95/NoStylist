import React,{Component} from 'react'
import '../stylesheet/user.css'
import Avatar from '../stylesheet/avatar_img.jpg'
import edit from './edit'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import * as actions from '../../actions'
import axios from 'axios'
class user extends Component {
  constructor(props){
    super(props);
    this.state = {edit: edit,
                  showEditComponent: false,
                  reviewCount: 0}
    this.editProfile = this.editProfile.bind(this);
    this.fetchReviews = this.fetchReviews.bind(this);
  }
  editProfile(){
    this.setState({
      showEditComponent: !this.state.showEditComponent
    })
  }
  componentWillMount(){
    this.fetchReviews();
  }
  async fetchReviews(){
    try{
      const response = await axios.get("/review/count");
      this.setState({
        reviewCount: response.data.count
      })
    }catch(error){
    }
  }
    renderContent(){
      switch(this.props.auth){
        case false:
        return (<Redirect to="/" />);
        case null:
        return;
        default:
        return(
          <div className="row">
              <div className="col s3">
              </div>
              <div className="col s1">
                  <div className="avatar">
                    <img src={Avatar}/>
                  </div>
                </div>
              <div className="col s4">
                  <div className="userinfo">
                    <p><b>{this.props.auth.name}</b></p>
                    <p><b>{this.props.auth.username}</b></p>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <a href="#" className="reviews">({this.state.reviewCount})</a>
                    <p>United States</p>
                  </div>
                </div>
              <div className="col s4">
                <div className="followbutton">
                  <button class="waves-effect waves-light btn" onClick={this.editProfile}>Edit Profile</button>
                </div>
              </div>
          </div>
        );
      }
    }
    render(){
        return(
          <div>
          {this.renderContent()}
          {this.state.showEditComponent ? (
       React.createElement(this.state.edit)
      ): (<br></br>)}
          </div>
        );

    }
}
const mapStateToProps = (state) => {
  return { auth : state.auth };
}

export default connect(mapStateToProps,actions)(user);