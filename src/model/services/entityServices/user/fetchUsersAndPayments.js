const createGroupEntity = require('../../../entities/createGroupEvent');
const createUserEntity = require('../../../entities/createUser');
const readOperation = require('../../CrudOperations/read');
const logger = require('../../../../config/logger').getLogger();
const _ = require('lodash');
const formUserPaymentsByMonth = (groupDetails, userDetails) => {
    const userMonthMap = {};
    const payments = JSON.parse(groupDetails.payments);
    _.forEach(Object.keys(payments), (iterateMonth) => {
        _.forEach(Object.keys(payments[iterateMonth]), (iterateUser) => {
            if (_.isUndefined(userMonthMap[iterateUser])) {
                userMonthMap[iterateUser] = {};
            }
            const bidDetailsForMonth = _.find(groupDetails.bidDetails, { bidMonth: iterateMonth });
            userMonthMap[iterateUser][iterateMonth] = { paid: payments[iterateMonth][iterateUser], toBePaid: _.isUndefined(bidDetailsForMonth)?'':bidDetailsForMonth.payableAmountAfterBid };
        })
    })
    logger.debug(JSON.stringify(userMonthMap));
    return userMonthMap
}
const fetchUsersAndPayments = async (req, res) => {
    const admin = req.query.admin;
    const groupName = req.query.groupName;
    logger.info(`Filter receievd ${JSON.stringify(req.query)}`);
    try {
        logger.info(`Read Operation being executed to fetch user`);
        const group = createGroupEntity.createModelForGroup();
        let groupDetails = await readOperation.findDocumentsByQueryClone(group, { groupName, admin });
        if (_.isEmpty(groupDetails)) {
            logger.error(`Group with name ${groupName} is missing.`);
            return res.status(500).json({ code: 500, message: `Group with name ${groupName} is missing.` })
        }
        groupDetails = groupDetails[0];
        const usersUnderGroup = groupDetails.customers;
        logger.info(`Returning users belonging to ${JSON.stringify(groupName)}`);
        //-------------------------------------------------------------------------------//

        const user = createUserEntity.createModelForUser();
        let userDetails = _.cloneDeep(await readOperation.findDocumentsByQueryClone(user, { emailId: { $in: usersUnderGroup } }));
        const paymentDetails = formUserPaymentsByMonth(groupDetails, userDetails);

        _.forEach(userDetails, (iterateUserInformation) => {
            iterateUserInformation['payments'] = paymentDetails[iterateUserInformation.emailId];
        })

        res.json(userDetails);
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}
module.exports.fetchUsersAndPayments = fetchUsersAndPayments;