import {mongoose, mqtt_client} from '../helpers/index.js'
import DeviceModel from '../models/device.js'
import DataModel from '../models/data.js'

const subscribe_topics = async () => {
    try {
        const devices = await DeviceModel.find({})
        for (const device of devices) {
            if (device.topic) {
                console.log("subscribe to topic", device.topic)
                mqtt_client.subscribe(device.topic) 
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const get_device = async (topic) => {
    const device = await DeviceModel.find({
        topic
    })

    return device
}

const handle_dht11_data = async (topic, data, device) => {
    const values = data.split("-")
    const new_data = new DataModel({
        deviceId: device._id,
        time: new Date(),
        type: device.type,
        value: values[0],
        values2: values[1]
    })

    DataModel.save()
}

const handle_light_data = async (topic, data, device) => {
    const new_data = new DataModel({
        deviceId: device._id,
        time: new Date(),
        type: device.type,
        value: data
    })

    DataModel.save()
}

const handle_event = async (topic, message) => {
    const device = get_device(topic)
    const parsed_message = JSON.parse(message.toString())
    const { type } = device
    switch (type.toLowerCase()) {
        case "Light": {
            handle_light_data(topic, parsed_message.data, device)
            break
        }
        case "DHT11": {
            handle_dht11_data(topic, parsed_message.data, device)
            break
        }
    }
}

export {
    subscribe_topics,
    handle_event,
}
