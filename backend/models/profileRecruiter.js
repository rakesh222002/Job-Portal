const mongoose = require('mongoose');

const profileRecruiterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    contact: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: false
    }
});

module.exports = profileRecruiter = mongoose.model('profileRecruiter',profileRecruiterSchema);