const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

//user registration
router.post(
    '/',
    [
        check('name', 'Name required').not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'Password should have 8 characters minimum').isLength({ min:8 }),
        check('usertype', 'select jobtype').not().isEmpty(), 
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, usertype} = req.body;

        try{
            let user = await User.findOne({ email });

            if(user) {
                return res.status(400).json({errors: [{msg: 'User already exist'}]})
            }

            user = new User({
                name,
                email,
                password,
                usertype
            });
            const bct = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, bct);
            await user.save();
            const pl = {
                user: {
                    id: user.id,
                    usertype: user.usertype,
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