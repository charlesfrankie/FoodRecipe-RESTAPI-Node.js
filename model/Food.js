const mongoose = require('mongoose')
const { Category } = require('./Categories')

const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true
    },
    servingSize: Number,
    timeprepare: String,
    ingredients: [String],
});

exports.Food = mongoose.model('Food', FoodSchema);