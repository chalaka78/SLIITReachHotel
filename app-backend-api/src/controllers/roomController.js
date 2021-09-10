const Room = require('../models/roomModel');

const createRoom = async (req, res) => {
    if (req.body) {
        const room = new Room(req.body);
        room.save()
        .then(data => {
            res.status(200).send({data: data})  
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}



module.exports = {
    createRoom,
    //getAllRooms
};