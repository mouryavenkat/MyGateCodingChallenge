const readOperation = require('../../CrudOperations/read');
const logger = require('../../../../config/logger').getLogger();
const createAdminEntity = require('../../../entities/createAdmin');
const fetchAdminInternal = async (emailId) => {
    try {
        logger.info(`Read Operation being executed`);
        const admin = createAdminEntity.createModelForAdmin();
        return await readOperation.findDocumentsByQuery(admin, { emailId: emailId });
    }
    catch (ex) {
        logger.error(ex.message);
        throw new Error(ex.message);
    }
}
const fetchAdminDetails = async (req, res) => {
    try {
        return await fetchAdminDetails(req.query.emailId)
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.fetchAdminInternal = fetchAdminInternal;
module.exports.fetchAdminDetails = fetchAdminDetails;