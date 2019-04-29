import React,{ Component } from 'react'
import Formsy from 'formsy-react'
import MyInput from '../Forms/MyInput'
import MyTextArea from '../Forms/MyTextArea'
import PriceInput from '../Forms/PriceInput'
import axios from 'axios'
import keys from '../../config/keys'
import PhotoInput from '../Forms/PhotoInput'
import PaypalButton from '../Forms/PaypalButton'
import '../stylesheet/sell.css'
import qs from 'qs'
import CategoryDropDown from '../Forms/CategoryDropDown'
import SubcategoryDropDown from '../Forms/SubcategoryDropDown'
import SizeDropDown from '../Forms/SizeDropDown'
import ConditionDropDown from '../Forms/CondtionDropDown'
import SizeList from '../Forms/SizeList'
import CategoryList from '../Forms/CategoryList'
import SubCategoryList from '../Forms/SubCategoryList'
import AutoComplete from '../Forms/AutoComplete'
import styled from 'styled-components'
import {device} from '../Layout/Device'

class Sell extends Component{
    constructor(props){
        super(props);
        this.state = {
            photo1: null,
            photo2: null,
            photo3: null,
            photo4: null,
            photo5: null,
            photo6: null,
            acessToken: null,
            categories: [],
            subcategories:[],
            mencategories: [],
            womencategories: [],
            designers: [],
            conditions: [],
            category: {
                id: '',
                name: 'Select Category',
                gender: ''
            },
            subcategory:{
                id: '',
                name: 'Select Subcategory'
            },
            size:{
                id: '',
                name: 'Select Size'
            },
            type:{
                id: '',
                name: ''
            },
            designer:{
                id: '',
                name: ''
            },
            showCategoryList: false,
            showSubCategoryList: false,
            showSize: false,
            categorySelected: false,
            showInternational:{
                boolean: true,
                dropdownValue: "yes"
            } 

        }

        this.callback = this.callback.bind(this);
        this.renderCategoryList = this.renderCategoryList.bind(this);
        this.setShowCategoryList = this.setShowCategoryList.bind(this);
        this.setShowSubCategoryList = this.setShowSubCategoryList.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.getSubCategoryList = this.getSubCategoryList.bind(this);
        this.renderSubCategoryDropdown = this.renderSubCategoryDropdown.bind(this);
        this.getSubCategory = this.getSubCategory.bind(this);
        this.showSize = this.showSize.bind(this);
        this.getSize = this.getSize.bind(this);
        this.getDesigner = this.getDesigner.bind(this);
        this.renderConditionDropDown = this.renderConditionDropDown.bind(this);
        this.renderInternationalPrice = this.renderInternationalPrice.bind(this)
        this.showInternational = this.showInternational.bind(this);
    }
    showInternational(event){
        const option = event.currentTarget.value;
        if(option === 'yes'){
            this.setState(
                {
                    showInternational:{
                        boolean: true,
                        dropdownValue: 'yes'
                } 
            })
        }else if (option === 'no'){
            console.log(option)
            this.setState(
                {
                    showInternational:{
                        boolean: false,
                        dropdownValue: 'no'
                } 
            })
        }
    }
    renderInternationalPrice(){
        if(this.state.showInternational.boolean){
            console.log('Show International Prices',)
            return(
                <div>
                    <PriceInput name="internationalshipping" placeholder={'Enter international shipping'} />
                </div>
            )
        }else{
            return(
                <div>

                </div>
            )
        }
    }
    getDesigner(designer){
        this.setState({
            designer:{
                id: designer._id,
                name: designer.Name
            }
        })
    }
    getCategory(data){
        const {id, name, gender} = data
        this.setState({showCategoryList: false})
        this.setState({category: {
            id: id,
            name: name,
            gender: gender.charAt(0).toUpperCase()+gender.slice(1)
        },
        subcategory:{
            id: '',
            name: 'Select Subcategory'
       },
       size:{
        id: '',
        name: 'Select Size'
        }
    })
        this.getSubCategoryList(id)
        this.setState({categorySelected: true})

    }
    getSubCategory(data){
        const {subCategoryID, subcategory, typeID, typeName} = data;
        if(typeID && typeName){
           this.setState({
            showSubCategoryList: false,
               subcategory:{
                id: subCategoryID,
                name: typeName
                },
                size:{
                    id: '',
                    name: 'Select Size'
                }
        })
        }else{
            this.setState({
                showSubCategoryList: false,
                subcategory:{
                    id: subCategoryID,
                    name: subcategory
               },
               type:{
                   typeID: '',
                   typeName: ''
               }
            })
        }
    }
    showSize(){
        if(this.state.subcategory.id !== '' ){
            this.setState({showSize: true})
        }
        if(this.state.showSize){
            this.setState({showSize: !this.state.showSize})
        }
    }

