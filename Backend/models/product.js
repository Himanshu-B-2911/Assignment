const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    name : {type: String},
    sku: {type: String},
    description: {type: String},
    price: {type : Number},
    stock_value: {type : Number}
});

module.exports = Product;