const createDatastore = require('../../model/services/entityServices/datastore/datastore');
const getDataset = require('../../model/services/entityServices/datastore/getdatastore');
const deleteFoodCourt = require('../../model/services/entityServices/datastore/deleteFoodCourt');
const getFoodCOurtByLocation = require('../../model/services/entityServices/datastore/getTruckByLocation')
module.exports = (app) => {
    app.route('/datastore')
        .post(createDatastore.createDataset);
    app.route('/fetchFoodCourts')
        .get(getDataset.getDataset);
    app.route('/deleteFoodCourt/:foodCourtName')
        .delete(deleteFoodCourt.deleteFoodCourt)
    app.route('/getFoodCourtsByLocation')
        .get(getFoodCOurtByLocation.getBestTruckByLocation)
}