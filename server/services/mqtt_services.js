import {mongoose, mqtt_client} from '../helpers/index.js'
import DeviceModel from '../models/device.js'
import DataModel from '../models/data.js'
import DeviceSetModel from '../models/deviceSet.js'

let last_light_value
let last_temp_value
let last_humid_value

const subscribe_topics = async () => {
    try {
        const devices = await DeviceModel.find({})
        for (const device of devices) {
            if (device.topic && device.type.toLowerCase() != "traffic light") {
                console.log("subscribe to topic", device.topic)
                mqtt_client.subscribe(device.topic) 
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const calculate_lightc_color = (light, temp, humid) => {
    if (light >= 600) {
        return "11"
    }
    if (temp >= 35 || temp <= 16) {
        return "11"
    }
    if (humid >= 60) {
        return "10"
    }
    if (temp >= 30) {
        return "10"
    }
    return "01"
}

const get_device = async (topic) => {
    const device = await DeviceModel.findOne({
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
        value2: values[1]
    })

    last_temp_value = values[0]
    last_humid_value = values[1]

    await new_data.save()
}

const handle_light_data = async (topic, data, device) => {
    const new_data = new DataModel({
        deviceId: device._id,
        time: new Date(),
        type: device.type,
        value: data
    })

    last_light_value = data

    await new_data.save()
}

const update_traffic_light = async (deviceSet) => {
    let last_data
    if (!last_light_value) {
        last_data = await DataModel.findOne({ deviceId: deviceSet.lightId }).sort({ _id: -1 })
        last_light_value = last_data.value 
    }
    if (!last_temp_value) {
        last_data = await DataModel.findOne({ deviceId: deviceSet.DHT11Id }).sort({ _id: -1 })
        last_temp_value = last_data.value 
    }
    if (!last_humid_value) {
        last_data = await DataModel.findOne({ deviceId: deviceSet.DHT11Id }).sort({ _id: -1 })
        last_humid_value = last_data.value2 
    }

    const traffic_light_color = calculate_lightc_color(last_light_value, last_temp_value, last_humid_value)

    const traffic_light_device = await DeviceModel.findOne({
        _id: deviceSet.trafficLightId
    })

    await mqtt_client.publish(traffic_light_device.topic, `
        {
            "id": "${traffic_light_device.idServer}",
            "name": "${traffic_light_device.name}",
            "data": "${traffic_light_color}",
            "unit": ""
        }
    `)

    const traffic_light_data = new DataModel({
        deviceId: traffic_light_device._id,
        time: new Date(),
        type: traffic_light_device.type,
        value: traffic_light_color,
    })

    await traffic_light_data.save()
}

const handle_event = async (topic, message) => {
    const device = await get_device(topic)
    const parsed_message = JSON.parse(message.toString())
    const { type } = device
    console.log("light", last_light_value)
    console.log("temp", last_temp_value)
    console.log("humid", last_humid_value)

    console.log(type)

    let deviceSet
    switch (type.toLowerCase()) {
        case "light": {
            deviceSet = await DeviceSetModel.findOne({ lightId: device._id })
            await handle_light_data(topic, parsed_message.data, device)
            break
        }
        case "dht11": {
            deviceSet = await DeviceSetModel.findOne({ DHT11Id: device._id })
            await handle_dht11_data(topic, parsed_message.data, device)
            break
        }
        default: {
            return
        }
    }

    await update_traffic_light(deviceSet)
}

export {
    subscribe_topics,
    handle_event,
}
