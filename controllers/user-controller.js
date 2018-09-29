
// Starts executing the template received from request body

const createUser = require('../modal/services/entityServices/user/createUser');
const fetchUser = require('../modal/services/entityServices/user/fetchUser');
module.exports = (app) => {
    // Group related api's
    app.route('/createUser')
        .post(createUser.createUser);
    app.route('/fetchUsers')
        .get(fetchUser.fetchUser);
}
