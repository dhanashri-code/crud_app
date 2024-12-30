const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },

});

const users = new mongoose.model("dhanashri",userSchema);


module.exports = users;