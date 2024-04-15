const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    nameGroup: {
        type: String,
        required: true
    }
});

const model = mongoose.model('group', groupSchema);
module.exports = model;