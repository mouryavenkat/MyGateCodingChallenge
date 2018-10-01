const createUserEntity = require('../../../entities/createUser');
const logger = require('../../../../config/logger').getLogger();
const createOperation = require('../../CrudOperations/create');
const createUserInternal = async (requestBody) => {
    logger.info(`------------Creating Admin-------------`);
    logger.debug(requestBody)
    try {
        const User = createUserEntity.createModelForUser();
        const UserObject = new User(requestBody);
        return await createOperation.saveDocumentToDB(UserObject);
    }
    catch (ex) {
        logger.error(ex);
        throw ex.message;
    }
}
const createUser = async (req, res) => {
    try {
        res.json(await createUserInternal(req.body));
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.createUserInternal = createUserInternal;
module.exports.createUser = createUser;
