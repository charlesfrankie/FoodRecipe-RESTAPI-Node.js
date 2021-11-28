const express = require('express')
const router = express.Router()
const {Category} = require('../model/Categories')

router.get('/', async (req, res) => {
    Category.find().then((categories) => {
        res.status(200).send(categories)
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        image: req.body.image,
    });

    category.save((result, err) => {
        if(err) {
            res.send(err);
        }
        else {
            res.status(200).send(result);
        }
    });
});

router.put('/:id', async (req, res) => {
    Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
        },
        { new: true}
    )
    .then(category => {
        if(category) {
            return res.status(200).send(category);
        } else {
            return res.status(404).json({message: "Category is not found"});
        }
    })
    .catch(err => res.status(500).send(err));
});

router.delete('/:id', async (req, res) => {
    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        if(category) {
            return res.status(200).json({success: true, message: "The category has been deleted."});
        } else {
            return res.status(404).json({sucess: false, message: "Category is not found!"});
        }
    })
    .catch(err => res.status(500).json({sucess: false, error: err}));
})

module.exports = router;
