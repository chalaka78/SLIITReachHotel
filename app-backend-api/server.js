const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const roomAPI = require('./src/api/roomAPI'); //import api file
const categoryAPI = require('./src/api/categoryAPI');

dotenv.config(); //configure dotenv
const app = express(); //instance of express dependency
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex : true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
    
}, (error) => {
    if(error){
        console.log('Database Error:', error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Synced');
});

app.route('/').get((req,res) => {
    res.send('WELCOME TO SLIIT-REACH HOTEL!');
});

app.use('/room', roomAPI()); //calling functions to return endpoints
app.use('/category', categoryAPI());

app.listen(PORT, () => {
        console.log('Server is up and running on PORT ${PORT}');
} )