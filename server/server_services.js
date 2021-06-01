import {mongoose, mqtt_client, mqtt_client2} from './helpers/index.js'
import { subscribe_topics, handle_event } from './services/index.js'
import { url, url2, server_port, dht11_topic, trafic_light_topic, light_watcher_topic } from "./environments/index.js"

mongoose.connection.on("error", (error) => {
    console.log("Mongo db connect fail", error)
})

mongoose.connection.once("open", (error) => {
    console.log("Mongo db connected")
})

mqtt_client.on("connect", () => {
    console.log("mqtt server connected")
    subscribe_topics()
})

mqtt_client.on("error", (error) => {
    console.log("mqtt connect fail")
    console.log("err", error)
    process.exit(1)
})

mqtt_client2.on("error", (error) => {
    console.log("mqtt connect fail")
    console.log("err", error)
    process.exit(1)
})

mqtt_client.on("message", (topic, message) => {
    handle_event(topic, message)
})

mqtt_client2.on("message", (topic, message) => {
    handle_event(topic, message)
})
