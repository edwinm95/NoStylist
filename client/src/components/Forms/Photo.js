import React, { Component } from 'react'
import EditPhoto from '../Forms/EditPhoto'
 class Photo extends Component {
     constructor(props){
         super(props)
         this.state= {
             photo: null,
             name: this.props.name,
             width: this.props.width,
             height: this.props.height,
             imageHeight: 0,
             imageWidth: 0,
             isHovering: true   
         }
         this.getImage = this.getImage.bind(this)
         this.getEditPhoto = this.getEditPhoto.bind(this)
         this.handleMouseHover = this.handleMouseHover.bind(this)
         this.renderImage = this.renderImage.bind(this);
         this.removePhoto = this.removePhoto.bind(this);
         this.hoverRenderImage = this.hoverRenderImage.bind(this);
         this.renderUploadImage = this.renderUploadImage.bind(this);
     }
    getImage(event){
        const photo = URL.createObjectURL(event.target.files[0])
        const image = new Image()
        image.src = photo
        var height = 0;
        var width = 0;
        image.onload = () => {
            height = image.height;
            width = image.width;
        }
        this.setState(
            {
                photo: photo,
                imageHeight: height,
                imageWidth: width
            }
        )

    }
    getEditPhoto(photo){
        this.setState(
            {
                photo: photo
            }
        )
    }
    handleMouseHover(){
        this.setState(
            {
                isHovering: !this.state.isHovering
            }
        )
    }
    renderImage(){
        const height = this.state.imageHeight
        const width = this.state.imageWidth
        var scaledHeight = 0;
        var scaledWidth = 0;
        if(height > width){
            const scale = this.state.height/height;
            scaledHeight = scale * height;
            scaledWidth = scale * width;
        }else{
            const scale = this.state.width/width;
            scaledHeight = scale * height;
            scaledWidth = scale * width;
        }
        const style = {
            height: `${scaledHeight}px`,
            width: `${scaledWidth}px`
        }
        return(
            <div>
                 <img ref={this.image} className='image-preview' src={this.state.photo}/>
                    {this.hoverRenderImage(this.state.photo)}
            </div>
        )
    }
    removePhoto(){
        this.setState(
            {
                photo: null
            }
        )
        this.props.callbackFromParent({
            photo: this.props.photo,
            file: null
        })

    }
    hoverRenderImage(photo){
        const style = {
            fontSize: '14px'
        }
        return(
            <EditPhoto photo={photo} editedPhoto={this.getEditPhoto} />
        )
    }
    renderUploadImage(){
        return(
            <div>
                <input class="file-upload-input" type='file' onChange={this.getImage} accept="image/*" /> 
                <div className="file-upload-icon">
                            <i class="far fa-camera-retro"></i>
                </div>  
            </div>
        )
    }

    render(){
        const style = {
            height: `${this.state.height} px`,
            width: `${this.state.width} px`
        }
       return(
            <div>
                <div style={style} onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} class="dialog">
                    {this.state.photo ? this.renderImage() : this.renderUploadImage()}
                </div>
            </div>
       )
    }
}


export default Photo
