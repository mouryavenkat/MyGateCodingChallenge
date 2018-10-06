
// Starts executing the template received from request body
const sendMail = require('../lib/sendMail');
const createGroup = require('../../model/services/entityServices/Group/createGroup');
const getGroups = require('../../model/services/entityServices/Group/fetchGroups');
const deleteGroup = require('../../model/services/entityServices/Group/deleteGroup');
const updateGroup = require('../../model/services/entityServices/Group/updateGroup');
const fetchUsersUnderGroup = require('../../model/services/entityServices/Group/fetchUsersUnderGroup');
module.exports = (app) => {
    app.route('/healthCheck')
        .get((req, res) => {
            res.json({ code: 200, message: 'Successfully running' });
        });
    app.route('/sendMail')
        .post(sendMail.sendMail);

    // Group related api's
    app.route('/createGroup')
        .post(createGroup.createGroup);
    app.route('/fetchGroups')
        .get(getGroups.fetchGroupDetails);
    app.route('/deleteGroup')
        .delete(deleteGroup.DeleteGroupDetails);
    app.route('/updateGroup')
        .put(updateGroup.updateGroup)
    app.route('/fetchUsersUnderGroup')
        .get(fetchUsersUnderGroup.fetchUsersUnderGroup)
}
