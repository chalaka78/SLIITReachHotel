import React, {Component} from 'react';
import axios from 'axios';

const initialState = {
    code: '',
    amount: '',
    wing: '',
    pax: 0
}
class CreateRooms extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this); //since these are user defined
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    onChange(e)  {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let room = {
            code: this.state.code,
            amount: this.state.amount,
            wing: this.state.wing,
            pax: this.state.pax
            
        }
        console.log('Data to send',room);
        axios.post('http://localhost:8080/room/create',room)
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
                <h1>Create Room</h1>
                <form onSubmit = {this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Room Code</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="roomName" 
                            name = "code" 
                            value= {this.state.code}
                            onChange ={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subjectAmount" className="form-label">Amount</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="subjectAmount" 
                            name= "amount" 
                            value= {this.state.amount} 
                            onChange ={this.onChange}  
                        />                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wing" class="form-label">Wing</label>
                        <textarea 
                            className="form-control" 
                            id="wing"                            
                            rows="3" 
                            name= "wing" 
                            value= {this.state.wing}
                            onChange ={this.onChange}>                              
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pax" className="form-label">People count</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="pax" 
                            name= "pax" 
                            value= {this.state.pax} 
                            onChange ={this.onChange}  
                        />                        
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateRooms;
