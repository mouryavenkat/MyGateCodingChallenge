const createDataSetEntity = require('../../../entities/createDataSet');
const logger = require('../../../../config/logger').getLogger();
const readOperation = require('../../CrudOperations/read');
const _ = require('lodash')
const getDataset = async (req, res) => {
    logger.info(`------------Creating dataset-------------`);
    try {
        const datasetModel = createDataSetEntity.createModelForDataStore()
        return res.json(await readOperation.findDocumentsByQueryClone(datasetModel, {}))
    }
    catch (ex) {
        logger.error(ex);
        res.json(ex);
    }
}
module.exports.getDataset = getDataset;