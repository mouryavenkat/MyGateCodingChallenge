const logger = require('../../config/logger').getLogger();
const Request = (url, options) => {
    logger.info(`Requesting response for url ${url}`);
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.code === 500) {
                    return reject(response.message);
                }
                return resolve(response)
            })
            .catch((ex) => {
                logger.error(ex);
                return reject(ex.message);
            })
    })
}


export default Request;