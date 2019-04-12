import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
class AutoComplete extends Component {
  static propTypes = {
      suggestions: PropTypes.instanceOf(Array)
  }
  static defaultProps = {
      suggestions: []
  }
  constructor(props){
      super(props);
      this.state = {
          activeSuggestion: 0,
          filteredSuggestions: [],
          showSuggestions: false,
          userInput: ''

      };
      this.onChange = this.onChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
  }
  onChange(event){
      const {suggestions} = this.props
      const userInput = event.target.value;
      var count = 0;
      var map = {}
      suggestions.filter(function(designer){
          if(designer.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1){
            var index = designer.Name.toLowerCase().indexOf(userInput.toLowerCase())
              count++;
                if(map[index]){
                    map[index] = [...map[index],designer]
                }else{
                    map[index] =[designer]
                }
          }
      })
      var filteredSuggestions = []
      for(var propName in map){
          var array = map[propName]
          for(var i = 0; i < array.length; i++){
                filteredSuggestions.push(array[i])
          }
      }

      this.setState({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true,
          userInput
      })

  }
  onClick(designer){
      this.setState({
          activeSuggestion: 0,
          filteredSuggestions: [],
          showSuggestions: false,
          userInput: designer.Name
      });
      this.props.getDesigner(designer)

  };

  onKeyDown(event){
      const {activeSuggestion, filteredSuggestions} = this.state
      if(event.keyCode === 13){
          this.setState({
              activeSuggestion: 0,
              showSuggestions: false,
              userInput: filteredSuggestions[activeSuggestion]
          })
      }else if(event.keyCode === 38){
          if(activeSuggestion === 0){
              return;
          }
          this.setState({activeSuggestion: activeSuggestion - 1})
      }else if (event.keyCode === 40){
          if(activeSuggestion - 1 === filteredSuggestions.length){
              return;
          }
          this.setState({activeSuggestion: activeSuggestion + 1})
      }
  }

  render() {
      const{onChange,
            onClick,
            onKeyDown,
            state:{
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        let suggestionListComponent;
        var count = 1;
        if(showSuggestions && userInput){
            if(filteredSuggestions.length){
                suggestionListComponent = (
                    <ul className="suggestions">
                    {filteredSuggestions.map((designer, index) => {
                        let className;
                        if(index === activeSuggestion){
                            className = "suggestion-active"
                        }
                            return(
                                <li
                                    className={className}
                                    key={designer._id}
                                    onClick={() => onClick(designer)}
                                >
                                    {designer.Name}
                                </li>
                            )
                    })}
                    </ul>
                );
            }else{
            suggestionListComponent = (
                <div className="no-suggestions">
                    <em>No Designer</em>
                </div>
            );
        }
    }
    return (
      <Fragment>
            <input
                type="text"
                className="browser-default autocomplete"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
            />
          {suggestionListComponent}
      </Fragment>
    )
  }
}

export default AutoComplete
