const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    detail: {
        type: String,
        required: true
    },
    createUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    points: {
        type: Number,
        default: 0,
        required: false
    }
});

const modelWish = mongoose.model('wishList', wishListSchema);
module.exports = modelWish;