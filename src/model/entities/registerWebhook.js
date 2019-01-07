const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const webhookSchema = new Schema({
    callbackURL: { type: String, strict: true, required: true },
    emailId: { type: String, strict: true },
    name: { type: String, required: true, strict: true },
    hooktype: { type: String, require: true, strict: true }
})

const createModelForWebhook = () => {
    const webhookmodel = mongoose.model('webhook', webhookSchema);
    return webhookmodel;
}
module.exports.createModelForWebhook = createModelForWebhook;