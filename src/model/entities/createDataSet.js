const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const datastoreSchema = new Schema({
    address: { type: String, required: true, strict: true },
    applicant: { type: String, required: true, strict: true },
    approved: { type: String, strict: true },
    block: { type: String, strict: true },
    blocklot: { type: String, strict: true },
    cnn: { type: String, strict: true },
    dayshours: { type: String, strict: true },
    expirationdate: { type: String, strict: true },
    facilitytype: { type: String, strict: true },
    fooditems: { type: String, strict: true },
    location: {
        type: { type: String, strict: true, required: true },
        coordinates: { type: [Number], strict: true, index: '2dsphere', required: true },
    },
    locationdescription: { type: String, strict: true },
    lot: { type: String, strict: true },
    objectid: { type: String, strict: true },
    permit: { type: String, strict: true },
    priorpermit: { type: String, strict: true },
    received: { type: String, strict: true },
    schedule: { type: String, strict: true },
    status: { type: String, strict: true },
})


const createModelForDataStore = () => {
    const datastore = mongoose.model('datastore', datastoreSchema);
    return datastore;
}
module.exports.createModelForDataStore = createModelForDataStore;