var mongoose = require("mongoose");
var productSchema = mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    userID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    }
})
module.exports = mongoose.model("product", productSchema);