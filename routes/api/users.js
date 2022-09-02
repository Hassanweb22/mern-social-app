const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const brcypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const { check, validationResult } = require('express-validator/');

const User = require('../../models/Users')


// @route   Post api/users
// @desc    Register Route
// @access  Public

router.post('/',
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please! write a valid Email address').isEmail(),
    check('password', 'password Length should be greater than 6').isLength({ min: 6 })
    , async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body

        try {
            // See User exists
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }] })
            }
            // get users gravatar

            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            })

            const creatUser = new User({
                name,
                email,
                avatar,
                password
            })

            // encrypt password
            const salt = await brcypt.genSalt(10)
            creatUser.password = await brcypt.hash(password, salt)

            await creatUser.save()

            const payload = {
                user: {
                    id: creatUser.id
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