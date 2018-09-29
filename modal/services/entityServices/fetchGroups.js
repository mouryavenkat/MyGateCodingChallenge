const readOperation = require('../CrudOperations/read');
const logger = require('../../../config/logger').getLogger();
const createGroupEntity = require('../../entities/createGroupEvent');
const fetchGroupDetailsInternal = async (admin) => {
    try {
        logger.info(`Read Operation being executed`);
        const group = createGroupEntity.createModelForGroup();
        return await readOperation.findDocumentsByQuery(group, { admin: admin });
    }
    catch (ex) {
        logger.error(ex.message);
        throw new Error(ex.message)
    }
}
const fetchGroupDetails = async (req, res) => {
    try {
        res.json(await fetchGroupDetailsInternal(req.query.admin));
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.fetchGroupDetailsInternal = fetchGroupDetailsInternal;
module.exports.fetchGroupDetails = fetchGroupDetails;