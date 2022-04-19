const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req,res) =>{
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    }
    catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post(
    '/',
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').exists(), 
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password} = req.body;

        try{
            let user = await User.findOne({ email });

            if(!user) {
                return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
            }
            const pl = {
                user: {
                    id: user.id,
                    usertype: user.usertype
                }
            }
            jwt.sign(pl, config.get('jwtpass'), {expiresIn: 360000}, (err, token) => {
                if(err) throw err;
                res.json({token});
            });
            
        }
        catch(err){
            console.error(err.message);
            return res.status(500).send('error from server');
        }
    }
);

router.get('/',(req,res) => {
    User.find()
        .then(user => res.json(user))
});

module.exports = router;