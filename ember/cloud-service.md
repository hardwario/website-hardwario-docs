---
slug: cloud-service
title: Cloud Service
---
import Image from '@theme/IdealImage';

# Cloud Service

To get the **EMBER Cloud** service, you need to have at least one **EMBER Hotspot**.

With this service, you get your own instance of [**ChirpStack**](https://www.chirpstack.io/) and [**Node-RED**](https://nodered.org/) accessible through the web management UI.

Access is secured by the **HTTPS/TLSv1.3** protocol, and the user identity is created in the **EMBER Cloud** service by the **HARDWARIO** team during service setup.

You do not need any specialized software on your PC/mobile to manage the service. An up-to-date web browser is sufficient.

The **EMBER Cloud** service operates on the virtual private servers of the [**Digital Ocean**](https://www.digitalocean.com/products/droplets) cloud computing service.

## Web Management

The web management provides access to **ChirpStack** and **Node-RED** applications through the **Teleport** service.

:::caution

**HARDWARIO** support team will create a user account.

:::

The web management login URL: `https://<customer identifier>-<service index>.ember.hardwario.cloud/`

:::tip

You have to replace &lt;customer identifier&gt; with your identification assigned by **HARDWARIO** (usually a company name).

:::

You need one of those methods for multifactor authentication:

* **Google Authenticator** or a compatible application on mobile

* **FIDO2** - universal 2nd factor (**U2F**) USB key (e.g., **Security Key Series**)

* **FIDO2** - universal 2nd Factor (**U2F**) passwordless (e.g., **YubiKey Bio Series**)

The services mentioned below are accessible through the **Applications** menu item. The services are identified by these abbreviations:

* `cs` - **ChirpStack** application

* `nr` - **Node-RED** application

To access the specific service, click on the **LAUNCH** button.

## ChirpStack LoRaWAN Server

The **Teleport** service will bring the user to the following URL:

```
https://ember-<customer identifier>-<service index>-cs.tp.hardwario.com/
```

These are the default login credentials:

* Username: `admin`

* Password: `admin`

:::tip

You do need to change that because you are identified and authenticated by logging into the **Teleport** web user interface.

:::

### LoRaWAN Gateways

List of all **EMBER Hotspots** with the **Last seen** value and activity overview.

### LoRaWAN Applications

In this section, the user can define the method to pass data from the **LoRaWAN** devices to **LoRaWAN** applications (which can be the user's endpoints).

Each application encapsulates a list of **LoRaWAN** devices (e.g. **CHESTER**).

You can check the **LoRaWAN** activity for any **CHESTER** device.

Every **CHESTER** device has to be registered in the **Application** section.

The recommended option is to use the **ABP** method (Activation By Personalization). For this method, the user will need to specify (or generate) the following parameters:

* **Device EUI** - also referred to as `DevEUI`

* **Network session key** - also referred to as `NwkSKey`

* **Application session key** - also referred to as `AppSKey`

:::tip

In **ChirpStack**, The **ABP** method is used when the user does not enable the `Device supports OTAA` checkbox under the specific device profile.

:::

:::caution

For security reasons, the **ABP** method is suitable for the LoRaWAN devices where reboots are not expected.

:::

## Node-RED Application

The **Teleport** service will bring the user to the following URL:

```
https://ember-<customer identifier>-<service index>-nr.tp.hardwario.com/
```

Data are passed from the **LoRaWAN** server to **Node-RED** by **Mosquitto** (the **MQTT** server). The MQTT server is provided by the **EMBER Cloud** service at `localhost:1883`.

The uplink data are published using this topic:

```
application/+/device/+/event/up
```

The data processing flow in the **Node-RED** application starts with the **MQTT** message.

:::tip

In **Node-RED**, use the `mqtt client` node to subscribe to the above topic.

:::

After the **MQTT** message is received, the device payload data needs to be decoded based on firmware used in the **LoRaWAN** device (e.g. **CHESTER**).

:::caution

While it is possible to decode the payload in the **ChirpStack** directly, we recommend doing that later in **Node-RED** where the user has a full-featured **Node.js** library for binary buffer parsing and a more robust **JavaScript** interpreter with advanced debugging tools.

:::

Below is the example of the **Node-RED** function (in **JavaScript**) for decoding the **Base64** payload provided by **ChirpStack** in the **MQTT** message:

<details>
<summary><b>Show Node-RED Decoder Function</b></summary>
<p>

```js
if (msg.payload.applicationName !== 'ember-application-chester-clime') {
    return null;
}

if (typeof msg.payload.data === 'string') {
    msg.payload.data = decode(Buffer.from(msg.payload.data, 'base64'));
}

return msg;

function decode(buffer) {
    let data = {};

    let offset = 0;

    let header = buffer.readUInt8(0);
    offset += 1;

    if ((header & 0x01) !== 0) {
        data.voltage_rest = buffer.readUInt16LE(offset);
        offset += 2;

        data.voltage_load = buffer.readUInt16LE(offset);
        offset += 2;

        data.current_load = buffer.readUInt8(offset);
        offset += 1;

        if (data.voltage_rest === 0xffff) {
            data.voltage_rest = null;
        } else {
            data.voltage_rest = data.voltage_rest / 1000;
        }

        if (data.voltage_load === 0xffff) {
            data.voltage_load = null;
        } else {
            data.voltage_load = data.voltage_load / 1000;
        }

        if (data.current_load === 0xff) {
            data.current_load = null;
        }
    }

    if ((header & 0x02) !== 0) {
        data.orientation = buffer.readUInt8(offset);
        offset += 1;

        if (data.orientation === 0xff) {
            data.orientation = null;
        }
    }

    if ((header & 0x04) !== 0) {
        data.therm_temperature = buffer.readInt16LE(offset);
        offset += 2;

        if (data.therm_temperature === 0x7fff) {
            data.therm_temperature = null;
        } else {
            data.therm_temperature = data.therm_temperature / 100;
        }
    }

    if ((header & 0x10) !== 0) {
        data.hygro_temperature = buffer.readInt16LE(offset);
        offset += 2;

        data.hygro_humidity = buffer.readUInt8(offset);
        offset += 1;

        if (data.hygro_temperature === 0x7fff) {
            data.hygro_temperature = null;
        } else {
            data.hygro_temperature = data.hygro_temperature / 100;
        }

        if (data.hygro_humidity === 0xff) {
            data.hygro_humidity = null;
        } else {
            data.hygro_humidity = data.hygro_humidity / 2;
        }
    }

    if ((header & 0x20) !== 0) {
        data.w1_thermometers = [];

        let count = buffer.readUInt8(offset);
        offset += 1;

        for (let i = 0; i < count; i++) {
            let t = buffer.readInt16LE(offset);
            offset += 2;

            if (t === 0x7fff) {
                t = null;
            } else {
                t = t / 100;
            }

            data.w1_thermometers.push(t);
        }
    }

    if ((header & 0x40) !== 0) {
        data.rtd_thermometers = [];

        let count = buffer.readUInt8(offset);
        offset += 1;

        for (let i = 0; i < count; i++) {
            let t = buffer.readInt16LE(offset);
            offset += 2;

            if (t === 0x7fff) {
                t = null;
            } else {
                t = t / 100;
            }

            data.rtd_thermometers.push(t);
        }
    }

    return data;
}
```

</p>
</details>

After decoding, you can further process the data - scalarizing, adding attributes, etc. The last action in the flow should be delivering the data through some common connector, e.g., an **HTTPS** request.

To tune and troubleshoot flow, you can use the `debug` node and the console view in **Node-RED**.

### Integration Examples

Data can be passed to any service via the Internet for processing - e.g., visualization, data storage, and integration with business applications.

Some common integration examples are:

* **REST API**

* Data streaming services:

  * **Azure Event Hub**

  * **Azure IoT Hub**

  * **AWS IoT Core**

  * ...

* **Microsoft Power BI**

* **Ubidots**
