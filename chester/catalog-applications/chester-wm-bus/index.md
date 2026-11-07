---
title: CHESTER wM-Bus
description: "CHESTER wM-Bus reads Wireless M-Bus meters in scheduled scans and sends their telegrams over LTE: its hardware, variants, settings and data."
---
import Image from '@theme/IdealImage';

# CHESTER wM-Bus

![CHESTER wM-Bus in a white enclosure, angled view](/img/chester/catalog-applications/chester-wm-bus.webp)

**CHESTER wM-Bus** is a **Wireless M-Bus** gateway. It listens for the configured wM-Bus meters in scheduled scans, collects the raw received telegrams and sends them over the **NB-IoT/LTE-M** network.

:::info Firmware

Every parameter, the commands and the firmware downloads are on the **[CHESTER wM-Bus firmware](../../firmware/chester-wm-bus/index.md)** page.

:::

## What It Can Do

- Supports all wM-Bus meters of the T1 and C1 classes, regardless of manufacturer.
- Measures the consumption of **heat**, **gas**, **electricity** and **water** in homes and apartments, and reads **other wM-Bus devices**.
- Scans **periodically**, **daily**, **weekly** or **monthly**.
- Switches between **two antennas** during reception to achieve ideal reception in **both polarizations**.
- Operates from batteries for 7+ years at a daily readout thanks to its low power consumption; a version with an external power supply can also be ordered.
- Supports the newer **LTEv2** stack and the current **HARDWARIO Cloud**.

## Supported wM-Bus Sensors

**CHESTER wM-Bus receives packets from any wM-Bus meter transmitting in the T1 or C1 mode, regardless of manufacturer.**

