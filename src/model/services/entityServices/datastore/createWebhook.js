const registerWebhookEntity = require('../../../entities/registerWebhook');
const logger = require('../../../../config/logger').getLogger();
const createOperation = require('../../CrudOperations/create');
const _ = require('lodash')
const registerWebhook = async (req, res) => {
    logger.info(`------------Creating dataset-------------`);
    const webhookModel = registerWebhookEntity.createModelForWebhook()
    logger.info(`Request payload received ${JSON.stringify(req.body)}`)
    try {
        const response = await createOperation.saveDocumentToDB(new webhookModel(req.body));
        logger.info(`Successfully inserted documents in DB`)
        res.json(response)
    }
    catch (ex) {
        logger.error(ex);
        const errorCode = ex.statusCode ? ex.statusCode : 500
        res.status(errorCode).json({ code: errorCode, message: ex.message ? ex.message : ex })
    }

}
module.exports.registerWebhook = registerWebhook;