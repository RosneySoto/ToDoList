const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        require: true
    }, 
    detail: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    priorityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'priority'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const model = mongoose.model('task', taskSchema);
module.exports = model;