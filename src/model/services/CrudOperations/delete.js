const DeleteDocumentsByQuery = (eventObject, query) => {
    return new Promise((resolve, reject) => {
        eventObject.find(query).deleteMany().exec(function (err, queryOutput) {
            if (err) {
                logger.error(err);
                return reject(err.message)
            }
            return resolve(queryOutput)
        })
    })
}
module.exports.DeleteDocumentsByQuery = DeleteDocumentsByQuery;