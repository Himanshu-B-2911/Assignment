const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Product = require('../models/product');


// Base path: http://localhost:3000/employees;


// Get Api
router.get('/', (req, res)=> {
    Product.find( (err, doc) =>{
        if(err){
            console.log('Error in Get Data'+err)
        }else{
            res.send(doc);
        }
    })
});


// Get Single Employee Api
router.get('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){
        Product.findById(req.params.id, (err, doc) =>{
            if(err){
                console.log('Error in Get Product by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});


// Post Api
router.post('/', (req, res)=> {
    let pro = new Product({
        name : req.body.name,
        sku: req.body.sku,
        description : req.body.description,
        price : req.body.price,
        stock_value : req.body.stock_value
    });

    pro.save( (err, doc)=>{
        if(err){
            console.log('Error in Post Data'+err)
        }else{
            res.send(doc);
        }
    })
});

// Put Api
router.put('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){

        let pro = {
        name : req.body.name,
        sku: req.body.sku,
        description : req.body.description,
        price : req.body.price,
        stock_value : req.body.stock_value
        };

        Product.findByIdAndUpdate(req.params.id, {$set :pro}, {new:true}, (err, doc) =>{
            if(err){
                console.log('Error in Update Product by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});

// Delete Api
router.delete('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){
        Product.findByIdAndRemove(req.params.id, (err, doc) =>{
            if(err){
                console.log('Error in Delete Product by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});

module.exports = router;