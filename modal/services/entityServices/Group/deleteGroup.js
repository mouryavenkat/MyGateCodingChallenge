const deleteOperation = require('../../CrudOperations/delete');
const logger = require('../../../../config/logger').getLogger();
const createGroupEntity = require('../../../entities/createGroupEvent');
const DeleteGroupDetails = async (req, res) => {
    try {
        logger.info(`Delete Operation being executed`);
        const group = createGroupEntity.createModelForGroup();
        res.json(await deleteOperation.DeleteDocumentsByQuery(group, { admin: req.query.admin, groupName: req.query.groupName }));
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.DeleteGroupDetails = DeleteGroupDetails;