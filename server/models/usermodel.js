const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, "Email is not valid"]
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"]
    },
    country: {
        type: String,
        default: "",
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw new Error("Invalid password");
    }
    throw new Error("Invalid email");
};

const User = mongoose.model('User', userSchema);

module.exports = {User};
