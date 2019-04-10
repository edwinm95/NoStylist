import React, { Component } from 'react'
import axios from 'axios'
class CategoryList extends Component {

  constructor(props){
      super(props);
      this.state = {
            categories: props.categories,
            mencategory: [],
            womencategory: [],
            menStyle: {},
            womenStyle: {},
            active: 'male',
      }
      this.filterCategoryByGender = this.filterCategoryByGender.bind(this);
      this.renderCategory = this.renderCategory.bind(this);
      this.changeStyle = this.changeStyle.bind(this);
      
  }
  componentDidMount(){
      const filteredMenArray = this.filterCategoryByGender("male")
      const fileteredFemaleArray = this.filterCategoryByGender("female")
      this.setState({mencategory: filteredMenArray})
      this.setState({womencategory: fileteredFemaleArray})
      if(this.state.active === 'male'){
          this.setState({menStyle:{
            fontWeight: "600",
            borderBottom: '2px solid red'
          }})
          this.setState({womenStyle:{}})
      }else if (this.state.active === 'female'){
        this.setState({womenStyle:{
            fontWeight: "600",
            borderBottom: '2px solid red'
          }})
        this.setState({menStyle:{}})
      }
  }
  changeStyle(gender){
    if(gender === "male"){
        this.setState({active: gender})
        this.setState({menStyle:{
          fontWeight: "600",
          borderBottom: '2px solid red'
        }})
        this.setState({womenStyle:{}})
    }else if (gender === "female"){
      this.setState({active: gender})
      this.setState({womenStyle:{
          fontWeight: "600",
          borderBottom: '2px solid red'
        }})
      this.setState({menStyle:{}})
    }
  }
  renderCategory(){
      if(this.state.active === 'male'){
          return(
              <div>
                  {this.state.mencategory}
              </div>
          )
      }else if (this.state.active === 'female'){
          return(
              <div>
                  {this.state.womencategory}
              </div>
          )
      }
  }

  filterCategoryByGender(gender){
      const array = this.state.categories.map(function(category){
          if(category.gender === gender){
              const params = {
                id: category._id,
                name: category.name,
                gender: category.gender
              }
              return(
                <div className="categorylist" onClick={() => this.props.getCategory(params)}>{category.name}</div>
              )
          }
      }.bind(this))
      return array
  }

  render() {
    return (
      <div>
            <ul className="gender">
                <li onClick={() => this.changeStyle("male")} style={this.state.menStyle}>Male</li>
                <li onClick={() => this.changeStyle("female")} style={this.state.womenStyle}>Female</li>
            </ul>
          {this.renderCategory()}    
      </div>
    )
  }
}
export default CategoryList
