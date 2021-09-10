const mongoose = require ('mongoose');

const RoomSchema = new mongoose.Schema({
    code: {type:String, required: true, trim: true},    
    amount: { type: Number, required: true},
    wing: {type:String, required: true, trim: true},
    pax: { type: Number, required: true},
    categories: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'categories'}] // many to many relationship
});

const Room = mongoose.model('rooms', RoomSchema ); //Create model in mongoDB
module.exports =  Room;