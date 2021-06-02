import dotenv from 'dotenv'
console.log(process.env.NODE_ENV)
const path = process.env.NODE_ENV == 'production' ? '.env.production': '.env.development'
dotenv.config({ path })

const server = process.env.SERVER || "io.adafruit.com"
const server_port = process.env.SERVER_PORT || 8883
const username = process.env.USERNAME_ADAFUIRT || ""
const key = process.env.KEY_ADAFUIRT || ""
const username2 = process.env.USERNAME_ADAFUIRT_2 || ""
const key2 = process.env.KEY_ADAFUIRT_2 || ""

const url = process.env.URL || `mttqs://${username}:${key}@${server}`
const url2 = process.env.URL || `mttqs://${username2}:${key2}@${server}`
const mongodb_url = process.env.MONGODB_URL || ""

const dht11_topic = process.env.DHT11_TOPIC || "buiduchuy/feeds/hhhh-dht11"
const light_watcher_topic = process.env.LIGHT_WATCHER_TOPIC || "buiduchuy/feeds/hhhh-light-watcher"
const trafic_light_topic = process.env.TRAFIC_LIGHT_TOPIC || "buiduchuy/feeds/hhhh-traffic-light"

export {
    url,
    url2,
    server_port,
    mongodb_url,
    dht11_topic,
    light_watcher_topic,
    trafic_light_topic,
}
