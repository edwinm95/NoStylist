import {withFormsy} from 'formsy-react'
import React,{Component} from 'react'
class PriceInput extends Component{
    constructor(props){
        super(props)
        this.changeValue = this.changeValue.bind(this)
    }
    changeValue(event){
        var reg = /^\d+(\.\d{1,3})?$/;
        var string = event.currentTarget.value
        if(string.match(reg)){
            this.props.setValue(string)
        }
    }
    render(){
        return(<div className="priceinput">
            <input
                  onChange={this.changeValue}
                  name={this.props.name}
                  id={this.props.id || ''}
                  type={this.props.type || 'text'}
                  value={this.props.getValue() || ''}
                  className={this.props.className || 'browser-default price'}
                  accept={this.props.accept}
                  placeholder={this.props.placeholder}
                ></input>
            <span><i class="fas fa-dollar-sign" /></span>
        </div>)
    }
}
export default withFormsy(PriceInput)