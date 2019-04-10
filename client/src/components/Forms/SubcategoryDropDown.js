import React, { Component } from 'react'

class SubcategoryDropDown extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
        <div>
        <div className="placeholdertext">{this.props.subcategory}</div>
        <div className="downicon"><i class="fas fa-caret-down"></i></div>
      </div>
    )
  }
}

export default SubcategoryDropDown