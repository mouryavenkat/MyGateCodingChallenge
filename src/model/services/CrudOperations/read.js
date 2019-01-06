const logger = require('../../../config/logger').getLogger();
const findDocumentsByQueryClone = (eventObject, query) => {
    return new Promise((resolve, reject) => {
        eventObject.find(query).lean().exec(function (err, queryOutput) {
            if (err) {
                logger.error(err);
                return reject(err.message)
            }
            return resolve(queryOutput)
        })
    })
}
const findDocumentsByQuery = (eventObject, query) => {
    return new Promise((resolve, reject) => {
        eventObject.find(query).exec(function (err, queryOutput) {
            if (err) {
                logger.error(err);
                return reject(err.message)
            }
            return resolve(queryOutput)
        })
    })
}
module.exports.findDocumentsByQueryClone = findDocumentsByQueryClone;
module.exports.findDocumentsByQuery = findDocumentsByQuery;