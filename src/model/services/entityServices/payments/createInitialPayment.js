const createPaymentEntity = require('../../../entities/payments');
const logger = require('../../../../config/logger').getLogger();
const _ = require('lodash');
const createOperation = require('../../CrudOperations/create');
const readOperation = require('../../CrudOperations/read');
const AddPaymentInternal = async (paymentDetails, admin, groupName) => {
    logger.debug(paymentDetails);
    const Promises = []
    const updatedPaymentDetails = [...Array(paymentDetails.totalMonths)].map((item, month) => {
        return {
            admin,
            groupName,
            paymentMonth: `${(paymentDetails.fromDate.month + month) % 12}/${paymentDetails.fromDate.year + Math.floor((paymentDetails.fromDate.month + month) / 12)}`,
            paymentDetails: []
        }
    })

    try {
        const payment = createPaymentEntity.createModelForPayment();
        _.forEach(updatedPaymentDetails, async (iteratePayment) => {
            const paymentRecord = await readOperation.findDocumentsByQuery(payment, { admin, groupName, paymentMonth: iteratePayment.paymentMonth })
            if (_.isEmpty(paymentRecord)) {
                const paymentObject = new payment(iteratePayment);
                logger.info(`Checking if ${iteratePayment.paymentMonth} month is already available in payments collection`)
                logger.info(`Payment Details being inserted  for month ${iteratePayment.paymentMonth}`);
                Promises.push(createOperation.saveDocumentToDB(paymentObject));
            }
        })
        return await Promise.all(Promises);
    }
    catch (ex) {
        logger.error(ex);
        throw new Error(ex.message);
    }
}
const AddPayment = async (req, res) => {
    logger.info(`------------Creating Payment Initial-------------`);
    try {
        res.json(await AddPaymentInternal(req.body, req.query.admin, req.query.groupName));
    }
    catch (ex) {
        logger.error(ex);
        res.status(500).json({ code: 500, message: ex.message });
    }
}

module.exports.AddPayment = AddPayment;
module.exports.AddPaymentInternal = AddPaymentInternal