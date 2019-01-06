const createDataSetEntity = require('../../../entities/createDataSet');
const logger = require('../../../../config/logger').getLogger();
const createOperation = require('../../CrudOperations/create');
const _ = require('lodash')
const createRequest = async (req, res) => {
    logger.info(`------------Creating dataset-------------`);
    const datasetModel = createDataSetEntity.createModelForDataStore()
    logger.info(`Request payload received ${JSON.stringify(req.body)}`)
    try {

        const response = await createOperation.saveDocumentToDB(new datasetModel(req.body));
        logger.info(`Successfully inserted documents in DB`)
        res.json(response)
    }
    catch (ex) {
        logger.error(ex);
        const errorCode = ex.statusCode ? ex.statusCode : 500
        res.status(errorCode).json({ code: errorCode, message: ex.message ? ex.message : ex})
    }

}
module.exports.createRequest = createRequest;