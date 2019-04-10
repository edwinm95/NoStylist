import React, { Component } from 'react'
import axios from 'axios'

class SubCategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
              subcategories: [],
              types: [],
              subTypesMaps: new Map(),
              activeSub: null,
        }
        this.mapSubCategory = this.mapSubCategory.bind(this);
        this.showTypes = this.showTypes.bind(this);
        
    }
    componentDidMount = async function () {
        const response = await axios.get('/categories/gettype')
        this.setState({types: response.data})
        const subMap = new Map()
        const subArray = this.props.subcategories
        for(var i = 0; i < subArray.length; i++ ){
            var count = 0;
            const filteredTypeArray = this.state.types.map(function(type){
                if(type.subcategory === subArray[i]._id){
                    count++;
                    const params = {
                        subCategoryID: subArray[i]._id,
                        category: subArray[i].name,
                        typeID: type._id,
                        typeName: type.name

                    }
                    return(
                        <tr>
                            <td className="typelist" onClick={() => this.props.getSubCategory(params)}>{type.name}</td>
                        </tr>
                    )
                }
            }.bind(this))
            if(count === 0){
                const params = {
                    subCategoryID: subArray[i]._id,
                    subcategory: subArray[i].name,
                    typeID: undefined,
                    typeName: undefined

                }
                filteredTypeArray.push(
                    <tr>
                            <td className="typelist" onClick={() => this.props.getSubCategory(params)}>{subArray[i].name}</td>
                        </tr>
                )
            }
                subMap.set(subArray[i].name, filteredTypeArray)
        }
        this.setState({subcategories: this.mapSubCategory()})
        this.setState({subTypesMaps: subMap})
    }
    showTypes(category){
        console.log("Hovered on "+category)

    }
    renderTypes(){
        if(this.state.activeSub){
            console.log(this.state.subTypesMaps.get(this.state.activeSub))
            return(
                <table className="types">
                    {this.state.subTypesMaps.get(this.state.activeSub)}
                </table>
            )
        }else{
            return(
                <table>
                </table>
            )
        }
    }

  
    mapSubCategory(){
        const array = this.props.subcategories.map(function(subcategory){
                return(
                    <tr>
                        <td className="subcategorylist" onMouseEnter={() => this.setState({activeSub: subcategory.name})}>{subcategory.name}</td>
                    </tr>
                )
        }.bind(this))
        return array
    }
  
    render() {
      return (
        <div>
            <div className="cat">
                    <table className="subcategories">
                        {this.state.subcategories}
                    </table>
                        {this.renderTypes()}
                </div>
        </div>
      )
    }
}
export default SubCategoryList