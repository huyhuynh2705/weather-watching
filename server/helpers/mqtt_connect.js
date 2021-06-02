import mqtt from 'mqtt'
import { url, url2, server_port, dht11_topic, trafic_light_topic, light_watcher_topic } from "../environments/index.js"

const create_connect = (url) => {
    console.log(url)
    const mqtt_client = mqtt.connect(url, server_port)

    return mqtt_client
}


const mqtt_client = create_connect(url)
const mqtt_client2 = create_connect(url2)

export {
    mqtt_client,
    mqtt_client2
}
