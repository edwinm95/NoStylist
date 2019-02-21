import React,{Component} from 'react'
import user from './user'
import M from 'materialize-css'
import {connect} from 'react-redux'
class edit extends Component{
    componentDidMount() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, { duration: 200 });
        
    }
    renderForm(){
        switch(this.props.auth){
            case false:
            return;
            case null:
            return;
            default:
            return(
                <form>
                <div className="row">
                    <div className="col s2 ">
                    </div>
                    <div className="col s3 ">
                            Username<br/>
                            <input type= "text" value={this.props.auth.username} />
                            Password<br></br>
                            <input type= "text" />
                    </div>
                    <div className="col s3 ">
                        Name<br></br>
                        <input type= "text" value={this.props.auth.name}/>
                        Gender<br></br>
                        <select>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="col s3 ">
                        Email<br></br>
                        <input type= "text" value= {this.props.auth.email}/>
                        Country<br></br>

                    </div>
                </div>
                </form>
            );
        }
    }
    render(){

        return(
            <div>
                {this.renderForm()}
            </div>
        );
        }
}

const mapStateToProps = (state) => {
    return{auth: state.auth};
}

export default connect(mapStateToProps)(edit)
