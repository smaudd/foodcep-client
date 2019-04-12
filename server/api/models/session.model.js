const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const SessionSchema = new mongoose.Schema({

    session: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

})

SessionSchema.plugin(timestamp);
module.exports = mongoose.model('Session', SessionSchema);