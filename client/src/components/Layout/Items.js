import React,{Component} from 'react'
import axios from 'axios'
import { func } from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {Link} from 'react-router-dom'
class Items extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
        }
    }
    renderItems(){
        var array  = []
        for(var i  = 0; i < this.state.items.length; i++){
            array.push(
                <div class="col s4">
                    {this.state.items[i]}
                </div>
            )
        }
        return (array)
    }
    componentDidMount = async function (params) {
        const response = await axios.get('/items/all');
        var i = 0;
        const item = response.data.map( function(item){
            i++
            const style = {
                width: '250px',
                height: '250px',
                objectFit: 'cover'
            }
            const designer={
                fontWeight:'bold'
            }
            const text = {
                fontSize: '12px'
            }
            const modifiedItemName = item.name.replace(/\s+/g, '-')
            return(
                <div>
                    <Grid item xs={4}>
                    <Link to={`/listing/${item._id}/${modifiedItemName}`}>
                        <div className="imageContainer">
                            <img style={style} src={`http://localhost:5000/images/item/${item._id}/${item.photo1}`} />
                        </div>
                        <div className="itemTextContainer">
                            <p style={designer}>{item.designer}</p>
                            <p style={text}>{item.name}</p>
                            <p>${item.price}</p>
                        </div>
                    </Link>
                    </Grid>
                </div>
            )
        })
        console.log(i)
        this.setState({items: item})
    }
    render(){
        return(
            <div>
                <br/>
                <Grid container spacing={24}>
                    {this.state.items}
                </Grid>
            </div>
        )
    }
}
export default Items