const createDataSetEntity = require('../../../entities/createDataSet');
const logger = require('../../../../config/logger').getLogger();
const _ = require('lodash');
const getBestTruckByLocation = async (req, res) => {
    logger.info(`------------Finding nearby location with longitude ${req.query.longitude} and latitude ${req.query.latitude}-------------`);
    try {
        const datasetModel = createDataSetEntity.createModelForDataStore();
        const limit = _.isUndefined(req.query.limit) ? 1 : parseInt(req.query.limit);
        datasetModel.aggregate(
            [{
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] },
                    distanceField: "dist.calculated",
                    spherical: true
                }
            }]).limit(limit).exec((err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.json(data);
            })

    }

    catch (ex) {
        logger.error(ex);
        res.json(ex);
    }
}
module.exports.getBestTruckByLocation = getBestTruckByLocation