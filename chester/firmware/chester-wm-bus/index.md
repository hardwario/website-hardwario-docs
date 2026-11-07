---
title: CHESTER wM-Bus
description: "Firmware of the CHESTER wM-Bus catalog application: scanning, the address list, every configuration parameter with its default, and the data format."
---

# CHESTER wM-Bus

The **CHESTER wM-Bus** firmware turns CHESTER into a Wireless M-Bus gateway. In scheduled scans it listens for wM-Bus meters, collects their raw telegrams and sends them to HARDWARIO Cloud over NB-IoT/LTE-M. The device does not decode the meter data; HARDWARIO Cloud can decrypt and decode the telegrams on request (see [**Cloud Decode Configuration**](#cloud-decode-configuration)).

The firmware has a single build: the battery-powered CHESTER wM-Bus and [**CHESTER wM-Bus DC**](../../catalog-applications/chester-wm-bus/index.md#chester-wm-bus-dc) both run it.

What all catalog applications share (LED, button, network mode and shell commands) is described in [**Common Functionality**](../../catalog-applications/common-functionality.md). The hardware and the product variants are on the [**CHESTER wM-Bus**](../../catalog-applications/chester-wm-bus/index.md) catalog page.

## Supported Hardware

The firmware works with:

- the **CHESTER-B1** carrier board with the wM-Bus radio and two antennas (see [**Ordering Codes**](../../ordering-codes.md#chester-b1))
- wM-Bus meters of any manufacturer that transmit in the **T1** or **C1** mode (see [**Tested wM-Bus Sensors**](../../supported-devices/wm-bus.md))
- power from primary cells, 3.6 V nominal, 26 000 mAh, or from an external 230 V adapter. The recommended cells are two Saft LSH 20 lithium cells (size D, 3.6 V).

## Scanning and Behavior

Addresses of the wM-Bus devices and device mode can be imported and reconfigured over the cloud.

The device has adjustable parameters where it can scan wM-Bus devices periodically, daily, weekly or monthly. The scan time and other parameters can also be set.

- A scan keeps the wM-Bus receiver on for at most `scan-timeout` seconds. It ends earlier when a packet from every address on the list has arrived, and then the device sends the packets.
- From each meter on the list, the device keeps the first packet it receives in the scan; packets from other meters are ignored.
- Without an address list, the device keeps the first packet from every meter it hears, and the scan always runs for the full `scan-timeout`.
- During a scan, the yellow LED blinks every 2 seconds (twice in a row while the second antenna listens). The red LED lights up for half a second when the data go out.
- Two presses of the mainboard button start a scan, and three presses end the running scan as if `scan-timeout` had expired. One, four and five presses work as described in [**Common Functionality**](../../catalog-applications/common-functionality.md#button-behaviour).

## Configuration Parameters

Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device. The command `app config show` prints the current values, the address list included.

:::caution

The `config save` command is needed only when you configure the device over Bluetooth or J-Link. Commands sent in a batch over the cloud are applied without it.

:::

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `scan-timeout` | Scan timeout | `<1-86400>` | `130` | Longest duration of a scan with one antenna in seconds |
| `scan-interval` | Scan interval | `<30-604800>` | `600` | Time between the starts of two scans in seconds, in the `interval` scan mode |
| `scan-hour` | Scan hour | `<0-23>` | `12` | Hour (UTC) at which the daily, weekly and monthly scans start |
| `scan-weekday` | Scan weekday | `<0-6>` | `3` | Day of the week for the weekly scan: `1` is Monday, `6` is Saturday |
| `scan-day` | Scan day | `<1-31>` | `15` | Day of the month for the monthly scan |
| `scan-mode` | Scan mode | `off`, `interval`, `daily`, `weekly`, `monthly` | `off` | When scans start: never by themselves, in a fixed interval, or once a day, week or month (see [**Scan Configuration**](#scan-configuration)) |
| `scan-ant` | Scan ant | `single`, `dual` | `single` | With `dual`, the scan is repeated with the second antenna when the first one did not receive every address |
| `poll-interval` | Poll interval | `<5-1209600>` | `28800` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `172800` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off |
| `cloud-decode` | Cloud decode | `true`, `false` | `false` | HARDWARIO Cloud decodes the telegrams (see [**Cloud Decode Configuration**](#cloud-decode-configuration)) |

The parameters are the same for the battery-powered device and for CHESTER wM-Bus DC.

The network mode (`app config mode`) and the network settings are described in [**Common Functionality**](../../catalog-applications/common-functionality.md#network-mode-configuration). CHESTER wM-Bus starts in the `lte` mode.

### Address List Configuration

`wm scan`

Performs a scan and lists all devices in range (shows their address, manufacturer and signal strength). When the scan ends, the device sends the data.

`wm enroll <timeout> <threshold>`

Registers (enrolls) all devices within range.

- `timeout`: duration of the scan in seconds (5–86400).
- `threshold` (RSSI): minimum signal strength of devices to be accepted (range -128 to 0 dBm).

If the parameters are not provided, the scan takes `scan-timeout` seconds and accepts devices of any signal strength. The enrolled devices replace the address list: when the scan ends, the device sends the data, saves the new list and restarts.

`app config address`

Lists all saved device addresses. If this listing is done via BLE and contains a large number of devices (dozens), we recommend resetting the device after this listing.

`app config address add 123456`

Adding a sensor that broadcasts all year round with the address 123456. The list holds up to 256 addresses.

`app config address remove 123456`

Removing a sensor from the list.

`app config address erase`

Removing all sensors from the list.

`app config address count 2`

Clears the list before the `add` lines that follow it. If you have any wM-Bus addresses configured, `app config show` prints them in this form together with their count, so a printed configuration can be applied again as it is:

```
app config address count 1
app config address add 81763000
```

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

- `false`: the report carries the raw telegrams: `packets` holds each telegram in hexadecimal (`data`) with its signal strength (`rssi`).
- `true`: HARDWARIO Cloud decodes the telegrams and shows the decoded values in `packets`.
  If the telegrams are encrypted, the cloud uses the decryption key from **Variables** (see [**decryption keys**](#hardwario-cloud--decryption-keys)).

### Scan Configuration

Scanning indicates the time during which CHESTER captures wM-Bus packets. The scan method is set by the `scan-mode` parameter.

`app config scan-mode <mode>`

- **off**: automatic scan off, ideal for shipping or location tuning with manual scan start
- **interval**: scan in intervals set by the `scan-interval` parameter, for debugging
- **daily**: scan once a day, always at the hour set by the `scan-hour` parameter
- **weekly**: scan once a week, always at the hour and day of the week set by the `scan-hour` and `scan-weekday` parameters
- **monthly**: scan once a month, always at the hour and day of the month set by the `scan-hour` and `scan-day` parameters

`app config scan-timeout 480`

After the scan is started, it is scanned for the maximum `scan-timeout` time (adjustable in the range of 1–86400 seconds), or until packets arrive from all devices from the address list.

This is a safety timer which, in the worst case, prevents the scanning from remaining on indefinitely in case of non-acceptance/failure of the sensor. The timeout is doubled if both antennas are activated by the `scan-ant` parameter.

`app config scan-interval 600`

Fixed scan in intervals if `scan-mode` is set to **interval**, for debug only, units of seconds 30–604800.

`app config scan-hour 12`

It determines the hour at which the scan should start. CHESTER device clocks operate in UTC. The device does not distinguish between time zones or daylight savings time. The correct hour must be considered with some margin if wM-Bus sensors automatically change their clocks to summer/winter time.

`app config scan-weekday 2`

Specifies the day of the week to scan for a weekly scan: 1 = Monday, 2 = Tuesday, … 6 = Saturday. Firmware v4.0.1 never starts a weekly scan with 0, so Sunday cannot be set.

`app config scan-day 2`

Specifies the day of the month for the monthly scan (1–31). The scan runs only in months that have this day, so use a day from 1 to 28 to scan every month.

`app config scan-ant <mode>`

**single**: scan uses only one cycle with one antenna, if it receives data from all devices, it sends data immediately, if not, it sends data after the `scan-timeout` timeout

**dual**: the scan takes place twice, each time with a different antenna. If all devices are not scanned in the first cycle with antenna 1, a second scan with the second antenna is started. Each scan takes a maximum of `scan-timeout` seconds. The maximum time when the wM-Bus receiver is active is equal to 2× `scan-timeout`.

`config save`

After completing the configuration, you need to confirm everything.

## Example Configurations

When configuring over BLE, you need to apply the configuration changes with the `config save` command; otherwise the configuration is not applied.

When configuring over [Cloud config downlink commands](/cloud/downlink/config), don't add the `config save` command; it is applied automatically.

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

### Interval and wM-Bus Packets Every 2 Minutes, Two Antennas

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

### Daily Scanning

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

## HARDWARIO Cloud – Decryption Keys

The **transmitted messages from wM-Bus devices are encrypted**.

The **received data must therefore be decrypted**, which is done using **decryption keys**.

In this section, we will show **how to add individual decryption keys** into the Cloud using the **Variables** section. The Cloud uses them when the device sends the telegrams with `cloud-decode` set to `true`.

:::tip
If you are not sure how to **get started with the Cloud**, follow this tutorial: [**HARDWARIO Cloud**](/cloud/)
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

## Commands

| Command | Action |
| :--- | :--- |
| `wm scan` | Start a scan now and list every device it hears |
| `wm timeout` | End the running scan, as if `scan-timeout` had expired |
| `wm enroll <timeout> <threshold>` | Replace the address list with the devices found in a scan (see [**Address List Configuration**](#address-list-configuration)) |
| `send` | Send the collected data now; a running scan stops (`wm send` does the same) |
| `poll` | Ask HARDWARIO Cloud for downlink messages now |

The address list is managed with `app config address` (see [**Address List Configuration**](#address-list-configuration)). The other `wm` subcommands (`on`, `off`, `config`, `ant`, `push`, `poll`, `poll_ts`, `weekday`, `heap`) are meant for debugging.

## Firmware Build

- **Firmware:** [hio-chester-wmbus:v4.0.1](https://firmware.hardwario.com/chester/07488f3fd70e481aa21072ce3ac211e8), built 2026-09-07 with SDK v4.0.1
- **Identifier:** `07488f3fd70e481aa21072ce3ac211e8`, used for a firmware update over HARDWARIO Cloud ([how to](/cloud/firmware))
- **HEX file** for flashing over J-Link: [download](https://firmware.hardwario.com/chester/07488f3fd70e481aa21072ce3ac211e8/hex), SHA256 `5c53dada80d70d8ca25d36456d698dbebb61af27bf329df6c5778b4d32850aa7`
- **BIN file** for an update over Bluetooth in HARDWARIO Manager: [download](https://firmware.hardwario.com/chester/07488f3fd70e481aa21072ce3ac211e8/bin), SHA256 `65c41fe6818dce77d08b8ea511e61c529130fcc4e671dd3cfc4c3dde5a25d8fc`
- **Build from the SDK:** `west chester-update wmbus --variant "CHESTER wM-Bus"`

Flashing is described in [**Firmware Flashing**](../../firmware-flashing/index.md).

## Example JSON Message

Every field, with its unit, range and resolution, is described on the catalog page under [**Data**](../../catalog-applications/chester-wm-bus/index.md#data-over-lte).

The example is the report of a scan that received the telegrams of both meters on the address list.

Each report carries up to 20 telegrams. When a scan receives more, they are split into several reports.

The `wmbus` structure holds:

- `scan_time`: duration of the scan in seconds
- `received`: number of meters whose telegram the scan received
- `devices`: number of addresses on the list (without a list, the number of meters heard)
- `cycle`: number of the scan since the device started
- `part`: index of this report when the telegrams of one scan are split into several reports, starting at `0`
- `packets`: the raw telegrams (`data`, hexadecimal, from the length field on, without the CRC bytes) with their signal strength (`rssi`, dBm); with `cloud-decode` set to `true`, HARDWARIO Cloud shows the decoded values of the meters here instead

<details>
<summary><b>Show JSON Example</b></summary>

```json
{
    "frame": {
        "protocol": 3,
        "sequence": 27,
        "timestamp": 1762430712
    },
    "state": {
        "uptime": 1296131
    },
    "battery": {
        "voltage_rest": 3.65,
        "voltage_load": 3.61,
        "current_load": 36
    },
    "network": {
        "parameter": {
            "eest": 8,
            "ecl": 0,
            "rsrp": -95,
            "rsrq": -11,
            "snr": 6,
            "plmn": 23003,
            "cid": 1036050,
            "band": 20,
            "earfcn": 6300
        }
    },
    "thermometer": {
        "temperature": 21.06
    },
    "accelerometer": {
        "accel_x": 0.22,
        "accel_y": 0.07,
        "accel_z": 9.78,
        "orientation": 2
    },
    "wmbus": {
        "scan_time": 37,
        "received": 2,
        "devices": 2,
        "cycle": 14,
        "part": 0,
        "packets": [
            {
                "data": "32446850003076816980a0919f2b06007007000061087c08000000000000000000000000010101020100000000000000000000",
                "rssi": -71
            },
            {
                "data": "32446850152904766980a0919f2b0600700700005e087c08000000000000000000000000010101020100000000000000000000",
                "rssi": -84
            }
        ]
    }
}
```

</details>

## Changelog

### v3.5.1 – 2025-12-08

- **Added**: Enroll (teach) mode for wireless meter pairing
- **Added**: Scan-all mode with cloud-side decode configuration support
- **Added**: Shell send command for manual packet injection
- **Added**: Manufacturer field in decoded data

### v3.5.0 – 2025-12-03

- **Fixed**: Receiving of long wM-Bus packets (previously truncated or dropped)
- **Added**: Battery-powered variant support (6× D-cell) alongside the existing DC-powered variant
- **Changed**: HARDWARIO Cloud protocol adopted (CBOR encoding, new API endpoints); Cloud Legacy firmware was not available for this application

:::info

For a complete overview of all platform changes, see the [**CHESTER Changelog**](/chester/changelog).

:::
