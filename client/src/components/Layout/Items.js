import React,{Component} from 'react'
import axios from 'axios'
import { func } from 'prop-types'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import MediaQuery from 'react-responsive'
import Item from './ItemComponent'
import styled from 'styled-components'
class Items extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            margin: 0
        }
        this.updateMargin = this.updateMargin.bind(this)
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
        const {classes} = this.props
        const item = response.data.map( function(item){
            return(
                    <Item
                        image={`http://localhost:5000/images/item/${item._id}/${item.photo1}`}
                        designer={item.designer}
                        name={item.name}
                        size={item.size.charAt(0)}
                        price={item.price}
                        id={item._id}
                    />
            )
        })
        this.updateMargin()
        window.addEventListener('resize', this.updateMargin)
        this.setState({items: item})
    }
    updateMargin(){
        const margin = (window.innerWidth / 4)
        this.setState({margin})
    }
    render(){
        var itemLayout = {}
            const margin = (window.screen.width / 4)
            const width = window.screen.width - margin
            itemLayout = {
                margin: `10px ${margin}px`,
                width: 850,
                border: '0.5px solid #ccc',
                display: 'inline-block'
            }
        const Mobile = styled.div`
            width: 100%;
        `
        console.log('Margin: ',this.state.margin)
        const Desktop = styled.div`
            margin: 0px ${this.state.margin}px;
        `
        
        return(
                <div>
                    <MediaQuery maxDeviceWidth={768}>
                        <Mobile>
                            {this.state.items}
                        </Mobile>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={1024}>
                        <Desktop>
                            {this.state.items}
                        </Desktop>
                    </MediaQuery>
                </div>
        )
    }
}
export default Items