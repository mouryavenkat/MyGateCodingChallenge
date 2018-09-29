const readOperation = require('../../CrudOperations/read');
const logger = require('../../../../config/logger').getLogger();
const createUserEntity = require('../../../entities/createUser');
const _ = require('lodash')
const fetchUserInternal = async (groupNames, admin) => {
    try {
        const query = {}
        if (!_.isUndefined(groupNames)) {
            query['associatedGroups'] = { $all: groupNames.split(',') }
        }
        if (!_.isUndefined(admin)) {
            query['managedBy'] = admin
        }
        logger.info(`Read Operation being executed to fetch user`);
        const user = createUserEntity.createModelForUser();

        logger.info(`Returning users belonging to ${JSON.stringify(query)}`);
        return await readOperation.findDocumentsByQuery(user, query);
    }
    catch (ex) {
        logger.error(ex.message);
        throw new Error(ex.message);
    }
}
const fetchUser = async (req, res) => {
    try {
        console.log(req.query);
        res.json(await fetchUserInternal(req.query.groupNames, req.query.admin));
    }
    catch (ex) {
        logger.error(ex.message);
        res.status(500).json({ code: 500, message: ex.message });
    }
}

module.exports.fetchUser = fetchUser;