The device works as a **pass-thru gateway**: it forwards the received wM-Bus telegrams to the Cloud, and the **decoding into meaningful units happens in the end IoT application**. Optionally, the telegrams can be decrypted on the Cloud side using the [decryption keys](../../firmware/chester-wm-bus/index.md#hardwario-cloud--decryption-keys) stored per device.

CHESTER wM-Bus receives raw hexadecimal wM-Bus telegrams and forwards them as received. Each wM-Bus meter has its own representation of the encoded data, and the telegrams may also be encrypted. With cloud decoding turned on, HARDWARIO Cloud interprets the meter data; otherwise, decoding the raw hexadecimal values into meaningful units is up to the customer or integrator.

The meters listed below are the ones we have tested in-house and documented, including **water meters**, **heat meters** and **heat cost allocators** from **BMeters** and **Zenner**. They are a starting point.

➡️ [Tested wM-Bus Sensors](../../supported-devices/wm-bus.md)

## Models {#variants}

| Model | Difference | Firmware |
| :--- | :--- | :--- |
| [**CHESTER wM-Bus**](#model-chester-wm-bus) | Powered from primary cells: 3.6 V nominal, 26 000 mAh | [CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md) |
| [**CHESTER wM-Bus DC**](#chester-wm-bus-dc) | External 230 V adapter instead of the primary cells | [CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md) |

## CHESTER wM-Bus {#model-chester-wm-bus}

The base model, powered from primary cells.

### Hardware {#hardware}

Battery powered from primary cells: 3.6 V nominal, 26 000 mAh. The recommended cells are two Saft LSH 20 lithium cells (size D, 3.6 V).

The hardware of this application consists of the following ordering codes:

* `CHESTER-M-CES`: Standard mainboard
* `CHESTER-B1` with the `W` option: carrier board with the battery holders and the wM-Bus module, see [**CHESTER-B1**](../../ordering-codes.md#chester-b1)
* `CHESTER-E19-P`: Enclosure for CHESTER with CHESTER-B1

See [**Ordering Codes**](../../ordering-codes.md) for more details.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../images/chester-wm-bus.png')} width={376} height={376} alt="CHESTER wM-Bus gateway in a white wall-mount enclosure with two external antennas" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

### Settings {#settings}

These are the settings you usually change for CHESTER wM-Bus: when the scans run, how long they last and which meters they read. Set a parameter with `app config <parameter> <value>` and apply the change with `config save`, which stores the configuration and restarts the device; a batch of commands sent over the cloud is applied automatically. The full list is on the [**firmware page**](../../firmware/chester-wm-bus/index.md#configuration-parameters).

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Default | Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `scan-mode` | Scan mode | `off`, `interval`, `daily`, `weekly`, `monthly` | `off` | When scans start: on demand from the button or a command, every `scan-interval`, or once a day, week or month at `scan-hour` |
| `scan-interval` | Scan interval | `<30-604800>` | `600` | Time between the starts of two scans in seconds, in the `interval` mode |
| `scan-hour` | Scan hour | `<0-23>` | `12` | Hour (UTC) at which the daily, weekly and monthly scans start |
| `scan-weekday` | Scan weekday | `<0-6>` | `3` | Day of the week for the weekly scan, from `1` (Monday) to `6` (Saturday) |
| `scan-day` | Scan day | `<1-31>` | `15` | Day of the month for the monthly scan; a day from `1` to `28` scans every month |
| `scan-timeout` | Scan timeout | `<1-86400>` | `130` | Longest duration of a scan with one antenna in seconds; make it longer than the transmit period of the meters |
| `scan-ant` | Scan ant | `single`, `dual` | `single` | With `dual`, the scan continues with the second antenna when `scan-timeout` runs out for the first one |
| `cloud-decode` | Cloud decode | `true`, `false` | `false` | With `true`, HARDWARIO Cloud decrypts and decodes the telegrams (see [**Data over LTE**](#data-over-lte)) |
| `address` | Address | `add <address>`, `remove <address>`, `erase` | empty list | The meters to read, by their wM-Bus address, up to 256; with an empty list, the device keeps the first packet of every meter it hears. `wm enroll` replaces the list with the meters in range ([how to](../../firmware/chester-wm-bus/index.md#address-list-configuration)) |

### Data over LTE {#data-over-lte}

The device sends a report at the end of each scan: as soon as a telegram from every meter on the address list has arrived, or when `scan-timeout` runs out (with `scan-ant dual`, when it runs out for the second antenna). The `send` command and one press of the mainboard button send the telegrams collected so far at once and end a running scan. The reports follow the scan schedule set by `scan-mode`.

From each meter, the report carries the first telegram received in the scan. One report holds up to 20 telegrams; the rest of the scan follows in further reports with a higher `wmbus.part`. The other values are the latest single readings. A value whose reading fails is `null`; the battery is measured 60 seconds after start and then every 12 hours, so the `battery` values are `null` until the first measurement.

Every report carries the common data of all CHESTER applications (`message`, `network`, `system`, `thermometer` and `accelerometer`), described in [**Common Functionality**](../common-functionality.md#common-data-lte); CHESTER wM-Bus sends it under its own keys: `frame` instead of `message` (`frame.protocol` is `3`), `state.uptime` instead of `system.uptime` and `battery` instead of the battery values in `system`.

In addition to the common data, CHESTER wM-Bus sends:

- [`wmbus`](#wmbus): the statistics of the scan and the telegrams received from the meters, raw or decoded by HARDWARIO Cloud

CHESTER wM-Bus sends its data over NB-IoT/LTE-M.

#### Scan and Telegrams {#wmbus}

The `wmbus` structure describes the scan and carries the telegrams:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `wmbus.scan_time` | Duration of the scan | s | 0–172800 | 1 s |
| `wmbus.received` | Number of meters whose telegram the scan received | | 0–256 | 1 |
| `wmbus.devices` | Number of addresses on the list; with an empty list, the number of meters heard in the scan | | 0–256 | 1 |
| `wmbus.cycle` | Number of the scan since the device started | | 0–4294967295 | 1 |
| `wmbus.part` | Index of this report among the reports of one scan, starting at `0` | | 0–12 | 1 |
| `wmbus.packets[].data` | The telegram in hexadecimal, from its length field (L-field) on, with the CRC bytes removed | | | |
| `wmbus.packets[].rssi` | Signal strength at which the telegram was received | dBm | about −107 to −30 | 1 dBm |

The device forwards the telegrams as received: the header of each telegram holds the manufacturer and the address of the meter, and the rest holds its values, encrypted if the meter encrypts them. With `cloud-decode` set to `true`, the device sends the same telegrams with their signal strength in a form that HARDWARIO Cloud decodes: the cloud decrypts each telegram with the key stored in **Variables** ([how to](../../firmware/chester-wm-bus/index.md#hardwario-cloud--decryption-keys)) and shows the decoded values of the meter in `wmbus.packets`. Which values these are, with their units, depends on the meter.

## CHESTER wM-Bus DC {#chester-wm-bus-dc}

**CHESTER wM-Bus DC** is powered from an external 230 V adapter instead of the primary cells:

- The mainboard has supercapacitors (`CHESTER-M-CS` instead of `CHESTER-M-CES`).
- It suits configurations with long scans, such as scanning around the clock (see [**Example Configurations**](../../firmware/chester-wm-bus/index.md#example-configurations)).

It runs the same **[CHESTER wM-Bus firmware](../../firmware/chester-wm-bus/index.md)** as the battery variant.

### Hardware {#chester-wm-bus-dc-hardware}

Its hardware consists of these ordering codes:

* `CHESTER-M-CS`: Standard mainboard w/ supercapacitors
* `CHESTER-B1` with the `W` option: carrier board with the wM-Bus module, see [**CHESTER-B1**](../../ordering-codes.md#chester-b1)
* `CHESTER-E19-P`: Enclosure for CHESTER with CHESTER-B1

### Settings {#chester-wm-bus-dc-settings}

The settings are the same as for [CHESTER wM-Bus](#settings).

### Data {#chester-wm-bus-dc-data}

CHESTER wM-Bus DC sends exactly the same data as [CHESTER wM-Bus](#data-over-lte).

## Getting Started

The basics are common for all CHESTER catalog applications:

- [**Getting started**](/chester/first-steps) on how to connect device to Cloud.
- [**Common functionality**](../common-functionality.md) to know how LED, button and network configuration works.
- [**Platform Connectivity**](/chester/category/platform-connectivity/) on how to work with the interactive console.
