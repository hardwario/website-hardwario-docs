---
title: LoRaWAN
title_meta: "LoRaWAN (EMBER)"
description: "EMBER Hotspot configuration: connect the LoRa card to the HARDWARIO managed service, your own LoRaWAN server or Datacake."
---

# LoRaWAN

:::tip

You can ignore the default **TTN** servers.

:::

```
/iot lora servers add address=192.168.16.1 down-port=1700 name=ember-cloud up-port=1700 protocol=UDP
/iot lora set 0 antenna=uFL disabled=no name=gateway-0 network=private servers=ember-cloud
```

:::caution

In case you do not use the HARDWARIO managed service, you have to use your **LoRaWAN** server IP address, and you don't have to configure the VPN tunnels.

:::

## Datacake

**Datacake** is an IoT platform that hosts a **LoRaWAN** server. To connect **EMBER** to **Datacake**, you need to register an account and create a dashboard. To add your device to the dashboard:

* Add the **Datacake** server to the server list by running the following command on **RouterOS**

```
/iot lora servers add address=eu1.datacake-lns.com up-port=1700 name=datacake down-port=1700 protocol=UDP
```

* Assign the **Datacake** server to the **LoRa** device

```
/iot lora set 0 servers=datacake
```

* Add the gateway by providing the following details:
    - A name for the gateway (any name)
    - The `Gateway EUI` (labeled as `Gateway ID` on RouterOS under `LoRa` > `Devices` > `gateway`)
    - Frequency (according to the device's location)
