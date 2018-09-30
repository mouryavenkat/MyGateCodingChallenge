const readOperation = require('../../CrudOperations/read');
const logger = require('../../../../config/logger').getLogger();
const createGroupEntity = require('../../../entities/createGroupEvent');
const createOperation = require('../../CrudOperations/create');
const _ = require('lodash');
const updateGroup = async (req, res) => {
    console.log(req.body);
    console.log(req.query);
    const group = createGroupEntity.createModelForGroup();
    const result = await readOperation.findDocumentsByQuery(group, { admin: req.query.admin, groupName: req.query.groupName });
    if (!_.isEmpty(result)) {
        const groupDetails = result[0];
        if (_.isUndefined(groupDetails.bidDetails) || !_.isArray(groupDetails.bidDetails)) {
            groupDetails.bidDetails = []
        }
        groupDetails.bidDetails.push(req.body);
        const groupObj = new group(groupDetails)
        await createOperation.saveDocumentToDB(groupObj)
    }
}
module.exports.updateGroup = updateGroup;