import mongoose from 'mongoose';

const deviceSetSchema = mongoose.Schema({
    userID: String,
    time: {
        type: Date,
        default: new Date(),
    },
    trafficLightId: String,
    DHT11Id: String,
    lightId: String
})

var DeviceSetModel = mongoose.model('DeviceSetModel', deviceSetSchema);

export default DeviceSetModel;
