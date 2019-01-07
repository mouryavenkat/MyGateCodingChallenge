const logger = require('../config/logger').getLogger();
const readOperation = require('../model/services/CrudOperations/read');
const createDataSetEntity = require('../model/entities/createDataSet');
const webHookEntity = require('../model/entities/registerWebhook');
const upsert = require('../model/services/CrudOperations/upsert');
const nodemailer = require('nodemailer');
const _ = require('lodash');
const request = require('request-promise');
const sendmail = () => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.authuser,
            pass: process.env.authpass
        }
    });
    var mailOptions = {
        from: 'codeforlyf@gmail.com',
        to: 'mourya.g9@gmail.com',
        subject: 'Expirtion Notification',
        text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const isoDate = () => {
    const date = new Date()
    const yyyy = date.getFullYear().toString();
    let mm = (date.getMonth() + 1);
    let dd = date.getDate();
    if (mm < 10) {
        mm = '0' + mm
    }
    if (dd < 10) {
        dd = '0' + dd
    }
    const ISOFormatDate = `${yyyy}-${mm}-${dd}T00:00:00.000`
    logger.info(`Current date is ${ISOFormatDate}`);
    return ISOFormatDate
}
const updateCallbacks = async (webhooks, expiredRestaurants) => {
    try {
        webhooks = await webhooks;
        logger.info(JSON.stringify(webhooks));
        const Requests = [];
        _.forEach(webhooks, (iterateWebhook) => {
            Requests.push(request({
                url: iterateWebhook.callbackURL,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                rejectUnauthorized: false,
                json: true,
                body: expiredRestaurants
            }))
            if (iterateWebhook.emailId) {
                sendmail()
            }
        })
        const requestResponse = await Promise.all(Requests);
    }
    catch (ex) {
        logger.error(ex.message);
    }
}
const autoExpiry = async () => {
    try {
        const Expirations = [];
        logger.info('Auto expiry started');
        const ISOFormatDate = isoDate()
        const datasetModel = createDataSetEntity.createModelForDataStore();
        const webhookModel = webHookEntity.createModelForWebhook();
        const expiredRestaurants = await readOperation.findDocumentsByQueryClone(datasetModel, { expirationdate: ISOFormatDate });
        logger.debug(`Expired Restaurants ${JSON.stringify(expiredRestaurants)}`);
        const webhooks = readOperation.findDocumentsByQueryClone(webhookModel, { hooktype: 'expiration' });

        _.forEach(expiredRestaurants, (foodtruck) => {
            foodtruck['status'] = 'EXPIRED'
            Expirations.push(upsert.uspsertDocumentToDB(datasetModel, { objectid: foodtruck.objectid }, foodtruck))
        })
        // Need to wait because once we update the database tht the food trucks are expired, then only we need to notify the end user. 
        await Promise.all(Expirations);
        if (expiredRestaurants.length > 0) {
            updateCallbacks(webhooks, expiredRestaurants)
        }
        else {
            logger.info(`There are no restaurants expired today`);
        }

    }
    catch (ex) {
        logger.error(ex);
    }
}
module.exports.autoExpiry = autoExpiry;