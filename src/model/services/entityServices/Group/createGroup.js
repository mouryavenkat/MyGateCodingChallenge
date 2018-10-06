const createGroupEntity = require('../../../entities/createGroupEvent');
const logger = require('../../../../config/logger').getLogger();
const createOperation = require('../../CrudOperations/create');
const _ = require('lodash');
const createGroupInternal = async (groupDetails) => {
    logger.debug(groupDetails)
    try {
        const group = createGroupEntity.createModelForGroup();
        groupDetails.payments=JSON.stringify(groupDetails.payments)
        const groupObject = new group(groupDetails);
        return await createOperation.saveDocumentToDB(groupObject);
    }
    catch (ex) {
        logger.error(ex);
        throw new Error(ex.message);
    }
}
const createGroup = async (req, res) => {
    logger.info(`------------Creating group-------------`);
    console.log(req.body)

    try {
        res.json(await createGroupInternal(req.body));
    }
    catch (ex) {
        logger.error(ex);
        res.status(500).json({ code: 500, message: ex.message });
    }
}

module.exports.createGroup = createGroup;
module.exports.createGroupInternal = createGroupInternal