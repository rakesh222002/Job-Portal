const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/profileRecruiter');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const Job = require('../models/job');

router.get('/me', auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id });
        if(!profile){
            return res.status(400).json({ msg: 'No profile of the user'});
        }
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', [ auth, [
        check('contact','Contacts is required').not().isEmpty()
        ] 
    ], 
    async (req, res) => {
        const { contact,bio } = req.body;

        const myProfile = {};
        myProfile.user = req.user.id;
        if (contact) myProfile.contact = contact
        if (bio) myProfile.bio = bio
        try{
            let profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: myProfile }, 
                { new: true, upsert: true, setDefaultsOnInsert: true  });
            return res.json(profile);
        }

        catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'email'])
        res.json(profiles);
    }
    catch(err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//getting profile by userid

router.get('/user/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id}).populate('user', ['name', 'email']);
        if(!profile) return res.status(400).json({ msg : 'No user' });
        res.json(profile);
    }
    catch(err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//deleting user & profile
router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});
        res.json({ msg: 'user deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/jobs', [ 
    auth, 
        [
            check('jobname','job name is required').not().isEmpty(),
            check('maxApplicants','Maximum number of applicants required, Numeric').isNumeric().not().isEmpty(),
            check('maxPositions','Maximum number of Positions required, Numeric').isNumeric().not().isEmpty(),
            check('deadline','Deadline is required,').not().isEmpty(),
            check('duration','Duration of job is required, Numeric').isNumeric().not().isEmpty(),
            check('jobtype','Jobtype is required').not().isEmpty(),
            check('salary','Salary is required, Numeric').isNumeric().not().isEmpty() 
        ]
    ]
    ,async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { jobname, maxApplicants, maxPositions, deadline, duration, jobtype, salary, skills } = req.body;
        const newJob = {};

        newJob.user = req.user.id;
        if(jobname)newJob.jobname = jobname;
        if(maxApplicants)newJob.maxApplicants = maxApplicants;
        if(maxPositions)newJob.maxPositions = maxPositions;
        if(deadline)newJob.deadline = deadline;
        if(duration)newJob.duration = duration;
        if(jobtype)newJob.jobtype = jobtype;
        if(salary)newJob.salary = salary;
        const string = new String(skills);
        if (skills) {
            newJob.skills = string.split(',').map(string =>  string.trim());
            console.log(newJob.skills);
        }
        try {
            /*let job = await Job.findOneAndUpdate({ jb: req.id }, { $set: newJob }, 
                { new: true, upsert: true, setDefaultsOnInsert: true  });
                */
            let job = new Job(newJob);
            await job.save();
            return res.json(newJob);  
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

router.get('/jobs/recruiter', auth, async (req, res) => {
    try {
        const jobs = await Job.find( {user: req.user.id } ).populate('user', ['name', 'email'])
        res.json(jobs);
    }
    catch(err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/jobs', async (req, res) => {
    try {
        const profiles = await Job.find( ).populate('user', ['name', 'email'])
        res.json(profiles);
    }
    catch(err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/jobs/:id', auth, async (req, res) => {
    try {
        await Job.findOneAndRemove({_id: req.params.id});
        res.json({ msg: 'Job deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;