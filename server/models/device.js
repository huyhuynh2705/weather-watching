import mongoose from 'mongoose';

const deviceSchema = mongoose.Schema({
    deviceId: {type: String, require: true, unique: true}, // TL001 || DHT001 || L001
    type: String //Traffic Light || DHT11 || Light 
})

var DeviceModel = mongoose.model('DeviceModel', deviceSchema);

export default DeviceModel;