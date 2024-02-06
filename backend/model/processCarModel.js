const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const processCarSchema = new Schema({
    idCar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shopCar'
    },
    pointValue: {
        type: Number
    },
    purchase_date: {
        type: Date,
    },
});

const model = mongoose.model('processCar', processCarSchema);
module.exports = model;