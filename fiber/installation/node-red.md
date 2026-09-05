---
title: Install Node-RED
---

# Install Node-RED

1. Download and run the **Node-RED** installation script:

   ```sh
   bash <(curl -sL https://github.com/node-red/linux-installers/releases/latest/download/install-update-nodered-deb)
   ```

   :::tip

   The release asset above is named `install-update-nodered-deb`. If it 404s in the future,
   check the [node-red/linux-installers releases page](https://github.com/node-red/linux-installers/releases)
   for the current asset name.

   :::

1. Enable the **Node-RED** service to start automatically on boot:

   ```sh
   sudo systemctl enable nodered.service
   ```

1. Reboot the system to complete the installation:

   ```sh
   sudo reboot
   ```

1. Now, you can access **Node-RED** at this address: `http://[TARGET IP ADDRESS]:1880/`

## Hardening & Data Flow

1. Set an explicit credential-encryption secret. Without this, Node-RED regenerates a new one on
   every restart and any stored flow credentials become unrecoverable. In
   `~/.node-red/settings.js`, uncomment and set:

   ```js
   credentialSecret: "<a random secret>",
   ```

1. Secure the editor. It is **wide open by default**. Node-RED's own install output explicitly
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

   A restart is required, because Node-RED does not hot-load newly installed node types while already
   running.

   :::

1. Build a flow: **MQTT in** (topic `application/+/device/+/event/up`, broker
   `localhost:1883`) → **Function** (parse the ChirpStack uplink JSON, set `msg.measurement` and
   `msg.payload = [fields, tags]`) → **InfluxDB out** (config node: `influxdbVersion: "2.0"`,
   `url: http://localhost:8086`, token from the [Install InfluxDB](/fiber/installation/influxdb/) step; node: `org:
   fiber`, `bucket: fiber`).

   :::tip

   Without a LoRaWAN gateway/device connected yet, this flow is scaffolding. Build it now so
   it's ready as soon as a gateway and device are registered (see
   [Register a Gateway and a Device](/fiber/installation/register-device/) above) and passing real uplinks.

   :::
