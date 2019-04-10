import React, { Component } from 'react'
import jimp from 'jimp'
class Canvas extends Component {
  constructor(props){
      super(props)
      this.state = {
          canvas:{
            width: 500,
            height: 500
          },
          scale: 0
      }
      this.canvas = React.createRef();
      this.rotateImage = this.rotateImage.bind(this);
      this.downloadImage = this.downloadImage.bind(this);
      this.draw = this.draw.bind(this);
  }
  downloadImage(){
    const canvas = this.canvas.current;
    return(this.canvas.current.toDataURL('image/jpeg',1.0));
  }
  rotateImage(){
    const canvas = this.canvas.current;
    const image = new Image()
    image.src = canvas.toDataURL();
    image.onload = () => {
      const ctx = canvas.getContext("2d")
      var width = image.height;
      var height = image.width;
      var scale = 0;
      var scaledWidth = 0;
      var scaledHeight = 0;
      if(height > width){
        scale = 349/height;
        scaledHeight = scale * height;
        scaledWidth = scale * width;
      }else{
        scale = 349/width;
        scaledHeight = scale * height;
        scaledWidth = scale * width;
      }
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = scaledWidth +'px';
      canvas.style.height = scaledHeight +'px';
      var marginScaled = 0
      if(height > width){
         marginScaled = (350 - scaledWidth) /2
         canvas.style.margin = `0px ${marginScaled}px `
      }else{
        marginScaled = (350 - scaledHeight) /2
        canvas.style.margin = `${marginScaled}px 0px `
      }
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.save();
      ctx.translate(canvas.width, canvas.height / canvas.width)
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(image,0,0)
      ctx.restore();
    }

  }
  draw(photo){
    const canvas = this.canvas.current;
    const image = new Image()
    image.src = photo;
    image.onload = () => {
      console.log('Width',image.width)
      console.log('Height',image.height)
      var width = image.width;
      var height = image.height;
      var scale = 0;
      var scaledWidth = 0;
      var scaledHeight = 0;
      if(height > width){
        scale = 349/height;
        scaledHeight = scale * height;
        scaledWidth = scale * width;
      }else{
        scale = 349/width;
        scaledHeight = scale * height;
        scaledWidth = scale * width;
      }
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = scaledWidth +'px';
      canvas.style.height = scaledHeight +'px';
      var marginScaled = 0
      if(height > width){
         marginScaled = (350 - scaledWidth) /2
         canvas.style.margin = `0px ${marginScaled}px `
      }else{
        marginScaled = (350 - scaledHeight) /2
        canvas.style.margin = `${marginScaled}px 0px `
      }
      const ctx = canvas.getContext("2d")
      ctx.drawImage(image , 0 , 0 ,canvas.width, canvas.height);
    }
  }
  render() {
    return (
      <div>
            <canvas ref={this.canvas} />
      </div>
    )
  }
}

export default Canvas