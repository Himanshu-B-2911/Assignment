const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ProductDB', (err)=>{
    if(!err){
        console.log('Database Connection Successful')
    }else{
        console.log('Error in Connection' + err)
    }
})

module.exports = mongoose;