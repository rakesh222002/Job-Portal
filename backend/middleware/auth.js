const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({ msg: 'No Token'});
    }

    try {
        const verified = jwt.verify(token, config.get('jwtpass'));
        req.user = verified.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is invalid'});
    }
}