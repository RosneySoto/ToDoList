const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    }, 
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
    },
    points: {
        type: Number,
        default: 0,
        require: false
    }
});

const model = mongoose.model('user', userSchema);
module.exports = model;