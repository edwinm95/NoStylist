import React,{Component} from 'react'
import Canvas from '../Forms/Canvas'
class Modal extends Component {
    constructor(props){
        super(props)
        this.state = {
            photo: this.props.photo
        }
        this.canvas = React.createRef();
        this.fileUpload = React.createRef();
        this.rotate = this.rotate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.downloadImage = this.downloadImage.bind(this)
        this.replacedPhoto = this.replacedPhoto.bind(this);
    }
    rotate(){
        const canvas = this.canvas.current;
        canvas.rotateImage();
    }
    replacedPhoto(event){
        const replacedPhoto = URL.createObjectURL(event.target.files[0])
        this.setState({photo: replacedPhoto})
        const canvas = this.canvas.current
        canvas.setState({photo: replacedPhoto})
        canvas.draw(replacedPhoto)
    }
    closeModal(){
        this.props.closeModal()
    }
    downloadImage(){
        const canvas = this.canvas.current;
        var image = canvas.downloadImage()
        this.props.editedPhoto(image)
        this.closeModal()
    }
    componentDidMount(){
        const canvas = this.canvas.current;
        canvas.draw(this.state.photo)
    }
    render(){
        return(
            <div className = "custommodal">
                <div className="custommodalcontent">
                    <div className="modalheader">
                        Edit Photo
                        <div className="closebutton">
                            <i onClick={this.closeModal}class="fal fa-times"></i>
                        </div>
                    </div>
                    <div className="canvasContainer">
                        <Canvas ref={this.canvas} />
                    </div>
                    <div className="modalcontroller">
                        <div className="rotatebutton">
                            <i onClick={this.rotate}class="fal fa-undo rotate"></i>
                        </div>
                    </div>
                    <div className="removePhoto">
                        <input type="file" class="replacePhoto" ref={this.fileUpload} onChange={(e) => this.replacedPhoto(e)}/>
                        <div className="PhotoLink" onClick={(e) => this.fileUpload.current.click() }>Replace Photo</div>
                    </div>
                    <div onClick={this.downloadImage} className="donebutton">
                            Done
                        </div>
                </div>
            </div>
        )
    }
}

export default Modal