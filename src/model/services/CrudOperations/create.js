
const logger = require('../../../config/logger').getLogger();
const saveDocumentToDB = async (eventObject) => {
    try {
        const data = await eventObject.save({ runValidators: true })
        logger.info(data);
        return data;
    }
    catch (ex) {
        logger.error(ex.message);
        throw new Error(ex.message);
    }
}
module.exports.saveDocumentToDB = saveDocumentToDB;