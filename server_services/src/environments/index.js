require('dotenv').config()

const server = process.env.SERVER || "io.adafruit.com"
const server_port = process.env.SERVER_PORT || 8883
const username = process.env.USERNAME || ""
const key = process.env.KEY || ""

const url = process.env.URL || `mttqs://${username}:${key}@${server}`
const mongodb_url = process.env.MONGODB_URL || ""

const dht11_topic = process.env.DHT11_TOPIC || "buiduchuy/feeds/hhhh-dht11"
const light_watcher_topic = process.env.LIGHT_WATCHER_TOPIC || "buiduchuy/feeds/hhhh-light-watcher"
const trafic_light_topic = process.env.TRAFIC_LIGHT_TOPIC || "buiduchuy/feeds/hhhh-traffic-light"

module.exports = {
    url,
    mongodb_url,
    dht11_topic,
    light_watcher_topic,
    trafic_light_topic,
}
