//create user schema and model here 

var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    image: String,
    
    friends: {
        type: [Schema.Types.ObjectId],
        ref: 'Friends'
    },
    interests: [String],
    group: {
        type: Schema.Types.ObjectId
    }
});

// Virtual for user's full name
UserSchema
.virtual('name')
.get(function () {
    return this.first_name + ' ' + this.last_name;
});

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
    return '/users/' + this._id;
});

//hash password before saving to database
UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//login user by comparing password hash
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



var User = mongoose.model('User', UserSchema);

module.exports = User;