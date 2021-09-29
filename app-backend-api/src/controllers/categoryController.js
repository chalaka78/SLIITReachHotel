const Category = require('../models/categoryModel');
const createCategory = async (req, res) => {
    if (req.body) {
        const category = new Category(req.body);
        await category.save()
        .then(data => {
            res.status(200).send({data: data})  //pass data as the response to the frontend
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}

const getAllCategories = async (req, res) => {
    if (req.body) {        
        await Category.find({}).populate('rooms', 'name description ')
        .then(data => {
            res.status(200).send({data: data})  //pass data as the response to the frontend
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}

const getRoomsForCategories = async (req, res) => {
    if (req.params && req.params.id) {        
        const category = await Category.findById(req.params.id).populate('rooms', 'name description')
        .then(data => {
            res.status(200).send({rooms: data.rooms})  //pass data as the response to the frontend
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getRoomsForCategories,
    //calculateAmount
};