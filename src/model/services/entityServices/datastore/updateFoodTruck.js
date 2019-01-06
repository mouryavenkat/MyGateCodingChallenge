const createDataSetEntity = require('../../../entities/createDataSet');
const logger = require('../../../../config/logger').getLogger();
const upsert = require('../../CrudOperations/upsert')
const _ = require('lodash')
const upsertFoodTruck = async (req, res) => {
    logger.info(`------------Creating dataset-------------`);
    const datasetModel = createDataSetEntity.createModelForDataStore()
    logger.info(`Request payload received ${JSON.stringify(req.body)}`)
    try {
        const query = { objectid: req.body.objectid };
        const response = await upsert.uspsertDocumentToDB(datasetModel,query,req.body)
        logger.info(`Successfully upserted  documents in DB`)
        logger.debug(response);
        res.json(response)
    }
    catch (ex) {
        logger.error(ex);
        const errorCode = ex.statusCode ? ex.statusCode : 500
        res.status(errorCode).json({ code: errorCode, message: ex.message ? ex.message : ex })
    }

}
module.exports.upsertFoodTruck = upsertFoodTruck;