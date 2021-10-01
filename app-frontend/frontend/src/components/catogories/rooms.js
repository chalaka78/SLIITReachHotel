import axios from 'axios';
import React, {Component} from 'react';
import { render } from 'react-dom';

class Rooms extends Component {
    constructor (props) {
        super (props);
        this.state = {
            rooms: [],
            totalAmount : ''
        }
    }

    componentDidMount() {        
        axios.get(`http://localhost:8080/category/${this.props.match.params.id}`)
        .then ( response => {
            console.log('DATA', response.data.rooms)
            this.setState({ rooms:response.data.rooms})
        })
        .catch (error => {
            alert(error.message)
        })

        axios.get(`http://localhost:8080/category/amount/${this.props.match.params.id}`)
        .then ( response => {
            console.log('DATA', response.data.totalAmount)
            this.setState({ totalAmount: response.data.totalAmount })
        })
    }

    render() {
        return (
            <div className = "container">
                <h1>Category Rooms</h1>
                <h3>Total Amount: {this.state.totalAmount}</h3>
                {this.state.rooms.length > 0 && this.state.rooms.map((item,index) => (
                    <div key = {index} className = "card mb-3">
                        <div className = "p-3" >
                            <h4>Room code: {item.code}</h4>
                            <h6>Amount: {item.amount}</h6>
                            <h6>Wing: {item.wing}</h6>
                            <h6>Pax: {item.pax}</h6>
                        </div>                      
                    </div>
                ))}

            </div>
        )
    }
}

export default Rooms;