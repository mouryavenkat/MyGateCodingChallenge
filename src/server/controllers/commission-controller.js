
// Starts executing the template received from request body

const createCommission = require('../../model/services/entityServices/adminCommision/adminCommissionDetails');
module.exports = (app) => {
    // Group related api's
    app.route('/addCommission')
        .post(createCommission.AddCommission)
}
