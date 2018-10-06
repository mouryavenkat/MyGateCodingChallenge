const createCommissionEntity = require('../../../entities/createCommission');
const readOperation = require('../../CrudOperations/read');
const logger = require('../../../../config/logger').getLogger();
const createOperation = require('../../CrudOperations/create');
const AddCommissionInternal = async ( commissionDetails) => {
    logger.debug(commissionDetails)
    try {
        const commission = createCommissionEntity.createModelForCommission();
        // readOperation.findDocumentsByQuery(commission,{admin,groupName,commissionDetails})
        const commissionObject = new commission(commissionDetails);
        return await createOperation.saveDocumentToDB(commissionObject);
    }
    catch (ex) {
        logger.error(ex);
        throw new Error(ex.message);
    }
}
const AddCommission = async (req, res) => {
    logger.info(`------------Creating group-------------`);

    try {
        res.json(await AddCommissionInternal(req.body));
    }
    catch (ex) {
        logger.error(ex);
        res.status(500).json({ code: 500, message: ex.message });
    }
}

module.exports.AddCommission = AddCommission;
module.exports.AddCommissionInternal = AddCommissionInternal