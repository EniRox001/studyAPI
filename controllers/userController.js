const User = require('../models/user');
const async = require('async');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

//============== API ROUTES USER CRUD ==============//

// create api route to get all users

exports.user_list = function(req, res, next) {
   User.find()
        .sort([['first_name', 'ascending']])
        .then(users => res.send(users))
        .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
    };


// create api route to get user by id

exports.user_detail = function(req, res, next) {    
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
    };
       
// create api route to create user

exports.user_create_post = [
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').trim().isLength({ min: 1 }).escape().withMessage('last name must be specified.')
        .isAlphanumeric().withMessage('last name has non-alphanumeric characters.'),
    body('email').trim().isLength({ min: 1 }).escape().withMessage('email must be specified.')
        .isEmail().withMessage('email is not valid.'),
    body('password').trim().isLength({ min: 1 }).escape().withMessage('password must be specified.')
        .isAlphanumeric().withMessage('password has non-alphanumeric characters.'),
    body('age').trim().isLength({ min: 1 }).escape().withMessage('age must be specified.')
        .isNumeric().withMessage('age is not valid.'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors.array());
        } else {
            // check if user already exists

            User.find({email: req.body.email})
                .then(user => {
                    if (user.length > 0) {
                        res.send('user already exists');
                    } else {
                        var user = new User({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: req.body.password,
                            age: req.body.age,
                            image: req.body.image,
                            friends: req.body.friends,
                            interests: req.body.interests,
                            group: req.body.group
                        });
                        user.save()
                            .then(user => res.send(user))
                            .catch(err => console.log(err));
                    }
                }
            );
        }   
    }
];

// create api route to find user by email and password

exports.user_login_post = [
    body('email').trim().isLength({ min: 1 }).escape().withMessage('email must be specified.')
        .isEmail().withMessage('email is not valid.'),
    body('password').trim().isLength({ min: 1 }).escape().withMessage('password must be specified.')   
        .isAlphanumeric().withMessage('password has non-alphanumeric characters.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors.array());
        } else {
            User.find({email: req.body.email})
                .then(user => {
                    if (user.length > 0) {
                        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                            if (result) {
                                res.send(user);
                            }
                            else {
                                res.send('password is incorrect');
                            }
                        });
                    } else {
                        res.send('user not found');
                    }
                }
            );
        }
    }
];

// create api route to logout user

exports.user_logout_post = function(req, res, next) {
    res.send('logout');
}

// create api route to update field that have been changed

exports.user_update_post = [
    body('first_name').trim().escape(),
    body('last_name').trim().escape(),
    body('age').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors.array());
        } else {
            User.findById(req.params.id)
    
            .then(user => {
                if (req.body.first_name) {
                    user.first_name = req.body.first_name;
                }  
                if (req.body.last_name) {
                    user.last_name = req.body.last_name;
                }
                if (req.body.age) {
                    user.age = req.body.age;
                }
                user.save()
                    .then(user => res.send(user))
                    .catch(err => console.log(err));
            })
            .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
        }
    }
];

// create api route to change email

exports.user_update_email_post = [
    body('email').trim().isLength({ min: 1 }).escape().withMessage('email must be specified.')
        .isEmail().withMessage('email is not valid.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors.array());
        } else {
            User.findById(req.params.id)
                
            .then(user => {
                user.email = req.body.email;
                user.save()
                    .then(user => res.send(user))
                    .catch(err => console.log(err));
            })
            .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
        }
    }
];

// create api route to change password

exports.user_update_password_post = [
    
    body('password').trim().isLength({ min: 1 }).escape().withMessage('password must be specified.')
        .isAlphanumeric().withMessage('password has non-alphanumeric characters.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors.array());
        } else {
            User.findById(req.params.id)

            .then(user => {
                user.password = req.body.password;
                user.save()
                    .then(user => res.send(user))
                    .catch(err => console.log(err));
            })
            .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
        }
    }
];


// create api route to delete user by id

exports.user_delete_post = function(req, res, next) {
    User.findByIdAndRemove(req.params.id)
        .then(user => res.send(user))
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}


//============== API ROUTES FRIENDS CRUD ==============//

// create api route to view all friends

exports.user_friends_get = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => res.send(user.friends))
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}

// create api route to add friend

exports.user_friends_add_post = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            user.friends.push(req.body.friend);
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));
        })
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}

// create api route to view specific friend

exports.user_friends_view_get = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            let friend = user.friends.id(req.params.friend_id);
            res.send(friend);
        })
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}

// create api route to delete friend

exports.user_friends_delete_post = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            user.friends.pull(req.body.friend);
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));
        })
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}

//============== API ROUTES GROUP CRUD ==============//


// create api route to view group

exports.user_group_get = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => res.send(user.group))
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}


// create api route to add group

exports.user_group_add_post = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            user.group.push(req.body.group);
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));
        })
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}

// create api to remove group

exports.user_group_delete_post = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            user.group.pull(req.body.group);
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));    
        })
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}

//============== API ROUTES INTERESTS CRUD ==============//

// create api route to view interests

exports.user_interests_get = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => res.send(user.interests))
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}

// create api route to add interest

exports.user_interests_add_post = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            user.interests.push(req.body.interest);
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));
        })
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}

// create api route to delete interest 

exports.user_interests_delete_post = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            user.interests.pull(req.body.interest);
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));
        })
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
}    