    renderCategoryList(){
        if(this.state.showCategoryList){
            return(
                <div>
                    <CategoryList categories={this.state.categories} getCategory={this.getCategory} />
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
    renderConditionDropDown(){
        if(this.state.conditions.length !== 0){
            return(
                <ConditionDropDown condition={this.state.conditions}  />
            )
        }else{
            return(<div></div>)
        }
    }
    renderSubCategoryList(){
        if(this.state.showSubCategoryList){
            return(
                <div>
                    <SubCategoryList subcategories={this.state.subcategories} getSubCategory={this.getSubCategory} />
                </div>
            )
        }else{
            return(
                <div>
                </div>
            )
        }
    }
    getSize(size){
        console.log(size)
        this.setState({
            size:{
                id: size._id,
                name: size.name
            },
            showSize:false
        })
    }
    renderSize(){
        if(this.state.showSize){
            return(
                <div>
                    <SizeList subcategoryID={this.state.subcategory.id} getSize={this.getSize} />
                </div>
            )
        }else{
            return(
                <div>  
                </div>
            )
        }
    }
    renderSubCategoryDropdown(){
        const SubcategoryDropDownComponent = styled.div`
            width: 50%;
            outline: none;
            margin-top: 8px;
            padding: 8px;
            box-sizing: border-box;
            background-color: white;
            border: 0.5px solid black;
            cursor: pointer;
            @media only screen and ${device.tablet} {
                width: 100%;
                margin: auto;
            }
        `
        if(this.state.categorySelected === true){
            return(
                <div>
                    <SubcategoryDropDownComponent onClick={this.setShowSubCategoryList}>
                        <SubcategoryDropDown subcategory={`${this.state.subcategory.name}`} />
                    </SubcategoryDropDownComponent>
                    <div className="subcategorylistcomponent">
                        {this.renderSubCategoryList()}
                    </div>
                    
                </div>
            )
        }else{
            return(
                <div>
                </div>
            )
        }
    }
    getSubCategoryList = async function (id) {
        const params = {
            id: id
        }
        const response = await axios.post('/categories/findsubcategory',params);
        this.setState({subcategories: response.data})
    }
    async componentDidMount(){
        const categoryResponse = await axios.get('/categories/getCategory')
        const designerResponse = await axios.get('/designers/all')
        const conditionResponse = await axios.get('/items/getconditions')
        this.setState({
                        categories: categoryResponse.data,
                        designers: designerResponse.data,
                        conditions: conditionResponse.data
                    })
    }
    setShowCategoryList(){
        const status = this.state.showCategoryList
        this.setState({
            showSubCategoryList: false,
            showSize: false,
            showCategoryList: !status})
    }
    setShowSubCategoryList(){
        const status =  this.state.showSubCategoryList;
        this.setState({showSubCategoryList: !status,
                        showSize: false,
                       showCategoryList: false})
    }

    handleSubmit =  async (values) => {
        console.log(values)
        var data = new FormData();
        data.append('photo1', this.state.photo1)
        data.append('photo2', this.state.photo2)
        data.append('photo3', this.state.photo3)
        data.append('photo4', this.state.photo4)
        data.append('photo5', this.state.photo5)
        data.append('photo6', this.state.photo5)
        data.append('itemname',values.itemname)
        data.append('category',values.category)
        data.append('designer',values.designer)
        data.append('size',values.size)
        data.append('description',values.description)
        data.append('price',values.price)
        data.append('shippinglocation',values.shippinglocation)
        data.append('shipping',values.shipping)
        data.append('condition',values.condition)
        data.append('paypal', values.paypal)
        try{
            const response = await axios.post('/items/new',data)
            console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }
    callback(data){
        if(data.photo == 'photo1'){
            this.setState({photo1: data.file})
        }else if (data.photo === 'photo2'){
            this.setState(
                {photo2: data.file}
            )
        }else if(data.photo === 'photo3'){
            this.setState(
                {photo3: data.file}
            )
        }else if(data.photo === 'photo4'){
            this.setState(
                {photo4: data.file}
            )
        }else if(data.photo === 'photo5'){
            this.setState(
                {photo5: data.file}
            )
        }else if (data.photo === 'photo6'){
            this.setState(
                {photo6: data.file}
            )
        }
    }
    render(){
        const SellComponent = styled.div`
            margin: 40px;
            border: 1px solid black;
            @media only screen and ${device.tablet} {
                width: 100%;
                border: 0px;
                margin: 0;
            }
        `
        const Title = styled.div`
            font-weight: 300;
            font-size: 32px;
            margin: 20px 0;
            @media only screen and ${device.tablet} {
                width: 100%;
                margin: auto;
            }
        `
        const FieldComponent = styled.div`
            margin: 30px 0;
            border-bottom: 0.5px solid black;
            clear: both;
        `
        const FieldTitle = styled.div`
            font-size: 25px;
            display: inline-block;
            float: left;
            width: 25%;
            padding: 0 10px;
            @media only screen and ${device.tablet} {
                width: 100%;
                margin: auto;
            }
        `
        const FieldInput = styled.div`
            display: inline-block;
            float: left;
            padding: 0 10px;
            margin: auto;
            width: 50%;
            @media only screen and ${device.tablet} {
                width: 100%;
                margin: auto;
            }
        `
        const AutoFillComponent = styled.div`
            margin-bottom: 10px;
            float: left;
            padding: 0 10px;
            width: 50%;
            display: inline-block;
            @media only screen and ${device.tablet} {
                width: 100%;
                margin: 8px 0;
            }
        `
        const CategoryDropDownComponent = styled.div`
            width: 50%;
            margin-top: 8px;
            outline: none;
            padding: 8px;
            box-sizing: border-box;
            background-color: white;
            border: 0.5px solid black;
            cursor: pointer;
            @media only screen and ${device.tablet} {
                width: 100%;
                
            }
        `
        const ListComponent = styled.div`
            margin-bottom: 8px;
            @media only screen and ${device.tablet} {
                width: 100%;
                
            }
        `
        const SizeDropDownComponent = styled.div`
            width: 50%;
            outline: none;
            margin-top: 8px;
            padding: 8px;
            box-sizing: border-box;
            background-color: white;
            cursor: pointer;
            border: 0.5px solid black;
            @media only screen and ${device.tablet} {
                width: 100%;
                margin: auto;
            }
        `
        const SignUpButtonContainer = styled.div`
            margin:  auto;
            width: 25%;
            align: center;
            @media only screen and ${device.tablet} {
                width: 100%;
                margin: auto;
            }
        `



        return(
                <SellComponent>
                        <Title>
                            Create Listing
                        </Title>
                        <Formsy onValidSubmit={this.handleSubmit} >
                            <FieldComponent>
                                <FieldTitle>
                                    Title
                                </FieldTitle>
                                <FieldInput>
                                    <MyInput name = 'itemname' type='text' className={'browser-default item'} placeholder="Enter Item Name"  />
                                </FieldInput>
                            </FieldComponent>

                            <FieldComponent>
                                <FieldTitle>
                                    Designer
                                </FieldTitle>
                                <AutoFillComponent>
                                    <AutoComplete value={this.state.designer.name} suggestions={this.state.designers} getDesigner={this.getDesigner}/>
                                </AutoFillComponent>
                            </FieldComponent>

                            <FieldComponent>
                                <FieldTitle>
                                    Category
                                </FieldTitle>
                                <FieldInput>
                                    <CategoryDropDownComponent onClick={this.setShowCategoryList}>
                                        <CategoryDropDown category={`${this.state.category.gender} ${this.state.category.name}`} />
                                    </CategoryDropDownComponent>
                                    <ListComponent>
                                        {this.renderCategoryList()}
                                    </ListComponent>
                                    {this.renderSubCategoryDropdown()}   
                                </FieldInput>   
                            </FieldComponent>

                            <FieldComponent>
                                <FieldTitle>
                                    Size
                                </FieldTitle>
                                <FieldInput>
                                    <SizeDropDownComponent onClick={this.showSize}>
                                        <SizeDropDown size={`${this.state.size.name}`} />
                                    </SizeDropDownComponent>
                                    <ListComponent>
                                        {this.renderSize()}
                                    </ListComponent>
                                </FieldInput>
                            </FieldComponent>

                            <FieldComponent>
                                <FieldTitle>
                                    Condition
                                </FieldTitle>
                                    <FieldInput>
                                        {this.renderConditionDropDown()}
                                    </FieldInput>
                            </FieldComponent>

                            <FieldComponent>
                                <FieldTitle>
                                    Photos
                                </FieldTitle>
                                <PhotoInput  callbackFromParent={this.callback}/> 
                            </FieldComponent>


                            <FieldComponent>
                                <FieldTitle>
                                    Description
                                </FieldTitle>
                                <FieldInput>
                                    <MyTextArea name = 'description'className="desctextarea" placeholder={'Description of the item, condition (required)'}  />
                                </FieldInput>
                            </FieldComponent>

                           <FieldComponent>
                                <FieldTitle>
                                    Paypal
                                </FieldTitle>
                                <FieldInput>
                                    <MyInput name="paypal" type='text' className={'browser-default paypal'} placeholder="Enter Paypal email" />
                                </FieldInput>
                            </FieldComponent>

                            <FieldComponent>
                                <FieldTitle>
                                    Price
                                </FieldTitle>
                                <FieldInput>
                                    Item Price
                                    <PriceInput name="itemprice" placeholder={'Enter Item Price'}/>
                                    Shipping 
                                    <PriceInput name="shippingprice" placeholder={'Enter Shipping'}/>
                                    International Shipping
                                    <select value={this.state.showInternational.dropdownValue} onChange={(e) => this.showInternational(e)} className="browser-default international">
                                        <option value="yes" selected>Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    {this.renderInternationalPrice()}
                                </FieldInput>
                            </FieldComponent>

                            <SignUpButtonContainer>
                                <button type="submit" className="waves-effect waves-light btn signupbutton" value = "Create Account" >
                                    List Item
                                </button>
                            </SignUpButtonContainer>
                        </Formsy>
                </SellComponent>
        )
    }
}
export default Sell

