import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    deviceId: {type: String, require: true},
    time: {
        type: Date,
        default: new Date(),
    },
    transactionHash: String,
    type: String,  // Traffic Light || DHT11 || Light 
    value: String, // Temperature || Traffic Light || Light
    value2: String // Humidity if type DHT11
})

var DataModel = mongoose.model('DataModel', dataSchema);

export default DataModel;