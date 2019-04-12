const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const RevokedSessionSchema = new mongoose.Schema({

    session: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

})

RevokedSessionSchema.plugin(timestamp);
module.exports = mongoose.model('Revoked', RevokedSessionSchema);