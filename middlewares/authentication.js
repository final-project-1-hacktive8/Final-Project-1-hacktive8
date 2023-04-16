const {verifyToken} = require('../helpers/jwt');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = verifyToken(token);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token Not Provided'});
    }
}
module.exports = authentication;