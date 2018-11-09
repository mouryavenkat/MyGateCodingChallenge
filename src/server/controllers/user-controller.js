
// Starts executing the template received from request body

const createUser = require('../../model/services/entityServices/user/createUser');
const fetchUser = require('../../model/services/entityServices/user/fetchUser');
const fetchUserAndPayments = require('../../model/services/entityServices/user/fetchUsersAndPayments');
module.exports = (app) => {
    // Group related api's
    app.route('/createUser')
        .post(createUser.createUser);
    app.route('/fetchUsers')
        .get(fetchUser.fetchUser);
    app.route('/fetchUsersAndPayments')
        .get(fetchUserAndPayments.fetchUsersAndPayments);
}
