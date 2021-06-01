import mongoose from 'mongoose';

const deviceSchema = mongoose.Schema({
    type: String, //Traffic Light || DHT11 || Light 
    time: {
        type: Date,
        default: new Date(),
    },
    idServer: String,
    name: { type: String, required: true, unique: true },
    unit: String,
    topic: String
})

var DeviceModel = mongoose.model('DeviceModel', deviceSchema);

export default DeviceModel;
