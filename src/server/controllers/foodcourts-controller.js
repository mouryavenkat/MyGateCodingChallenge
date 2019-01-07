const createDatastore = require('../../model/services/entityServices/datastore/datastore');
const getDataset = require('../../model/services/entityServices/datastore/getdatastore');
const deleteFoodCourt = require('../../model/services/entityServices/datastore/deleteFoodCourt');
const getFoodCOurtByLocation = require('../../model/services/entityServices/datastore/getTruckByLocation')
const createRequest = require('../../model/services/entityServices/datastore/createRequest');
const updateFoodTruck = require('../../model/services/entityServices/datastore/updateFoodTruck')
const approveRequest = require('../../model/services/entityServices/datastore/approveRequest')
const registerWebhook = require('../../model/services/entityServices/datastore/createWebhook');
const autoExpire = require('../autoExpiry')
module.exports = (app) => {
    app.route('/createRequest')
        .post(createRequest.createRequest)
    app.route('/syncdata')
        .post(createDatastore.createDataset);
    app.route('/fetchFoodCourts')
        .get(getDataset.getDataset);
    app.route('/deleteFoodCourt/:foodCourtId')
        .delete(deleteFoodCourt.deleteFoodCourt)
    app.route('/getFoodCourtsByLocation')
        .get(getFoodCOurtByLocation.getBestTruckByLocation)
    app.route('/updateFoodTruck')
        .put(updateFoodTruck.upsertFoodTruck)
    app.route('/approveRequest')
        .post(approveRequest.approveRequest)
    app.route('/registerWebhook')
        .post(registerWebhook.registerWebhook)
    app.route('/autoexpire')
        .post(autoExpire.autoExpiry)
}