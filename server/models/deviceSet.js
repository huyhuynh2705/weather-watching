import mongoose from 'mongoose';

const deviceSetSchema = mongoose.Schema({
    deviceSetId: {type: String, require: true, unique: true},
    userID: String,
    trafficLightId: String,
    DHT11Id: String,
    lightId: String
})

var DeviceSetModel = mongoose.model('DeviceSetModel', deviceSetSchema);

export default DeviceSetModel;