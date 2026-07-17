---
slug: downlink
title: Downlink
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Downlink

A **downlink** is a message sent **from the Cloud to the device**. HARDWARIO Cloud supports three
kinds of downlink message: **Data**, **Config**, and **Shell**.

To send a **Data** or **Config** downlink from the web interface, open the device's messages and click
**+&nbsp;SCHEDULE DOWNLINK** in the top-right corner. Because the device is usually asleep to save
power, a downlink is **queued** and delivered the next time it boots, sends an uplink, or polls the
Cloud — so the response may not appear immediately.

## Data

You can send JSON commands that the device decodes; your code then receives a structure with the
filled data.

![The "Schedule downlink" dialog for sending a data message to the device](images/downlink-data.png)

## Config

Change the device's configuration the same way you would over BLE or J-Link RTT — send one or more
`app config` commands, and CHESTER applies them the next time it sends an uplink packet or polls the
Cloud. You can provide them as plain text or as a JSON message:

<Tabs>
  <TabItem value="text" label="Text" default>

```
app config mode lte
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

  </TabItem>
  <TabItem value="json" label="JSON">

```json
{
  "type": "config",
  "device_id": "<device-id>",
  "body": [
    "app config mode lte",
    "app config interval-sample 60",
    "app config interval-aggreg 300",
    "app config interval-report 1800"
  ]
}
```

  </TabItem>
</Tabs>

:::warning[Do not send config save over the Cloud]

When you configure a device **locally** you finish with `config save` to persist the changes and
reboot. **Over the Cloud you must not send `config save`** — HARDWARIO Cloud applies and saves the
configuration for you automatically. Adding it yourself can double-apply the change, so simply omit it.

:::

For the full list of configuration parameters see the CHESTER
[**Default Configuration**](/chester/catalog-applications/common-functionality#default-configuration)
reference; the `app config show` command prints a device's current values.

## Shell Commands

In the messages or device detail, click the **shell** icon to open the shell console.

![The shell icon that opens the downlink shell console](images/shell-icon.png)

In the console you can enter **single or multiple commands** that run the next time **CHESTER** boots,
sends data, or polls the Cloud. You then receive the **response of every command** back in the console —
you don't need to keep the window open. Schedule commands and come back later (even the next day) to
see the results.

Any device shell command works here. Some useful ones:

| Command | Description |
| --- | --- |
| `help` | List all available shell commands |
| `info show` | Show device info — HARDWARIO Serial Number (HSN), firmware version, etc. |
| `app config show` | Print the application configuration |
| `lte config show` | Print the NB-IoT/LTE network configuration |
| `lrw config show` | Print the LoRaWAN network configuration |
| `config reset` | Reset the configuration to its defaults |

![The shell console showing scheduled commands and their responses](images/shell-console.png)
