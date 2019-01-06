const createDataSetEntity = require('../../../entities/createDataSet');
const logger = require('../../../../config/logger').getLogger();
const readOperation = require('../../CrudOperations/read');
const upsert = require('../../CrudOperations/upsert');
const _ = require('lodash');
const approveRequest = async (req, res) => {
    logger.info(`------------Finding nearby location with requestId ${req.query.requestId}-------------`);
    try {
        const datasetModel = createDataSetEntity.createModelForDataStore();
        const details = await readOperation.findDocumentsByQueryClone(datasetModel, { objectid: req.query.requestId });
        if (_.isEmpty(details)) {
            return res.status(404).json({ code: 404, message: `There is no restaurant with Id ${req.query.requestId}` });
        }
        logger.info(details);
        details['status'] = 'APPROVED';
        details['expirationdate'] = req.body.expirationdate
        details['approved'] = new Date().toISOString()
        const response = await upsert.uspsertDocumentToDB(datasetModel, { objectid: req.query.requestId }, details);
        logger.debug(response);
        return res.json({ code: 200, message: `Food truck for id ${req.params.requestId} has been approved` })
    }

    catch (ex) {
        logger.error(ex);
        const statusCode = ex.statusCode ? ex.statusCode : 500
        res.status(statusCode).json({ code: statusCode, message: ex });
    }
}
module.exports.approveRequest = approveRequest