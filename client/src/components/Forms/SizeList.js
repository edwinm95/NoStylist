import React, { Component } from 'react'
import axios from 'axios'
class SizeList extends Component {
  constructor(props){
      super(props)
      this.state = {
          subcategoryID: this.props.subcategoryID,
          sizes: []
      }
  }
  componentDidMount = async function(){
    const params = {
        id: this.state.subcategoryID
    }
    const response = await axios.post('/sizes/getsize',params)
    const array = response.data.map(function(size){
        const params = {
            _id: size._id,
            name: size.size
        }
        return(
        <div className="sizelist" onClick={() => this.props.getSize(params)} >{size.size}</div>
        );
    }.bind(this))
    this.setState({sizes: array})
  }
  render() {
    return (
      <div>
        {this.state.sizes}
      </div>
    )
  }
}
export default SizeList
