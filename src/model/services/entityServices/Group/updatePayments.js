const readOperation = require('../../CrudOperations/read');
const logger = require('../../../../config/logger').getLogger();
const createGroupEntity = require('../../../entities/createGroupEvent');
const createCommissionEntity = require('../../../entities/createCommission')
const createOperation = require('../../CrudOperations/create');
const _ = require('lodash');
const checkBidEntryForGroupAndMonth = async (admin, groupName, bidMonth) => {
    const commission = createCommissionEntity.createModelForCommission();
    const result =await readOperation.findDocumentsByQuery(commission, { admin, groupName, bidMonth });
    console.log(result)
    if (_.isEmpty(result)) {
        throw new Error(`Bidding is not yet Completed for month ${bidMonth}`)
    }
    return 'Bid has already happend';
}
const updatePayments = async (req, res) => {
    logger.info(`Request params received ${JSON.stringify(req.query)}`);
    try {
        await checkBidEntryForGroupAndMonth(req.query.admin,req.query.groupName,req.query.month)
        const group = createGroupEntity.createModelForGroup();
        const result = await readOperation.findDocumentsByQuery(group, { admin: req.query.admin, groupName: req.query.groupName });
        if (_.isEmpty(result)) {
            return res.status(500).json({ code: 500, message: `No information found for Group ${req.query.groupName} while updating payments]` });
        }
        let groupDetails = result[0];
        const payments = JSON.parse(groupDetails.payments);
        console.log(payments)
        payments[req.query.month][req.query.user].push({ amountPaid: parseInt(req.query.amount), paidOn: Date(Date.now()) })
        groupDetails.payments = JSON.stringify(payments);

        return res.json(await createOperation.saveDocumentToDB(new group(groupDetails)));
    }
    catch (ex) {
        logger.error(ex.message);
        return res.status(500).json({code:500,message:ex.message});
    }
}
module.exports.updatePayments = updatePayments