const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name: { type: String, required: true, strict: true },
    mobileNumber: { type: Number, strict: true },
    emailId: { type: String, required: true, strict: true },
    password: { type: String, strict: true },
    governmentProof: { type: String }, // Later need to be modified as string.
    teams: { type: Array }
})
const createModelForAdmin = () => {
    const admin = mongoose.model('admins', adminSchema);
    return admin;
}
module.exports.createModelForAdmin = createModelForAdmin;