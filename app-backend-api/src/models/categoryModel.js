const mongoose = require ('mongoose');

const categorySchema = mongoose.Schema({
    name: {type:String, required: true, trim: true},
    description: {type:String, required: true, trim: true},
    rooms: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'rooms'}] // many to many relationship
});

const Category = mongoose.model('categories', categorySchema ); //Create subject model in mongoDB
module.exports =  Category;