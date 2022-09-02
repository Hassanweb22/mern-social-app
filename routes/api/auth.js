const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/auth')
const User = require('../../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/');


// @route api/auth login
// @desc  Test Route
// @access Public
router.get('/', authMiddleware, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select("-password")
        res.status(200).json(user)

    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Server Error " })
    }
})

// @route   Post api/auth
// @desc    Register Route
// @access  Public

router.post('/',
    check('email', 'Please! write a valid Email address').isEmail(),
    check('password', 'Password is required').exists()
    , async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body

        try {
            // See User exists
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid crentials" }] })
            }
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(400).json({ errors: [{ msg: "Invalid crentials" }] })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            // return jsonwebtoken
            jwt.sign(payload, config.get("jwtToken"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )

            // res.send("User Registered...")
        } catch (error) {
            console.error(error)
            res.status(500).json({ "error": error })
        }


    })

module.exports = router;