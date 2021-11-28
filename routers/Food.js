const express = require('express')
const { Food } = require('../model/Food')
const router = express.Router()

router.get('/', async (req, res) => {
    Food.find().populate('category').then(foods => {
        if(foods) {
            return res.status(200).send(foods);
        } else {
            return res.status(404).json({message: 'No foods found!'});
        }
    })
    .catch(err => res.status(500).json({message: err}));
});

router.get('/:id', async (req, res) => {
    Food.findById(req.params.id).populate('category')
    .then(food => {
        if(food) {
            return res.status(200).send(food);
        } else {
            return res.status(404).json({message: 'Sorry, food not found!'});
        }
    })
    .catch(err => res.status(500).json({message: 'Sorry, food not found!'}));
})

router.post('/', async (req, res) => {
    const food = new Food({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        servingSize: req.body.servingSize,
        category: req.body.category,
        ingredients: req.body.ingredients,
        timeprepare: req.body.timeprepare,
    });
    food.save()
    .then(result => {
        if(result) {
            return res.status(200).json({success: true, message: 'Food has been created.'});
        } else {
            return res.json({success: false, message: "Failed to create food!"});
        }
    })
    .catch(err => res.status(500).json({success: false, error: err}));
});

router.put('/:id', async (req, res) => {
    Food.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            servingSize: req.body.servingSize,
            category: req.body.category,
            ingredients: req.body.ingredients,
            timeprepare: req.body.timeprepare,
        },
        { new: true}
    )
    .then(food => {
        if(food) {
            return res.status(200).json({success: true, food: food});
        } else {
            return res.status(404).json({success: false, message: "Sorry, Food not found!"})
        }
    })
    .catch(err => res.status(500).json({success: false, error: err}));
});

router.delete('/:id', async (req, res) => {
    Food.findByIdAndRemove(req.params.id)
    .then(food => {
        if(food) {
            return res.status(200).json({success: true, message: "Food has been deleted."});
        } else {
            return res.status(404).json({success: false, message: "Sorry, food not found!"});
        }
    })
    .catch(err => res.status(500).json({success: false, error: err}));
});

module.exports = router;