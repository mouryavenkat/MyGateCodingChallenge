const createGroupEntity = require('../../entities/createGroupEvent');
const logger = require('../../../config/logger').getLogger();
const createOperation = require('../CrudOperations/create');

const createGroup = async (req, res) => {
    logger.info(`------------Creating group-------------`);
    logger.debug(req.body)
    try {
        const group = createGroupEntity.createModelForGroup();
        const groupObject = new group(req.body);
        res.json(await createOperation.saveDocumentToDB(groupObject));
    }
    catch (ex) {
        logger.error(ex);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.createGroup = createGroup;
