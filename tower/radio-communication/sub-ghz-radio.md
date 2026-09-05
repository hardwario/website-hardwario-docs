---
slug: sub-ghz-radio
title: Sub-GHz Radio
---
import Image from '@theme/IdealImage';

Radio communication technology is the heart of the **TOWER Kit**. This document describes the basic operation of the radio.

With our Iot Kit, you can build your network in the Sub-GHz band.

:::info

The radio frequency **868 MHz (for Europe)** or **915 MHz (for the U.S.)** allows long-distance communication and offers low-power operation. Since this frequency band is used for signal messages, you will not encounter interference with streaming protocols like WiFi, Bluetooth, etc.

:::

## Communication Range

We have done several radio communication tests. We claim, that from a single point, you are typically able to provide full-house radio coverage.

On the other hand, several factors influence the communication distance. The most important is the building material from which you have built your house, obstacles in the path, interference from other appliances, etc.

The only objective radio communication range measurement is a so-called line-of-sight distance measured outdoors.

:::tip

We’ve achieved [**more than 500 meters**](https://www.youtube.com/watch?v=6zdQQdwV3GQ&feature=youtu.be) of line-of-sight communication range between two Core Modules.

Also, the single Radio Dongle / Core Module is enough to cover a three-story house and the whole garden around it.

:::

:::note

On the other hand, if the radio communication range is not sufficient, the network can be expanded on the IP level thanks to MQTT message replication to a master server.

:::

## Radio Topology

TOWER supports only **star network topology**. Such configuration offers high reliability, easy troubleshooting and deterministic service time from batteries.

There are two types of devices in the TOWER radio network.

- [**Radio Dongle**](../hardware-modules/about-radio-dongle.md): You can pair **up to 32 devices**
- **Radio Node**: Every node has to be paired to the gateway. A node device can be some sensor (e.g. temperature, humidity, CO2) or actuator (power relay, LCD, LED strip controller).

:::info

To read more about how to pair nodes, you can visit the [**Radio Network Management chapter**](../desktop-programming/radio-network-management.md).

:::

## Radio Power Management

As the gateway is powered all the time it always listens for the messages. Thanks to this it should be no problem for the node to send a message to the gateway.

On the other hand, all the battery-operated nodes should have the radio turned off most of the time, as it takes a lot of power.

This is not a problem if you just want to send some messages from the device, because the device will just turn the radio on, send the message and then turn the radio off.

If you want to control the radio node from the gateway, for example, if you have a radio node with the [**Relay Module**](../hardware-modules/about-relay-module.md)(low-power relay) connected and you want to control it by sending messages from the gateway, there are two ways to do it.

### Using power adapter

By using [**Power Module**](../hardware-modules/about-power-module.md) or [**Core Module**](../hardware-modules/about-core-module.md) powered constantly you can enable radio mode `TWR_RADIO_MODE_NODE_LISTENING` in your firmware.

:::note

You can use this only thanks to the constant power input. It is unusable for battery-operated devices for a longer period.

:::

```c
void application_init(void)
{
    twr_radio_init(TWR_RADIO_MODE_NODE_LISTENING);
}
```

### Set listening timeout for sleeping node

You can set the listening timeout for a sleeping node while initializing the radio with the `twr_radio_set_rx_timeout_for_sleeping_node(TIME_IN_MILLISECONDS)`.

:::info

In the example below the temperature is sent every 10 minutes, after the temperature is sent, the node will listen for the set 400 milliseconds.

Thanks to this, you can wait for the temperature message for example in the [**Node-RED flow**](../desktop-programming/node-red-programming.md) and then immediately react to that message by sending the desired Relay Module state. You will of course have to save the relay state in the flow and send it only after the temperature message comes.

:::

:::caution

This is usable only for devices that can have a long delay before the change takes place.

:::

<details>
<summary>
<b>
bcf --help output
</b>
</summary>
<p>

```c showLineNumbers
/* Temperature event handler, this will just send the value through the radio *
 * and allow the Core Module to switch to Listening mode for 400ms            */
void tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)
{
    float value;
    event_param_t *param = (event_param_t *)event_param;

    if (event == TWR_TMP112_EVENT_UPDATE)
    {
        twr_radio_pub_temperature(param->channel, &value);
        param->value = value;
        values.temperature = value;
    }
}

void application_init(void)
{

    static twr_tmp112_t temperature;
    twr_tmp112_init(&temperature, TWR_I2C_I2C0, 0x49);
    twr_tmp112_set_event_handler(&temperature, tmp112_event_handler, NULL);
    twr_tmp112_set_update_interval(&temperature, 60 * 1000);               // Update every 10 minutes

    twr_radio_init(TWR_RADIO_MODE_NODE_SLEEPING);
    twr_radio_pairing_request("relay", VERSION);
    twr_radio_set_rx_timeout_for_sleeping_node(400);
}
```

</p>
</details>

## Radio Parameters

| Parameter                        | Value     |
| :------------------------------- | :-------- |
| Communication Frequency (Europe) | 868.0 MHz |
| Communication frequency (U.S.)   | 915.0 MHz |
| Modulation Type                  | GFSK      |
| Modulation Rate                  | 19.2 kbps |
| TX Frequency Deviation           | 20 kHz    |
| TX Transmit Power                | 11.6 dBm  |
| RX Filter Bandwidth              | 100 kHz   |


## Packet Structure

| PRE(4) | SYN(4) | LEN(1) | DST(1) | DATA(0..60) | CRC(2) |
| :----- | :----- | :----- | :----- | :---------- | :----- |

#### Explanation of each part

- **PRE(4)**: This part is called the preamble and consists of an alternating sequence of zeroes and ones (32 bits).
- **SYN(4)**: This part is called synchronization word and has a fixed value of 0x88888888.
- **LEN(1)**: This part determines the length of the DATA plus 1 (DST field is also counted).
- **DST(1)**: This is the destination address (for logic network addressing).
- **DATA(0..60)**: Variable length payload data field.
- **CRC(2)**: Checksum calculated over all fields excluding PRE and SYN fields. The polynomial of the CRC engine is 0x1021.
