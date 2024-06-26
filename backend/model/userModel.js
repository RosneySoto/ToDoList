const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
    },
    points: {
        type: Number,
        default: 0,
        required: false
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
        default: null
    }
});

const model = mongoose.model('user', userSchema);
module.exports = model;