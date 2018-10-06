const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    admin: { type: String, required: true, strict: true },
    groupName: { type: String, strict: true },
    paymentMonth: { type: String, required: true, strict: true },
    paymentDetails: [
        {
            emailId: String,
            AmountToBePaid: Number,
            DiscountFareAfterBid: Number,
            AmountPaid: [{
                amount: Number,
                paidOn: String
            }],
            balanceAmount: Number
        }
    ]
})
const createModelForPayment = () => {
    const payments = mongoose.model('payments', paymentSchema);
    return payments;
}
module.exports.createModelForPayment = createModelForPayment;