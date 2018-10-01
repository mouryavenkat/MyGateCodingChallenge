const createAdminEntity = require('../../../entities/createAdmin');
const logger = require('../../../../config/logger').getLogger();
const createOperation = require('../../CrudOperations/create');
const createAdminInternal = async (requestBody) => {
    logger.info(`------------Creating Admin-------------`);
    logger.debug(requestBody)
    try {
        const Admin = createAdminEntity.createModelForAdmin();
        const AdminObject = new Admin(requestBody);
        return await createOperation.saveDocumentToDB(AdminObject);
    }
    catch (ex) {
        logger.error(ex);
        throw ex.message;
    }
}
const createAdmin = async (req, res) => {
    try {
        res.json(await createAdminInternal(req.body));
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.createAdminInternal = createAdminInternal;
module.exports.createAdmin = createAdmin;
