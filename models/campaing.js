const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampaingSchema = Schema({
    code: {
        type: Number,
        required: [true, 'code_required'],
        unique: [true, 'code_unique'],
    },
    name: {
        type: String,
    },
});
module.exports = mongoose.model('Campaing', CampaingSchema);