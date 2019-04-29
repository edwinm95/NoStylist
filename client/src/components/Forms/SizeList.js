import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {device} from '../Layout/Device'
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
    const Sizes = styled.div`
      border: 0.5px solid black;
      width: 50%;
      @media only screen and ${device.tablet} {
        width: 100%
      }
    `
    return (
      <Sizes>
        {this.state.sizes}
      </Sizes>
    )
  }
}
export default SizeList
