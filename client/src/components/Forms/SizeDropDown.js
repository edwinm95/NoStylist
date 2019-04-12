import React, { Component } from 'react'

class SizeDropDown extends Component {
  render() {
    return (
      <div>
        <div className="placeholdertext">
            {this.props.size}
        </div>
        <div className="downicon">
            <i class="fas fa-caret-down"/>
        </div>
      </div>
    )
  }
}
export default SizeDropDown
