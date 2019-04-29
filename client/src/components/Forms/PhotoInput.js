import React,{Component} from 'react'
import axios from 'axios'
import Photo from '../Forms/Photo'
import EditPhoto from '../Forms/EditPhoto'
class PhotoInput extends Component{
    constructor(props){
        super(props)
        this.state={
            photo: [],
            numberOfPhotos: 9,
            isHovering: true,
            refs: {}
            }
            this.getImage = this.getImage.bind(this)

    }
    componentDidMount(){
        var photoArray = []
        var refArray = []
        var refs = Array(9).fill(0).map(() => React.createRef())
        for(var i = 0; i < this.state.numberOfPhotos; i++){
            if(i === 0){
                photoArray.push(<Photo name={`photo`+i} ref={refs[i]} getImage={this.getImage} width={300} height={300}/>)
            }else{
                photoArray.push(<Photo name={`photo`+i} ref={refs[i]} getImage={this.getImage} width={140} height={140}/>)
            }
        }
        this.setState({
                photo: photoArray,
                refs

            })
    }

    getImage(data){
       const {refs} = this.state
       for(var i = 0; i < refs.length; i++){
           var photo = refs[i].current
           if(photo.state.photo === null){
               photo.getEditPhoto(data)
               break;
           }
       }
    }

    render(){
       return(
            <div>
                <div className="picture">
                    {this.state.photo}
                </div>
            </div>
       )
    }
}

export default PhotoInput