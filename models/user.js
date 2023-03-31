//create user schema and model here 

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstMame: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    friends: {
        type: [Schema.Types.ObjectId],
        ref: 'Friends'
    },
    interests: [String],
    group: {
        type: Schema.Types.ObjectId
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;