import React, { Component } from 'react'

class ThumbNailPhoto extends Component {
  constructor(props){
      super(props);
      this.state = {
          id: this.props.id,
          itemID: this.props.itemID,
          photo: this.props.photo,
      }
      this.showImage = this.showImage.bind(this);
  }
  showImage(){
      this.props.callbackFromParent({
        id: this.state.id
      })
  }
  render() {
      const {itemID, photo} = this.state
    return (
        <div className="imagescontainer">
            <img className="images" onClick={ () => this.showImage()}  src = {`http://localhost:5000/images/item/${itemID}/${photo}`} />
        </div>
    )
  }
}
export default ThumbNailPhoto
