import { withFormsy } from 'formsy-react';
import React from 'react';

class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  
  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();
    const errorStyle = {
      color: 'red',
      fontSize: '10px'
    }

    return (
      <div>
        <input
          onChange={this.changeValue}
          name={this.props.name}
          id={this.props.id || ''}
          type={this.props.type || 'text'}
          value={this.props.getValue() || ''}
          className={this.props.className || 'browser-default'}
          accept={this.props.accept}
          placeholder={this.props.placeholder}
        />
        <span style={errorStyle}>{errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(MyInput);