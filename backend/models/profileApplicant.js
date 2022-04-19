const mongoose = require('mongoose');

const profileApplicantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    skills: {
        type: [String],
        required: true
    },
    education: [
         {
             institute: {
                 type: String,
                 required: true
             },
             startyear: {
                type: Date,
                required: true
             },
             endyear: {
                 type: Date
             }
         }
     ]
});

module.exports = profileApplicant = mongoose.model('profileApplicant',profileApplicantSchema);