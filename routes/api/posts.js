const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/auth')
const Post = require('../../models/Post')
const Users = require('../../models/Users')

const { check, validationResult } = require('express-validator/');

// @route POST api/posts/ 
// @desc  Create or update Post
// @access Public

router.post('/',
    [check('text', 'text is Required!').not().isEmpty(), authMiddleware],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await Users.findById(req.user.id)

            let newPost = new Post({
                user: req.user.id,
                text: req.body.text,
                name1: user.name,
                avatar: user.avatar,
            })

            await newPost.save().then(post => {
                return res.status(200).send(post)
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({ error })
        }

    })

// @route GET api/post/
// @desc  Get All Posts
// @access private

router.get('/',
    async (req, res) => {
        try {
            let posts = await Post.find().sort({ date: -1 })
            if (!!posts.length) return res.status(200).send(posts)

            return res.status(400).json({ message: 'No Posts available' })

        } catch (error) {
            return res.status(400).json({ error: err.message })
        }

    })

// @route GET api/posts/:post_id
// @desc  Get individual Post
// @access private

router.get('/:post_id',
    async (req, res) => {
        try {
            let post = await Post.findById(req.params.post_id)
            if (post) return res.status(200).send(post)

            return res.status(400).json({ message: 'Post Not Found' })

        } catch (err) {
            if (err.kind === "ObjectId") return res.status(404).json({ message: "Post Not Found" })
            return res.status(400).json({ error: err.message })
        }

    })

// @route DELETE api/posts/:id
// @desc  delete Post
// @access private

router.delete('/:post_id', authMiddleware,
    async (req, res) => {

        try {
            let post = await Post.findById(req.params.post_id)
            if (!post) {
                return res.status(404).json({ message: "Post Not Found" })
            }
            if (post.user.toString() !== req.user.id) {
                return res.status(404).json({ message: "User not authorized" })
            }
            await post.remove()

            return res.json({ success: true, message: "Post Removed" })

        } catch (err) {
            if (err.kind === "ObjectId") return res.status(404).json({ message: "Post Not Found" })
            return res.status(400).json({ error: err.message })
        }

    })

// @route POST api/posts/like/:post_id
// @desc  like the Post
// @access private
router.post('/like/:post_id', authMiddleware,
    async (req, res) => {

        try {
            let post = await Post.findById(req.params.post_id)
            if (!post) {
                return res.status(404).json({ message: "Post Not Found" })
            }
            if (post.likes.filter(x => x.user.toString() === req.user.id).length > 0) {
                return res.status(404).json({ message: "You have already liked the post" })
            }
            post.likes.unshift({ user: req.user.id })
            await post.save()

            return res.status(200).json({ post })

        } catch (err) {
            if (err.kind === "ObjectId") return res.status(404).json({ message: "Post Not Found" })
            return res.status(400).json({ error: err.message })
        }

    })

// @route POST api/posts/unlike/:post_id
// @desc  unlike the Post
// @access private
router.post('/unlike/:post_id', authMiddleware,
    async (req, res) => {

        try {
            let post = await Post.findById(req.params.post_id)
            if (!post) {
                return res.status(404).json({ message: "Post Not Found" })
            }
            if (post.likes.filter(x => x.user.toString() === req.user.id).length === 0) {
                return res.status(404).json({ message: "You didnt like the post" })
            }
            let removeIndex = post.likes.findIndex(x => x.user.toString() === req.user.id)
            post.likes.splice(removeIndex, 1)
            await post.save()

            return res.status(200).json({ post })

        } catch (err) {
            if (err.kind === "ObjectId") return res.status(404).json({ message: "Post Not Found" })
            return res.status(400).json({ error: err.message })
        }

    })

// @route POST api/posts/comment/:post_id
// @desc  post the cpmment
// @access private
router.post('/comment/:post_id',
    [check('text', 'text is Required!').not().isEmpty(), authMiddleware],
    async (req, res) => {

        try {
            let post = await Post.findById(req.params.post_id)
            let user = await Users.findById(req.user.id)
            if (!post) {
                return res.status(404).json({ message: "Post Not Found" })
            }
            let newComment = {
                text: req.body.text,
                user: req.user.id,
                name: user.name,
                avatar: user.avatar,
            }

            post.comments.unshift(newComment)
            await post.save()

            return res.status(200).json({ post })

        } catch (err) {
            if (err.kind === "ObjectId") return res.status(404).json({ message: "Post/comment Not Found" })
            return res.status(400).json({ error: err.message })
        }

    })

// @route POST api/posts/comment/:post_id/:comm_id
// @desc  post the cpmment
// @access private
router.delete('/comment/:post_id/:comm_id', authMiddleware,
    async (req, res) => {
        let { post_id, comm_id } = req.params
        try {
            let post = await Post.findById(post_id)
            if (!post) {
                return res.status(404).json({ message: "Post Not Found" })
            }
            let comment = post.comments.find(x => x.id === comm_id)
            if (!comment) {
                return res.status(500).json({ message: "comment doesn't exists!" })
            }
            if (comment.user.toString() !== req.user.id) {
                return res.status(500).json({ message: "You can't delete others comments" })
            }
            let removeIndex = post.comments.findIndex(x => x.id === comm_id)
            post.comments.splice(removeIndex, 1)
            await post.save()

            return res.status(200).json({ post })

        } catch (err) {
            if (err.kind === "ObjectId") return res.status(404).json({ message: "Post Not Found" })
            return res.status(400).json({ error: err.message })
        }

    })


module.exports = router;