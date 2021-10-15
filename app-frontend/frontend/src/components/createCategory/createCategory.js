import React, {Component} from 'react';
import Select from 'react-select';  
import axios from 'axios';

const initialState = {
    name: '',
    description: '',
    rooms: [],
    options:[]    
}
class CreateCategories extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this); //since these are user defined
        this.onRoomSelect = this.onRoomSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:8080/room/')
        .then(response =>{
          this.setState({ rooms: response.data.data }, () => {
                 let data = [];
                 this.state.rooms.map((item,index) => {
                     let room = {
                         value: item._id,
                         label: item.code
                     }
                     data.push(room)
                 }); 
                 this.setState({ options: data});
            })
        })
    } 

    onChange(e)  {
        this.setState({ [e.target.name]: e.target.value})
    }

    onRoomSelect(e) {
        this.setState({ selectedRooms: e ? e.map(item =>item.value) : [] });
    }

    onSubmit(e) {
        e.preventDefault();
        let category = {
            name: this.state.name,            
            description: this.state.description,
            rooms:this.state.selectedRooms            
        };
        console.log('Data to send',category);
        axios.post('http://localhost:8080/category/create',category)
        .then(response =>{
            alert('Data successfully inserted')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })      
        
    }

    render(){
        return(
            <div className="container">
                <h1>Create Category</h1>
                <form onSubmit = {this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="roomName" 
                            name = "name" 
                            value= {this.state.name}
                            onChange ={this.onChange}
                        />
                    </div>                
                    <div className="mb-3">
                        <label htmlFor="description" class="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            id="description"                            
                            rows="3" 
                            name= "description" 
                            value= {this.state.description}
                            onChange ={this.onChange}>                              
                        </textarea>
                    </div>
                    <div className="mb-3">
                    <Select
                       options = {this.state.options} 
                       onChange = {this.onRoomSelect}
                       className = "basic-multi-select"
                       isMulti
                    /> 
                    </div>                                 
                    
                
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateCategories;
