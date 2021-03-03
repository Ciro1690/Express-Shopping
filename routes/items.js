const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
const items = require('../fakeDb')

router.get('/', function(req, res) {
    return res.json({items})
})

router.post('/', function (req, res) {
    const newItem = {name: req.body.name, price: req.body.price }
    items.push(newItem)
    return res.status(201).json({added: newItem})
})

router.get('/:name', function(req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError('Item not on list', 404)
    }
    return res.json({item: foundItem})
})

router.patch('/:name', function(req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError('Item not on list', 404)
    } 
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    return res.json({updated: { name: foundItem.name, price: foundItem.price }})    
})

router.delete('/:name', function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError('Item not on list', 404)
    } 
    items.splice(foundItem, 1)
    return res.json({message: "Deleted"})
})

module.exports = router