const logger = require('../../../../config/logger').getLogger();
const createAdminEntity = require('../../../entities/createAdmin');
const readOperation = require('../../CrudOperations/read');
const _ = require('lodash');
const saveOperation = require('../../../services/CrudOperations/create');
const AddteamsToAdminInternal = async (teamName, adminId) => {
    try {
        logger.info(`Adding Group ${teamName} to Admin ${adminId}`);
        const admin = createAdminEntity.createModelForAdmin();
        
        const AdminDetails = await readOperation.findDocumentsByQuery(admin, { emailId: adminId });
        if(_.isEmpty(AdminDetails)){
            throw new Error(`Admin Details is missing to update the team`);
        }
        console.log(_.includes(AdminDetails[0].teams,teamName),AdminDetails.teams,teamName)
        if(_.includes(AdminDetails[0].teams,teamName)){
            throw new Error(`Team ${teamName} is already under admin ${adminId}`);
        }
        AdminDetails[0].teams.push(teamName);
        return await saveOperation.saveDocumentToDB(new admin(AdminDetails[0]));
    }
    catch (ex) {
        logger.error(ex);
        throw new Error(ex.message);
    }
}
const AddteamsToAdmin = async (req, res) => {
    try {
        res.json(await AddteamsToAdminInternal(req.query.teamName, req.query.adminId));
    }
    catch (ex) {
        logger.error(ex);
        res.status(500).json({code:500,message:ex.message});
    }
}
module.exports.AddteamsToAdminInternal = AddteamsToAdminInternal;
module.exports.AddteamsToAdmin = AddteamsToAdmin;