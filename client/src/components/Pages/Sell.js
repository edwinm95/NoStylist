import React,{ Component } from 'react'
import Formsy from 'formsy-react'
import MyInput from '../Forms/MyInput'
import axios from 'axios'
import keys from '../../config/keys'
import PhotoInput from '../Forms/PhotoInput'
import PaypalButton from '../Forms/PaypalButton'
import '../stylesheet/sell.css'
import qs from 'qs'
import CategoryDropDown from '../Forms/CategoryDropDown'
import SubcategoryDropDown from '../Forms/SubcategoryDropDown'
import CategoryList from '../Forms/CategoryList'
import SubCategoryList from '../Forms/SubCategoryList'

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
            category: {
                id: '',
                name: 'Select Category',
                gender: ''
            },
            subcategory:{
                id: '',
                name: 'Select Subcategory'
            },
            type:{
                id: '',
                name: ''
            },
            showCategoryList: false,
            showSubCategoryList: false,
            categorySelected: false
        }

        this.callback = this.callback.bind(this);
        this.renderCategoryList = this.renderCategoryList.bind(this);
        this.setShowCategoryList = this.setShowCategoryList.bind(this);
        this.setShowSubCategoryList = this.setShowSubCategoryList.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.getSubCategoryList = this.getSubCategoryList.bind(this);
        this.renderSubCategoryDropdown = this.renderSubCategoryDropdown.bind(this);
        this.getSubCategory = this.getSubCategory.bind(this);
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
           }})
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
    renderSubCategoryDropdown(){
        if(this.state.categorySelected === true){
            return(
                <div>
                    <div className="subcategorydropdown" onClick={this.setShowSubCategoryList}>
                        <SubcategoryDropDown subcategory={`${this.state.subcategory.name}`} />
                    </div>
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
        const response = await axios.get('/categories/getCategory')
        this.setState({categories: response.data})
    }
    setShowCategoryList(){
        const status = this.state.showCategoryList
        this.setState({
            showSubCategoryList: false,
            showCategoryList: !status})
    }
    setShowSubCategoryList(){
        const status =  this.state.showSubCategoryList;
        this.setState({showSubCategoryList: !status,
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
        console.log(this.state.subcategory.name)
        return(
            <div>
                <div className="listing">
                    <div className="row">
                        <div className="col s12">
                            <div className="title">
                                Create Listing
                            </div>
                        </div>
                    </div>
                <Formsy onValidSubmit={this.handleSubmit} >

                    <div className="fields">
                    <div class="row">
                                <div className="col s2">
                                    <div className="fieldTitle">
                                        Title
                                    </div>
                                </div> 
                                <div class="col s8">
                                    <div className="fieldTextBox">
                                        <MyInput name = 'itemname' type='text' placeholder="Enter Item Name"  />
                                    </div>
                                </div> 
                    </div>
                    </div>

                    <div className="fields">
                    <div class="row">
                                <div className="col s2">
                                    <div className="fieldTitle">
                                        Designer
                                    </div>
                                </div> 
                                <div class="col s8">
                                    <div className="fieldTextBox">
                                        <MyInput name = 'designer' type='text' placeholder="Enter Designer Name"  />
                                    </div>
                                </div> 
                    </div>
                    </div>

                    <div className="fields">
                    <div class="row">
                        <div class="col s2">
                            <div className="fieldTitle">
                            Category
                            </div>
                        </div>
                        <div class="col s8">
                                <div className="categorydropdown" onClick={this.setShowCategoryList}>
                                    <CategoryDropDown category={`${this.state.category.gender} ${this.state.category.name}`} />
                                </div>
                                <div className="categorylistcomponent">
                                    {this.renderCategoryList()}
                                </div>
                                {this.renderSubCategoryDropdown()}

                            
                        </div>  
                    </div>
                    </div>

                    <div className="fields">
                        <div class="row">
                            <div class="col s2">
                                <div className="fieldTitle">
                                    Size
                                </div>
                            </div>
                        <div class="col s8">
                            <MyInput name = 'size' type='text'  />
                        </div>  
                        </div>
                    </div>

                    <div class="row">
                        <div class="col s2">
                            <p>Photos</p>
                        </div>
                        <div class="col s2">
                            <PhotoInput photo="photo1" callbackFromParent={this.callback}/>
                        </div>  
                    </div>

                     <div class="row">
                        <div class="col s2">
                            <p>Description</p>
                        </div>
                        <div class="col s8">
                            <MyInput name = 'description' type='text'  />
                        </div>  
                    </div>

                     <div class="row">
                        <div class="col s2">
                            <p>Price</p>
                        </div>
                        <div class="col s8">
                            <MyInput name = 'price' type='text'  />
                        </div>  
                    </div>

                     <div class="row">
                        <div class="col s2">
                            <p>Shipping Location</p>
                        </div>
                        <div class="col s8">
                            <MyInput name = 'shippinglocation' type='text'  />
                        </div>  
                    </div>

                     <div class="row">
                        <div class="col s2">
                            <p>Shipping Price</p>
                        </div>
                        <div class="col s8">
                            <MyInput name = 'shipping' type='text'  />
                        </div>  
                    </div>

                    <div class="row">
                        <div class="col s2">
                            <p>Condition</p>
                        </div>
                        <div class="col s8">
                            <MyInput name = 'condition' type='text'  />
                        </div>  
                    </div>

                     <div class="row">
                        <div class="col s2">
                            <p>Paypal Email</p>
                        </div>
                        <div class="col s8">
                        <MyInput name = 'paypal' type='text'  />
                        </div>  
                    </div>

                    <div class="row">
                        <div class="col s2">
                        </div>
                        <div class="col s8">
                            <div className="signupbuttoncontainer">
                                <button type="submit" className="waves-effect waves-light btn signupbutton" value = "Create Account" >
                                    Add Item
                                </button>
                            </div>
                        </div>  
                    </div>
       
                </Formsy>
                </div>
            </div>
        )
    }
}
export default Sell



//       <div className="file-upload">
//       <div className="image-upload">
//           <input name = 'file' id='file' type='file' className="inputfile" accept="image/*" onChange={this.handleImageUpload} />
//           <div className="file-upload-icon">
//               <i class="far fa-camera-retro"></i>
//           </div>
//       </div>
//       <div className="imageContent">
//           <img className="image-preview" src ={this.state.photo1}/>
//       </div>
//   </div>