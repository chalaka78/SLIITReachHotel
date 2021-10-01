import axios from 'axios';
import React, {Component} from 'react';
import { render } from 'react-dom';

class Categories extends Component{
    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/category/')
        .then ( response => {
            this.setState({ categories: response.data.data })
        })
    }

    navigateRoomPage(e,categoryId) {
        window.location = `/${categoryId}`
    }
    render(){
        return(
            <div className="container">
                <h1>Categories</h1>
                {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                    <div key = {index} className = "card mb-3">
                        <div className = "p-3" onClick = {e=> this.navigateRoomPage (e,item._id)} >
                            <h4>Category Name: {item.name}</h4>
                        </div>
                        <div className = "p-3">
                            <h6>Description: {item.description}</h6>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Categories;
