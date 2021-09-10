const express = require ('express');
const router = express.Router(); //interface
const controller = require('../controllers/categoryController');

module.exports = function () {
    router.post('/create',controller.createCategory); //referring the function
    router.get('/',controller.getAllCategories);
    //router.get('/:id',controller.getRoomsForCategories);
    //router.get('/amount/:id',controller.calculateAmount);
    return router;
};