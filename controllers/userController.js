const User = require('../models/user');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Get list of all users in the database
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Get list of all users')
}

// Post request to register a user into the database
exports.register_user = function(req, res) {
    res.send('NOT IMPLEMENTED: Register user')
}