import React, { Component } from 'react'
import '../stylesheet/main.css'
import Modal from '../Layout/Modal'
class EditPhoto extends Component {
  constructor(props){
      super(props);
      this.state = {
                    open: false,
                    photo: this.props.photo,
                    width: this.props.width,
                    height: this.props.height
                }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this);
      this.getEditedPhoto = this.getEditedPhoto.bind(this);
  }
  openModal(){
      console.log('Clicked')
      this.setState({open: true})
  }
  closeModal(){
      this.setState({open: false})
  }
  getEditedPhoto(photo){
    this.setState({photo : photo})
    this.props.editedPhoto(photo)
  }
  render() {
        const padding = this.state.height / 3;
      const style = {
        padding:`${padding}px`
      }
    return (

        <div>
            <div onClick={this.openModal} className="removeButton">
                <div style={style}>
                <i class="far fa-pencil">
                    <br/>
                    <div className="edittext">
                        Edit
                    </div>
                </i>
                </div>
            </div>
            {this.state.open ? 
                <Modal photo={this.state.photo} closeModal={this.closeModal} editedPhoto={this.getEditedPhoto} /> :
                null
            }
                
        </div>
    )
  }
}

export default EditPhoto
