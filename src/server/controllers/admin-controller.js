
// Starts executing the template received from request body

const createAdmin = require('../../model/services/entityServices/admin/createAdmin');
const fetchAdmin = require('../../model/services/entityServices/admin/fetchAdmin');
const updateAdmin = require('../../model/services/entityServices/admin/updateAdminWithTeams');
module.exports = (app) => {
    // Group related api's
    app.route('/createAdmin')
        .post(createAdmin.createAdmin);
    app.route('/fetchGroups')
        .get(fetchAdmin.fetchAdminDetails);
    app.route('/addTeamsUnderAdmin')
        .put(updateAdmin.AddteamsToAdmin);
}