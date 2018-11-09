const readOperation = require('../../CrudOperations/read');
const logger = require('../../../../config/logger').getLogger();
const createGroupEntity = require('../../../entities/createGroupEvent');
const createOperation = require('../../CrudOperations/create');
const _ = require('lodash');
const updateBidDetailsInGroup = (groupDetails, requestBody) => {
    if (_.isUndefined(groupDetails.bidDetails) || !_.isArray(groupDetails.bidDetails)) {
        groupDetails.bidDetails = []
        groupDetails.bidDetails.push(requestBody);
    }
    else {
        const matchIndex = groupDetails.bidDetails.findIndex(item => item.bidMonth === requestBody.bidMonth);
        if (matchIndex >= 0) {
            groupDetails.bidDetails[matchIndex] = requestBody
        }
        else {
            groupDetails.bidDetails.push(requestBody);
        }
    }
}
const updateUsersAndPayments = (requestBody, groupName, groupDetails) => {
    logger.info(`These users ${requestBody} will be added to ${groupName}`);
    if (_.isUndefined(groupDetails.customers) || !_.isArray(groupDetails.customers)) {
        groupDetails.customers = []
    }
    groupDetails.customers = _.concat(groupDetails.customers, requestBody);
    console.log(JSON.parse(JSON.parse(JSON.stringify(groupDetails.payments))))
    const payments = JSON.parse(JSON.parse(JSON.stringify(groupDetails.payments)))
    console.log(groupDetails.customers)
    _.forEach(Object.keys(payments), (iterate) => {
        _.forEach(groupDetails.customers, (iterateCustomer) => {
            console.log(payments[iterate])
            if (_.isUndefined(payments[iterate][iterateCustomer])) {
                payments[iterate][iterateCustomer] = [{
                    amountPaid: 0,
                    paidOn: ''
                }]
            }
        })
    })
    logger.debug(`Payment details of group ${groupName} are ${groupDetails.payments}`);
    groupDetails.payments = JSON.stringify(payments);
}
const updateGroup = async (req, res) => {
    try {
        const group = createGroupEntity.createModelForGroup();
        const result = await readOperation.findDocumentsByQuery(group, { admin: req.query.admin, groupName: req.query.groupName });
        if (!_.isEmpty(result)) {
            let groupDetails = result[0];
            if (req.query.type === 'addUsers') {
                updateUsersAndPayments(req.body, req.query.groupName, groupDetails);
            }
            else {
                updateBidDetailsInGroup(groupDetails, req.body)
                req.body.payableAmountAfterBid = groupDetails.ActualPayPerMonth - (req.body.biddedFor * ((100 - groupDetails.chitCommission) / 100)) / groupDetails.totalMembers
                console.log(groupDetails)
            }
            const groupObj = new group(groupDetails)
            return res.json(await createOperation.saveDocumentToDB(groupObj))
        }
        logger.error(`No group found with name ${req.query.groupName}` )
        return res.status(500).json({ code: 500, message: `No group found with name ${req.query.groupName}` });
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.updateGroup = updateGroup;