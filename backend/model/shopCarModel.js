const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopCarSchema = new Schema({
    items: [
        {
            deseoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'wishList'
            },
            amount: {
                type: Number,
                required: true,
                default: 0
            },
            total_Points: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    purchase_date: {
        type: Date,
        default: null
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    total_Points_Car: {
        type: Number,
        default: 0
    }
});

const model = mongoose.model('shopCar', shopCarSchema);
module.exports = model;