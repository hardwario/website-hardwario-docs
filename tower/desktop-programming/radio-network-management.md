---
slug: radio-network-management
title: Radio Network Management
---
import Image from '@theme/IdealImage';
import ReactPlayer from 'react-player'

In this chapter, we will go over the **Devices Tab** of Playground
## Devices Tab

On this tab, you can connect to the **Radio Dongle**

Choose the **Radio Dongle** (there should be `twr-usb-dongle` or `bc-usb-dongle` on the line) from the dropdown list and click **Connect**.

If you just bought the **Radio Dongle** from our shop, you should receive it with the correct firmware and everything should work.

<Image img={require('./images/devices-dongle-selection.png')}/>
<br />

:::tip

If the connect button returns an error, your **Radio Dongle** may have the wrong firmware. To fix this, go to **Firmware Tab** and flash `twr-gateway-usb-dongle` firmware to your **Radio Dongle**.

If you don't know how to work with **Firmware Tab** you can visit a [**Firmware Flashing chapter**](./firmware-flashing.md).

:::

After you successfully connect to your **Radio Dongle** the **Start pairing** button should light up and if there are any paired devices, you should see them in the list.

<Image img={require('./images/devices-dongle-connected.png')}/>
<br />

:::caution

You can change the **device alias** with the **Rename** button next to it but this will change all the MQTT messages so **change it only if you know what you are doing**.

:::

### Pairing New Devices

- Disconnect power from the device (remove **batteries** or [**Battery Module**](../hardware-modules/about-battery-module.md), disconnect the USB cable, remove DC jack from [**Power Module**](../hardware-modules/about-power-module.md))
- Click on the **Start pairing** button (it should **turn red**)
- Apply power to the device
- Repeat with all the modules you want to pair

:::tip

To learn about the next tab visit [**MQTT Messages Management**](./mqtt-messages-management.md).

:::

## Video Tutorial

If you prefer a video guide, you can watch this video for the older Playground version, but it works the same.

<ReactPlayer controls src='https://youtu.be/ESrTEdV9PJQ' />

