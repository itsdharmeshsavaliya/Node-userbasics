
var mongoose = require("mongoose");
var adminSchema = mongoose.Schema({    
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("admin", adminSchema);