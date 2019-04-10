import React, { Component } from 'react'
import axios from 'axios'
import '../stylesheet/listing.css'
import Slider from 'react-slick'
import { func } from 'prop-types';
import ThumbNailPhoto from '../Forms/ThumbNailPhoto'
import ListingDesc from '../Forms/ListingDesc'

function CustomRightArrow(props){
    const {className, style, onClick} = props;
    return(
        <div className={className}>
            <i class="fas fa-angle-right"
                style={{ ...style, display: "block", color: "black", fontSize: '20px' }}
                onClick={onClick}
            />
        </div>
    )
}
function CustomLeftArrow(props){
    const {className, style, onClick} = props;
    return(
        <div className={className}>
            <i className={`fas fa-angle-left `}
                style={{ ...style, display: "block", color: "black", fontSize: '20px' }}
                onClick={onClick}
            />
        </div>
    )
}
 class Listing extends Component {
  constructor(props){
      super(props)
      this.state = {
          item: null,
          thumbnailPhotos: [],
          mainImage: [],
          currentPicture: 0
      }
      this.changeMainImage = this.changeMainImage.bind(this);
      this.imageComponent = this.imageComponent.bind(this);
      this.addPhotosToArray = this.addPhotosToArray.bind(this);
      this.descComponent = this.descComponent.bind(this);

  }
  changeMainImage(data){
      const {id} = data
      this.setState({currentPicture: id})
    }
  componentDidMount = async function () {
    const params = {
        id: this.props.match.params.id
    }
    try{
        const response = await axios.post('/items/find',params)  
        this.setState({item: response.data})
        this.addPhotosToArray(this.state.item)

    }catch(error){
        console.log(error)
    }
  }
  addPhotosToArray(item){
    var array = [];
    if(item.photo1 !== null){
        array.push(item.photo1)
    }
    if(item.photo2 !== null){
        array.push(item.photo2)
    }
    if(item.photo3 !== null){
        array.push(item.photo3)
    }
    if(item.photo4 !== null){
        array.push(item.photo4)
    }
    if(item.photo5 !== null){
        array.push(item.photo5)
    }
    if(item.photo6 !== null){
        array.push(item.photo6)
    }
    const modifiedThumbnailPhotos = []
    for(var i = 0; i < array.length; i++){
        modifiedThumbnailPhotos.push(
            <ThumbNailPhoto id={i} itemID={item._id} photo={array[i]} callbackFromParent={this.changeMainImage} />
        )
    }
    const modifiedMainPhotos = array.map( function(photo){
        return(
            <div className="mainImageContainer">
                <img className="mainimage" src = {`http://localhost:5000/images/item/${item._id}/${photo}`} />
            </div>
          )
    })
    this.setState({thumbnailPhotos: modifiedThumbnailPhotos})
    this.setState({mainImage: modifiedMainPhotos})
  }

  imageComponent(){
    const settings = {
        slidesToShow: 4,
        infinite: false,
        nextArrow: <CustomRightArrow  />,
        prevArrow: <CustomLeftArrow className="leftArrow" />
    }
      return(
          <div className="imageComponent">
                {this.state.mainImage[this.state.currentPicture]}
            <div className="imageSlider">
                <Slider {...settings} >
                    {this.state.thumbnailPhotos}
                </Slider>
            </div>
          </div>
      )
  }
  descComponent(item){
    switch(item){
        case null:
            return(
                <div>

                </div>
            )
        default:
            return(
                <ListingDesc item={item} />  
            )
    }
  }
      
  render() {
    return (
      <div>
        <div className="row">
            <div className="col s6">{this.imageComponent()}</div>
            <div className="col s6">{this.descComponent(this.state.item)}</div>
        </div>
      </div>
    )
  }
}
export default Listing
