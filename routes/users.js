const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.user_list);

router.post('/user/:id', userController.user_detail);

router.post('/create', userController.user_create_post);

router.post('/login', userController.user_login_post);

router.post('/logout', userController.user_logout_post);

router.post('/delete/:id', userController.user_delete_post);

router.post('/update/:id', userController.user_update_post);

router.post('/update/:id/email', userController.user_update_email_post);

router.post('/update/:id/password', userController.user_update_password_post);

module.exports = router