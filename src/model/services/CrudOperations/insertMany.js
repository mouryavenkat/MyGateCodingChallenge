const logger = require('../../../config/logger').getLogger();
const saveDocumentsToDB = async (eventObject, data) => {
    return new Promise((resolve, reject) => {
        try {
            eventObject.insertMany(data, (err, response) => {
                if (err) {
                    logger.error(err);
                    return reject(err);
                }
                logger.info(response);
                return resolve(response);
            })
        }
        catch (ex) {
            logger.error(ex.message);
            throw new Error(ex.message);
        }
    })
}
module.exports.saveDocumentsToDB = saveDocumentsToDB;