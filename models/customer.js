const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = Schema({
    campaing: {
        type: 'ObjectId',
        ref: 'Campaing',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phones  : {
        type: String,
    },
    address: {
        type: String,
    }
});
module.exports = mongoose.model('Customer', CustomerSchema);