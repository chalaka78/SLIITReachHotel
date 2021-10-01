const express = require ('express');
const router = express.Router(); //interface
const controller = require('../controllers/roomController');

module.exports = function () {
    router.post('/create',controller.createRoom); //referring the function
    router.get('/',controller.getAllRooms);
    return router;
};