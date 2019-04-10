import React, { Component } from 'react'
import axios from 'axios'

class ListingDesc extends Component {
  constructor(props){
      super(props);
      this.state = {
          designer: this.props.item.designer,
          name: this.props.item.name,
          price: this.props.item.price,
          size: this.props.item.size,
          likes: this.props.item.likes,
          description: this.props.item.description,
          itemUserId: this.props.item.user,
          user: null
      }
  }
  componentDidMount =  async function(){
    const params = {
      id: this.state.itemUserId
    }
    try{
      const response = await axios.post('/user/get',params)
      this.setState({user: response.data})
    }catch(error){
      console.log(error)
    }
  }
  render() {
    const {designer, name, price, size, likes, description, user} = this.state
    if(user){
      return (
        <div className="Designcontainer">
          <div className="name">{name}</div>
          <div className="designer">{designer}</div>
          <div className="price">${price}</div>
          <div className="size">Size: {size}</div>
          <div className="likes">
            <i class="fal fa-heart"></i>&nbsp;{likes}
          </div>
          <div className="buttoncontainers">
            <a href="#" className="waves-effect waves-light btn buybutton">Buy Now</a>
            <a href="#" className="waves-effect waves-light btn messagebutton">Message</a>
          </div>
          <div className="userinfo">
              User:&nbsp;{user.username}
          </div>
          <div className="description">
              {description}
          </div>
        </div>
      )
    }else{
      return(
        <div>

        </div>
      )
    }
  }
}

export default ListingDesc
