import mongoose from 'mongoose'
import { mongodb_url } from '../environments/index.js'

console.log(mongodb_url)

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.Promise = global.Promise

mongoose.connect(mongodb_url, connectionOptions)

mongoose.set('debug', true)

export { 
    mongoose 
}
