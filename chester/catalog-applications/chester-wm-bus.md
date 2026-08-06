---
slug: chester-wm-bus
title: CHESTER wM-Bus
---
import Image from '@theme/IdealImage';

# CHESTER wM-Bus

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/chester-wm-bus.png')} width={376} height={376} alt="CHESTER wM-Bus gateway in a white wall-mount enclosure with two external antennas" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />
:::caution

Some of the basics are not provided, as they are common for all CHESTER catalog applications. Please see:

- [**Getting started**](https://docs.hardwario.com/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Management**](../category/platform-connectivity) on how to work with the interactive console.

:::


## Application Overview

**CHESTER wM-Bus** is a **Wireless M-Bus** gateway. It **supports all wM-Bus meters of the T1 and C1 classes, regardless of manufacturer**, and works as a **pass-thru gateway** — the decoding of the received telegrams into meaningful units happens in the end IoT application.

The device listens for the configured wM-Bus meters in specific intervals, aggregates the raw received wM-Bus packets and sends them over the **NB-IoT/LTE-M** network.

It is used in homes and apartments for measuring the consumption of **heat**, **gas**, **electricity**, **water** and reading **other wM-Bus devices**.

The device has **two antennas** that can be switched during reception to achieve ideal reception for scanning in **both polarizations**.

The device can be configured to do **periodic**, **daily**, **weekly** or **monthly scans**.

The device has a sufficiently low power consumption that it can operate from batteries for 7+ years at a daily readout. A version with an external power supply can also be ordered.

CHESTER wM-Bus only receives raw hexadecimal wM-Bus telegrams. Neither the device nor HARDWARIO Cloud interprets the meter data — each wM-Bus meter has its own representation of the encoded data, and the telegrams may also be encrypted. Decoding the raw hexadecimal values into meaningful units is up to the customer or integrator. Encrypted telegrams can optionally be decrypted on the Cloud side, see [HARDWARIO Cloud – Decryption Keys](#hardwario-cloud--decryption-keys).

This device supports the newer **LTEv2** stack and **HARDWARIO Cloud v2**.

## Application Variants

**CHESTER wM-Bus** can be ordered in one of these variants:

### CHESTER wM-Bus

Battery powered with 6 pcs alkaline "D" cells.

The catalog **CHESTER wM-Bus** hardware consists of the following ordering codes:

* `CHESTER-M-CES` - Standard mainboard w/o supercapacitors

* `CHESTER-B1W` - B1 carrier board with wM-Bus radio.

See [**Ordering Codes**](../ordering-codes.md) for more details.

### CHESTER wM-Bus DC

Externally powered 230V DC adapter.

The catalog **CHESTER wM-Bus DC** hardware consists of the following ordering codes:

* `CHESTER-M-CS` - Standard mainboard w/ supercapacitors

* `CHESTER-B1W` - B1 carrier board with wM-Bus radio.

See [**Ordering Codes**](../ordering-codes.md) for more details.

## Scanning and Behavior

Addresses of the wM-Bus devices and device mode could be imported and reconfigured over the cloud.

The device has adjustable parameters where it can scan wM-Bus devices periodically, daily, weekly or monthly. The scan time and other parameters can also be set.

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config scan-timeout 130
app config scan-interval 600
app config scan-hour 12
app config scan-weekday 3
app config scan-day 15
app config scan-mode off
app config scan-ant dual
app config poll-interval 28800
app config downlink-wdg-interval 172800
```

If you have any wM-Bus addresses configured, you will also see them in the log together with the count of them.

```
app config address count 1
app config address add 81763000
```

## Specific Commands

:::info

You can easily explore the whole command tree structure - start with the `help` command.

:::

:::caution

To apply a new configuration, you need to call `config save`, which applies the new configuration parameters and reboots the device. This applies only if you configure the device over Bluetooth or J-Link.
This is not needed if you apply commands in a batch over the cloud.

:::

### Address List Configuration

`wm scan`

Performs a scan and lists all devices in range (shows their addresses and manufacturer).

`wm enroll <timeout> <threshold>`

Registers (enrolls) all devices within range.

- `timeout` – duration of the scan in seconds.  
- `threshold` (RSSI) – minimum signal strength of devices to be accepted (range 0 to -150 dBm).  

If parameters are not provided, the default value from `config timeout` is used.

`app config address`

Lists all saved device addresses. If this listing is done via BLE and contains a large number of devices (dozens), we recommend resetting the device after this listing.

`app config address add 123456`

Adding a sensor that broadcasts all year round with the address 123456.

`app config address remove 123456`

Removing a sensor from the list.

`app config address erase`

Removing all sensors from the list.

`config save`

After completing the configuration, you need to confirm everything.

`send`

Sends values from the collected data to the cloud.  
Useful to verify the data flow and check if sensors are sending data correctly.

:::caution
**Behavior without addresses** → If no addresses are configured, the device scans all available devices and sends all their data to the cloud.
:::

### Cloud Decode Configuration

`app config cloud-decode false/true`

- `false` – messages are sent in raw (binary) format.  
- `true` – the cloud decodes messages into a readable (JSON) format.  
  If the messages are encrypted, the decryption key from **Variables** is used.


### Scan Configuration

Scanning indicates the time during which CHESTER captures wM-Bus packets. The scan method is set by the `scan-mode` parameter.

`app config scan-mode <mode>`

- **off** - automatic scan off, ideal for shipping or location tuning with manual scan start
- **interval** - scan in intervals. For debug only, `scan-interval` parameter (ignores set months to scan)
- **daily** - scan once a day, always at the hour set by the `scan-hour` parameter
- **weekly** - scan once a week, always at the hour and day of the week set by the `scan-hour` and `scan-weekday` parameters
- **monthly** - scan once a month, always at the hour and day of the month set by the `scan-hour` and `scan-day` parameters

`app config scan-timeout 480`

After the scan is started, it is scanned for the maximum `scan-timeout` time (adjustable in the range of 10-86400 seconds), or until packets arrive from all devices from the address list.

This is a safety timer which, in the worst case, prevents the scanning from remaining on indefinitely in case of non-acceptance/failure of the sensor. The timeout is doubled if both antennas are activated by the `scan-ant` parameter.

`app config scan-interval 600`

Fixed scan in intervals if `scan-mode` is set to **interval**, for debug only, units of seconds 0-86400.

`app config scan-hour 12`

It determines the hour at which the scan should start. CHESTER device clocks operate in UTC. The device does not distinguish between time zones or daylight savings time. The correct hour must be considered with some margin if wM-Bus sensors automatically change their clocks to summer/winter time.

`app config scan-weekday 2`

Specifies the day of the week to scan for a weekly scan. 0 - Sunday, 1 - Monday, ...

`app config scan-day 2`

Specifies the day of the month when scanning 1-28 during the monthly scan

`app config scan-ant <mode>`

**single** - scan uses only one cycle with one antenna, if it receives data from all devices, it sends data immediately, if not, it sends data after the `scan-timeout` timeout

**dual** - the scan takes place twice, each time with a different antenna. If all devices are not scanned in the first cycle with antenna 1, a second scan with the second antenna is started. Each scan takes a maximum of scan-timeout seconds. The maximum time when the wM-Bus receiver is active is equal to 2x `scan-timeout`.

`config save`

After completing the configuration, you need to confirm everything.

## Example Configurations

When configuring over BLE, you need to apply the configuraiton changes with `config save` command.

When configuring over [Cloud config downlink commands](../../cloud/downlink/config), don't add `config save` command, it is applied automatically. Othwerwise the configuration is not

### Interval and wM-Bus Packets Every 2 Minutes

wM-Bus devices send a packet every 2 minutes.
We want to use only one antenna.
We want to send data to the cloud every 2 hours.
All devices are year-round, transmitting (the same) in summer and winter.

```
app config scan-mode interval
app config scan-interval 7200   (measurement every 2 hours = 7200 seconds)
app config scan-timeout 130     (sensors send every 2 minutes = 120 seconds + reserve)
app config scan-ant single      (only one antenna, we scan for 130 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

### Interval and wM-Bus Packets Every 2 minutes, Two Antennas

wM-Bus devices send a packet every 2 minutes.
We want to use both antennas for better reception, each oriented differently to change polarity.
We want to send data to the cloud every 2 hours.
All devices are year-round, transmitting (the same) in summer and winter.

```
app config scan-mode interval
app config scan-interval 7200   (scanning every 2 hours = 7200 seconds)
app config scan-timeout 130     (sensors send every 2 minutes = 120 seconds + reserve)
app config scan-ant dual        (both antennas, we scan up to 130 seconds with one antenna and another up to 130 seconds with the second antenna, effectively scanning up to 260 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

### Interval and wM-Bus Packets Sending Every Hour

wM-Bus devices send a packet every 1 hour.
We want to use only one antenna.
We want to send data to the cloud every hour.
All devices are year-round, transmitting (the same) in summer and winter.

**This configuration is not for battery variant, because it scans constantly**

```
app config scan-mode interval
app config scan-interval 3620   (scanning every hour = 3600 seconds + 20 seconds reserve for sending)
app config scan-timeout 3600    (scanning up to 3600 seconds)
app config scan-ant single      (one antenna, we scan up to 3580 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

### Daily scanning

wM-Bus devices send a packet every 1 hour.
We want to use only one antenna.
We want to send data to the cloud once a day.
All devices are year-round, transmitting (the same) in summer and winter.

**This configuration is not optimal for battery variant**

```
app config scan-mode daily      (daily scanning)
app config scan-hour 12         (always at 12 o'clock UTC (for CET, conversion is needed))
app config scan-timeout 3600    (scanning up to 3600 seconds)
app config scan-ant single      (one antenna, we scan up to 3600 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

## Firmware

The latest firmware is available in Catalog Applications [Firmware chapter](index.md#application-firmware).

## Example JSON Message

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
In this example **JSON** you can see raw data from two wM-Bus sensors

Each JSON cloud message contains up to 20 wM-Bus packets. If CHESTER is configured for more than 20 devices, then the raw wM-Bus packets are split to multiple JSON messages.

<details>
<summary><b>Show JSON Example</b></summary>
<p>

```json
{
    "accelerometer": {
        "accel_x": 0.22,
        "accel_y": 0.07,
        "accel_z": 9.42,
        "orientation": 2
    },
    "battery": {
        "current_load": null,
        "voltage_load": null,
        "voltage_rest": null
    },
    "frame": {
        "protocol": 3,
        "sequence": 0,
        "timestamp": 1698660040
    },
    "network": {
        "parameter": {
            "band": 1184866148,
            "cid": 248833,
            "earfcn": -2121962691,
            "ecl": 536882852,
            "eest": 0,
            "plmn": 536882852,
            "rsrp": 384479,
            "rsrq": 508,
            "snr": 0
        }
    },
    "state": {
        "uptime": 47
    },
    "thermometer": {
        "temperature": 22.31
    },
    "wmbus": {
        "cycle": 1,
        "devices": 2,
        "packets": [
            {
                "data": "32446850003076816980a0919f2b06007007000061087c08000000000000000000000000010101020100000000000000000000",
                "rssi": -65
            },
            {
                "data": "32446850003076816980a0919f2b06007007000061087c08000000000000000000000000010101020100000000000000000000",
                "rssi": -72
            }
        ],
        "part": 0,
        "received": 2,
        "scan_time": 17
    }
}
```

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Show JSON Example</b></summary>
<p>

```json
{
  "system": {
    "uptime": 15000,
    "voltage_rest": 3.6
  },
  "wmbus": {
    "status": 0,
    "packet_count": 125,
    "message": "0412345678..." 
  }
}
```

</p>
</details>

  </TabItem>
</Tabs>



## HARDWARIO Cloud – Decryption Keys

The **transmitted messages from wM-Bus devices are encrypted** to optimize energy consumption during data transmission, which extends the overall battery life.  

The **received data must therefore be decrypted**, which is done using **decryption keys**.  

In this section, we will show **how to add individual decryption keys** into the Cloud using the **Variables** section.  

:::tip
If you are not sure how to **get started with the Cloud**, follow this tutorial: [**HARDWARIO Cloud v2**](/cloud/)
:::

### Step-by-Step Instructions

1. In the left sidebar, select **Variables**.  
2. Click the **+ NEW VARIABLE** button in the top-right corner.  
3. Fill in the following information:  
   - **Device** → select your device  
   - **Name of Variable** → enter the wM-Bus address of the device  
   - **Value of Variable** → enter the decryption key assigned to your device  
   - **Environment** → select `wmbus`  
   - **Comment** → optional, you may add a comment if needed  
4. Your data should now appear **decrypted** in the Cloud.  

:::info
There is also the option to take the incoming data from the Cloud and **manually decrypt** it using the **online tool**: [https://wmbusmeters.org/](https://wmbusmeters.org/).  
:::

## Supported wM-Bus Sensors

**CHESTER wM-Bus receives packets from any wM-Bus meter transmitting in the T1 or C1 mode, regardless of manufacturer.** There is no compatibility list to check your meters against.

The device works as a **pass-thru gateway**: it forwards the received wM-Bus telegrams to the Cloud, and the **decoding into meaningful units happens in the end IoT application**. Optionally, the telegrams can be decrypted on the Cloud side using the [decryption keys](#hardwario-cloud--decryption-keys) stored per device.

The meters listed below are the ones we have tested in-house and documented — including **water meters**, **heat meters** and **heat cost allocators** from **BMeters** and **Zenner**. They are a starting point, not a limitation.

➡️ [Tested wM-Bus Sensors](https://docs.hardwario.com/chester/supported-devices/wm-bus_sensors)

---

## Changelog

### v3.5.1 — 2025-12-08

- **Added**: Enroll (teach) mode for wireless meter pairing
- **Added**: Scan-all mode with cloud-side decode configuration support
- **Added**: Shell send command for manual packet injection
- **Added**: Manufacturer field in decoded data

### v3.5.0 — 2025-12-03

- **Fixed**: Receiving of long wM-Bus packets (previously truncated or dropped)
- **Added**: Battery-powered variant support (6× D-cell) alongside the existing DC-powered variant
- **Changed**: Cloud v2 protocol adopted (CBOR encoding, new API endpoints); Cloud v1 firmware was not available for this application

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
