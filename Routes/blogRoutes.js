const express = require('express')
const router = express.Router();
const blogControllers = require('../controllers/blogControllers')

router.get('/',blogControllers.blog_index)

router.post('/',blogControllers.blog_create_post)

router.get('/create',blogControllers.blog_create_get)

router.delete('/:id',blogControllers.blog_delete)

router.get('/:id', blogControllers.blog_details)


module.exports = router;