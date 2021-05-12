import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    username: String,
    deviceSetId: String,
    condition: String,
    temperature: String,
    humidity: String,
    light: String,
    time: {
        type: Date,
        default: new Date(),
    }
})

var DataMessage = mongoose.model('DataMessage', dataSchema);

export default DataMessage;