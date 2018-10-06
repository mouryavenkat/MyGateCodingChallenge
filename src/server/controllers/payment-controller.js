
// Starts executing the template received from request body

const initialPayment = require('../../model/services/entityServices/payments/createInitialPayment');
module.exports = (app) => {
    // Group related api's
    app.route('/initialPaymentSetup')
        .post(initialPayment.AddPayment)
}
