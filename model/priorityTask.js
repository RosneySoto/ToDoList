const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prioritySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model('priority', prioritySchema);
module.exports = model;