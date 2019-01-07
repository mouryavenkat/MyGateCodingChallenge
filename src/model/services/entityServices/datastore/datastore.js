const createDataSetEntity = require('../../../entities/createDataSet');
const logger = require('../../../../config/logger').getLogger();
const createOperation = require('../../CrudOperations/create');
const bulkInsert = require('../../CrudOperations/insertMany')
const request = require('request-promise');
const _ = require('lodash')
const createDataset = async (req, res) => {
    logger.info(`------------Creating dataset-------------`);
    const datasetModel = createDataSetEntity.createModelForDataStore()
    const options = {
        'headers': {
            'X-App-Token': 'YQzQnF6036Jmd89iAwwHq6Xcb'
        },
        method: 'GET',
        url: 'https://data.sfgov.org/resource/6a9r-agq8.json',
        json: true,
        rejectUnauthorized: false
    }
    try {
        const Promises = [];
        const response = await request(options)
        //datasetModel.createIndexes({ location: '2dsphere' })
        // _.forEach(response, (record) => {
        //     Promises.push(createOperation.saveDocumentToDB(new datasetModel(record)));
        // })
        _.forEach(response, (iterate) => {
            iterate['_id'] = iterate.objectid;
        })
        const resp = await bulkInsert.saveDocumentsToDB(datasetModel, response)
        //const resp = await Promise.all(Promises)
        logger.info(`Successfully inserted ${response.length} documents in DB`)
        res.json(resp)
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(409).json({ code: 409, message: ex.message })
    }

}
module.exports.createDataset = createDataset;