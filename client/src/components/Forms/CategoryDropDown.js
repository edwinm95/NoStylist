import React, { Component } from 'react'
class CategoryDropDown extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div>
        <div className="placeholdertext">{this.props.category}</div>
        <div className="downicon"><i class="fas fa-caret-down"></i></div>
      </div>
    )
  }
}

export default CategoryDropDown
