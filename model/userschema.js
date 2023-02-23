var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    userID: {
        type: String,
        unique: true,
        default: ""
    },
    fullname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        unique: true,
        default: ""
    },
    profilePic: {
        type: String,
        default: '/images/def.png'
    },
    password: {
        type: String,
        default: ""
    },
    mobileNo: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    loginType: {
        type: String,
        default: "manually"
    },
    authID: {
        type: String,
        default: "",
    },
    registerVerifyOTP: {
        type: String,
        default: "",
    },
    passwordOTP: {
        type: String,
        default: "",
    },
    activeCheck: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema);