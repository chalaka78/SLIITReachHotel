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
    render(){
        return(
            <div className="container">
                <h1>Categories</h1>
                {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                    <div key = {index}>
                        <div>
                            <h4>Category Name: {item.name}</h4>
                        </div>
                        <div>
                        <h6>Description: {item.description}</h6>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Categories;
