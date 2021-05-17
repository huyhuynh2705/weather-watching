import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    deviceId: {type: String, require: true},
    time: {
        type: Date,
        default: new Date(),
    },
    type: String, //Traffic Light || DHT11 || Light 
    value: String, // Temperature || Traffic Light
    value2: String //Humidity
})

var DataModel = mongoose.model('DataModel', dataSchema);

export default DataModel;