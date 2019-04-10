import React,{Component} from 'react'
import axios from 'axios'
import Photo from '../Forms/Photo'
import EditPhoto from '../Forms/EditPhoto'
class PhotoInput extends Component{
    constructor(props){
        super(props)
        this.state={
            photo: [],
            numberOfPhotos: 4,
            isHovering: true,
            }

    }
    componentDidMount(){
        var photoArray = []
        for(var i = 0; i < this.state.numberOfPhotos; i++){
            if(i === 0){
                photoArray.push(<Photo name={`photo`+i} width={200} height={200}/>)
            }else{
                photoArray.push(<Photo name={`photo`+i} width={150} height={150}/>)
            }   
        }
        this.setState({photo: photoArray})
    }

    render(){
        const style = {
            display: 'inline-block'
        }
       return(
            <div style={style}>
                {this.state.photo}
            </div>
       )
    }
}

export default PhotoInput