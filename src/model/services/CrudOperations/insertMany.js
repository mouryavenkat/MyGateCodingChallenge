
const logger = require('../../../config/logger').getLogger();
const saveDocumentsToDB = async (eventObject) => {
    try {
        const data = await eventObject.insertMany({ runValidators: true })
        logger.info(data);
        return data;
    }
    catch (ex) {
        logger.error(ex.message);
        throw new Error(ex.message);
    }
}
module.exports.saveDocumentsToDB = saveDocumentsToDB;