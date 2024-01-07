const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
    title: {
        type: String,
        require: true
    }, 
    detail: {
        type: String,
        require: true
    },
    createUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    points: {
        type: Number,
        default: 0,
        require: false
    }
});

const modelWish = mongoose.model('wishList', wishListSchema);
module.exports = modelWish;