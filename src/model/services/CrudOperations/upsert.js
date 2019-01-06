
const logger = require('../../../config/logger').getLogger();
const uspsertDocumentToDB = async (eventObject, query, newData) => {
    return new Promise((resolve, reject) => {
        try {
            eventObject.findOneAndUpdate(query, newData, { upsert: true }, (err, data) => {
                if (err) {
                    return reject(err)
                }
                logger.info(data);
                return resolve(newData);
            })

        }
        catch (ex) {
            logger.error(ex.message);
            throw new Error(ex.message);
        }
    })
}
module.exports.uspsertDocumentToDB = uspsertDocumentToDB;