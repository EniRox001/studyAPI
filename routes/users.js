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

router.get('/friends/', userController.user_friends_get);

router.post('/friends/add', userController.user_friends_add_post);

router.get('/friends/:friend_id', userController.user_friends_view_get);

router.post('/friends/delete', userController.user_friends_delete_post);

router.get('/group/', userController.user_group_get);

router.post('/group/add', userController.user_group_add_post);

router.get('/group/group', userController.user_group_get);

router.post('/group/delete', userController.user_group_delete_post);

router.get('/interests/', userController.user_interests_get);

router.post('/interests/add', userController.user_interests_add_post);

router.post('/interests/delete', userController.user_interests_delete_post);


module.exports = router