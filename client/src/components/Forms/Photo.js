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
             isHovering: true,
             imgstyle:{
                 height: '',
                 width: '',
             },
             imgPadding: ''
         }
         this.image = React.createRef();
         this.file = React.createRef();
         this.getImage = this.getImage.bind(this)
         this.getEditPhoto = this.getEditPhoto.bind(this)
         this.handleMouseHover = this.handleMouseHover.bind(this)
         this.renderImage = this.renderImage.bind(this);
         this.removePhoto = this.removePhoto.bind(this);
         this.hoverRenderImage = this.hoverRenderImage.bind(this);
         this.renderUploadImage = this.renderUploadImage.bind(this);
         this.getImageHeightAndWidth = this.getImageHeightAndWidth.bind(this);
         this.editImage = this.editImage.bind(this);
     }
    getImage(event){
        const photo = URL.createObjectURL(event.target.files[0])
        this.props.getImage(photo)
        // this.getImageHeightAndWidth(photo)
    }
    getImageHeightAndWidth(photo){
        const image = new Image()
        image.src = photo
        image.onload = () => {
            const imgstyle = this.editImage(image.height,image.width)
            this.setState(
                {
                    photo: photo,
                    imageHeight: image.height,
                    imageWidth: image.width,
                    imgstyle: {
                        height: `${imgstyle.height}px`,
                        width: `${imgstyle.width}px`
                    },
                    imgPadding: `${imgstyle.padding}`
                }
            )
        }
    }
    getEditPhoto(photo){
        this.getImageHeightAndWidth(photo)
    }

    handleMouseHover(){
        this.setState(
            {
                isHovering: !this.state.isHovering
            }
        )
    }
    editImage(height,width){
        const imageHeight = height
        const imageWidth = width
        var scaledHeight = 0;
        var scaledWidth = 0;
        var Heightpadding = 0;
        var Widthpadding = 0;
        if(height > width){
            const scale = this.state.height/imageHeight;
            scaledHeight = scale * imageHeight;
            scaledWidth = scale * imageWidth;
            Heightpadding = (this.state.width - scaledWidth)/2
        }else{
            const scale = this.state.width/imageWidth;
            scaledHeight = scale * imageHeight;
            scaledWidth = scale * imageWidth;
            Widthpadding = (this.state.height - scaledHeight)/2
        }
        var imgstyle = {
            height: scaledHeight,
            width: scaledWidth,
            padding: `${Widthpadding}px ${Heightpadding}px`
        }
        return imgstyle
    }
    renderImage(){
        const style = {
            background: '#ccc',
            textAlign: 'center',
            fontSize: '30px',
            width: '100%',
            height: '100%',
            padding: this.state.imgPadding
        }
        console.log(this.state)
        return(
            <div style={style}>
                 <img src={this.state.photo} style={this.state.imgstyle} />
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
        return(
            <EditPhoto width={this.state.width} height={this.state.height} photo={photo} editedPhoto={this.getEditPhoto} />
        )
    }
    renderUploadImage(){
        const padding = this.state.height / 3;
        const style = {
            background: 'white',
            border: '1px dashed black',
            textAlign: 'center',
            fontSize: '30px',
            width: '100%',
            height: '100%',
            cursor: 'pointer'
        }
        const iconStyle = {
            padding: `${padding}px`
        }
        return(
            <div style={style} onClick={() => this.file.current.click()}>
                <input class="file-upload-input" type='file' ref={this.file} onChange={this.getImage} accept=".png, ,jpg, .jpeg" /> 
                <div style={iconStyle}>
                            <i class="far fa-camera-retro"></i>
                </div>  
            </div>
        )
    }

    render(){
        const style = {
            width:`${this.state.width}px`,
            float: 'left',
            height: `${this.state.height}px`,
            margin: '10px 10px',
            position: 'relative'
        }
       return(
                
                <div style={style} onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                    {this.state.photo ? this.renderImage() : this.renderUploadImage()}
                </div>
       )
    }
}


export default Photo
