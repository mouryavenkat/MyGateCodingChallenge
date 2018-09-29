
// Starts executing the template received from request body
const sendMail = require('../lib/sendMail');
const createGroup = require('../modal/services/entityServices/createGroup');
const getGroups = require('../modal/services/entityServices/fetchGroups');
const deleteGroup = require('../modal/services/entityServices/deleteGroup');
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
}
