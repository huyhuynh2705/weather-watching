const mongoose = require('mongoose')
const { mongodb_url } = require('../environments')

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.Promise = global.Promise

mongoose.connect(mongodb_url, connectionOptions)

mongoose.set('debug', true)

module.exports = { mongoose }
