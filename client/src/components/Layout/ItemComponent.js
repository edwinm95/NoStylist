import  React, {Component} from 'react'
import styled from 'styled-components'
import {device} from './Device'
import {Link} from 'react-router-dom'
const ItemWrapper = styled.div`
    float: left;
    max-height: 400px;
    width: 200px;
    margin 20px;
    @media only screen and ${device.tablet} {
        width: 50%;
        margin: 0 auto;
    }
`;
const ImageComponet = styled.div`
    width: 100%;
    height: 300px;
`;

const DesignerComponent = styled.div`
    font-weight: bold;
    @media only screen and ${device.tablet} {
        text-align: center;
    }
`;

const SizeComponent = styled.div`
@media only screen and ${device.tablet} {
    text-align: center;
}
`;
const NameComponent = styled.div`
@media only screen and ${device.tablet} {
    text-align: center;
}
`;
const PriceComponent = styled.div`
    font-weight: bold;
    @media only screen and ${device.tablet} {
        text-align: center;
    }
`;

class Item  extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            designer: this.props.designer,
            image: this.props.image,
            size: this.props.size,
            price: this.props.price,
            id: this.props.id,
            imgstyle: {},
            padding: '',
            width: 0
        }
        this.updateImageDimensions = this.updateImageDimensions.bind(this)
    }
    componentDidMount(){
        this.updateImageDimensions()
        window.addEventListener('resize',this.updateImageDimensions)
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.updateImageDimensions)
    }
    updateImageDimensions(){
        if(window.innerWidth <= 768){
            var newWidth = (window.innerWidth/2)
            this.getImageHeightAndWidth(this.state.image, newWidth)
        }else{
            this.getImageHeightAndWidth(this.state.image, 200)
        }
    }
    getImageHeightAndWidth(photo,width){
        const image = new Image()
        image.src = photo
        image.onload = () => {
            const imgstyle = this.editImage(image.height,image.width,width)
            this.setState(
                {
                    imgstyle: {
                        height: `${imgstyle.height}px`,
                        width: `${imgstyle.width}px`,
                    },
                    padding: imgstyle.padding,
                    width
                }
            )
        }
    }
    editImage(height,width,divWidth){
        const imageHeight = height
        const imageWidth = width
        var scaledHeight = 0;
        var scaledWidth = 0;
        var Heightpadding = 0;
        var Widthpadding = 0;
        if(height > width){
            const scale = divWidth/imageHeight;
            scaledHeight = scale * imageHeight;
            scaledWidth = scaledHeight;
            Heightpadding = 0
        }else{
            const scale = divWidth/imageWidth;
            scaledWidth = scale * imageWidth;
            scaledHeight = scaledWidth;
            Widthpadding = 0;
        }
        var imgstyle = {
            height: scaledHeight,
            width: scaledWidth,
            padding: `${Widthpadding}px ${Heightpadding}px`
        }
        return imgstyle
    }
    render(){
        const {image,designer,name,price,size,id} = this.state
        const style = {
                background: '#E5E5E5',
                textAlign: 'center',
                fontSize: '30px',
                width: '100%',
                height: `${this.state.width}px`,
                padding: this.state.padding
        }
        const Image = styled.img`
            height: ${this.state.imgstyle.height};
            width: ${this.state.imgstyle.width};
            object-fit: cover;
            border-radius: 5px
        `;
        return(
            <Link to={`/listing/${id}`} style={{color: 'black'}}>
                <ItemWrapper>
                    <div style={style}>
                        <Image src={`${image}`} />
                    </div>
                    <DesignerComponent>
                        {designer}
                    </DesignerComponent>
                    <NameComponent>
                        {name}
                    </NameComponent>
                    <SizeComponent>
                        Size:{size}
                    </SizeComponent>
                    <PriceComponent>
                        ${price}
                    </PriceComponent>
                </ItemWrapper>
             </Link>
        )
    }
}
export default Item