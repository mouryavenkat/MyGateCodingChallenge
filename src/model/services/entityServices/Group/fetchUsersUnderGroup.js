const readOperation = require('../../CrudOperations/read');
const logger = require('../../../../config/logger').getLogger();
const createGroupEntity = require('../../../entities/createGroupEvent');
const _ = require('lodash');
const fetchUsersUnderGroupInternal = async (admin, groupName) => {
    try {
        logger.info(`Read Operation being executed`);
        const group = createGroupEntity.createModelForGroup();
        const groupDetails = await readOperation.findDocumentsByQuery(group, { admin, groupName });
        if (!_.isEmpty(groupDetails)) {
            return groupDetails[0].customers
        }
        return []
    }
    catch (ex) {
        logger.error(ex.message);
        throw new Error(ex.message)
    }
}
const fetchUsersUnderGroup = async (req, res) => {
    try {
        res.json(await fetchUsersUnderGroupInternal(req.query.admin, req.query.groupName));
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.fetchUsersUnderGroupInternal = fetchUsersUnderGroupInternal;
module.exports.fetchUsersUnderGroup = fetchUsersUnderGroup;