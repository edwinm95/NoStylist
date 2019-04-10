import React, { Component } from 'react'
import axios from 'axios'
class addSizes extends Component {

  constructor(props){
      super(props);
      this.state = {
          size: '',
          gender: '',
          categories: [],
          subcategories: [],
          filerteredCategories: [],
          filteredSubCategories: [],
          selectedSubCategory: []
      }   
      this.handleSubmit = this.handleSubmit.bind(this);
      this.filterCategories = this.filterCategories.bind(this);
      this.filteredSubCategories = this.filteredSubCategories.bind(this);
      this.addSubCategory = this.addSubCategory.bind(this);
  }
  async componentDidMount(){
    const categories = await axios.get('/categories/getCategory')
    console.log(categories.data)
    this.setState({categories: categories.data})
    const subcategories = await axios.get('/categories/getsubcategory')
    this.setState({subcategories: subcategories.data})
  }
  addSubCategory(event,subcategory){
    if(event.target.checked){
            this.setState({
                selectedSubCategory: [...this.state.selectedSubCategory, subcategory]
                })
    }else{
        const array = this.state.selectedSubCategory
        const index = array.indexOf(subcategory)
        if(index !== -1){
            array.splice(index,1)
            this.setState({selectedSubCategory: array})
        }
    }
  }
  filterCategories(event){
    this.setState({selectedSubCategory: []})
    const gender = event.target.value;
    const array = this.state.categories.map(function(category){
        if(gender === category.gender){
            return(
                <option value={`${category._id}`}>{category.name}</option>
            )
        }
    })
    this.setState({filerteredCategories: array})
  }
  filteredSubCategories(event){
      this.setState({selectedSubCategory: []})
      const categoryId = event.target.value;
      console.log(categoryId)
      const array = this.state.subcategories.map(function(subcategory){
          if(categoryId === subcategory.category){
              return(
                <label>
                <input type = "checkbox" value={subcategory._id} onClick={(event) => this.addSubCategory(event,subcategory._id)} />
                    <span>{subcategory.name}</span>
                    <br></br>
            </label>
              )
          }
      }.bind(this))
    this.setState({filteredSubCategories: array})
  }
  async handleSubmit(event){
    event.preventDefault();
    console.log(this.state.selectedSubCategory)
    const params = {
        size: this.state.size,
        subcategories: this.state.selectedSubCategory
    }
    const response = await axios.post('/sizes/addSize',params)
  }
  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            Size
            <input type="text" name="size" value={this.state.size} onChange={(e) => this.setState({size: e.target.value})}/>
            Gender
            <select name="gender" onChange={this.filterCategories} className="browser-default">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            Category
            <select name="categories" onChange={this.filteredSubCategories} className="browser-default">
                {this.state.filerteredCategories}
            </select>
            SubCategory
            {this.state.filteredSubCategories}
            <input type="submit" value="Submit" />
          </form>
      </div>
    )
  }
}

export default addSizes