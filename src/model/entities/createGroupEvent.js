const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const groupSchema = new Schema({
    groupName: { type: String, required: true, strict: true },
    groupBudget: { type: Number, required: true, strict: true },
    totalMembers: { type: Number, required: true, strict: true },
    fromDate: {
        year: { type: Number, required: true, strict: true },
        month: { type: Number, required: true, strict: true },
        date: { type: Number, required: true, strict: true }
    },
    toDate: {
        year: { type: Number, required: true, strict: true },
        month: { type: Number, required: true, strict: true },
        date: { type: Number, required: true, strict: true }
    },
    chitCommission: { type: Number, required: true, strict: true },
    description: { type: String, required: true, strict: true },
    totalMonths: { type: Number, required: true, strict: true },
    bidDetails: [{ bidMonth: String, biddedBy: String, biddedFor: String }],
    customers: { type: Array, required: false },
    admin: { type: String, required: true, strict: true },
    ActualPayPerMonth: { type: Number, require: true, strict: true },
    payments: { type: String }
}, { strict: false })
const createModelForGroup = () => {
    const group = mongoose.model('groups', groupSchema);
    return group;
}
module.exports.createModelForGroup = createModelForGroup;