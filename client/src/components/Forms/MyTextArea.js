import { withFormsy } from 'formsy-react'
import React,{Component} from 'react'
class MyTextArea extends Component{
    constructor(props){
        super(props)
        this.changeValue = this.changeValue.bind(this);
    }
    changeValue(event){
        this.props.setValue(event.currentTarget.value)
    }
    render(){
        return(
            <div>
                <textarea
                placeholder={this.props.placeholder|| ''}
                className={this.props.className || 'browser-default'}
                name={this.props.name}
                />
            </div>
        )

    }
} 
export default withFormsy(MyTextArea);