const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/profileApplicant');
const ProfileRec = require('../models/profileRecruiter');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');

router.get('/me', auth, async (req,res) => {
    try{
        let profile = await Profile.findOne({ user: req.user.id });
        let profileRec = await ProfileRec.findOne({ user: req.user.id });
        const {id, usertype} = req.user;
        if(usertype === 'Applicant'){
            profile = profile;
        }
        else if ( usertype === 'Recruiter'){
            profile = profileRec;
        }
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', [ auth, [
        check('skills','Skills is required').not().isEmpty()
    ] 
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { skills } = req.body;
        const string = new String(skills);
        const myProfile = {};
        myProfile.user = req.user.id;
        if (skills) {
            myProfile.skills = string.split(',').map(string =>  string.trim());
            console.log(myProfile.skills);
        }
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

//adding education

router.put('/education',[auth,[
        check('institute', 'Institution name is required').not().isEmpty(),
        check('startyear', 'startyear is required').not().isEmpty()  
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id});
            profile.education.unshift(req.body);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');   
        }
});

router.delete('/education/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeInd = profile.education.map(item => item.id).indexOf(req.params.id);
        profile.education.splice(removeInd,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

module.exports = router;
