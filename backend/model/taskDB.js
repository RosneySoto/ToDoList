const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    detail: {
        type: String,
        required: true
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
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false,
        default: null
    },
    pointsTask: {
        type: Number,
        required: true
    },
    completionDate: {
        type: Date,
        default: null
    }
});

const model = mongoose.model('task', taskSchema);
module.exports = model;