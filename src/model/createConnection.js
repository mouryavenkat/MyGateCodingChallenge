const mongoose = require('mongoose');
const logger = require('../config/logger').getLogger();
const connectionStatus = (mongodb_conn_str) => {
    return new Promise((resolve, reject) => {
        const connectionObject = mongoose.connection;
        connectionObject.once('open', () => {
            logger.info(`connected to mongodb on ${mongodb_conn_str}`);
            resolve(`connected to mongodb on ${mongodb_conn_str}`)
        })
        connectionObject.on('error', () => {
            logger.error(`Error while connecting to mongo ${console.error.bind(console, 'connection error:')}`);
            reject(`Error while connecting to mongo ${console.error.bind(console, 'connection error:')}`)
        })
    })
}
const createConnection = async () => {
    const options = {
        reconnectTries: 5, // Tries to connect for a max 5 times before terminating
        reconnectInterval: 500, // Reconnect every 500ms if connection failures
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        useNewUrlParser: true // Allows connection URL to be passed as string
    };
    var mongodb_conn_str = process.env.MONGODB_CONN_STR || `mongodb://${process.env.hostIp}:27017/mygate`;
    console.log(mongodb_conn_str)
    try {
        mongoose.connect(mongodb_conn_str, options);
        const response= await connectionStatus(mongodb_conn_str)
        console.log(response)
    }
    catch (ex) {
        logger.error(ex);
        throw ex;
    }
}
module.exports.createConnection = createConnection;