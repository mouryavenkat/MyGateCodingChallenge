const FoodCourtModel = require('../../../entities/createDataSet');
const deleteOperation = require('../../CrudOperations/delete');
const logger = require('../../../../config/logger').getLogger();
const deleteFoodCourt = async (req, res) => {
    try {
        console.log(req.params)
        logger.info(`Deleting the restauant named ${req.params['foodCourtId']}`);
        const modelForFoodCourt = FoodCourtModel.createModelForDataStore();
        console.log({ applicant: req.params['foodCourtId'] })
        const response = await deleteOperation.DeleteDocumentsByQuery(modelForFoodCourt, { applicant: req.params['foodCourtId'] });
        if(response['n']==0){
            return res.status(404).json({code:404,message:`The restaurant ${req.params['foodCourtId']} isn't available to be deleted`})
        }
        logger.debug(`Response received by deleting ${req.params.foodCourtId} is ${JSON.stringify(response)}`);
        return res.json(response);
    }
    catch (ex) {
        logger.error(ex);
        res.json(ex);
    }
}
module.exports.deleteFoodCourt = deleteFoodCourt;