
// Starts executing the template received from request body
const sendMail = require('../lib/sendMail');
const createGroup = require('../../model/services/entityServices/Group/createGroup');
const getGroups = require('../../model/services/entityServices/Group/fetchGroups');
const deleteGroup = require('../../model/services/entityServices/Group/deleteGroup');
const updateGroup = require('../../model/services/entityServices/Group/updateGroup');
const fetchUsersUnderGroup = require('../../model/services/entityServices/Group/fetchUsersUnderGroup');
const updatePayments = require('../../model/services/entityServices/Group/updatePayments')
module.exports = (app) => {
    app.route('/healthCheck')
        .get((req, res) => {
            res.json({ code: 200, message: 'Successfully running' });
        });
    app.route('/sendMail')
        .post(sendMail.sendMail);
    app.route('/searchInfo')
        .post((req, res) => {
            console.log(JSON.stringify(req.body));
            res.json({
                searchInfo: {
                    "items": [
                        {
                            "attributes": [
                                {
                                    "keyId": "keyId",
                                    "keyLabel": "keyLabel",
                                    "valueId": "string",
                                    "label": "string"
                                },
                                {
                                    "keyId": "keyId1",
                                    "keyLabel": "keyLabel1",
                                    "valueId": "string1",
                                    "label": "string1"
                                }
                            ]
                        },{
                            "attributes": [
                                {
                                    "keyId": "keyId",
                                    "keyLabel": "keyLabel",
                                    "valueId": "string",
                                    "label": "string"
                                },
                                {
                                    "keyId": "keyId1",
                                    "keyLabel": "keyLabel1",
                                    "valueId": "string1",
                                    "label": "string1"
                                }
                            ]
                        }]
                }
            })
        })


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
    app.route('/updateUserPayments')
        .put(updatePayments.updatePayments);
}
