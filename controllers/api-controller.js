
// Starts executing the template received from request body
const sendMail = require('../lib/sendMail');
const createGroup = require('../modal/services/entityServices/Group/createGroup');
const getGroups = require('../modal/services/entityServices/Group/fetchGroups');
const deleteGroup = require('../modal/services/entityServices/Group/deleteGroup');
const updateGroup = require('../modal/services/entityServices/Group/updateGroup');
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
}
