const mongoose = require('mongoose');

const  jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    jobname: {
        type: String,
        required: true
    },
    maxApplicants: {
        type: Number,
        required: true
    },
    maxPositions: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    jobtype: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    appliedPositions: {
        type: Number,
        default: "0"
    }, 
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = job = mongoose.model('job',jobSchema);