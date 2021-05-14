import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    deviceId: {type: String, require: true},
    time: {
        type: Date,
        default: new Date(),
    },
    type: String,
    value: String,
    value2: String //DHT11 has 2 value: temperature & humidity
})

var DataModel = mongoose.model('DataModel', dataSchema);

export default DataModel;