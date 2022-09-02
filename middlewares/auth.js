const jwt = require('jsonwebtoken')
const config = require('config')

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');

    // check token exists
    if (!token) {
        return res.status(401).json({ msg: "NO token, authrization denied" })
    }

    // verify token jwt.verify(token, secret);
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'));
        req.user = decoded.user
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ msg: "Invalid Token" })
    }
}

module.exports = authMiddleware