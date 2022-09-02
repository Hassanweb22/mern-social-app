const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/auth')
const Profile = require('../../models/Profile')
const Users = require('../../models/Users');
const axios = require('axios')


const { check, validationResult } = require('express-validator/');
const config = require('config');

// @route GET api/profile/me
// @desc  get your own Profile
// @access Public

router.get('/me', authMiddleware, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id })
            .populate("user", ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" })
        }
        res.json(profile)

    } catch (err) {
        res.status(500).send("Server Error...")
        console.log(err)
    }
})

// @route POST api/profile/ 
// @desc  Create or update your own profile
// @access Public

router.post('/',
    [check('status', 'Status is Required!').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
        authMiddleware
    ],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { company, website, location, status, bio, githubusername, skills, youtube, twitter, facebook, linkedin, instagram } = req.body

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id

        if (company) profileFields.company = company;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (website) profileFields.website = website;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;

        if (skills) {
            profileFields.skills = !Array.isArray(skills) ? skills.split(",").map(skill => String(skill).trim()) : skills
        }

        // build social profile
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                console.log("profile update", profile)
                // update
                profile = await Profile.findOneAndUpdate({ user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )

                return res.status(200).send(profile)
            }
            // Create 
            profile = new Profile(profileFields)
            await profile.save()

            return res.status(200).send(profile)


        } catch (error) {
            console.log(error)
            res.status(400).json({ error })
        }

    })

// @route GET api/profile/
// @desc  get All profiles
// @access Public

router.get('/',
    async (req, res) => {

        try {
            let profile = await Profile.find({}).populate("user", ['name', 'avatar'])
            return res.status(200).send(profile)

        } catch (err) {
            console.log(err, err.kind)
            res.status(400).json({ err })
        }

    })

// @route GET api/profile/:user_id
// @desc  Create or update your own profile
// @access Public

router.get('/user/:user_id',
    async (req, res) => {

        try {
            let profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ['name', 'avatar'])

            if (profile) {
                return res.status(200).send(profile)
            }

            return res.status(404).json({ message: "Profile Not Found" })

        } catch (err) {
            if (err.kind === "ObjectId") return res.status(404).json({ message: "Profile Not Found" })
            res.status(400).json({ error: err.message })
        }

    })

// @route DELETE api/profile/:user_id
// @desc  Delete user and it's profile
// @access Public

router.delete('/', authMiddleware,
    async (req, res) => {

        try {
            // Remove Profile
            await Profile.findOneAndRemove({ user: req.user.id })
            // Remove User
            await Users.findOneAndRemove({ _id: req.user.id })

            return res.json({ message: 'User deleted' })

        } catch (err) {
            console.log({ err })
            res.status(400).json({ error: err.message })
        }

    })

// @route POST api/profile/experience
// @desc  post your new experience
// @access Public

router.post('/experience', [
    check('title', 'title is Required!').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
    authMiddleware
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        try {
            let profile = await Profile.findOne({ user: req.user.id }).populate("user", ['name', 'avatar'])
            if (!!profile) {
                profile.experience.unshift(newExp)
                await profile.save()
                return res.status(200).send(profile)
            }
            return res.status(401).json({ message: "No profile found." })

        } catch (err) {
            console.log(err, err.kind)
            res.json({ err })
        }

    })

// @route PDELETE  api/profile/experience/:id
// @desc  delete a experience by id
// @access Public

router.delete('/experience/:exp_id', authMiddleware,
    async (req, res) => {

        try {
            let profile = await Profile.findOne({ user: req.user.id }).populate("user", ['name', 'avatar'])
            if (!!profile) {
                let removeIndex = profile.experience.findIndex(x => x.id === req.params.exp_id);
                if (removeIndex > -1) {
                    profile.experience.splice(removeIndex, 1);
                    await profile.save()
                    return res.status(200).send(profile)
                }
                return res.status(401).json({ message: "No Experience found with that id" })
            }

        } catch (err) {
            console.log(err)
            res.json({ err })
        }

    })

// @route POST api/profile/education
// @desc  post your new education
// @access Public

router.post('/education', [
    check('school', 'school is Required!').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
    authMiddleware
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        try {
            let profile = await Profile.findOne({ user: req.user.id }).populate("user", ['name', 'avatar'])
            if (!!profile) {
                profile.education.unshift(newEdu)
                await profile.save()
                return res.status(200).send(profile)
            }
            return res.status(401).json({ message: "No profile found." })

        } catch (err) {
            console.log(err, err.kind)
            res.json({ err })
        }

    })

// @route DELETE  api/profile/education/:id
// @desc  delete a education by id
// @access Public


router.delete('/education/:edu_id', authMiddleware,
    async (req, res) => {

        try {
            let profile = await Profile.findOne({ user: req.user.id }).populate("user", ['name', 'avatar'])
            if (!!profile) {
                let removeIndex = profile.education.findIndex(x => x.id === req.params.edu_id);
                if (removeIndex > -1) {
                    profile.education.splice(removeIndex, 1);
                    await profile.save()
                    return res.status(200).send(profile)
                }
                return res.status(401).json({ message: "No Education found with that id" })
            }

        } catch (err) {
            console.log(err)
            res.json({ err })
        }

    })

// @route GET  api/profile/github/:username
// @desc  delete a education by id
// @access Public

router.get('/github/:username',
    async (req, res) => {
        const { username } = req.params

        let url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
        client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`

        let options = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await axios.get(url, options)

            if (response.status !== 200) {
                return res.status(404).json({ message: "No Github Profile found for this user!" })
            }

            return res.status(200).json({ data: response.data })

        }
        catch (error) {
            return res.status(500).json({ error: error.message })
        }

    })


module.exports = router;