const Inventory = require('../models/inventory')
const express = require('express')
const router = express.Router();

router.post('/new', (req, res) => {
    Inventory.create({
        name: req.body.name,
        price: req.body.price
    }, (err, inventory) => {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(inventory)
        }
    })
})

router.route('/:id').delete((req, res) => {
    Inventory.findById(req.params.id, (err, inventory) => {
        if (err) {
            console.log('DELETE Error: ' + err);
            res.status(500).send('Error');
        } else if (inventory) {
            inventory.remove(() => {
                res.status(200).json(inventory);
            });
        } else {
            res.status(404).send('Item not found')
        }
    })
})

module.exports = router;