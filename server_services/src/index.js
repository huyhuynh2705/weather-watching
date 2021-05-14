const { url, server_port, dht11_topic, trafic_light_topic, light_watcher_topic } = require("./environments")
const { mongoose } = require('./helpers')
const mqtt = require("mqtt")

const mqtt_client = mqtt.connect(url, server_port)


mongoose.connection.on("error", (error) => {
    console.log("Mongo db connect fail", error)
})

mongoose.connection.once("open", (error) => {
    console.log("Mongo db connected")
})

mqtt_client.on("connect", () => {
    console.log("mqtt server connected")
    mqtt_client.subscribe(dht11_topic)
    mqtt_client.subscribe(trafic_light_topic)
    mqtt_client.subscribe(light_watcher_topic)
})

mqtt_client.on("error", (error) => {
    console.log("mqtt connect fail")
    console.log("err", error)
})

mqtt_client.on("message", (topic, message) => {
    console.log("topic", topic)
    console.log("message", message.toString())
})
