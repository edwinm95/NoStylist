import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {device} from '../Layout/Device'
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
    const CategoryListComponent = styled.div`
        border: 0.5px solid black;
        width: 50%;
        @media only screen and ${device.tablet} {
            width: 100%;
        }
    `
    const style = {
        border: '0.5px solid black',
        width: '50%'
    }
      if(this.state.active === 'male'){
          return(
              <CategoryListComponent> 
                  {this.state.mencategory}
              </CategoryListComponent>
          )
      }else if (this.state.active === 'female'){
          return(
              <CategoryListComponent>
                  {this.state.womencategory}
              </CategoryListComponent>
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
    const GenderComponent = styled.ul`
        background-color: white;
        width: 50%;
        padding: 10px;
        margin: 0;
        border: 0.5px solid black;
        @media only screen and ${device.tablet} {
            width: 100%;
        }
    `
    const Gender = styled.li`
        display: inline;
        padding: 10px 10px;
        margin: 10px;
        cursor: pointer;
        &:hover{
            font-weight: 600;
            border-bottom: 2px solid red;
        }
    `
    return (
      <div>
            <GenderComponent>
                <Gender onClick={() => this.changeStyle("male")} style={this.state.menStyle}>Male</Gender>
                <Gender onClick={() => this.changeStyle("female")} style={this.state.womenStyle}>Female</Gender>
            </GenderComponent>
          {this.renderCategory()}    
      </div>
    )
  }
}
export default CategoryList
