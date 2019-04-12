import React, { Component } from 'react'

class CondtionDropDown extends Component {
    constructor(props){
        super(props)
        this.state = {
            condition: []
        }
    }
    componentDidMount(){
        console.log(this.props)
        const array = this.props.condition.map( function(condition){
            return(<option value={condition._id}>{condition.name}</option>)
        } 
        )
        this.setState({condition: array})
    }
    changeValue(event){
        console.log(event.currentTarget.value)
    }
  render() {
    return (
      <div>
          <select onChange={(e) => this.changeValue(e)} className="browser-default condition">
            <option value="" disabled selected>Condtion</option>
            {this.state.condition}
          </select>
      </div>
    )
  }
}

export default CondtionDropDown
