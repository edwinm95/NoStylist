import React, { Component } from 'react'
import axios from 'axios'
import Formsy from 'formsy-react'
export default class addTypes extends Component {
  constructor(props){
      super(props);
      this.state = {
          category: [],
          subcategory: [],
          filteredCategory: [],
          fileteredSubCategory: [],
          type: '',
          selectedGender: '',
          selectedCategory: '',
          selectedSubCategory: '',

      }
      this.filterCategories = this.filterCategories.bind(this)
      this.filterSubCategories = this.filterSubCategories.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = async function(params) {
    const category = await axios.get('/categories/getCategory');
    this.setState({category: category.data})
    const subcategory = await axios.get('/categories/getsubcategory');
    this.setState({subcategory: subcategory.data})
  }

  filterCategories(event){
      const gender = event.target.value
      this.setState({selectedGender: gender})
      const filtered = this.state.category.map(function(category){
          if(category.gender === gender){
              return(
                  <option value={`${category._id}`}>{category.name}</option>
              )
          }
      })
      this.setState({filteredCategory: filtered})
  }
  filterSubCategories(event){
    const categoryId = event.target.value
    this.setState({selectedCategory: categoryId})
    var count = 0;
    var firstindex = null;
    const filtered = this.state.subcategory.map(function(subcategory){
        if(subcategory.category === categoryId){
            if(count === 0){
                firstindex = subcategory._id
            }
            count++;
            return(
                <option value={`${subcategory._id}`}>{subcategory.name}</option>
            )
        }
    })
    this.setState({fileteredSubCategory: filtered})
    this.setState({selectedSubCategory: firstindex})
}
handleSubmit= async function(event){
    event.preventDefault();
    const {type, selectedSubCategory} = this.state;
    const params = {
        type: type,
        subcategory: selectedSubCategory
    }
    console.log(params)
    try{
        const response = await axios.post('/categories/addtype',params)
        
    }catch(error){
        alert(error)
    }
}
  
    
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            Enter Type
            <input name="type" type="text" value={this.state.type} onChange={(event) => this.setState({type: event.target.value})} />
            Gender
            <select name="gender" onChange={this.filterCategories} className="browser-default">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            Category
            <select name="category" onChange={this.filterSubCategories} className="browser-default">
                {this.state.filteredCategory}
            </select>
            Sub Category
            <select name="subcategory" onChange={(event) => this.setState({selectedSubCategory: event.target.value})} className="browser-default">
                {this.state.fileteredSubCategory}
            </select>
            <input type="submit" />
        </form>
      </div>
    )
  }
}
