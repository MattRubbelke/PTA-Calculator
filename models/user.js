const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")
const passport = require("passport")

const userSchema = new Schema({
    user: { type: String, unique: true,  required: true },
    password: { type: String, unique: false, required: true }
});

userSchema.methods = {
    checkPassword: function (inputPassword){
        return bcrypt.compareSync(inputPassword, this.password)
    },

    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

userSchema.pre("save", function(next){
    if (!this.password){
        console.log("NO PASSWORD PROVIDED!")
        next()
    } else {
        console.log("hashPassword in pre save!");
        this.password = this.hashPassword(password)
        next()
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;