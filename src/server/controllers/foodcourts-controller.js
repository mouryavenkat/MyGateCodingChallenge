const createDatastore = require('../../model/services/entityServices/datastore/datastore');
const getDataset = require('../../model/services/entityServices/datastore/getdatastore');
const deleteFoodCourt = require('../../model/services/entityServices/datastore/deleteFoodCourt');
const getFoodCOurtByLocation = require('../../model/services/entityServices/datastore/getTruckByLocation')
const createRequest = require('../../model/services/entityServices/datastore/createRequest');
module.exports = (app) => {
    app.route('/createRequest')
        .post(createRequest.createRequest)
    app.route('/datastore')
        .post(createDatastore.createDataset);
    app.route('/fetchFoodCourts')
        .get(getDataset.getDataset);
    app.route('/deleteFoodCourt/:foodCourtName')
        .delete(deleteFoodCourt.deleteFoodCourt)
    app.route('/getFoodCourtsByLocation')
        .get(getFoodCOurtByLocation.getBestTruckByLocation)
}