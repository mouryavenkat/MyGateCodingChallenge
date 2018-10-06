const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String, required: true, strict: true },
    mobileNumber: { type: Number, strict: true },
    emailId: { type: String, required: true, strict: true },
    gender: { type: String, required: true, strict: true },
    managedBy: { type: String, required: true, strict: true },
    governmentProof: { type: String } // Later need to be modified as string.
})
const createModelForUser = () => {
    const user = mongoose.model('users', UserSchema);
    return user;
}
module.exports.createModelForUser = createModelForUser;