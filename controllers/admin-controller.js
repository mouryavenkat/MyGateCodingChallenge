
// Starts executing the template received from request body

const createAdmin = require('../modal/services/entityServices/admin/createAdmin');
const fetchAdmin = require('../modal/services/entityServices/admin/fetchAdmin');
module.exports = (app) => {
    // Group related api's
    app.route('/createAdmin')
        .post(createAdmin.createAdmin);
    app.route('/fetchGroups')
        .get(fetchAdmin.fetchAdminDetails);
}
