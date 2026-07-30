---
title: Additional Hardening & Data Flow
---

# Additional Hardening & Data Flow

Part of FIBER Lite's complete pre-integrated pipeline, on top of the base
[**Install Node-RED**](/fiber/installation/node-red) step. Optional but recommended on a FIBER
install too if you want the same hardening.

1. Set an explicit credential-encryption secret. Without this, Node-RED regenerates a new one on
   every restart and any stored flow credentials become unrecoverable. In
   `~/.node-red/settings.js`, uncomment and set:

   ```js
   credentialSecret: "<a random secret>",
   ```

1. Secure the editor. It is **wide open by default** — Node-RED's own install output explicitly
   warns against exposing it unsecured. Generate a password hash:

   ```sh
   node-red admin hash-pw
   ```

   Then, in `settings.js`, uncomment and fill in the `adminAuth` block with that hash:

   ```js
   adminAuth: {
       type: "credentials",
       users: [{
           username: "admin",
           password: "<bcrypt hash from above>",
           permissions: "*"
       }]
   },
   ```

   ```sh
   sudo systemctl restart nodered.service
   ```

1. Install the InfluxDB node:

   ```sh
   cd ~/.node-red && npm install node-red-contrib-influxdb
   sudo systemctl restart nodered.service
   ```

   :::tip

   A restart is required — Node-RED does not hot-load newly installed node types while already
   running.

   :::

1. Build a flow: **MQTT in** (topic `application/+/device/+/event/up`, broker
   `localhost:1883`) → **Function** (parse the ChirpStack uplink JSON, set `msg.measurement` and
   `msg.payload = [fields, tags]`) → **InfluxDB out** (config node: `influxdbVersion: "2.0"`,
   `url: http://localhost:8086`, token from the InfluxDB setup step below; node: `org:
   fiber-lite`, `bucket: fiber-lite`).

   :::tip

   Without a LoRaWAN gateway/device connected yet, this flow is scaffolding — build it now so
   it's ready as soon as a gateway and device are registered (see
   [Register a Gateway and a Device](/fiber/installation/register-device) above) and passing real
   uplinks.

   :::
