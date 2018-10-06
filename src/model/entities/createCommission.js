const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commissionSchema = new Schema({
    admin: { type: String, required: true, strict: true },
    groupName: { type: String, required: true, strict: true },
    bidMonth: { type: String, required: true, strict: true },
    commission: { type: Number, required: true, strict: true }
})
const createModelForCommission = () => {
    const commission = mongoose.model('commissions', commissionSchema);
    return commission;
}
module.exports.createModelForCommission = createModelForCommission;